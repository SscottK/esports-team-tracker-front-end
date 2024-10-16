import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const Landing = () => {
  return (
    <Row>
      <Row>
        <div className="img">
          <Image src="/src/assets/esttLogo.png" fluid />
        </div>
      </Row>

      <div className="landingBlurb">
        <h1>Welcome to Esports Team Tracker</h1>

        <p>
          This applicaation is designed for esports coaches to track and
          maintain vital information and data realted to their team. Right now
          on racing games can be tracked. I plan on adding more game types to be
          tracked in the future! If you have an account please sign in,
          otherwise sign up and beging tracking your esports teams data!
        </p>
      </div>
    </Row>
  );
};

export default Landing;
