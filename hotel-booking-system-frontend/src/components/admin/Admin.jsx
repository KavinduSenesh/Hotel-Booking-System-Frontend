import React from "react";
import {Link} from "react-router-dom";

const Admin = () => {
    return(
        <Section className={"container mt-5"}>
            <h2>Welcome to Admin panel</h2>
            <hr/>
            <Link to={"/add-room"}>
                Manage Rooms
            </Link>
        </Section>
    )
}

export default Admin;
