import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../../General components/Avatar';
import { useNavigation } from '@react-navigation/native';

const SearchUserBox = ({user}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={{width:"100%", flexDirection:'row', padding:5, alignItems:'center'}} onPress={()=>navigation.push('Profile', {username: user.username})}>
            <Avatar image={user.profile_picture} size={40}/>
            <View style={{marginLeft:10}}>
                <Text style={{color:"white", fontSize:16}}>{user.first_name+' '+user.last_name}</Text>
                <Text>@{user.username}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SearchUserBox;
