using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BotX.Api.Configuration
{
    public class StaticFileHeaders
    {
        public string Key { get; set; }

        public string Value { get; set; }
    }
    public class StaticFileConfig
    {
        public string StaticFilesOrigin { get; set; }

        public StaticFileHeaders[] Headers { get; set; }
    }
}
