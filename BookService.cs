using Library.Models;

namespace Library
{
    public class BookService
    {
        private static List<Book> books = new List<Book>();
        private static int Count = 1;

        private static readonly string[] titles = new string[] { "Konosuba", "Bakuen", "ToraDora" };
        private static readonly string[] authors = new string[] { "Natsume Akatsuki", "Natsume Akatsuki", "Yuyuko Takemiya" };
        private static readonly DateTime[] publishDates = new DateTime[] { new DateTime(2014, 6, 28), new DateTime(2013, 10, 1) ,new DateTime(2006, 3, 10) };
        
        static BookService()
        {
            for (int i = 0; i < 3; i++)
            {
                Book book = new Book
                {
                    Id = Count++,
                    Title = titles[i],
                    PublishDate = publishDates[i],
                    Genre = "Light Novel",
                    Author = authors[i]
                };
                books.Add(book);
            }
        }
        public List<Book> GetAll()
        {
            return books;
        }
        public Book GetById(int id)
        {
            return books.Where(book => book.Id == id).FirstOrDefault();
        }
        public Book Create(Book book) 
        {
            book.Id = Count++;
            books.Add(book);
            return book;
        }
        public void Update(int id, Book book)
        {
            Book found = books.Where(n => n.Id == id).FirstOrDefault();
            found.Title = book.Title;
            found.PublishDate = book.PublishDate;
            found.Genre = book.Genre;
            found.Author = book.Author;
        }
        public void Delete(int id) 
        {
            books.RemoveAll(book => book.Id == id);
        }
    }
}
