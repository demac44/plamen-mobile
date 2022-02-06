import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const win = Dimensions.get('window')

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client';

const AddComment = (props) => {
    const [cmtText, setCmtText] = useState('')
    const [add_comment] = useMutation(ADD_COMMENT) 
    const [mention_notif] = useMutation(MENTION_NOTIF)

    const handleComment = () => {
        if(cmtText.trim()===''){
            return
        } else{
            add_comment({
                variables:{
                    postID: props.postID,
                    userID: props.currentUser.userID,
                    comment_text: cmtText,
                    rid: props.userID,
                }
            }).then(()=>{
                findTag(cmtText).forEach(tag=>{
                    mention_notif({
                        variables:{
                            userID: props.currentUser.userID,
                            postID: props.postID,
                            username: props.currentUser.username,
                            pfp: '',
                            rusername: tag
                        }
                    })
                })
            })
            .then(()=>{
                props.refetchComments()
                setCmtText('')
            })
        }
    }
    return (
        <>
            <TextInput
                placeholder='Add comment...'
                placeholderTextColor="#4f4f4f"
                style={styles.input}
                value={cmtText}
                onChangeText={text => setCmtText(text)}
            />
            <TouchableOpacity style={styles.postBtn} onPress={handleComment}>
                <Text>POST</Text>
            </TouchableOpacity>
        </>
    );
};

export default AddComment;

const styles = StyleSheet.create({
    input:{
        width: win.width - 40 - 60
    },
    postBtn:{
        backgroundColor:"#5e1b82",
        padding:5,
        width:40,
        borderRadius:5,
        marginLeft:15
    }
})

const ADD_COMMENT = gql`
    mutation ($postID: Int!, $userID: Int!, $comment_text: String!, $rid: Int!){
        add_comment(postID: $postID, userID: $userID, comment_text: $comment_text){
            commentID
        }
        comment_notification (postID: $postID, sender_id: $userID, receiver_id: $rid){
            postID
        }
    }
`

const MENTION_NOTIF = gql`
    mutation ($postID: Int!, 
              $userID: Int!, 
              $username: String!, 
              $rusername: String!,
              $pfp: String!){
        cmt_mention_notification (postID: $postID, 
                              sender_id: $userID, 
                              username: $username, 
                              receiver_username: $rusername
                              profile_picture: $pfp){
            postID
        }
    }
`
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
// find if user @mentioned in post
const findTag = (post_text) => {
    let arr = post_text.split('')
    let namesArr = [];
    let name=null;
    for(let i = 0;i<arr.length;i++){
        name=null;
        if(arr[i]==='@'){
            for(let j=i;j<arr.length;j++){
                if(arr[j]===' ') {name=post_text.slice(i+1,j); break}
                else if(j===arr.length-1) {name=post_text.slice(i+1,j+1); break}
                else if(j===arr.length) {name=post_text.slice(i+1,-1); break}
            }
            name && namesArr.push(name)
        }
    }
    return namesArr.filter(onlyUnique)
}