using AutoMapper;
using ItemsManager.Api.Models;
using ItemsManager.Api.Users.AddUser;
using ItemsManager.Api.Users.GetUsers;
using ItemsManager.Application.Users.AddUser;
using ItemsManager.Application.Users.GetUsers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ItemsManager.Api.Users;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public UsersController(ILogger<UsersController> logger, IMediator mediator, IMapper mapper)
    {
        _logger = logger;
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ApiResponse<UserGetDto[]>> GetUsers(GetUsersRequest request)
    {
        _logger.LogInformation("GetUsers | Request={@Request}", request);

        var queryResult = await _mediator.Send(new GetUsersQuery());
        if (queryResult.IsFailure)
        {
            return ApiResponse<UserGetDto[]>.Failure(queryResult.Error!);
        }

        var dto = _mapper.Map<UserGetDto[]>(queryResult.Data);
        return ApiResponse<UserGetDto[]>.Success(dto);
    }

    [HttpPost]
    public async Task<ApiResponse<UserGetDto>> AddUser(AddUserRequest request)
    {
        _logger.LogInformation("AddUser | Email={Email}", request.Email);

        var commandResult = await _mediator.Send(new AddUserCommand(request.Email, request.Password));
        if (commandResult.IsFailure)
        {
            return ApiResponse<UserGetDto>.Failure(commandResult.Error!);
        }

        var dto = _mapper.Map<UserGetDto>(commandResult.User);
        return ApiResponse<UserGetDto>.Success(dto);
    }
}