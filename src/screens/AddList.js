import * as React from 'react';
import {
	Box,
	Center,
	Input,
	Select,
	StatusBar,
	Text,
	TextArea,
	VStack,
} from 'native-base';
import { PrimaryButton } from '../components/Button';

export const AddList = () => {
	return (
		<Box width={310} alignSelf='center' mt={20}>
			<VStack space={5}>
				<Text fontSize={'4xl'} fontWeight='bold'>
					Add List
				</Text>

				<Input placeholder='Name' />
				<Select
					// selectedValue={service}

					minWidth='300'
					accessibilityLabel='Category'
					placeholder='Category'
					_selectedItem={{
						bg: 'red',
					}}
					// onValueChange={(itemValue) => setService(itemValue)}
				>
					<Select.Item label='UX Research' value='ux' />
					<Select.Item label='Web Development' value='web' />
					<Select.Item label='Cross Platform Development' value='cross' />
					<Select.Item label='UI Designing' value='ui' />
					<Select.Item label='Backend Development' value='backend' />
				</Select>
				<Input placeholder='Chose Date' />
				<TextArea
					h={20}
					placeholder='Description'
					width='100%'
					maxW='300'
					p={2}
				/>

				<Box mt={5}>
					<PrimaryButton color='orange' btnName='Add List' />
				</Box>
			</VStack>
		</Box>
	);
};
