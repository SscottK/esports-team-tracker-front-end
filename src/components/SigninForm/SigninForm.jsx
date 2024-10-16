import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authServices";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user);
      
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const { username, password } = formData;

  return (
    <Col>
      <h1>Sign In</h1>
      <p>{message}</p>
      <Form onSubmit={handleSubmit}>
        <div className="signin">
          <Row>
            <label htmlFor="username">Username</label>
          </Row>

          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="signin">
          <Row>
            <label htmlFor="password">Password</label>
          </Row>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="signinButtons">
          <Button variant="dark" type="submit">
            Sign In
          </Button>
          <Link to="/">
            <Button variant="dark">Cancel</Button>
          </Link>
        </div>
      </Form>
    </Col>
  );
};

export default SigninForm;
