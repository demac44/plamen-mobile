import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import defaultAvatar from '../../Assets/images/pfp-min.jpg'

const Avatar = ({size, image}) => {
    return (
        <View style={{borderRadius:5}}>
            <Image source={image ? {uri: image} : defaultAvatar} style={{width:size, height:size, borderRadius:5}}/>
        </View>);
};

export default Avatar;
