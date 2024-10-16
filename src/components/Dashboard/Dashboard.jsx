import Teams from "../Teams/Teams";
import TimeForm from "../TimeForm/TimeForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Dashboard = ({ user, preparedData }) => {
  return (
    <Col>
      <Col>
        <h1>Welcome, {user.username}</h1>
      </Col>
      <Row className="teams">
        <Col>
          <Teams user={user} preparedData={preparedData} />
        </Col>
        <Col>
          <TimeForm user={user} />
        </Col>
      </Row>

      <Col offset={4}>
        <div className="userEditButton">
          <Button variant="dark" href={`/users/${user._id}/edit`}>
            Edit User
          </Button>
        </div>
      </Col>
    </Col>
  );
};

export default Dashboard;
