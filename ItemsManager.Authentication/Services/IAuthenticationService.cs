using ItemsManager.Core;
using ItemsManager.Core.Users;
using ItemsManager.Database.Entities;

namespace ItemsManager.Authentication.Services;

public interface IAuthenticationService
{
    Task<Result<UserWithTokens>> Authenticate(string email, string password, string ipAddress);
    Task<Result<UserWithTokens>> RefreshToken(string token);
    // Task RevokeToken(string token);
    // Task<string> GetAccessToken(UserDb user);
    // RefreshTokenDb GetRefreshToken();
    Task<Result> RevokeToken(string requestRefreshToken);
}