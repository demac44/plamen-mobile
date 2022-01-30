import React, { createContext, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView} from 'react-native';
import { UserContext } from '../../../App';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import FeedPostsContainer from '../../Components/Posts/FeedPostsContainer';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = ({navigation}) => {
  const user = useContext(UserContext)
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
  const [loader, setLoader] = useState(false)
  const {data, loading, fetchMore, refetch, error} = useQuery(FEED_POSTS, {
    variables:{
      userID: 32,
      limit:10,
      offset:0
    },
    fetchPolicy:'network-only'
  })

  useEffect(()=>{
      data?.get_stories_alt && AsyncStorage.setItem('ALL_STORIES', JSON.stringify(data?.get_stories_alt[0]?.allStories)).catch(err => console.log(err))
  }, [data])

  const loadMore = async () => {
      setLoader(true)
      await fetchMore({
        variables:{
          limit:10,
          offset:data?.get_feed_posts?.length 
        }
    }).then(()=>setLoader(false))
  }

  if(error) console.log(error);

  return (
    <>
    {loading ? <MainLoader/> :
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
          <TopNavbar navigation={navigation}/>
          {!loading && <FeedPostsContainer 
            posts={data?.get_feed_posts} 
            stories={JSON.stringify(data?.get_stories_alt[0]?.storyHeads)}
            loadMore={loadMore} 
            refetchPosts={refetch} 
            loader={loader}
          />}
          <BottomNavbar navigation={navigation}/>
        </KeyboardAvoidingView>}
    </>
  );
}

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
        width
        height
      }
      get_stories_alt(userID: $userID){
        storyHeads{
          storyID
          username
          profile_picture
          userID
        }
        allStories{
          storyID
          username
          profile_picture
          userID
        }
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

// get_stories (userID: $userID){
//   first_name
//   last_name
//   storyID
//   type
//   profile_picture
//   username
//   userID
//   stories {
//       date_posted
//       storyID
//       url
//       type
//   }
// }