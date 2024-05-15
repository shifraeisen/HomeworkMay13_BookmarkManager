using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeworkMay13_BookmarkManager.Data
{
    public class Bookmark
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int UserID { get; set; }
    }
}
