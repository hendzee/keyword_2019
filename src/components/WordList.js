import React, { Component } from 'react';
import { View } from 'react-native';

const WordList = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            { props.children }
        </View>
    );
}

const styles = {
    styContent: {
        flex: 1, 
        alignItems: 'flex-end',         
    }
}

export { WordList };