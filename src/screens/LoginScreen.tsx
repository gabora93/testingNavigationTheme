import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView,
} from 'react-native';

const LoginScreen = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [status, setStatus] = useState('');

 const onSubmit = () => {
    if (username === 'admin' && password === 'password') {
      setStatus('Authentication successful!');
    } else {
      setStatus('Invalid username or password.');
    }
 };

 return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.status}>{status}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
 },
 input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
 },
 button: {
    alignItems: 'center',
    backgroundColor: '#1F4F7B',
    padding: 10,
    borderRadius: 5,
 },
 buttonText: {
    color: 'white',
    fontSize: 16,
 },
 status: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
 },
});

export default LoginScreen;