import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Colors from '../constants/colors';

const MainButton = ({children, onPress, style}) => {
  return (
    <View style={styles.mainButton}>
      <TouchableNativeFeedback activeOpacity={0.6} onPress={onPress}>
        <View style={{...style, ...styles.button}}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainButton;
