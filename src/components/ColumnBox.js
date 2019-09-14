import React, { Component } from 'react';
import { View } from 'react-native';

const ColumnBox = (props) =>{
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
        width: '100%',
        flexDirection: 'column',
        marginTop: 30
    }
}

export { ColumnBox }