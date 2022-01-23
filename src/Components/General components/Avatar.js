import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import defaultAvatar from '../../Assets/images/pfp-min.jpg'

const Avatar = ({size, image}) => {
    return (
        <View style={{...styles.avatar, width:size, height:size}}>
            <Image source={image ? {uri: image} : defaultAvatar} style={styles.avatarImg}/>
        </View>);
};

export default Avatar;

const styles = StyleSheet.create({
    avatar:{
        borderRadius:5,
    },
    avatarImg:{
        width:"100%",
        height:"100%",
        borderRadius:5
    }
})