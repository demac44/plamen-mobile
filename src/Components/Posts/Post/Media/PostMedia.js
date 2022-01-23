import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const win = Dimensions.get('window')

const PostMedia = ({image}) => {
    const [size, setSize] = useState(()=>{
        return Image.getSize(image, (w, h) => {
            setSize({
                width: win.width,
                height: h * (win.width/w)
            })
        })
    })
    
    return (
        <View style={{width:"100%", height:"100%"}}>
            <Image source={{uri: image}} style={{height:size.height, width:size.width}}/>
        </View>
    );
};

export default PostMedia;

const styles = StyleSheet.create({
    image:{
        height:100   
    }
})