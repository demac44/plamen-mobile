import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import PaginationLoader from '../General components/Loaders/PaginationLoader';
import Post from './Post/Post';
import ProfileTopBox from '../Profile/Top box/ProfileTopBox'
import CreatePost from './Create post/CreatePost';

const ProfilePostsContainer = ({posts, refetchPosts, loadMore, currentUser, user, myprofile, postMenuCB, loader}) => {
    const [refreshing, setRefreshing] = useState(false)

    const refreshCB = useCallback(val => {
        setRefreshing(val)
    }, [setRefreshing])

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
                    onRefresh={()=>{setRefreshing(true);refetchPosts()}}
                    colors={["lightblue"]}
                />}
                ListHeaderComponent={
                    <>
                        <ProfileTopBox 
                            user={user} 
                            currentUser={currentUser} 
                            refreshing={refreshing} 
                            refreshCB={refreshCB}
                            myprofile={myprofile}
                        />
                        {myprofile && <CreatePost/>}
                    </>
                }
                ListFooterComponent={
                    <>
                        {loader && <PaginationLoader/>}
                    </>
                }
            />
        </View>
        );
};  

export default ProfilePostsContainer;

const styles = {
    container:{
        flex:1,
        backgroundColor:"#1b1b1b",
        width:"100%",
        paddingTop:60,
        paddingBottom:60
    }
}