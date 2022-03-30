import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'

const ChangeNames = ({usernm, navigation, user, refetch, userID}) => {
    const [fname, setFname] = useState(user.first_name)
    const [lname, setLname] = useState(user.last_name)
    const [username, setUsername] = useState(user.username)
    const [errorMsg, setErrorMsg] = useState(null)
    const [edit_info] = useMutation(EDIT_INFO)

    const handleEdit = () => {

        let empty = false
        let shouldLogOut = false
        let arr = [username, fname, lname]

        arr.forEach(field => {
            let trimmed = field.trim()
            if (trimmed === '') {
                empty = true
                return
            }
        })

        if(username!==usernm) shouldLogOut=true
        
        if (empty){
            setErrorMsg('Please fill in all fields')
        } else if (validateNames(fname, lname)){
            setErrorMsg('First name and last name can contain only letters, not numbers, whitespace or any other special characters and cannot be longer than 20 characters!')
        } else if (!validateUsername(username)){
            setErrorMsg('Username must contains only lowercase letters, numbers, underscores and dots and cannot be longer than 30 characters')
        } else {
            try {
                edit_info({
                    variables: {
                        userID: userID,
                        fname: fname.charAt(0).toUpperCase() + fname.slice(1),
                        lname: lname.charAt(0).toUpperCase() + lname.slice(1),
                        username,
                    }
                }).then(res => {
                    if(res?.data.error) {setErrorMsg(res.data.error);return}
                    if(shouldLogOut){
                        AsyncStorage.clear()
                        navigation.replace('Login')
                        return
                    } else refetch()
                    
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <View style={styles.box}>
            <Text style={{fontSize:16, color:"white", margin:5}}>Change name and username</Text>
            {errorMsg && <Text style={{backgroundColor:"#C93939", color:"white", padding:5, borderRadius:5, textAlign:'center'}}>{errorMsg}</Text>}
            <TextInput 
                style={styles.input}
                placeholder='First name'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setFname(text)}
                defaultValue={fname}
            />
            <TextInput 
                style={styles.input}
                placeholder='Last name'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setLname(text)}
                defaultValue={lname}
            />            
            <TextInput 
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={'#aaa'}
                onChangeText={text => setUsername(text)}
                defaultValue={username}
            />
            <TouchableOpacity style={styles.btn} onPress={handleEdit}>
                <Text style={{color:"white"}}>SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChangeNames


const validateUsername = (username) => {
    let username_valid = true
    let chars = "._abcdefghijklmnopqrstuvwxyz0123456789"
    for(let i=0;i<username.length;i++){
        if (!chars.includes(username[i]) || username.length > 30){
            username_valid = false
            break
        }
    }
    return username_valid
}

const validateNames = (fname, lname) => {
    let error = false
    let chars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=0123456789"
    if (fname.length > 20 || lname.length > 20){
        error = true
        return error
    }
    for(let i = 0;i<fname.length;i++){
        if (chars.includes(fname[i]) || fname[i] === ' '){
            error=true
            return error
        }
    }
    for(let i = 0;i<lname.length;i++){
        if (chars.includes(lname[i])){
            error=true
            return error
        }
    }
    return error
}


const EDIT_INFO = gql`
    mutation ($userID: Int!, $fname: String, $lname: String, $username: String){
        edit_info(userID: $userID, first_name: $fname, last_name: $lname, username: $username){
            userID
        }
    }
`

const styles = {
    box:{
        width:"100%", 
        padding:5, 
        borderWidth:1, 
        borderColor:"#2f2f2f", 
        marginTop:10
    },
    input:{
        width:"100%", 
        height:35, 
        backgroundColor:"white", 
        borderRadius:5, 
        color:"#1b1b1b", 
        marginTop:10
    },
    btn:{
        paddingHorizontal:10, 
        paddingVertical:5, 
        backgroundColor:"#1D7EBC", 
        marginTop:10, 
        alignSelf:'flex-end', 
        borderRadius:5, 
        marginBottom:5
    }
}