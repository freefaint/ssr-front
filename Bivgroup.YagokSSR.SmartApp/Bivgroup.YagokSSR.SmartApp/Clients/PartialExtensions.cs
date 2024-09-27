
using Bivgroup.YagokSSR.SmartApp.Helpers;

namespace Bivgroup.YagokSSR.SmartApp.Scada
{
    public partial class ScadaClient
    { 
       partial void PrepareRequest(System.Net.Http.HttpClient client, System.Net.Http.HttpRequestMessage request, System.Text.StringBuilder urlBuilder)
        {
       // request.Headers.Add("Authorization", ApiHelper.auth_token);
    }
}
}
namespace Bivgroup.YagokSSR.SmartApp.Query
{
    public partial class QueryClient
    {
        partial void PrepareRequest(System.Net.Http.HttpClient client, System.Net.Http.HttpRequestMessage request, System.Text.StringBuilder urlBuilder)
        {
           // request.Headers.Add("Authorization", ApiHelper.auth_token);
        }
    }
}