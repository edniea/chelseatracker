using ChelseaTracker.Core.Models;

namespace ChelseaTracker.Data.Repositories
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<Player>> GetAllAsync();
        Task<Player?> GetByIdAsync(int id);
        Task<Player?> GetByJerseyNumberAsync(int jerseyNumber);
        Task<Player> CreateAsync(Player player);
        Task<Player> UpdateAsync(Player player);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
