import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import axios from 'axios';

const SendMessage = ({chat, loaderCallback, currentUser}) => {
    const [send_msg] = useMutation(SEND_MSG)
    const [media, setMedia] = useState(null)
    const [preview, setPreview] = useState(null)
    const [msgText, setMsgText] = useState('')
    const [lengthErr, setLengthErr] = useState(false)

    const sendMessage = async () => {
        if(msgText.trim().length < 1 && !media){
            return
        } else if (msgText.length > 6000){
            setLengthErr(true)
            return
        } else if (media) {
            loaderCallback(true)
            setPreview(false)
            // const data = new FormData()
            // data.append("file", media)
            // data.append("upload_preset", "z8oybloj")
            // data.append("folder", "Messages media")
            let base64Img = `data:${media.type};base64,${media.base64}`
            const data = {
                "file": base64Img,
                "upload_preset": "image_post_r"
            }
            await axios({
                method: 'POST',
                url: `https://api.cloudinary.com/v1_1/de5mm13ux/${media.type.slice(0,5)}/upload`, 
                data: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(res => {
                send_msg({
                    variables: {
                        sender: currentUser.username,
                        receiver: chat.username,
                        profile_picture: '',
                        msg_text: msgText,
                        type: media.type.slice(0,5),
                        url: res.data.secure_url
                    }
                }).then(()=>{
                        setMedia(null)
                        loaderCallback(false)
                        setMsgText('')
                    })
                })
        } else {
            send_msg({
                variables: {
                    sender: currentUser.username,
                    receiver: chat.username,
                    profile_picture: '',
                    msg_text: msgText,
                    type:'text',
                    url: 'null'
                }
            
            }).then(()=>{
                setMsgText('')
            })
            .catch(err => console.log(err))
        }
    }
                                
    const clearFiles = () => {
        setPreview(null)
        setMedia(null)
    }

    return (
        <View style={styles.box}>
            <TouchableOpacity style={{width:"10%"}}>
                <Text>FILE</Text>
            </TouchableOpacity>

            <TextInput
                style={{width:"70%", borderWidth:1, borderColor:"#2f2f2f", borderRadius:10, fontSize:15, paddingLeft:10}}
                placeholder='Send message...'
                placeholderTextColor="#5f5f5f"
                onChangeText={text => setMsgText(text)}
                value={msgText}
            />

            <TouchableOpacity style={styles.postBtn} onPress={sendMessage}>
                <Text style={{color:"white"}}>SEND</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SendMessage;

const styles = {
    postBtn:{
        backgroundColor:"#0b6bc5",
        padding:5,
        width:"15%",
        borderRadius:5,
        height:35,
        display:'flex', 
        alignItems:'center',
        justifyContent:"center",
    },
    box:{
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between', 
        padding:5, 
        position:'absolute', 
        bottom:0,
        right:0,
        left:0,
        backgroundColor:"#1b1b1b"
    }
}
const SEND_MSG = gql`
    mutation ($sender: String!, $receiver: String!, $msg_text: String!, $url: String, $type: String!){
        send_message (sender: $sender, receiver: $receiver, msg_text: $msg_text, url: $url, type: $type){
            msgID
        }
        msg_notification (sender: $sender, receiver: $receiver){ 
            receiver
        }
    }
`