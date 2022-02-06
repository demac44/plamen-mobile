import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Post from './Post/Post';
import { UserContext } from '../../../App';
import CreatePost from './Create post/CreatePost'
import StoriesContainer from '../Stories/StoriesContainer';
import PaginationLoader from '../General components/Loaders/PaginationLoader';

const FeedPostsContainer = ({posts, stories, loadMore, refetchPosts, loader, postMenuCB, currentUser}) => {
    const [refreshing, setRefreshing] = useState(false)

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                initialNumToRender={10}
                renderItem={({item}) => <Post post={item} key={item.postID} currentUser={currentUser} postMenuCB={postMenuCB}/>}
                onEndReached={()=>loadMore()}
                refreshControl={                    
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={()=>refetchPosts()}
                    colors={["lightblue"]}
                    />}
                ListHeaderComponent={
                <>
                    <StoriesContainer stories={stories}/>
                    <CreatePost currentUser={currentUser} refetchPosts={refetchPosts}/>
                </>}
                ListFooterComponent={
                    <>
                        {loader && <PaginationLoader/>}
                    </>
                }

            />
        </View>);
};

export default FeedPostsContainer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#1b1b1b",
        width:"100%",
        paddingTop:60
    }
})