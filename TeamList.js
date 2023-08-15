import Team from "./Team";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRef} from "react";

function TeamList({username, previouslySelected, allSelectedTeams, fixtures, gameWeek}) {
  const [currentUser, setCurrentUser] = useState("");
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const bottomButton = useRef(null);
  console.log(previouslySelected)
  const [previousSelection, setPreviouslySelected] = useState("");
  const newSelectedTeam = ((teamName) => {
    bottomButton?.current?.scrollIntoView({ behavior: 'smooth' });
    console.log("clicked");
    //e.preventDefault();
    setPreviouslySelected("");
    setSelectedTeam(teamName);
    
  });

  const confirmSelection = ( async() => {
    console.log("clicked");
    console.log(username);
    alert("selection added");
    await axios.post(`http://localhost:8000/api/chooseTeam/${selectedTeam}`, {name: username, previouslySelected:previouslySelected})
    
    setPreviouslySelected(selectedTeam);
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
    confirmButton = <button id='confirmButton' onClick={confirmSelection} >Confirm Selection</button>;
  }

  return (
    <>
    <div className="grid-container">
      <div><h3>Selection for {username}</h3></div>
      {teamsData.map((teamData, index) => {

        const picUrl = `https://resources.premierleague.com/premierleague/badges/70/${teamData.pic}`;
        let previous = "";
        console.log(allSelectedTeams)
        if (allSelectedTeams.includes(teamData.team)) {
          previous = allSelectedTeams.indexOf(teamData.team) + 1;
        }
        return (
          <Team teamData={{ teamName: teamData.team, teamPic: picUrl , key: index, onTeamClick: newSelectedTeam, selectedTeam:selectedTeam, fixtures:fixtures, selected:previousSelection, isPrevious:previous}} key={index} />
          
          );
      })}
      
    </div>
    <div className='confirmButtonDiv' ref={bottomButton}>
    {confirmButton}
    </div>
    </>
  
  );
  


}

export default TeamList;