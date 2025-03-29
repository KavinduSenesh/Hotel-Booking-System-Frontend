import axios from 'axios';

export const api = axios.create({
    baseURL :"http://localhost:9192/api/v1"
})

// adds a new room to the database
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// gets all room types from the database
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/get/room-types")
        return response.data
    }catch(error){
        throw new Error(`Error while fetching room types ${error}`)
    }
}

// gets all rooms from the database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/get/all-rooms")
        return result.data
    }catch(error){
        throw new Error(`Error while fetching rooms ${error}`)
    }
}

// deletes a room from the database
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error while deleting the room ${error}`)
    }
}

// updates a room in the database
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/room/${roomId}`, formData)
    return response
}

// gets a room by id from the database
export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/get/room/${roomId}`)
        return result.data
    }catch (error){
        throw new Error(`Error while fetching room ${error}`)
    }
}

// books a room
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/save/booking/${roomId}`, booking)
        return response.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error while fetching booking : ${error.message}`)
        }
    }
}

// gets all bookings from the database
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/get/all-bookings")
        console.log("Bookings : ", result.data)
        return result.data
    }catch (error){
        throw new Error(`Error while fetching bookings ${error}`)
    }
}

// get bookings by confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result = await api.get(`/bookings/get/confirmation/${confirmationCode}`)
        return result.data
    }catch (error){
        if (error.response && error.response.data){
            throw new Error(error.response.data)
        }else {
            throw new Error(`Error while fetching booking : ${error.message}`)
        }
    }
}

// deletes a booking from the database
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`bookings/delete/booking/${bookingId}`)
        return result.data
    }catch (error){
        throw new Error(`Error while deleting booking ${error.message}`)
    }
}

// gets all available rooms
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    try{
        const result = await api.get(`rooms/get/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result.data
    }catch (error){
        throw new Error(`Error while fetching rooms ${error}`)
    }
}








