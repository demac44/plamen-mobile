import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';

const MessagesBox = ({receiver, sender}) => {
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    const [del_msg_notif] = useMutation(DELETE_MSG_NOTIFICATIONS)
    const {data, loading, subscribeToMore, fetchMore} = useQuery(GET_MESSAGES, {
        skip: receiver ? false : true,
        variables: {
            limit:50,
            offset:0,
            sender,
            receiver 
        },
    })

    useEffect(()=>{ 
        const subscribeNewMessage = () => {
            return subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newMessage;
                    
                    if ((newMsg?.sender === receiver && newMsg.receiver===sender) || (newMsg?.sender === sender && newMsg.receiver===receiver)){
                    return Object.assign({}, prev, {
                        get_messages: [newMsg, ...prev.get_messages],
                        scroll: ()=>{
                            let box = document.querySelector('.chat-messages')
                            box.scrollHeight = 0
                        }
                    });
                }
            }});
        }
        return subscribeNewMessage()
    }, [loading, subscribeToMore])  

    useEffect(()=>{
        data?.get_messages?.length>=50 && setFetchBtn(true)
        del_msg_notif({
            variables:{
                receiver: sender,
                sender: receiver
            }
        })
    }, [data, sender, receiver, loading, del_msg_notif])

    return (
        <ScrollView style={styles.box}>
            {data?.get_messages?.map(message => <Text>{message.msg_text}</Text>)}
        </ScrollView>
    );
};

export default MessagesBox;


const styles = {
    box:{
        flex:0.84,
        backgroundColor:"#1f1f1f"
    }
}

const GET_MESSAGES = gql`
    query ($sender: String!, $receiver: String!, $limit: Int, $offset: Int){
        get_messages (sender: $sender, receiver: $receiver, limit: $limit, offset: $offset){
            msgID
            msg_text
            userID
            type
            url
            time_sent
            profile_picture
            storyID
            sender
            receiver
        }
    }
`
const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            msgID
            msg_text
            url
            type
            time_sent
            profile_picture
            storyID
            sender
            receiver
        }
    }
`

const DELETE_MSG_NOTIFICATIONS = gql`
    mutation($sender: String, $receiver: String){
        delete_msg_notifications(sender: $sender, receiver: $receiver){
            receiver
        }
    }
`