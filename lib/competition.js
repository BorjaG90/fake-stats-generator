const playerController = require("./player");
function createCompetition(competition, teams) {
  // Obtenemos los equipos pertenecientes a la competicion
  const teams_filtered = teams.filter((team) =>
    team.competitions.includes(competition.id)
  );

  if (competition.type === "League + Playoffs") {
    // Crear 2 competiciones
    // Liga
    let { teamsClinched, gamesPlayed } = createLeague(
      teams_filtered,
      competition.games_league,
      competition.clinched
    );
    competition.games = gamesPlayed;

    // TODO llamar a crear competicion playoffs
    let newCompetition = competition;
    newCompetition.name = competition.name + " Playoffs";
  } else if (competition.type === "League") {
    let gamesPlayed = createLeague(teams_filtered, competition.games_league);
    competition.games = gamesPlayed;
  } else if (competition.type === "Playoffs") {
  } else {
    console.log("ERROR");
  }
  return competition;
}

function createLeague(teams, games, clinched = 0) {
  console.log(
    ` Liga de ${teams.length} equipos y ${games} partido/s contra cada oponente`
  );
  let teamsClinched = [];
  let gamesPlayed = [];
  let homeTeams = [...teams];
  let gameId = 0;

  //Realizamos los emparejamientos
  homeTeams.forEach((homeTeam) => {
    // Eliminamos el equipo del que vamos a crear partidos
    awayTeams = homeTeams.filter((newTeam) => newTeam != homeTeam);
    awayTeams.forEach((awayTeam) => {
      gameId++;
      gamesPlayed.push(createGame(gameId, homeTeam, awayTeam));
      // Ida y vuelta
      if (games == 2) {
        gameId++;
        gamesPlayed.push(createGame(gameId, awayTeam, homeTeam));
      }
    });
    homeTeams = [...awayTeams];
  });

  // Si hay clasificacion para otra competicion
  if (teamsClinched > 0) {
    teamsClinched = teams.splice(0, clinched);
  }
  return { teamsClinched, gamesPlayed };
}

function createGame(id, home, away) {
  game = {};
  // Creamos las estadisticas para cada jugador
  const { newHome, newAway, winner } = playerController.generateGame(
    home,
    away
  );
  game.id = id;
  game.home = newHome;
  game.away = newAway;
  game.winner = winner;
  if (game.winner === game.home.id) {
    console.log(`  Game ${id}: ${game.away.name} @ [${game.home.name}]`);
  } else {
    console.log(`  Game ${id}: [${game.away.name}] @ ${game.home.name}`);
  }

  return game;
}

module.exports = {
  createCompetition,
};
