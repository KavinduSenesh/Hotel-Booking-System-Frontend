import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{ id: "", name: "" }],
    })

    const [bookings, setBookings] = useState([
        {
            id: "",
            room: {id: "", roomType: ""},
            checkInDate: "",
            checkOutDate: "",
            bookingConfirmationCode: "",
        }
    ])

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")



    return (
        <div>

        </div>
    );
};

export default Profile;
