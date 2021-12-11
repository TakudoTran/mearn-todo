import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const About = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <Button
            variant="primary"
            href="https://www.youtube.com"
            size="lg"
            target="blank"
          >
            Visit youtube for more tutorials
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5">
          <h5>Developed by </h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-2">
          <h5 style={{ color: 'red' }}>Xuan Trong - Van Tho - Quang Linh</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
