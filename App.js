import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useEffect, useState} from "react";
import Team from './components/Team';
import TeamList from './components/TeamList';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);
  const [userText, setUserText] = useState(""); 
  const [newUsernameText, setNewUsernameText] = useState(""); 
  const [newNameText, setNewNameText] = useState("");
  const [shop, setShop] = useState("High Street");
  const [teamData, setTeamData] = useState({});
  useEffect(() => {
    setUsers(["Treaders49", "Treaders"]);
    
    
  }, [userText]);
 
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
    console.log(userToLoad);
    axios.get('http://localhost:8000/api/fixtures').then(response =>{
      console.log(response.data);
      const fixtures = (response.data.fixtures);
      const week = (parseInt(response.data.week));
      axios.get(`http://localhost:8000/api/${userToLoad}`).then(response => {
        
        let previouslySelected = "";
        if (response.data.teamsSelected) {
          if (response.data.teamsSelected.length === week) {
            previouslySelected =(response.data.teamsSelected[week-1]);
          }
      }

        setTeamData({"previouslySelected": {previouslySelected}, "fixtures": fixtures, "week": week, "currentUser": userToLoad});
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
        setCurrentUser(newUsernameText)
        alert("Account already exists");
        
      }
      
      setUserText(newUsernameText)
      loadUserData(newUsernameText);
      setNewNameText("")
      setNewUsernameText("")
      
    });

  }
  let teamListStatus = "";
  if (!(teamData.currentUser)) {
    teamListStatus = <h1>Select a user to load teams</h1>
  } else {
    if (users.includes(teamData.currentUser)) {
      teamListStatus = <TeamList username={teamData.currentUser} previouslySelected={teamData.previouslySelected.previouslySelected} fixtures={teamData.fixtures} gameWeek={teamData.week}/>;
    } else {
      teamListStatus = <h1>User not recognised</h1>
    }
  }
  
  return (
    <>
    
    <div className='userForm'><div className='existingUser'><h4>Select User</h4><label htmlFor="username">Username: </label><input name="username" type='text' onChange={changeUserText} value={userText} /><button type='submit' onClick={() => loadUserData(userText)}>search</button></div><div className='newUser'><h4>New User</h4><label htmlFor="createUsername">New Username: </label><input type='text' onChange={changeNewUsernameText} value={newUsernameText}/><br></br><label htmlFor="createUsername">Full Name: </label><input type='text' onChange={changeNewNameText} value={newNameText} /><label htmlFor='shop'></label><select name='shop' onChange={selectShop}><option>High Street</option><option>Eggington Street</option></select><button onClick={() => createNewUser()}>create user</button></div></div>
    <div className='teamContent'>{teamListStatus}</div>
    </>
  )
}




export default App;
