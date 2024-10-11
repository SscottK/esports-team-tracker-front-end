
import { useState, useEffect } from "react";
import * as authService from '../../services/authServices'
import { useParams, Link } from "react-router-dom";
import TeamGrid from "./TeamGrid";


const Team = ({ user }) => {
    const [gameId, setGameId] = useState(null)
    const [currentGame, setCurrentGame] = useState(null)
    const { teamId } = useParams();    
    const [team, setTeam] = useState(null)
    
    useEffect(() => {
        const getTeam = async () => {
            
            const foundTeam = await authService.getTeam(teamId)
            
            
            setTeam(foundTeam)
            
            
        }
        if (user) getTeam();
            
        }, [user])
    
    
    const handleGameChange = (gameId, game) => {
        console.log(gameId)
        setCurrentGame(game)               
        setGameId(gameId)
        
    }
    
    
    return (
        <>
            <h1>Current Game: { currentGame ? currentGame : ''
            }</h1>
            <div>
                <h2>Team Name: {team ? team.teamName : ''}</h2>
                <h3>Coaches: {team ? team.coaches.map((coach)=> {

                     return coach.username
                }) : ''
                }
                </h3>
                Games:
                <ul>
                     
                    { team ? team.games.map((game) => {
                        
                        
                        return <li key={game._id} value={game.gameName}><Link  onClick={()=>handleGameChange(game._id, game.gameName)}>{game.gameName}</Link></li>
                    }) : '' 
                    }
                </ul>
            </div>
            <div>
                <TeamGrid user={user} team={team} gameId={gameId}/>
            </div>
    </>
    )
};

export default Team