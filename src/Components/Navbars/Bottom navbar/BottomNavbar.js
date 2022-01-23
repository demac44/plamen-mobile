import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BottomNavbar = () => {
  return (
  <View style={styles.navbar}>
      <Text>Bottom navbar</Text>
  </View>);
};

export default BottomNavbar;

const styles = StyleSheet.create({
    navbar:{
        flex:0.08,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
})