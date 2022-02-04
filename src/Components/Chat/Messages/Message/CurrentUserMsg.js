import React from 'react';
import { Image, Text, View } from 'react-native';
import SetTime from '../../../General components/SetTime';

const CurrentUserMsg = ({msg, storyUrl}) => {
    return (
        <View style={styles.wrapper}>

            {/* story reply message */}
            {msg?.type==='story-image' && 
                <View style={styles.storyMsg}>
                    <Text style={{marginBottom:5}}>{msg.receiver+' replied to your story:'}</Text>
                    <Image source={{uri: storyUrl}} style={{height:200}}/>
                </View>
            }           

            <View>
                <View style={styles.msg}>

                    {/* message type */}
                    {msg.type==='image' && <Image source={{uri: msg.url}}/>}
                    {/* {msg.type==='video' && <video className='message-video' onClick={()=>setOpenMedia(true)} src={msg.url} controls/>} */}

                    <Text style={{color:"white"}}>{msg.msg_text}</Text>

                   <SetTime timestamp={msg.time_sent} fontSize={12} color="white"/>
                </View>
            </View>
        </View>
    );
};

export default CurrentUserMsg;

const styles = {
    wrapper:{
        width:"100%", 
        display:'flex', 
        alignItems:'flex-end'
    },
    msg:{
        backgroundColor:"#5f1cca", 
        padding:5, 
        margin:5, 
        borderRadius:10, 
        maxWidth:"80%"
    }, 
    storyMsg:{
        backgroundColor:"#2f2f2f",
        padding:5,
        borderRadius:5,
        margin:5
    }
}