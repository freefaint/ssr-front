namespace Bivgroup.YagokSSR.SmartApp.Helpers
{
    public static class HttpClientHelpers
    {
        public static void CreateAuthHeaders(this HttpClient httpClient, string token)
        {
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        }

    }
}
