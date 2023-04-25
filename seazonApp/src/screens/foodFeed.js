import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FloatingAction } from "react-native-floating-action";
import MentionHashtagTextView from "react-native-mention-hashtag-text";
import uuid from 'react-native-uuid'
import { FlashList } from '@shopify/flash-list';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
          <ImageBackground
            style={styles.cardProfileContainer}
            source={props.profileImage}
            imageStyle={{ borderRadius: 45 }}>
          </ImageBackground>
          <View style={styles.cardTitleAuthorContainer}>
            <Text
              numberOfLines={2}
              style={styles.cardTitle}>{props.title}
            </Text>
            <Text style={styles.cardAuthor}>{props.author} | 2h </Text>
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
        {/* Recipe image */}
        <Pressable style={styles.cardRecipeImageContainer} >
          <ImageBackground
            source={props.image}
            style={{ width: '100%', height: '100%' }}>
          </ImageBackground>
        </Pressable>
        {/* Interactive Container */}
        <View style={styles.interactiveContainer} >
          {/* Like button */}
          {like ?
            <Pressable onPress={() => setLike(!like)} >
              <Fontisto
                name='heart'
                size={27}
                color='#E84A4A' />
            </Pressable>
            :
            <Pressable onPress={() => setLike(!like)} >
              <Fontisto
                name='heart-alt'
                size={27}
                color='white' />
            </Pressable>
          }
          {/* Comment button */}
          <Pressable style={{ paddingLeft: 15 }} >
            <Fontisto
              name='comment'
              size={27}
              color='white' />
          </Pressable>
          {/* Share button */}
          <Pressable style={{ paddingLeft: 15 }} >
            <Fontisto
              name='share-a'
              size={27}
              color='white' />
          </Pressable>
          {/* Bookmark */}
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <Pressable>
              <Ionicons
                name='bookmark-outline'
                size={27}
                color='white' />
            </Pressable>
          </View>
        </View>
        {/* Info */}
        <View style={styles.cardInfoContainer} >
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>{props.difficulty}</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons
              name={'account-multiple'}
              size={20}
              color={'white'} />
            <Text style={[styles.cardInfoText, { paddingLeft: 5 }]}>{props.servings}</Text>
          </View>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons
              name={'timer'}
              size={20}
              color={'white'} />
            <Text style={styles.cardInfoText}>{props.timing}</Text>
          </View>
        </View>
        {/* Comment section */}
        <MentionHashtagTextView
          mentionHashtagColor={"#E32828"}
          style={styles.description}
          numberOfLines={3}>
          {props.description}
        </MentionHashtagTextView>
      </View>
    )
  };

  const DATA = [
    {
      title: 'Original Turkey-style shish',
      author: 'TheRock',
      profileImage: require('../../assets/img/temp/man.png'),
      image: require('../../assets/img/temp/meal1.png'),
      difficulty: 'Simple',
      servings: 2,
      timing: '1h 10m',
      description: 'Yum yum dim sum. This is just so incredible. #Tasty. Thiofjaois fioasd nfiosda nfoidas nfoidas nfio sdanfio dasnoofjsda oif dasoi fsdao'
    },
    {
      title: 'Mediterranean salad with chicken strips and pesto',
      author: 'TheRock',
      profileImage: require('../../assets/img/temp/man.png'),
      image: require('../../assets/img/temp/meal2.png'),
      difficulty: 'Intermediate',
      servings: 3,
      timing: '50m',
      description: "Alright, this is just too damn tasty. I can't even put it in words."
    }
  ];

  // Refresh Control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* Content */}
      <View style={styles.container}>
        <FlashList
          data={DATA}
          estimatedItemSize={500}
          onEndReached={() => console.log('end reached')}
          onEndReachedThreshold={0.5}
          refreshContro={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            const key = uuid.v4()
            return (
              <FoodFeedCard
                key={key}
                index={index}
                title={item.title}
                author={item.author}
                profileImage={item.profileImage}
                image={item.image}
                difficulty={item.difficulty}
                servings={item.servings}
                timing={item.timing}
                description={item.description} />
            )
          }}
        />
        {/*         {queryResult.map((recipe, index) => {
          const key = uuid.v4()
          return (
            <FoodFeedCard
              key={key}
              index={index}
              title={recipe.title}
              author={recipe.author}
              profileImage={recipe.profileImage}
              image={recipe.image}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
              timing={recipe.timing}
              description={recipe.description} />
          )
        })} */}
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
    width: 45
  },
  cardTitleAuthorContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10
  },
  cardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
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
  description: {
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