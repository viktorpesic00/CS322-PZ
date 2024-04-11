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
    public class AutorController : ControllerBase
    {
        public BibliotekaContext Context { get; set; }

        public AutorController(BibliotekaContext context)
        {
            Context = context;
        }

        // GET: /Autor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutore()
        {
            try
            {
                return await Context.Autor.ToListAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: /Autor/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Autor>> GetAutor(int id)
        {
            var autor = await Context.Autor.FindAsync(id);

            if (autor == null)
            {
                return NotFound("Autor nije pronadjen.");
            }

            return autor;
        }

        // POST: /Autor
        [HttpPost]
        public async Task<ActionResult<Autor>> PostAutor(Autor autor)
        {
            try
            {
                Context.Autor.Add(autor);
                await Context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAutor), new { id = autor.ID }, autor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: /Autor/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutor(int id, Autor autor)
        {
            if (id != autor.ID)
            {
                return BadRequest("ID autora se ne poklapa.");
            }

            Context.Entry(autor).State = EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutorExists(id))
                {
                    return NotFound("Autor nije pronadjen.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Autor/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutor(int id)
        {
            var autor = await Context.Autor.FindAsync(id);
            if (autor == null)
            {
                return NotFound("Autor nije pronadjen.");
            }

            Context.Autor.Remove(autor);
            await Context.SaveChangesAsync();

            return NoContent();
        }

        private bool AutorExists(int id)
        {
            return Context.Autor.Any(e => e.ID == id);
        }
    }
}
