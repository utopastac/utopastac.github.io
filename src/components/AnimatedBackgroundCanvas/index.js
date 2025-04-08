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

        // Generate initial positions and properties for circles
        for (let i = 0; i < circleCount; i++) {
            const radius = (Math.random() * (window.innerWidth/4)) + window.innerWidth/8;
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
        <div  className={styles.backgroundContainer}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};

AnimatedBackgroundCanvas.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.array)
};

AnimatedBackgroundCanvas.defaultProps = {
    colors: [
        [
            'rgba(255, 100, 100, 0.8)',
            'rgba(100, 255, 100, 0.8)',
            'rgba(100, 100, 255, 0.8)',
            'rgba(255, 255, 100, 0.8)',
            'rgba(255, 100, 255, 0.8)',
            'rgba(255, 255, 255, 0.5)'
        ],
        [
            'rgba(255, 100, 100, 0.8)',
            'rgba(100, 255, 100, 0.8)',
            'rgba(100, 100, 255, 0.8)',
            'rgba(255, 255, 100, 0.8)',
            'rgba(255, 100, 255, 0.8)',
            'rgba(255, 255, 255, 0.5)'
        ]
    ]
};

export default AnimatedBackgroundCanvas;
