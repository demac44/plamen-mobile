import React, { useEffect, useState } from 'react';
import {TouchableOpacity} from 'react-native';

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SavePost = ({currentUserID, postID}) => {
    const [saved, setSaved] = useState(false)
    const [save_post, {error}] = useMutation(SAVE_POST)
    const [remove_saved] = useMutation(REMOVE_SAVED)

    const ifSaved = useQuery(IF_SAVED, {
        variables:{
            userID: currentUserID,
            postID: postID
        }
    })

    useEffect(()=>{
        !ifSaved.loading && (ifSaved?.data?.if_saved && setSaved(true))
    }, [ifSaved])

    const handleSave = () => {
        saved ?
        remove_saved({
            variables: {
                postID: postID,
                userID: currentUserID
            }
        }).then(()=>setSaved(false)).catch(err => console.log(err))
        : save_post({
            variables: {
                postID: postID,
                userID: currentUserID,
            }
        }).then(() => setSaved(true)).catch(err => console.log(err))
    }

    if(ifSaved.error) console.log(error);
    if(error) console.log(error);

  return (
    <TouchableOpacity onPress={handleSave}>
        <FontAwesomeIcon icon='bookmark' size={24} color={ifSaved.loading ? 'white' : (saved ? '#ffbb00' : 'white')}/>
    </TouchableOpacity> 
  );
};

export default SavePost;



const SAVE_POST = gql`
    mutation ($postID:Int!,$userID:Int!){
        save_post(userID: $userID,postID:$postID){
            postID
        }
    }
`
const REMOVE_SAVED = gql`
mutation ($postID:Int!,$userID:Int!){
    remove_saved(userID: $userID,postID:$postID){
        postID
    }
}
`
const IF_SAVED = gql`
    query ($userID: Int!, $postID: Int!){
        if_saved(userID: $userID, postID: $postID)
    }
`