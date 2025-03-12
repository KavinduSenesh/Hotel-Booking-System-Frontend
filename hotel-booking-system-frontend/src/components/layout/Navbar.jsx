import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className={"navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top"}>
            <div className={"container-fluid"}>
                <Link to={"/"}>
                    <span className={"hotel-color"}> Mount Hotel </span>
                </Link>
                <button
                    className={"navbar-toggler"}
                    type={"button"}
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    arial-controls={"navbarScroll"}
                    aria-expanded={"false"}
                    aria-label={"Toggle navigation"}
                >
                    <span className={"navbar-toggler-icon"}>
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;
