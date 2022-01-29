import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const StoryBottomBar = () => {
    return (
        <View style={styles.bar}>
            <TextInput style={styles.input} placeholder='Reply' placeholderTextColor="#4f4f4f"/>
            <TouchableOpacity style={styles.postBtn}>
                <Text style={{fontSize:15}}>SEND</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StoryBottomBar;

const styles = {
    bar:{
        width:"100%",
        flex:0.1, 
        display:'flex', 
        flexDirection:"row",
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5,
        justifyContent:"space-between",
        position:'absolute',
        bottom:10
    },
    input:{
        width:"80%",
        borderColor:"#3f3f3f",
        borderWidth:1,
        borderRadius:5,
        fontSize:16,
        paddingLeft:10,
        height:45
    },
    postBtn:{
        backgroundColor:"#104b41",
        padding:5,
        width:"18%",
        borderRadius:5,
        height:35,
        display:'flex', 
        alignItems:'center',
        justifyContent:"center"
    },
}