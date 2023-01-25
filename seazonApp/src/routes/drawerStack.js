import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/settings";
import MainStack from "./mainStack";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name='Home'
                component={MainStack}
                options={{
                    headerShown: false
                }} />
            <Drawer.Screen name='Settings 2' component={Settings} />
        </Drawer.Navigator>
    )
};

export default DrawerStack;