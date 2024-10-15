import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import * as authService from '../../services/authServices'
import ListGroup from 'react-bootstrap/ListGroup';
import Teams from "../Teams/Teams";






const UserEdit = () => {
    //useParaams
    const { userId } = useParams('userId')
    //state variaables
    //user
    const [user, setUser] = useState(null)
    //formData
    const [formData, setFormData] = useState({
        Teams: [],
        trackedTimes: [],
        username: '',    
    })
    //navigate
    const navigate = useNavigate()
    //useEffect
    useEffect(() =>{
        //find user by userId
        const foundUser = async () => {
            setUser(await authService.getOneUser(userId))
        }
        if (userId) {
            foundUser()
            
        }
        
        //setUser
    }, [user])
    

    //handleChange
    //setformData based on input filds
    //when a check box is unchecked it is not in the form data

    //handleSubmit
    //send form data to database


    return (
        <>
        
            <Form>
                <Col>               
                    <InputGroup>
                        <InputGroup.Text name="username" id="username">Usename</InputGroup.Text>
                        <Form.Control />
                    </InputGroup> 
                </Col>
                <Col>
                    <InputGroup>
                    <label htmlFor="teams">Teams</label>
                        {user ? user.teams.map((team) => {
                           return <><InputGroup.Checkbox name="teams" aria-label="Checkbox for following text input" defaultValue={team.teamName}/>
                                     <Form.Control aria-label="Text input with checkbox" /></>
                        }) : ''}
                    </InputGroup>
                </Col>
                <Col>
                <InputGroup>
                        {user ? user.trackedTimes.map((time) => {
                           return <Col><InputGroup.Checkbox aria-label="Checkbox for following text input" />
                                     <Form.Control aria-label="Text input with checkbox" /></Col>
                        }) : ''}
                    </InputGroup>
                </Col>
            </Form>
        
        </>
    )
};

export default UserEdit