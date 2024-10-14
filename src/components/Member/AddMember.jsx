import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import * as authService from '../../services/authServices'




const AddMember = () => {
    const navigate = useNavigate()
    const { teamId } = useParams()
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    const [formData, setFormData] = useState({
        gameName: '',
        levels: []
    })

    /*
    input fields for game name and track name
    function to handle change
    function to handle submit
    */
   useEffect(() => {
        const settingStates = async () => {
            const allUsers = await authService.getAllUsers()
            const team = await authService.getTeam(teamId)
            
            
            
            
                     
            
            
            setMembers(team.members)
            
            setUsers(allUsers)
            
    }
    if (teamId) settingStates()
    
   }, [teamId])
   console.log(users)
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

    let options = [];
    users.forEach((user) => {
        members.forEach((member) => {
            if (!(user._id in options) && user._id !== member._id) {
                options.push(user)
            }
        })
    });
    const filteredOptions = options.filter((option, index) => {
        return options.indexOf(option) === index
    })

    console.log(filteredOptions)
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await authService.addGame(teamId, formData)
    //         navigate(`/teams/${teamId}`)
    //     } catch (error) {
    //         throw error
    //     }

    // }

    return (
        <>
        <form >
            <Row>
                <Col>
                <Form.Select>
                    
                    {users.length > 0 && users ? users.map((user) => {
                        return <option key={user._id} value={user._id}>{user.username}</option>
                    }): ''}
                </Form.Select>
                </Col>
                <Col>
                <Button type="submit" >Add Member</Button>{' '}
                </Col>
            </Row>
            </form>
        </>
    )
};

export default AddMember