import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Avatar from '../../../General components/Avatar';
import SetTime from '../../../General components/SetTime';
import SavePost from './components/SavePost';
import menuIcon from '../../../../Assets/images/icons/menu-icon.png'


const PostTopBar = (props) => {
    const navigation = useNavigation()

    return (
        <View style={styles.topbar}>
            <TouchableOpacity onPress={()=>navigation.replace('Profile', {username: props.username})}>
                <View style={styles.userBox}>
                    <Avatar image={props.pfp} size={35}/>
                    <View style={{marginLeft:5, padding:3}}>
                        <Text style={{fontSize:15, color:"white"}}>{props.fname+' '+props.lname}</Text>
                        <Text style={{fontSize:10, marginTop:2}}><SetTime timestamp={props.timestamp} fontSize={12} color="white"/></Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <SavePost
                    currentUserID={props.currentUser.userID}
                    postID={props.postID}
                />

                <TouchableOpacity onPress={()=>props.postMenuCB(true, {postID: props.postID, username: props.username})} style={{marginLeft:15}}>
                    <Image source={menuIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostTopBar;

const styles = StyleSheet.create({
    topbar:{
        width:"100%",
        display:'flex',
        padding:5,
        paddingLeft:10,
        paddingRight:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    userBox:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    }
})