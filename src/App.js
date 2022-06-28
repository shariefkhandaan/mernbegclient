import React from 'react'
import {useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const[name,setName] = useState("");
  const[age,setAge] = useState(0);
  const [listOfFriends,setListOfFriends] = useState([])

  const updateFriend = (id) =>{
    const newAge = prompt("Enter New Age")
    Axios.put('https://pedrocrud0.herokuapp.com/update',{newAge:newAge,id:id}).then(() =>{
      setListOfFriends(listOfFriends.map((val) =>{
        return val._id == id ?{_id:id,name:val.name, age:newAge}: val;
      }))
    })
  }

  const deleteFriend = (id) =>{
    Axios.delete(`https://pedrocrud0.herokuapp.com/delete/${id}`).then(() =>{
      setListOfFriends(listOfFriends.filter((val) => {
        return val._id != id;
      }))
    })
  }

  const addFriend = () =>{
    Axios.post('https://pedrocrud0.herokuapp.com/addFriend',{
    name:name,age:age}).then(() =>{
      setListOfFriends([...listOfFriends,{
        name:name,age:age}]);
    })
  }

useEffect(()=>{
 Axios.get("https://pedrocrud0.herokuapp.com//read").
 then((response)=>{
  setListOfFriends(response.data);
 }).catch(() =>{
  console.log('error');
 })
},[])

  return (
    <div className = "App">
      <div className="inputs">
      <input type="text" placeholder = "Friend Name ...." onChange={(event =>{setName(event.target.value);
      })}/>
       <input type="number" placeholder = "Friend age ...." onChange={(event =>{setAge(event.target.value);
      })}/>
      <button onClick={addFriend}>Add Friend</button>
      </div>
<div className="listOfFriends">
{listOfFriends.map((val)=>{
          return(
            <div className='FriendContainer'>
               <div className = "friend">
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
            </div>
            <button onClick={() =>{updateFriend(val._id)}}>update</button>
            <button onClick={() =>{deleteFriend(val._id)}}>x</button>
            </div>
         
          )
      })}

</div>
      
     
    </div>
  )
}

export default App