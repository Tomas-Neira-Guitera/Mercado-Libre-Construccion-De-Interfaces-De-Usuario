import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProductCharacteristicsInfo = ({ characteristics }) => {

  return (
    <View>
      <Text style={styles.title}>Características del producto</Text>
      <View style={styles.line} />
      {characteristics.map((characteristic, index) => (
        <View style={styles.characteristic} key={index}>
          <Text style={styles.characteristicName}>{`${characteristic.name}:`}</Text>
          <Text style={styles.characteristicValue}>{characteristic.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24, 
    fontWeight: "400",
    marginBottom: 1,
    marginTop: 12,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  characteristic: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  characteristicName: {
    fontSize: 18, 
    fontWeight: "400",
    marginRight: 8,
  },
  characteristicValue: {
    fontSize: 18,
  },
});
