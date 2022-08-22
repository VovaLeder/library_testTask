using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Library.Models;

namespace Library.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class BooksController : Controller
    {
        private readonly ApplicationContext _context;

        public BooksController(ApplicationContext context)
        {
            _context = context;
        }

        //GET api/books
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_context.Books.ToList());
        }


        //GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Book? book = _context.Books.FirstOrDefault(x => x.Id == id);
            return Ok(book);
        }

        //POST api/books
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Book book)
        {
            book.PublishDate = book.PublishDate.ToUniversalTime().AddDays(1);
            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book);
        }

        //PUT api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Book book)
        {
            Book old_book = _context.Books.First(x => x.Id == id);
            old_book.Title = book.Title;
            old_book.PublishDate = book.PublishDate.ToUniversalTime().AddDays(1);
            old_book.Genre = book.Genre;
            old_book.Author = book.Author;

            _context.SaveChanges();

            return NoContent();
        }

        //DELETE api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Book book = _context.Books.First(x => x.Id == id);

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
