using AutoMapper;
using ItemsManager.Api.Authentication.Dto;
using ItemsManager.Api.Authentication.Requests;
using ItemsManager.Api.Models;
using ItemsManager.Authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Api.Authentication;

[ApiController]
[Authorize]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IAuthenticationService _authenticationService;
    private readonly IMapper _mapper;

    public AuthenticationController(ILogger<AuthenticationController> logger,
        IAuthenticationService authenticationService,
        IMapper mapper)
    {
        _logger = logger;
        _authenticationService = authenticationService;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public async Task<ApiResponse<UserWithTokensDto>> Login([FromBody] LoginRequest request)
    {
        _logger.LogInformation("Login | Username={Username}", request.Email);

        if (!ModelState.IsValid)
        {
            _logger.LogInformation("Login | Model is not valid");
            return ApiResponse<UserWithTokensDto>.Failure(string.Empty);
        }

        var authenticationResult = await _authenticationService.Authenticate(request.Email, request.Password, GetRequestIpAddress());
        return authenticationResult.IsSuccess 
            ? ApiResponse<UserWithTokensDto>.Success(_mapper.Map<UserWithTokensDto>(authenticationResult.Value)) 
            : ApiResponse<UserWithTokensDto>.Failure(authenticationResult.Error);
    }
    
    [HttpPost]
    [Route("refresh-token")]
    public async Task<ApiResponse<UserWithTokensDto>> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        _logger.LogInformation("Login | RefreshToken");
        
        var refreshTokenResult = await _authenticationService.RefreshToken(request.RefreshToken);
        return refreshTokenResult.IsSuccess
            ?  ApiResponse<UserWithTokensDto>.Success(_mapper.Map<UserWithTokensDto>(refreshTokenResult.Value))
            : ApiResponse<UserWithTokensDto>.Failure(refreshTokenResult.Error);
    }
    
    [HttpPost]
    [Route("revoke-token")]
    public async Task<ApiResponse> RevokeToken([FromBody] RevokeTokenRequest request)
    {
        _logger.LogInformation("Login | RevokeToken");
        
        var revokeTokenResult = await _authenticationService.RevokeToken(request.RefreshToken);
        return revokeTokenResult.IsSuccess
            ? ApiResponse.Success()
            : ApiResponse.Failure(revokeTokenResult.Error);
    }
    
    private string GetRequestIpAddress()
    {
        return Request.Headers.ContainsKey("X-Forwarded-For")
            ? Request.Headers["X-Forwarded-For"]!
            : HttpContext?.Connection?.RemoteIpAddress?.MapToIPv4().ToString()!;
    }
}