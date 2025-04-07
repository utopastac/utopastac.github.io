import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.sass';

const AnimatedBackground = ({ colors }) => {
    const circlesRef = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateCirclePosition = (circle) => {
            let directionX = Math.random() > 0.5 ? 1 : -1;
            let directionY = Math.random() > 0.5 ? 1 : -1;
            const speedX = Math.random() * 1 + 0.5;  // Increased speed range
            const speedY = Math.random() * 1 + 0.5;  // Increased speed range

            const moveCircle = () => {
                const rect = circle.getBoundingClientRect();
                let x = circle.dataset.x ? parseFloat(circle.dataset.x) : rect.left;
                let y = circle.dataset.y ? parseFloat(circle.dataset.y) : rect.top;

                if (rect.right > containerRef.current.offsetWidth || rect.left < 0) {
                    directionX *= -1;
                }
                if (rect.bottom > containerRef.current.offsetHeight || rect.top < 0) {
                    directionY *= -1;
                }

                // Modified movement to cover more space
                x += directionX * speedX;
                y += directionY * speedY;

                circle.dataset.x = x;
                circle.dataset.y = y;

                circle.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(moveCircle);
            };

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            circle.style.background = `radial-gradient(circle, ${randomColor}, transparent 50%)`;
            moveCircle();
        };

        circlesRef.current.forEach(updateCirclePosition);
    }, [colors]);

    const circleArray = [...Array(10)]; // Number of circles

    return (
        <div ref={containerRef} className={styles.backgroundContainer}>
            {circleArray.map((_, index) => {
                const size = Math.random() * 700 + 800;
                const startX = (Math.random() * (containerRef.current ? containerRef.current.offsetWidth : window.innerWidth)) - size/2;
                const startY= (Math.random() * (containerRef.current ? containerRef.current.offsetHeight : window.innerHeight)) - size/2;
                return (
                    <div
                        key={index}
                        ref={el => circlesRef.current[index] = el}
                        className={`${styles.circle}`}
                        style={{
                            transform3D: `translate(${startX}px, ${startY}px), 0`,
                            width: `${size}px`,
                            height: `${size}px`
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

AnimatedBackground.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string)
};

AnimatedBackground.defaultProps = {
    colors: ['rgba(255, 100, 100, 0.7)', 'rgba(100, 255, 100, 0.7)', 'rgba(100, 100, 255, 0.7)', 'rgba(255, 255, 100, 0.7)', 'rgba(255, 100, 255, 0.7)']
};

export default AnimatedBackground;
