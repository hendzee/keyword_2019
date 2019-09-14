import React, { Component } from 'react';
import { View } from 'react-native';

const CommonPage = (props) =>{
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
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
        marginBottom: 3
    }
}

export { CommonPage }