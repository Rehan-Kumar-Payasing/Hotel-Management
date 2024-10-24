using Microsoft.AspNetCore.Mvc;
using DemoTwo.Models;
using DemoTwo.DTOs;
using DemoTwo.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace DemoTwo.Controllers
{
    [Authorize(Roles = "Receptionist")]

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly HotelDbContext _context;
        private readonly Email _email;

        public PaymentsController(HotelDbContext context, Email email)
        {
            _context = context;
            _email = email;
        }

        // GET: api/Payments
        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<PaymentDTO>> GetPayments()
        {
            var payments = _context.Payments.Select(payment => new PaymentDTO
            {
                PaymentId = payment.PaymentId,
                ReservationId = payment.ReservationId,
                TotalAmount = payment.TotalAmount,
                PaymentTime = payment.PaymentTime
            }).ToList();

            return Ok(payments);
        }

        // GET: api/Payments/5
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

        // POST: api/Payments/AddAll
        [HttpPost("AddAll")]
        public ActionResult<PaymentDTO> PostPayment(PaymentDTO paymentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Check if the payment for the given ReservationId already exists
            var existingPayment = _context.Payments.FirstOrDefault(p => p.ReservationId == paymentDTO.ReservationId);
            if (existingPayment != null)
            {
                return BadRequest("Payment is already done.");
            }

            // Fetch the reservation details
            var reservation = _context.Reservations.FirstOrDefault(r => r.ReservationId == paymentDTO.ReservationId);
            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            // Fetch the guest details based on GuestId from the reservation
            var guest = _context.Guests.FirstOrDefault(g => g.GuestId == reservation.GuestId);
            if (guest == null)
            {
                return NotFound("Guest not found.");
            }

            // Calculate the number of days
            var numberOfDays = (reservation.CheckOutDate - reservation.CheckInDate).Days;

            // Fetch the room details
            var room = _context.Rooms.FirstOrDefault(r => r.RoomId == reservation.RoomId);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            // Fetch the rate based on room type
            var rate = _context.Rate.FirstOrDefault(r => r.RoomType == room.RoomType);
            if (rate == null)
            {
                return NotFound("Rate not found.");
            }

            // Calculate the total amount from Bills dataset and room charges
            var billAmount = _context.Bills
                                    .Where(b => b.ReservationId == reservation.ReservationId).AsEnumerable()
                                    .Sum(b => b.Total);

            var roomCharges = numberOfDays * rate.PerNightCharge;

            // Calculate total amount
            var totalAmount = billAmount + roomCharges;

            // Create a new Payment instance with the calculated total amount
            var payment = new Payment
            {
                ReservationId = paymentDTO.ReservationId,
                TotalAmount = totalAmount,
                PaymentTime = paymentDTO.PaymentTime
            };

            _context.Payments.Add(payment);
            _context.SaveChanges();

            paymentDTO.PaymentId = payment.PaymentId;
            paymentDTO.TotalAmount = totalAmount; // Update the DTO with the calculated total amount

            // Send the email after the payment is successfully processed
            _email.SendEmail2(guest.Email, guest.Name);

            // Return the payment details along with a success message
            return Ok(new
            {
                Message = "Payment processed successfully",
                PaymentDetails = paymentDTO
            });
        }





        // PUT: api/Payments/5
        [HttpPut("UpdateById")]
        public IActionResult PutPayment(int id, PaymentDTO paymentDTO)
        {
            if (id != paymentDTO.PaymentId)
            {
                return BadRequest();
            }

            var payment = _context.Payments.Find(id);
            if (payment == null)
            {
                return NotFound();
            }

            payment.ReservationId = paymentDTO.ReservationId;
            payment.TotalAmount = paymentDTO.TotalAmount;
            payment.PaymentTime = paymentDTO.PaymentTime;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Payments/5
        [HttpDelete("DeleteById")]
        public IActionResult DeletePayment(int id)
        {
            var payment = _context.Payments.Find(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
