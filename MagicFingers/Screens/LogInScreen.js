import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { ImageBackground, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  LogInAccount,
  logInWithGoogle,
  resetPassword,
} from "../BackEnd/Firebase";
import { AntDesign } from "@expo/vector-icons";

const googleImage = require("../assets/Google.png");

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState("boo@gmail.com");
  const [password, setPassword] = useState("zhanyi821");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const LogIn = async () => {
    const logInStatus = await LogInAccount(email, password);
    if (logInStatus.status) {
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert(logInStatus.error);
    }
  };

  const googleLogIn = async () => {};

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const forgotPassword = () => {
    navigation.navigate("ResetPassword", { state: 0 });
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.header}>Log In</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Password"
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
              <Pressable
                style={styles.forgotPasswordContainer}
                onPress={() => {
                  forgotPassword();
                }}
              >
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "#DDFFFF",
                  },
                  styles.LogInButton,
                ]}
                onPress={LogIn}
              >
                <Text style={styles.logInText}>Log In</Text>
              </Pressable>
              <View style={styles.linecontainer}>
                <View style={styles.line} />
                <Text style={styles.textBetweenLine}>Or Log In With</Text>
                <View style={styles.line} />
              </View>
              <Pressable style={styles.imageContainer} onPress={googleLogIn}>
                <Image source={googleImage} style={styles.image}></Image>
              </Pressable>
            </View>
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
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 80,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    width: "100%",
  },
  nameInput: {
    height: 50,
    width: "90%",
    borderColor: "#000000",
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  passwordInput: {
    height: 50,
    width: "90%",
    borderColor: "#000000",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
  },
  forgotPasswordContainer: {
    width: "94%",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    marginTop: 10,
  },
  forgotPassword: {
    textAlign: "right",
  },
  LogInButton: {
    marginTop: 30,
    width: "90%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  logInText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    color: "black",
    fontWeight: "500",
  },
  linecontainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    opacity: 0.4,
  },
  textBetweenLine: {
    fontSize: 12,
    opacity: 0.4,
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    width: "80%",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: "20%",
  },
});
