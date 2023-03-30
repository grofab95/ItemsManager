using AutoMapper;
using AutoMapper.QueryableExtensions;
using ItemsManager.Core;
using ItemsManager.Core.Users;
using ItemsManager.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Database.Stores;

public class UserStore : IUserStore
{
    private readonly ILogger<UserStore> _logger;
    private readonly IMapper _mapper;
    private readonly UserManager<UserDb> _userManager;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public UserStore(ILogger<UserStore> logger,
        IMapper mapper,
        UserManager<UserDb> userManager,
        IServiceScopeFactory serviceScopeFactory)
    {
        _logger = logger;
        _mapper = mapper;
        _userManager = userManager;
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task<Result<User>> AddUser(string email, string password)
    {
        try
        {
            var userDb = new UserDb
            {
                Email = email,
                UserName = email.Replace("@", string.Empty)
            };
            
            var createResult = await _userManager.CreateAsync(userDb, password);
            if (createResult.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(email);
                return Result<User>.WithSuccess(_mapper.Map<User>(user));
            }

            var joinedErrors = string.Join(" ", createResult.Errors.Select(x => x.Description));
            return Result<User>.WithError(joinedErrors);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "AddUser error");
            return Result<User>.WithError(e.Message);
        }
    }

    public async Task<Result<User[]>> GetUsers()
    {
        try
        {
            await using var dbContext = _serviceScopeFactory.CreateScope().ServiceProvider
                .GetRequiredService<ItemsManagerContext>();

            var users = await dbContext.Users
                .ProjectTo<User>(_mapper.ConfigurationProvider)
                .ToArrayAsync();

            return Result<User[]>.WithSuccess(users);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "AddUser error");
            return Result<User[]>.WithError(e.Message);
        }
    }

    public async Task<Result<User>> GetUser(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user == null 
                ? Result<User>.WithError("User not found") 
                : Result<User>.WithSuccess(_mapper.Map<User>(user));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetUser error | UserId={UserId}", userId);
            return Result<User>.WithError(e.Message);
        }
    }
}