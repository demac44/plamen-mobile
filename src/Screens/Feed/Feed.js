import React, { useContext } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../../../App';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';

const Feed = ({navigation}) => {
  const user = useContext(UserContext)


  return (
    <>
      <KeyboardAvoidingView enabled={false} behavior='height' style={styles.container}>
        <TopNavbar navigation={navigation}/>
        <PostsContainer/>
        <BottomNavbar navigation={navigation}/>
      </KeyboardAvoidingView>
    </>
    );
};

export default Feed;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1f1f1f"
  }
})