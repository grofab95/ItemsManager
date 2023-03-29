using System.Security.Claims;

namespace ItemsManager.Authentication.Handlers;

public interface ITokenHandler
{
    Task<string> GenerateAccessToken(IEnumerable<Claim> claims, DateTimeOffset notBefore, DateTimeOffset expiresAt);
    Task<string> GenerateRefreshToken();
    ClaimsPrincipal ValidateToken(string token, bool validateLifetime);
}