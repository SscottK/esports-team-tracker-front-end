
import { useState, useEffect } from "react";
import * as authService from '../../services/authServices'
import { useParams, Link } from "react-router-dom";
import TeamGrid from "./TeamGrid";



const Team = ({ user }) => {
    const [gameId, setGameId] = useState(null)
    const [currentGame, setCurrentGame] = useState(null)
    const [gameData, setGameData] = useState(null)
    const { teamId } = useParams();    
    const [team, setTeam] = useState(null)
    const [coaches, setCoaches] = useState([])
    const [isCoach, setIsCoach] = useState(false)
    
    useEffect(() => {
        const getTeam = async () => {
            console.log("get team")
            const foundTeam = await authService.getTeam(teamId)
            
            console.log('team' , foundTeam)
            setTeam(foundTeam)
            setCoaches(foundTeam.coaches)
            
            console.log(team)
            foundTeam.coaches.map((coach) => {
                console.log('coach', user._id, coach._id)
                if (user._id === coach._id) {

                    setIsCoach(true)
                }
            })
            
        }
        console.log('user', user)
        if (user) getTeam();
         
        }, [user])
    
    
    const handleGameChange =  async (gameId, game) => {
        //call service to pass to state to team grid
        const currentGameData =  await authService.getTimesByTeamAndGame(gameId, teamId)
        setGameData(currentGameData)
        setCurrentGame(game)               
        setGameId(gameId)
    }
    
    console.log(isCoach)
    console.log(coaches)
    return (
        <>
            
            <h1>Current Game: { currentGame ? currentGame : 'Select a game to see team times!'
            }</h1>
            <div>
                <h2>Team Name: {team ? team.teamName : ''}</h2>
                <h3>Coaches: {team ? team.coaches.map((coach)=> {

                     return coach.username
                }) : ''
                }
                </h3>
                Games:
                <div>
                    <ul>
                        { team ? team.games.map((game) => {
                            return <li key={game._id} value={game.gameName}><Link  
                            onClick={()=>handleGameChange(game._id, game.gameName)}>{game.gameName}</   Link></li>
                        }) : '' 
                        }
                    </ul>
                </div>
            </div>            
            <div>
                <TeamGrid user={user} teamId={teamId} gameId={gameId} currentGameData={gameData}/>
            </div>
            <div>
                {/* show edit team button  if user is in coaches array*/}
                {isCoach && 
                    
                <Link to={`/teams/${team._id}/edit`}><button>Edit Team</button></Link>
             }
            </div>
            
    </>
    )
};

export default Team