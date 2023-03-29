using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using AutoMapper;
using ItemsManager.Authentication.Handlers;
using ItemsManager.Core;
using ItemsManager.Core.Users;
using ItemsManager.Database;
using ItemsManager.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.JsonWebTokens;

namespace ItemsManager.Authentication.Services;

public class AuthenticationService : IAuthenticationService
{
    private const string PermissionClaim = "https://itemsmanager.pl/identity/claims/permission";

    private readonly ILogger<AuthenticationService> _logger;
    private readonly UserManager<UserDb> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ITokenHandler _tokenHandler;
    private readonly IMapper _mapper;

    public AuthenticationService(ILogger<AuthenticationService> logger,
        UserManager<UserDb> userManager,
        RoleManager<IdentityRole> roleManager, 
        IServiceScopeFactory serviceScopeFactory,
        ITokenHandler tokenHandler, 
        IMapper mapper)
    {
        _logger = logger;
        _userManager = userManager;
        _roleManager = roleManager;
        _serviceScopeFactory = serviceScopeFactory;
        _tokenHandler = tokenHandler;
        _mapper = mapper;
    }

    public async Task<Result<UserWithTokens>> Authenticate(string email, string password, string ipAddress)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return Result<UserWithTokens>.WithError("Email not found");
        }

        if (!await _userManager.CheckPasswordAsync(user, password))
        {
            return Result<UserWithTokens>.WithError("Incorrect password");
        }

        try
        {
            var accessToken = await GetAccessToken(user);
            var refreshToken = GetRefreshToken();
        
            user.RefreshTokens ??= new List<RefreshTokenDb>();
            user.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(user);
        
            var userWithTokens = new UserWithTokens(_mapper.Map<User>(user), accessToken, refreshToken.Token);
            return Result<UserWithTokens>.WithSuccess(userWithTokens);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Authenticate error. Username={Username}", email);
            return Result<UserWithTokens>.WithError("An error occurred during authentication");
        }
    }

    public async Task<Result<UserWithTokens>> RefreshToken(string token)
    {
        try
        {
            await using var dbContext = _serviceScopeFactory.CreateScope().ServiceProvider
                .GetRequiredService<ItemsManagerContext>();

            var user = await dbContext.Users
                           //.Include(x => x.RefreshTokens)
                           .SingleOrDefaultAsync(x => x.RefreshTokens.Any(y => y.Token == token))
                       ?? throw new Exception("Invalid token");

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);
            if (!refreshToken.IsActive)
                throw new Exception("Invalid token");

            var newRefreshToken = GetRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            user.RefreshTokens.Remove(refreshToken);
            dbContext.Update(user);
            await dbContext.SaveChangesAsync();
            var jwtToken = await GetAccessToken(user);
            
            return Result<UserWithTokens>.WithSuccess(
                new UserWithTokens(_mapper.Map<User>(user), jwtToken, newRefreshToken.Token));
        }
        catch (Exception e)
        {
           _logger.LogError(e, "RefreshToken error. Token={Token}", token);
           return Result<UserWithTokens>.WithError("An error occurred during refreshing token");
        }
    }

    public async Task RevokeToken(string token)
    {
        await using var dbContext = _serviceScopeFactory.CreateScope().ServiceProvider
            .GetRequiredService<ItemsManagerContext>();
        
        var user = await dbContext.Users
                      .Include(x => x.RefreshTokens)
                      .SingleOrDefaultAsync(x => x.RefreshTokens.Any(y => y.Token == token))
                  ?? throw new Exception("Invalid token");
        
        var refreshToken = user.RefreshTokens.Single(x => x.Token == token);
        if (!refreshToken.IsActive)
            throw new Exception("Invalid token");
        
        refreshToken.RevokedAt = DateTime.Now;
        dbContext.Update(user);
        await dbContext.SaveChangesAsync();
    }

    private async Task<string> GetAccessToken(UserDb user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        var userPermissions = new List<Claim>();
        foreach (var userRole in userRoles)
        {
            var role = _roleManager.Roles.FirstOrDefault(x => x.Name == userRole);
            if (role == null)
                continue;
                
            userPermissions.AddRange(await _roleManager.GetClaimsAsync(role));
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.UserData, JsonSerializer.Serialize(new { isActive = user.IsActive })),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
            
        claims.AddRange(userRoles.Select(x => new Claim(ClaimTypes.Role, x)));
        claims.AddRange(userPermissions.Select(x => new Claim(PermissionClaim, x.Value)));

        var currentDateTime = DateTime.Now;
        return await _tokenHandler.GenerateAccessToken(
            claims,
            currentDateTime,
            currentDateTime.AddMinutes(30) // to appsettings
        );
    }

    public RefreshTokenDb GetRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rngCrypto = RandomNumberGenerator.Create();
        rngCrypto.GetBytes(randomBytes);
        return new RefreshTokenDb
        {
            Token = Convert.ToBase64String(randomBytes),
            CreatedAt = DateTime.Now,
            ExpiredAt = DateTime.Now.AddMinutes(5),
            //ExpiredAt = DateTime.Now.AddDays(1),
            CreationById = "maybe id",
            ReplacedByToken = "maybe token",
            RevokenByIp = "maybe ip"
        };
    }
}