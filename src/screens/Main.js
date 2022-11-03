import * as React from 'react';
import { Box, Text, Center, Image } from 'native-base';

import homeImage from '../assets/images/home-image.png';

import { PrimaryButton } from '../components/Button';

export const Main = () => {
	return (
		<Box mt={24}>
			<Center>
				<Image
					source={homeImage}
					alt='home image'
					style={{ marginBottom: 30 }}
				/>
				<Box mb={20} width={240}>
					<Center>
						<Text fontSize={'4xl'} bold style={{ marginBottom: 30 }}>
							Ways <Text style={{ color: '#B82020' }}>To</Text>
							<Text style={{ color: '#FF5555' }}>DO</Text>
						</Text>
						<Text textAlign='center' fontSize={12}>
							Write your activity and finish your activity. Fast, Simple and
							Easy to Use
						</Text>
					</Center>
				</Box>
				<PrimaryButton btnName={'Login'} color='orange' />
				<PrimaryButton btnName={'Register'} color='gray' />
			</Center>
		</Box>
	);
};
