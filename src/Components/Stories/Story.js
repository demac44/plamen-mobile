import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import StoryTopBar from './components/Top bar/StoryTopBar';
import StoryBottomBar from './components/Bottom bar/StoryBottomBar';
import StoryMedia from './components/Media/StoryMedia';

const win = Dimensions.get('window')

const Story = () => {
    const navigation = useNavigation()
    const state = navigation.getState()
    const [stories, setStories] = useState([])
    const [touchTime, setTouchTime] = useState(0)
    const sid = state.routes[1].params["storyID"]
    const {data, loading} = useQuery(GET_STORY,{
        variables:{
            storyID: sid
        }
    })

    const getStories = async () => {
        await AsyncStorage.getItem('ALL_STORIES').then(res => setStories(JSON.parse(res)))
    }

    useEffect(()=>{
        getStories()
    }, [])

    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={styles.container}>
            <StoryTopBar pfp={data?.get_story?.profile_picture} navigation={navigation} username={data?.get_story?.username}/>

            <StoryMedia url={data?.get_story?.url} stories={stories} navigation={navigation} sid={sid}/>

            <StoryBottomBar/>
        </KeyboardAvoidingView>
    );
};

export default Story;


const styles = {
    container:{
        flex:1, 
        backgroundColor:"#1b1b1b"
    },
    mediaBox:{
        display:'flex', 
        alignItems:"center", 
        justifyContent:'center',
        flex:1
    }

}


const GET_STORY = gql`
    query($storyID: Int!){
        get_story(storyID: $storyID){
            username
            type
            profile_picture
            date_posted
            storyID
            url
        }
    }
`