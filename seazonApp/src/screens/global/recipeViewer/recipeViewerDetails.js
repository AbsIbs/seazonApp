import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Pressable } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from "react-native-modal";
import UserProfileImage from "../../../components/global/userProfileImage";
import LetsCookIt from "./letsCookIt";
import CollapsibleTextView from "../../../components/global/collapsibleTextView";

/* Icons */
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'

const RecipeViewerDetails = (props) => {

	const recipe = props.recipe
	const [stepsModal, setStepsModal] = useState(false)
	const [like, setLike] = useState(false)
	const [iMadeIt, setImadeIt] = useState(false)
	const [following, setFollowing] = useState(false)

	const Info = (props) => {
		return (
			<View style={styles.infoContainer} >
				<View style={styles.infoImageContainer} >
					<MaterialCommunityIcons
						name={props.image}
						size={25}
						color={'white'} />
				</View>
				<View style={{ paddingVertical: 2.5, paddingLeft: 10 }} >
					<Text style={styles.infoTitle} >
						{props.title} {props.time ? 'mins' : ''} {props.serving ? (recipe.servings > 1 ? 'people' : 'person') : ''}
					</Text>
					<Text style={styles.infoDesc} >{props.desc}</Text>
				</View>
			</View>
		)
	};

	const tagsArray = [recipe['difficulty']].concat(recipe.mealType, recipe.dietary).filter(tag => tag !== undefined)

	return (
		<View style={styles.container}>
			<View style={[styles.section, { flex: 1 }]}>
				<Text style={styles.recipeTitle}>{recipe.title}</Text>
				<View style={{ flexDirection: 'row', paddingTop: 10 }}>
					{/* Profile image */}
					<View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
						<UserProfileImage
							height={35}
							width={35}
							borderWidth={0}
							source={{ uri: recipe.profileImageURL }} />
						<Text style={[styles.author, { paddingLeft: 10 }]} >{recipe.author}</Text>
					</View>
					<View style={{ alignItems: 'flex-end' }} >
						<TouchableOpacity
							style={[
								styles.followButton,
								{ backgroundColor: following ? '#2B303C' : 'white' }
							]}
							onPress={() => setFollowing(!following)}>
							<Text style={{ color: following ? 'white' : 'black' }}>{following ? 'Following' : 'Follow'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', flex: 1, paddingTop: 30, justifyContent: 'center' }}>
					{/* Like button */}
					<Pressable
						onPressIn={() => setLike(!like)}
						style={styles.actionsContainer}>
						<Fontisto
							name={like ? 'heart' : 'heart-alt'}
							size={25}
							color={like ? '#E84A4A' : 'white'} />
						<Text style={styles.label}>Like</Text>
					</Pressable>
					{/* Add button */}
					<Pressable style={styles.actionsContainer}>
						<Entypo
							name='add-to-list'
							size={25}
							color={'white'} />
						<Text style={styles.label}>Add</Text>
					</Pressable>
					{/* Share */}
					<Pressable style={styles.actionsContainer}>
						<Entypo
							name='share-alternative'
							size={25}
							color='white' />
						<Text style={styles.label}>Share</Text>
					</Pressable>
					{/* Report */}
					<Pressable style={{ alignItems: 'center', paddingHorizontal: 25 }}>
						<Ionicons
							name='flag-outline'
							size={25}
							color='white' />
						<Text style={styles.label}>Report</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.section}>
				<View style={styles.timingsOuterContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Info title={recipe.prepTime} desc={'Prep time'} time image='timer-sand' />
						<Info title={recipe.cookingTime} desc={'Cooking time'} time image='timer' />
					</View>
					<View style={{ flexDirection: 'row', paddingTop: 15 }} >
						<Info title={recipe.servings} desc={'Servings'} serving image='account-multiple' />
						<Info title={recipe.difficulty} desc={'Difficulty'} image='star' />
					</View>
					<View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
						<TouchableOpacity
							style={styles.cookIt}
							onPress={() => setStepsModal(true)}>
							<Text style={[styles.buttonLabel, { color: 'white' }]}>Let's cook it!</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.iMadeIt,
								{ backgroundColor: iMadeIt ? '#2B303C' : 'white' }
							]}
							onPress={() => setImadeIt(!iMadeIt)}>
							<Text style={[
								styles.buttonLabel,
								{ color: iMadeIt ? 'white' : 'black' }]}>
								{iMadeIt ? "You've made this!" : "I made it!"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{/* 				<ScrollView horizontal style={{ marginBottom: 10 }} >
					{tagsArray.map((item, index) => {
						return (
							<View style={styles.tagContainer} key={index}>
								<Text style={styles.tag}>{item}</Text>
							</View>
						)
					})}
				</ScrollView> */}
			<View style={styles.section}>
				<Text style={styles.subHeader} >Chef's Notes</Text>
				<CollapsibleTextView text={recipe.chefsNotes} maxLines={6} />
			</View>
			<Modal isVisible={stepsModal} style={{ justifyContent: 'flex-end', margin: 0 }} >
				<LetsCookIt setStepsModal={setStepsModal} steps={recipe.steps} />
			</Modal>
		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		/* paddingHorizontal: '5%', */
	},
	profileImage: {
		height: 45,
		width: 45,
	},
	recipeTitle: {
		fontSize: 20,
		paddingRight: 5,
		color: 'white',
		fontFamily: 'Poppins-Medium'
	},
	actionsContainer: {
		borderRightWidth: 1,
		borderColor: '#2B303C',
		alignItems: 'center',
		paddingHorizontal: 25
	},
	label: {
		fontFamily: 'Poppins-Light',
		fontSize: 12,
		paddingTop: 5
	},
	followButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tagContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
		borderRadius: 6,
		paddingHorizontal: 25,
		marginRight: 5,
		backgroundColor: '#2B303C'
	},
	section: {
		paddingVertical: 20,
		borderColor: '#2B303C',
		borderBottomWidth: 1,
		paddingHorizontal: '5%'
	},
	subHeader: {
		paddingBottom: 5,
		fontFamily: 'Poppins-Medium',
		fontSize: 15,
		color: 'white'
	},
	tag: {
		fontSize: 12,
		fontFamily: 'Poppins-Regular',
		color: 'white'
	},
	author: {
		fontFamily: 'Poppins-Light',
		fontSize: 13
	},
	chefsNotes: {
		fontSize: 14,
		paddingVertical: 10,
		lineHeight: 25,
		fontFamily: 'Poppins-Regular',
	},
	timingsOuterContainer: {
		width: '100%',
		justifyContent: 'space-between',
		/* 		borderColor: '#2B303C',
				borderTopWidth: 1,
				borderBottomWidth: 1 */
	},
	/* Info Styles */
	infoContainer: {
		height: 50,
		flexDirection: 'row',
		flex: 1
	},
	infoImageContainer: {
		height: 45,
		width: 45,
		borderRadius: 8,
		backgroundColor: '#2B303C',
		justifyContent: 'center',
		alignItems: 'center'
	},
	infoTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: 14,
		color: 'white'
	},
	infoDesc: {
		fontFamily: 'Poppins-Light',
		fontSize: 12
	},
	cookIt: {
		height: 60,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E32828',
		borderRadius: 8
	},
	iMadeIt: {
		height: 60,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 10
	},
	mealPlan: {
		height: 50,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2B303C',
		borderRadius: 8,
		flex: 1,
		marginRight: 2.5
	},
	tasteList: {
		height: 50,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#2B303C',
		borderWidth: 1,
		borderRadius: 8,
		flex: 1.5,
		marginLeft: 2.5
	},
	buttonLabel: {
		fontFamily: 'Poppins-Medium',
		fontSize: 12.5
	}
});

export default RecipeViewerDetails;