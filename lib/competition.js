const playerController = require('./player');
function createCompetition(competition, teams) {
  // Obtenemos los equipos pertenecientes a la competicion
  const teams_filtered = teams.filter((team) =>
    team.competitions.includes(competition.id)
  );

  if (competition.type === "League + Playoffs") {
    // Crear 2 competiciones
    // Liga
    let teamsClinched = createLeague(
      teams_filtered,
      competition.games_league,
      competition.clinched
    );
  } else if (competition.type === "League") {
    createLeague(teams_filtered, competition.games_league);
  } else if (competition.type === "Playoffs") {
  } else {
    console.log("ERROR");
  }
}

function createLeague(teams, games, clinched = 0) {
  console.log(
    ` Liga de ${teams.length} equipos y ${games} partido/s contra cada oponente`
  );
  let teamsClinched = [];
  let gamesPlayed = [];
  let homeTeams = [...teams];

  //Realizamos los emparejamientos
  homeTeams.forEach((homeTeam) => {
    // Eliminamos el equipo del que vamos a crear partidos
    awayTeams = homeTeams.filter((newTeam) => newTeam != homeTeam);
    awayTeams.forEach((awayTeam) => {
      gamesPlayed.push(createGame(homeTeam, awayTeam));
      // Ida y vuelta
      if (games == 2) {
        gamesPlayed.push(createGame(awayTeam, homeTeam));
      }
    });
    homeTeams = [...awayTeams];
  });
}

function createGame(home, away) {
  game = {};
  game.home = home;
  game.away = away;

  // Creamos las estadisticas para cada jugador
  

  console.log(`  Game: ${game.away.name} @ ${game.home.name}`);
  return game;
}

module.exports = {
  createCompetition,
};
