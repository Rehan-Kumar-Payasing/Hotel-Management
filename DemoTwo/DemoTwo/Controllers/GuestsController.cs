using Microsoft.AspNetCore.Mvc;
using DemoTwo.Models;
using DemoTwo.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace DemoTwo.Controllers
{

    [Authorize(Roles = "Receptionist")]
    // [Authorize(Policy = "ReceptionistOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class GuestsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public GuestsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Guests
        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<GuestDTO>> GetGuests()
        {
            var guests = _context.Guests.Select(guest => new GuestDTO
            {
                GuestId = guest.GuestId,
                Name = guest.Name,
                Email = guest.Email,
                Gender = guest.Gender,
                Address = guest.Address,
                PhoneNumber = guest.PhoneNumber
            }).ToList();

            return Ok(guests);
        }

        // GET: api/Guests/5
        [HttpGet("GetById")]
        public ActionResult<GuestDTO> GetGuest(int id)
        {
            var guest = _context.Guests.Select(guest => new GuestDTO
            {
                GuestId = guest.GuestId,
                Name = guest.Name,
                Email = guest.Email,
                Gender = guest.Gender,
                Address = guest.Address,
                PhoneNumber = guest.PhoneNumber
            }).FirstOrDefault(g => g.GuestId == id);

            if (guest == null)
            {
                return NotFound();
            }

            return Ok(guest);
        }

        // POST: api/Guests
        [HttpPost("AddAll")]
        public ActionResult<GuestDTO> PostGuest(GuestDTO guestDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var guest = new Guest
            {
                Name = guestDTO.Name,
                Email = guestDTO.Email,
                Gender = guestDTO.Gender,
                Address = guestDTO.Address,
                PhoneNumber = guestDTO.PhoneNumber
            };

            _context.Guests.Add(guest);
            _context.SaveChanges();

            guestDTO.GuestId = guest.GuestId;

            return CreatedAtAction(nameof(GetGuest), new { id = guestDTO.GuestId }, guestDTO);
        }

        // PUT: api/Guests/5
        [HttpPut("UpdateById")]
        public IActionResult PutGuest(int id, GuestDTO guestDTO)
        {
            if (id != guestDTO.GuestId)
            {
                return BadRequest();
            }

            var guest = _context.Guests.Find(id);
            if (guest == null)
            {
                return NotFound();
            }

            guest.Name = guestDTO.Name;
            guest.Email = guestDTO.Email;
            guest.Gender = guestDTO.Gender;
            guest.Address = guestDTO.Address;
            guest.PhoneNumber = guestDTO.PhoneNumber;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Guests/5
        [HttpDelete("DeleteById")]
        public IActionResult DeleteGuest(int id)
        {
            var guest = _context.Guests.Find(id);
            if (guest == null)
            {
                return NotFound();
            }

            _context.Guests.Remove(guest);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
