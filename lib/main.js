const competitionController = require("./competition");
const playerController = require("./player");

// Create
function start(data) {
  // Generamos los jugadores aleatorios
  let fullTeams = playerController.fillTeams(data.teams);
  // console.log(fullTeams);
  let seasons = []
  data.seasons.forEach((season) => {
    console.log(`--Season: ${season}--`);
    let competitions = [];
    data.competitions.forEach((competition) => {
      console.log(`--Competition: ${competition.name}`);
      competitions.push(
        competitionController.createCompetition(competition, fullTeams)
      );
    });
    let newSeason = {
      "year": season,
      "competitions": competitions
    };
    seasons.push(newSeason);
  });
  return { "seasons": seasons }
}

module.exports = {
  start,
};
