'use strict';

import Realm from 'realm';

class ConfigData {}
ConfigData.schema = {
  name: 'ConfigData',
  primaryKey: 'key',
  properties: {
    key:  'string',
    value: 'string',
  }
};

let realm = new Realm({
  schema: [ConfigData],
  schemaVersion: 1
});

realm.write(() => {
  realm.deleteAll();
});

if(realm.objectForPrimaryKey('ConfigData', 'profile_name') === undefined) {
  realm.write(() => {
    realm.create('ConfigData', {
      key: 'profile_name', value: ''
    });  
  });
}

if(realm.objectForPrimaryKey('ConfigData', 'profile_number') === undefined) {
  realm.write(() => {
    realm.create('ConfigData', {
      key: 'profile_number', value: ''
    });
  });
}

export default realm;
