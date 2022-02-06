import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SendMessageButton = ({user}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Chat', {chat: JSON.stringify(user)})}>
            <Text style={{color:"white", fontSize:15}}>Send message</Text>
        </TouchableOpacity>
    );
};

export default SendMessageButton;


const styles = {
    btn:{
        width:"38%", 
        paddingVertical:10, 
        backgroundColor:"#145985", 
        alignItems:'center', 
        borderRadius:5
    }
}