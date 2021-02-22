import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  text: {
    color: Colors.accent,
    fontSize: 22,
  },
});

export default NumberContainer;
