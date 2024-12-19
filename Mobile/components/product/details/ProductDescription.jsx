import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProductDescription = ({ description }) => {

  return (
    <View>
      <View>
        <Text style={styles.title}>Descripción</Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24, 
    fontWeight: "400",
    marginBottom: 1,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 18
  },
});
