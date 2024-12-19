import React from 'react';
import { Text, TextInput} from 'react-native';

const FormInput = ({ label, placeholder, type, styleText, styleInput, value, onChangeText}) => {
    return (
        <>
            <Text style={styleText}>{label}</Text>
            <TextInput
                style={styleInput}
                placeholder={placeholder}
                keyboardType={type}
                autoCapitalize="none"
                value={value} 
                onChangeText={onChangeText}
            />
        </>
    );
};
export default FormInput;