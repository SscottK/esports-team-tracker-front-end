import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Teams = ({ preparedData }) => {
  return (
    <>
      <Col md={{ span: 4, offset: 5 }}>
        <Row>
          <h3>Teams</h3>
        </Row>
        <Row>
          <ListGroup>
            {preparedData
              ? preparedData.teams.map((team) => {
                  return (
                    <ListGroup.Item key={team._id}>
                      <Link className="link" to={`/teams/${team._id}`}>
                        {team.teamName}
                      </Link>
                    </ListGroup.Item>
                  );
                })
              : ""}
          </ListGroup>
        </Row>
      </Col>
    </>
  );
};

export default Teams;
