import React from "react";
import { StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import FastImage from "react-native-fast-image";

const UserProfileImage = (props) => {

	const auth = getAuth();

	return (
		<FastImage
			source={props.source}
			style={styles(props).imageStyle}
			resizeMode='contain' />
	)
};

const styles = (props) => StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageStyle: {
		height: props.height,
		width: props.width,
		borderWidth: props.borderWidth,
		borderColor: 'white',
		borderRadius: props.height / 2
	}
});

export default UserProfileImage;