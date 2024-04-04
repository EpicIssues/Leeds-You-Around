import React from 'react';
import { View, Text,Image,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import Map from "../components/Map";
function Rewards() {
  return (
    <View style={styles.main}>
        <View style={styles.statsContainer}>
            <View><Text>Distance</Text></View>
            <View><Text>Duration</Text></View>
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
        />
        </View>
        {/* <View style={styles.positionContainer}>
            <Text>Position</Text>
            <View><Text style={styles.board}>Board</Text></View>
        </View> */}
        <View style={styles.tropies}>
        <Image style={styles.image} source={require('./images/trophy.png')}/>
      <Image style={styles.image} source={require('./images/trophy.png')}/>
      <Image style={styles.image} source={require('./images/trophy.png')}/>
        </View>
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
    image: {
        height: 100,
        width: 100
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