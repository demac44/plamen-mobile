import React, { useContext, useState, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostMedia from './Media/PostMedia';
import PostTextBar from './Text bar/PostTextBar';
import PostTopBar from './Top bar/PostTopBar';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import PostComments from './Comments/PostComments';
import PostBottomBar from './Bottom bar/PostBottomBar';

const Post = ({post, currentUser}) => {
    const [loadMoreBtn, setLoadMoreBtn] = useState(true)
    const {data, loading, fetchMore, refetch} = useQuery(GET_COMMENTS, {
        variables:{
            postID: post.postID,
            limit:1,
            offset:0,
            uid: 32
        }
    })
    
    const loadMore = () => {
        fetchMore({
            variables:{
                limit:5,
                offset:data?.get_post_comments?.length
            }
        }).then(res => res?.data?.get_post_comments?.length<=0 && setLoadMoreBtn(false))
    }


    return (
        <View style={styles.post}>
            <PostTopBar 
                fname={post.first_name}
                lname={post.last_name}
                username={post.username}
                postID={post.postID}
                pfp={post.profile_picture}
                timestamp={post.date_posted}
                currentUser={currentUser}
            />
            {post.type==='image' && <PostMedia image={post.url}/>}
            {post.post_text && <PostTextBar text={post.post_text}/>}

            {!loading && 
            <>  
                {data?.get_post_comments?.length > 0 && <PostComments comments={data?.get_post_comments}/>}
                {(data?.get_post_comments?.length>0 && loadMoreBtn) && <TouchableOpacity style={styles.loadMore} onPress={loadMore}>
                    <Text style={styles.loadMoreBtn}>Show more</Text>
                </TouchableOpacity>}
            </>
            }

            <PostBottomBar 
                postID={post.postID} 
                userID={post.userID}
                currentUser={currentUser}
                refetchComments={refetch}
            />
            
        </View>
    );
};

export default memo(Post)

const styles = StyleSheet.create({
    post:{
        width:"100%",
        marginTop:10,
        borderWidth:1,
        borderColor:"#2b2b2b",
        borderLeftWidth:0,
        borderRightWidth:0
    },
    loadMore:{
        width:"100%",
        paddingTop:5,
        display:'flex',
        alignItems:'center'
    },
    loadMoreBtn:{
        backgroundColor:"#2f2f2f",
        paddingVertical:3,
        paddingHorizontal:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        fontSize:12
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