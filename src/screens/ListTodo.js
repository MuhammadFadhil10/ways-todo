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
	FlatList,
	Pressable,
	Button,
} from 'native-base';

import DateTimePicker, {
	DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { PrimaryButton } from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import finish from '../assets/images/finish.png';
import pending from '../assets/images/pending.png';

export const ListTodo = ({ navigation }) => {
	const [date, setDate] = React.useState(new Date(1598051730000));
	const [mode, setMode] = React.useState('date');
	const [show, setShow] = React.useState(false);

	const [userName, setUserName] = React.useState('');

	const onDateChange = (event, selectedDate) => {
		setShow(false);
		setDate(selectedDate);
	};

	const [form, setForm] = React.useState({
		name: '',
		date: date,
		description: '',
		user_id: '',
	});

	const [dataList, setDataList] = React.useState([]);

	const getUserName = async () => {
		const getName = await AsyncStorage.getItem('user_name');
		setUserName(getName);
	};
	const getLists = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const id = await AsyncStorage.getItem('id');

			if (!token) {
				props.navigation.navigate('Login');
			}
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			};
			const response = await axios.get(
				`https://api.v2.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/List?user_id=${id}`,
				config
			);
			setDataList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('id');
		await AsyncStorage.removeItem('user_name');
		navigation.navigate('Login');
	};

	React.useEffect(() => {
		getUserName();
	}, []);
	React.useEffect(() => {
		getLists();
	}, [dataList]);

	return (
		<ScrollView>
			<Box mt={10} width={310} alignSelf='center'>
				{/* Header */}
				<HStack justifyContent='space-between' alignItems='center' height={70}>
					<VStack>
						<Text>Hi {userName}</Text>
						<Text color='#FF5555'>200 Lists</Text>
					</VStack>
					<Button
						variant='outline'
						colorScheme='danger'
						borderColor='danger.900'
						onPress={logout}
					>
						Logout
					</Button>
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
					<Input
						placeholder='Search List...'
						onPressIn={() => console.log(date)}
					/>
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
								onChange={(e, date) => {
									onDateChange(e, date);
									console.log(date);
								}}
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
				<VStack>
					{dataList && (
						<FlatList
							data={dataList}
							renderItem={(itemData) => {
								return (
									<Pressable
										onPress={() => navigation.navigate('Detail', { itemData })}
									>
										<Box borderRadius={5} bg='lightBlue.100' m={2} p={3}>
											<HStack justifyContent='space-between'>
												<Box>
													<HStack>
														{itemData.item.status === 'done' ? (
															<>
																<Text
																	style={{
																		textDecorationLine: 'line-through',
																		textDecorationStyle: 'solid',
																	}}
																	bold
																>
																	{itemData.item.category}
																</Text>
																<Text
																	style={{
																		textDecorationLine: 'line-through',
																		textDecorationStyle: 'solid',
																	}}
																	bold
																>
																	{' '}
																	-{' '}
																</Text>
																<Text
																	style={{
																		textDecorationLine: 'line-through',
																		textDecorationStyle: 'solid',
																	}}
																	bold
																>
																	{itemData.item.name}
																</Text>
															</>
														) : (
															<>
																<Text bold>{itemData.item.category}</Text>
																<Text bold> - </Text>
																<Text bold>{itemData.item.name}</Text>
															</>
														)}
													</HStack>
													{itemData.item.status === 'done' ? (
														<Text
															w={200}
															mb={5}
															style={{
																textDecorationLine: 'line-through',
																textDecorationStyle: 'solid',
															}}
															color='coolGray.400'
														>
															{itemData.item.desc}
														</Text>
													) : (
														<Text w={200} mb={5} color='coolGray.400'>
															{itemData.item.desc}
														</Text>
													)}

													<Text color='coolGray.400'>
														<Ionicons name='calendar-outline' />{' '}
														{itemData.item.date}
													</Text>
												</Box>
												<Box alignItems='center'>
													<Pressable>
														<Text
															bg='danger.100'
															w='100px'
															fontSize='xs'
															borderRadius={8}
															color='#fff'
															bold
															textAlign='center'
															mb={2}
															p={1}
														>
															{itemData.item.category}
														</Text>
													</Pressable>
													{itemData.item.status === 'done' ? (
														<Image
															alt='status'
															source={finish}
															width='30px'
															height='30px'
														/>
													) : (
														<Image
															alt='status'
															source={pending}
															width='30px'
															height='30px'
														/>
													)}
												</Box>
											</HStack>
										</Box>
									</Pressable>
								);
							}}
							keyExtractor={(item, index) => {
								return item._id;
							}}
						/>
					)}
				</VStack>
			</Box>
		</ScrollView>
	);
};
