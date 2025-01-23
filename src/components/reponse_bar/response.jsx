import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import ImageComponent from '../ImageComponent/image';
import "./response.css";

import TypingEffect from './typingeffect';
import { recent_context } from '../context/cont';
import FormModal from './modal';
import { Link } from 'react-router-dom';

export const Array = [];

function Response_Bar() {
    const [Display, setDisplay] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [sendRequest, setSendRequest] = useState(" ");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(null);
    const { setRecent_items } = useContext(recent_context);
    const [toggle, setToggle] = useState(false);
    const [userModalBody, setUserModalBody] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://render-back-end-2.onrender.com/prompt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: sendRequest })
                });

                const responseData = await res.json();
                setResponse(responseData.response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                console.error({ error: "An error occurred " });
            }
        };

        if (sendRequest) {
            fetchData();
        }
    }, [sendRequest]);

    useEffect(() => {
        if (clicked) {
            Array.push(prompt);
        }
    }, [sendRequest]);

    const handleToggle = () => {
        setToggle((prev) => !prev);
        document.body.style.backgroundColor = toggle ? "white" : "black";
        document.body.style.color = toggle ? "black" : "white";
    };

    return (
        <div className='response-container'>
            <div className='header'>
                <div className='logo'>
                    <ImageComponent
                        src={assets.Gemini_Advanced_logo}
                        style={{ width: 150 }}
                    />
                </div>
                <div className="nav">
                    <div className='nav-name'>
                        <a href="https://one.google.com/explore-plan/gemini-advanced">Try advanced Gemini</a>
                    </div>
                    <div className="toggle_bar">
                        <button
                            style={{
                                backgroundColor: toggle ? "black" : "white",
                                color: toggle ? "white" : "black"
                            }}
                            onClick={handleToggle}
                        >
                            <Link to="/">Return to Home</Link>
                        </button>
                    </div>
                    <div className='nav-hamburger'>
                        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.bard">
                            <ImageComponent
                                src="https://e7.pngegg.com/pngimages/530/733/png-clipart-goggle-playstore-icon-google-play-computer-icons-android-play-button-angle-rectangle-thumbnail.png"
                                style={{ width: 35, borderRadius: '0%' }}
                            />
                        </a>
                    </div>
                    <div className='nav-user-icon'>
                        <ImageComponent
                            src={assets.user_icon}
                            style={{ width: 40, borderRadius: '50%' }}
                            onClick={() => setUserModalBody((prev) => !prev)}
                        />
                    </div>
                    {userModalBody && <FormModal className="pos" />}
                </div>
            </div>
            {Display ? (
                <div className='dialog-box'>
                    <div>{
                        loading ? (
                            <div className="loader">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        ) : (
                            <TypingEffect text={response} queryt={prompt} delay={30} />
                        )
                    }</div>
                </div>
            ) : (
                <div className='main'>
                    <div className="greet">
                        <p><span>hello naveen</span></p>
                        <p>how can i help you</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>suggest beautiful places to see on an upcoming road trip</p>
                            <ImageComponent className="card_image" src={assets.compass_icon} />
                        </div>
                        <div className="card">
                            <p>brief summarize this concept</p>
                            <ImageComponent className="card_image" src={assets.bulb_icon} />
                        </div>
                        <div className="card">
                            <p>five habits to follow daily</p>
                            <ImageComponent className="card_image" src={assets.message_icon} />
                        </div>
                        <div className="card">
                            <p>improve the readability of the code</p>
                            <ImageComponent className="card_image" src={assets.code_icon} />
                        </div>
                    </div>
                </div>
            )}
            <div className='footer'>
                <div className='input-bar'>
                    <input
                        type='text'
                        style={{
                            backgroundColor: toggle ? "black" : "white",
                            color: toggle ? "white" : "black"
                        }}
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        placeholder='Enter your prompt'
                    />
                </div>
                <div className='additonal-icons'>
                    <div className='mic-icon'>
                        <ImageComponent
                            src={assets.mic_icon}
                            style={{ width: 30 }}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <label
                            htmlFor="file-input"
                            style={{
                                display: "inline-block",
                                width: 30,
                                height: 30,
                                backgroundImage: `url(${assets.gallery_icon})`,
                                backgroundSize: "cover",
                                cursor: "pointer",
                            }}
                        ></label>
                    </div>
                    <div className='send-icon'>
                        <ImageComponent
                            src={assets.send_icon}
                            style={{ width: 30 }}
                            onClick={() => {
                                if (!Display) setDisplay(true);
                                setSendRequest(prompt);
                                setLoading(true);
                                setRecent_items(prompt);
                                setClicked(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Response_Bar;
