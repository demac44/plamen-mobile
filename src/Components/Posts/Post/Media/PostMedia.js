import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

const win = Dimensions.get('window')

const PostMedia = ({image}) => {
    const [size, setSize] = useState({width:0, height:0})

    useEffect(()=>{
        setSize(()=>{
            return Image.getSize(image, (w, h) => {
                setSize({
                    width: win.width,
                    height: h * (win.width/w)
                })
            })
        })
    }, [])
    
    return (
        <View>
            <Image source={{uri: image}} style={{height:size.height || 0, width:size.width || 0}}/>
        </View>
    );
};

export default PostMedia;