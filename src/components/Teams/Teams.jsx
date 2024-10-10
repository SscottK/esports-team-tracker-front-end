import { useState } from 'react'
import * as authService from '../../services/authServices'


const Teams = ( { user }) => {
    const [preparedData, setPreparedData] = useState(null)
    const prepareUserData = async () => {
        const userData = await authService.getUserData(user)
        
        setPreparedData(userData)
        
        
    }
    if (preparedData === null) {
        prepareUserData()
    }
    console.log(preparedData)
    

    return (
        <>
            <div>
                <h3>This is the teams component</h3>
                {/* <p>{preparedData._id}</p> */}
            </div>
            
        </>
    )
}

export default Teams