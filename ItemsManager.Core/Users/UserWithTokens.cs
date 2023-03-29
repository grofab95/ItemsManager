namespace ItemsManager.Core.Users;

public class UserWithTokens : User
{
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

    public UserWithTokens(User user, string accessToken, string refreshToken)
    {
        Id = user.Id;
        Email = user.Email;
        CreatedAt = user.CreatedAt;
        IsActive = user.IsActive;
        IsOnline = user.IsOnline;
        AccessToken = accessToken;
        RefreshToken = refreshToken;
    }
}