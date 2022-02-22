import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'

import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'

const ChangePassword = ({userID}) => {
    const [error, setError] = useState(null)
    const [change_password] = useMutation(CHANGE_PASSWORD)
    const [changed, setChanged] = useState(false)

    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confPass, setConfPass] = useState('')


    const handleChangePassword = () => {
        if(!validatePassword(newPass)){
            setError('Password must be between 8 and 30 characters long and should not contain whitespace')
            return
        } else if (newPass !== confPass){
            setError('Passwords must match')
            return
        } else {
            change_password({
                variables: {
                    userID: userID,
                    oldPass,
                    newPass
                }
            }).then(res => {
                if(!res?.data?.change_password?.changed && res?.data?.change_password?.error) {
                    setError(res?.data?.change_password?.error)
                }
                else {
                    setError(null)
                    setChanged(true)
                }
            })
        }
    }
    return (
        <View style={styles.box}>
            <Text style={{fontSize:16, color:"white", margin:5}}>Change password</Text>
            {error && <Text style={{backgroundColor:"#C93939", color:"white", padding:5, borderRadius:5, textAlign:'center'}}>{error}</Text>}
            {changed && <Text style={{backgroundColor:"#2EB66B", color:"white", padding:5, borderRadius:5, textAlign:'center'}}>Password changed!</Text>}
            <TextInput 
                style={styles.input}
                placeholder='Old password'
                secureTextEntry
                placeholderTextColor={'#aaa'}
                onFocus={()=>setError(null)}
                onChangeText={text => setOldPass(text)}
            />
            <TextInput 
                style={styles.input}
                placeholder='New password'
                secureTextEntry
                placeholderTextColor={'#aaa'}
                onFocus={()=>setError(null)}
                onChangeText={text => setNewPass(text)}
            />            
            <TextInput 
                style={styles.input}
                placeholder='Confirm new password'
                secureTextEntry
                placeholderTextColor={'#aaa'}
                onFocus={()=>setError(null)}
                onChangeText={text => setConfPass(text)}
            />
            <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
                <Text style={{color:"white"}}>SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChangePassword

const CHANGE_PASSWORD = gql`
    mutation ($userID: Int!, $oldPass: String!, $newPass: String!){
        change_password(userID: $userID, oldPassword: $oldPass, newPassword: $newPass){
            changed
            error
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

const validatePassword = (password) => {
    let validPass = true
    if (password.length < 8 || password.length > 30){
        validPass = false
        return validPass
        }
        for(let i = 0;i<password.length;i++){
            if(password[i] === ' '){
                validPass = false
                break
            }
        }
    return validPass
}
