import React, {useState} from 'react';
import moment from "moment";
import {getAvailableRooms} from "../utils/ApiFunctions.js";
import {Col, Container, Form, Row} from "react-bootstrap";

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate : "",
        roomType : "",
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please, enter valid data range")
            return
        }

        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("check in date must be before check out date")
            return
        }

        setIsLoading(true)

        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000)
            }).catch((error) => {
                console.error(error)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if (checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }
    }

    const ClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
        })
    }

    return (
        <div>
            <Container className={"mt-5 mb-5 py-5 shadow"}>
                <Form onSubmit={handleSearch}>
                    <Row className={"justify-content-center"}>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label>
                                    Check-in date
                                </Form.Label>
                                <Form.Control
                                    type={"date"}
                                    name={"checkInDate"}
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default RoomSearch;
