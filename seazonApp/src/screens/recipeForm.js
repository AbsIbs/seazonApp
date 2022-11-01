import React, {useState, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Swiper from 'react-native-web-swiper'
import { useNavigation } from "@react-navigation/native";

import RecipeUploadScreen1 from "./recipeUploadpage1";

import RecipeFormHeader from "../components/recipeFormHeader";
import recipeFormSection from "../components/recipeFormSection";
import recipeMacros from "../components/recipeMacros";

const labels = ["Details", "Ingredients", "Steps"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#E32828',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#E32828',
  stepStrokeUnFinishedColor: '#605E5E',
  separatorFinishedColor: '#E32828',
  separatorUnFinishedColor: '#605E5E',
  stepIndicatorFinishedColor: '#E32828',
  stepIndicatorUnFinishedColor: 'black',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#E32828',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#605E5E',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: '#E32828'
}

const RecipeForm = () => {

  const navigation = useNavigation();

  const [pageNum, setPageNum] = useState(0);
  const [backStatus, setBackStatus] = useState('none');

  const dataObject = {};

  const changePageNum = (index) => {
    setPageNum(index);
    index > 0? setBackStatus('flex'): setBackStatus('none');
  };

  const customIcons = ({position, stepStatus}) => {
    const iconsList = ['file-alt', 'info-circle', 'tasks']
    return(
      <View>
          <FontAwesome5
          name={iconsList[position]}
          color = {stepStatus === 'finished' ? '#ffffff' : '#E84A4A'}
          size = {12.5}/>
      </View>
    )
  };

  const swiperRef = useRef(null);

  const newPageChange = (instruction) => {
    instruction == 'next'? swiperRef.current.goToNext(): swiperRef.current.goToPrev(); 
    const index = swiperRef.current.getActiveIndex(); 
  };

  return(
    <View style={styles().container}>
      {RecipeFormHeader(navigation)}
      <View style={styles().stepContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={pageNum}
          labels={labels}
          stepCount={3}
          renderStepIndicator={(position, stepStatus) => customIcons(position, stepStatus)}
          />
      </View>
      <View style={styles().swiperContainer}>
        <Swiper 
          onIndexChanged={(index) => changePageNum(index)}
          controlsProps={{
          prevPos: false,
          dotsPos: false,
          nextPos: false}}
          ref={swiperRef}
          gesturesEnabled={() => false}>
          {/* slide 1 */}
          <RecipeUploadScreen1 />
          {/* slide 2 */}
          <ScrollView>
            <View style={styles().section}>
              <Text style={styles().nutrientsTitle}>Calories <Text style={styles().nutrientsOptional}>(Optional)</Text> </Text>
              {recipeMacros({title: 'Calories', desc: '(kcal)'}, dataObject)} 
            </View>
            <View style={styles().section}>
              <Text style={styles().nutrientsTitle}>Macro Nutrients <Text style={styles().nutrientsOptional}>(Optional)</Text> </Text>
              {recipeMacros({title: 'Carbs', desc: '(g)'}, dataObject)}  
              {recipeMacros({title: 'Fat', desc: '(g)'}, dataObject)}  
              {recipeMacros({title: 'Protein', desc: '(g)'}, dataObject)}  
            </View>
          </ScrollView>
          {/* slide 3 */}
          <ScrollView>
            <View>
              <View style={styles().section}>
                {recipeFormSection({title: "Description", type: 'text', placeholder: 'Let others know the story behind your recipe. Feel free to use hashtags!', height: 100})} 
              </View>
            </View>
          </ScrollView>
        </Swiper>
      </View>
      <View style={styles().buttonSection}>
        <View style={styles().buttonContainer}>
          <TouchableOpacity 
          style={[styles('prev').button, {display: backStatus}]}
          onPress={() => newPageChange('prev')}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles().buttonContainer}>
          <TouchableOpacity 
          style={styles('next').button}
          onPress={() => newPageChange('next')}>
            <Text style={{color: '#ffffff'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = (button) => StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: 'black'
  },
  stepContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1
  },
  text: {
    color: 'white'
  },
  swiperContainer: {
    flex: 1,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10
  },
  outerInputSection: {
    alignItems: 'center'
  },
  buttonSection: {
    height: 55, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  button: {
    height: '100%',
    width: '90%',
    backgroundColor: button == 'next'? '#E32828': '#00000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderColor: button == 'next'? '': '#757882',
    borderWidth: button == 'next'? 0: 0.5
  },
  nutrientsTitle: {
    fontSize: 16,
    color: '#ffffff',
    paddingTop: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10
  },
  nutrientsOptional: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});

export default RecipeForm;

