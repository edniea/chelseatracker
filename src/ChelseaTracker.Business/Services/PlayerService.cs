using ChelseaTracker.Core.DTOs;
using ChelseaTracker.Core.Models;
using ChelseaTracker.Data.Repositories;

namespace ChelseaTracker.Business.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<IEnumerable<PlayerDto>> GetAllPlayersAsync()
        {
            var players = await _playerRepository.GetAllAsync();
            return players.Select(MapToDto);
        }

        public async Task<PlayerDto?> GetPlayerByIdAsync(int id)
        {
            var player = await _playerRepository.GetByIdAsync(id);
            return player != null ? MapToDto(player) : null;
        }

        public async Task<PlayerDto> CreatePlayerAsync(CreatePlayerDto createPlayerDto)
        {
            var player = new Player
            {
                FirstName = createPlayerDto.FirstName,
                LastName = createPlayerDto.LastName,
                Position = createPlayerDto.Position,
                JerseyNumber = createPlayerDto.JerseyNumber,
                DateOfBirth = createPlayerDto.DateOfBirth,
                Nationality = createPlayerDto.Nationality
            };

            var createdPlayer = await _playerRepository.CreateAsync(player);
            return MapToDto(createdPlayer);
        }

        public async Task<PlayerDto?> UpdatePlayerAsync(int id, UpdatePlayerDto updatePlayerDto)
        {
            var existingPlayer = await _playerRepository.GetByIdAsync(id);
            if (existingPlayer == null)
                return null;

            if (updatePlayerDto.FirstName != null)
                existingPlayer.FirstName = updatePlayerDto.FirstName;
            if (updatePlayerDto.LastName != null)
                existingPlayer.LastName = updatePlayerDto.LastName;
            if (updatePlayerDto.Position != null)
                existingPlayer.Position = updatePlayerDto.Position;
            if (updatePlayerDto.JerseyNumber.HasValue)
                existingPlayer.JerseyNumber = updatePlayerDto.JerseyNumber;
            if (updatePlayerDto.DateOfBirth.HasValue)
                existingPlayer.DateOfBirth = updatePlayerDto.DateOfBirth;
            if (updatePlayerDto.Nationality != null)
                existingPlayer.Nationality = updatePlayerDto.Nationality;
            if (updatePlayerDto.IsActive.HasValue)
                existingPlayer.IsActive = updatePlayerDto.IsActive.Value;

            var updatedPlayer = await _playerRepository.UpdateAsync(existingPlayer);
            return MapToDto(updatedPlayer);
        }

        public async Task<bool> DeletePlayerAsync(int id)
        {
            return await _playerRepository.DeleteAsync(id);
        }

        public async Task<bool> PlayerExistsAsync(int id)
        {
            return await _playerRepository.ExistsAsync(id);
        }

        private static PlayerDto MapToDto(Player player)
        {
            return new PlayerDto
            {
                Id = player.Id,
                FirstName = player.FirstName,
                LastName = player.LastName,
                Position = player.Position,
                JerseyNumber = player.JerseyNumber,
                DateOfBirth = player.DateOfBirth,
                Nationality = player.Nationality,
                IsActive = player.IsActive
            };
        }
    }
}
