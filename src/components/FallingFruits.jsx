import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FallingFruits = () => {
  const fruits = [
    '/strawberry.png',
    '/watermelon.png',
    '/cherry.png',
    '/pear.png',
  ];

  const pathRef1 = useRef(null);
  const pathRef2 = useRef(null);
  const svgRef = useRef(null);

  const getPathPoints = (path, numPoints = 10) => {
    const pathLength = path.getTotalLength();
    const points = [];
    
    for (let i = 0; i <= numPoints; i++) {
      const point = path.getPointAtLength((pathLength / numPoints) * i);
      points.push({ x: point.x, y: point.y });
    }
    
    return points;
  };

  const [fruitItems, setFruitItems] = useState([]);

  useEffect(() => {
    const path1 = pathRef1.current;
    const path2 = pathRef2.current;
    const svg = svgRef.current;

    if (!path1 || !path2 || !svg) return;

    // Get SVG's bounding box for coordinate conversion
    const svgRect = svg.getBoundingClientRect();
    
    // Extract path points
    const pathPoints1 = getPathPoints(path1, 100);
    const pathPoints2 = getPathPoints(path2, 100);

    const allPathPoints = [...pathPoints1, ...pathPoints2];

    // Convert SVG coordinates to viewport coordinates
    const convertToViewportCoords = (point) => {
      const xOffset = 26;
      const yOffset = 10;
      const x = (point.x / svgRect.width) * 400 + xOffset;
      const y = (point.y / svgRect.height) * 400 + yOffset;
      return { x, y };
    };

    const items = Array.from({ length: 200 }) // Reduced number of fruits
      .map(() => {
        const randomPoint = allPathPoints[Math.floor(Math.random() * allPathPoints.length)];
        const viewportPoint = convertToViewportCoords(randomPoint);
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 2;
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        const oscillation = Math.random() * 20 - 10; // Reduced oscillation

        return {
          x: viewportPoint.x,
          y: viewportPoint.y,
          delay,
          duration,
          fruit,
          oscillation,
          scale: 0.9 + Math.random() * 1.3, // Random size between 0.2 and 0.5 of original
        };
      })
      .filter(Boolean);

    setFruitItems(items);
  }, []);

  return (
    <div className="falling-fruits relative w-full h-screen overflow-hidden">
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        viewBox="0 0 200 200" 
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0"
      >

        <path
          ref={pathRef1}
          d="M64.5 21.25C64.5 21.4167 64.2083 22.4167 63.625 24.25C63.125 26 62.4167 28.2917 61.5 31.125C60.5833 33.875 59.5 37 58.25 40.5C57.0833 44 55.8333 47.625 54.5 51.375C53.1667 55.0417 51.7917 58.6667 50.375 62.25C49.0417 65.8333 47.7917 69.0417 46.625 71.875C46.4583 77.625 46.25 83 46 88C45.75 93 45.5 97.375 45.25 101.125C45 104.875 44.75 107.875 44.5 110.125C44.25 112.292 44.0417 113.417 43.875 113.5C43.4583 113.833 42.7917 113.708 41.875 113.125C40.9583 112.625 40 111.917 39 111C38.0833 110.083 37.2083 109.083 36.375 108C35.625 106.917 35.125 106 34.875 105.25C34.7917 104.917 34.6667 103.875 34.5 102.125C34.3333 100.292 34.125 97.875 33.875 94.875C33.625 91.7917 33.3333 88.2083 33 84.125C32.75 80.0417 32.5 75.5417 32.25 70.625C30.6667 67.125 29 63 27.25 58.25C25.75 54.1667 24.0417 49.2083 22.125 43.375C20.2917 37.5417 18.4167 30.8333 16.5 23.25C16.5 22.5 16.9583 21.75 17.875 21C18.7917 20.1667 19.9167 19.4583 21.25 18.875C22.5833 18.2917 24 17.8333 25.5 17.5C27 17.1667 28.3333 17.125 29.5 17.375C29.8333 17.875 30.4583 19.7917 31.375 23.125C31.7083 24.5417 32.125 26.3333 32.625 28.5C33.2083 30.5833 33.8333 33.2083 34.5 36.375C35.1667 39.4583 35.9167 43.0833 36.75 47.25C37.6667 51.4167 38.7083 56.25 39.875 61.75C41.125 56.4167 42.25 51.7083 43.25 47.625C44.25 43.5417 45.125 40 45.875 37C46.7083 33.9167 47.4167 31.3333 48 29.25C48.6667 27.0833 49.2083 25.2917 49.625 23.875C50.625 20.5417 51.4167 18.5833 52 18C52.5833 17.6667 53.5417 17.5417 54.875 17.625C56.2917 17.625 57.6667 17.8333 59 18.25C60.4167 18.5833 61.6667 19.0417 62.75 19.625C63.8333 20.125 64.4167 20.6667 64.5 21.25Z"
          fill="#ddd"
          opacity="0"
        />
        <path
          ref={pathRef2}
          d="M118.5 21.25C118.5 21.4167 118.208 22.4167 117.625 24.25C117.125 26 116.417 28.2917 115.5 31.125C114.583 33.875 113.5 37 112.25 40.5C111.083 44 109.833 47.625 108.5 51.375C107.167 55.0417 105.792 58.6667 104.375 62.25C103.042 65.8333 101.792 69.0417 100.625 71.875C100.458 77.625 100.25 83 100 88C99.75 93 99.5 97.375 99.25 101.125C99 104.875 98.75 107.875 98.5 110.125C98.25 112.292 98.0417 113.417 97.875 113.5C97.4583 113.833 96.7917 113.708 95.875 113.125C94.9583 112.625 94 111.917 93 111C92.0833 110.083 91.2083 109.083 90.375 108C89.625 106.917 89.125 106 88.875 105.25C88.7917 104.917 88.6667 103.875 88.5 102.125C88.3333 100.292 88.125 97.875 87.875 94.875C87.625 91.7917 87.3333 88.2083 87 84.125C86.75 80.0417 86.5 75.5417 86.25 70.625C84.6667 67.125 83 63 81.25 58.25C79.75 54.1667 78.0417 49.2083 76.125 43.375C74.2917 37.5417 72.4167 30.8333 70.5 23.25C70.5 22.5 70.9583 21.75 71.875 21C72.7917 20.1667 73.9167 19.4583 75.25 18.875C76.5833 18.2917 78 17.8333 79.5 17.5C81 17.1667 82.3333 17.125 83.5 17.375C83.8333 17.875 84.4583 19.7917 85.375 23.125C85.7083 24.5417 86.125 26.3333 86.625 28.5C87.2083 30.5833 87.8333 33.2083 88.5 36.375C89.1667 39.4583 89.9167 43.0833 90.75 47.25C91.6667 51.4167 92.7083 56.25 93.875 61.75C95.125 56.4167 96.25 51.7083 97.25 47.625C98.25 43.5417 99.125 40 99.875 37C100.708 33.9167 101.417 31.3333 102 29.25C102.667 27.0833 103.208 25.2917 103.625 23.875C104.625 20.5417 105.417 18.5833 106 18C106.583 17.6667 107.542 17.5417 108.875 17.625C110.292 17.625 111.667 17.8333 113 18.25C114.417 18.5833 115.667 19.0417 116.75 19.625C117.833 20.125 118.417 20.6667 118.5 21.25Z"
          fill="#ddd"
          opacity="0"
        />
      </svg>

     {fruitItems.map((item, idx) => (
  <motion.div
    key={idx}
    className="fruit absolute"
    style={{
      left: `${item.x}%`,
      top: `${item.y}%`,
      transform: `scale(${item.scale})`,
    }}
    initial={{ 
      x: `${item.x}%`, 
      y: `${item.y}%`, 
      opacity: 1 
    }}
    animate={{
      x: [
        `${item.x}%`, // Initial spawn position
        `${item.x + item.oscillation / 10}%`, // Minimal oscillation
        `${item.x + (Math.random() * 100 - 50)}%`, // Push away
      ],
      y: [
        `${item.y}%`, // Stay at initial y position
        `${item.y}%`, // Pause at the same position
        `${item.y + (Math.random() * 100 - 50)}%`, // Push away
      ],
      rotate: [0, 0, Math.random() * 720], // Random rotation after push
      scale: [item.scale, item.scale, item.scale * 1.5], // Slight scale up
      opacity: [1, 1, 0], // Fade out after push
    }}
    transition={{
      x: { duration: 4, times: [0, 0.8, 1], ease: 'easeInOut' },
      y: { duration: 4, times: [0, 0.8, 1], ease: 'easeInOut' },
      rotate: { duration: 4, delay: 4, ease: 'easeOut' },
      scale: { duration: 4, delay: 4, ease: 'easeOut' },
      opacity: { duration: 4, delay: 4, ease: 'easeOut' },
    }}
  >
    <img
      src={item.fruit}
      alt="falling fruit"
      className="w-16 h-16 object-contain"
    />
  </motion.div>
))}



    </div>
  );
};

export default FallingFruits;
