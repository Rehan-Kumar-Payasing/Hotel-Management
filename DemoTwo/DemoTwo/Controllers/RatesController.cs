using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using DemoTwo.Models;

namespace DemoTwo.Controllers
{
    [Authorize(Roles = "Manager")]
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public RatesController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Rates
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Rate>>> GetRate()
        {
            return await _context.Rate.ToListAsync();
        }

        // GET: api/Rates/5
        [HttpGet("GetById")]
        public async Task<ActionResult<Rate>> GetRate(int id)
        {
            var rate = await _context.Rate.FindAsync(id);

            if (rate == null)
            {
                return NotFound();
            }

            return rate;
        }

        // PUT: api/Rates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateById")]
        public async Task<IActionResult> PutRate(int id, Rate rate)
        {
            if (id != rate.RateId)
            {
                return BadRequest();
            }

            _context.Entry(rate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddAll")]
        public async Task<ActionResult<Rate>> PostRate(Rate rate)
        {
            _context.Rate.Add(rate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRate", new { id = rate.RateId }, rate);
        }

        // DELETE: api/Rates/5
        [HttpDelete("DeleteById")]
        public async Task<IActionResult> DeleteRate(int id)
        {
            var rate = await _context.Rate.FindAsync(id);
            if (rate == null)
            {
                return NotFound();
            }

            _context.Rate.Remove(rate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RateExists(int id)
        {
            return _context.Rate.Any(e => e.RateId == id);
        }
    }
}
