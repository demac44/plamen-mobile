import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../App';
import ProfilePostsContainer from '../../Components/Posts/ProfilePostsContainer';

const Profile = ({navigation, route}) => {
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {username} = route.params
    const currentUser = useContext(UserContext)
    const [loader, setLoader] = useState(false)
    const [myprofile, setMyProfile] = useState(false)

    const {loading, data, refetch, fetchMore} = useQuery(FETCH_INFO, {
        variables: {
            username,
            limit:10,
            offset:0,
            userID: currentUser.userID
        }
    })

    const loadMore = async () => {
        setLoader(true)
        await fetchMore({
          variables:{
            limit:10,
            offset:data?.get_profile_posts?.length 
          }
      }).then(()=>setLoader(false))
    }

    useLayoutEffect(()=>{
        if(username===currentUser.username) setMyProfile(true)
    }, [username, currentUser, loading])
    
    // const profileVisit = () => {
    //     if(!loading && !isLoading && !myprofile && data?.get_user?.userID){
    //         profile_visit({
    //             variables:{
    //                 visitorId: uid, 
    //                 visitedId: data?.get_user?.userID}
    //             })
    //             return
    //     }
    //     return
    // }

    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
            <TopNavbar navigation={navigation}/>
            {!loading && <ProfilePostsContainer 
                            refetchPosts={refetch} 
                            loadMore={loadMore} 
                            posts={data?.get_profile_posts} 
                            currentUser={currentUser}
                            user={data?.get_user}
                            myprofile={myprofile}
                        />}
            <BottomNavbar navigation={navigation}/> 
        </KeyboardAvoidingView>
    );
};

export default Profile;

const FETCH_INFO= gql`
    query ($limit: Int, $offset: Int, $username: String!, $userID: Int!){
        confirmed_email_check(userID: $userID)
        get_profile_posts (limit: $limit, offset: $offset, username: $username){
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
        get_user(username: $username, userID: $userID){
            first_name
            last_name
            profile_picture
            username
            userID
            last_seen
            show_status
        }
    }
`
const PROFILE_VISIT = gql`
    mutation($visitorId: Int, $visitedId: Int){
        profile_visit(visitorId: $visitorId, visitedId: $visitedId){
            visitedId
        }
        set_last_seen (userID: $visitorId){
          userID
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

