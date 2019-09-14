import React, { Component } from 'react';
import { View } from 'react-native';

const ImageList = (props) => {
    const { styImageBox } = styles;

    return(
        <View style={ styImageBox }>
            {props.children}
        </View>
    );
}

const styles = {
    styImageBox: {
        flex: 0,
        marginLeft: 7,
        marginTop: 2.5,
        marginRight: 7.5,
        marginBottom: 2.5,
        height: 75,
        justifyContent: 'center',        
    }
}

export { ImageList };