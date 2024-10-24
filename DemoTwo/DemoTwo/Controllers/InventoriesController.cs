using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoTwo.Models;
using Microsoft.AspNetCore.Authorization;

namespace DemoTwo.Controllers
{
    [Authorize(Roles = "Manager")]
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public InventoriesController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Inventories
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Inventory>>> GetInventoryItems()
        {
            return await _context.InventoryItems.ToListAsync();
        }

        // GET: api/Inventories/5
        [HttpGet("GetById")]
        public async Task<ActionResult<Inventory>> GetInventory(int id)
        {
            var inventory = await _context.InventoryItems.FindAsync(id);

            if (inventory == null)
            {
                return NotFound();
            }

            return inventory;
        }

        // PUT: api/Inventories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateById")]
        public async Task<IActionResult> PutInventory(int id, Inventory inventory)
        {
            if (id != inventory.InventoryId)
            {
                return BadRequest();
            }

            _context.Entry(inventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryExists(id))
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

        // POST: api/Inventories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddAll")]
        public async Task<ActionResult<Inventory>> PostInventory(Inventory inventory)
        {
            _context.InventoryItems.Add(inventory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInventory", new { id = inventory.InventoryId }, inventory);
        }

        // DELETE: api/Inventories/5
        [HttpDelete("DeleteById")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            var inventory = await _context.InventoryItems.FindAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }

            _context.InventoryItems.Remove(inventory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InventoryExists(int id)
        {
            return _context.InventoryItems.Any(e => e.InventoryId == id);
        }
    }
}
