import React from "react";
import Navbar from "../component/navbar";
import LoginBar from "../component/login";
import './home.css'

function Home() {
    return(
        <>
            <LoginBar />
            <Navbar />
            <div class="main" id="home-page">
            </div>
        </>
    )
}

export default Home;