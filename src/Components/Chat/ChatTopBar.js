import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SetTime from '../General components/SetTime';
import Avatar from '../General components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ChatTopBar = ({chat, navigation}) => {
    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={()=>navigation.navigate('Chats')}>
                <FontAwesomeIcon icon='arrow-left' size={22} color='white'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBox} onPress={()=>navigation.navigate('Profile', {username: chat.username})}>
                <Avatar size={40} image={chat.profile_picture}/>
                <View style={{marginLeft:10}}>
                    <Text style={{fontSize:18, color:"white"}}>{chat.first_name+' '+chat.last_name}</Text>
                    <Text style={{fontSize:12, color:"white"}}>Last seen {<SetTime timestamp={chat.last_seen}/>} ago</Text>
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
        flex:0.08,
        backgroundColor:"#1f1f1f"
    },
    userBox:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center',
        marginLeft:15
    }
}