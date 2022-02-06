import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

import gql from 'graphql-tag'
import { useMutation } from '@apollo/client';

const win = Dimensions.get('window')

const PostMenu = ({postMenuCB, payload, currentUser, refetch, navigation}) => {
    const [delete_post] = useMutation(DELETE_POST)


    const handleDelete = () => {
        delete_post({
            variables:{
                postID: payload.postID
            }
        }).then(()=>{refetch();postMenuCB(false, {postID: null, username: null})})
    }


    return (
        <TouchableOpacity style={styles.container} onPress={()=>postMenuCB(false, {postID: null})}>
            <View style={{width:win.width, backgroundColor:"#2f2f2f", borderTopLeftRadius:20, borderTopRightRadius:20, overflow:'hidden'}}>
                <TouchableOpacity>
                    <Text style={styles.menuItem}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.push('ReportPost', {postID: payload.postID, ...currentUser})}>
                    <Text style={styles.menuItem}>Report</Text>
                </TouchableOpacity>
                
                {payload.username===currentUser.username &&
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.menuItem}>Delete</Text>
                    </TouchableOpacity>}
            </View>
        </TouchableOpacity>
    );
};

export default PostMenu;

const DELETE_POST = gql`
    mutation ($postID: Int!){
        delete_post(postID: $postID){
            postID
        }
    }
`

const styles = {
    container:{
        width:win.width, 
        height:win.height, 
        position:'absolute', 
        top:0, 
        bottom:0, 
        left:0, 
        right:0, 
        backgroundColor:"rgba(0,0,0,0.1)", 
        zIndex:1000000000000000,
        justifyContent:"flex-end"
    },
    menuItem:{
        width:"100%",
        paddingVertical:15,
        textAlign:"center",
        fontSize:18,
        backgroundColor:"#2b2b2b"
    }
}