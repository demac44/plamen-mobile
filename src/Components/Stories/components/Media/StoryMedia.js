import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image } from 'react-native';
const win = Dimensions.get('window')

const StoryMedia = ({url}) => {
    const [size, setSize] = useState({height:0})

    useEffect(()=>{
        Image.getSize(url, (w, h)=>{
            setSize({
                height:(h/w)*win.width
            })
        })
    }, [url])

    console.log(sort());

    return (
        <View style={styles.mediaBox}>
            <Image source={{uri: url}} style={{width:win.width, height:size.height, maxHeight:win.height}}/>
        </View>
    );
};

export default StoryMedia;


const sort = () => {
    const a = [6,0,3,1,4,9]
    const arr = [1,6,7,4,9,3,6,6,0,3]
    let b = []

    for(let i=0;i<a.length;i++){
        let c = a[i]
        arr.forEach(e => {
            if(e===c) b.push(e)
        })
    }

    return b

}



const styles = {
    mediaBox:{
        display:'flex', 
        alignItems:"center", 
        justifyContent:'center',
        flex:1
    }

}


