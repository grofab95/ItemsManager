using AutoMapper;
using ItemsManager.Core;
using ItemsManager.Core.Users;
using ItemsManager.Database.Entities;

namespace ItemsManager.Database.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, UserDb>();
        CreateMap<UserDb, User>();
    }
}