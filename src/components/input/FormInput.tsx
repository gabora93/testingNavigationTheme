import { FormControl, InputIcon, InputSlot, FormControlError, FormControlErrorText, FormControlErrorIcon, AlertCircleIcon, FormControlLabelText, FormControlHelperText, FormControlLabel, FormControlHelper, Image, Input, InputField, styled, Pressable, VStack, Center, HStack, View, Text, KeyboardAvoidingView, onChange } from '@gluestack-ui/themed';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon, } from 'lucide-react-native'


const FormInput = ({ value, keyboardType, label, type, isPassword, placeholder, helperText, errorText, isDisabled, isInvalid, isRequired, onChangeText }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    return (
        <FormControl
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            isRequired={isRequired}>
            <FormControlLabel>
                <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
            <Input variant='outline'>
                <InputField value={value} keyboardType={keyboardType} type={showPassword ? 'text' : 'password'} placeholder={placeholder} onChangeText={onChangeText} />
                {isPassword ? <InputSlot pr="$3" onPress={handleState}>
                    <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                        color="$darkBlue500"
                    />
                </InputSlot> : <InputSlot></InputSlot>}
            </Input>
            <FormControlHelper>
            </FormControlHelper>
            <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                    {errorText}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>)
}

export default FormInput