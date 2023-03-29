using AutoMapper;
using ItemsManager.Api.Authentication.Dto;
using ItemsManager.Core;
using ItemsManager.Core.Users;

namespace ItemsManager.Api.Authentication;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserWithTokens, UserWithTokensDto>();
        CreateMap<UserWithTokensDto, UserWithTokens>();
    }
}