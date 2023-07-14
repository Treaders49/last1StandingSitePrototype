import {useState, useEffect} from "react";
import '../App.css';
function Team({teamData}) {
    const [opponent, setOpponent] = useState("")
    const [previousTeam, setPreviousTeam] = useState("")
    
    useEffect(() => {
        if (teamData.selectedTeam != "") {
            setPreviousTeam("");
        }

        setPreviousTeam(teamData.selected)
        
        console.log(previousTeam);
        console.log(teamData.selectedTeam)
        teamData.fixtures.map((fixture) => {
            if (fixture.home == teamData.teamName) {
                setOpponent(fixture.away);
            }
            if (fixture.away == teamData.teamName) {
                setOpponent(fixture.home);
            }
        });
    }, [teamData.selectedTeam, teamData.selected]); 
    
    
    if ((teamData.selectedTeam === teamData.teamName) ||(previousTeam  === teamData.teamName)) {
        return <button className="team" id="selectedTeam" onClick= {() => teamData.onTeamClick(teamData.teamName)}><div className="grid-item"><img className="teamPic" src={teamData.teamPic}></img><div><b>{teamData.teamName}</b></div><div>Vs. {opponent}</div></div></button>
    } else {
    return <button className="team"  onClick= {() => teamData.onTeamClick(teamData.teamName)}><div className="grid-item"><img className="teamPic" src={teamData.teamPic}></img><div><b>{teamData.teamName}</b></div><div>Vs. {opponent}</div></div></button>
    }

    
}

export default Team;