import React, { useCallback, useState, memo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import CurrentUserMsg from './CurrentUserMsg'
import { Text } from 'react-native'
import OtherUserMsg from './OtherUserMsg'

const Message = ({msg, sender}) => {
    const {data, loading} = useQuery(GET_STORY, {
        skip: !msg.storyID,
        variables: {
            sid: msg.storyID
        }
    })
    
    return (
        <>
            {!loading && ((msg.sender===sender)
            ? <CurrentUserMsg
                msg={msg} 
                storyUrl={data?.get_story_msg_url?.url} // if message is story reply
                deleteQuery={DELETE_MESSAGE}
            />
            : <OtherUserMsg msg={msg} storyUrl={data?.get_story_msg_url?.url}/>)}
        </>
    )
}



export default memo(Message)

const GET_STORY = gql`
    query($sid: Int){
        get_story_msg_url(storyID: $sid){
            url
        }
    }
`

const DELETE_MESSAGE = gql`
    mutation ($msgID: Int!){
        delete_message(msgID:$msgID){
            msgID
        }
    }
`