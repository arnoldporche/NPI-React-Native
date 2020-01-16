import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class ActionBarImage extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{
                        uri: 'https://s3-us-west-1.amazonaws.com/fraymework/multimedia/images/icons/apps/npicheck.png',
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40 / 2,
                        marginLeft: 15,
                    }}
                />
            </View>
        );
    }
}