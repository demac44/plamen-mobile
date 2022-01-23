import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TopNavbar = () => {
  return (
  <View style={styles.navbar}>
      <Text>Top navbar</Text>
  </View>);
};

export default TopNavbar;

const styles = StyleSheet.create({
    navbar:{
        flex:0.08,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
})