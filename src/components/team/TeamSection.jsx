import React from "react";
import './team-section.css';
import TeamCard from './TeamCard';

// Team data
const teamMembers = [
    {
        name: "Erkin",
        role: "Founder",
        twitterUrl: "https://x.com/Erkinovski",
        photo: "/team/founder.webp"
    },
    {
        name: "Lenny",
        role: "Developer",
        twitterUrl: "https://x.com/ohmylenny",
        photo: "/team/lenny.webp"
    },
    {
        name: "Livrein",
        role: "Artist",
        twitterUrl: "https://x.com/0xLivrein",
        photo: "/team/livrein.webp"
    },
    {
        name: "Jeffers",
        role: "Designer",
        twitterUrl: "https://x.com/Jefferstellar",
        photo: "/team/jeffers.webp"
    },
    {
        name: "Eviltaha",
        role: "Marketing",
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
            <div className="team-cards-container">
                {teamMembers.map((member, index) => (
                    <TeamCard 
                        key={index}
                        member={member}
                        onCardClick={handleMemberClick}
                    />
                ))}
            </div>
            
            {/* SVG Filters for card effects */}
            <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="lighting">
                        <feGaussianBlur
                            in="SourceAlpha"
                            stdDeviation="2"
                            result="blur"
                        ></feGaussianBlur>
                        <feSpecularLighting
                            result="lighting"
                            in="blur"
                            surfaceScale="8"
                            specularConstant="12"
                            specularExponent="120"
                            lightingColor="hsl(0 0% 6%)"
                        >
                            <fePointLight x="50" y="50" z="300"></fePointLight>
                        </feSpecularLighting>
                        <feComposite
                            in="lighting"
                            in2="SourceAlpha"
                            operator="in"
                            result="composite"
                        ></feComposite>
                        <feComposite
                            in="SourceGraphic"
                            in2="composite"
                            operator="arithmetic"
                            k1="0"
                            k2="1"
                            k3="1"
                            k4="0"
                            result="litPaint"
                        ></feComposite>
                    </filter>
                    <filter id="sticker">
                        <feMorphology
                            in="SourceAlpha"
                            result="dilate"
                            operator="dilate"
                            radius="2"
                        ></feMorphology>
                        <feFlood floodColor="hsl(0 0% 100%)" result="outlinecolor"></feFlood>
                        <feComposite
                            in="outlinecolor"
                            in2="dilate"
                            operator="in"
                            result="outlineflat"
                        ></feComposite>
                        <feMerge result="merged">
                            <feMergeNode in="outlineflat"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                    </filter>
                </defs>
            </svg>
        </section>
    );
}

export default TeamSection;