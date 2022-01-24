import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import Avatar from '../../../General components/Avatar';
import SetTime from '../../../General components/SetTime';
import SavePost from './components/SavePost';


const PostTopBar = (props) => {
    return (
        <View style={styles.topbar}>
            <TouchableWithoutFeedback onPress={()=>props.navigation.push('Profile')}>
                <View style={styles.userBox}>
                    <Avatar image={props.pfp} size={35}/>
                    <View style={{marginLeft:5, padding:3}}>
                        <Text style={{fontSize:15}}>{props.fname+' '+props.lname}</Text>
                        <Text style={{fontSize:10, marginTop:2}}><SetTime timestamp={props.timestamp} fontSize={12}/></Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <SavePost
                currentUserID={props.currentUser.userID}
                postID={props.postID}
            />
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
        paddingRight:15,
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