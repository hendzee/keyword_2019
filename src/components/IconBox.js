import React, { Component } from 'react';
import { View } from 'react-native';

const IconBox = (props) =>{
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            { props.children }
        </View>
    );
}

const styles = {
    styContent: {
        backgroundColor: '#f1f2f6', 
        padding: 3,
        borderRadius: 50
    }
}

export{ IconBox } 