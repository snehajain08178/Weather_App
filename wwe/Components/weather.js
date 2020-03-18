import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Button,
} from 'react-native';
import {Header} from 'react-native-elements';
import Location from './location';
import Geolocation from '@react-native-community/geolocation';

import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

class Weather extends React.Component {
  state = {
    currentLongitude: 'unknown', //Initial Longitude
    currentLatitude: 'unknown', //Initial Latitude
    country: '',
    name: '',
    temp: '',
    description: '',
    dummyData: [],
    icon: '',
  };

  componentDidMount() {
    Geolocation.requestAuthorization();
    this.callLocation();
  }

  getDailyWeatherData = (lat, long) => {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      lat +
      '&lon=' +
      long +
      '&appid=1a9a2e9ec8f6f3194dc3982190ae1878';

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(dailyData => {
        //console.log('hidata', JSON.stringify(dailyData, null, 6));
        //console.log('daily',dailyData.list)
        this.setState({
          dummyData: dailyData.list,
        });
        //console.log('hidata', JSON.stringify(dailyData, null, 6));
        //console.log('dummy', this.state.dummyData);
      });
  };

  getWeatherData = (lat, long) => {
    let url =
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      lat +
      '&lon=' +
      long +
      '&appid=1a9a2e9ec8f6f3194dc3982190ae1878';

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log('data', data);
        this.setState({
          country: data.sys.country,
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      });
  };

  // eslint-disable-next-line consistent-this
  callLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //console.log('.c', currentLongitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        this.setState({currentLongitude: currentLongitude});
        this.setState({currentLatitude: currentLatitude});
        this.getWeatherData(currentLatitude, currentLongitude);
        this.getDailyWeatherData(currentLatitude, currentLongitude);
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);
      this.setState({currentLongitude: currentLongitude});
      this.setState({currentLatitude: currentLatitude});
    });
  }

  date = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDay();
    //console.log('date', date, month, day);
    if (month == 3) {
      month = 'March';
    }
    if (day == 1) {
      day = 'Mon';
    }
    return (
      <Text style={styles.dateText}>
        {day}, {date} {month}
      </Text>
    );
  };
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

  render() {
    return (
      <LinearGradient
        style={{flex: 1, justifyContent: 'space-around'}}
        colors={['#406DEE', '#779FF8']}

        //  Linear Gradient
      >
        <View style={{paddingHorizontal: 25, paddingTop: 0}}>
          <View style={{alignSelf: 'flex-end'}}>
            <IconIon
              name="md-menu"
              size={35}
              color="white"
              style={{paddingLeft: 10, paddingVertical: 35, fontWeight: '0'}}
            />


          </View>
          <Text style={styles.size}>{this.state.country}</Text>
          <Text style={styles.size}>{this.state.name}</Text>
          {this.date()}
        </View>
        <View>
          {/* style={{alignSelf: 'center'}} */}
          <Text
            style={{
              fontSize: 28,
              color: 'white',
              alignSelf: 'center',
              paddingBottom: 0,
            }}>
            Today
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Image
              style={{width: 50, height: 90, paddingTop: 20, paddingLeft: 0}}
              source={{
                uri: `http://openweathermap.org/img/wn/${
                  this.state.icon
                }@2x.png`,
              }}
            />
            <Text
              style={{
                fontSize: 40,
                color: 'white',
                fontWeight: 'bold',
                paddingVertical: 12,
                paddingHorizontal: 10,
              }}>
              {this.state.temp}º
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>
            {this.state.description}
          </Text>
        </View>
        <View style={{paddingBottom: 63}}>
          <View
            style={{flexDirection: 'row', padding: 22, alignItems: 'center'}}>
            <Button title="Today" color="white" />
            <Button title="Tommorow" color="white" />
            <Button
              title="Next 7 Days"
              color="white"
              onPress={() =>
                this.props.navigation.navigate('SevenDays', {
                  lat: this.state.currentLatitude,
                  long: this.state.currentLongitude,
                })
              }
            />

            <Icon
              name="long-arrow-right"
              size={20}
              color="white"
              style={{paddingLeft: 10}}
            />
          </View>
          <View
            style={{
              // height: 180,
              paddingVertical: 25,
              backgroundColor: '#ffffff30',
              flexDirection: 'column',
              marginLeft: 30,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.dummyData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{
                      marginLeft: 15,
                      backgroundColor: '#4476F0',
                      borderRadius: 62,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 65,
                      height: 130,
                    }}>
                    <Text style={{padding: 5, color: 'white', fontSize: 10}}>
                      {moment(item.dt_txt).format('hh:mm A')}
                    </Text>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{
                        uri: `http://openweathermap.org/img/wn/${
                          item.weather[0].icon
                        }@2x.png`,
                      }}
                    />
                    <Text style={{padding: 5, color: 'white', fontSize: 10}}>
                      {item.main.temp}º
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  size: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
    marginTop: 8,
  },
});

export default Weather;
