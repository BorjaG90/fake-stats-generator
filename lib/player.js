const { names } = require("./names");
const MAX_MINUTES = 48;
const MAX_FOULS = 6;
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

function generateGame(home, away) {
  let { points:homePoints, team:newHome } = generateStats(home);
  let { points:awayPoints, team:newAway } = generateStats(away);
  let winner = newHome.id;
  if (homePoints < awayPoints) { winner = newAway.id; }

  return { newHome, newAway, winner };
}

function generateStats(team) {
  let team2pm = 0;
  let team3pm = 0;
  let teamFtm = 0;
  let team2pa = 0;
  let team3pa = 0;
  let teamFta = 0;
  let teamOffReb = 0;
  let teamDefReb = 0;
  let teamAss = 0;
  let teamSte = 0;
  let teamBlk = 0;
  let teamTos = 0;
  let teamFouls = 0;

  const minutes = generateMinutes();

  // Generamos las estadisticas de los jugadores
  for (let index = 0; index < 12; index++) {
    let playerMin = minutes[index];
    let player2pm = Math.floor(Math.random() * (playerMin * 0.25));
    let player3pm = Math.floor(Math.random() * (playerMin * 0.125));
    let playerFtm = Math.floor(Math.random() * (playerMin * 0.15));
    let playerStats = {
      "2pm": player2pm,
      "3pm": player3pm,
      "ftm": playerFtm,
      "2pa": player2pm + Math.floor(Math.random() * 15),
      "3pa": player3pm + Math.floor(Math.random() * 10),
      "fta": playerFtm + Math.floor(Math.random() * 5),
      "offReb": Math.floor(Math.random() * (playerMin * 0.1)),
      "defReb": Math.floor(Math.random() * (playerMin * 0.3)),
      "ass": Math.floor(Math.random() * (playerMin * 0.15)),
      "ste": Math.floor(Math.random() * (playerMin * 0.05)),
      "blk": Math.floor(Math.random() * (playerMin * 0.05)),
      "tos": Math.floor(Math.random() * (playerMin * 0.1)),
      "foul": Math.floor(Math.random() * MAX_FOULS),
      "min": playerMin,
    };
    team.players[index].stats = playerStats;
    team2pm += player2pm;
    team3pm += player3pm;
    teamFtm += playerFtm;
    team2pa += playerStats.player2pa;
    team3pa += playerStats.player3pa;
    teamFta += playerStats.playerFta;
    teamOffReb += playerStats.offReb;
    teamDefReb += playerStats.defReb;
    teamAss += playerStats.ass;
    teamSte += playerStats.ste;
    teamBlk += playerStats.blk;
    teamTos += playerStats.tos;
    teamFouls += playerStats.foul;
  }

  // Asignamos el acumulado de los jugadores como esadisticas del equipo
  team.stats = {
    "2pm": team2pm,
    "3pm": team3pm,
    "ftm": teamFtm,
    "2pa": team2pa,
    "3pa": team3pa,
    "fta": teamFta,
    "offReb": teamOffReb,
    "defReb": teamDefReb,
    "ass": teamAss,
    "ste": teamSte,
    "blk": teamBlk,
    "tos": teamTos,
    "foul": teamFouls,
    "min": MAX_MINUTES * 5,
  };

  // Devolvemos los puntos calculados con el objeto
  // para la comparación de ganador
  let points = team2pm * 2 + team3pm * 3 + teamFtm;
  return { points, team };
}

/**
 * Funcion que devuelve una asignacion aleatoria de minutos a los 12 jugadores
 */
function generateMinutes() {
  let one = Math.floor(Math.random() * 15) + 25;
  let two = Math.floor(Math.random() * 15) + 25;
  let three = Math.floor(Math.random() * 15) + 25;
  let four = Math.floor(Math.random() * 15) + 25;
  let five = Math.floor(Math.random() * 15) + 25;

  return [
    one,
    two,
    three,
    four,
    five,
    MAX_MINUTES - 2 - one,
    MAX_MINUTES - 2 - two,
    MAX_MINUTES - 2 - three,
    MAX_MINUTES - 2 - four,
    MAX_MINUTES - 2 - five,
    5,
    5,
  ];
}

module.exports = {
  fillTeams,
  generateGame,
};
