import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as authService from '../../services/authServices'
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";




//needs to happen
/*when form is submited I need it to change the name and add or remove members and games
handleChange**
handleSubmit


*/ 

const EditTeam = () => {
    const navigate = useNavigate()
    const { teamId } = useParams('teamId')
    const [team, setTeam] = useState(null)
    const [formData, setFormData] = useState({
        teamName: '',
        members: [],
        games: []
    })
    
        
    

    useEffect(() => {
        const getTeam = async () => {
            console.log("get team")
            const foundTeam = await authService.getTeam(teamId)
            console.log('team' , foundTeam)
            setTeam(foundTeam)
            console.log(team)
            
            
                
            
        }

            
        
    
    if (teamId) getTeam();
        
     }, [teamId])
    
    
    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value, event.target.checked)
        // if (event.target.value !in formData.members)
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
        
    };
     
    const handleCheckboxChange = (event) => {
        const key = event.target.name;
        const existingArray = formData[key];
        console.log('Checked', event.target.checked)
        
        
        

        if (event.target.checked && existingArray.indexOf(event.target.value) == -1) {
            existingArray.push(event.target.value)
        } else if (!event.target.checked && existingArray.indexOf(event.target.value) >= 0) {
            existingArray.splice(existingArray.indexOf(event.target.value), 1)
        }
        setFormData({...formData, [event.target.name]: existingArray})
}     
    const handleSave = async (event) => {
        
        try {
            console.log(formData)
            event.preventDefault();
            await authService.editTeam(teamId, formData)
            navigate(`/teams/${teamId}`)
        } catch (error) {
            throw error
        }
    }
   
    
     
    
    return (
        <>
        <p>How to edit your team:</p>
        <ListGroup as="ul">
            <ListGroup.Item as="li">A check box must be checked to keep that data.</ListGroup.Item>
            <ListGroup.Item as="li">ALL BOXES START UNCHECKED</ListGroup.Item>
        </ListGroup>
        <form onSubmit={handleSave}>
            <div>
                <label htmlFor="teamName">{team ? 'New Team Name': "Hmm seems to be no name for this team"}</label>
                <input type="text" name="teamName" value={formData.teamName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="Members">Members</label>
                <div>             
            </div>
                <ListGroup as="ul">
                    {team ? team.members.map((member) => {
                       return  <ListGroup.Item   variant="info" key={member._id}><label htmlFor={"members" + member._id}>{member.username}</label> <input type="checkbox" name="members" id={"members" + member._id} value={member._id} onChange={handleCheckboxChange} /></ListGroup.Item>
                    }) : ''}
                </ListGroup>
                <div>
                <Col><Button href={`/teams/${teamId}/addmember`} variant="primary">Add Member to Team</Button>{' '}</Col> 
                </div>
            </div>
            <div>
                <label htmlFor="games">Games</label>
                <ListGroup id="games">                
                    {team ? team.games.map((game) => {
                       return  <ListGroup.Item   variant="info"key={game._id}><label htmlFor={"games" + game._id}>{game.gameName}</label> <input type="checkbox" name="games" id={"games" + game._id} value={game._id} onChange={handleCheckboxChange} />
                </ListGroup.Item>
                }) : ''}
                </ListGroup>
            </div>
            <Col><Button href={`/games/${teamId}/addgame`} variant="primary">Add Game</Button>{' '}</Col>
            <div>
                <Button type="submit" variant="primary">Save</Button>{' '}
            </div>            
        </form>
        <Row>
        
        
        </Row>
        </>
    )

};

export default EditTeam