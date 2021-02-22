import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = ({children, style}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
});

export default Card;
