import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const StoriesContainer = () => {
  return (
      <View style={{flex:0.1, width:"100%", height:100}}>
        <ScrollView horizontal={true} style={styles.innerContainer}>
            <Text>Stories</Text>
        </ScrollView>
      </View>
  );
};

export default StoriesContainer;

const styles = StyleSheet.create({
    innerContainer:{
        backgroundColor:"#1b1b1b",
        width:"100%",
        display:"flex",
        flexDirection:"row"
    }
})