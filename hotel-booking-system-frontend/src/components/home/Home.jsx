import React from "react";
import MainHeader from "../layout/MainHeader.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";

const Home = () => {
    return (
        <section>
            <MainHeader/>
                <section className={"container"}>
                    <RoomCarousel/>
                    <Parallax/>
                    <RoomCarousel/>
                    <HotelService/>
                    <Parallax/>
                    <RoomCarousel/>
                </section>
        </section>
    )
}

export default Home;
