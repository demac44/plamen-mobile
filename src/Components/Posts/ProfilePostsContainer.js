import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PaginationLoader from '../General components/Loaders/PaginationLoader';
import Post from './Post/Post';
import ProfileTopBox from '../Profile/Top box/ProfileTopBox'

const ProfilePostsContainer = ({posts, refetchPosts, loadMore, currentUser, user}) => {
    const [refreshing, setRefreshing] = useState(false)
    const [loader, setLoader] = useState(false)

    const refreshCB = useCallback(val => {
        setRefreshing(val)
    }, [setRefreshing])

    return (
            <FlatList
                style={styles.container}
                data={posts}
                initialNumToRender={10}
                renderItem={({item}) => <Post post={item} key={item.postID} currentUser={currentUser}/>}
                onEndReached={()=>loadMore()}
                refreshControl={                    
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={()=>{setRefreshing(true);refetchPosts()}}
                    colors={["lightblue"]}
                />}
                ListHeaderComponent={
                    <>
                        <ProfileTopBox user={user} currentUser={currentUser} refreshing={refreshing} refreshCB={refreshCB}/>
                    </>
                }
                ListFooterComponent={
                    <>
                        {loader && <PaginationLoader/>}
                    </>
                }
            />
        );
};  

export default ProfilePostsContainer;

const styles = {
    container:{
        flex:0.84,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
}