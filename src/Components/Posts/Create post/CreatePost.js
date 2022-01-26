import React, { useCallback, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import axios from 'axios'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import VideoPreview from './components/VideoPreview'
import ImagePreview from './components/ImagePreview'
import UploadImage from './components/UploadImage'
import UploadVideo from './components/UploadVideo'

const CreatePost = ({refetchPosts, currentUser}) => {
    const [emptyErr, setEmptyErr] = useState(false)
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null)
    const [sizeError, setSizeError] = useState(false)
    const [lengthErr, setLengthErr] = useState(false)
    const [postText, setPostText] = useState('')
    const [mention_notif] = useMutation(MENTION_NOTIF)

    const [new_post] = useMutation(NEW_POST)



    const handleSubmit = async () => {      

        if(postText.trim().length < 1 && !image && !video){
            setEmptyErr(true)
        }else if (postText.length > 5000) {
            setLengthErr(true)
        } else {
            if (image){
                const data =  {
                    "file": {name: image.fileName, size: image.fileSize, uri: image.uri, type: image.type}, 
                    "upload_preset": "z8oybloj", 
                    "folder": "Posts", 
                    "cloud_name": "de5mm13ux"
                }

                // const newData = {name: image.fileName, size: image.fileSize, uri: image.uri, type: image.type}

                const base64 = `data:${image.type};base64,${image.base64}`

                // data.append("file", base64)
                // data.append("upload_preset", "z8oybloj")
                // data.append("folder", "Posts")
                // data.append("cloud_name", "de5mm13ux")
                // data.append("resource_type", "image")
                await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
                .then(res => {
                    setLoading(true) 
                    new_post({
                        variables: {
                            userID: currentUser.userID,
                            text: cleanText(postText),
                            url: res.data.url,
                            type:'image'
                        }
                    })   
                    .then(res=>{
                        findTag(postText).forEach(tag=>{
                            mention_notif({
                                variables:{
                                    userID: currentUser.userID,
                                    postID: res.data?.new_post?.postID,
                                    username: currentUser.username,
                                    pfp: '',
                                    rusername: tag
                                }
                            })
                        })
                    })   
                    .then(()=>{
                        setVideo(null)
                        setImage(null )
                        setPreview(null)
                        setLoading(false)
                        refetchPosts()
                        setPostText('')
                    }
                    )}).catch(err => console.log(err.message))
            } else if (video) {
                setLoading(true) 
                const data = new FormData()
                data.append("file", video)
                data.append("upload_preset", "z8oybloj")
                data.append("folder", "Video posts")
                axios.post(`https://api.cloudinary.com/v1_1/de5mm13ux/video/upload`, data)
                .then(res => {
                    new_post({
                        variables: {
                            userID: userID,
                            text: cleanText(postText),
                            url: res.data.url,
                            type:'video'
                        }
                    })      
                    .then(res=>{
                        findTag(postText).forEach(tag=>{
                            mention_notif({
                                variables:{
                                    userID: userID,
                                    postID: res.data?.new_post?.postID,
                                    username: currentUser.username,
                                    pfp: '',
                                    rusername: tag
                                }
                            })
                        })
                    })
                    .then(()=>{
                        setVideo(null)
                        setImage(null )
                        setPreview(null)
                        setLoading(false)
                        refetchPosts()
                        setPostText('')
                    })
                })
            } else {
                new_post({
                    variables: {
                        userID: currentUser.userID,
                        text: cleanText(postText),
                        url: '',
                        type:'text'
                    }
                })
                .then(res=>{
                    findTag(postText).forEach(tag=>{
                        mention_notif({
                            variables:{
                                userID: userID,
                                postID: res.data?.new_post?.postID,
                                username: currentUser.username,
                                pfp: '',
                                rusername: tag
                            }
                        })
                    })
                })
                .then(()=>{
                        refetchPosts()
                        setPostText('')
                })
            }
        }
    }


    const imageCB = useCallback(val => {
        setImage(val)
    }, [])
    const videoCB = useCallback(val => {
        setVideo(val)
    }, [])
    const previewCB = useCallback(val => {
        setPreview(val)
    }, [])
    const sizeErrorCB = useCallback(val => {
        setSizeError(val)
    }, [])

    return (
        <View style={styles.box}>
            {sizeError && <Text style={styles.errorMsg}>File is too large! Max. size: 30MB</Text>}
            {lengthErr && <Text style={styles.errorMsg}>Post too long! Max. characters: 5000</Text>}
            {loading ? <Text>Loading...</Text> :
                <>
                    <TextInput
                        value={postText}
                        style={styles.input} 
                        placeholder="Add new post..."
                        placeholderTextColor="#aaa"
                        multiline={true}
                        onFocus={()=>{setEmptyErr(false);setSizeError(false);setLengthErr(false)}}
                        onChangeText={text=>setPostText(text)}
                    />
                    
                    {(video && preview) && 
                        <VideoPreview 
                                videoCB={imageCB} 
                                previewCB={previewCB} 
                                preview={preview}
                        />}

                    {(preview && image)&& 
                        <ImagePreview 
                            imageCB={videoCB} 
                            previewCB={previewCB} 
                            preview={preview}
                        />}

                    <View style={styles.btnsBox}>
                        <View style={styles.uploadBtns}>
                            <UploadImage 
                                imageCB={imageCB} 
                                videoCB={videoCB} 
                                previewCB={previewCB} 
                                sizeErrorCB={sizeErrorCB}
                                />
                            <UploadVideo 
                                imageCB={imageCB} 
                                videoCB={videoCB} 
                                previewCB={previewCB} 
                                sizeErrorCB={sizeErrorCB}
                                />        
                        </View>
                        <TouchableOpacity style={styles.postBtn} onPress={handleSubmit}>
                            <Text>POST</Text>
                        </TouchableOpacity>
                    </View>
                </>}
        </View>
    )
}
export default CreatePost

const NEW_POST = gql`
    mutation ($userID: Int!, $text: String!, $url: String!, $type: String!){
        new_post(userID: $userID, post_text: $text, url: $url, type: $type){
            postID
        }
    }
`

const MENTION_NOTIF = gql`
    mutation ($postID: Int!, 
              $userID: Int!, 
              $username: String!, 
              $rusername: String!,
              $pfp: String!){
        mention_notification (postID: $postID, 
                              sender_id: $userID, 
                              username: $username, 
                              receiver_username: $rusername
                              profile_picture: $pfp){
            postID
        }
    }
`

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const findTag = (post_text) => {
    let arr = post_text.split('')
    let namesArr = [];
    let name=null;
    for(let i = 0;i<arr.length;i++){
        name=null;
        if(arr[i]==='@'){
            for(let j=i;j<arr.length;j++){
                if(arr[j]===' ') {name=post_text.slice(i+1,j); break}
                else if(j===arr.length-1) {name=post_text.slice(i+1,j+1); break}
                else if(j===arr.length) {name=post_text.slice(i+1,-1); break}
            }
            name && namesArr.push(name)
        }
    }
    return namesArr.filter(onlyUnique)
}

const cleanText = (text) => {
    text = text.replace('"', "''");
    text = text.replace('@', ' @')
    if(text.includes('<')){
        text = text.replace('<', '<\u200b')
    }

    return text
}

const styles = StyleSheet.create({
    box:{
        width:"100%",
        padding:5,
        borderWidth:1,
        borderColor:"#2f2f2f"
    },
    input:{
        width:"100%",
        height:50,
        backgroundColor:"white",
        color:"#1b1b1b",
        borderRadius:3
    },
    btnsBox:{
        width:"100%",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:15
    },
    postBtn:{
        backgroundColor:"#104b41",
        padding:5,
        width:40,
        borderRadius:5,
    },
    uploadBtns:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    errorMsg:{
        backgroundColor:"#ff5050",
        padding:5,
        borderRadius:5,
        marginBottom:5,
        color:"white"
    }
})

