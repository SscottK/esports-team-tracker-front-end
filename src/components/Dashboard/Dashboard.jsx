import Teams from "../Teams/Teams";
import TimeForm from "../TimeForm/TimeForm"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


const Dashboard = ({ user, preparedData}) => {
    return(
        <Col>
            <h1>Welcome, {user.username}</h1>
            <p>
                This page is only visible if you are signed in
            </p>
            <Row className="teams">
                <Col>
                    <Teams user={user} preparedData={preparedData}/>
                </Col>
                <Col>
                    <TimeForm user={user} />
                </Col>
            </Row>
            <Col>
             <Button href={`/users/${user._id}/edit`}>Edit User</Button>
            </Col>
        </Col>

    )
};


export default Dashboard