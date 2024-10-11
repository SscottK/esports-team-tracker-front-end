import { useEffect, useState } from 'react'
import * as authService from '../../services/authServices'
import { Link } from 'react-router-dom'


const Teams = ( { user, preparedData }) => {
    
    console.log(preparedData)
    
    
   
    
    

    return (
        <>
            <div>
                <h3>Teams</h3>
                <div>
                    <ul>
                        {preparedData ? preparedData.teams.map((team) => {
                           return <li key={team._id}>
                            <Link to={`/teams/${team._id}`}>{team.teamName}</Link></li>
                        }): ""}
                    </ul>
                </div>
                <div>
                    
                </div>
            </div>
            
        </>
    )
}

export default Teams