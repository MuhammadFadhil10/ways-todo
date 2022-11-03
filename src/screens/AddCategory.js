import * as React from 'react';
import {
	Box,
	Center,
	Flex,
	HStack,
	StatusBar,
	Text,
	Button,
	Input,
	VStack,
} from 'native-base';
import { PrimaryButton } from '../components/Button';

export const AddCategory = () => {
	return (
		<Box idth={310} alignSelf='center' mt={20}>
			<Text fontSize={'4xl'} fontWeight='bold'>
				Add Category
			</Text>
			<VStack mb={20} mt={10} space={5}>
				<Input placeholder='Name' />
				<PrimaryButton color='orange' btnName='Add Category' />
			</VStack>
			<Text fontSize={'4xl'} fontWeight='bold'>
				List Category
			</Text>
			<HStack alignItems='center' space={3}>
				<Button
					style={{
						backgroundColor: 'blue',
						paddingHorizontal: 10,
						paddingVertical: 5,
						borderRadius: 10,
					}}
				>
					<Text color={'white'}>Study</Text>
				</Button>
				<Button>
					<Text>Study</Text>
				</Button>
				<Button>
					<Text>Study</Text>
				</Button>
			</HStack>
		</Box>
	);
};
