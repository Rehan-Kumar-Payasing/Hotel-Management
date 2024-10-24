// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using DemoTwo.Models;
// using DemoTwo.DTOs;
// using System.Security.Claims;
// using System.IdentityModel.Tokens.Jwt;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;
// using Microsoft.AspNetCore.Authorization;
// using DemoTwo.Services;
// using Microsoft.AspNetCore.Identity;

// namespace DemoTwo.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class UsersController : ControllerBase
//     {
//         //private readonly UserManager<IdentityUser> _userManager;
//         //private readonly RoleManager<IdentityRole> _roleManager;
//         private readonly HotelDbContext _context;
//         private readonly IConfiguration configuration;
//         private readonly Email _email;

//         public UsersController(HotelDbContext context, IConfiguration configuration, Email email)
//         {
//             _context = context;
//             this.configuration = configuration;
//             _email = email;
//             //_roleManager = roleManager;
//             //_userManager = userManager;
//         }

//         //POST: api/Users/register
//         [HttpPost("register")]
//         public async Task<ActionResult<User>> Register(UserDTO userDTO)
//         {
//             // Check if the username already exists
//             if (_context.Users.Any(u => u.Username == userDTO.Username))
//             {
//                 return BadRequest("Username already exists.");
//             }

//             // Create a new User instance
//             var user = new User
//             {
//                 Email = userDTO.Email,
//                 Username = userDTO.Username,
//                 Password = userDTO.Password,
//                 Role = userDTO.Role
//             };

//             // Validate the password
//             if (!user.IsValidPassword())
//             {
//                 return BadRequest("Password does not meet the required criteria.");
//             }

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             // Return the created user
//             //return CreatedAtAction("GetUser", new { id = user.UserId }, user);
//             _email.SendEmail(userDTO.Email, userDTO.Username);
//             return Ok(new { Message = "User registered successfully" });
//         }

//         // POST: api/Users/login
//         [HttpPost("login")]
//         public ActionResult<User> Login(UserDTO userDTO)
//         {
//             // Find the user by username and password
//             var user = _context.Users
//                 .FirstOrDefault(u => u.Username == userDTO.Username && u.Password == userDTO.Password);

//             if (user == null)
//             {
//                 return Unauthorized("Invalid username or password.");
//             }

//             // Return the user if authenticated successfully
//             var claims = new[]
//                 {
//                     new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
//                     new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
//                     new Claim("UserName",user.Username.ToString()),
//                     new Claim("Password",user.Password.ToString()),
//                     new Claim(ClaimTypes.Role, user.Role)
//                 };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
//             var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//             var token = new JwtSecurityToken(
//                 configuration["Jwt:Issuer"],
//                 configuration["Jwt:Audience"],
//                 claims,
//                 expires: DateTime.UtcNow.AddMinutes(60),
//                 signingCredentials: signIn
//             );
//             string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
//             return Ok(new { Token = tokenValue, User = user });


//         }

//         // GET: api/Users
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<User>>> GetUsers()
//         {
//             return await _context.Users.ToListAsync();
//         }

//         // GET: api/Users/5
//         [Authorize]
//         [HttpGet("GetById")]
//         public async Task<ActionResult<User>> GetUser(int id)
//         {
//             var user = await _context.Users.FindAsync(id);

//             if (user == null)
//             {
//                 return NotFound();
//             }

//             return user;
//         }

//         // PUT: api/Users/5
//         [HttpPut("UpdateById")]
//         public async Task<IActionResult> PutUser(int id, User user)
//         {
//             if (id != user.UserId)
//             {
//                 return BadRequest();
//             }

//             _context.Entry(user).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!UserExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }

//         // POST: api/Users
//         // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//         //[HttpPost("resister")]
//         //public async Task<ActionResult<User>> PostUser(User user)
//         //{
//         //    if (!user.IsValidPassword())
//         //    {
//         //        return BadRequest("Password does not meet the required criteria.");
//         //    }

//         //    _context.Users.Add(user);
//         //    await _context.SaveChangesAsync();

//         //    return CreatedAtAction("GetUser", new { id = user.UserId }, user);
//         //}


//         // DELETE: api/Users/5
//         [HttpDelete("DeleteById")]
//         public async Task<IActionResult> DeleteUser(int id)
//         {
//             var user = await _context.Users.FindAsync(id);
//             if (user == null)
//             {
//                 return NotFound();
//             }

//             _context.Users.Remove(user);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool UserExists(int id)
//         {
//             return _context.Users.Any(e => e.UserId == id);
//         }
//     }
// }




