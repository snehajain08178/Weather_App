import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

class SevenDays extends Component {
  state = {
    date: [],
  };
  getSevenDaysWeatherData = () => {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.props.route.params.lat +
      '&lon=' +
      this.props.route.params.long +
      '&appid=1a9a2e9ec8f6f3194dc3982190ae1878';

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(dailyData => {
        //console.log('hidata', JSON.stringify(dailyData, null, 6));
        //console.log('daily',dailyData.list)
        this.setState({
          date: dailyData.list.splice(0,5),
        });
        console.log('daily', dailyData.list);

        //console.log('hidata', JSON.stringify(dailyData, null, 6));
        // console.log('dummy', this.state.dummyData);
      });
  };

  componentDidMount() {
    this.getSevenDaysWeatherData();
  }
  render() {
    return (
      <View style={{backgroundColor: 'white',flex:1}}>
          <IconA
          name="arrowleft"
          size={35}
          color="grey"
          onPress={() => this.props.navigation.goBack()}
          style={{paddingLeft: 20,fontWeight:'0',padding : 50}}/>

        <View style={{paddingVertical: 15}}>
          <Text
            style={{
              fontSize: 30,
              paddingLeft: 30,
              fontWeight: 'bold',
            }}>
            Next 5 Days
          </Text>
        </View>
        <View style={{paddingLeft: 40, paddingRight: 40}}>
          <FlatList
            data={this.state.date}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '500'}}>
                    {/* {item.dt} */}
                    {moment(item.dt_txt).format('dddd')}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={{width: 60, height: 60}}
                      source={{
                        uri: `http://openweathermap.org/img/wn/${
                          item.weather[0].icon
                        }@2x.png`,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      {item.main.temp}º
                    </Text>
                  </View>
                </View>
                {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${
                        item.weather[0].icon
                      }@2x.png`,
                    }}
                  />
                  <Text>{item.main.temp}</Text>
                </View> */}
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

export default SevenDays;
