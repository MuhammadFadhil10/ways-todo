import {
	Box,
	Text,
	Center,
	Image,
	Input,
	VStack,
	ScrollView,
} from 'native-base';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import registerIcon from '../assets/images/login-image.png';
import { PrimaryButton } from '../components/Button';

export const Register = ({ navigation }) => {
	const gap = 10;
	return (
		<ScrollView>
			<Box mt={20}>
				{/* <Center style={{ display: 'flex' }}> */}
				<VStack alignItems='center' space={10}>
					<Image source={registerIcon} alt='register image' />
					<Box width={310}>
						<Text bold fontSize={'4xl'} alignSelf='flex-start'>
							Register
						</Text>
					</Box>
					<Box width={310}>
						<VStack space={5}>
							<Input placeholder='Email'></Input>
							<Input placeholder='Name'></Input>
							<Input placeholder='Password'></Input>
						</VStack>
					</Box>
					<Box alignItems='center'>
						<PrimaryButton btnName='Register' color='orange' />
						<Text>
							Joined us Before ?{' '}
							<TouchableOpacity onPress={() => navigation.navigate("Login")} >
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
