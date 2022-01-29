import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Avatar from '../../General components/Avatar';

const StoryHead = ({storyID, image, username}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.storyHead} onPress={()=>navigation.navigate('Story', {storyID: storyID})}>
            <View style={styles.storyAvatar}>
                <Avatar image={image} size={60}/>
            </View>
            <Text>{username}</Text>
        </TouchableOpacity>
    );
};

export default StoryHead;

const styles = StyleSheet.create({
    storyAvatar:{
        borderWidth:3,
        borderColor:"#ffbb00",
        height:67,
        borderRadius:10
    },
    storyHead:{
        display:"flex", 
        justifyContent:"center", 
        alignItems:'center',
        marginLeft:10,
    }
})