import React, { Component } from 'react';
import { View } from 'react-native';

const Separator = () =>{
    const { styContent } = styles;

    return(
        <View style={ styContent }>
        </View>
    );
}

const styles = {
    styContent: {
        marginRight: 3,
        marginLeft: 3
    }
}

export { Separator };