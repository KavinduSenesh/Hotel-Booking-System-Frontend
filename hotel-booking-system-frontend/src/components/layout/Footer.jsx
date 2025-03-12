import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    let today = new Date();

    return (
        <div>
            <footer>
                <Container className={"btn-dark text-light py-3 footer mt-lg-5"}>
                    <Row>
                        <Col xs={12} md={12} className={"text-center"}>
                            <p>&copy; {today.getFullYear()} Mount Hotel</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default Footer;
