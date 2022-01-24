import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddComment from './components/AddComment';
import LikePost from './components/LikePost';



const PostBottomBar = ({postID, userID, currentUser, refetchComments}) => {

    // add likes list

    return (
        <View style={styles.bar}>
            <LikePost 
                postID={postID} 
                userID={userID} 
                currentUserID={currentUser.userID}
            />
            <AddComment 
                postID={postID} 
                userID={userID} 
                currentUser={currentUser} 
                refetchComments={refetchComments}
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