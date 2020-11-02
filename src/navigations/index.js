import 'react-native-gesture-handler';
import React from 'react';
import { Image, Dimensions } from 'react-native';

import { useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { isIphoneX } from 'react-native-iphone-x-helper';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ForgotPassword } from '../screens/ForgotPassword';

import { AddGoals } from '../screens/AddGoals';

import { Goals } from '../screens/Goals';
import { GoalCycling } from '../screens/GoalCycling';

import { Awards } from '../screens/Awards';
import { FeedsScreen, FriendsScreen } from '../screens/Sharing';
import { Profile } from '../screens/Profile';
import { FriendGoalsScreen } from '../screens/Sharing/components/friend-goals/friend-goals';

import { colors } from '../constants';

import {
  goalIconBlack,
  goalIconWhite,
  goalIconYellow,
  goalIconGreen,
  medalIconBlack,
  medalIconWhite,
  medalIconYellow,
  medalIconGreen,
  shareIconBlack,
  shareIconWhite,
  shareIconYellow,
  shareIconGreen,
  userIconBlack,
  userIconWhite,
  userIconYellow,
  userIconGreen
} from '../assets/icons';

import { I18nLocalize } from '../i18n';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  gestureEnabled: false,
  cardOverlayEnabled: true,
  headerShown: false,
}

const iconStyle = {
  width: 25,
  height: 25
}

function SharingMain() {
  return (
    <Stack.Navigator
      initialRouteName="FeedsScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="FeedsScreen" component={FeedsScreen} />
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="FriendGoalsScreen" component={FriendGoalsScreen} />
      <Stack.Screen name="FriendGoalCycling" component={GoalCycling} />
    </Stack.Navigator>
  );
}

function ProfileMain() {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
}

function GoalsMain() {
  return (
    <Stack.Navigator
      initialRouteName="Goals"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Goals" component={Goals} />
      <Stack.Screen name="GoalCycling" component={GoalCycling} />
    </Stack.Navigator>
  );
}

function Main({ route }) {
  const profile = useSelector(state => state.profile);

  const i18n = new I18nLocalize();
  i18n.locale = profile.language;

  let isGoalsScreen = true;
  if (route && route.state) {
    isGoalsScreen = route.state.index === 0;
    if (route.state.routes[0].state) {
      isGoalsScreen = route.state.index === 0 && route.state.routes[0].state.index === 0;
    }
  }

  return (
    <Tab.Navigator
      initialRouteName='sharing'
      tabBarOptions={{
        activeTintColor: isGoalsScreen ? colors.yellow : colors.lightGreen,
        inactiveTintColor: isGoalsScreen ? colors.white : colors.dark,
        style: {
          borderTopWidth: 0,
          backgroundColor: isGoalsScreen ? colors.green : colors.white,
          paddingTop: 10,
          paddingBottom: isIphoneX() ? 34 : 10,
          height: Dimensions.get('screen').height * 0.1,
        },
        swipeEnabled: false,
      }}>
      <Tab.Screen
        name="goals"
        component={GoalsMain}
        options={{
          tabBarLabel: i18n.t('goals'),
          tabBarIcon: ({ focused }) => {
            const icon = isGoalsScreen
              ? focused ? goalIconYellow : goalIconWhite
              : focused ? goalIconGreen : goalIconBlack;
            return <Image source={icon} style={iconStyle} />;
          },
        }}
      />
      <Tab.Screen
        name="awards"
        component={Awards}
        options={{
          tabBarLabel: i18n.t('awards'),
          tabBarIcon: ({ focused }) => {
            const icon = isGoalsScreen
              ? focused ? medalIconYellow : medalIconWhite
              : focused ? medalIconGreen : medalIconBlack;
            return <Image source={icon} style={iconStyle} />;
          },
        }}
      />
      <Tab.Screen
        name="sharing"
        component={SharingMain}
        options={{
          tabBarLabel: i18n.t('sharing'),
          tabBarIcon: ({ focused }) => {
            const icon = isGoalsScreen
              ? focused ? shareIconYellow : shareIconWhite
              : focused ? shareIconGreen : shareIconBlack;
            return <Image source={icon} style={iconStyle} />
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileMain}
        options={{
          tabBarLabel: i18n.t('profile'),
          tabBarIcon: ({ focused }) => {
            const icon = isGoalsScreen
              ? focused ? userIconYellow : userIconWhite
              : focused ? userIconGreen : userIconBlack;
            return <Image source={icon} style={iconStyle} />
          },
        }}
      />
    </Tab.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="AddGoals" component={AddGoals} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
