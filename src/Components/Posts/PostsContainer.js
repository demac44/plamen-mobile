import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Post from './Post/Post';
import { UserContext } from '../../../App';


const PostsContainer = ({posts, loadMore}) => {
    const user = useContext(UserContext)

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                initialNumToRender={10}
                renderItem={({item}) => <Post post={item} key={item.postID} currentUser={user}/>}
                onEndReached={()=>loadMore()}
            />
        </View>);
};

export default PostsContainer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
})