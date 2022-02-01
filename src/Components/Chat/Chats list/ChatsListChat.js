import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../../General components/Avatar';

const ChatsListChat = ({chat, navigation}) => {
    return (
        <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Chat', {chat: JSON.stringify(chat)})}>
            <Avatar image={chat.profile_picture} size={50}/>
            <View style={{marginLeft:10}}>
                <Text style={{fontSize:18}}>{chat.first_name+' '+chat.last_name}</Text>
                <Text style={{fontSize:14, marginTop:5}}>Last message</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatsListChat;

const styles = {
    box:{
        display:'flex', 
        flexDirection:'row', 
        padding:5, 
        alignItems:'center'
    },
}
