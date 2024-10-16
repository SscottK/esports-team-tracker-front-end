import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as authService from "../../services/authServices";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

//needs to happen
/*when form is submited I need it to change the name and add or remove members and games
handleChange**
handleSubmit


*/

const EditTeam = () => {
  const navigate = useNavigate();
  const { teamId } = useParams("teamId");
  const [team, setTeam] = useState(null);
  const [formData, setFormData] = useState({
    teamName: "",
    members: [],
    games: [],
  });

  useEffect(() => {
    const getTeam = async () => {
      const foundTeam = await authService.getTeam(teamId);

      setTeam(foundTeam);
    };

    if (teamId) getTeam();
  }, [teamId]);

  const handleChange = (event) => {
    // if (event.target.value !in formData.members)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    const key = event.target.name;
    const existingArray = formData[key];

    if (
      event.target.checked &&
      existingArray.indexOf(event.target.value) == -1
    ) {
      existingArray.push(event.target.value);
    } else if (
      !event.target.checked &&
      existingArray.indexOf(event.target.value) >= 0
    ) {
      existingArray.splice(existingArray.indexOf(event.target.value), 1);
    }
    setFormData({ ...formData, [event.target.name]: existingArray });
  };
  const handleSave = async (event) => {
    try {
      event.preventDefault();
      await authService.editTeam(teamId, formData);
      navigate(`/teams/${teamId}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Container>
        <Row>
          <p>How to edit your team:</p>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item variant="dark">
                A check box must be checked to keep that data.
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                ALL BOXES START UNCHECKED
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <form onSubmit={handleSave}>
          <Col md={4}>
            <label htmlFor="teamName">New Team Name</label>
            <input
              type="text"
              name="teamName"
              defaultValue={team ? team.teamName : ""}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <div>
              <label htmlFor="Members">Members</label>
            </div>
            <ListGroup as="ul">
              {team
                ? team.members.map((member) => {
                    return (
                      <ListGroup.Item variant="dark" key={member._id}>
                        <label htmlFor={"members" + member._id}>
                          {member.username}
                        </label>{" "}
                        <input
                          type="checkbox"
                          name="members"
                          id={"members" + member._id}
                          value={member._id}
                          onChange={handleCheckboxChange}
                        />
                      </ListGroup.Item>
                    );
                  })
                : ""}
            </ListGroup>
            <div>
              <Button href={`/teams/${teamId}/addmember`} variant="dark">
                Add Member to Team
              </Button>{" "}
            </div>
          </Col>
          <Col md={4}>
            <div>
              <label htmlFor="games">Games</label>
              <ListGroup id="games">
                {team
                  ? team.games.map((game) => {
                      return (
                        <ListGroup.Item variant="dark" key={game._id}>
                          <label htmlFor={"games" + game._id}>
                            {game.gameName}
                          </label>{" "}
                          <input
                            type="checkbox"
                            name="games"
                            id={"games" + game._id}
                            value={game._id}
                            onChange={handleCheckboxChange}
                          />
                        </ListGroup.Item>
                      );
                    })
                  : ""}
              </ListGroup>
            </div>
          </Col>
          <Col>
            <Button href={`/games/${teamId}/addgame`} variant="dark">
              Add Game
            </Button>{" "}
          </Col>
          <div>
            <Button type="submit" variant="dark">
              Save
            </Button>{" "}
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditTeam;
