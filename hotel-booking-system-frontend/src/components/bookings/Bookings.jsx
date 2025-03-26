import React, {useEffect, useState} from 'react';
import {cancelBooking, getAllBookings} from "../utils/ApiFunctions.js";
import Header from "../common/Header.jsx";
import BookingsTable from "./BookingsTable.jsx";

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                console.log("Fetched Bookings:", data)
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                console.error("Error fetching bookings:", error);
                setError(error.message)
                setIsLoading(false)
            })
        }, 1000)
    }, []);

    const handleBookingCancellation = async(bookingId) => {
        try{
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        }catch (error){
            setError(error.message)
        }
    }

    return(
        <section className={"container"} style={{backgroundColor: "whitesmoke"}}>
            <Header title={"Existing Bookings"}/>
            {error &&
                <div className={"text-danger"}>{error}</div>
            }
            {isLoading ? (
                <div>Loading existing bookings</div>
                ) : (
                    <BookingsTable
                        bookingInfo={bookingInfo}
                        handleBookingCancellation={handleBookingCancellation}
                    />
                )}
        </section>
    )
}

export default Bookings;
