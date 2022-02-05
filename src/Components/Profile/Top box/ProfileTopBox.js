import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ActivityBar from './components/ActivityBar';
import NamesBox from './components/NamesBox';
import ProfileAvatar from './components/ProfileAvatar';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import StatsBox from './components/StatsBox';
import ProfileFollowButton from './components/Buttons/ProfileFollowButton';
import SendMessageButton from './components/Buttons/SendMessageButton'
import ActivityStatus from '../../General components/ActivityStatus';

const ProfileTopBox = ({user, currentUser, refreshing,refreshCB, myprofile}) => {
    const {loading, data, refetch} = useQuery(FETCH_INFO, {
        variables: {
            userID: user.userID,
            blockerId: currentUser.userID
        }
    })

    if(refreshing) refetch().then(()=>refreshCB(false)).catch(err => console.log(err))

    useEffect(()=>{
        refetch()
    }, [loading, data])

    return (
        <View style={styles.box}>
            <ProfileAvatar url={user.profile_picture}/>
            <NamesBox name={user?.first_name+' '+user?.last_name} username={user.username}/>
            <View style={{marginTop:20, marginLeft:-20, marginBottom:5}}>
                <ActivityStatus last_seen={user.last_seen}/>
            </View>
            {!loading && <StatsBox data={data}/>}
            {!myprofile && 
            <View style={{flexDirection:'row', marginTop:30, justifyContent:'space-between', alignItems:'flex-start', width:"100%"}}>
                <SendMessageButton user={user}/>
                <ProfileFollowButton userID={user.userID}/>
            </View>}
        </View>
    );
};

export default ProfileTopBox;

const styles = {
    box:{
        width:"100%", 
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        padding:10,
        paddingTop:20,
        marginTop:10
    },
    activityBar:{
        width:"100%", 
        height:3, 
        position:'absolute', 
        top:0, 
        borderRadius:5
    },
    btnsBox:{

    }
}

const FETCH_INFO= gql`
    query ($userID: Int!, $blockerId: Int!){
        get_followers(followedID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_following(followerID: $userID){
            userID
            username
            first_name
            last_name
            profile_picture
        }
        get_user_stories (userID: $userID){
            first_name
            last_name
            userID
            profile_picture
            storyID
            type
            url
            date_posted
        } 
        if_user_blocked(blockerId: $blockerId, blockedId: $userID)
        no_of_posts(userID: $userID)

    }`