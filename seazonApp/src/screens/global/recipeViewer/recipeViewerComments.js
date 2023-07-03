import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth } from "firebase/auth";
import UserProfileImage from "../../../components/global/userProfileImage";

import Comment from "../../../components/global/comment";

const RecipeViewerComments = (props) => {

	const recipe = props.recipe

	const navigation = useNavigation();

	const auth = getAuth();
	const user = auth.currentUser

	const CommentInput = () => {
		return (
			<View style={{ flexDirection: 'row', flex: 1 }}>
				<UserProfileImage
					height={35}
					width={35}
					borderWidth={0}
					source={{ uri: user.photoURL }} />
				<Pressable
					style={styles.inputContainer}
					onPress={() =>
						navigation.navigate('Recipe Add Comments', {
							recipe: recipe
						})
					}>
					<Text style={styles.placeholder}>Any comments?</Text>
				</Pressable>
			</View>
		)
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }} >
				<View style={{ flex: 1 }} >
					<Text style={styles.header}>Comments</Text>
					<Text style={styles.placeholder} >20 comments</Text>
				</View>
				<Pressable
					hitSlop={5}
					onPress={() => navigation.navigate('Recipe Add Comments')} >
					<Text style={[styles.viewAll]}>View all</Text>
				</Pressable>
			</View>
			<View style={{ paddingTop: 20 }} >
				{/* Comment Input */}
				<CommentInput />
				{/* Comments */}
				<View style={{ paddingTop: 30 }} >
					
				</View>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: '5%'
	},
	header: {
		fontSize: 15,
		fontFamily: 'Poppins-Medium',
		flex: 1,
		color: '#ffffff'
	},
	/* Comment Input */
	inputContainer: {
		flex: 1,

		borderWidth: 1.5,
		borderRadius: 25,
		height: 35,
		borderColor: '#2B303C',
		justifyContent: 'center',
		paddingLeft: 15
	},
	placeholder: {
		fontSize: 12.5,
		fontFamily: 'Poppins-Light',
		color: '#ffffff70'
	},
	/* Comments */
	author: {
		fontFamily: 'Poppins-Medium',
		fontSize: 15,
		color: '#ffffff',
		flex: 1
	},
	viewAll: {
		fontFamily: 'Poppins',
		fontSize: 14,
		color: '#E84A4A'
	},
});

export default RecipeViewerComments;