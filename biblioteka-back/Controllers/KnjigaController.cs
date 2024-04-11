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
    public class KnjigaController : ControllerBase
    {
        private readonly BibliotekaContext _context;

        public KnjigaController(BibliotekaContext context)
        {
            _context = context;
        }

        // GET: /Knjiga
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetKnjige()
        {
            var knjige = await _context.Knjige
                .Select(k => new {
                    k.ID,
                    k.Naziv,
                    k.Opis,
                    k.SlikaURL,
                    Autor = _context.Autor.FirstOrDefault(a => a.ID == k.AutorId),
                    Zanr = _context.Zanr.FirstOrDefault(z => z.ID == k.ZanrId)
                })
                .ToListAsync();

            return Ok(knjige);
        }


        // GET: /Knjiga/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetKnjiga(int id)
        {
            var knjiga = await _context.Knjige
                .Where(k => k.ID == id)
                .Select(k => new {
                    k.ID,
                    k.Naziv,
                    k.Opis,
                    k.SlikaURL,
                    Autor = _context.Autor.FirstOrDefault(a => a.ID == k.AutorId),
                    Zanr = _context.Zanr.FirstOrDefault(z => z.ID == k.ZanrId)
                })
                .FirstOrDefaultAsync();

            if (knjiga == null)
            {
                return NotFound("Knjiga nije pronadjena.");
            }

            return knjiga;
        }

        // POST: /Knjiga
        [HttpPost]
        public async Task<ActionResult<Knjiga>> PostKnjiga([FromBody] Knjiga knjiga)
        {
            try
            {
                Console.WriteLine("Autor: " + knjiga.AutorId);

                var autorExists = await _context.Autor.AnyAsync(a => a.ID == knjiga.AutorId);
                var zanrExists = await _context.Zanr.AnyAsync(z => z.ID == knjiga.ZanrId);

                if (!autorExists || !zanrExists)
                {
                    return NotFound("Autor or Zanr not found.");
                }

                _context.Knjige.Add(knjiga);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetKnjiga), new { id = knjiga.ID }, knjiga);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: /Knjiga/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKnjiga(int id, Knjiga knjiga)
        {
            if (id != knjiga.ID)
            {
                return BadRequest("ID knjige se ne poklapa.");
            }

            try
            {
                _context.Entry(knjiga).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Knjige.Any(k => k.ID == id))
                {
                    return NotFound("Knjiga nije pronadjena.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Knjiga/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKnjiga(int id)
        {
            var knjiga = await _context.Knjige.FindAsync(id);
            if (knjiga == null)
            {
                return NotFound("Knjiga nije pronadjena.");
            }

            _context.Knjige.Remove(knjiga);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}
