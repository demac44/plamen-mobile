import React from 'react';
import { ScrollView, View } from 'react-native';
import ChatsListChat from './ChatsListChat';

const ChatList = ({chats, navigation}) => {
    return (
        <View style={{flex:1, paddingTop:60}}>
            <ScrollView>
                {chats.map(chat => <ChatsListChat chat={chat} key={chat.userID} navigation={navigation}/>)}
            </ScrollView>
        </View>
    );
};

export default ChatList;
