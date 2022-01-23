import React from 'react';
import { StyleSheet, View } from 'react-native';
import PostMedia from './Media/PostMedia';
import PostTopBar from './Top bar/PostTopBar';

const Post = ({post}) => {
  return (
      <View style={styles.post}>
            <PostTopBar 
                fname={post.first_name}
                lname={post.last_name}
                username={post.username}
                postID={post.postID}
                pfp={post.profile_picture}
            />
            <PostMedia image={post.url}/>


      </View>
  );
};

export default Post

const styles = StyleSheet.create({
    post:{
        width:"100%",
    }
})