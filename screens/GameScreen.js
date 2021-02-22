import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Title from '../components/Title';

const randomGenerateBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (randomNumber === exclude) {
    return randomGenerateBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = ({userChoice, onGameOver}) => {
  const initialGuess = randomGenerateBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  //device width update
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  //game win check
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie", 'You know this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    setCurrentGuess(
      randomGenerateBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess,
      ),
    );
    setPastGuesses((curPastGuess) => [currentGuess, ...curPastGuess]);
  };

  let listContainerStyle = styles.listContainer;
  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  //render guess list
  const renderListItem = (listLength, data) => (
    <View style={styles.listItem}>
      <Title>#{listLength - data.index}</Title>
      <Title>{data.item}</Title>
    </View>
  );

  //change layout for orientation
  let numberContainer = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <AntDesign name="minus" size={20} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <AntDesign name="plus" size={20} />
        </MainButton>
      </Card>
    </>
  );
  if (availableDeviceHeight < 500) {
    numberContainer = (
      <View style={styles.control}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <AntDesign name="minus" size={20} />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <AntDesign name="plus" size={20} />
        </MainButton>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.screen,
        paddingTop: availableDeviceHeight < 500 ? 5 : 10,
      }}>
      <Text style={{fontSize: availableDeviceHeight < 500 ? 18 : 22}}>
        Opponent's guess
      </Text>
      {numberContainer}

      <View style={listContainerStyle}>
        <FlatList
          data={pastGuesses}
          keyExtractor={(item) => item.toString()}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  control: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: 300,
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
  },
  listContainer: {
    width: '60%',
    flex: 1,
  },
  listContainerBig: {
    width: '80%',
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 2,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default GameScreen;
