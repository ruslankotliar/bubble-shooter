import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ handleNewGame }) => {
  return (
    <div className='hero-container'>
      <motion.div
        initial={{
          scale: 0,
          borderRadius: 50,
          opacity: 0.01,
        }}
        animate={{
          scale: [1, 1.01, 1.03, 1, 0.98, 1, 1.001, 1, 0.99],
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          duration: 4,
          stiffness: 100,
          scale: { repeat: Infinity, duration: 2 },
        }}
        className='hero'
      >
        <h1 className='hero-title'>
          Welcome to{' '}
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
        </h1>
        <h5 className='hero-rules'>Rules:</h5>
        <ul className='hero-list'>
          <motion.li
            whileHover={{ scale: 1.1, x: 32.5 }}
            className='hero-list-item'
          >
            Click to pop.
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, x: 32.5 }}
            className='hero-list-item'
          >
            Do not let them reach the bottom(3 fails max).
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1, x: 32.5 }}
            className='hero-list-item'
          >
            Enjoy the game.
          </motion.li>
        </ul>
        <div className='btn-container'>
          <motion.button
            whileTap={{ scale: 1.2 }}
            whileHover={{ scale: 0.9 }}
            onClick={() => handleNewGame()}
            className='button-85'
          >
            Play!
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
