import React from 'react';
import {ActivityIndicator, TextStyle, View, Text, StyleSheet, Platform} from 'react-native'
import { i18n } from "../../../i18n/i18n"
import { spacing, color, typography } from "../../../theme"

export function ProgressIndicator() {
  const sizeBasedOnPlatform = (Platform.OS === 'ios') ? 'large' : 100;

  return (
    <View style={[styles.main, styles.horizontal]}>
      <View style={styles.container}>
        <ActivityIndicator size={sizeBasedOnPlatform} color={'#1f4f7b'} />
        <Text style={MESSAGE}>{i18n.t('progress.bolRefresh')}</Text>
      </View>
    </View>
  );
}

const MESSAGE: TextStyle = {
  marginTop: spacing[5],
  padding: spacing[3]
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
});
