using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IznajmljivanjeController : ControllerBase
    {
        private readonly BibliotekaContext _context;

        public IznajmljivanjeController(BibliotekaContext context)
        {
            _context = context;
        }

        // GET: /Iznajmljivanje
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Iznajmljivanje>>> GetIznajmljivanja()
        {
            try
            {
                return await _context.Iznajmljivanje.ToListAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: /Iznajmljivanje/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Iznajmljivanje>> GetIznajmljivanje(int id)
        {
            var iznajmljivanje = await _context.Iznajmljivanje.FindAsync(id);

            if (iznajmljivanje == null)
            {
                return NotFound("Iznajmljivanje nije pronadjeno.");
            }

            return iznajmljivanje;
        }

        // POST: /Iznajmljivanje
        [HttpPost]
        public async Task<ActionResult<Iznajmljivanje>> PostIznajmljivanje(Iznajmljivanje iznajmljivanje)
        {
            try
            {
                _context.Iznajmljivanje.Add(iznajmljivanje);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetIznajmljivanje), new { id = iznajmljivanje.ID }, iznajmljivanje);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: /Iznajmljivanje/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIznajmljivanje(int id, Iznajmljivanje iznajmljivanje)
        {
            if (id != iznajmljivanje.ID)
            {
                return BadRequest("ID iznajmljivanja se ne poklapa.");
            }

            _context.Entry(iznajmljivanje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IznajmljivanjeExists(id))
                {
                    return NotFound("Iznajmljivanje nije pronadjeno.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Iznajmljivanje/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIznajmljivanje(int id)
        {
            var iznajmljivanje = await _context.Iznajmljivanje.FindAsync(id);
            if (iznajmljivanje == null)
            {
                return NotFound("Iznajmljivanje nije pronadjeno.");
            }

            _context.Iznajmljivanje.Remove(iznajmljivanje);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IznajmljivanjeExists(int id)
        {
            return _context.Iznajmljivanje.Any(e => e.ID == id);
        }
    }
}
