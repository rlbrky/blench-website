import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './storyline.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Storyline = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const bubble1Ref = useRef(null);
    const bubble2Ref = useRef(null);
    const bubble3Ref = useRef(null);

    // Function to wrap letters for animation
    const wrapLetters = (element) => {
        if (!element) return;
        const textWrapper = element.querySelector('.letters');
        if (!textWrapper) return;
        
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    };

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const bubbles = [bubble1Ref.current, bubble2Ref.current, bubble3Ref.current];
        const image = container?.querySelector('.comic-image');

        if (!section || !container || !image) return;

        // Wrap letters in all bubbles
        bubbles.forEach(bubble => wrapLetters(bubble));

        // Set up image positioning first
        gsap.set(image, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            zIndex: 2
        });

        // Set up final bubble positions relative to container center
        const bubblePositions = [
            { x: "-200px", y: "-150px" }, // bubble1: top-left
            { x: "200px", y: "-100px" },   // bubble2: top-right  
            { x: "-150px", y: "200px" }    // bubble3: bottom-left
        ];

        bubbles.forEach((bubble, index) => {
            if (!bubble) return;
            
            gsap.set(bubble, {
                position: "absolute",
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
                x: 0, // Start at center
                y: "100vh", // Start below screen
                opacity: 0,
                scale: 0.8,
                zIndex: 3
            });

            // Set letters initial state
            const letters = bubble.querySelectorAll('.letter');
            gsap.set(letters, { opacity: 0, y: 20 });
        });

        // Create master timeline with ScrollTrigger
        const masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                pin: container,
                pinSpacing: true,
                scrub: 1,
                markers: false
            }
        });

        // Animate each bubble sequentially
        bubbles.forEach((bubble, index) => {
            if (!bubble) return;
            
            const finalPos = bubblePositions[index];
            const letters = bubble.querySelectorAll('.letter');
            
            // Calculate timing for staggered appearance
            const startTime = index * 0.3; // Stagger bubble appearances
            
            // Bubble rise animation
            masterTL.to(bubble, {
                x: finalPos.x,
                y: finalPos.y,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }, startTime)
            
            // Letter animation after bubble is in position
            .to(letters, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.02,
                ease: "power2.out"
            }, startTime + 0.4);
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="storyline-section" ref={sectionRef}>
            <div className="comic-container" ref={containerRef}>
                <img
                    className="comic-image"
                    src="/storyline.png"
                    alt="Storyline Character"
                />

                <div
                    className="bubble bubble1 ml14"
                    ref={bubble1Ref}
                >
                    <span className="text-wrapper">
                        <span className="letters">He was raised in a world untouched by chaos until the night everything <strong>turned to ash.</strong></span>
                        <span className="line"></span>
                    </span>
                </div>
                
                <div
                    className="bubble bubble2 bubble--highlight ml14"
                    ref={bubble2Ref}
                >
                    <span className="text-wrapper">
                        <span className="letters">Since then, he's hunted shadows, sharpened his will, and walked a path only the broken dare to follow.</span>
                        <span className="line"></span>
                    </span>
                </div>
                
                <div
                    className="bubble bubble3 ml14"
                    ref={bubble3Ref}
                >
                    <span className="text-wrapper">
                        <span className="letters">Now, burdened with a cursed blade and a past wrapped in blood and secrets, he returns to where it all began.</span>
                        <span className="line"></span>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Storyline;
