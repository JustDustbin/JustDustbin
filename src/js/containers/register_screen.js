'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callRegisterScreenItemAdd } from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class RegisterScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({latitude: position.latitude, longitude: position.longitude});
      },
      (error) => alert("Can't Locate. Try Later."),
      {enableHighAccuracy: true, timeout: 200000000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude!==null && this.state.longitude!==null &&
          <QRCodeScanner
            onRead={(e)=>{this.props.registerScreenItemAdd(e.data, this.state.latitude, this.state.longitude)}}
            style={styles.qrscanner}
            topContent={
              <View style={styles.topbottomContainer}>
                <Icon name="qrcode-scan" size={60} color="red" />
                <Text>Scan the QR code on  the bin</Text>
              </View>
            }
            bottomContent={
              <TouchableNativeFeedback
                onPress={()=>{Actions.mainScreen()}}
                background={TouchableNativeFeedback.SelectableBackground()}
              >
                <Icon name={this.props.status === 'success' ? 'check' : 'backburger' } size={30} color='green' />
              </TouchableNativeFeedback>
            }
          />
        }
        {this.state.latitude===null && this.state.longitude===null &&
          <View style={styles.waitcontainer}>
            <Icon name="qrcode-scan" size={160} color="red" />
            <Text style={styles.waitcontainertext}>Waiting for location...</Text>
          </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  waitcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  waitcontainertext: {
    fontWeight: '600'
  },
  topbottomContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  qrscanner: {
    height: 30
  }
});

const mapStateToProps = (state) => {
  return {
    status: state.registerScreenState.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerScreenItemAdd: (product_id, lat, lng) => {
      dispatch(callRegisterScreenItemAdd(product_id, lat, lng));
    }
  }
}

const RegisterScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenComponent)

export default RegisterScreen;