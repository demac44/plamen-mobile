import React, {useState} from 'react';
import axios from 'axios';
import { Text, TextInput, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import logo from '../../Assets/images/logo-min.jpg'

const Login = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)

  const handleLogin = () => {
    if (username === '' || pass=== ''){
      setErrorMsg('Please fill in all fields')
      return
    }
    try {
        axios({
            method: 'POST',
            url: 'http://192.168.1.56:8000/api/login',
            data: {
                username: username,
                password: pass
            },
            withCredentials: true
        }).then(res => {
            if(res?.data.error) {setErrorMsg(res.data.error)}    
            else {
              // navigation.navigate('Feed')
              return
            }
        }).catch((err)=>console.log(err))
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
      <View style={styles.header}>
        <Image source={logo}/>
        <Text style={styles.title}>Login</Text>
      </View>
      <Text style={styles.topText}>Enter your details below to login</Text>
      <View style={styles.container}>
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <TextInput 
            style={styles.input} 
            placeholder='Username' 
            placeholderTextColor='#aaa'
            onChangeText={text=>setUsername(text)}
            onFocus={()=>setErrorMsg(null)}
            />
          <TextInput 
            style={styles.input} 
            placeholder='Password' 
            placeholderTextColor='#aaa'
            onChangeText={text=>setPass(text)}
            onFocus={()=>setErrorMsg(null)}
            secureTextEntry={true}
            />
          <TouchableHighlight style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <Text style={{color:"#249ce2", fontWeight:'bold', marginLeft:3}} onPress={()=>navigation.navigate('Register')}>Register</Text>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
    input:{
        backgroundColor:"white",
        height:40,
        borderRadius:10,
        alignSelf: "stretch",
        marginTop:10,
        color:"#1b1b1b",
        padding:5,
    },
    container:{
        flex:0.50,
        alignItems: "center",
        backgroundColor:"#1b1b1b",
        padding:15,
        zIndex:1000
    },
    errorMsg:{
      backgroundColor: "#ff5050",
      padding: 10,
      borderRadius:10,
      alignSelf:"stretch",
      textAlign:"center",
      color:"white"
    },
    header:{
      backgroundColor:"#1b1b1b",
      display:"flex",
      alignItems:"flex-end",
      flexDirection:"row",
      padding:15,
      flex:0.40
    },
    title:{
      fontSize:35,
      color:"white",
      marginLeft:10
    },
    topText:{
      backgroundColor:"#1b1b1b",
      paddingLeft:15,
      paddingBottom:20,
    },
    footer:{
      flex:0.1,
      backgroundColor:"#1b1b1b",
      display:"flex",
      flexDirection:"row",
      justifyContent:'center',
      alignItems:'center',
    },
    loginBtn:{
      width:100,
      paddingBottom:8,
      paddingTop:8,
      backgroundColor: "#249ce2",
      marginTop:20,
      borderRadius:10
    },
    btnText:{
      textAlign:'center',
      color:"white",
      fontSize:18
    }
})