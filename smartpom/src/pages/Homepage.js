import React from 'react';
import "./Homepage.css";

class Homepage extends React.Component {

    render() {
        return(
            <div>
                <h1 className="title">SmartPom</h1>
                <label className="boxLabel">What Are We Working On Today?</label>
                <input className="promptBox" type="text" placeholder="Input Prompt"></input>
            </div>
        )
    }
}

export default Homepage;