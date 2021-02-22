import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Title = ({children, style}) => (
  <Text style={{...styles.title, ...style}}>{children}</Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'iosevka-blod',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Title;
