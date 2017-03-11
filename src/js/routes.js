'use strict';

import React from 'react';
import { Scene, Actions } from 'react-native-router-flux'
import FirstScreen from './containers/first_screen';
import MainScreen from './containers/main_screen';
import RegisterScreen from './containers/register_screen';
import ManageScreen from './containers/manage_screen';
import realm from './realm';

function is_never_loggedin() {
  if((realm.objectForPrimaryKey('ConfigData', 'profile_name').value === '')) {
    return true;
  }
  else {
    return false;
  }
}


/* To many type=resets */
const scenes = Actions.create(
  <Scene key="root">
  <Scene key="againroot">
    <Scene key="firstRun" initial={is_never_loggedin()}>
      <Scene key="firstScreen" component={FirstScreen} initial={true} hideNavBar={true} />
    </Scene>
    <Scene key="mainScreen" initial={!is_never_loggedin()} component={MainApp} hideNavBar={true} type="reset"/>
    <Scene key="registerScreen" component={RegisterApp} hideNavBar={true}/>
    <Scene key="manageScreen" component={manageApp} hideNavBar={true}/>
  </Scene>
  </Scene>
);

export default scenes;