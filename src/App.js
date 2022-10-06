import { useEffect, useState } from 'react';
import GameField from './components/GameField/GameField';
import Hero from './components/Hero/Hero';
import GameEnd from './components/GameEnd/GameEnd';

export default function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [playing, setPlaying] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('best score'))
  );

  // starting new game
  const handleNewGame = () => {
    setPlaying(true);
    setGameEnd(false);
    setScore(0);
    setFailCount(0);
  };

  useEffect(() => {
    console.log('game playing status', playing);
    console.log('game end status', gameEnd);
  }, [playing, gameEnd]);

  // end the game when fails limit exceeded
  useEffect(() => {
    if (failCount > 2) {
      setAllScores([...allScores, score]);
      setGameEnd(true);
      setPlaying(false);
    }
  }, [failCount]);

  // set the best score
  useEffect(() => {
    allScores.length > 0 && setBestScore(Math.max(...allScores));
  }, [allScores]);

  // store the best score in LocalStorage
  useEffect(() => {
    localStorage.setItem('best score', JSON.stringify(bestScore));
  }, [bestScore]);

  // push best score in allScores array on initial load
  useEffect(() => {
    setAllScores([...allScores, bestScore]);
  }, []);

  // getting user screen size
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div>
      {!playing && !gameEnd && <Hero handleNewGame={handleNewGame} />}
      {playing && !gameEnd && (
        <GameField
          windowSize={windowSize}
          setScore={setScore}
          score={score}
          failCount={failCount}
          setFailCount={setFailCount}
        />
      )}
      {gameEnd && !playing && (
        <GameEnd
          score={score}
          handleNewGame={handleNewGame}
          bestScore={bestScore}
        />
      )}
    </div>
  );
}
