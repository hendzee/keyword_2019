import React, { Component } from 'react';
import { View } from 'react-native';

const TitleBar = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            { props.children }
        </View>
    );
}

const styles = {
    styContent: {
        flex:0,
        height:31,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 19,
        marginLeft: 3,
        marginRight: 3,        
    }
}

export { TitleBar }