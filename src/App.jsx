import { useState } from 'react'
import './App.css'

function App() {
  const [input,setInput] = useState("");
  const [password,setPassword] = useState("");
  const [users,setUsers] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");

  const handleSubmit = (event)=>{
    event.preventDefault();
    const newUser = {
      name:input,
      password:password
    }
    setUsers([...users,newUser]);
    setInput("");
    setPassword("");
    console.log(newUser);
  }
  const handleInput = (event)=>{
    setInput(event.target.value);
    console.log(input);
    console.log(event.target.value);
  }
  const handlePassword = (event) =>{
    setPassword(event.target.value);
    console.log(event.target.value);
  }
  const handleDelete = (person)=>{
    setUsers(users.filter((user)=> user.name !== person.name));
  }
  const handleEdit = (user)=>{
    setInput(user.name);
    setPassword(user.password);
    handleDelete(user);
  }
  const filteredUsers = searchTerm?users.filter((user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))):users;
    

  return (
    <>
      <div className='header'>
        <h1>Password Keeper</h1>
        <p>Total Passwords: {users.length}</p>
        <label for='search'>Search: </label>
        <input id='search' className='search' onChange={(e)=> setSearchTerm(e.target.value)}></input>

      </div>
      <form onSubmit={handleSubmit}>
      <label for='title'>Title: </label>
      <input className='title' id='title' value={input} onChange={handleInput}></input><br/>
      <label for='password'>Password: </label>
      <input className='password' id='password' value={password} onChange={handlePassword}></input><br/>
      <button type='submit'>Add</button>
      </form>
      <div>
        <h2>All Passwords</h2>
        { filteredUsers.map((user)=>(
          <div className='user'>
            <div>Username : {user.name}</div>
            <div>Password : {user.password}</div>
            <button onClick={()=>handleDelete(user)}>Delete</button>
            <button onClick={()=>handleEdit(user)}>Edit</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
