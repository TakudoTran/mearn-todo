import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";
const LoginForm = () => {
  //context
  const { loginUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const [alert, setAlert] = useState(null);
  //computed property
  const oncChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      // console.log(loginData);
      if (!loginData.success) {
        setAlert({
          type: "danger ",
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            required
            value={username}
            onChange={oncChangeLoginForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={oncChangeLoginForm}
            required
          ></Form.Control>
        </Form.Group>
        <Button className="mt-2" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-2">
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
