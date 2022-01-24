import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddComment from './components/AddComment';
import LikePost from './components/LikePost';



const PostBottomBar = ({postID, userID, currUserID, refetchComments, currUsername}) => {
    return (
        <View style={styles.bar}>
            <LikePost 
                postID={postID} 
                userID={userID} 
                currUserID={currUserID}
            />
            <AddComment 
                postID={postID} 
                userID={userID} 
                currUserID={currUserID} 
                refetchComments={refetchComments}
                currUsername={currUsername}
            />
        </View>
    );
};

export default PostBottomBar;

const styles = StyleSheet.create({
    bar:{
        width:"100%",
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        height:40
    }
})