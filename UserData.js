import {useEffect, useState} from "react";
import axios from "axios";
function UserData ({data}) {
    const [teamsMap, setTeamsMap] = useState({});
    const [userData, setData] = useState(data.sort((a, b) => a.shop.localeCompare(b.shop)));
    const [winners, setWinners] = useState([]);
    
    const mapTeams = () => {
    let teamMap = {};
    axios.get('http://localhost:8000/api/teams').then(response => {
            (response.data.teams).map((teamData) => {
                teamMap[`${teamData.team}`] = `${teamData.pic}`;
            })
            console.log(teamMap);
            setTeamsMap(teamMap);
    }, []); 
    
    }
    
    useEffect(() => {
        let allWinners = []
        axios.get('http://localhost:8000/api/allFixtures').then(response => {
        
        response.data.map((week) => {
            allWinners.push(week.winners)
        })
        console.log(allWinners)
        setWinners(allWinners)
      });
    }, [])

    useEffect(() => {
        
        mapTeams()
    }, [winners])
    return (
       
        <>
        {
        userData.map((user) => {
            let week = 0;
            console.log(winners)
            return (
            
            <tr><th>{user.username}</th><th>{user.name}</th><th>{user.shop}</th>{user.teamsSelected.map((chosenTeam) => {
                console.log(chosenTeam)
                console.log(winners[week])
                if (winners[week] && winners[week].includes(chosenTeam)) {
                    week++
                    return(<th id="greenSquare"><img className="tablePic"  alt="not chosen" src={"https://resources.premierleague.com/premierleague/badges/70/"+teamsMap[chosenTeam] }/><p>{chosenTeam}</p></th>)
                }else if (winners[week] && winners[week].length > 0) {
                    week++
                    return(<th id="redSquare"><img className="tablePic"  alt="not chosen" src={"https://resources.premierleague.com/premierleague/badges/70/"+teamsMap[chosenTeam] }/><p>{chosenTeam}</p></th>)
                } else {
                    week++
                    return(<th><img className="tablePic" alt="not chosen" src={"https://resources.premierleague.com/premierleague/badges/70/"+teamsMap[chosenTeam] }/><p>{chosenTeam}</p></th>)
                }
                                
                            
            })}</tr>
            )
        })
        
        
        }
        </>
    )
}

export default UserData;