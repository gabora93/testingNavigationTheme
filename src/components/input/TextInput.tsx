import React, { useState } from 'react';

import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, Text, StyleSheet } from 'react-native';
import {  View, InputField, Input } from '@gluestack-ui/themed';

import { useController, useFormContext, ControllerProps, UseControllerProps } from 'react-hook-form';
import FormInput from './FormInput'
import Constants from 'expo-constants';
import { i18n } from '../../i18n/i18n';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string
  name: string
  defaultValue?: string
  setFormError: Function
  isPassword: boolean
}

const ControlledInput = (props: TextInputProps) => {
    const [formError, setError] = useState<Boolean>(false)

  const formContext = useFormContext();
  const { formState } = formContext;

  const {
  name,
  label,
  rules,
  defaultValue,
  placeholder,
  keyboardType,
  isPassword,
  ...inputProps
} = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (

  <View w="100%" >
    <View >
        {/* <Input>
        <InputField
        autoCapitalize="none"
        textAlign="left"
        style={styles.input}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
        </Input> */}
         <FormInput value={field.value} label={label}
                        type={keyboardType} placeholder={placeholder} 
                        helperText={'undefined'}  
                        isDisabled={false} isInvalid={false} 
                        isRequired={true} onChangeText={field.onChange}
                        isPassword={isPassword}
                        keyboardType={keyboardType}
                        {...inputProps} ></FormInput>


      <View style={styles.errorContainer}>
        {hasError && (<Text style={styles.error}>{formState.errors[name].message}</Text>)}
      </View>

    </View>
  </View>

  );
}

export const TextInput = (props: TextInputProps) => {

const {
  name,
  rules,
  label,
  defaultValue,
  setFormError,
  ...inputProps
} = props;

const formContext = useFormContext();

// Placeholder until input name is initialized
if (!formContext || !name) {
  const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
	console.error(msg)
  setFormError(true)
  return null
}

return <ControlledInput {...props} />;

};


const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  container: {
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '$light100',
    borderColor: 'white',
    borderWidth: 1
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorContainer: {
    flex: -1,
    height: 25
  },
  error: {
    color: 'red'
  }
});