import useFetch from "@/hooks/useFetch";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Style from './homeWelcome.module.css';

const HomeWelcomeMessage = ({ welcomeMessage }) => {
  return (
    <div>
      <Container>
        <Row className="mb-5">
          <Col md={9} className="mx-auto shadow border p-4">
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#009cff" }}>
            ঊষা পরিচিতি
            </h2>
            <p>{welcomeMessage?.data[0]?.dureg}</p>
            <Link href="/history">
                <button className={Style.button}>Read more...</button>
              </Link>
          </Col> 
        </Row>
      </Container>
    </div>
  );
};

export default HomeWelcomeMessage;
