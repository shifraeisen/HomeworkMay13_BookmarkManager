using HomeworkMay13_BookmarkManager.Data;
using HomeworkMay13_BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HomeworkMay13_BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost("Signup")]
        public void Signup(SignupModel user)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(user, user.Password);
        }
        [HttpPost("Login")]
        public User Login(LoginModel m)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(m.Email, m.Password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, m.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();
            return user;
        }
        [HttpGet("GetCurrentUser")]
        public User GetCurrentUser()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
        [HttpPost]
        [Route("Logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
