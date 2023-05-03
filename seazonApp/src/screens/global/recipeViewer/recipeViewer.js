import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from 'react-native-swiper'

import { BallIndicator } from "react-native-indicators";

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

// Firebase Firestore
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../firebase/firebase-config";

// Recipe Viewer Pages
import RecipeViewerDetails from "./recipeViewerDetails";
import RecipeViewerIngredients from "./recipeViewerIngredients";
import RecipeViewerComments from "./recipeViewerComments";

const RecipeViewer = (props) => {

	const navigation = useNavigation();
	/* const recipe = props.route.params.recipe */
	const swiperRef = useRef(null)
	const [currentIndex, setCurrentIndex] = useState(0)

	const [recipe, setRecipe] = useState(null)
	const recipeID = props.route.params.id

	/* Retrieve the recipe data from the cloud from its ID */
	const fetchRecipe = async (id) => {
		const recipeRef = doc(db, 'recipes', id)
		const docSnap = await getDoc(recipeRef)
		return docSnap.data()
	}

	useEffect(() => {
		const fetchAndSetRecipe = async () => {
			const recipeData = await fetchRecipe(recipeID)
			console.log(recipeData)
			setRecipe(recipeData)
		}
		fetchAndSetRecipe();
	}, [recipeID])

	/* If the recipe hasn't loaded yet */
	if (!recipe) {
		return (
			<View style={{ flex: 1, backgroundColor: '#121212' }} >
				<BallIndicator color="white" />
			</View>
		)
	}

	const HeaderBar = () => {
		return (
			<View style={styles.header}>
				<Pressable
					style={{ position: 'absolute', left: '5%' }}
					onPress={() => navigation.goBack()}
					hitSlop={10}>
					<MaterialIcons
						name="arrow-back-ios"
						size={20}
						color={'white'} />
				</Pressable>
				<Pressable
					style={styles.optionsContainer}
					hitSlop={10}>
					<SimpleLineIcons
						name='options'
						size={25}
						color={'white'} />
				</Pressable>
			</View>
		)
	};

	const Tab = (props) => {
		return (
			<Pressable
				onPress={() => {
					if (props.index > currentIndex) {
						swiperRef.current.scrollBy(props.index - currentIndex)
					} else if (props.index < currentIndex) {
						swiperRef.current.scrollBy((currentIndex - props.index) * -1)
					}
				}}
				style={[
					styles.tabLabelContainer,
					{ borderBottomColor: props.index == currentIndex ? '#E32828' : '#000000' }]}>
				<Text style={{
					color: props.index == currentIndex ? '#E32828' : '#ffffff',
					fontSize: 12,
					fontFamily: 'Poppins-Medium'
				}}>
					{props.tab}
				</Text>
			</Pressable>
		)
	};

	const tabAarray = ['Details', 'Ingredients', 'Comments']

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }} >
			{/* Header */}
			<HeaderBar />
			<View style={{ flex: 1 }} >
				<ScrollView
					style={{ backgroundColor: 'black' }}
					stickyHeaderIndices={[1]}>
					{/* Cover image */}
					<ImageBackground
						source={{ uri: recipe.coverImage }}
						style={{ height: 400, width: '100%' }} >
					</ImageBackground>
					{/* Tab */}
					<View>
						<View style={styles.tabContainer}>
							{tabAarray.map((tab, index) => {
								return (
									<Tab key={index} tab={tab} index={index} />
								)
							})}
						</View>
					</View>
					{/* Swiper and components */}
					<Swiper
						height={'100%'}
						showsPagination={false}
						ref={swiperRef}
						removeClippedSubviews={false}
						onIndexChanged={(index) => setCurrentIndex(index)}
						loop={false} >
						<RecipeViewerDetails recipe={recipe} />
						<View style={{ flex: 1 }}>
							<Text>Ingredients</Text>
						</View>
						<RecipeViewerComments recipe={recipe} />

					</Swiper>
				</ScrollView>
			</View>
		</View>
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
	// Tab
	tabContainer: {
		width: '100%',
		height: 50,
		backgroundColor: '#000000',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderBottomColor: '#2B303C',
		borderBottomWidth: 1
	},
	tabLabelContainer: {
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
		height: '100%',
		borderBottomWidth: 2
	},
	// Modal
	modal: {
		width: '85%',
		backgroundColor: '#121212',
		borderTopColor: 'red',
		borderTopWidth: 2
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	modalDesc: {
		fontSize: 12,
		paddingTop: 10,
		lineHeight: 25
	},
	modalConfirm: {
		height: 35,
		width: 100,
		borderRadius: 5,
		backgroundColor: 'red',
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalCancel: {
		height: 35,
		width: 100,
		borderRadius: 5,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ffffff50'
	}
})

export default RecipeViewer;