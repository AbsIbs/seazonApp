import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FloatingAction } from "react-native-floating-action";
import MentionHashtagTextView from "react-native-mention-hashtag-text";
import { FlashList } from '@shopify/flash-list';
import UserProfileImage from '../components/global/userProfileImage';

// Firebase
import { getFunctions, httpsCallable } from 'firebase/functions'

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'

// Firebase Firestore
import { Timestamp } from "firebase/firestore/lite";
import { getRecipes } from '../logic/backendLogic/recipeBackendLogic';

// Logic
import { GetTimeSincePost } from '../logic/clientLogic/posts';

const FoodFeed = () => {

  const navigation = useNavigation()

  // Floating icon render
  const Icon = (props) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={props.name}
          size={15}
          color={'white'} />
      </View>
    )
  };

  // Floating icon options
  const actions = [{
    text: "Recipe",
    icon: <Icon name='note-plus' />,
    name: 'Recipe Form Stack',
    position: 1,
    color: '#E84A4A'
  }];

  // Food Feed card
  const FoodFeedCard = (props) => {

    // Toggle like icon
    const [like, setLike] = useState(false);

    return (
      <View style={styles.cardContainer}>
        {/* Top area */}
        <View style={styles.cardTopContainer}>
          <UserProfileImage height={40} width={40} borderWidth={0} source={{ uri: props.profileImageURL }} />
          <View style={styles.cardTitleAuthorContainer}>
            <Text
              numberOfLines={2}
              style={styles.cardTitle}>{props.title}
            </Text>
            <Text style={styles.cardAuthor}>{props.author} • <GetTimeSincePost timestamp={props.timestamp.seconds} /> </Text>
          </View>
          <Pressable
            style={{ alignItems: 'center', justifyContent: 'center' }}
            hitSlop={10} >
            <SimpleLineIcons
              name='options'
              size={25}
              color={'white'} />
          </Pressable>
        </View>
        {/* Recipe coverImage */}
        <Pressable
          style={styles.cardRecipeImageContainer}
          onPress={() => {
            navigation.navigate('Recipe Viewer', {
              recipe: props
              /* id: props.id */
            })
          }}>
          <ImageBackground
            source={{ uri: props.coverImage }}
            style={{ width: '100%', height: '100%' }}>
          </ImageBackground>
        </Pressable>
        {/* Interactive Container */}
        <View style={styles.interactiveContainer}>
          {/* Like button */}
          <Pressable onPress={() => setLike(!like)}>
            <Fontisto
              name={like ? 'heart' : 'heart-alt'}
              size={27}
              color={like ? '#E84A4A' : 'white'} />
          </Pressable>
          {/* Comment button */}
          <Pressable style={{ paddingLeft: 15 }}>
            <Fontisto
              name='comment'
              size={27}
              color='white' />
          </Pressable>
          {/* Add button */}
          <Pressable style={{ paddingLeft: 15 }}>
            <Entypo
              name='add-to-list'
              size={27}
              color='white' />
          </Pressable>
          {/* Share */}
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <Pressable>
              <Entypo
                name='share-alternative'
                size={27}
                color='white' />
            </Pressable>
          </View>
        </View>
        {/* Info */}
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>{props.difficulty}</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons
              name={'timer'}
              size={20}
              color={'white'} />
            <Text style={styles.cardInfoText}>{props.cookingTime}</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons
              name={'account-multiple'}
              size={20}
              color={'white'} />
            <Text style={[styles.cardInfoText, { paddingLeft: 5 }]}>{props.servings}</Text>
          </View>
        </View>
        {/* Comment section */}
        <MentionHashtagTextView
          mentionHashtagColor={"#E32828"}
          style={styles.chefsNotes}
          numberOfLines={3}>
          {props.chefsNotes}
        </MentionHashtagTextView>
      </View>
    )
  };

  /// Recipe Retrieval
  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);

  // Recipes
  const [recipes, setRecipes] = useState([]);
  const [lastPostID, setLastPostID] = useState(null);

  // Cloud functions
  /* const functions = getFunctions()
  const getInitialRecipes = httpsCallable(functions, 'recipes-getInitialRecipes')
  const getMoreRecipes = httpsCallable(functions, 'recipes-getMoreRecipes') */

  const getRecipesHandler = () => {
    setRefreshing(true)
    getRecipes({ lastPostID: lastPostID })
      .then(result => {
        setRecipes(result)
        return result
      })
      .then(result => {
        setLastPostID(result[result.length - 1].id)
        setRefreshing(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  /*   const getMoreRecipesHandler = () => {
      if (lastPostID === null) return;
      getMoreRecipes({ lastPostID: lastPostID })
        .then(result => {
          setRecipes(prevState => {
            return ([...prevState, ...result.data])
          })
          return result
        })
        .then(result => {
          setLastPostID(result.data[result.data.length -1].id)
        })
        .catch(error => {
          console.log(error)
        })
    } */

  // Get recipes on load
  /*  useEffect(() => {
     getInitialRecipesHandler()
     console.log('initial load')
   }, [])
  */

  return (
    <>
      {/* Content */}
      <View style={styles.container}>
        <FlashList
          data={recipes}
          estimatedItemSize={500}
          onEndReached={() => getRecipesHandler()}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getRecipesHandler()} />
          }
          renderItem={({ item, index }) => {
            return (
              <FoodFeedCard
                index={index}
                recipeID={item.id}
                title={item.title}
                author={item.author}
                profileImageURL={item.profileImageURL}
                coverImage={item.coverImage}
                difficulty={item.difficulty}
                servings={item.servings}
                cookingTime={item.cookingTime}
                prepTime={item.prepTime}
                chefsNotes={item.chefsNotes}
                timestamp={item.timestamp}
                ingredients={item.ingredients}
                steps={item.steps}
                dietary={item.dietary} />
            )
          }}
        />
      </View>
      {/* Floating action button */}
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          navigation.navigate(name);
        }}
        color='#E93324'
        distanceToEdge={{ vertical: 20, horizontal: 20 }}
        overlayColor='#00000000' />
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  // Food Feed Card
  cardContainer: {
    backgroundColor: '#111111',
    width: '100%',
    paddingVertical: 15,
    marginBottom: 10
  },
  cardTopContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardProfileContainer: {
    height: 45,
    width: 45,
    borderRadius: 40
  },
  cardTitleAuthorContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10
  },
  cardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white'
  },
  cardAuthor: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12
  },
  cardButtonContainer: {
    alignItems: 'center'
  },
  cardRecipeImageContainer: {
    paddingTop: 10,
    height: 500,
    width: '100%'
  },
  interactiveContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingTop: 15
  },
  cardInfoContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    paddingTop: 15,
  },
  cardInfo: {
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    marginRight: 10
  },
  cardInfoText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'white'
  },
  chefsNotes: {
    fontSize: 12,
    paddingBottom: 5,
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: '5%',
    paddingTop: 15,
    color: 'white'
  }
});

export default FoodFeed;