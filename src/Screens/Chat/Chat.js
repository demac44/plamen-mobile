import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { UserContext } from '../../../App';
import ChatTopBar from '../../Components/Chat/ChatTopBar';
import MessagesBox from '../../Components/Chat/Messages/MessagesBox';
import SendMessage from '../../Components/Chat/Messages/SendMessage';

const Chat = () => {
    const currentUser = useContext(UserContext)
    const navigation = useNavigation()
    const state = navigation.getState()
    const chat = JSON.parse(state.routes[2].params.chat)

    return (
        <>
            <KeyboardAvoidingView behavior='height' enabled={false} style={{flex:1,backgroundColor:"#1b1b1b"}}>
                <ChatTopBar chat={chat} navigation={navigation}/>
                <MessagesBox receiver={chat.username} sender={currentUser.username}/>
            </KeyboardAvoidingView>
            <SendMessage chat={chat} currentUser={currentUser}/>
        </>
    );
};

export default Chat;
