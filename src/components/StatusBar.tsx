import React, { Component } from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';

export function Statusbar() {
        return (
            <View style={styles.StatusBar}>
                <StatusBar translucent barStyle="light-content" />
            </View>
        );
}

const styles = StyleSheet.create({
    StatusBar: {
        height: Constants.statusBarHeight,
        backgroundColor: '#1f4f7b'
    }
});