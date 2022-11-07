import React from 'react';
import {
	Text,
	Link,
	HStack,
	Center,
	Heading,
	Switch,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	VStack,
	Box,
	Image,
} from 'native-base';
import { Platform, StyleSheet } from 'react-native';

import { Main } from './src/screens/Main';
import { Login } from './src/screens/Login';
import { Register } from './src/screens/Register';
import { ListTodo } from './src/screens/ListTodo';
import { AddList } from './src/screens/AddList';
import { AddCategory } from './src/screens/AddCategory';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DetailList from './src/screens/DetailList';

// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: '#ecfeff',
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarLabel: () => {
					return null;
				},
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'ListTodo') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'AddList') {
						iconName = focused ? 'add-circle' : 'add-circle-outline';
					} else if (route.name === 'AddCategory') {
						iconName = focused ? 'bookmark' : 'bookmark-outline';
					}

					return <Ionicons name={iconName} size={20} color='#FF5555' />;
				},
				tabBarActiveTintColor: 'red',
				tabBarInactiveTintColor: 'blue',
			})}
		>
			{/* <Tab.Screen name='Main' component={Main}  /> */}
			<Tab.Screen name='ListTodo' component={ListTodo} />
			<Tab.Screen name='AddList' component={AddList} />
			<Tab.Screen name='AddCategory' component={AddCategory} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator>
					{/* <Stack.Screen
						name='*'
						component={TabNav}
						options={{
							headerShown: false,
						}}
					/> */}
					<Stack.Screen
						name='Main'
						component={Main}
						options={{
							title: 'Main',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='Login'
						component={Login}
						options={{
							title: 'Login',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='Register'
						component={Register}
						options={{
							title: 'Register',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='ListTodo'
						component={TabNav}
						options={{
							title: 'List To Do',
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='AddList'
						component={AddList}
						options={{
							title: 'Add List',
						}}
					/>
					<Stack.Screen
						name='AddCategory'
						component={AddCategory}
						options={{
							title: 'Add Category',
						}}
					/>
					<Stack.Screen
						name='Detail'
						component={DetailList}
						options={{
							title: 'Detail List',
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
