import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import * as authService from "../../services/authServices";

const TeamGrid = ({ currentGameData }) => {
  const [member, setMember] = useState(null);
  const [game, setGame] = useState(null);
  // const [gameData, setGameData] = useState(null)

  const [userdata, setUserdata] = useState([]);
  const [trackData, setTrackData] = useState({});
  useEffect(() => {
    const prepareGameData = async () => {
      console.log("working");
      setGame(currentGameData);
      setUserdata(currentGameData.userdata);
      setTrackData(currentGameData.trackData);
    };
    if (currentGameData) {
      prepareGameData();
    }
  }, [currentGameData]);

  console.log(game);
  console.log(userdata);
  console.log(currentGameData);
  let headerSet = [];
  let dataSet = [];
  if (userdata && trackData) {
    // headerSet.push(<th>Track Name</th>);
    for (let i = 0; i < userdata.length; i++) {
      headerSet.push(<th>{userdata[i]["name"]}</th>);
    }

    for (const trackName in trackData) {
      let dataRow = [];
      dataRow.push(<td>{trackName}</td>);

      for (let q = 0; q < userdata.length; q++) {
        let userId = userdata[q]["id"];

        dataRow.push(<td>{trackData[trackName][userId]}</td>);
      }

      dataSet.push(<tr>{dataRow}</tr>);
    }
  }

  return (
    <Table variant="secondary">
      <thead>
        <tr>
          {game ? <th>Track Name</th> : ""}
          {headerSet}
        </tr>
      </thead>
      <tbody>{dataSet}</tbody>
    </Table>
  );
};

export default TeamGrid;
