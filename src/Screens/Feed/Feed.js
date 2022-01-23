import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../../../App';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';

const Feed = ({navigation}) => {
  const user = useContext(UserContext)


  return (
    <>
      <View style={styles.container}>
        <TopNavbar/>
        <PostsContainer/>
        <BottomNavbar/>
      </View>
    </>
    );
};

export default Feed;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"1b1b1b"
  }
})