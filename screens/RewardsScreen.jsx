import React, { useContext, useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity, LogBox } from 'react-native';
import Map from "../components/Map";
import UserContext from "../contexts/UserContext";
import LevelNumberContext from "../contexts/LevelNumberContext";
import MapView, { Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import db from '../db/firestore';
import { doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { all } from 'axios';
import { useNavigation } from '@react-navigation/native';



function Rewards() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {levelNumber, setLevelNumber} = useContext(LevelNumberContext)
    const [polylineData, setPolylineData] = useState(null)

    const navigation = useNavigation()
    
    const level1Complete = currentUser.data.level1comp
    const level2Complete = currentUser.data.level2comp
    const level3Complete = currentUser.data.level3comp

    const docRef = doc(db, "users", currentUser.email)
    
useEffect (() => {
    const fetchData = async () => {
        try {
            const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const allData = docSnap.data()
            // console.log(allData, "-----docSnap in rewards");
            // console.log(allData.level2route, "-----routeData");
            if (levelNumber === 1){
                setPolylineData(allData.level1route)
            }
            if (levelNumber === 2){
                setPolylineData(allData.level2route)
            }
            if (levelNumber === 3){
                setPolylineData(allData.level3route)
            }
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    fetchData();
} , [])

const backToHandler = () => {
    navigation.replace("MapScreen")
}

    // console.log(polylineData);

    return (
    <View style={styles.main}>
        <View style={styles.statsContainer}>
            {/* <View><Text>Distance</Text></View> */}
            {/* <View styles={styles.durationContainer}> */}
            <Text style={styles.congrats}>
                    You did it!
                </Text>
                <Text style={styles.timeAndDistanceText}>
                    Route 2 time: 
                </Text>
                <Text style={styles.timeAndDistanceText}>
                17 mins 39 secs
                </Text>
            {/* </View> */}
        </View>
        <View style={styles.mapView}>
        <MapView
            style={styles.map} 
            provider={PROVIDER_GOOGLE} 
            initialRegion={{
                latitude: 53.792660191135305,
                longitude: -1.563090465482172,
                latitudeDelta: 0.04,
                longitudeDelta: 0.02,}}
        >
            <Polyline 
            coordinates={polylineData}
            strokeColor="#000"
            fillColor="rgba(255,0,47,1)"
            strokeWidth={6}
            lineDashPattern={[1]}
            />
        </MapView>
        </View>
        {/* <View style={styles.positionContainer}>
            <Text>Position</Text>
            <View><Text style={styles.board}>Board</Text></View>
        </View> */}
        <View style={styles.tropies}>
            <Image style={[level1Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
            <Image style={[level2Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
            <Image style={[level3Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
        </View >
        <View style={styles.allStats}>
        <TouchableOpacity  onPress={backToHandler} style={styles.backButton}>
          <Text style={styles.buttonOutlineText}>Back to map</Text>
        </TouchableOpacity>
        {/* <View style={styles.allStats}> 
            <Text style={styles.allStatsBtn}>All stats</Text>
        </View> */}
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    main: {
        height: "100%"
    },
    mapView: {
        height: "30%"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    statsContainer: {
        height: "30%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: 50,
        alignSelf: 'flex-start',
        marginLeft: 80
    },
    durationContainer: {
        backgroundColor: "#eeee",
    justifyContent: "center",
    alignItems: "center",
    },
    timeAndDistance: {
        height: 100,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      },
      congrats: {
        fontSize: 50,
        padding: 10,
      },
      timeAndDistanceText: {
        fontSize: 30,
      },
    positionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: "10%"
    },
    board: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    tropies: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    imageShow: {
        height: 100,
        width: 100,
    },
    imageHide: {
        height: 100,
        width: 100,
        opacity: 0.3,
    },
    allStats: {
        height: "10%",
        alignItems: 'center'
    },
    allStatsBtn: {
        padding: 20,
        overflow: 'hidden',
        width: "30%",
        borderRadius: 5,
        backgroundColor: '#89CFF0',
        color: 'white',
        fontSize: 20,
        marginTop: 30
    },
    backButton: {
        // position: "absolute",
        zIndex: 2,
        alignContent: "center",
        alignItems: "center",
        // justifyContent: "center",
        // bottom: 120,
        backgroundColor: "white",
        borderColor: "#0782F9",
        borderRadius: 10,
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 30,
        width: "60%",
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontSize: 15
    },
})















export default Rewards