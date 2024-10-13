import Teams from "../Teams/Teams";
import TimeForm from "../TimeForm/TimeForm"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


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
        </Col>
    )
};


export default Dashboard