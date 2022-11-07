import * as React from 'react';
import {
	Box,
	Center,
	FlatList,
	FormControl,
	Input,
	Select,
	StatusBar,
	Text,
	TextArea,
	VStack,
} from 'native-base';
import { PrimaryButton } from '../components/Button';

import DateTimePicker, {
	DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AddList = ({ navigation }) => {
	const [date, setDate] = React.useState(new Date(1598051730000));
	const [mode, setMode] = React.useState('date');
	const [show, setShow] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const [categories, setCategories] = React.useState([]);
	const getCategory = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const id = await AsyncStorage.getItem('id');
			const response = await axios.get(
				`https://api.v2.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/Category?user_id=${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response);
			setCategories(response.data);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const onDateChange = (event, selectedDate) => {
		setShow(false);
		setDate(selectedDate);
	};

	const [form, setForm] = React.useState({
		name: '',
		date: date,
		description: '',
		user_id: '',
		is_done: false,
	});

	const handleOnChange = async (name, value) => {
		const id = await AsyncStorage.getItem('id');
		console.log(name, value);
		setForm({
			...form,
			[name]: value,
			user_id: id,
		});
	};

	const handleOnPress = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token === null) {
				navigation.navigate('Login');
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			};

			setIsLoading(true);
			const response = await axios.post(
				'https://api.v2.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/List',
				form,
				config
			);
			console.log(response);

			setIsLoading(false);
			navigation.navigate('ListTodo');
			alert('Success add List');
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		getCategory();
	}, []);

	return (
		<Box width={310} alignSelf='center' mt={20}>
			<VStack space={5}>
				<Text fontSize={'4xl'} fontWeight='bold'>
					Add List
				</Text>

				<Input
					placeholder='Name'
					onChangeText={(value) => handleOnChange('name', value)}
				/>
				<Select
					// selectedValue={service}

					minWidth='300'
					accessibilityLabel='Category'
					placeholder='Category'
					_selectedItem={{
						bg: 'red',
					}}
					onValueChange={(itemValue) => handleOnChange('category', itemValue)}
				>
					{categories?.map((item) => (
						<Select.Item label={item.name} value={item.name} key={item._id} />
					))}
				</Select>
				<FormControl>
					<Input placeholder='Choose Date' onPressIn={() => setShow(true)} />
				</FormControl>

				{show && (
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={mode}
						is24Hour={true}
						onChange={(e, date) => {
							onDateChange(e, date);
							console.log(date);
						}}
					/>
				)}
				<TextArea
					h={20}
					placeholder='Description'
					onChangeText={(value) => handleOnChange('description', value)}
					width='100%'
					maxW='300'
					p={2}
				/>

				<Box mt={5}>
					<PrimaryButton
						color='orange'
						btnName='Add List'
						isLoading={isLoading}
						onPress={handleOnPress}
					/>
				</Box>
			</VStack>
		</Box>
	);
};
