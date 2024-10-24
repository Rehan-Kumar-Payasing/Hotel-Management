using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoTwo.DTOs;
using DemoTwo.Models;
using Microsoft.AspNetCore.Authorization;
namespace DemoTwo.Controllers
{
    // [Authorize(Policy = "ReceptionistOnly,ManagerOnly")]
    [Authorize(Roles = "Receptionist")]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public RoomsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<RoomDTO>> GetRooms()
        {
            var rooms = _context.Rooms.Select(room => new RoomDTO
            {
                RoomId = room.RoomId,
                RoomNumber = room.RoomNumber,
                RoomType = room.RoomType,
                Status = room.Status
            }).ToList();

            return Ok(rooms);
        }

        // GET: api/Rooms/5
        [HttpGet("GetById")]
        public ActionResult<RoomDTO> GetRoom(int id)
        {
            var room = _context.Rooms.Select(room => new RoomDTO
            {
                RoomId = room.RoomId,
                RoomNumber = room.RoomNumber,
                RoomType = room.RoomType,
                Status = room.Status
            }).FirstOrDefault(r => r.RoomId == id);

            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        // POST: api/Rooms
        [HttpPost("AddAll")]
        public ActionResult<RoomDTO> PostRoom(RoomDTO roomDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var room = new Room
            {
                RoomNumber = roomDTO.RoomNumber,
                RoomType = roomDTO.RoomType,
                Status = roomDTO.Status
            };

            _context.Rooms.Add(room);
            _context.SaveChanges();

            roomDTO.RoomId = room.RoomId;

            return CreatedAtAction(nameof(GetRoom), new { id = roomDTO.RoomId }, roomDTO);
        }

        // PUT: api/Rooms/5
        [HttpPut("UpdateById")]
        public IActionResult PutRoom(int id, RoomDTO roomDTO)
        {
            if (id != roomDTO.RoomId)
            {
                return BadRequest();
            }

            var room = _context.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            room.RoomNumber = roomDTO.RoomNumber;
            room.RoomType = roomDTO.RoomType;
            room.Status = roomDTO.Status;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Rooms/5
        [HttpDelete("DeleteById")]
        public IActionResult DeleteRoom(int id)
        {
            var room = _context.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
