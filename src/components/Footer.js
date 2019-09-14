import React, { Component } from 'react';
import { View } from 'react-native';

const Footer = (props) => {
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
        justifyContent: 'flex-end'                            
    }
}

export { Footer }