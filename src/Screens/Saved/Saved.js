import React, { useCallback, useContext, useState } from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import SavedPostsContainer from '../../Components/Posts/SavedPostsContainer'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../App';
import PostMenu from '../../Components/General components/Menus/PostMenu';

const Saved = ({navigation}) => {
    const currentUser = useContext(UserContext)
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const [postMenu, setPostMenu] = useState(false)
    const [postMenuPayload, setPostMenuPayload] = useState({postID: null, username: null})
    const [loader, setLoader] = useState(false)
    const {loading, data, fetchMore, refetch} = useQuery(GET_SAVED, { 
        variables: {
            userID: currentUser.userID,
            offset:0,
            limit:10
        },
    })

    const loadMore = async () => {
        setLoader(true)
          await fetchMore({
            variables:{
              limit:10,
              offset:data?.get_saved_posts?.length 
            }
          }).then(()=>setLoader(false))
    
        }
     const postMenuCB = useCallback((value, payload) => {
        setPostMenu(value)
        setPostMenuPayload(payload)
    }, [setPostMenu])

    return (
        <>
            {loading ? <MainLoader/> :
                <>
                <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
                    <TopNavbar navigation={navigation}/>
                    <SavedPostsContainer 
                        posts={data?.get_saved_posts} 
                        refetchPosts={refetch} 
                        loadMore={loadMore} 
                        loader={loader} 
                        postMenuCB={postMenuCB} 
                        currentUser={currentUser}
                    />
                    <BottomNavbar navigation={navigation}/>
                </KeyboardAvoidingView>
                {postMenu && <PostMenu
                                postMenuCB={postMenuCB} 
                                currentUser={currentUser} 
                                payload={postMenuPayload}
                                refetch={refetch}
                                navigation={navigation}
                                />}
                </>}
        </>
    );
};

export default Saved;

const GET_SAVED = gql`
    query ($userID: Int!, $offset: Int, $limit: Int){
        get_saved_posts(userID:$userID, offset:$offset, limit:$limit){
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

