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

// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: '#ecfeff',
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
	return (
		<NativeBaseProvider>
			{/* <Main /> */}
			{/* <Login /> */}
			{/* <Register /> */}
			{/* <ListTodo /> */}
			{/* <AddList /> */}
			<AddCategory />
		</NativeBaseProvider>
	);
}
