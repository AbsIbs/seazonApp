import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import uuid from 'react-native-uuid'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

import BouncyCheckbox from "react-native-bouncy-checkbox";

const RenderingIngredientArray = (props) => {

  const convert = require('convert-units')

  const originalServings = props.servings
  const [servings, setServings] = useState(originalServings)

  const [updatedObject, setUpdatedObject] = useState(props.array)

  const unitObject = {
    'imperial': {
      'ml': 'cup',
      'l': 'gal',
      'g': 'lb'
    },
    'metric': {
      'cup': 'ml',
      'gal': 'l',
      'lb': 'g'
    }
  };

  /* Ingredient Component */
  const Ingredient = (props) => {

    /* The component for displaying the converted values for the ingredients */
    const ConvertedMeasurement = () => {

      /* A helper function to programatically round our values */
      const round = (value) => {
        if (value < 1) {
          return value.toFixed(2);
        } else if (value < 10) {
          return value.toFixed(1);
        } else {
          return value.toFixed(0);
        }
      };

      const RenderMeasurements = (props) => {
        return (
          <>
            <Text style={styles.ingredientMeasurements} >
              {round(props.amount)} {props.measurement}
            </Text>
            <Text style={styles.ingredientMeasurements} >
              ({round(props.convertedAmount)} {props.newMeasurement})
            </Text>
          </>
        )
      }

      if (props.measurement in unitObject.metric) {
        const newMeasurement = unitObject['metric'][props.measurement]
        const convertedAmount = (servings / originalServings) * convert(props.amount).from(props.measurement).to(newMeasurement) * 10 / 10
        const amount = (servings / originalServings) * props.amount
        return <RenderMeasurements amount={amount} measurement={props.measurement} convertedAmount={convertedAmount} newMeasurement={newMeasurement} />
      } else if (props.measurement in unitObject.imperial) {
        const newMeasurement = unitObject['imperial'][props.measurement]
        const convertedAmount = (servings / originalServings) * convert(props.amount).from(props.measurement).to(newMeasurement) * 10 / 10
        const amount = (servings / originalServings) * props.amount
        return <RenderMeasurements amount={amount} measurement={props.measurement} convertedAmount={convertedAmount} newMeasurement={newMeasurement} />
      } else {
        const amount = (servings / originalServings) * props.amount
        return (
          <>
            <Text style={styles.ingredientMeasurements} >
              {round(amount)} {props.measurement}
            </Text>
          </>
        )
      }
    };

    return (
      <View style={styles.ingredientOuterContainer}>
        <View style={styles.ingredientInnerContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Checkbox */}
            <BouncyCheckbox
              fillColor="#2B303C"
              unfillColor="#00000000" />
            {/* Ingredient Name */}
            <View style={{ flex: 6 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', paddingTop: 1.5, paddingBottom: 0, fontSize: 13 }}>{props.name}</Text>
            </View>
            {/* Amount and measurement */}
            <View style={{ alignItems: 'flex-end', flex: 2 }}>
              <ConvertedMeasurement />
            </View>
          </View>
          {/* Alternatives */}
          {props.alternatives.length > 0 ?
            (
              <View style={{ paddingTop: 20 }}>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text style={styles.header}>Ingredients for:</Text>
        {/* Servings button */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.changeServingsContainer}>
              <Pressable
                hitSlop={10}
                onPress={() => {
                  servings > 1 ? setServings(servings - 1) : null
                }}>
                <AntDesign
                  name='minus'
                  color='red'
                  size={20} />
              </Pressable>
              <Text style={{ fontWeight: 'bold', color: 'white' }} >{servings} <Text style={{ fontSize: 12, fontWeight: 'normal' }} >{servings == 1 ? 'person' : 'people'}</Text></Text>
              <Pressable
                hitSlop={10}
                onPress={() => {
                  setServings(servings + 1)
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
  header: {
    fontFamily: 'Poppins',
    fontSize: 14,
    flex: 1,
    color: 'white'
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
    paddingVertical: 2.5,
    borderBottomColor: '#ffffff20',
    borderBottomWidth: 1
  },
  ingredientInnerContainer: {
    minHeight: 50,
    width: '100%',
    paddingVertical: 10
  },
  ingredientMeasurements: {
    fontFamily: 'Poppins-Light',
    paddingTop: 1.5,
    textAlign: 'right',
    fontSize: 12
  }
});

export default RenderingIngredientArray;