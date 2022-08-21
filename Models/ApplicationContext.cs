using Microsoft.EntityFrameworkCore;

namespace Library.Models
{
    public class ApplicationContext: DbContext
    {
        public DbSet<Book> Books { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {

            try
            {
                Database.EnsureCreated();
            }
            catch
            {

            }

        }
    }
}
