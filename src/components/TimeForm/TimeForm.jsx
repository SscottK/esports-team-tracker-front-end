import { useState, useEffect } from "react"
import * as authService from '../../services/authServices'
import { useNavigate } from "react-router-dom"


const TimeForm = ({ user }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    const [games, setGames] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [formData, setFormData] =useState({
        user: user._id,
        game: '',
        trackName: '',
        time: ''
         
    });

    useEffect(() => {
    const getGames = async () => {
        const games = await authService.getGames()
        console.log(games)
        
        setGames(games)
        
        
    }
    if (user) getGames();
        
    }, [user])

    const handleChange = (event) => {
        console.log(event.target)
        
        setFormData({...formData, [event.target.name]: event.target.value})
        if (event.target.id === 'game') {
            const foundGame = games.find((game) => {
                return game._id === event.target.value
                
            })
            setTracks(foundGame.levels)
        }
            
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.createTime(formData)
            
            navigate(`/times/${user._id}`)
        } catch (error) {
            setMessage(error.message)
        }
        
    };
    return (
        <>
            <h2>Add a time</h2>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="game">Select Game</label>
                    <select name="game" id="game" onChange={handleChange}> 
                        <option value="games" defaultValue="Games" >Games</option>
                        { games ? 
                        games.map((game) => {
                            return <option key={game._id}  value={game._id}>{game.gameName}</option>
                        }) : ''
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="trackName">Select Track</label>
                    <select name="trackName" id="trackName" onChange={handleChange}>
                        <option value="tracks" defaultValue="tracks" >Tracks</option>
                        { tracks ? 
                        tracks.map((track, index) => {
                            return <option key={index} value={track}>{track}</option> 
                                                        
                        }) : ''
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input 
                    type="text" 
                    name="time"
                    id="time" 
                    value={formData.time} 
                    onChange={handleChange}
                    />
                </div>
                <div><button type="submit">Add Time</button></div>
            </form>
        </>
    )
}

export default TimeForm