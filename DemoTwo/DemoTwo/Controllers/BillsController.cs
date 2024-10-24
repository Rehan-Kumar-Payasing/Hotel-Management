using Microsoft.AspNetCore.Mvc;
using DemoTwo.Models;
using DemoTwo.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace DemoTwo.Controllers
{
    // [Authorize(Policy = "ReceptionistOnly")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Receptionist")]
    public class BillsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public BillsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Bills
        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<BillDTO>> GetBills()
        {
            var bills = _context.Bills.Select(bill => new BillDTO
            {
                BillId = bill.BillId,
                ReservationId = bill.ReservationId,
                StayDates = bill.StayDates,
                ServiceAmounts = bill.ServiceAmounts,
                Taxes = bill.Taxes,
                Total = bill.ServiceAmounts + bill.Taxes
            }).ToList();

            return Ok(bills);
        }

        // GET: api/Bills/5
        [HttpGet("GetById")]
        public ActionResult<BillDTO> GetBill(int id)
        {
            var bill = _context.Bills.Select(bill => new BillDTO
            {
                BillId = bill.BillId,
                ReservationId = bill.ReservationId,
                StayDates = bill.StayDates,
                ServiceAmounts = bill.ServiceAmounts,
                Taxes = bill.Taxes,
                Total = bill.ServiceAmounts + bill.Taxes
            }).FirstOrDefault(b => b.BillId == id);

            if (bill == null)
            {
                return NotFound();
            }

            return Ok(bill);
        }

        // POST: api/Bills
        [HttpPost("AddAll")]
        public ActionResult<BillDTO> PostBill(BillDTO billDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bill = new Bill
            {
                ReservationId = billDTO.ReservationId,
                StayDates = billDTO.StayDates,
                ServiceAmounts = billDTO.ServiceAmounts,
                Taxes = billDTO.Taxes
            };

            _context.Bills.Add(bill);
            _context.SaveChanges();

            // Calculate and set the Total
            billDTO.BillId = bill.BillId;
            billDTO.Total = bill.ServiceAmounts + bill.Taxes;

            return CreatedAtAction(nameof(GetBill), new { id = billDTO.BillId }, billDTO);
        }

        // PUT: api/Bills/5
        [HttpPut("UpdateById")]
        public IActionResult PutBill(int id, BillDTO billDTO)
        {
            if (id != billDTO.BillId)
            {
                return BadRequest();
            }

            var bill = _context.Bills.Find(id);
            if (bill == null)
            {
                return NotFound();
            }

            bill.ReservationId = billDTO.ReservationId;
            bill.StayDates = billDTO.StayDates;
            bill.ServiceAmounts = billDTO.ServiceAmounts;
            bill.Taxes = billDTO.Taxes;

            // Calculate and set the Total
            billDTO.Total = bill.ServiceAmounts + bill.Taxes;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Bills/5
        [HttpDelete("DeleteById")]
        public IActionResult DeleteBill(int id)
        {
            var bill = _context.Bills.Find(id);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
