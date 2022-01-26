import React, { useContext } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';
import { UserContext } from '../../../App';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';

const Explore = ({navigation}) => {
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const currentUser = useContext(UserContext)
    const {loading, data, refetch, fetchMore} = useQuery(RANDOM_POSTS, {
        variables:{
            uid: currentUser.userID,
            limit: 10,
            offset: 0
        }
    })


    // const scrollPagination = () => {
    //     window.onscroll = async ()=>{
    //         if(Math.round(window.scrollY+window.innerHeight) >= document.body.scrollHeight-window.innerHeight){
    //             try {
    //                 await fetchMore({
    //                     variables:{
    //                         offset:data?.random_posts?.length,
    //                     },
    //                     updateQuery: (prev, { fetchMoreResult }) => {
    //                         if (!fetchMoreResult) return prev;
    //                         return Object.assign({}, prev, {
    //                           random_posts: [...data.random_posts, ...fetchMoreResult?.random_posts]
    //                         });
    //                       }
    //                 })
    //             } catch{}
    //         }
    //     }
    // }

    return (
        <>
        {loading ? <MainLoader/> :
            <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
              <TopNavbar navigation={navigation}/>
              <ScrollView style={{flex:1}}>
                <PostsContainer posts={data?.random_posts}/>
              </ScrollView>
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