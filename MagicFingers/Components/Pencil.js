import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import Slider from "@react-native-community/slider";

export default function Pencil({ onSetColor, onSetRadius }) {
  const [radius, setRadius] = useState(1);

  const onColorChange = (color) => {
    onSetColor(color);
  };

  const handleRadiusChange = (value) => {
    const roundedValue = Math.floor(value);
    setRadius(roundedValue);
    onSetRadius(roundedValue);
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
        Press the midle of color picker to confrm your color
      </Text>
      <TriangleColorPicker
        style={{ width: "80%", height: 150 }}
        onColorSelected={(color) => onColorChange(color)}
      />
      <Text style={{ marginTop: 10, fontWeight: "bold", marginBottom: 10 }}>
        Stroke
      </Text>
      <Text style={{ marginTop: 10 }}>{radius}</Text>
      <Slider
        value={1}
        style={{ width: 200, marginBottom: 10, height: 50 }}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="black"
        maximumTrackTintColor="black"
        onValueChange={handleRadiusChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 77,
    left: 20,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#E9FFFF",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    width: 100,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
