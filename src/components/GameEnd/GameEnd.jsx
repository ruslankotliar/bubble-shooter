import React from 'react';
import { motion } from 'framer-motion';

const GameEnd = ({ score, handleNewGame, bestScore }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0 }}>
        Your score <span style={{ fontSize: '5rem' }}>{score}</span>
      </h1>
      <motion.button
        whileTap={{ scale: 1.2 }}
        whileHover={{ scale: 0.9 }}
        onClick={() => handleNewGame()}
        className='button-85'
        style={{margin: '3rem 0 1.5rem 0'}}
      >
        Play again!
      </motion.button>
      <h3>P.S. Your best score ever is: {bestScore}</h3>
    </div>
  );
};

export default GameEnd;
