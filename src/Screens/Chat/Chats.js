import React, { useContext } from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native'
import ChatList from '../../Components/Chat/Chats list/ChatList';
import MainLoader from '../../Components/General components/Loaders/MainLoader';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import TopNavbar from '../../Components/Navbars/Top navbar/TopNavbar';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../App';

const Chats = ({navigation}) => {
    const currentUser = useContext(UserContext)
    const {data, loading} = useQuery(GET_CHATS_LIST, {
        variables:{
            userID: currentUser.userID,
            username: currentUser.username
        }
    }) 

    return (
        <>
        {loading ? <MainLoader/> :
            <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
                <TopNavbar navigation={navigation}/>
                <ChatList chats={data?.get_chats} navigation={navigation}/> 
                <BottomNavbar navigation={navigation}/>
            </KeyboardAvoidingView>}
        </>
    );
};

export default Chats;

const GET_CHATS_LIST = gql`
    query ($userID: Int!, $username: String!){
        get_chats(username: $username){
            first_name
            last_name
            username
            profile_picture
            userID
            last_seen
        }
        get_group_chats (userID: $userID){
            groupChatId
            userID
            name
            group_image
        }
}`