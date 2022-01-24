import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

const win = Dimensions.get('window')

const PostMedia = ({image}) => {
    const [size, setSize] = useState({width:0, height:0})

    useEffect(()=>{
        setSize(()=>{
            try{
                return Image.getSize(image, (w, h) => {
                    setSize({
                        width: win.width,
                        height: h * (win.width/w)
                    })
                })
            }
            catch{}
        })
    }, [])
    
    return (
        <View>
            <Image source={{uri: image}} style={{height:size.height, width:size.width}}/>
        </View>
    );
};

export default PostMedia;