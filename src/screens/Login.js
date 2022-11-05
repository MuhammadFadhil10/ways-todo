import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
	Box,
	Text,
	Center,
	Image,
	Input,
	VStack,
	Pressable,
	Alert,
	HStack,
	IconButton,
	CloseIcon,
	ScrollView,
} from 'native-base';
import * as React from 'react';

import loginIcon from '../assets/images/login-image.png';
import { PrimaryButton } from '../components/Button';

export const Login = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [loginStatus, setLoginStatus] = React.useState('');

	const [form, setForm] = React.useState({
		email: '',
		password: '',
	});

	const handleChange = (name, targetValue) => {
		setForm({
			...form,
			[name]: targetValue,
		});
	};

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				'https://api.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/auth/login',
				form
			);

			console.log(response.data.user._id);
			await AsyncStorage.setItem('token', response.data.token);
			await AsyncStorage.setItem('id', response.data.user._id);
			setIsLoading(false);
			setLoginStatus('success');
			setMessage('Success Login!');
			setMessage('');
			setForm({
				...form,
				email: '',
				password: '',
			});
			navigation.navigate('ListTodo');
		} catch (error) {
			console.log(error);
			setLoginStatus('failed');
			setIsLoading(false);
			setMessage('Email or Password wrong!');
			setTimeout(() => {
				setMessage('');
			}, 1000);
			throw error;
		}
	};

	return (
		<ScrollView>
			<Box mt={20}>
				<VStack alignItems='center' space={10}>
					{message != '' && (
						<Alert
							w='100%'
							status={loginStatus === 'success' ? 'success' : 'error'}
						>
							<VStack space={2} flexShrink={1} w='100%'>
								<HStack flexShrink={1} space={2} justifyContent='space-between'>
									<HStack space={2} flexShrink={1}>
										<Alert.Icon mt='1' />
										<Text fontSize='md' color='coolGray.800'>
											{message}
										</Text>
									</HStack>
									<IconButton
										variant='unstyled'
										_focus={{
											borderWidth: 0,
										}}
										icon={<CloseIcon size='3' />}
										_icon={{
											color: 'coolGray.600',
										}}
									/>
								</HStack>
							</VStack>
						</Alert>
					)}
					<Image source={loginIcon} alt='login image' />
					<Box width={310}>
						<Text bold fontSize={'4xl'} alignSelf='flex-start'>
							Login
						</Text>
					</Box>
					<Box width={310}>
						<VStack space={5}>
							<Input
								placeholder='Email'
								value={form.email}
								onChangeText={(e) => handleChange('email', e)}
							></Input>
							<Input
								placeholder='Password'
								value={form.password}
								onChangeText={(e) => handleChange('password', e)}
							></Input>
						</VStack>
					</Box>
					<Box alignItems='center'>
						<PrimaryButton
							btnName='Login'
							color='orange'
							isLoading={isLoading}
							onPress={() => handleLogin()}
						/>
						<Text>
							New Users ?{' '}
							<Pressable onPress={() => navigation.navigate('Register')}>
								<Text bold color='#FF5555'>
									{' '}
									Register
								</Text>
							</Pressable>
						</Text>
					</Box>
				</VStack>
				{/* </Center> */}
			</Box>
		</ScrollView>
	);
};
