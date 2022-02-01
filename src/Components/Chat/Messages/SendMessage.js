import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const SendMessage = () => {
    return (
        <View style={{flex:0.08, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:5}}>
            <TouchableOpacity style={{width:"10%"}}>
                <Text>FILE</Text>
            </TouchableOpacity>

            <TextInput
                style={{width:"70%", borderWidth:1, borderColor:"#2f2f2f", borderRadius:10, fontSize:15, paddingLeft:10}}
                placeholder='Send message...'
                placeholderTextColor="#5f5f5f"
            />

            <TouchableOpacity style={styles.postBtn}>
                <Text>SEND</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SendMessage;

const styles = {
    postBtn:{
        backgroundColor:"#104b41",
        padding:5,
        width:"15%",
        borderRadius:5,
        height:35,
        display:'flex', 
        alignItems:'center',
        justifyContent:"center"
    },
}
