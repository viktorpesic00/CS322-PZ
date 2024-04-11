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
    public class ClanController : ControllerBase
    {
        private readonly BibliotekaContext _context;

        public ClanController(BibliotekaContext context)
        {
            _context = context;
        }

        // GET: /Clan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clan>>> GetClanove()
        {
            try
            {
                return await _context.Clan.ToListAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: /Clan/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Clan>> GetClan(int id)
        {
            var clan = await _context.Clan.FindAsync(id);

            if (clan == null)
            {
                return NotFound("Clan nije pronadjen.");
            }

            return clan;
        }

        // POST: /Clan
        [HttpPost]
        public async Task<ActionResult<Clan>> PostClan(Clan clan)
        {
            try
            {
                _context.Clan.Add(clan);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetClan), new { id = clan.ID }, clan);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: /Clan/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClan(int id, Clan clan)
        {
            if (id != clan.ID)
            {
                return BadRequest("ID clana se ne poklapa.");
            }

            _context.Entry(clan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClanExists(id))
                {
                    return NotFound("Clan nije pronadjen.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Clan/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClan(int id)
        {
            var clan = await _context.Clan.FindAsync(id);
            if (clan == null)
            {
                return NotFound("Clan nije pronadjen.");
            }

            _context.Clan.Remove(clan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClanExists(int id)
        {
            return _context.Clan.Any(e => e.ID == id);
        }
    }
}
