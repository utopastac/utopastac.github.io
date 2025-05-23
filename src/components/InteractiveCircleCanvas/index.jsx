import React, { useRef, useEffect, useState } from 'react';
import styles from './index.module.sass';

const InteractiveCircleCanvas = () => {
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


  let width = 0;
  let height = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const bg = bgRef.current;
    const rect = bg.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    console.log(width + " : " + height)

    const resizeCanvas = () => {
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const drawCircles = () => {
      context.clearRect(0, 0, width, height); // Clear the canvas

      const circleRadius = 10; // Half of the 10px diameter
      const gridSize = 15;  // Distance between circle centers

      for (let y = 0; y < height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
          const dx = mousePos.x - x;
          const dy = mousePos.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let scale = Math.max(1 - distance / 500, 0.1); // Example of scaling formula
          let newRadius = circleRadius * scale;
          let alpha = Math.max(1 - distance / 1400, 0.01);

          context.beginPath();
          context.arc(x, y, newRadius, 0, Math.PI * 2, true);
          context.fillStyle = `rgb(40, 40, 40, ${alpha})`; // Circle color
          context.fill();
        }
      }
    };

    const handleMouseMove = (event) => {
      const rect = bg.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawCircles();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePos]);

  return (
    <div ref={bgRef} className={styles.backgroundContainer}>
      <canvas ref={canvasRef} width={1400} height={800} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default InteractiveCircleCanvas;
