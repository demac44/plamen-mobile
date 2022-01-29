import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../General components/Avatar';

const win = Dimensions.get('window')

const Story = () => {
    const navigation = useNavigation()
    const state = navigation.getState()
    const sid = state.routes[1].params["storyID"]
    const {data, loading} = useQuery(GET_STORY,{
        variables:{
            storyID: sid
        }
    })
    const [size, setSize] = useState({height:0})

    useEffect(()=>{
        !loading && Image.getSize(data?.get_story?.url, (w, h)=>{
            setSize({
                height:(h/w)*win.width
            })
        })
    }, [data])


    return (
        <View style={styles.container} onTouchEnd={(e)=>{
            if(e.nativeEvent.locationX>win.width/2) console.log('left');
            else console.log('right');
        }}>
            <View style={{flex:0.1}}>
                <Avatar image={data?.get_story?.profile_picture} size={50}/>
                <Text>{data?.get_story?.username}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Feed')}>
                    <Text>Go back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mediaBox}>
                {!loading && <Image source={{uri: data?.get_story?.url}} style={{width:win.width, height:size.height, maxHeight:win.height}}/>}
            </View>
            <View style={{flex:0.1}}>
                <TextInput style={{width:"100%"}} placeholder='Reply' placeholderTextColor="#aaa"/>
            </View>
        </View>
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
        flex:0.8
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