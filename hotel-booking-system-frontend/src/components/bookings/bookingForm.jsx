import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomById} from "../utils/ApiFunctions.js";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment/moment.js";
import {Form, FormGroup} from "react-bootstrap";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInData: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    })

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async(roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        }catch (error){
            throw new Error(`Error while getRoomPriceById: ${error.message}`)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId]);

    const calculatePayment = () => {
        const checkInData = moment(booking.checkInData)
        const checkOutData = moment(booking.checkOutDate)
        const diffInDays = checkOutData.diff(checkInData)
        const price = roomPrice ? roomPrice : 0
        return price * diffInDays
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckoutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInData))){
            setErrorMessage("Check out date must be after check in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestValid() || !isCheckoutDateValid()) {
            e.stopPropagation()
        }else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async() => {
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/", {state:{message : confirmationCode}})
        }catch (error){
            setErrorMessage(error.message)
            navigate("/", {state: {error: error.message}})
        }
    }

    return (
        <>
            <div className={"container mb-5"}>
                <div className={"row"}>
                    <div className={"col-md-6"}>
                        <div className={"card card-body mt-5"}>
                            <h4 className={"card card-title"}>Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>

                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;


