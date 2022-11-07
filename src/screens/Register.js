import axios from 'axios';
import {
	Box,
	Text,
	Center,
	Image,
	Input,
	VStack,
	ScrollView,
	Alert,
	HStack,
	IconButton,
	CloseIcon,
} from 'native-base';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import registerIcon from '../assets/images/login-image.png';
import { PrimaryButton } from '../components/Button';
import { API } from '../config/api';

export const Register = ({ navigation }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const [form, setForm] = React.useState({
		email: '',
		firstName: '',
		password: '',
	});

	const handleChange = (name, targetValue) => {
		setForm({
			...form,
			[name]: targetValue,
		});
	};

	const handleRegister = async () => {
		try {
			console.log(form);
			setIsLoading(true);
			const response = await axios.post(
				'https://api.v2.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/auth/register',
				form
			);
			setIsLoading(false);
			setMessage('Success create account!');
			setTimeout(() => {
				setMessage('');
				setForm({
					...form,
					firstName: '',
					email: '',
					password: '',
				});
				navigation.navigate('Login');
			}, 1000);
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	};

	return (
		<ScrollView>
			<Box mt={20}>
				{/* <Center style={{ display: 'flex' }}> */}
				<VStack alignItems='center' space={10}>
					{message != '' && (
						<Alert w='100%' status='success'>
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
					<Image source={registerIcon} alt='register image' />
					<Box width={310}>
						<Text bold fontSize={'4xl'} alignSelf='flex-start'>
							Register
						</Text>
					</Box>
					<Box width={310}>
						<VStack space={5}>
							<Input
								placeholder='Email'
								name='email'
								value={form.email}
								onChangeText={(e) => {
									handleChange('email', e);
								}}
							></Input>
							<Input
								placeholder='Name'
								name='firstName'
								value={form.name}
								onChangeText={(e) => handleChange('firstName', e)}
							></Input>
							<Input
								placeholder='Password'
								name='password'
								value={form.password}
								onChangeText={(e) => handleChange('password', e)}
							></Input>
						</VStack>
					</Box>
					<Box alignItems='center'>
						{/* send register */}
						<PrimaryButton
							btnName='Register'
							color='orange'
							isLoading={isLoading}
							onPress={() => handleRegister()}
						/>
						<Text>
							Joined us Before ?{' '}
							<TouchableOpacity onPress={() => navigation.navigate('Login')}>
								<Text bold color='#FF5555'>
									{' '}
									Login
								</Text>
							</TouchableOpacity>
						</Text>
					</Box>
				</VStack>
				{/* </Center> */}
			</Box>
		</ScrollView>
	);
};
