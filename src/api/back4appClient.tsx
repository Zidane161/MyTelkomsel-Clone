import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
    'C87N6NEDVJ4fvL7zTYQ45rZiQSEpQksJD2z5esTD',
    'VRQnnmziC0dfzqx2TIzrzr2bezFjtURMS9BIxScj'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;