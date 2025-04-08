import React, { useEffect, useRef } from 'react';
import styles from './index.module.sass';
import PropTypes from 'prop-types';

const AnimatedBackgroundCanvas = ({ colors }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const circles = [];
        const circleCount = 10; // Number of circles
        const speed = 5;
        const colorsSet = colors[Math.floor(Math.random() * colors.length)]
        
        // Initialize canvas size to match the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Resize canvas on window resize
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);

        const minRadius = Math.max(window.innerWidth/8, 150);
        const maxRadiusRange = Math.min(window.innerWidth/4, 700);

        // Generate initial positions and properties for circles
        for (let i = 0; i < circleCount; i++) {
            const radius = (Math.random() * maxRadiusRange) + minRadius;
            circles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() - 0.5) * speed, // Movement speed and direction
                dy: (Math.random() - 0.5) * speed,
                radius,
                color: colorsSet[Math.floor(Math.random() * colorsSet.length)],
                baseRadius: radius, // Save initial radius for scaling
                scale: Math.random() * 0.05 + 0.95 // Random scale factor around 1
            });
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => {
                ctx.beginPath();

                // Compute scale based on time or position
                const scale = Math.cos(Date.now() * 0.001 + circle.baseRadius) * 0.2 + 0.8; // Scale oscillation
                const scaledRadius = circle.baseRadius * scale;
                
                ctx.arc(circle.x, circle.y, scaledRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = circle.color;
                ctx.globalAlpha = 0.9; // Making circles slightly transparent
                // ctx.filter = 'blur(8px)'; // Applying blur for overlap effect
                ctx.fill();
                ctx.closePath();

                // Move circles within a range
                circle.x += circle.dx;
                circle.y += circle.dy;

                if (circle.x + scaledRadius > canvas.width || circle.x - scaledRadius < 0) {
                    circle.dx = -circle.dx;
                }

                if (circle.y + scaledRadius > canvas.height || circle.y - scaledRadius < 0) {
                    circle.dy = -circle.dy;
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [colors]);

    return (
        <div className={styles.backgroundContainer}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '120%', height: '100%' }} />
        </div>
    );
};

AnimatedBackgroundCanvas.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.array)
};

AnimatedBackgroundCanvas.defaultProps = {
    colors: [
        // Inspired by Aurora Borealis
        ["#3B9C9C", "#72C2C2", "#A4D8D8", "#D4E3F2", "#0E4D92"],
                
        // Celestial Glow
        //["#3B9C9C", "#035E7B", "#1FB5B0", "#62D2A2", "#A0CCD4"],
        
        // Warm Sunset
        //["#FF5E78", "#FF8A5C", "#FFBD4A", "#FFDA6C", "#F2EC85"],----
        
        // Ocean Breeze
        ["#003D5B", "#04756F", "#54B2A9", "#A0E8AF", "#F4F1BB"],
        
        // Coastal Calm
        //["#016064", "#028482", "#93E9BE", "#B3E2D3", "#E8FFFF"],
        
        // Vintage Rose
        //["#C9ADA7", "#E2A2B8", "#E7BB7E", "#807E7E", "#4A444E"],----

        // Pastel Morning
        //["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],----
        
        // Calm Horizon
        //["#D3EEDD", "#F1E0B0", "#F3D2C1", "#D3BBDD", "#B0D6F1"],----

        // Deep Sea
        //["#013A63", "#036280", "#028090", "#00A896", "#02C39A"],----
        
        // Ocean Wave
        ["#005F73", "#0A9396", "#94D2BD", "#E9D8A6", "#EE9B00"],

        // Sunrise Glow
        //["#FFB6AB", "#FFD3B6", "#FFFACD", "#ADE8F4", "#D7E1FF"],----
    ]
};

export default AnimatedBackgroundCanvas;
