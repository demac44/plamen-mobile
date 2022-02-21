import React, { useContext, useState, } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { UserContext } from '../../../../App';
import SearchUserBox from './SearchUserBox';
import SearchCommunityBox from './SearchCommunityBox';

const SearchContainerTN = ({query}) => {
    const currentUser = useContext(UserContext)
    const [type, setType] = useState(0)
    const {loading, error, data} = useQuery(SEARCH, {
        variables:{
            limit:50,
            offset:0,
            userID: currentUser.userID
        }
    })

    return (
        <View style={{flex:1, paddingTop:120, paddingBottom:60}}>
            <View style={styles.typeBox}>
                <TouchableOpacity style={{...styles.type,borderRightColor:"#3f3f3f",borderRightWidth:1, backgroundColor: type===0 ? "#1f1f1f" : "#1b1b1b"}} onPress={()=>setType(0)}>
                    <Text style={{fontSize:14, color:"white"}}>People</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.type, backgroundColor: type===1 ? "#1f1f1f" : "#1b1b1b"}} onPress={()=>setType(1)}>
                    <Text style={{fontSize:14, color:"white"}}>Communities</Text>
                </TouchableOpacity>
            </View>

            {!loading && (type===0 ? 
            <FlatList
                data={filterUsers(data?.get_users, query)}
                renderItem={({item}) => <SearchUserBox user={item}/>}
            />

            : <FlatList
                data={filterCommunities(data?.get_all_groups, query)}
                renderItem={({item}) => <SearchCommunityBox community={item}/>}
            />)}
        </View>
    );
};

export default SearchContainerTN;

const styles = {
    type:{
        width:"50%",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
    },
    typeBox:{
        width:"100%", 
        flexDirection:'row', 
        borderRadius:5, 
        overflow:'hidden', 
        borderWidth:1, 
        borderColor:"#2f2f2f", 
        position:'absolute', 
        top:60,
        height:40
    }
}

const SEARCH = gql`
    query ($limit: Int, $offset: Int, $userID: Int!) {
         get_users (limit: $limit, offset: $offset, userID: $userID){
            userID
            first_name
            last_name
            username
            profile_picture
            last_seen
        }
        get_all_groups (limit: $limit, offset: $offset) {
            groupID
            group_name
            banner_image
        }
    }
`

const filterUsers = (data, query) => {
    if(query.length <= 0) return []
    let q = query.toLowerCase()
    return data?.filter(user => {
        const str1 = user.first_name+user.last_name+user.username
        const str2 = user.first_name+user.username+user.last_name

        const str3 = user.last_name+user.username+user.first_name
        const str4 = user.last_name+user.first_name+user.username

        const str5 = user.username+user.first_name+user.last_name
        const str6 = user.username+user.last_name+user.first_name

        const str = (str1+str2+str3+str4+str5+str6).toLowerCase()

        return str.includes(q) 
                || q.includes(user.last_name.toLowerCase()) 
                || q.includes(user.first_name.toLowerCase())
                || q.includes(user.username.toLowerCase())
            
    })

}

const filterCommunities = (data, query) => {
    if(query.length <= 0) return []
    return data?.filter(community => {
        return community.group_name.toLowerCase().includes(query.toLowerCase()) 
                || query.toLowerCase().includes(community.group_name.toLowerCase())
    })
}