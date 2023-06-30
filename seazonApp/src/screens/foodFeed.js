import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FloatingAction } from "react-native-floating-action";
import MentionHashtagTextView from "react-native-mention-hashtag-text";
import { FlashList } from '@shopify/flash-list';
import UserProfileImage from '../components/global/userProfileImage';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'

// Firebase Firestore
import { doc, collection, getDoc, getDocs, query, limit, startAfter, orderBy } from "firebase/firestore/lite";
import { db } from '../../firebase/firebase-config';
import { Timestamp, serverTimestamp } from 'firebase/firestore/lite';

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

    // Caclulate how much time has passed since the recipe was posted
    const GetTimeSincePost = () => {
      const originalTimestamp = (new Date(props.timestamp.toDate()));
      const currentTimestamp = Timestamp.now().toMillis();

      // Difference in hours
      const hourDifference = (currentTimestamp - originalTimestamp) / 3600000

      switch (true) {
        case hourDifference < 1:
          /* Return e.g., 9m */
          return `${Math.floor(hourDifference * 60)}m`
        case hourDifference >= 1 && hourDifference <= 24:
          /* Return e.g., 9h */
          return `${Math.floor(hourDifference)}h`
        case hourDifference > 24:
          return `${Math.floor(hourDifference / 24)}d`
      }
    };

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
            <Text style={styles.cardAuthor}>{props.author} • <GetTimeSincePost /> </Text>
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
  const [refreshing, setRefreshing] = React.useState(false);

  // Recipes
  const [recipes, setRecipes] = useState([]);
  const [lastPost, setLastPost] = useState(null);

  //Get initial recipes
  const getInitialPosts = async () => {
    const recipesRef = collection(db, 'recipes')
    // We initially load only 5 recipes.
    const q = query(recipesRef, orderBy('timestamp', 'desc'), limit(3))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipes(data);
    if (querySnapshot.docs.length > 0) {
      setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } else {
      setLastPost(null);
    }
  };

  // When the user gets to the bottom of the page, we load 5 more recipes
  const getMorePosts = async () => {
    // We put this here to prevent an endless loop of refreshing posts.
    if (lastPost === null) return;
    const recipesRef = collection(db, 'recipes')
    const q = query(recipesRef, orderBy('timestamp', 'desc'), startAfter(lastPost), limit(3))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipes(prevState => {
      return ([...prevState, ...data])
    })
    if (querySnapshot.docs.length > 0) {
      setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } else {
      setLastPost(null);
    }
  };

  // On refresh posts
  const refreshPosts = async () => {
    setRefreshing(true);
    /* Retrieve recipes */
    const recipesRef = collection(db, 'recipes')
    const q = query(recipesRef, orderBy('timestamp', 'desc'), limit(3))
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
    setRecipes(data);
    if (querySnapshot.docs.length > 0) {
      setLastPost(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } else {
      setLastPost(null);
    }
    setRefreshing(false)
  }

  // For offline testing of UI
  const testData = [
    {
      title: 'Original Turkey-style shish',
      author: 'TheRock',
      profileImageURL: require('../../assets/img/temp/man.png'),
      coverImage: require('../../assets/img/temp/meal1.png'),
      difficulty: 'Simple',
      servings: 2,
      cookingTime: '1h 10m',
      chefsNotes: 'Yum yum dim sum. This is just so incredible. #Tasty. Thiofjaois fioasd nfiosda nfoidas nfoidas nfio sdanfio dasnoofjsda oif dasoi fsdao'
    },
    {
      title: 'Mediterranean salad with chicken strips and pesto',
      author: 'TheRock',
      profileImageURL: require('../../assets/img/temp/man.png'),
      coverImage: require('../../assets/img/temp/meal2.png'),
      difficulty: 'Intermediate',
      servings: 3,
      cookingTime: '50m',
      chefsNotes: "Alright, this is just too damn tasty. I can't even put it in words."
    }
  ];

  return (
    <>
      {/* Content */}
      <View style={styles.container}>
        <FlashList
          data={recipes}
          estimatedItemSize={500}
          onEndReached={() => getMorePosts()}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshPosts()} />
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

export default FoodFeed