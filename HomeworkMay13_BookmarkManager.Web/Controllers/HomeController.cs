using HomeworkMay13_BookmarkManager.Data;
using HomeworkMay13_BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeworkMay13_BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet("")]
        [AllowAnonymous]
        public List<TopBookmark> GetMostPopularBookmarks()
        {
            var bookmarkRepo = new BookmarkRepository(_connectionString);
            return bookmarkRepo.GetMostPopularBookmarks().OrderByDescending(t => t.Count).ToList();
        }
        [HttpGet("MyBookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);

            var bookmarkRepo = new BookmarkRepository(_connectionString);
            return bookmarkRepo.GetBookmarks(user.Id);
        }
       [HttpPost("AddBookmark")]
        public void AddBookmark(Bookmark b)
        {
            var userRepo = new UserRepository(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            b.UserID = user.Id;

            var bookmarkRepo = new BookmarkRepository(_connectionString);
            bookmarkRepo.AddBookmark(b);
        }
        [HttpPost("Delete")]
        public void DeleteBookmark(DeleteModel m)
        {
            var bookmarkRepo = new BookmarkRepository(_connectionString);
            bookmarkRepo.Delete(m.Id);
        }
        [HttpPost("Update")]
        public void UpdateBookmark(UpdateModel m)
        {
            var bookmarkRepo = new BookmarkRepository(_connectionString);
            bookmarkRepo.Update(m.Title, m.Id);
        }
    }
}
