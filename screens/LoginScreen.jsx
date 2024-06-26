import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import db from "../firebase/firestore_db";
import { auth } from "../firebase/firebase_auth";
import UserContext from "../contexts/UserContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {currentUser, setCurrentUser} = useContext(UserContext)

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.email)
          .get()
          .then((doc) => {
            setCurrentUser({email: user.email, data: doc.data()})
          });
        navigation.replace("LevelSelector");
      }
    });
    return unsubscribe;
  }, []);

  const goToSignUp = () => {
    navigation.replace("SignUp");
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(() => alert("Your email and/or password were incorrect"));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.titleContainer}>
        <Text style={styles.title1}>Welcome to</Text>
        <Text style={styles.title2}>LeedsYouAround</Text>
        </View>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goToSignUp();
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register instead
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    height: '10%',
    width: "80%",
    paddingTop: 0,
  },
  inputContainer: {
    height: '20%',
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: "#0782F9",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
  },
  title1: {
    fontSize: 15,
    fontWeight: "bold",
    // marginBottom: 20,
    alignSelf: "center",
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  }
});
