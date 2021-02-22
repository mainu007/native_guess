import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import MainButton from '../components/MainButton';
import Title from '../components/Title';
import Colors from '../constants/colors';

const GameOverScreen = ({roundNumber, userNumber, onRestart}) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Title style={styles.title}>This Game is Over!</Title>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require('../assets/success.png')}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            Your phone needed{' '}
            <Title style={styles.highlight}>{roundNumber}</Title> rounds to
            guess the number{' '}
            <Title style={styles.highlight}>{userNumber}</Title>
          </Text>
        </View>
        <MainButton style={styles.newGameButton} onPress={onRestart}>
          NEW GAME
        </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 5,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    marginVertical: Dimensions.get('window').width > 600 ? 20 : 10,
    borderRadius: (Dimensions.get('window').width * 0.6) / 2,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginTop: Dimensions.get('window').width > 600 ? 20 : 15,
    marginBottom: 20,
  },
  result: {
    fontSize: Dimensions.get('window').height > 400 ? 20 : 16,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  highlight: {
    color: Colors.primary,
  },
  newGameButton: {
    marginBottom: 10,
  },
});

export default GameOverScreen;
