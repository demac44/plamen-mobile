import React, { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { UserContext } from '../../../App';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';


const Feed = ({navigation}) => {
  const user = useContext(UserContext)
  const {data, loading} = useQuery(FEED_POSTS, {
    variables:{
      userID: 32,
      limit:20,
      offset:0
    }
  })

  return (
    <>
    {loading ? <Text>Loading...</Text> :
      <KeyboardAvoidingView enabled={false} behavior='height' style={styles.container}>
          <TopNavbar navigation={navigation}/>
          <PostsContainer posts={data?.get_feed_posts}/>
          <BottomNavbar navigation={navigation}/>
      </KeyboardAvoidingView>}
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

const FEED_POSTS = gql`
    query ($userID: Int!, $limit: Int, $offset: Int){
      get_feed_posts (userID: $userID, limit: $limit, offset: $offset){
        postID
        post_text
        date_posted
        url
        userID
        first_name
        last_name
        username
        profile_picture
        type
      }
    }
    `
    // confirmed_email_check(userID: $userID)
      // get_stories (userID: $userID){
      //     first_name
      //     last_name
      //     storyID
      //     type
      //     profile_picture
      //     username
      //     userID
      //     stories {
      //         date_posted
      //         storyID
      //         url
      //         type
      //     }
      // }
      // get_seen_stories(userID: $userID){
      //     storyID
      // }