import React, { useEffect, useState } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import logo from '../../../../../Assets/images/logo-min.jpg'
import logoBlank from '../../../../../Assets/images/logoBlank-min.jpg'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';

const LikePost = ({postID, currentUserID, userID}) => {
    const [liked, setLiked] = useState(false)
    const [like_post] = useMutation(LIKE_POST)
    const [remove_like] = useMutation(REMOVE_LIKE)

    const ifLiked = useQuery(IF_LIKED, {
        variables:{
            postID: postID,
            userID: currentUserID
        }
    })

    useEffect(()=>{
        !ifLiked.loading && (ifLiked?.data?.if_liked && setLiked(true))
    }, [ifLiked, liked])

    const handleLike = () => {
        liked ?
        remove_like({
            variables: {
                postID: postID,
                userID: currentUserID
            }
        }).then(()=>{
            setLiked(false)
        })   .catch(err => console.log(err))
        : like_post({
            variables: {
                postID: postID,
                userID: currentUserID,
                rid: userID
            }
        }).then(() => {
            setLiked(true)
        }).catch(err => console.log(err))
    }
    
    return (
        <TouchableWithoutFeedback onPress={handleLike}>
            <Image source={liked ? logo : logoBlank} style={{height:30, width:20, marginHorizontal:10}}/>
        </TouchableWithoutFeedback>
    );
};

export default LikePost;

const LIKE_POST = gql`
mutation ($postID: Int!, $userID: Int!, $rid: Int!){
    like_post(postID: $postID, userID: $userID){
        postID
    }
    like_notification (postID: $postID, sender_id: $userID, receiver_id: $rid){
        postID
    }
}
`
const REMOVE_LIKE = gql`
mutation remove_like($postID: Int!, $userID: Int!){
    remove_like(postID: $postID, userID: $userID){
        postID
    }
    remove_like_notif(postID: $postID, sender_id: $userID){
        postID
    }
}
`
const IF_LIKED = gql`
query ($postID: Int!, $userID: Int!){
    if_liked(postID: $postID, userID: $userID)
}
`