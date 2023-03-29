using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;

namespace ItemsManager.Authentication.Handlers;

public class TokenHandler : ITokenHandler
{
    private readonly SymmetricSecurityKey _symmetricSecurityKey;
    private readonly SigningCredentials _signingCredentials;
    private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;

    public TokenHandler()
    {
        _symmetricSecurityKey =
            new SymmetricSecurityKey(Convert.FromBase64String("ZGZnaGRmZ2VkeWVydHlSRGhkZnUzZTQ2NTM0NjVnNDM1djY0NWJ2d3ZiZHh2"));

        _signingCredentials = new SigningCredentials(_symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
    }

    public Task<string> GenerateAccessToken(IEnumerable<Claim> claims, DateTimeOffset notBefore,
        DateTimeOffset expiresAt)
    {
        return Task.FromResult(_jwtSecurityTokenHandler
            .WriteToken(new JwtSecurityToken(
                Constants.Authentication.JwtBearer.Issuer,
                Constants.Authentication.JwtBearer.Audience,
                claims,
                notBefore.DateTime,
                expiresAt.DateTime,
                _signingCredentials
            )));
    }

    public ClaimsPrincipal ValidateToken(string token, bool validateLifetime)
    {
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = validateLifetime,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Constants.Authentication.JwtBearer.Issuer,
            ValidAudience = Constants.Authentication.JwtBearer.Audience,
            IssuerSigningKey = _symmetricSecurityKey,
            RoleClaimType = ClaimTypes.Role
        };

        try
        {
            return _jwtSecurityTokenHandler.ValidateToken(token, validationParameters, out _);
        }
        catch
        {
            return null;
        }
    }

    public Task<string> GenerateRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rngCrypto = RandomNumberGenerator.Create();
        rngCrypto.GetBytes(randomBytes);
        var randomValue = Convert.ToBase64String(randomBytes);
        return Task.FromResult(randomValue);
    }
}