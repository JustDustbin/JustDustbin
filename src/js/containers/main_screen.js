'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ProgressBarAndroid,
  Platform,
  ProgressViewIOS,
  TouchableNativeFeedback,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import MapView from 'react-native-maps';
import SubHeader from '../components/subheader';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callMainScreenItemsLoad } from '../actions';
import timeSince from '../helpers/time_since';
import ActionButton from 'react-native-action-button';

class MainScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 12.904316,
        longitude: 77.515391,
        latitudeDelta: 1.1033,
        longitudeDelta: 1.0532
      }
    };
  }

  updateMapRegionByGeo(position) {
    this.setState({mapRegion: {latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.0533, longitudeDelta: 0.0232}});
  }

  componentDidMount() {
    this.timerForfetch = setInterval(()=>{this.props.loadItems();}, 3000);
    this.props.loadItems(); //put in timer
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.updateMapRegionByGeo(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 200000000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerForfetch);
  }

  getProgress(offset) {
    var progress = this.state.progress + offset;
    return Math.sin(progress % Math.PI) % 1;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="#00000020" />
        <MapView
          onRegionChange={(region)=>{this.setState({ mapRegion: region });}}
          region={this.state.mapRegion}
          style={{height:300}}
        >
          {this.props.items.map(item => (
            <MapView.Marker
              key={item.unique_id}
              coordinate={{latitude: parseFloat(item.gps_latitude), longitude: parseFloat(item.gps_longitude)}}
              title={item.name}
              description={(100-item.status)+"%"}
            />
          ))}
        </MapView>
        <SubHeader text="Dustbins" color="rgba(0 ,0 ,0 , 0.54)" />
          {this.props.items.length !== 0 &&
            <ScrollView>
              <View style={styles.flexcardcontainer}>
                {this.props.items.map((tile) => (
                    <TouchableNativeFeedback key={tile.id} onPress={() => {this.setState({mapRegion: {latitude:parseFloat(tile.gps_latitude), longitude:parseFloat(tile.gps_longitude), latitudeDelta:0.005, longitudeDelta:0.005}})}} background={TouchableNativeFeedback.SelectableBackground()}>
                      <View style={styles.flexcard}>
                        <Text style={styles.flexcardtextpri}>{tile.name}</Text>
                        <Text style={styles.flexcardtextsec}>{tile.city}</Text>
                        <Text style={styles.flexcardtextpri}>{(100-tile.status)+"% of capacity"}</Text>
                        <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={(100-tile.status)/100} />
                        <Text>{timeSince(Date.parse(tile.updated_at))+" ago"}</Text>
                      </View>
                    </TouchableNativeFeedback>
                ))}
              </View>
            </ScrollView>
          }
          {this.props.status === 'loading' && this.props.items.length === 0 &&
            <View>
              <Text>loading...</Text>
            </View>
          }
          {this.props.status === 'error' && this.props.items.length === 0 &&
            <View>
              <Text>try again</Text>
            </View>
          }
        
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { Actions.registerScreen(); }}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  flexcardcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15
  },
  flexcard: {
    width: 165,
    height: 165,
    borderWidth: 3,
    borderColor: '#FFFFFF00',
    padding: 5,
    elevation: 2
  },
  flexcardtextpri: {
    fontWeight: '600'
  },
  flexcardtextsec: {
    //
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    items: state.mainScreenState.items,
    status: state.mainScreenState.status,
    last_page_no: state.mainScreenState.last_page_no,
    is_last: state.mainScreenState.is_last
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: () => {
      dispatch(callMainScreenItemsLoad());
    }
  }
}

const MainScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenComponent)

export default MainScreen;