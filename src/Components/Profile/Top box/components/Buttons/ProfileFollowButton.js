import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity} from 'react-native';

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import { UserContext } from '../../../../../../App';

const ProfileFollowButton = ({userID}) => {
    const currentUser = useContext(UserContext)
    const [isFollowing, setIsFollowing] = useState(false) 
    const [follow] = useMutation(FOLLOW)
    const [unfollow] = useMutation(UNFOLLOW)
    const [follow_notification] = useMutation(FOLLOW_NOTIFICATION)
    const [isLoading, setIsLoading] = useState(false)

    const {loading, data, refetch} = useQuery(IF_FOLLOWING,{
        variables: {followerID: currentUser.userID, followedID: userID}
    })
    
    useEffect(()=>{ 
        setIsLoading(true)
        !loading && setIsFollowing(data?.ifFollowing) 
        setIsLoading(false)
    }, [data, loading])

    const handleFollow = () => {
        setIsLoading(true)
        isFollowing 
        ?
        unfollow({
            variables: {
                followerID: currentUser.userID,
                followedID: userID
            }
        })
        .then(()=>{setIsLoading(false);setIsFollowing(false);refetch()})
        .catch(err => {setIsLoading(false);console.log(err);})
        : 
        follow({
            variables: {
                followerID: currentUser.userID,
                followedID: userID
            }
        })
        .then(()=>{setIsLoading(false);setIsFollowing(true);refetch()})
        .then(()=>follow_notification({
            variables:{
                rid: userID,
                sid: currentUser.userID
            }
        }).catch(err => {setIsLoading(false);console.log(err)})
    )
    }
    return (
        <TouchableOpacity style={styles.btn} onPress={handleFollow}>
            {(loading || isLoading) ? <Text>Loading</Text>:
            <Text style={{color:"white", fontSize:20}}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>}
        </TouchableOpacity>
    );
};

export default ProfileFollowButton;

const styles = {
    btn:{
        width:"55%", 
        paddingVertical:13, 
        backgroundColor:"#5e1b82", 
        alignItems:'center', 
        borderRadius:5,
    }
}
const FOLLOW = gql`
    mutation ($followerID: Int!, $followedID: Int!){
        follow(followerID: $followerID, followedID: $followedID){
            followerID
            followedID
        }
    }
`
const UNFOLLOW = gql`
    mutation ($followerID: Int!, $followedID: Int!){
        unfollow(followerID: $followerID, followedID: $followedID){
            followerID
            followedID
        }
        remove_follow_notif(sender_id: $followerID, receiver_id: $followedID) {
            receiver_id
        }
    }
`
const IF_FOLLOWING = gql`
    query ($followerID: Int!, $followedID: Int!){
        ifFollowing(followerID: $followerID, followedID: $followedID)
    }
`
const FOLLOW_NOTIFICATION = gql`
    mutation ($rid: Int!, $sid: Int!){
        follow_notification(receiver_id: $rid, sender_id: $sid){
            receiver_id
        }
    }
`