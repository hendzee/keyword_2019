import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const DetailList = (props) => {
    const { styContent } = styles;

    return(
        <View style={ styContent }>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({    
    styContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',                    
        height: 75,
        marginBottom: 10,
    }
})

export { DetailList };