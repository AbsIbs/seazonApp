import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import uuid from 'react-native-uuid'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SwitchSelector from "react-native-switch-selector";

const RenderingIngredientArray = (props) => {
  const convert = require('convert-units')
  const [servings, setServings] = useState({
    value: 1,
    sign: 0
  });
  const [currentUnit, setCurrentUnit] = useState('metric');
  const initialServingsChange = useRef(false)
  const initialUnitChange = useRef(false)

  /* Images */
  const recipeImages = {
    'Cereals and Pulses': require('../../assets/img/recipeType/cerealsAndPulses.png'),
    'Dairy': require('../../assets/img/recipeType/dairy.png'),
    'Fruits': require('../../assets/img/recipeType/fruits.png'),
    'Meat': require('../../assets/img/recipeType/meat.png'),
    'Spices and Herbs': require('../../assets/img/recipeType/spicesAndHerbs.png'),
    'Vegetables': require('../../assets/img/recipeType/vegetables.png'),
    'Seafood': require('../../assets/img/recipeType/seafood.png')
  };

  const [updatedObject, setUpdatedObject] = useState(props.array)

  const measurementOptions = [
    { label: 'metric', value: 'metric' },
    { label: 'imperial', value: 'imperial' }
  ];

  const unitObject = {
    'imperial': {
      'ml': 'cup',
      'l': 'gal',
      'g': 'lb',
      'kg': 'st'
    },
    'metric': {
      'cup': 'ml',
      'gal': 'l',
      'lb': 'g',
      'st': 'kg'
    }
  };

  /* On initial render, we force all of the ingredients into metric format */
  useEffect(() => {
    setUpdatedObject(prevState => {
      const updatedArray = prevState.map((item, index) => {
        let updatedItem = { ...item };
        /* We firstly deal with the main ingredients */
        if (item.measurement in unitObject['metric']) {
          updatedItem = {
            ...item,
            amount: Math.round(convert(item.amount).from(item.measurement).to(unitObject['metric'][item.measurement]) * 10) / 10,
            measurement: unitObject['metric'][item.measurement]
          }
        }
        /* And then the alternatives */
        if (item.alternatives.length > 0) {
          let updatedAlternatives = item.alternatives.map((alternative) => {
            if (alternative.measurement in unitObject['metric']) {
              return {
                ...alternative,
                amount: Math.round(convert(alternative.amount).from(alternative.measurement).to(unitObject['metric'][alternative.measurement]) * 10) / 10,
                measurement: unitObject['metric'][alternative.measurement]
              }
            } else {
              return { ...alternative }
            }
          });
          updatedItem = {
            ...updatedItem,
            alternatives: updatedAlternatives
          };
        }
        return updatedItem;
      });
      return updatedArray;
    })
  }, [])

  /* When we toggle the imperial and metric switch, the ingredient informtion changes */
  useEffect(() => {
    if (initialUnitChange.current) {
      setUpdatedObject(prevState => {
        const updatedArray = prevState.map((item, index) => {
          let updatedItem = { ...item };
          /* We firstly deal with the main ingredients */
          if (item.measurement in unitObject.imperial || item.measurement in unitObject.metric) {
            updatedItem = {
              ...updatedItem,
              amount: Math.round(convert(item.amount).from(item.measurement).to(unitObject[currentUnit][item.measurement]) * 10) / 10,
              measurement: unitObject[currentUnit][item.measurement]
            };
          }
          /* And then with the alternative ingredients */
          if (item.alternatives) {
            let updatedAlternatives = item.alternatives.map((alternative) => {
              if (alternative.measurement in unitObject.imperial || alternative.measurement in unitObject.metric) {
                return {
                  ...alternative,
                  amount: Math.round(convert(alternative.amount).from(alternative.measurement).to(unitObject[currentUnit][alternative.measurement]) * 10) / 10,
                  measurement: unitObject[currentUnit][alternative.measurement]
                }
              } else {
                return { ...alternative }
              }
            });
            updatedItem = {
              ...updatedItem,
              alternatives: updatedAlternatives
            };
          }
          return updatedItem;
        });
        return updatedArray;
      });
    }
    else {
      initialUnitChange.current = true
    }
  }, [currentUnit])

  useEffect(() => {
    if (initialServingsChange.current) {
      setUpdatedObject(prevState => {
        const updatedArray = prevState.map((item, index) => {
          const updatedItem = { ...item };
          if (item.measurement in unitObject.imperial || item.measurement in unitObject.metric) {
            updatedItem.amount = Math.round(((item.amount / (servings.value + servings.sign)) * (servings.value)) * 10) / 10;
          }
          if (item.alternatives) {
            const updatedAlternatives = item.alternatives.map((alternative) => {
              const updatedAlternative = { ...alternative };
              if (alternative.measurement in unitObject.imperial || alternative.measurement in unitObject.metric) {
                updatedAlternative.amount = Math.round(((alternative.amount / (servings.value + servings.sign)) * (servings.value)) * 10) / 10;
              }
              return updatedAlternative;
            });
            updatedItem.alternatives = updatedAlternatives;
          }
          return updatedItem;
        });
        return updatedArray;
      });
    }
    else {
      initialServingsChange.current = true;
    }
  }, [servings.value]);


  /* Ingredient Component */
  const Ingredient = (props) => {
    return (
      <View style={styles.ingredientOuterContainer}>
        <View style={styles.ingredientInnerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Image */}
            <View style={[styles.ingredientImages, { flex: 1.5 }]}>
              <View style={styles.ingredientTypeImageContainer}>
                <Image
                  source={recipeImages[props.type]}
                  style={{ height: 30, width: 30 }} />
              </View>
            </View>
            {/* Ingredient Name */}
            <View style={[{ flex: 5 }]}>
              <Text style={{ fontFamily: 'Poppins-Regular', paddingTop: 1.5, paddingBottom: 0 }}>{props.name}</Text>
            </View>
            {/* Amount and measurement */}
            <View style={{ paddingHorizontal: 10, justifyContent: 'center', flex: 2 }}>
              <Text style={{ fontFamily: 'Poppins-Light', paddingTop: 1.5, paddingBottom: 0, textAlign: 'right' }} >{props.amount} {props.measurement}</Text>
            </View>
          </View>
          {/* Alternatives */}
          {props.alternatives.length > 0 ?
            (
              <View>
                <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5, paddingTop: 15, paddingBottom: 5 }}>Can be <Text style={{ fontFamily: 'Poppins-Medium' }}>substituted</Text> with:</Text>
                {props.alternatives.map((item) => {
                  const key = uuid.v4()
                  return (
                    <View style={{ flexDirection: 'row' }} key={key} >
                      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }} >
                        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5 }} >{item.name}</Text>
                        <Entypo
                          name={'ccw'}
                          size={12}
                          style={{ paddingLeft: 5 }} />
                      </View>
                      <View style={{ alignItems: 'flex-end', flex: 1 }} >
                        <Text style={{ fontFamily: 'Poppins-Light', fontSize: 12.5 }} >{item.amount} {item.measurement} </Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            ) : null}
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }} >
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }} >
          <SwitchSelector
            options={measurementOptions}
            initial={0}
            onPress={value => setCurrentUnit(value)}
            textColor={'#d3d3d3'}
            selectedColor={'#ffffff'}
            borderColor={'#2B303C'}
            buttonColor={'#2B303C'}
            hasPadding
            fontSize={12}
            backgroundColor={'#121212'} />
        </View>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end' }} >
          <View style={{ flexDirection: 'row', paddingVertical: 10 }} >
            <View style={styles.changeServingsContainer}>
              <Pressable
                hitSlop={10}
                onPress={() => {
                  servings.value > 1 ? setServings({ value: servings.value - 1, sign: 1 }) : null
                }}>
                <AntDesign
                  name='minus'
                  color='red'
                  size={20} />
              </Pressable>
              <Text style={{ fontWeight: 'bold', color: 'white' }} >{servings.value} <Text style={{ fontSize: 12, fontWeight: 'normal' }} >{servings.value == 1 ? 'person' : 'people'}</Text></Text>
              <Pressable
                hitSlop={10}
                onPress={() => {
                  setServings({ value: servings.value + 1, sign: -1 })
                }}>
                <AntDesign
                  name='plus'
                  color='red'
                  size={20} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {updatedObject.map((item, index) => {
        const key = uuid.v4()
        return (
          <Ingredient
            name={item.name}
            key={key}
            amount={item.amount}
            measurement={item.measurement}
            image={item.image}
            type={item.type}
            alternatives={item.alternatives}
            index={index} />
        )
      })}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  changeServingsContainer: {
    height: 40,
    width: 140,
    borderColor: '#2B303C',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  ingredientOuterContainer: {
    paddingVertical: 10,
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1
  },
  ingredientInnerContainer: {
    minHeight: 50,
    width: '100%',
    paddingVertical: 10
  },
  ingredientImages: {
    flex: 1,
    justifyContent: 'center'
  },
  ingredientTypeImageContainer: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default RenderingIngredientArray;