import { useState, useEffect } from "react";
import * as authService from "../../services/authServices";
import { useParams, Link } from "react-router-dom";
import TeamGrid from "./TeamGrid";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

const Team = ({ user }) => {
  const [gameId, setGameId] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameData, setGameData] = useState(null);
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [isCoach, setIsCoach] = useState(false);

  useEffect(() => {
    const getTeam = async () => {
      console.log("get team");
      const foundTeam = await authService.getTeam(teamId);

      console.log("team", foundTeam);
      setTeam(foundTeam);
      setCoaches(foundTeam.coaches);

      console.log(team);
      foundTeam.coaches.map((coach) => {
        console.log("coach", user._id, coach._id);
        if (user._id === coach._id) {
          setIsCoach(true);
        }
      });
    };
    console.log("user", user);
    if (user) getTeam();
  }, [user]);

  const handleGameChange = async (gameId, game) => {
    //call service to pass to state to team grid
    const currentGameData = await authService.getTimesByTeamAndGame(
      gameId,
      teamId
    );
    setGameData(currentGameData);
    setCurrentGame(game);
    setGameId(gameId);
  };

  console.log(isCoach);
  console.log(coaches);
  return (
    <>
      <h1>
        Current Game:{" "}
        {currentGame ? currentGame : "Select a game to see team times!"}
      </h1>
      <Row>
        <Row>
          <h2>Team Name:</h2>
        </Row>{" "}
        <Row>
          <h3> {team ? team.teamName : ""}</h3>
        </Row>
        <Col md={4}>
          <ListGroup>
            <h4>Coaches:</h4>
            {team
              ? team.coaches.map((coach) => {
                  return (
                    <ListGroup.Item variant="dark">
                      {coach.username}
                    </ListGroup.Item>
                  );
                })
              : ""}
          </ListGroup>
        </Col>
        <h4>Games:</h4>
        <Col md={4}>
          <ListGroup>
            {team
              ? team.games.map((game) => {
                  return (
                    <ListGroup.Item
                      variant="dark"
                      key={game._id}
                      value={game.gameName}
                    >
                      <Link
                        className="link"
                        onClick={() =>
                          handleGameChange(game._id, game.gameName)
                        }
                      >
                        {game.gameName}
                      </Link>
                    </ListGroup.Item>
                  );
                })
              : ""}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <TeamGrid
          user={user}
          teamId={teamId}
          gameId={gameId}
          currentGameData={gameData}
        />
      </Row>
      <Col md={6}>
        {/* show edit team button  if user is in coaches array*/}
        {isCoach && (
          <Button href={`/teams/${team._id}/edit`} variant="dark">
            Edit Team
          </Button>
        )}
      </Col>
    </>
  );
};

export default Team;
