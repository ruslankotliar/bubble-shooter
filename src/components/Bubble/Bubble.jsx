import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Bubble = ({
  windowSize,
  bubble,
  popBubble,
  id,
  failCount,
  setFailCount,
  failBubble,
}) => {
  const bubbleRef = useRef();
  const { size, position } = bubble;
  const [y, setY] = useState(0);

  const bubbleVariants = {
    top: { x: position.x, y: position.y },
    bottom: { x: position.x, y: windowSize.innerHeight - size },
  };

  useEffect(() => {
    if (size) {
      bubbleRef.current.style.width = `${size}px`;
      bubbleRef.current.style.height = `${size}px`;
    }
  }, []);

  useEffect(() => {
    if (y === windowSize.innerHeight - size) {
      setFailCount(failCount + 1);
      failBubble(id);
    }
  }, [y]);

  useEffect(() => {
    const interval = setInterval(() => {
      const y = bubbleRef.current.getBoundingClientRect().y;
      setY(y);
      //   console.log('window size: ', windowSize, 'y:', y, 'size', size);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      whileTap={{ scale: [1.1, 0], boxShadow: ['rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 'none'] }}
      onClick={(e) => {
        popBubble(id);
      }}
      ref={bubbleRef}
      variants={bubbleVariants}
      initial='top'
      animate='bottom'
      transition={{
        type: 'tween',
        duration: 8,
        scale: { type: 'spring', duration: 0.5 },
      }}
      className='bubble'
    ></motion.div>
  );
};

export default Bubble;
