import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import * as authService from '../../services/authServices'

const TeamGrid = ({ user, teamId, gameId, currentGameData }) => {
    const [member, setMember] = useState(null)
    const [game, setGame] = useState(null)
    // const [gameData, setGameData] = useState(null)
    
    
    useEffect(() => {
        
          const prepareGameData = async () => {
            setGame(currentGameData)
        }
       if (currentGameData) {prepareGameData()}
        
    }, [])

    // if (game) {
    //     const foundMember = team.members.find((member) => {
    //         return game._id === event.target.value
            
    //     })
    //   }
    
    console.log(game)
    
    // if (currentGameData) {
    //   let headerSet = (<th>Track Name</th>);
    // for(let i=0; i<currentGameData.userData.length; i++){
    //     headerSet += (<th>{currentGameData.userData[i]['name']}</th>);
    // }

    // let dataSet;
    // for(trackName in currentGameData.trackata){

    //     let dataRow = (<td>{trackName}</td>);

    //     for(let q=0; q<currentGameData.userdata.length;q++){
    //         let userId = currentGameData.userdata[q]['id'];

    //         dataRow += (<td>{currentGameData.trackData["GoldenLoop"]["userid1"]}</td>);
    //     }

    //     dataSet += (<tr>{dataRow}</tr>)
    // }
    
    // const userData = currentGameData.userData 
    console.log(game)
  
    return (
      <table>
        <thead>
            {/* <tr>{currentGameData ? headerSet : ''}</tr> */}
        </thead>
        <tbody>
            {/* {currentGameData ? dataSet : ''} */}
        </tbody>
      </table>
    );
  //}
    
};

export default TeamGrid