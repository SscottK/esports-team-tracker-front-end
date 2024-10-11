import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

const TeamGrid = ({ user, team, gameId }) => {
    const [member, setMember] = useState(null)
    const [game, setGame] = useState(null)
    
    console.log(member)
    // useEffect(() => {
    //     const prepareMember = () => {
    //         setMember(team.members[1]) 
    //     }
    //    if (user) prepareMember()
    //     // console.log(member.trackedTimes)
    // }, [user])
    // if (game) {
    //     const foundMember = team.members.find((member) => {
    //         return game._id === event.target.value
            
    //     })
    
    
    return (
        <>
            <h1>This is the team grid</h1>
            {/* {team ? member.trackedTimes.map((time) => {
                        return <div key={time._id}className="time">{time}</div>
                    }) : ''} */}
            <Table striped bordered hover responsive>
      <thead>
        <tr >
            <th>Track Name</th>
        {team ? team.members.map((member) => {                    
                    return <th key={member._id} className="nameTable">{member.username}</th>
                    }) : ''
                    }
          </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
          <tc>
          
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          </tc>
        

        </tr>
        <tr>
        
          <td>2</td>
          <td></td>
          <tc>
          <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>          
          </tr></tc>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
      
    </Table>
        </>
        
        
    )
};

export default TeamGrid