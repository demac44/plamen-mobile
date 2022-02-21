import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const win = Dimensions.get('window')


const VideoPreview = ({preview, videoCB, previewCB}) => {

    const [size, setSize] = useState()

    return (
        <View style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity 
                onPress={()=>{videoCB(null);previewCB(null)}}
                style={{width:"100%", display:'flex', alignItems:'flex-end', padding:10, paddingRight:10}}>
                <FontAwesomeIcon icon='times' size={20} color='white'/>
            </TouchableOpacity>
            <Video 
                source={{uri: preview}}
                style={{
                    width: win.width-20,
                    height: size
                  }}
                resizeMode='cover'
                onLoad={response => {
                    const { width, height } = response.naturalSize;
                    const heightScaled = height * (win.width / width);
                
                    setSize(heightScaled)
                  }}
            />
        </View>
    )
}
export default VideoPreview