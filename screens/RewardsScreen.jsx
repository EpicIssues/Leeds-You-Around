import React, { useContext, useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity, LogBox } from 'react-native';
import Map from "../components/Map";
import UserContext from "../contexts/UserContext";
import LevelNumberContext from "../contexts/LevelNumberContext";
import { Polyline } from 'react-native-maps';
import db from '../db/firestore';
import { doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { all } from 'axios';



function Rewards() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {levelNumber, setLevelNumber} = useContext(LevelNumberContext)
    const [polylineData, setPolylineData] = useState(null)
    
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

    // if (level === 2) {
    //     const updatedFields = {level2route: arrayUnion(...polylineArray)};
    //     db.collection("users").doc(currentUser.email).update(updatedFields)
    //         .then(() => {
    //             console.log('Document updated successfully.');
    //         })
    //         .catch((error) => {
    //             console.error('Error updating document: ', error);
    //         });
    // }
    

    return (
    <View style={styles.main}>
        <View style={styles.statsContainer}>
            {/* <View><Text>Distance</Text></View> */}
            <View>
                <Text>
                    Duration
                </Text>
            </View>
        </View>
        <View style={styles.mapView}>
        <Map
            style={styles.map}
            initialRegion={{
            latitude: 53.79543,
            longitude: -1.54765,
            latitudeDelta: 200,
            longitudeDelta: 200,
            }}
        >
            <Polyline 
            coordinates={polylineData}
            strokeColor="#000"
            fillColor="rgba(255,0,47,1)"
            strokeWidth={6}
            lineDashPattern={[1]}
            />
        </Map>
        </View>
        {/* <View style={styles.positionContainer}>
            <Text>Position</Text>
            <View><Text style={styles.board}>Board</Text></View>
        </View> */}
        <View style={styles.tropies}>
            <Image style={[level1Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
            <Image style={[level2Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
            <Image style={[level3Complete ? styles.imageShow : styles.imageHide]} source={require('./images/trophy.png')}/>
        </View>
        <TouchableOpacity>
            <Text>

            </Text>
        </TouchableOpacity>
        <View style={styles.allStats}> 
            <Text style={styles.allStatsBtn}>All stats</Text>
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
    statsContainer: {
        height: "30%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
        alignSelf: 'flex-start',
        marginLeft: 40
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
    }
})















export default Rewards