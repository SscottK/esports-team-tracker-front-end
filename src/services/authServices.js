const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


const signup = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const json = await res.json();

        if (json.token) {
            localStorage.setItem('token', json.token)
            const user = JSON.parse(atob(json.token.split('.')[1]))
            return user
        }
        if (json.error) {
            throw new Error(json.error)
        }
        return json;
    } catch (error) {
        throw error
    }
};

const signin = async (user) => {    
    try {
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        
        const json = await res.json();
        if (json.err) {
            throw new Error(json.err)
        }
    
        if (json.token) {
            localStorage.setItem('token', json.token)
            const user = JSON.parse(atob(json.token.split('.')[1]))
            return user
        }
        if (json.error) {
            throw new Error(json.error)
          }
    } catch (error) {
        throw error
    }
};

const getUser = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    const user = JSON.parse(atob(token.split('.')[1]))
    return user
};

const getUserData = async (userProp) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/users/${userProp._id}`, {
            method: 'GET',
            headers: {                
                'Authorization': `Bearer ${token}`
            }

        })
        const json = await res.json()
        const user = json.user
        
        return user
        
    } catch (error) {
        throw error
    }

}

const getGames = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BACKEND_URL}/games`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await res.json()
        const games = json
        console.log(json, games)
        return games
    } catch (error) {
        throw error
    }
}

const createTime = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BACKEND_URL}/times/addtime`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const json = await res.json();

        if (json.error) {
            throw new Error(json.error)
        }
        return json;
    } catch (error) {
        throw error
    }
}

const getTeam = async (teamId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/teams/${teamId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',               
                'Authorization': `Bearer ${token}`
            }

        })
        const json = await res.json()
            
        if (json.error) {
            throw new Error(json.error)
        }
        const team = json.team
        
        return team
        
    } catch (error) {
        throw error
    }
}

//get times by team and game
const getTimesByTeamAndGame = async (gameId, teamId) => {
    try {
        console.log('teamId', teamId, 'gameId', gameId)        
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/teams/gettimes/${teamId}/${gameId}`, {
            method: 'GET',
            headers: {  'Content-Type': 'application/json',             
                'Authorization': `Bearer ${token}`}
        })
        
        const json = await res.json()
        
        if (json.error) {
            throw new Error(json.error)
        }
        
        
        return json
    } catch (error) {
        throw error
    }
}

const editTeam = async (teamId, formData) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/teams/${teamId}/edit`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',             
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        })
        const json = await res.json()
        if (json.error) {
            throw new Error(json.error)
        }
        return json
    } catch (error) {
        throw error
    }
}

const addGame = async (teamId, formData) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/games/${teamId}/addgame`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',             
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formData)
        })
        const json = await res.json()
        if (json.error) {
            throw new Error(json.error)
        }
        return json
    } catch (error) {
        throw error
    }
}

const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',               
                'Authorization': `Bearer ${token}`
            }

        })
        const json = await res.json()
            
        if (json.error) {
            throw new Error(json.error)
        }
        
        
        
        return json
        
    } catch (error) {
        throw error
    }
}


const getOneUser = async (userId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',               
                'Authorization': `Bearer ${token}`
            }

        })
        const json = await res.json()
            
        if (json.error) {
            throw new Error(json.error)
        }
        
        const user = json.user
        
        return user
        
    } catch (error) {
        throw error
    }
}

const signOut = () => {
    localStorage.removeItem('token')
}


export {
    signup,
    signin,
    getUser,
    signOut,
    getUserData,
    getGames,
    createTime,
    getTeam,
    getTimesByTeamAndGame,
    editTeam,
    addGame,
    getAllUsers,    
    getOneUser,
};