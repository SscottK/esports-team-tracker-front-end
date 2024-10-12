import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as authService from '../../services/authServices'
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";


const EditTeam = () => {
    const { teamId } = useParams('teamId')
    const [team, setTeam] = useState(null)
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

     //handleChange
     //
     //
     //
     //
    
    return (
        <>
        <p>To remove team members or games please select the box and then press save</p>
        <form>
            <div>
            <ListGroup as="ul">
                    {team ? team.members.map((member) => {
                       return  <ListGroup.Item key={member._id}>{member.username} <input type="checkbox" name="removeMe" id="removeMe" /></ListGroup.Item>
                    }) : ''}
                </ListGroup>
            </div>
            <div>
            <ListGroup>
                {team ? team.games.map((game) => {
                       return  <ListGroup.Item key={game._id}>{game.gameName} <input type="checkbox" name="removeMe" id="removeMe" /></ListGroup.Item>
                    }) : ''}
                </ListGroup>
            </div>
            <div>
                <Button variant="primary">Save</Button>{' '}
            </div>
        </form>
        </>
    )

};

export default EditTeam