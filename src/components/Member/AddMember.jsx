import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import * as authService from '../../services/authServices'
import ListGroup from 'react-bootstrap/ListGroup';




const AddMember = () => {
    const navigate = useNavigate()
    const { teamId } = useParams('teamId')
    const [users, setUsers] = useState([])
    const [members, setMembers] = useState([])
    
    const [formData, setFormData] = useState({
        member: null
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
            //clean out anyone in members
            const availablePlayers = [];
            //loop through all users
            allUsers.map((user) => {
                //if current user is not in team.members
                
                const present = team.members.find(({_id}) => _id === user._id)
                console.log('present', present)
                if (!present) {
                    //add them to availablePlayers
                    availablePlayers.push(user)
                }
            })
                
            //setUsers to availablePlayers            
            setUsers(availablePlayers)
            
            
    }
    if (teamId) settingStates()
    
   }, [teamId])
   console.log(users)
    const handleChange = (event) => {
        //get selected member
        setFormData({member: event.target.value})
        //save in form data member
    };

    

  
    const handleSubmit = async (event) => {
     event.preventDefault();
        
        try {          
            
            //turn id into whole user obj
            let newMembers;
            let foundMemberIndex
            for(let i = 0; i < users.length; i++) {
                if (users[i]['_id'] === formData.member) {
                    newMembers = [...members, users[i]]
                    foundMemberIndex = i
                }
            }
            //add formData member to members state
            setMembers(newMembers)
            //remove form data member from the user state
            const newUsers = users.splice(foundMemberIndex, 1)
            setUsers(newUsers)
            //get the current team
            const team = await authService.getTeam(teamId)
            console.log('team', team) 
            //create a reaplacemnent team obj           
            const newTeam = team
            //update the members
            newTeam.members = newMembers
            //save the team
            await authService.editTeam(teamId, newTeam)
            //navigate to teams page after
            navigate(`/teams/${teamId}`)
        } catch (error) {
            throw error
        }

    }

    return (
        <>
       <Row>
            <Col>
            <Form onSubmit={handleSubmit}>            
                <Row>
                <Col>
                <Form.Select onChange={handleChange} >
                    
                    {users.length > 0 && users ? users.map((user) => {
                        
                        return <option  key={user._id} value={user._id}>{user.username}</option>
                    }): ''}
                </Form.Select>
                </Col>
                <Col>
                <Button type="submit" >Add Member</Button>{' '}
                </Col>
            </Row>
            </Form>
            </Col>
            <Col>
            <ListGroup>
               {members.map((member) => {
                return <ListGroup.Item>{member.username}</ListGroup.Item>
               })}                
            </ListGroup>
            </Col>
            </Row>
        </>
    )
};

export default AddMember