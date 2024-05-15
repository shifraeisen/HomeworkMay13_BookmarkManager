using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkMay13_BookmarkManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Bookmark> GetBookmarks(int userID)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserID == userID).ToList();
        }
        public void AddBookmark(Bookmark b)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Add(b);
            context.SaveChanges();
        }
        public List<TopBookmark> GetMostPopularBookmarks()
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            return context.TopBookmarks.FromSql($"select top 5 Url, count(url) as Count from Bookmarks group by url order by count(url) desc").ToList();
        }
        public void Delete(int id)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Bookmarks.Remove(context.Bookmarks.First(b => b.ID == id));
            context.SaveChanges();
        }
        public void Update(string title, int id)
        {
            using var context = new BookmarkManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"update Bookmarks set Title = {title} where id = {id}");
        }
    }
}
