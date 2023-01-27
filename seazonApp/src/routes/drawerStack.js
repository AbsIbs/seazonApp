import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/settings";
import MainStack from "./mainStack";
import CustomDrawer from "../components/customDrawer";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { color: 'white', marginLeft: -10 },
                drawerActiveBackgroundColor: '#2B303C',
                drawerActiveTintColor: '#fff'
            }}>
            <Drawer.Screen
                name='Home'
                component={MainStack}
                options={{
                    headerShown: false,
                    drawerIcon: () => {
                        return (
                            <MaterialCommunityIcons
                                name={'home'}
                                size={22.5}
                                color={'white'} />
                        )
                    }
                }} />
            <Drawer.Screen
                name='Notifications'
                component={Settings}
                options={{
                    drawerIcon: () => {
                        return (
                            <MaterialCommunityIcons
                                name={'bell-ring'}
                                size={22.5}
                                color={'white'} />

                        )
                    }
                }} />
            <Drawer.Screen
                name='Settings'
                component={Settings}
                options={{
                    drawerIcon: () => {
                        return (
                            <MaterialCommunityIcons
                                name={'cog'}
                                size={22.5}
                                color={'white'} />

                        )
                    }
                }} />
        </Drawer.Navigator>
    )
};

export default DrawerStack;