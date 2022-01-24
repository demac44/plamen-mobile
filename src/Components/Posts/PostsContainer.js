import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StoriesContainer from '../Stories/StoriesContainer';
import Post from './Post/Post';

const PostsContainer = ({posts}) => {

    return (
        <View style={styles.container}>
            <ScrollView >
                <StoriesContainer/>
                <View style={{flex:0.9}}>
                    {posts?.map(post => <Post post={post} key={post?.postID}/>)}
                </View>
            </ScrollView>
        </View>);
};

export default PostsContainer;

const styles = StyleSheet.create({
    container:{
        flex:0.84,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
})