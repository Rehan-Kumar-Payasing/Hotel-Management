using Microsoft.AspNetCore.Mvc;
using DemoTwo.Models;
using DemoTwo.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System;

namespace DemoTwo.Controllers
{
    [Route("api/[controller]")]
    // [Authorize(Policy = "ReceptionistOnly")]
    [Authorize(Roles = "Receptionist")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReservationsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<ReservationDTO>> GetReservations()
        {
            var reservations = _context.Reservations.Select(reservation => new ReservationDTO
            {
                ReservationId = reservation.ReservationId,
                GuestId = reservation.GuestId,
                RoomId = reservation.RoomId,
                ReservationDate = reservation.ReservationDate,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                NumberOfGuest = reservation.NumberOfGuest,
                BookingStatus = reservation.Status
            }).ToList();

            return Ok(reservations);
        }

        // GET: api/Reservations/GetByEmail
        [HttpGet("GetByEmail")]
        public ActionResult<ReservationDTO> GetReservation(string email)
        {
            var reservation = (from res in _context.Reservations
                               join guest in _context.Guests on res.GuestId equals guest.GuestId
                               where guest.Email == email
                               select new ReservationDTO
                               {
                                   ReservationId = res.ReservationId,
                                   GuestId = res.GuestId,
                                   RoomId = res.RoomId,
                                   ReservationDate = res.ReservationDate,
                                   CheckInDate = res.CheckInDate,
                                   CheckOutDate = res.CheckOutDate,
                                   NumberOfGuest = res.NumberOfGuest,
                                   BookingStatus = res.Status
                               }).FirstOrDefault();

            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        // POST: api/Reservations
        [HttpPost("AddAll")]
        public ActionResult<ReservationDTO> PostReservation(ReservationDTO reservationDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (reservationDTO.CheckInDate >= reservationDTO.CheckOutDate)
            {
                return BadRequest("Check-in date must be earlier than check-out date.");
            }

            var room = _context.Rooms.Find(reservationDTO.RoomId);
            if (room == null || room.Status == "Booked")
            {
                return BadRequest("Room is not available.");
            }

            room.Status = "Booked";  // Change room status to 'Booked'

            var reservation = new Reservation
            {
                GuestId = reservationDTO.GuestId,
                RoomId = reservationDTO.RoomId,
                ReservationDate = reservationDTO.ReservationDate,
                CheckInDate = reservationDTO.CheckInDate,
                CheckOutDate = reservationDTO.CheckOutDate,
                NumberOfGuest = reservationDTO.NumberOfGuest,
                Status = reservationDTO.BookingStatus
            };

            _context.Reservations.Add(reservation);
            _context.SaveChanges();

            reservationDTO.ReservationId = reservation.ReservationId;

            return CreatedAtAction(nameof(GetReservation), new { id = reservationDTO.ReservationId }, reservationDTO);
        }

        // PUT: api/Reservations/UpdateById
        [HttpPut("UpdateById")]
        public IActionResult PutReservation(int id, ReservationDTO reservationDTO)
        {
            if (id != reservationDTO.ReservationId)
            {
                return BadRequest();
            }

            if (reservationDTO.CheckInDate >= reservationDTO.CheckOutDate)
            {
                return BadRequest("Check-in date must be earlier than check-out date.");
            }

            var reservation = _context.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            reservation.GuestId = reservationDTO.GuestId;
            reservation.RoomId = reservationDTO.RoomId;
            reservation.ReservationDate = reservationDTO.ReservationDate;
            reservation.CheckInDate = reservationDTO.CheckInDate;
            reservation.CheckOutDate = reservationDTO.CheckOutDate;
            reservation.NumberOfGuest = reservationDTO.NumberOfGuest;
            reservation.Status = reservationDTO.BookingStatus;

            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("DeleteById")]
        public IActionResult DeleteReservation(int id)
        {
            var reservation = _context.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            // Check if the current date is greater than the CheckOutDate or if the reservation is being deleted
            if (DateTime.Now > reservation.CheckOutDate || true)  // 'true' here because you're deleting the reservation
            {
                var room = _context.Rooms.Find(reservation.RoomId);
                if (room != null)
                {
                    room.Status = "Available";  // Change room status to 'Available'
                }
            }

            _context.Reservations.Remove(reservation);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
