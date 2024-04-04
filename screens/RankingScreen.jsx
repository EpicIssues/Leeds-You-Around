import React from 'react';
import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';

function Rankings() {
  return (
    <View style={styles.main}>
        <View style={styles.navigation}>
            <Text style={styles.title}>Rankings</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.one}>
                <Text style={styles.buttonTxt}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.two}>
                <Text style={styles.buttonTxt}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.three}>
                <Text style={styles.buttonTxt}>3</Text>
              </TouchableOpacity>
            </View> 
        </View>
        <View style={styles.timeTable}>
        <Text style={[styles.timeTitle, styles.centeredText]}>Time</Text>

        </View>
        <View style={styles.distanceTable}>
          <Text style={[styles.distanceTitle, styles.centeredText]}>Distance</Text>
        </View>
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.buttonTxt}>
          Logout
          </Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
main:{
  height:"100%",
  backgroundColor:"#e7e7e7"
},
title:{
  alignSelf:'center',
  marginBottom:30,
  fontSize:30
},
navigation:{
  width:"80%",
  flexDirection:'column',
  width:'80%',
  alignSelf:'center',
  marginTop:100,
  justifyContent:'center',
  marginBottom:10
},
buttonContainer:{
  flexDirection:'row',
  height:100,
  borderRadius:20,
  borderRadius:30,
  overflow:'hidden',
  borderWidth: 3,
  borderColor: "#eee",
},
one: {
  flex: 1,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  borderRightWidth: 1,
},
two: {
  flex: 1,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  borderRightWidth: 1,
},
three: {
  flex: 1,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
},
timeTable:{
  height:"25%",
  backgroundColor:'white',
  width:"80%",
  alignSelf:'center',
  marginBottom:10,
  borderRadius:10
},
distanceTable:{
  height:"25%",
  width:"80%",
  alignSelf:'center',
  backgroundColor:'white',
  borderRadius:10,
  marginBottom:10
},
centeredText:{
  textAlign:'center',
  fontSize:30
},
logout:{
  backgroundColor:'#89cff0',
  alignSelf:'center',
  justifyContent:'center',
  padding:30,
  borderRadius:20,
  borderWidth: 1,
  borderColor: "white",
  fontSize:20
},
buttonTxt:{
  fontSize:30
}
})
export default Rankings