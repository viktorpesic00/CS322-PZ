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
    public class ZanrController : ControllerBase
    {
        public BibliotekaContext Context { get; set; }

        public ZanrController(BibliotekaContext context)
        {
            Context = context;
        }

        // GET: /Zanr
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zanr>>> GetZanrovi()
        {
            try
            {
                return await Context.Zanr.ToListAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: /Zanr/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Zanr>> GetZanr(int id)
        {
            var zanr = await Context.Zanr.FindAsync(id);

            if (zanr == null)
            {
                return NotFound("Zanr nije pronadjen.");
            }

            return zanr;
        }

        // POST: /Zanr
        [HttpPost]
        public async Task<ActionResult<Zanr>> PostZanr(Zanr zanr)
        {
            try
            {
                Context.Zanr.Add(zanr);
                await Context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetZanr), new { id = zanr.ID }, zanr);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: /Zanr/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZanr(int id, Zanr zanr)
        {
            if (id != zanr.ID)
            {
                return BadRequest("ID zanra se ne poklapa.");
            }

            Context.Entry(zanr).State = EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZanrExists(id))
                {
                    return NotFound("Zanr nije pronadjen.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Zanr/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZanr(int id)
        {
            var zanr = await Context.Zanr.FindAsync(id);
            if (zanr == null)
            {
                return NotFound("Zanr nije pronadjen.");
            }

            Context.Zanr.Remove(zanr);
            await Context.SaveChangesAsync();

            return NoContent();
        }

        private bool ZanrExists(int id)
        {
            return Context.Zanr.Any(e => e.ID == id);
        }
    }
}
