import React from 'react'
import { Image, Text, View } from 'react-native'
import SetTime from '../../../General components/SetTime'

const OtherUserMsg = ({storyUrl, msg}) => {
    return (
        <View style={{width:"100%", display:'flex', alignItems:'flex-start'}}>

            {/* story reply message */}
            {msg?.type==='story-image' && 
                <View>
                    <Text>{msg.username+' replied to your story:'}</Text>
                    <Image source={{uri: storyUrl}} style={{height:200}}/>
                </View>
            }           

            <View>
                <View style={{backgroundColor:"white", padding:5, margin:5, borderRadius:10}}>

                    {/* message type */}
                    {msg.type==='image' && <Image source={{uri: msg.url}}/>}
                    {/* {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>} */}

                    <Text style={{color:"#1f1f1f"}}>{msg.msg_text}</Text>

                   <SetTime timestamp={msg.time_sent} fontSize={12} color="#1b1b1b"/>
                </View>
            </View>
        </View>
    )
}

export default OtherUserMsg