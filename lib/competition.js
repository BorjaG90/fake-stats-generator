function createCompetition(competition, teams){
  const teams_filtered = teams.filter(team => team.competitions.includes(competition.id));
  if(competition.type === "League + Playoffs"){
    // Crear 2 competiciones
  } else if(competition.type === "League"){

  } else if(competition.type === "Playoffs"){

  }else{
    console.log("ERROR")
  }
}

function createLeague(teams, games, clinched = 0){
  
}

module.exports = {
  createCompetition
}