import React from 'react'
import { Text } from 'react-native'

const SetTime = ({timestamp, fontSize}) => {
    return (
        <Text style={{fontSize: fontSize}}>{getTime(timestamp)}</Text>
    )
}
export default SetTime

const getTime = (timestamp) => {
    let d = Math.floor((Date.now() - new Date(parseInt(timestamp)).getTime())/1000/60)
    if(d<=0) return 'Now'
    else if(d<60) return d+'m'
    else if(d>60 && d<60*24) return Math.floor(d/60)+'h'
    else if(d>60*24 && d<60*24*30) return Math.floor(d/(60*24))+'d'
    else if(d>60*24*30) {
        let d = new Date(parseInt(timestamp))
        return d.toDateString()
    }
}