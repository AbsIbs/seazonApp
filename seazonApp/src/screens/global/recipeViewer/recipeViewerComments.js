import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import uuid from 'react-native-uuid'

import { getAuth } from "firebase/auth";
import UserProfileImage from "../../../components/global/userProfileImage";

// Firebase Firestore
import { doc, getDoc, where, getDocs, collection, query, limit, orderBy } from "firebase/firestore/lite";
import { db } from "../../../../firebase/firebase-config";

import Comment from "../../../components/global/comment";

const RecipeViewerComments = (props) => {

	const recipe = props.recipe

	const navigation = useNavigation();

	const auth = getAuth();
	const user = auth.currentUser

	// Store comments from database
	const [comments, setComments] = useState([])

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
						navigation.navigate('Recipe Add Comment', {
							recipe: recipe
						})}>
					<Text style={styles.placeholder}>Any comments?</Text>
				</Pressable>
			</View>
		)
	};

	// Load comments
	const retrieveComments = async () => {
		/* Retrieve comments */
		const q = query(
			collection(db, 'comments'),
			where('recipeID', '==', recipe.recipeID),
			orderBy('timestamp', 'desc'),
			limit(5)
		)
		const querySnapshot = await getDocs(q)
		const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

		/* Retrieve User details */
		for (let i = 0; i < data.length; i++) {
			const targetRecipe = data[i]
			const docRef = doc(db, 'users', targetRecipe.userID)
			const docSnap = await getDoc(docRef)
			const tempData = docSnap.data();
			targetRecipe.author = tempData.displayName
			targetRecipe.profileImageURL = tempData.profileImageURL
		}
		setComments(data);
	}

	/* Retrieve Comments on page load */
	useEffect(() => {
		retrieveComments()
	}, [])

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }} >
				<View style={{ flex: 1 }} >
					<Text style={styles.header}>Comments</Text>
					<Text style={styles.placeholder} >20 comments</Text>
				</View>
				<Pressable
					hitSlop={5}
					onPress={() =>
						navigation.navigate('Recipe Add Comment', {
							recipe: recipe
						})} >
					<Text style={[styles.viewAll]}>View all</Text>
				</Pressable>
			</View>
			<View style={{ paddingTop: 20 }} >
				{/* Comment Input */}
				<CommentInput />
			</View>
			{/* Comments */}
			{comments.map((item, index) => {
				const key = uuid.v4()
				return (
					<Comment
						key={key}
						index={index}
						recipeID={recipe.recipeID}
						timestamp={item.timestamp}
						userID={item.userID}
						author={item.author}
						profileImageURL={item.profileImageURL}
						commentID={item.commentID}
						comment={item.comment}
						coverImageURL={item.coverImageURL}
						edited={item.edited} />
				)
			})}
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
		paddingLeft: 15,
		marginLeft: 15
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