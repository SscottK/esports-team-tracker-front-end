import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import * as authService from '../../services/authServices'



const AddGame = () => {
    const navigate = useNavigate()
    const { teamId } = useParams()
    const [formData, setFormData] = useState({
        gameName: '',
        levels: []
    })

    /*
    input fields for game name and track name
    function to handle change
    function to handle submit
    */

    const handleChange = (event) => {
        if (event.target.name === 'gameName'){
        setFormData({...formData, [event.target.name]: event.target.value})
        }
        if (event.target.name === 'levels') {
            const levelsString = event.target.value
            const splitString = levelsString.split(', ')
            setFormData({...formData, [event.target.name]: splitString})
            
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.addGame(teamId, formData)
            navigate(`/teams/${teamId}`)
        } catch (error) {
            throw error
        }

    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <Row>
                <Col>                
                    <label htmlFor="gameName"></label>
                    <InputGroup size="md" className="mb-3">
                      <InputGroup.Text   id="gameName">Game Name</InputGroup.Text>
                      <Form.Control
                        name="gameName"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={formData.gameName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                </Col>
                <Col>
                
                <label htmlFor="levels"></label>
                    <InputGroup size="md" className="mb-3">
                      <InputGroup.Text  id="levels">Levels</InputGroup.Text>
                      <Form.Control
                        name="levels"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={handleChange}
                        />
                    </InputGroup>
                    <p>Please enter track names sperated by a comma and then a space.<br/> Example Track1, track2, track3</p>
                </Col>
                <Button type="submit" >Add Game</Button>{' '}
            </Row>
            </form>
        </>
    )
};

export default AddGame