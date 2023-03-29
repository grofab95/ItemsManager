using AutoMapper;
using ItemsManager.Api.Users.GetUsers;
using ItemsManager.Core.Users;

namespace ItemsManager.Api.Users;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<UserGetDto, User>();
        CreateMap<User, UserGetDto>();
    }
}