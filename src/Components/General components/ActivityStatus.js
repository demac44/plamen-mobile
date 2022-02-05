import React from 'react';
import { Text, View } from 'react-native';

const ActivityStatus = ({last_seen}) => {
    return (
        <View style={{marginLeft:20, flexDirection:'row', alignItems:'center'}}>
            <View style={{backgroundColor: (getTime(last_seen)==='online') ? 'green' : 'darkred', width:8, height:8, borderRadius:50, marginRight:5}}></View>
            {(getTime(last_seen)==='online') ? <Text>Online</Text> : <Text>Last online {getTime(last_seen)}</Text>}
        </View>
    );
};

export default ActivityStatus;

const getTime = (timestamp) => {
    let utcSeconds = parseInt(timestamp);
    utcSeconds = new Date(utcSeconds).getTime()
    let d = Date.now() - utcSeconds
    d = Math.floor((d/1000)/60)
    if(d===0) return 'online'
    else if (d<3) return 'online'
    else if(d<60 && d>3) return d+'m ago'
    else if(d>60 && d<60*24) return Math.floor(d/60)+'h ago'
    else if(d>60*24 && d<60*24*30) return Math.floor(d/(60*24))+'d ago'
    else if(d>60*24*30) {
        let d = new Date(utcSeconds)
        return d.toDateString()
    }
}