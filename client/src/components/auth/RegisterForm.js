import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layouts/AlertMessage";

const RegisterForm = () => {
  //context
  const { registerUser } = useContext(AuthContext);

  //local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = registerForm;
  const [alert, setAlert] = useState(null);
  //computed property
  const oncChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "password do not match" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      // console.log(loginData);
      if (!registerData.success) {
        setAlert({
          type: "danger ",
          message: registerData.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            required
            value={username}
            onChange={oncChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            value={password}
            onChange={oncChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={oncChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-2" variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="mt-2">
        Already have an account?
        <Link to="/login">
          <Button variant="info" className="ml-2" size="sm">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
