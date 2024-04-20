import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase/firebase_auth";
import "firebase/firestore";
import db from "../firebase/firestore_db";
import UserContext from "../contexts/UserContext";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const currentUser = useContext(UserContext)

  /// getting users data into users state
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
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {/* {users.map((user) => (
        <Text>
          {user.username +
            " L1: " +
            user.level1comp +
            " L2: " +
            user.level2comp
          + ' L3: ' +user.level3comp}
        </Text>
      ))} */}
      <Text>Email: {auth.currentUser?.email} </Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};



export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
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
});
