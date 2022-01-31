import React, { useEffect, useState } from 'react';
import {  KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import StoryTopBar from './components/Top bar/StoryTopBar';
import StoryBottomBar from './components/Bottom bar/StoryBottomBar';
import StoryMedia from './components/Media/StoryMedia';

const Story = () => {
    const navigation = useNavigation()
    const state = navigation.getState()
    const [stories, setStories] = useState([])
    const [uids, setUids] = useState([])
    const [noOfStories, setNoOfStories] = useState([])
    const sid = state.routes[1].params["storyID"]
    const {data} = useQuery(GET_STORY,{
        variables:{
            storyID: sid
        }
    })

    const getStories = async () => {
        AsyncStorage.getItem('ALL_STORIES').then(res => setStories(JSON.parse(res)))
        AsyncStorage.getItem('STORIES_UIDS').then(res => setUids(JSON.parse(res)))
    }

    useEffect(()=>{
        getStories()
        setNoOfStories(()=>{
            return uids.filter(id => {return id.userID===data?.get_story?.userID})
        })
    }, [data])

    return (
        <>
            <KeyboardAvoidingView enabled={false} behavior='height' style={styles.container}>
                <StoryTopBar pfp={data?.get_story?.profile_picture} navigation={navigation} username={data?.get_story?.username}/>

                <StoryMedia url={data?.get_story?.url} stories={stories} navigation={navigation} sid={sid}/>

            </KeyboardAvoidingView>
            <StoryBottomBar noOfStories={noOfStories} sid={sid}/>
        </>
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
            userID
        }
    }
`