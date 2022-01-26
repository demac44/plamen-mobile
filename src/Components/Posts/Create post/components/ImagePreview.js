import React, {useState, useEffect} from 'react'
import {Image, Text, View, Dimensions, TouchableOpacity} from 'react-native'
import xIcon from '../../../../Assets/images/icons/x-icon.png'

const win = Dimensions.get('window')

const ImagePreview = ({preview, previewCB, imageCB}) => {
    const [size, setSize] = useState({width:0, height:0})

    useEffect(()=>{
        setSize(()=>{
            try{
                return Image.getSize(preview, (w, h) => {
                    setSize({
                        width: win.width/2,
                        height: (h * (win.width/w))/2
                    })
                })
            }
            catch{}
        })
    }, [])
    return (
        <View style={{width:"100%", display:'flex', justifyContent:'center', alignItems:'center'}}>

            <TouchableOpacity 
                onPress={()=>{imageCB(null);previewCB(null)}}
                style={{width:"100%", display:'flex', alignItems:'flex-end', paddingTop:10, paddingRight:10}}
            >
                <Image source={xIcon}/>
            </TouchableOpacity>

            <Image source={{uri: preview}} style={{width:size.width, height:size.height}}/>
        </View>
        );
    }
export default ImagePreview