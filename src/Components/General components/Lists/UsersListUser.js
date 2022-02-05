import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../Avatar';
import FollowButton from '../Buttons/FollowButton';

const UsersListUser = ({data}) => {
    return (
        <View style={styles.box}>
            <TouchableOpacity style={styles.pfpAndNames}>
                <Avatar image={data?.profile_picture} size={45}/>
                <View style={{marginLeft:10}}>
                    <Text>{data?.first_name+' '+data?.last_name}</Text>
                    <Text>{data?.username}</Text>
                </View>
            </TouchableOpacity>
            <FollowButton userID={data?.userID}/>
        </View>
    );
};

export default UsersListUser;

const styles = {
    box:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        padding:5
    },
    pfpAndNames:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center'
    }
}