import React, { useLayoutEffect, useRef, useState } from 'react';
import { ScrollView, View, Dimensions, Text, TouchableOpacity} from 'react-native';

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import Message from './Message/Message';

const win = Dimensions.get('window')

const MessagesBox = ({receiver, sender}) => {
    const [loader, setLoader] = useState(false)
    const [fetchBtn, setFetchBtn] = useState(false)
    const [del_msg_notif] = useMutation(DELETE_MSG_NOTIFICATIONS)
    const {data, loading, subscribeToMore, fetchMore} = useQuery(GET_MESSAGES, {
        skip: receiver ? false : true,
        variables: {
            limit:30,
            offset:0,
            sender,
            receiver 
        },
    })

    const scroll = useRef()

    useLayoutEffect(()=>{ 
        const subscribeNewMessage = () => {
            return subscribeToMore({
                document: NEW_MESSAGE,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData?.data) return prev;
                    const newMsg = subscriptionData?.data?.newMessage;
                    
                    if ((newMsg?.sender === receiver && newMsg.receiver===sender) || (newMsg?.sender === sender && newMsg.receiver===receiver)){
                    return Object.assign({}, prev, {
                        get_messages: [newMsg, ...prev.get_messages]
                    });
                }
            }});
        }
        subscribeNewMessage()
    }, [])  
    
    // useEffect(()=>{
    //     data?.get_messages?.length>=30 && setFetchBtn(true)
    //     del_msg_notif({
    //         variables:{
    //             receiver: sender,
    //             sender: receiver
    //         }
    //     })
    // }, [data, sender, receiver, loading, del_msg_notif])

    
    const handleLoadMore = () => {
        setFetchBtn(false)
        fetchMore({
            variables:{
                offset: data?.get_messages?.length,
            },
        }).then(res=>{
            if(res.data?.get_messages?.length < 1) setFetchBtn(false)
            else if (res?.data?.get_messages?.length >=30) setFetchBtn(true)
        })
    }

    return (
        <View style={{flex:0.84}}>
            <ScrollView 
                ref={scroll}
                contentContainerStyle={styles.box}
                onContentSizeChange={() => scroll.current.scrollToEnd({animated:false})}    
            >
                {!loading && data?.get_messages?.map(msg => <Message msg={msg} sender={sender} key={msg.msgID}/>)}
                {fetchBtn && <TouchableOpacity style={styles.loadMore} onPress={()=>handleLoadMore()}>
                    <Text style={{color:"#aaa"}}>Load more</Text>
                </TouchableOpacity>}
            </ScrollView>
        </View>
    );
};

export default MessagesBox;


const styles = {
    box:{
        backgroundColor:"#1f1f1f",
        display:"flex",
        flexDirection:"column-reverse",
        justifyContent:"flex-start",
        paddingBottom:10,
        minHeight: win.height-120
    },
    loadMore:{
        width:"100%",
        padding:5,
        alignItems:"center",
        backgroundColor:"#2b2b2b",
        marginBottom:10
    }
}

const GET_MESSAGES = gql`
    query ($sender: String!, $receiver: String!, $limit: Int, $offset: Int){
        get_messages (sender: $sender, receiver: $receiver, limit: $limit, offset: $offset){
            msgID
            msg_text
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