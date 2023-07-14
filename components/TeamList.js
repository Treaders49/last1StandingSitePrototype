import Team from "./Team";
import {useState, useEffect} from "react";
import axios from "axios";

function TeamList({username, previouslySelected, fixtures, gameWeek}) {
  const [currentUser, setCurrentUser] = useState("");
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  console.log(previouslySelected)
  const [previousSelection, setPreviouslySelected] = useState("");
  const newSelectedTeam = ((teamName) => {
    console.log("clicked");
    //e.preventDefault();
    setPreviouslySelected("");
    setSelectedTeam(teamName);
    
  });

  const confirmSelection = ( async() => {
    console.log("clicked");
    await axios.post(`http://localhost:8000/api/chooseTeam/${selectedTeam}`, {username: username, previouslySelected:previouslySelected})
    alert("selection added");
  });

  useEffect(() => {
    setSelectedTeam("");
    setPreviouslySelected(previouslySelected);
    setCurrentUser(username);
    
    console.log(previouslySelected)
        axios.get('http://localhost:8000/api/teams').then(response => {
            console.log(response.data.teams);
            setTeamsData(response.data.teams);
          }).catch(error => {
            console.log(error);
          });
}, [username]);
  let confirmButton = "";
  if (selectedTeam != "") {
    confirmButton = <button id='confirmButton' onClick={() => confirmSelection}>Confirm Selection</button>;
  }

  return (
    <>
    <div className="grid-container">
      {teamsData.map((teamData, index) => {

        const picUrl = `https://resources.premierleague.com/premierleague/badges/70/${teamData.pic}`;
        return (
          <Team teamData={{ teamName: teamData.team, teamPic: picUrl , key: index, onTeamClick: newSelectedTeam, selectedTeam:selectedTeam, fixtures:fixtures, selected:previousSelection}} key={index} />
          
          );
      })}
      
    </div>
    <div className='confirmButtonDiv'>
    {confirmButton}
    </div>
    </>
  
  );
  


}

export default TeamList;