import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authServices";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormValid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <Row>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <Form onSubmit={handleSubmit}>
        <div className="signup">
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
        <div className="signup">
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
        <div className="signup">
          <Row>
            <label htmlFor="passwordConf">Confirm Password</label>
          </Row>
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
          />
        </div>
        <div className="signupButtons">
          <Button type="submit" variant="dark" disabled={isFormValid()}>
            Sign Up
          </Button>
          <Link to="/">
            <Button variant="dark">Cancel</Button>
          </Link>
        </div>
      </Form>
    </Row>
  );
};

export default SignupForm;
