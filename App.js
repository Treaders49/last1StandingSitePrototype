import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useEffect, useState} from "react";
import Team from './components/Team';
import TeamList from './components/TeamList';
import UserData from './components/UserData';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  
  const [userText, setUserText] = useState(""); 
  const [newUsernameText, setNewUsernameText] = useState(""); 
  const [newNameText, setNewNameText] = useState("");
  const [shop, setShop] = useState("High Street");
  const [teamData, setTeamData] = useState({});
  const [view, setView] = useState("");
  const [allData, setAllData] = useState({})
 
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log(view)
    
      axios.get("http://localhost:8000/api/getAllUserData").then(response => {
        console.log(response.data);
        
        let usernames = []
        response.data.map((user) => {
          console.log(user);
          usernames.push(user.username)
        });
        console.log(usernames);
        setUsers(usernames)
      if (view == "All") {
        setAllData(response.data);
      }
      })
      
    
    
  }, [currentUser, view]);
 
  const changeUserText = (event) => {
    console.log(userText);
    setUserText(event.target.value)
  };

  const changeNewUsernameText = (event) => {
    setNewUsernameText(event.target.value)
  };

  const changeNewNameText = (event) => {
    setNewNameText(event.target.value)
  };

  const selectShop = (event) => {
    console.log(shop)
    setShop(event.target.value)
  }
  
  const loadUserData = ((userToLoad) => {
    
    setView("");
    setAllData({});
    console.log(userToLoad);
    axios.get('http://localhost:8000/api/fixtures').then(response =>{
      console.log(response.data);
      const fixtures = (response.data.fixtures);
      const week = (parseInt(response.data.week));
      axios.get(`http://localhost:8000/api/${userToLoad}`).then(response => {
        console.log(response.data)
        let previouslySelected = "";
        let allTeams = [];
        let eliminated = false
        console.log(users)
        console.log()
        if (users.includes(userToLoad)) {
          eliminated = response.data.eliminated;
          console.log(response.data.teamsSelected.length)
          console.log(week)
          if (response.data.teamsSelected.length === week) {
            previouslySelected =(response.data.teamsSelected[week-1]);
          }
        
          
          allTeams = response.data.teamsSelected
          
        }
        
        
        
        
        setTeamData({"previouslySelected": {previouslySelected}, "allSelections": allTeams, "fixtures": fixtures, "week": week, "currentUser": userToLoad, "eliminated": eliminated});
    });
    });

     
  });

  const createNewUser = () => {
    console.log(newUsernameText);
    axios.get(`http://localhost:8000/api/${newUsernameText}`).then(response => {
      if (!(response.data)) {
        axios.post("http://localhost:8000/api/createUser", {username: newUsernameText, fullname:newNameText, shop:shop }).then(response => {
          
        });
        alert("Account created");
      } else {
        console.log(newUsernameText);
        
        alert("Account already exists");
        
      }
      setCurrentUser(newUsernameText)
      setUserText(newUsernameText)
      loadUserData(newUsernameText);
      setNewNameText("")
      setNewUsernameText("")
      
    });

  }
  
  let teamListStatus = "";
  if (!(Object.keys(allData).length == 0)) {
    teamListStatus = <table><tr><th>Username</th><th>Full Name</th><th>Team</th>{Array.from({ length: 20 }, (_, index) => (
      <th key={index}>GW{index + 1}</th>
    ))}</tr><UserData data={allData} /></table>;
  } else {
    if (!(teamData.currentUser)) {
      teamListStatus = <h1>Select a user to load teams</h1>
    } else {
      if (users.includes(teamData.currentUser)) {
        console.log(teamData.eliminated)
        if (teamData.eliminated == "true") {
          teamListStatus = <h1>User eliminated from competition</h1>
        } else {
          teamListStatus = <TeamList username={teamData.currentUser} previouslySelected={teamData.previouslySelected.previouslySelected} allSelectedTeams={teamData.allSelections} fixtures={teamData.fixtures} gameWeek={teamData.week}/>;
        }
      } else {
        teamListStatus = <h1>User not recognised</h1>
      }
    }
  }
 
  
  return (
    <>
    
    <div className='userForm'><div className='existingUser'><h4>Select User</h4><label htmlFor="username">Username: </label><input name="username" type='text' onChange={changeUserText} value={userText}  /><button type='submit' onClick={() => loadUserData(userText)}>search</button></div><div className='newUser'><h4>New User</h4><label htmlFor="createUsername">New Username: </label><input type='text' onChange={changeNewUsernameText} value={newUsernameText}/><br></br><label htmlFor="createUsername">Full Name: </label><input type='text' onChange={changeNewNameText} value={newNameText} /><label htmlFor='shop'></label><select name='shop' onChange={selectShop}><option>High Street</option><option>Eggington Street</option></select><button onClick={() => createNewUser()}>create user</button></div><div className='viewAllDiv'><button className='viewAll' onClick={() =>  setView("All")}>View All Submissions</button></div></div>
    <div className='teamContent'>{teamListStatus}</div>
    </>
  )
}




export default App;
