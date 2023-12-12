import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function MenuScreen({ route, navigation }) {
    console.log(route)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Menu Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' })}
            />

            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' })}
            />
            
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here' })}
            />
        </View>
    );
}

