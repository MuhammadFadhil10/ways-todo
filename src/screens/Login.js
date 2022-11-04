import {
	Box,
	Text,
	Center,
	Image,
	Input,
	VStack,
	Pressable,
} from 'native-base';
import * as React from 'react';

import loginIcon from '../assets/images/login-image.png';
import { PrimaryButton } from '../components/Button';

export const Login = ({ navigation }) => {

    


	return (
		<Box mt={20}>
			{/* <Center style={{ display: 'flex' }}> */}
			<VStack alignItems='center' space={10}>
				<Image source={loginIcon} alt='login image' />
				<Box width={310}>
					<Text bold fontSize={'4xl'} alignSelf='flex-start'>
						Login
					</Text>
				</Box>
				<Box width={310}>
					<VStack space={5}>
						<Input placeholder='Email'></Input>
						<Input placeholder='Password'></Input>
					</VStack>
				</Box>
				<Box alignItems='center'>
					<PrimaryButton btnName='Login' color='orange' />
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
	);
};
