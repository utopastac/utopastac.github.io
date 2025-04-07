import React, { useEffect, useRef } from 'react';
import styles from './index.module.sass';
import PropTypes from 'prop-types';

const GradientTimeBackground = ({ width, height }) => {
    const canvasRef = useRef(null);

    const getGradientColor = (hour) => {
        // Define gradient colors for morning, noon, dusk, and night
        const gradients = [
            { time: 0, color: '#0A2342' },      // Midnight
            { time: 5, color: '#3F76B8' },      // Dawn
            { time: 6, color: '#FFC371' },      // Morning
            { time: 11, color: '#FFDD00' },     // Noon
            { time: 18, color: '#FF5733' },     // Sunset
            { time: 20, color: '#1C1C2B' },     // Night
        ];

        // Find appropriate gradient based on current hour
        for (let i = 1; i < gradients.length; i++) {
            if (hour >= gradients[i - 1].time && hour < gradients[i].time) {
                // Blend color between two times
                const ratio = (hour - gradients[i - 1].time) / (gradients[i].time - gradients[i - 1].time);
                const start = gradients[i - 1].color;
                const end = gradients[i].color;
                return blendColors(start, end, ratio);
            }
        }
        return gradients[0].color;
    };

    const blendColors = (color1, color2, ratio) => {
        const hex = (color) => parseInt(color.substring(1), 16);
        const r1 = hex(color1) >> 16, g1 = hex(color1) >> 8 & 0x00FF, b1 = hex(color1) & 0x0000FF;
        const r2 = hex(color2) >> 16, g2 = hex(color2) >> 8 & 0x00FF, b2 = hex(color2) & 0x0000FF;
        const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
        const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
        const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
        return `rgb(${r},${g},${b})`;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = width || window.innerWidth;
        canvas.height = height || window.innerHeight;

        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const gradientColor = getGradientColor(currentHour);
        gradient.addColorStop(0, '#ffffff'); // Top color
        gradient.addColorStop(1, gradientColor);

        // Fill the entire canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

        // Add horizon line (small gradient for effect)
        const horizonGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
        horizonGradient.addColorStop(0, gradientColor);
        horizonGradient.addColorStop(1, '#000000');

        ctx.fillStyle = horizonGradient;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }, [width, height]);

    return (
        <div  className={styles.backgroundContainer}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
};

GradientTimeBackground.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default GradientTimeBackground;
