import React from 'react';
import { StyleSheet, View } from 'react-native';
import PostMedia from './Media/PostMedia';
import PostTextBar from './Text bar/PostTextBar';
import PostTopBar from './Top bar/PostTopBar';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import PostComments from './Bottom bar/Comments/PostComments';

const Post = ({post}) => {
    const {data, loading, error} = useQuery(GET_COMMENTS, {
        variables:{
            postID: post.postID,
            limit:1,
            offset:0,
            uid: 32
        }
    })

    return (
        <View style={styles.post}>
            <PostTopBar 
                fname={post.first_name}
                lname={post.last_name}
                username={post.username}
                postID={post.postID}
                pfp={post.profile_picture}
                timestamp={post.date_posted}
            />
            {post.type==='image' && <PostMedia image={post.url}/>}
            <PostTextBar text={post.post_text}/>

            {!loading && <PostComments comments={data?.get_post_comments}/>}
        </View>
    );
};

export default Post

const styles = StyleSheet.create({
    post:{
        width:"100%",
        marginTop:10,
        borderWidth:1,
        borderColor:"#1f1f1f",
        borderLeftWidth:0,
        borderRightWidth:0
    }
})

const GET_COMMENTS = gql`
    query($postID: Int!, $limit: Int, $offset: Int, $uid: Int!){
        get_post_comments(postID: $postID, limit: $limit, offset: $offset, userID: $uid){
            commentID
            userID
            profile_picture
            username
            date_commented
            comment_text
            postID
        }
    }
`