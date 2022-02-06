import React from 'react';
import { Text, View } from 'react-native';
import Avatar from '../../General components/Avatar';

const SearchCommunityBox = ({community}) => {
    return (
        <View style={{width:"100%", flexDirection:'row', padding:5, alignItems:'center'}}>
            <Avatar image={community.banner_image} size={40}/>
            <View style={{marginLeft:10}}>
                <Text style={{color:"white", fontSize:16}}>{community.group_name}</Text>
            </View>
        </View>
    );
};

export default SearchCommunityBox;
