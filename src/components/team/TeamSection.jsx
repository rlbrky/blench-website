import React from "react";
import './team-section.css';

// Team data
const teamMembers = [
    {
        name: "Erkin",
        twitterUrl: "https://x.com/Erkinovski",
        photo: "/team/founder.webp"
    },
    {
        name: "Lenny",
        twitterUrl: "https://x.com/ohmylenny",
        photo: "/team/lenny.webp"
    },
    {
        name: "Livrein",
        twitterUrl: "https://x.com/0xLivrein",
        photo: "/team/livrein.webp"
    },
    {
        name: "Jeffers",
        twitterUrl: "https://x.com/Jefferstellar",
        photo: "/team/jeffers.webp"
    },
    {
        name: "Eviltaha",
        twitterUrl: "https://x.com/Eviltahaa",
        photo: "/team/eviltaha.webp"
    }
];

const TeamSection = () => {
    const handleMemberClick = (twitterUrl, name) => {
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="team">
            <div className="container">
                <ul className="items">
                    {teamMembers.map((member, index) => (
                        <li 
                            key={index} 
                            className="clickable-member"
                            onClick={() => handleMemberClick(member.twitterUrl, member.name)}
                            title={`View ${member.name}'s X profile`}
                        >
                            <span className="name">
                                {Array.from(member.name).map((char, charIndex) => (
                                    <span key={charIndex} style={{ '--i': charIndex }}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                            <div className="avatar-holder">
                                <span className="avatar">
                                    <img 
                                        src={member.photo || '/team/default-avatar.png'} 
                                        alt={member.name}
                                        onError={(e) => {
                                            e.target.src = '/team/default-avatar.png';
                                        }}
                                    />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default TeamSection;