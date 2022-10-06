import React, { useEffect, useRef, useState } from 'react';
import Bubble from '../Bubble/Bubble';
import { v4 as uuid } from 'uuid';
import { motion, useAnimation } from 'framer-motion';

const GameField = ({
  windowSize,
  score,
  setScore,
  failCount,
  setFailCount,
}) => {
  const [bubbles, setBubbles] = useState([]);
  const [time, setTime] = useState({ max: 3000, min: 100 });
  const { max, min } = time;
  const randomTime = Math.random() * (max - min) + min;
  const [shake, setShake] = useState(false);
  const controls = useAnimation();
  const gameFieldRef = useRef(null);
  const failsRef = useRef(null);

  const failBubble = (id) => {
    setBubbles(bubbles.filter((bubble) => bubble.id !== id));
  };

  const popBubble = (id) => {
    setBubbles(bubbles.filter((bubble) => bubble.id !== id));
    setScore(score + 1);
  };

  const createBubble = () => {
    const maxSize = windowSize.innerWidth / 7;
    const minSize = maxSize / 4;
    const size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
    const x = Math.floor(
      Math.random() * (windowSize.innerWidth - (size / 2 + 10))
    );
    const y = -size;
    const id = uuid();
    setBubbles([...bubbles, { size: size, id: id, position: { x: x, y: y } }]);
  };

  useEffect(() => {
    score === 10 && setTime({ max: max - 500, min: min - 10 });
    score === 20 && setTime({ max: max - 500, min: min - 20 });
    score === 40 && setTime({ max: max - 1000, min: min - 40 });
    score === 80 && setTime({ max: max - 100, min: min - 10 });
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('aa');
      createBubble();
    }, randomTime);
    return () => clearInterval(interval);
  }, [bubbles]);

  const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

  const randomDuration = () => Math.random() * 0.07 + 0.23;

  const variants = {
    start: {
      rotate: [-1, 1.1, 1, -1.2, 1, 1.3, 0],
      transition: {
        // delay: getRandomDelay(),
        repeat: Infinity,
        duration: randomDuration(),
      },
    },
    reset: {
      rotate: 0,
    },
  };

  const failVariants = {
    scale: {
      scale: 1.5,
      color: 'red',
      transition: {
        duration: 0.5,
      },
    },
    resetScale: {
      scale: 1,
    },
  };

  useEffect(() => {
    if (failCount === 0) {
      return;
    } else {
      setShake(shake === true ? false : true);
      controls.start('start');
      controls.start('scale');
      gameFieldRef.current.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
      setTimeout(() => {
        controls.stop();
        controls.set('reset');
        controls.set('resetScale');
        gameFieldRef.current.style.backgroundColor = '#bde0fe';
      }, 500);
    }
  }, [failCount]);

  return (
    <motion.div
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#bde0fe',
      }}
      variants={variants}
      animate={controls}
      ref={gameFieldRef}
    >
      <div style={{ margin: '3rem 0 0 3rem', position: 'relative' }}>
        <motion.h1 style={{ margin: 0 }}>Fails: </motion.h1>
        <motion.h1
          style={{
            fontSize: '4rem',
            display: 'inline',
            transformOrigin: 'center',
            position: 'absolute',
            margin: 0,
            left: '7rem',
            top: '-1.5rem',
          }}
          initial={{ scale: 1 }}
          variants={failVariants}
          animate={controls}
          ref={failsRef}
        >
          {failCount}
        </motion.h1>
      </div>
      <div className='field-data'>
        <motion.span
          animate={{
            color: [
              '#ff0000',
              '#ff7300',
              '#fffb00',
              '#48ff00',
              '#00ffd5',
              '#002bff',
              '#7a00ff',
              '#ff00c8',
              '#ff0000',
            ],
          }}
          transition={{
            color: { repeat: Infinity, duration: 2, ease: 'linear' },
          }}
        >
          BubblePop
        </motion.span>
        <h1 className='score'>{score}</h1>
      </div>

      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          id={bubble.id}
          data-id={bubble.id}
          failBubble={failBubble}
          popBubble={popBubble}
          bubble={bubble}
          windowSize={windowSize}
          failCount={failCount}
          setFailCount={setFailCount}
        />
      ))}
    </motion.div>
  );
};

export default GameField;
