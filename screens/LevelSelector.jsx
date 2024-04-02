import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Map from "../components/Map";
// import { useContext } from 'react';
import { useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import LevelContext from "../contexts/LevelContext";
import { useState } from "react";
// const value = useContext(ThemeContext)

// console.log(Map,'--line 4')
// export default function QuestLevelPage() {
//     return (
//         <View style={styles.mainContainer}>
//             <Text style={styles.header}>Quests/Levels</Text>
//             <View style={styles.questStuff}>
//                 <Link href="/MapScreen" style={styles.devSkipBtn}>
//                     <Text>To Map View</Text>
//                 </Link>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "white",
//     },
//     header: {
//         marginVertical: 10,
//     },
//     questStuff: {
//         backgroundColor: "gold",
//         width: "90%",
//         height: "80%",
//         padding: 20,
//         borderRadius: 20,
//     },
//     devSkipBtn: {
//         backgroundColor: "white",
//         color: "black",
//         height: 30,
//         width: 150,
//         flex: 1,
//         textAlign: "center",
//         lineHeight: 30,
//         borderRadius: 20,
//         position: "absolute",
//         bottom: 40,
//         right: 30
//     }
// });

export default function LevelSelector() {
    // const [currentLevel, setCurrentLevel] = useState('one')
    // console.log(value, 'line 56--')
    const navigation = useNavigation()
    const {currentLevel, setCurrentLevel} = useContext(LevelContext)
    // console.log(currentLevel);
    // setCurrentLevel('two')
    console.log(currentLevel);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.hero}>
          <Text>Which level</Text>

          <View style={styles.levelSelector} height="30%" width="80%">
            <TouchableOpacity
              style={styles.one}
              onPress={() => setCurrentLevel(0)}
            >
              <Text>1X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.two}
              onPress={() => setCurrentLevel(1)}
            >
              <Text>2X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.three}
              onPress={() => setCurrentLevel(2)}
            >
              <Text>3X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mapView}>
          <Map
            style={styles.map}
            initialRegion={{
              latitude: 53.79543,
              longitude: -1.54765,
              latitudeDelta: 0.05,
              longitudeDelta: 0.02,
            }}
          />
        </View>
        <View style={styles.itemListContainer} height="30%" width="100%">
          <View></View>
          <View style={styles.buttonsContainer} height="20%" width="80%">
            <TouchableOpacity style={styles.backBtn}>
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace("CameraScreen")} style={styles.goBtn}>
              <Text>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    hero:{
        height:"30%",
        backgroundColor:"#eee",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"20%"
    },
    levelSelector:{
        borderColor: 'black',
        borderWidth: 1,
        flexDirection:'row',
        borderRadius:30,
        overflow:'hidden'
        
    },
    one:{
        flex:1,
        backgroundColor:'white',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    two:{
        flex:1,
        backgroundColor:'#eee',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    three:{
        flex:1,
        backgroundColor:'white',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    map:{
        backgroundColor:'#eee',
        height:"50%",
        width:"50%",
    },
    mapView:{
        backgroundColor:"#eee",
        justifyContent:'center',
        alignItems:'center',
        height:"30%",
        width:"100%"
    },
    itemListContainer:{
        backgroundColor:'#eee',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    buttonsContainer:{
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginBottom:20,
        height:"20%",
        borderRadius:5,
        overflow:'hidden',
    },
    backBtn:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    goBtn:{
        backgroundColor:'#e9e9e9',
        height:"100%",
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});
