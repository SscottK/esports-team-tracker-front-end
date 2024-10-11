import { useEffect, useState } from "react";

const TeamGrid = ({ user, team, gameId }) => {
    const [member, setMember] = useState(null)
    const [game, setGame] = useState(null)
    
    console.log(member)
    useEffect(() => {
        const prepareMember = () => {
            setMember(team.members[1]) 
        }
       if (user) prepareMember()
        // console.log(member.trackedTimes)
    }, [user])
    // if (game) {
    //     const foundMember = team.members.find((member) => {
    //         return game._id === event.target.value
            
    //     })
    
    
    return (
        <>
            <h1>This is the team grid</h1>
            <div className="container">
                {team ? team.members.map((member) => {                    
                    return <div key={member._id} className="name">{member.username}<div>{team ? member.trackedTimes.map((time) => {
                        return <div key={time._id}className="time">{time}</div>
                    }) : ''}</div></div>
                    
                }): ''
                }
                

            </div>
        </>
        
        
    )
};

export default TeamGrid