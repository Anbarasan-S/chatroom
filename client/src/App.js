import React,{useState,useEffect} from 'react';
import { io } from 'socket.io-client';
import {Avatar} from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Card, Container,Button} from 'react-bootstrap';
const socket=io.connect('http://localhost:5000');
function App() {
  const [state,setState]=useState({message:'',name:'Anbu'});
  const [chat,setChat]=useState([]);
  const messageTurnIn=(e)=>{
      const {name,message}=state;
      socket.emit('message',{name,message});
      setState({message:'',name:name})
  }

  
useEffect(()=>{
    socket.on('message',({name,message})=>{
      setChat([...chat,{name,message}]);
    });
},[chat])


const changeMessage=(e)=>{
  setState({...state,message:e.target.value});
}

const messageRenderer=()=>{
  return chat.map(({name,message},index)=>(
   <div key={index}>{name}:{message}</div>
  ));
} 
  return (
    <div className="container">
      <Card className="card" >
  <Card.Body>
      <h1 style={{color:"lightgreen"}}>Messenger</h1>
      <span>
    <Avatar/>  
    </span>
    <span className='name'>{state.name}</span>
      {messageRenderer()}
    <textarea className="form-control textarea" value={state.message} onChange={changeMessage} ></textarea>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem"}}>
    <Button onClick={messageTurnIn}>Send</Button>
    </div>
  </Card.Body>
</Card>
    </div>
  );
}

export default App;
