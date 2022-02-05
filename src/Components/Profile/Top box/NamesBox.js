import React from 'react';
import { Text, View } from 'react-native';

const NamesBox = ({name, username}) => {
    return (
        <View style={{display:'flex', alignItems:'center', marginTop:10}}>
            <Text style={{fontSize:28, color:"white"}}>{name}</Text>
            <Text style={{fontSize:16}}>@{username}</Text>
        </View>
    );
};

export default NamesBox;
