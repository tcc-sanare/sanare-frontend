import Colors from '@/constants/Colors';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/profile-photo.jpg')}
                    style={styles.profileImage}
                />

                <View></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background
    },
    header: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    profileImage: {
        resizeMode: 'contain',
        width: 350
    }
})