import { useState, useEffect } from "react";
import * as authService from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const TimeForm = ({ user }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [games, setGames] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [formData, setFormData] = useState({
    user: user._id,
    game: "",
    trackName: "",
    time: "",
  });

  useEffect(() => {
    const getGames = async () => {
      const games = await authService.getGames();
      console.log(games);

      setGames(games);
    };
    if (user) getGames();
  }, [user]);

  const handleChange = (event) => {
    console.log(event.target);

    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.id === "game") {
      const foundGame = games.find((game) => {
        return game._id === event.target.value;
      });
      setTracks(foundGame.levels);
    }
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      await authService.createTime(formData);
      

      navigate(`/`);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <>
      <Col md={4}>
        <Row>
          <h2>Add a time</h2>
        </Row>
        <p>{message}</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Row>
              <label htmlFor="game">Select Game</label>
            </Row>
            <Row>
              <Form.Select name="game" id="game" onChange={handleChange}>
                {games
                  ? games.map((game) => {
                      return (
                        <option key={game._id} value={game._id}>
                          {game.gameName}
                        </option>
                      );
                    })
                  : ""}
              </Form.Select>
            </Row>
          </Row>
          <Row>
            <Row>
              <label htmlFor="trackName">Select Track</label>
            </Row>
            <Row>
              <Form.Select
                name="trackName"
                id="trackName"
                onChange={handleChange}
              >
                {tracks
                  ? tracks.map((track, index) => {
                      return (
                        <option key={index} value={track}>
                          {track}
                        </option>
                      );
                    })
                  : ""}
              </Form.Select>
            </Row>
          </Row>
          <Row>
            <Row>
              <label htmlFor="time">Time (eg. 1:23.45)</label>
            </Row>
            <Row>
              <input
                type="text"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Row>
          </Row>
          <Button variant="dark" type="submit">
            Add Time
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default TimeForm;
