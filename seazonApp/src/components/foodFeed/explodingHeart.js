import React, { useState, useRef } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { Easing } from 'react-native-reanimated';

const ExplodingHeart = () => {
	const [isPressed, setIsPressed] = useState(false);
	const scaleValue = useRef(new Animated.Value(1)).current;
	const colorValue = useRef(new Animated.Value(0)).current;

	const handlePressIn = () => {
		setIsPressed(true);
		Animated.timing(scaleValue, {
			toValue: 0.9,
			duration: 150,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		setIsPressed(false);
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 150,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}).start();
		Animated.timing(colorValue, {
			toValue: isPressed ? 0 : 1,
			duration: 150,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: false,
		}).start();
	};

/* 	const iconStyle = {
		transform: [{ scale: 1 }],
		color: colorValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['#bdbdbd', '#ff4081'],
		}),
	}; */

	return (
		<TouchableWithoutFeedback 
/* 		onPressIn={handlePressIn} 
		FonPressOut={handlePressOut} */>
			<View>
				<Animated.View>
					<MaterialCommunityIcons
						name="heart"
						size={50}
						style={iconStyle} />
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ExplodingHeart;
