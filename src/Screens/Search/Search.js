import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView} from 'react-native';
import BottomNavbar from '../../Components/Navbars/Bottom navbar/BottomNavbar';
import SearchBar from '../../Components/Search/Top navbar search/SearchBar';
import SearchContainerTN from '../../Components/Search/Top navbar search/SearchContainerTN';

const Search = ({navigation}) => {
    const [query, setQuery] = useState('')

    const queryCB = useCallback(value => {
        setQuery(value)
    }, [setQuery])


    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
            <SearchBar navigation={navigation} queryCB={queryCB}/>
            <SearchContainerTN query={query}/>
            <BottomNavbar navigation={navigation}/>
        </KeyboardAvoidingView>
    );
};

export default Search;
