import React, { useContext, useState } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import { UserContext } from '../../../App';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import ExplorePostsContainer from '../../Components/Posts/ExplorePostsContainer';

const Explore = ({navigation}) => {
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const currentUser = useContext(UserContext)
    const [loader, setLoader] = useState(false)
    const {loading, data, refetch, fetchMore} = useQuery(RANDOM_POSTS, {
        variables:{
            uid: currentUser.userID,
            limit: 10,
            offset: 0
        }
    })

    const loadMore = async () => {
        setLoader(true)
          await fetchMore({
            variables:{
              limit:10,
              offset:data?.random_posts?.length 
            }
          }).then(()=>setLoader(false))
      }


    return (
        <>
        {loading ? <MainLoader/> :
            <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
                <TopNavbar navigation={navigation}/>
                <ExplorePostsContainer posts={data?.random_posts} refetchPosts={refetch} loadMore={loadMore} loader={loader}/>
                <BottomNavbar navigation={navigation}/>
            </KeyboardAvoidingView>}
        </>
    );
};

export default Explore;


const RANDOM_POSTS = gql`
    query($uid: Int!, $limit: Int, $offset: Int){
        random_posts(userID: $uid, limit: $limit, offset: $offset){
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

// const SET_LAST_SEEN = gql`
// mutation ($userID: Int){
// set_last_seen (userID: $userID){
//   userID
// }
// }

// `