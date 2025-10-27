/*import React from "react";
import {BrowserRouter as Router,Route,Link}from "react-router-dom"
import about form '/components/about'
import home from '/components/home'
function App(){
    return(
        <>
    <Router>
        <nav>
            <ul>
                <li>
                    <link to="/about">about</link>
                </li>
            </ul>
        </nav>
        </>
    </Route>
    <Routers>
        <Route path="/about" element={<about/>}/>

    </Routers>
    );
}
export defauolt App
*
import React from "react";*/import React
from "react";
import {BrowserRouter as Router , Route, Line} from react-router-dom
function app(){
    return(
        <Router>
            <div>
                <nav></nav>
                <ul>
                    <li>
                        <link to="about/">about</link>
                    </li>
                </ul>
                </nav>
                <Routers>
                    <Route path="about/" element={<elemet/}/>
                </Routers>
            </div>
        </Router>
    );
}
import React from "react";
function Component(){
    const about=()={
        return(
        <p> this is about</>
        <ul>
        <li><Link to="/about/id">iddetaia</Link></li></ul>
        )
    }
}