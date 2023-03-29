using System.Text.Json.Serialization;

namespace ItemsManager.Database.Entities;

public class RefreshTokenDb
{
    [JsonIgnore]
    public int Id { get; set; }

    public string Token { get; set; }
    public DateTime ExpiredAt { get; set; }
    public bool IsExpired => DateTime.UtcNow >= ExpiredAt;
    public DateTime CreatedAt { get; set; }
    public string CreationById { get; set; }
    public DateTime? RevokedAt { get; set; }
    public string RevokenByIp { get; set; }
    public string ReplacedByToken { get; set; }
    public bool IsActive => RevokedAt == null && !IsExpired;
}