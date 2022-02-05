import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import PaginationLoader from '../General components/Loaders/PaginationLoader';
import Post from './Post/Post';
import ProfileTopBox from '../Profile/Top box/ProfileTopBox'

const ProfilePostsContainer = ({posts, refetchPosts, loadMore, currentUser, user, myprofile}) => {
    const [refreshing, setRefreshing] = useState(false)
    const [loader, setLoader] = useState(false)

    const refreshCB = useCallback(val => {
        setRefreshing(val)
    }, [setRefreshing])

    return (
        <View style={styles.container}>
            <FlatList
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
                        <ProfileTopBox 
                            user={user} 
                            currentUser={currentUser} 
                            refreshing={refreshing} 
                            refreshCB={refreshCB}
                            myprofile={myprofile}
                        />
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
        flex:0.84,
        backgroundColor:"#1b1b1b",
        width:"100%"
    }
}