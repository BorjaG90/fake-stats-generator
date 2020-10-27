function createCompetition(competition, teams) {
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
  console.log(`   Liga de ${games} partido/s contra cada oponente`)
  let gamesPlayed = [];
  // Por cada partido en contra de los otros equipos hacemos una iteración
  for (let index = 0; index < games; index++) {
    let homeTeams = [...teams];
    homeTeams.forEach((homeTeam) => {
      teams.forEach((awayTeam) => {
        if(homeTeam != awayTeam){
          gamesPlayed.push(createGame(homeTeam, awayTeam));
        }
      });
      // Eliminamos el equipo del que ya hemos creado el partido
      homeTeams.filter((newTeam) => newTeam != homeTeam);
    });
  }
}

function createGame(home, away) {
  game = {};
  game.home = home.name;
  game.away = away.name;

  console.log(`   Game: ${game.away} @ ${game.home}`);
  return game;
}

module.exports = {
  createCompetition,
};
