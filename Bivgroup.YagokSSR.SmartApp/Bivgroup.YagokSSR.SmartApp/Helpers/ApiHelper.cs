using System.Text.Json;
using Bivgroup.YagokSSR.SmartApp.Models;
using BotX.Api.Configuration;
using Microsoft.Extensions.Options;
using Serilog;

namespace Bivgroup.YagokSSR.SmartApp.Helpers
{
    public class ApiHelper
    {
        public static ApiHelper _instance { get; set; }
        private readonly Query.QueryClient _queryClient;
        private readonly Scada.ScadaClient _scadaClient;
        private readonly ILogger<ApiHelper> _logger;
        private readonly YagokApiConfig _yagokApiConfig;
        public string token;
        public ApiHelper(Query.QueryClient queryClient, Scada.ScadaClient scadaClient, IConfiguration configuration,
       ILogger<ApiHelper> logger, IOptions<YagokApiConfig> yagokApiConfig)
        {
            _queryClient = queryClient;
            _scadaClient = scadaClient;
            _yagokApiConfig = yagokApiConfig.Value;
            _logger = logger;
            _instance = this;
            UpdateAuthToken();
        }
        public async void UpdateAuthToken()
        {
            try { 
            using (var client = new HttpClient(ApiHandler()))
            {

                var request = new HttpRequestMessage(HttpMethod.Post, "https://keycloak-yagok.kube.severstal.severstalgroup.com/realms/shtd/protocol/openid-connect/token");
                var collection = new List<KeyValuePair<string, string>>();
                collection.Add(new("grant_type", "client_credentials"));
                collection.Add(new("client_id", _yagokApiConfig.CLIENT_ID));
                collection.Add(new("client_secret", _yagokApiConfig.CLIENT_SECRET));
                var content = new FormUrlEncodedContent(collection);
                request.Content = content;
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                var result_string = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<auth_response>(result_string);
                token = result.access_token;
                    _logger.LogInformation("SHTD API Token obtained.");
            }
            }
            catch (Exception ex) { _logger.LogError(ex.Message); }
        }
        HttpClientHandler ApiHandler()
        {


            return new HttpClientHandler
            {
                AllowAutoRedirect = true,
                UseCookies = false,
                ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
            };
        }
    }
    class auth_response
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }



    }
}
