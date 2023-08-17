import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateProfile } from "../BackEnd/Firebase";
import {
  userEmail,
  userName,
  userProfileImage,
  userPassword,
} from "../BackEnd/Firebase";
import { AntDesign } from "@expo/vector-icons";

export default function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    setProfileImage(userProfileImage);
    setUsername(userName);
    setEmail(userEmail);
    setPassword(userPassword);
  }, []);

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const update = async () => {
    await updateProfile(profileImage, username, email, password);
    navigation.navigate("Profile");
  };

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.inner}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#C3BFBF" : "black",
                },
                styles.uploadPhotoContainer,
              ]}
              onPress={uploadPhoto}
            >
              <Text style={styles.uploadPhotoText}>Upload Photo</Text>
              <FontAwesome name="upload" size={24} color="white" />
            </Pressable>
            <View style={styles.profileContainer}>
              <Text style={styles.profileText}>Username</Text>
              <TextInput
                style={styles.textInputContainer}
                onChangeText={(text) => setUsername(text)}
                value={username}
              ></TextInput>
              <Text style={styles.profileText}>Email</Text>
              <TextInput
                style={styles.textInputContainer}
                onChangeText={(text) => setEmail(text)}
                value={email}
              ></TextInput>
              <Text style={styles.profileText}>Password</Text>
              <View
                style={[styles.textInputContainer, { flexDirection: "row" }]}
              >
                <TextInput
                  style={{ flex: 1 }}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={passwordVisible}
                />
                <Pressable
                  style={{ marginLeft: 10 }}
                  onPressIn={showPassword}
                  onPressOut={showPassword}
                >
                  <AntDesign name="eyeo" size={24} color="black" />
                </Pressable>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "#DDFFFF",
                },
                styles.updateContainer,
              ]}
              onPress={update}
            >
              <Text style={styles.updateText}>Update</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  uploadPhotoContainer: {
    flexDirection: "row",
    marginTop: 20,
    borderRadius: 10,
    padding: 8,
    elevation: 10,
  },
  uploadPhotoText: {
    marginRight: 15,
    color: "white",
  },
  profileContainer: {
    width: "90%",
    justifyContent: "flex-start",
  },
  profileText: {
    fontSize: 15,
    marginTop: 20,
  },
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    height: 40,
    padding: 10,
  },
  updateContainer: {
    marginTop: 40,
    width: "70%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  updateText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
