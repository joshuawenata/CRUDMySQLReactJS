import React, { useState }  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Axios from 'axios';

export default function Inputs(){
    const [value,setValue] = useState("");

    const create = () => {
        Axios.post('http://localhost:3001/create', {value: value}).then(()=>{
            alert(value + ' pushed into database!');
        });
    }

    return <InputGroup className="mb-3" style={{width: '600px',marginTop: '2%',marginLeft: '30%'}}>
        <Form.Control placeholder="To-Do List" aria-describedby="basic-addon2" onChange={(e)=>{setValue(e.target.value)}}/>
        <Button variant="outline-primary" id="button-addon2" onClick={create}>Submit</Button>
    </InputGroup>
    
}