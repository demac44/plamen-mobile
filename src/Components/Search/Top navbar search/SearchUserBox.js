import React from 'react';
import { Text, View } from 'react-native';
import Avatar from '../../General components/Avatar';

const SearchUserBox = ({user}) => {
    return (
        <View style={{width:"100%", flexDirection:'row', padding:5, alignItems:'center'}}>
            <Avatar image={user.profile_picture} size={40}/>
            <View style={{marginLeft:10}}>
                <Text style={{color:"white", fontSize:16}}>{user.first_name+' '+user.last_name}</Text>
                <Text>@{user.username}</Text>
            </View>
        </View>
    );
};

export default SearchUserBox;
