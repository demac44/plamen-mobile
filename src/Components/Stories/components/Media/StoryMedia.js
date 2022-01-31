import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image } from 'react-native';
const win = Dimensions.get('window')

const StoryMedia = ({url, stories, navigation, sid}) => {
    const [size, setSize] = useState({height:0})

    const nextStory = () => {
        findNextStory()===-1 ?
        navigation.navigate('Feed')
        : navigation.navigate('Story', {storyID: findNextStory()})
    }

    const previousStory = () => {
        findPreviousStory()===-1 ?
        navigation.navigate('Feed')
        : navigation.navigate('Story', {storyID: findPreviousStory()})
    }

    const findNextStory = () => {
        for(let i=0;i<stories.length;i++){
            if(stories[i].storyID===sid){
                if(i===stories.length-1) return -1
                return stories[i+1].storyID
            }
        }
        return -1
    }

    const findPreviousStory = () => {
        for(let i=0;i<stories.length;i++){
            if(stories[i].storyID===sid){
                if(i===0) return -1
                return stories[i-1].storyID
            }
        }
        return -1
    }

    useEffect(()=>{
        url && Image.getSize(url, (w, h)=>{
            setSize({
                height:(h/w)*win.width
            })
        })
    }, [url])

    return (
        <View style={styles.mediaBox}
            onTouchEnd={(e)=>{
                if(e.nativeEvent.locationX>win.width/2) nextStory()
                else previousStory()
            }}
        >
            <Image 
                source={{uri: url}} 
                style={{width:win.width, height:size.height, maxHeight:win.height}}
            />
        </View>
    );
};

export default StoryMedia;

const styles = {
    mediaBox:{
        display:'flex', 
        alignItems:"center", 
        justifyContent:'center',
        flex:1
    }
}


