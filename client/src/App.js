import React,{useState,useEffect} from 'react';
import { io } from 'socket.io-client';
import {Avatar} from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css';

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
      console.log("s");
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
    <Container>
      <Card style={{ width: '50rem'}} >
  <Card.Body>
      <h1 style={{color:"green"}}>Messenger</h1>
    <Avatar />  
    <div className='name'>Anbu</div>
      {messageRenderer()}
    <textarea className="form-control" value={state.message} onChange={changeMessage}></textarea>
    <Button onClick={messageTurnIn}>Send</Button>
  </Card.Body>
</Card>
    </Container>
  );
}

export default App;
