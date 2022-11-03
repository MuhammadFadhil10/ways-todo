import * as React from 'react';

import {
	ScrollView,
	Box,
	Text,
	Image,
	VStack,
	HStack,
	Input,
	FormControl,
	Select,
} from 'native-base';

import DateTimePicker, {
	DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { PrimaryButton } from '../components/Button';

export const ListTodo = () => {
	const [date, setDate] = React.useState(new Date(1598051730000));
	const [mode, setMode] = React.useState('date');
	const [show, setShow] = React.useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		if (Platform.OS === 'android') {
			setShow(false);
		}
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};
	return (
		<ScrollView>
			<Box mt={10} width={310} alignSelf='center'>
				{/* Header */}
				<HStack justifyContent='space-between' alignItems='center' height={70}>
					<VStack>
						<Text>Hi Fadhil</Text>
						<Text color='#FF5555'>200 Lists</Text>
					</VStack>
					<Image
						alt='profile picture'
						source='#'
						style={{
							width: 50,
							height: 50,
							backgroundColor: 'gray',
						}}
						borderWidth={2}
						borderColor='#FF5555'
						borderRadius={100}
					/>
				</HStack>
				{/* input */}
				<VStack space={5}>
					<Input placeholder='Search List...' />
					{show && (
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={onChange}
						/>
					)}
					<HStack justifyContent='space-between' width={100}>
						{/* <PrimaryButton btnName='test date' onClick={() =>} /> */}
						<FormControl>
							<Input
								placeholder='Choose Date'
								onPressIn={() => setShow(true)}
							/>
						</FormControl>

						{show && (
							<DateTimePicker
								testID='dateTimePicker'
								value={date}
								mode={mode}
								is24Hour={true}
								onChange={onChange}
							/>
						)}

						<FormControl>
							<Select placeholder='Category'>
								<Select.Item label='Study' value='study'></Select.Item>
								<Select.Item label='Study' value='study'></Select.Item>
								<Select.Item label='Study' value='study'></Select.Item>
								<Select.Item label='Study' value='study'></Select.Item>
								<Select.Item label='Study' value='study'></Select.Item>
							</Select>
						</FormControl>
                        <FormControl>
							<Select placeholder='Status'>
								<Select.Item label='Done' value='done'></Select.Item>
								<Select.Item label='Done' value='done'></Select.Item>
								<Select.Item label='Done' value='done'></Select.Item>
								<Select.Item label='Done' value='done'></Select.Item>
								<Select.Item label='Done' value='done'></Select.Item>
							</Select>
						</FormControl>
					</HStack>
				</VStack>
			</Box>
		</ScrollView>
	);
};
