using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using DemoTwo.Models;
using DemoTwo.Services;
using DemoTwo.DTO;
using DemoTwo.DTOs;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {

        private readonly HotelDbContext _context;
        private readonly Password _password_Hash;
        private readonly IConfiguration _configuration;
        private readonly Email _emailsending;
        public AdminsController(HotelDbContext context, Password passwordHasher, IConfiguration configuration, Email emailsending)
        {
            _context = context;
            _password_Hash = passwordHasher;
            _configuration = configuration; _emailsending = emailsending;

        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> PostLogin([FromBody] LoginDTO loginDto)
        {


            if (loginDto == null)
            {
                return BadRequest("User data is null");
            }

            // Fetch the user based on email
            var user = await _context.Admins
                .FirstOrDefaultAsync(u => u.Email == loginDto.Username);

            if (user != null)
            {
                // Verify the provided password with the stored hashed password
                bool isPasswordValid = _password_Hash.VerifyPassword(user.Password, loginDto.Password);

                if (isPasswordValid)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub,_configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        new Claim("AdminName",user.AdminName.ToString()),
                        new Claim("AdminEmail",user.Email.ToString()),
                        new Claim(ClaimTypes.Role,user.Role.ToString())
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(60),
                        signingCredentials: signIn
                    );
                    string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(new { Token = tokenValue, Admin = user });
                }
                else
                {
                    return Unauthorized("Invalid password");
                }

            }
            else
            {
                return Unauthorized("Invalid email");
            }


        }

        // GET: api/Admins
        // [Authorize(Policy = "OwnerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }
        private bool AdminExists(int id)
        {
            return _context.Admins.Any(e => e.AdminId == id);
        }

        // [Authorize(Policy = "OwnerOnly")]
        [Authorize(Roles = "Owner")]
        // GET: api/Payments
        [HttpGet("GetAllByDate")]
        public ActionResult<IEnumerable<PaymentDTO>> GetPayments(int? month = null, int? year = null)
        {
            var query = _context.Payments.AsQueryable();

            // Filter by year if provided
            if (year.HasValue)
            {
                query = query.Where(p => p.PaymentTime.Year == year.Value);
            }

            // Filter by month if provided
            if (month.HasValue)
            {
                query = query.Where(p => p.PaymentTime.Month == month.Value);
            }

            // Select the payments
            var payments = query.Select(payment => new PaymentDTO
            {
                PaymentId = payment.PaymentId,
                ReservationId = payment.ReservationId,
                TotalAmount = payment.TotalAmount,
                PaymentTime = payment.PaymentTime
            }).ToList();

            return Ok(payments);
        }



        // GET: api/Payments/5
        // [Authorize(Policy = "OwnerOnly")]
        [Authorize(Roles = "Owner")]
        [HttpGet("GetById")]
        public ActionResult<PaymentDTO> GetPayment(int id)
        {
            var payment = _context.Payments.Select(payment => new PaymentDTO
            {
                PaymentId = payment.PaymentId,
                ReservationId = payment.ReservationId,
                TotalAmount = payment.TotalAmount,
                PaymentTime = payment.PaymentTime
            }).FirstOrDefault(p => p.PaymentId == id);

            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }
    }
}