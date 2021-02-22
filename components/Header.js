import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import Title from './Title';

const Header = ({title}) => (
  <View
    style={{
      ...styles.header,
      ...Platform.select({
        android: styles.headerAndroid,
        ios: styles.headerIos,
      }),
    }}>
    <Title>{title}</Title>
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerIos: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Header;
