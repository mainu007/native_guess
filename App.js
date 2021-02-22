import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);

  //game start handler
  const startGameHandler = (selectNumber) => {
    setUserNumber(selectNumber);
  };

  //game over handler
  const gameOverHandler = (numOfRound) => {
    setGuessRound(numOfRound);
  };

  //game restart handler
  const configureGameRestart = () => {
    setUserNumber(null);
    setGuessRound(0);
  };

  let content = <StartGameScreen onGameStart={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundNumber={guessRound}
        onRestart={configureGameRestart}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
