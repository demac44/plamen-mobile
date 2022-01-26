import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';
import PostsContainer from '../../Components/Posts/PostsContainer';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

const Saved = ({navigation}) => {
    const currentUser = useContext(UserContext)
    // const [set_last_seen] = useMutation(SET_LAST_SEEN)
    const {loading, data, fetchMore, refetch} = useQuery(GET_SAVED, { 
        variables: {
            userID: currentUser.userID,
            offset:0,
            limit:10
        },
    })

    const loadMore = async () => {
        try{
          await fetchMore({
            variables:{
              limit:10,
              offset:data?.get_saved_posts?.length 
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
                <SafeAreaView style={{flex:1}}>
                    <Text style={styles.title}>Saved posts</Text>
                    <PostsContainer posts={data?.get_saved_posts} loadMore={loadMore}/>
                </SafeAreaView>
                <BottomNavbar navigation={navigation}/>
            </KeyboardAvoidingView>}
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

const styles = StyleSheet.create({
    title:{
        width:"100%", 
        textAlign:'center',
        padding:10,
        borderWidth:1,
        borderColor:"#2f2f2f",
        borderRadius:5,
        marginTop:5,
        backgroundColor:"#1b1b1b",
    }
})