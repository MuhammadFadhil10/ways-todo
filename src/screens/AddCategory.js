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
	Modal,
	FlatList,
	Spinner,
} from 'native-base';
import { PrimaryButton } from '../components/Button';
import axios from 'axios';
import {
	ColorPicker,
	fromHsv,
	TriangleColorPicker,
} from 'react-native-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddCategory = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [categoryLoading, setCategoryLoading] = React.useState(false);
	const [showColor, setShowColor] = React.useState(false);

	const [categories, setCategories] = React.useState([]);

	const [form, setForm] = React.useState({
		name: '',
		color: '#27a8e4',
		user_id: '',
	});

	const getCategory = async () => {
		try {
			setCategoryLoading(true);
			const response = await axios.get(
				'https://api.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/category'
			);
			setCategoryLoading(false);
			setCategories(response.data);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	React.useEffect(() => {
		getCategory();
		console.log('categories', categories);
	}, []);

	const handleAddCategory = async () => {
		const token = await AsyncStorage.getItem('token');
		const id = await AsyncStorage.getItem('id');
		try {
			setForm({ ...form, user_id: id });
			console.log(form);
			setIsLoading(true);
			const response = await axios.post(
				`https://api.kontenbase.com/query/api/v1/8dde74b0-7698-4344-9eca-76516944f6c1/category`,
				form,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			getCategory();
			console.log(response);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error.message);
		}
	};

	return (
		<Box idth={310} alignSelf='center' mt={20}>
			<Text fontSize={'4xl'} fontWeight='bold'>
				Add Category
			</Text>
			<VStack mb={20} mt={10} space={5}>
				<Input
					placeholder='Name'
					onChangeText={(value) => setForm({ ...form, name: value })}
				/>
				<PrimaryButton
					color='orange'
					btnName='Add Category'
					isLoading={isLoading}
					onPress={handleAddCategory}
				/>
				<PrimaryButton
					color='orange'
					btnName='Choose Color'
					onPress={() => setShowColor(true)}
				/>
				<Modal
					isOpen={showColor}
					onClose={() => setShowColor(false)}
					style={{ backgroundColor: 'white' }}
				>
					<Modal.Header>Choose Color</Modal.Header>
					<TriangleColorPicker
						defaultColor={form.color}
						hideSliders
						onColorChange={(color) =>
							setForm({ ...form, color: fromHsv(color) })
						}
						style={{ width: 300, flex: 1 }}
					/>
					<Button
						variant='outline'
						colorScheme='danger'
						borderColor='danger.900'
						width={300}
						onPress={() => setShowColor(false)}
						style={{
							marginTop: 100,
							marginBottom: 50,
						}}
					>
						Back
					</Button>
				</Modal>
			</VStack>
			<Text fontSize={'4xl'} fontWeight='bold'>
				List Category
			</Text>
			<HStack alignItems={categoryLoading ? 'center' : 'flex-start'} space={3}>
				{categoryLoading ? (
					<HStack
						justifyContent='center'
						style={{ width: 310 }}
						space={3}
						mt={5}
					>
						<Spinner accessibilityLabel='Loading posts' size='lg' />
						<Text fontSize={'2xl'}>Loading Category..</Text>
					</HStack>
				) : (
					<FlatList
						horizontal
						data={categories}
						width={300}
						renderItem={({ item }) => {
							return (
								<Box
									key={item.id}
									style={{
										backgroundColor: item.color,
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 10,
										width: 'auto',
										marginRight: 10,
									}}
								>
									<Text color={'blue'}>{item.name}</Text>
								</Box>
							);
						}}
						keyExtractor={(item) => item.id}
					/>
				)}
			</HStack>
		</Box>
	);
};
