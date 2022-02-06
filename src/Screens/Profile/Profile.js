import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../App';
import ProfilePostsContainer from '../../Components/Posts/ProfilePostsContainer';
import { View, KeyboardAvoidingView } from 'react-native';
import PostMenu from '../../Components/General components/Menus/PostMenu';

const Profile = ({navigation, route}) => {
    const currentUser = useContext(UserContext)
    const {username} = route.params
    const [loader, setLoader] = useState(false)
    const [myprofile, setMyProfile] = useState(false)

    const [postMenu, setPostMenu] = useState(false)
    const [postMenuPayload, setPostMenuPayload] = useState({postID: null, username: null})

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
    
    const postMenuCB = useCallback((value, payload) => {
        setPostMenu(value)
        setPostMenuPayload(payload)
    }, [setPostMenu])

    return (
        <>
            <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
                <TopNavbar navigation={navigation}/>
                {loading ? <View style={{flex:1}}></View> : <ProfilePostsContainer 
                    refetchPosts={refetch} 
                    loadMore={loadMore} 
                    posts={data?.get_profile_posts} 
                    currentUser={currentUser}
                    user={data?.get_user}
                    myprofile={myprofile}
                    postMenuCB={postMenuCB}
                    loader={loader}
                    />}
                <BottomNavbar navigation={navigation}/> 
            </KeyboardAvoidingView>
            {postMenu && <PostMenu
                             postMenuCB={postMenuCB} 
                             currentUser={currentUser} 
                             payload={postMenuPayload}
                             refetch={refetch}
                             navigation={navigation}
                            />}
        </>
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

    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
