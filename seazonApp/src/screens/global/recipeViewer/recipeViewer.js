import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, ScrollView, ImageBackground, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BallIndicator } from "react-native-indicators";

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// Firebase Firestore
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../firebase/firebase-config";

// Recipe Viewer Pages
import RecipeViewerDetails from "./recipeViewerDetails";
import RecipeViewerIngredients from "./recipeViewerIngredients";
import RecipeViewerComments from "./recipeViewerComments";

const RecipeViewer = (props) => {

	const navigation = useNavigation();
	const recipe = props.route.params.recipe

	/* 	const [recipe, setRecipe] = useState(null)
		const recipeID = props.route.params.id */

	/* Retrieve the recipe data from the cloud from its ID */
	/* 	const fetchRecipe = async (id) => {
			const recipeRef = doc(db, 'recipes', id)
			const docSnap = await getDoc(recipeRef)
			return docSnap.data()
		} */

	/* 	useEffect(() => {
			const fetchAndSetRecipe = async () => {
				const recipeData = await fetchRecipe(recipeID)
				console.log(recipeData)
				setRecipe(recipeData)
			}
			fetchAndSetRecipe();
		}, [recipeID])
	 */

	/* If the recipe hasn't loaded yet */
	/* 	if (!recipe) {
			return (
				<View style={{ flex: 1, backgroundColor: '#121212' }} >
					<BallIndicator color="white" />
				</View>
			)
		} */

	const HeaderBar = () => {
		return (
			<View style={styles.header}>
				{/* Left side */}
				<View style={{ position: 'absolute', left: '5%' }}>
					{/* Back button */}
					<Pressable
						onPress={() => navigation.goBack()}
						hitSlop={10}>
						<MaterialIcons
							name="arrow-back-ios"
							size={20}
							color={'white'} />
					</Pressable>
				</View>
			</View>
		)
	};

	return (
		<>
			<View style={{ flex: 1, backgroundColor: 'black' }} >
				{/* Header */}
				<HeaderBar />
				<View style={{ flex: 1 }} >
					<ScrollView style={{ backgroundColor: 'black' }}>
						{/* Cover image */}
						<ImageBackground
							source={{ uri: recipe.coverImage }}
							style={{ height: 500, width: '100%' }} >
						</ImageBackground>
						{/* Components */}
						<RecipeViewerDetails recipe={recipe} />
						<RecipeViewerIngredients recipe={recipe} />
						<RecipeViewerComments recipe={recipe} />
					</ScrollView>
				</View>
			</View>
		</>
	)
};

const styles = StyleSheet.create({
	header: {
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: '5%',
		backgroundColor: 'black'
	},
	headerTitle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14
	},
	optionsContainer: {
		position: 'absolute',
		right: '5%'
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#00000090',
		justifyContent: 'center',
		alignItems: 'center'
	},
	/* Comment Options */
	body: {
		alignItems: 'center',
		flex: 1
	},
	modalOption: {
		width: '80%',
		height: 50,
		borderColor: 'white',
		borderRadius: 25,
		flexDirection: 'row',
		alignItems: 'center'
	},
	text: {
		paddingLeft: '10%',
		fontWeight: '400',
		fontSize: 16,
		flex: 1
	}
})

export default RecipeViewer;