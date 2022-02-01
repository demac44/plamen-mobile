import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import backIcon from '../../Assets/images/icons/back-icon.png'
import SetTime from '../General components/SetTime';
import Avatar from '../General components/Avatar'

const ChatTopBar = ({chat, navigation}) => {
    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={()=>navigation.navigate('Chats')}>
                <Image source={backIcon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBox} onPress={()=>navigation.navigate('Profile', {username: chat.username})}>
                <Avatar size={40} image={chat.profile_picture}/>
                <View style={{marginLeft:10}}>
                    <Text style={{fontSize:18}}>{chat.first_name+' '+chat.last_name}</Text>
                    <Text style={{fontSize:12}}>Last seen {<SetTime timestamp={chat.last_seen}/>} ago</Text>
                </View>
            </TouchableOpacity>

            {/* <Text style={>I</Text> */}
        </View>
    );
};

export default ChatTopBar;

const styles = {
    bar:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center', 
        paddingVertical:5,
        paddingHorizontal:10,
        flex:0.08
    },
    userBox:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center',
        marginLeft:20
    }
}