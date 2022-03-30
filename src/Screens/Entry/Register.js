import axios from 'axios';
import React, {useState} from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import logo from '../../Assets/images/logo-min.jpg'
import DatePicker from 'react-native-date-picker'

const Register = ({navigation}) => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [gender, setGender] = useState('male')
  const [date, setDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    const birth_date = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay();

    if (validateNames(fname, lname)){
        setLoading(false)
        setErrorMsg('Name can contain only letters and cannot be longer than 30 characters!')
    } else if (validateAge(date) < 13) {
        setLoading(false)
        setErrorMsg('You must be at least 13 years old to register')
    } else if (!validateEmail(email)) {
        setLoading(false)
        setErrorMsg('Email not valid')
    } else if (!validateUsername(username.toLowerCase())){
        setLoading(false)
        setErrorMsg('Username can contain letters, numbers, underscores and dots, cannot be empty or longer than 30 characters')
    } else if (!validatePassword(pass)){
        setLoading(false)
        setErrorMsg('Password must be between 8 and 30 characters long and should not contain whitespace')
    } else if (!confirmPass(pass, confPass)) {
        setLoading(false)
        setErrorMsg('Passwords must match')
    } else {
        try {
            axios({
                method:'POST',
                url: 'https://plamen-main.herokuapp.com/api/register',
                data: {
                    username: username.toLowerCase(),
                    fname, 
                    lname,
                    email,
                    password: pass,
                    birth_date,
                    gender
                }
            }).then(res => {
                if(res?.data.error){
                  setLoading(false)
                  setErrorMsg(res.data.error)
                } else {
                    navigation.navigate('Login')
                }
            }).catch(err => console.log(err))        
          } catch (error) {
          console.log(error);
          setLoading(false)
        }
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Image source={logo}/>
        <Text style={styles.title}>Register</Text>
      </View>

      <Text style={styles.topText}>Enter your details below to register</Text>

      <DatePicker
        modal
        open={open}
        date={date}
        mode='date'
        textColor='white'
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

      <View style={styles.container}>
          {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <View style={styles.inputBox}>
            <TextInput 
                style={{...styles.input, width:"49%"}} 
                placeholder='First name' 
                placeholderTextColor='#aaa'
                onChangeText={text=>setFname(text)}
                onFocus={()=>setErrorMsg(null)}
              />            
            <TextInput 
                style={{...styles.input, width:"49%", marginLeft:5}} 
                placeholder='Last name' 
                placeholderTextColor='#aaa'
                onChangeText={text=>setLname(text)}
                onFocus={()=>setErrorMsg(null)}
              />  
          </View>

          <View style={styles.inputBox}>
            <View style={styles.genderBox}>
              <TouchableHighlight style={{...styles.genderBtn, backgroundColor: gender==='male' ? "#249ce2" : "white"}} onPress={()=>setGender("male")}>
                <Text style={{color:"#3f3f3f"}}>Male</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{...styles.genderBtn, backgroundColor: gender==='female' ? "#249ce2" : "white"}} onPress={()=>setGender("female")}>
                <Text style={{color:"#3f3f3f"}}>Female</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight onPress={()=>setOpen(true)} style={styles.birthDateBtn}>
              <Text style={{color:"#3f3f3f"}}>Birth date</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.inputColBox}>
            <TextInput 
              style={styles.input} 
              placeholder='Email' 
              placeholderTextColor='#aaa'
              onChangeText={text=>setEmail(text)}
              onFocus={()=>setErrorMsg(null)}
              />
            <TextInput 
              style={styles.input} 
              placeholder='Username' 
              placeholderTextColor='#aaa'
              onChangeText={text=>setUsername(text)}
              onFocus={()=>setErrorMsg(null)}
              />
          </View>
          <View style={styles.inputBox}>
            <TextInput 
              style={{...styles.input, width:"49%"}} 
              placeholder='Password' 
              placeholderTextColor='#aaa'
              onChangeText={text=>setPass(text)}
              onFocus={()=>setErrorMsg(null)}
              secureTextEntry={true}
              />
            <TextInput 
              style={{...styles.input, width:"49%"}} 
              placeholder='Confirm password' 
              placeholderTextColor='#aaa'
              onChangeText={text=>setConfPass(text)}
              onFocus={()=>setErrorMsg(null)}
              secureTextEntry={true}
              />
          </View>
      </View>


      <View style={styles.footer}>
        <TouchableHighlight style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableHighlight>
        <View style={{display:"flex", flexDirection:"row", padding:15}}>
          <Text>Already have an account?</Text>
          <Text style={{color:"#249ce2", fontWeight:'bold', marginLeft:3}} onPress={()=>navigation.navigate('Login')}>Login</Text>
        </View>
      </View>
    </>
  );
};

export default Register;


const styles = StyleSheet.create({
  header:{
    backgroundColor:"#1b1b1b",
    display:"flex",
    alignItems:"flex-end",
    flexDirection:"row",
    padding:15,
    flex:0.2
  },
  container:{
    flex:0.6,
    alignItems: "center",
    justifyContent:'center',
    backgroundColor:"#1b1b1b",
    padding:15,
    zIndex:1000,
  },
  footer:{
    flex:0.2,
    backgroundColor:"#1b1b1b",
    display:"flex",
    justifyContent:'space-between',
    alignItems:'center'
  },
  input:{
    backgroundColor:"white",
    height:35,
    borderRadius:10,
    marginTop:10,
    color:"#1b1b1b",
    padding:5,
  }, 
  errorMsg:{
    backgroundColor: "#ff5050",
    padding: 10,
    borderRadius:10,
    alignSelf:"stretch",
    textAlign:"center",
    color:"white"
  },
  title:{
    fontSize:35,
    color:"white",
    marginLeft:10
  },
  topText:{
    backgroundColor:"#1b1b1b",
    paddingLeft:15,
  },
  registerBtn:{
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
  },
  inputBox:{
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  birthDateBtn:{
    width:"49%",
    backgroundColor:"white",
    height:35,
    marginTop:10,
    borderRadius:10,
    marginLeft:5,
    display:'flex',
    justifyContent:"center",
    alignItems:"center"
  },
  genderBox:{
    width:"49%",
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:35,
    padding:5,
    backgroundColor:"white",
    borderRadius:10,
    marginTop:10,
  },
  genderBtn:{
    width:"50%",
    height:25,
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
  },
  inputColBox:{
    width:"100%"
  }
})


const validateEmail = (email) => {
  let valid_email = true
  let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(!re.test(email.toLowerCase()) || email > 255){
      valid_email = false
      return valid_email
  }
  return valid_email
}
const validateUsername = (username) => {
  let username_valid = true
  let chars = "._abcdefghijklmnopqrstuvwxyz0123456789"
  for(let i=0;i<username.length;i++){
      if (!chars.includes(username[i]) || username.length > 30){
          username_valid = false
          break
      }
  }
  if(username.length === 0) username_valid=false
  return username_valid
}

const validateNames = (fname, lname) => {
  let error = false
  let chars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=0123456789"
  if (fname.length > 30 || lname.length > 30 || lname.length === 0 || fname.length === 0){
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

const validateAge = (birth_date) => {
  return Math.floor((new Date() - new Date(birth_date).getTime()) / 3.15576e+10)
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
  
const confirmPass = (password, passconfirm) => {
  let confirm = true
  if (password !== passconfirm){
      confirm = false
      return confirm
  }
  return confirm
}