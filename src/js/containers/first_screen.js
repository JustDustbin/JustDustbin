'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { callWorkerDetailsAdded } from '../actions';
import realm from '../realm';

class FirstScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name_field: '',
      number_field: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Clean India Movement!
        </Text>
        <Text style={styles.instructions}>
          To get started, enter your name
        </Text>
        <TextInput
          style={{height: 60, fontSize: 30, width:300}}
          onChangeText={(text) => this.setState({name_field: text})}
          value={this.state.name_field}
          maxLength={40}
          placeholder="Enter name here"
        />
        <TextInput
          style={{height: 60, fontSize: 30, width:300}}
          onChangeText={(text) => this.setState({number_field: text})}
          value={this.state.number_field}
          maxLength={10}
          placeholder="Enter number here"
          keyboardType='phone-pad'
        />
        <Button
          onPress={() => { this.props.WorkerDetailsAdded(this.state.name_field, this.state.number_field) }}
          title="Done"
          color="#841584"
          accessibilityLabel="Finish entering name"
          disabled={(this.state.name_field.length<=0)||(this.state.name_field.length>40)||(this.state.number_field.length!==10)}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    WorkerDetailsAdded: (name_field, number_field) => {
      dispatch(callWorkerDetailsAdded(name_field));
      let profile_name_config = realm.objectForPrimaryKey('ConfigData', 'profile_name');
      let profile_number_config = realm.objectForPrimaryKey('ConfigData', 'profile_number');
      realm.write(() => {
        profile_name_config.value = name_field;
        profile_number_config.value = number_field;
      });
      Actions.mainScreen();
    }
  }
}

const FirstScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstScreenComponent)

export default FirstScreen;