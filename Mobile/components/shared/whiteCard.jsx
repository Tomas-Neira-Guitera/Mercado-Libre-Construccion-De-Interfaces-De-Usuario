import React from 'react';
import { View, StyleSheet } from 'react-native';

const WhiteCard = ({children }) => {
    return (
        <View style={styles.loginBox}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    loginBox: {
        width:"95%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        alignSelf: "center", 
    }
});

export default WhiteCard;