import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button variant="primary" href="https://www.youtube.com" size="lg" target='blank'>
          Visit youtube for more tutorials
        </Button>
      </Col>
    </Row>
  );
};

export default About;
