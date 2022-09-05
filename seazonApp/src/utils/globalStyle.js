import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const fontFamilySelector = (type) => type === 'android'? 'Inter-VariableFont_slnt,wght': 'san Francisco'

export default StyleSheet.create({

    // Modal Titles
    Display: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontWeight: '300',
        fontSize: 42
    },

    // Page Titles
    Header: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 34,
        fontWeight: '700'
    },

    // Tabs, titles, forms
    Title1 : {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 28,
        fontWeight: '500'
    },

    // Buttons, tabs, titles, forms
    Title2: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 22,
        fontWeight: '500'
    },

    title3: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 16,
        fontWeight: '500' 
    },
    // Info paragraphs
    Headline: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 20,
        fontWeight: '400'
    },

    // Station descriptions
    Body: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 13,
        fontWeight: '400'
    },

    // Time stamps, footers
    Caption: {
        fontFamily: fontFamilySelector(Platform.OS),
        fontSize: 12,
        fontWeight: '400'
    },

    signUpContainer: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        width: Dimensions.get('window').width
    }
});