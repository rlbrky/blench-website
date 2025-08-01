import React, { useRef, useEffect, useState } from 'react';
import './team-card.css';
import blenchText from "/team/card-assets/blench-text.png";
import cardMid from "/team/card-assets/blench-B.png";
import cardBackdrop from "/storyline.png";

const TeamCard = ({ member, onCardClick }) => {
    const cardRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const bounds = card.getBoundingClientRect();
            const posX = e.clientX - bounds.x;
            const posY = e.clientY - bounds.y;
            const ratioX = posX / bounds.width - 0.5;
            const ratioY = posY / bounds.height - 0.5;
            const pointerX = Math.max(-1, Math.min(1, ratioX * 2));
            const pointerY = Math.max(-1, Math.min(1, ratioY * 2));

            card.style.setProperty('--pointer-x', pointerX.toFixed(2));
            card.style.setProperty('--pointer-y', pointerY.toFixed(2));
        };

        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(member.twitterUrl, member.name);
        }
    };

    return (
        <div className="scene">
            <article 
                className="card" 
                data-active="true"
                ref={cardRef}
            >
                <button 
                    aria-label="Flip card" 
                    aria-pressed={isFlipped}
                    onClick={handleFlip}
                ></button>
                <div className="card__content">
                    <div className="card__rear card__face">
                        <img
                            className="backdrop"
                            src="https://assets.codepen.io/605876/techtrades-backdrop.png"
                            /*src={cardBackdrop}*/
                            alt=""
                        />
                        <div className="card__emboss">
                            <div className="wordmark">
                                <img
                                    src={blenchText}
                                    alt="Blench"
                                />
                            </div>
                            <div className="wordmark">
                                <img
                                    src={blenchText}
                                    alt="Blench"
                                />
                            </div>
                            <img
                                className="gemstone"
                                src={cardMid}
                                alt=""
                            />
                        </div>
                        <div className="spotlight"></div>
                    </div>
                    <div className="card__front" onClick={handleCardClick}>
                        <div className="pattern">
                            <div className="refraction"></div>
                            <div className="refraction"></div>
                        </div>
                        <div className="card__frame card__emboss">
                            <h3>
                                <span>{member.name}</span><br />
                                <span>{member.role || 'Team Member'}</span>
                            </h3>
                            <img
                                src={member.photo}
                                alt={member.name}
                                onError={(e) => {
                                    e.target.src = '/team/default-avatar.png';
                                }}
                            />
                        </div>
                        <div className="spotlight"></div>
                        <div className="glare-container">
                            <div className="glare"></div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default TeamCard;