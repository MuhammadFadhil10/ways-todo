import * as React from 'react';

import { Button, Spinner, Text } from 'native-base';
import { StyleSheet } from 'react-native';

export const PrimaryButton = ({ btnName, onPress, color, isLoading }) => {
	const styles = StyleSheet.create({
		button: {
			backgroundColor: color === 'orange' ? '#FF5555' : '#0000004F',
			width: 310,
			height: 40,
			borderRadius: 5,
		},
	});

	return (
		<Button style={styles.button} marginBottom={5} onPress={onPress}>
			{isLoading ? (
				<Spinner accessibilityLabel='Loading posts' size='lg' />
			) : (
				<Text bold fontSize={16}>
					{btnName}
				</Text>
			)}
		</Button>
	);
};
