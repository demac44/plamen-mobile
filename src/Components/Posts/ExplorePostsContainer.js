import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Post from './Post/Post';
import { UserContext } from '../../../App';
import CreatePost from './Create post/CreatePost'
import StoriesContainer from '../Stories/StoriesContainer';
import PaginationLoader from '../General components/Loaders/PaginationLoader';

const ExplorePostsContainer = ({posts, loadMore, refetchPosts, loader}) => {
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
                    <Text style={styles.title}>Explore</Text>
                </>}
                ListFooterComponent={
                    <>
                        {loader && <PaginationLoader/>}
                    </>
                }

                />
        </View>);
};

export default ExplorePostsContainer;

const styles = StyleSheet.create({
    container:{
        flex:0.84,
        backgroundColor:"#1b1b1b",
        width:"100%"
    },
    title:{
        width:"100%", 
        textAlign:'center',
        padding:10,
        borderWidth:1,
        borderColor:"#2f2f2f",
        borderRadius:5,
        marginTop:5,
        backgroundColor:"#1b1b1b",
        fontSize:16
    }
})
