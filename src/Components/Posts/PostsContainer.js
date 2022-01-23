import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StoriesContainer from '../Stories/StoriesContainer';
import Post from './Post/Post';

const PostsContainer = () => {

    const posts = [{
        first_name: "Umejr",
        last_name: "Demir",
        username:"demac22",
        profile_picture: "https://source.unsplash.com/random/sig=5",
        post_text: "Djesi sta ima",
        postID:1,
        url: "https://source.unsplash.com/random/sig=5"
    }]

    return (
        <View style={styles.container}>
            <ScrollView>
                <StoriesContainer/>
                <View style={{flex:0.9}}>
                    {posts.map(post => <Post post={post} key={post.postID}/>)}
                </View>
            </ScrollView>
        </View>);
};

export default PostsContainer;

const styles = StyleSheet.create({
    container:{
        flex:0.84,
        backgroundColor:"#1f1f1f",
        width:"100%"
    }
})