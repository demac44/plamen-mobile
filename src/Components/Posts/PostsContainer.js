import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import Post from './Post/Post';
import { UserContext } from '../../../App';
import CreatePost from './Create post/CreatePost'
import StoriesContainer from '../Stories/StoriesContainer';
import PaginationLoader from '../General components/Loaders/PaginationLoader';

const PostsContainer = ({posts, loadMore, refetchPosts}) => {
    const user = useContext(UserContext)
    const [refreshing, setRefreshing] = useState(false)

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                initialNumToRender={10}
                renderItem={({item}) => <Post post={item} key={item.postID} currentUser={user}/>}
                onEndReached={()=>loadMore()}
                refreshControl={                    
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={()=>refetchPosts()}
                    colors={["lightblue"]}
                    />}
                ListHeaderComponent={
                <>
                    <StoriesContainer/>
                    <CreatePost/>
                </>}
                ListFooterComponent={
                    <>
                        <PaginationLoader/>
                    </>
                }

                />
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