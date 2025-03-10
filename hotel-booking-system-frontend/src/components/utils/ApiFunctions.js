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
        throw new Error("Error while fetching room types")
    }
}