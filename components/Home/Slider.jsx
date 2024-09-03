import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Slider() {
  const router = useRouter();

  return (
    <ScrollView>
      <Text style={styles.title}>
        #DASHBOARDS
      </Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => router.push('/rank')}
          >
            <View style={styles.card}>
              <Image 
                source={require('./../../assets/images/rank.jpeg')}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Rank</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => router.push('/department')}
          >
            <View style={styles.card}>
              <Image 
                source={require('./../../assets/images/department.jpg')}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Department</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => router.push('/location')}
          >
            <View style={styles.card}>
              <Image 
                source={require('./../../assets/images/location.png')}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Location</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => router.push('/employee')}
          >
            <View style={styles.card}>
              <Image 
                source={require('./../../assets/images/user.png')}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>Employee</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  touchable: {
    margin: 10,
  },
  card: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    marginTop: 8,
  },
  cardText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
