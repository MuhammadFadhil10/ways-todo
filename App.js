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
			initialRouteName='Home'
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					}
					// else if (route.name === 'Login') {
					// 	iconName = focused ? 'login' : 'login';
					// }

					return <Ionicons name={iconName} size={20} color='orange' />;
				},
				tabBarActiveTintColor: 'red',
				tabBarInactiveTintColor: 'blue',
			})}
		>
			<Tab.Screen name='Home' component={Main} />
			<Tab.Screen name='Login' component={Login} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='*'
						component={TabNav}
						options={{
							headerShown: false,
						}}
					/>
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
						component={ListTodo}
						options={{
							title: 'List To Do',
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
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
