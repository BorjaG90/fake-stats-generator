const { names } = require("../data/names");
/**
 * Función que crea 12 jugadores aleatorios por cada equipo existente
 * Recibe un array de objetos que contiene info básica de los equipos y
 * devuelve un array similar pero con un array de jugadores asociados al equipo
 * @param {Array} teamsInfo 
 */
function fillTeams(teamsInfo) {
  let teams = [];
  let playerIndex = 1;
  teamsInfo.forEach((teamInfo) => {
    let team = {};
    team.id = teamInfo.id;
    team.name = teamInfo.name;
    team.competitions = teamInfo.competitions;
    // console.log(`Team: ${team.name}`)
    let players = [];
    for (let index = 0; index < 12; index++) {
      let player = {};
      let randomElement = names[Math.floor(Math.random() * names.length)];
      player.id = playerIndex;
      playerIndex++;
      player.firstname =
        randomElement.firstname[
          Math.floor(Math.random() * randomElement.firstname.length)
        ];
      player.lastname =
        randomElement.lastname[
          Math.floor(Math.random() * randomElement.lastname.length)
        ];
      player.position = Math.floor(Math.random() * 5) + 1;
      // console.log(`Player: ${player.position} - ${player.firstname} ${player.lastname}`);
      players.push(player);
    }
    team.players = players;
    teams.push(team);
  });
  return teams;
}

module.exports = {
  fillTeams,
};
