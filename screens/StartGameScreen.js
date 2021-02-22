import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Title from '../components/Title';

import Colors from '../constants/colors';

const StartGameScreen = ({onGameStart}) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4,
  );

  //input handler
  const onChangeHandler = (value) => {
    setEnteredValue(value.replace(/[^0-9]/g, ''));
  };

  //input reset handler
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  //input confirm handler
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setSelectedNumber(chosenNumber);
    setConfirmed(true);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  //show chosen number
  let outputSelectedNumber;
  if (confirmed) {
    outputSelectedNumber = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => onGameStart(selectedNumber)}>
          START GAME <AntDesign name="playcircleo" size={20} />
        </MainButton>
      </Card>
    );
  }

  //button width change for rotate
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new game!</Text>
            <Card style={styles.inputContainer}>
              <Title>Select a number</Title>
              <Input
                autoFocus
                blurOnSubmit
                style={styles.input}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={2}
                value={enteredValue}
                onChangeText={onChangeHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>

            {outputSelectedNumber}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: 'Hack-Regular',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default StartGameScreen;
