import './App.css';
import React  from 'react';
import Inputs from './components/inputgroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function App() {
  const [list, setList] = useState([]);
  const [NewValue,setNewValue] = useState("");

  Axios.get('http://localhost:3001/read').then((response)=>{
    setList(response.data);
  });

  const update = (id) => {
    Axios.put('http://localhost:3001/update', {temp: NewValue, id: id}).then(()=>{
        alert('value updated into database!');
    });
  }

  const deletes = (id) => {
    Axios.delete(`http://localhost:3001/deletes/${id}`, {temp: NewValue, id: id}).then(()=>{
        alert('value deleted from database!');
    });
  }

  return <div className="App">
    <Inputs></Inputs>
    {list.map((val,key) => {
      return <Card>

        <Card.Body>
          <span >{val.value}</span>
          <Button variant="danger" onClick={()=>deletes(val.id)} style={{
            float: 'right',
            marginLeft: '20px',
            width: '200px'
          }}>Delete</Button>
          <Form.Control style={{
            width: '200px',
            textAlign: 'center'
          }} placeholder="New To-Do List" aria-describedby="basic-addon2" onChange={(e)=>{setNewValue(e.target.value)}}/>
          <Button variant="primary" style={{
            float: 'right',
            width: '200px'
          }} onClick={()=>update(val.id)}>Update</Button>
        </Card.Body>

      </Card>
    })}

  </div>
}

export default App;
