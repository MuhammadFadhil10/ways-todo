import {
	Box,
	HStack,
	Image,
	Pressable,
	ScrollView,
	Text,
	View,
	VStack,
} from 'native-base';
import React from 'react';

import finish from '../assets/images/finish.png';
import pending from '../assets/images/pending.png';

const DetailList = (props) => {
	const data = props.route.params.itemData.item;
	return (
		<View
			mt={50}
			padding={3}
			marginX={4}
			backgroundColor='#DAEFFF'
			h='80%'
			borderRadius={10}
		>
			<HStack
				mb={6}
				borderRadius={30}
				padding='3'
				alignItems='center'
				justifyContent={'space-between'}
			>
				<Box>
					<Text bold fontSize={'xl'}>
						{data.category} - {data.name}
					</Text>
				</Box>
				<VStack alignItems='center' justifyContent='center'>
					<Pressable mb={3} borderRadius={8} p={1} bg='blue.200'>
						<Text color='#fff'>{data.category}</Text>
					</Pressable>
					{data.status === 'done' ? (
						<Image alt='status' source={finish} width='50px' height='50px' />
					) : (
						<Image alt='status' source={pending} width='50px' height='50px' />
					)}
				</VStack>
			</HStack>
			<Text padding={5}>{data.description}</Text>
		</View>
	);
};

export default DetailList;
