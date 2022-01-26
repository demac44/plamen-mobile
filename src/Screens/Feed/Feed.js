import React, { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, ScrollView, View, FlatList } from 'react-native';
import { UserContext } from '../../../App';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import UploadImage from '../../Components/Posts/Create post/components/UploadImage';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import StoriesContainer from '../../Components/Stories/StoriesContainer';


const Feed = ({navigation}) => {
  const user = useContext(UserContext)
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
  const {data, loading, fetchMore} = useQuery(FEED_POSTS, {
    variables:{
      userID: 32,
      limit:10,
      offset:0
    },
    fetchPolicy:'network-only'
  })

  const loadMore = async () => {
    try{
      await fetchMore({
        variables:{
          limit:10,
          offset:data?.get_feed_posts?.length 
        }
      })
    }
    catch{}
  }

  return (
    <>
    {loading ? <MainLoader/> :
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
          <TopNavbar navigation={navigation}/>
          <PostsContainer posts={data?.get_feed_posts} loadMore={loadMore}/>
          <BottomNavbar navigation={navigation}/>
        </KeyboardAvoidingView>}
    </>
  );
};

export default Feed;


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

      // const SET_LAST_SEEN = gql`
// mutation ($userID: Int){
// set_last_seen (userID: $userID){
//   userID
// }
// }

// `