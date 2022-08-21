using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Library.Models;

namespace Library.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class BooksController : ControllerBase
    {
        private readonly BookService bookService;
        public BooksController(BookService bookService)
        {
            this.bookService = bookService;
        }

        //GET api/books
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(bookService.GetAll());
        }


        //GET api/books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(bookService.GetById(id));
        }

        //POST api/books
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Book book)
        {
            return CreatedAtAction("Get", new { id = book.Id }, bookService.Create(book));
        }

        //PUT api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Book book)
        {
            bookService.Update(id, book);
            return NoContent();
        }

        //DELETE api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bookService.Delete(id);
            return NoContent();
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
