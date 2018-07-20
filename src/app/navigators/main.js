import React from 'react';
import * as ScreenNames from './screen_names';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import ContactsScreen from '../containers/Contacts';
import ContactDetailsScreen from '../containers/Contacts/details';
import MapScreen from '../containers/Map';
import ProfileScreen from '../containers/Profile';
import NavTabItem from '../components/NavTabItem';
import {commonStackNavigationOptions, commonTabBarOptions} from './options';

const tabTitles = {
  [ScreenNames.CONTACTS_TAB]: 'contacts',
  [ScreenNames.MAPS_TAB]: 'maps',
  [ScreenNames.PROFILE_TAB]: 'profile'
};

export default createBottomTabNavigator({
  [ScreenNames.CONTACTS_TAB]: createStackNavigator(
    {
      [ScreenNames.CONTACTS]: {screen:ContactsScreen},
      [ScreenNames.CONTACT_DETAILS]: {screen:ContactDetailsScreen},
    },
    {
      initialRouteName: ScreenNames.CONTACTS,
      navigationOptions: {
        ...commonStackNavigationOptions,
        title: 'contacts',
        tabBarLabel: 'contacts',
        headerTitle: 'contacts'
      }
    }
  ),

  [ScreenNames.MAPS_TAB]: createStackNavigator(
    {
      [ScreenNames.MAP]: {screen:MapScreen}
    },
    {
      initialRouteName: ScreenNames.MAP,
      navigationOptions: {
        ...commonStackNavigationOptions,
        title: 'maps',
        tabBarLabel: 'maps',
        headerTitle: 'maps'
      }
    }
  ),

  [ScreenNames.PROFILE_TAB]: createStackNavigator(
    {
      [ScreenNames.USER_PROFILE]: {screen:ProfileScreen}
    },
    {
      initialRouteName: ScreenNames.USER_PROFILE,
      navigationOptions: {
        ...commonStackNavigationOptions,
        title: 'profile',
        tabBarLabel: 'profile',
        headerTitle: 'profile'
      }
    }
  ),
},
{
  initialRouteName: ScreenNames.CONTACTS_TAB,
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({tintColor}) => {
      const {routeName} = navigation.state;

      return (<NavTabItem routeName={routeName} tintColor={tintColor} />)
    },
    title: tabTitles[navigation.state.routeName]
  }),
  tabBarOptions: commonTabBarOptions
});