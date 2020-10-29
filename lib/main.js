const data = require('../data/data');
const competitionController = require('./competition');
const playerController = require('./player');
let response = {};

// Create
function start(){
  // Generamos los jugadores aleatorios
  let fullTeams = playerController.fillTeams(data.teams);
  // console.log(fullTeams);

  data.seasons.forEach(season => {
    console.log(`--Season: ${season}--`);
    let competitions = [];
    data.competitions.forEach(competition => {
      console.log(`--Competition: ${competition.name}`);
        competitionController.createCompetition(competition, fullTeams);
    });
    /*let season = {
      "year": season,
      
    };*/
  });
}




module.exports = {
  start
}