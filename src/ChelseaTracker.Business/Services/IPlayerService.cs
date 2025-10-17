using ChelseaTracker.Core.DTOs;
using ChelseaTracker.Core.Models;

namespace ChelseaTracker.Business.Services
{
    public interface IPlayerService
    {
        Task<IEnumerable<PlayerDto>> GetAllPlayersAsync();
        Task<PlayerDto?> GetPlayerByIdAsync(int id);
        Task<PlayerDto> CreatePlayerAsync(CreatePlayerDto createPlayerDto);
        Task<PlayerDto?> UpdatePlayerAsync(int id, UpdatePlayerDto updatePlayerDto);
        Task<bool> DeletePlayerAsync(int id);
        Task<bool> PlayerExistsAsync(int id);
    }
}
