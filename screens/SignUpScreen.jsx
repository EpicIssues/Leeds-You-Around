import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import db from "../db/firestore";
import { auth } from "../firebase";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);

  const navigation = useNavigation();

  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obj = await db.collection("users").get();
        const usersData = obj.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const goToLogin = () => {
    navigation.replace("Login");
  };

  const handleSignUp = () => {
    if (!err) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          return db.collection("users").doc(username).set({
            username: username,
            level1comp: false,
            level2comp: false,
            level3comp: false,
            level1route: [],
            level2route: [],
            level3route: [],
          });
        })
        .catch((error) => alert(error.message));
    }
    else {
      alert('Please fix errors and try again!')
    }
  };

  // Check if passwords don't match or username is taken
  const isErr =
    (password2 && password !== password2) ||
    (username && users.some((user) => user.username === username));

  useEffect(() => {
    setErr(isErr);
  }, [isErr]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Register</Text>

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
        <TextInput
          placeholder="Confirm password"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={[styles.errorMessage, { color: "red" }]}>
          {password2 && password !== password2 && "Passwords don't match"}
        </Text>

        <TextInput
          placeholder="Choose a username"
          value={username}
          onChangeText={(text) => setUsername(text.toLowerCase())}
          style={styles.input}
        />
      </View>
      <Text style={[styles.errorMessage, { color: "red" }]}>
        {users.some((user) => user.username === username) &&
          "Username is already taken"}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSignUp();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goToLogin();
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Login instead
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
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
    marginTop: 40,
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
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
});
