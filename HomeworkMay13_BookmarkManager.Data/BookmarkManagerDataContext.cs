using Microsoft.EntityFrameworkCore;

namespace HomeworkMay13_BookmarkManager.Data;

public class BookmarkManagerDataContext : DbContext
{
    private readonly string _connectionString;

    public BookmarkManagerDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
        modelBuilder.Entity<TopBookmark>().HasNoKey().ToView("view_that_doesn't_exist");
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Bookmark> Bookmarks { get; set; }
    public DbSet<TopBookmark> TopBookmarks { get; set; }
}