namespace ItemsManager.Core.Users;

public class UserWithTokens
{
    public User User { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    public UserWithTokens(User user, string accessToken, string refreshToken)
    {
        User = user;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }
}