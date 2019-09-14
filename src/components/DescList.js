import React, { Component } from 'react';
import { View } from 'react-native';

const DescList = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            {props.children}
        </View>
    );
}

const styles = {
    styContent: {        
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        height: 75,
        justifyContent: 'center', 
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,                       
        height: 75,
        shadowOffset:{  width: 0,  height: 1,  },
        shadowColor: '#dfe4ea',
        shadowOpacity: 0.1,
        elevation: 2
    }
}

export { DescList };