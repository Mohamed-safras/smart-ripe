import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

import colors from "../colors/index";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Scan from "./screens/Scan";

const homeName = "Home";
const scanName = "Scan";
const profileName = "Profile";

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === homeName) {
            iconName = focused ? "apps" : "apps-outline";
          } else if (routeName === scanName) {
            iconName = focused ? "scan" : "scan-outline";
          } else if (routeName === profileName) {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons name={iconName} size={size} color={colors.whiteColor} />
          );
        },
        tabBarActiveTintColor: colors.whiteColor,
        tabBarStyle: {
          height: 60,
          backgroundColor: colors.primaryColor,
          position: "absolute",
          bottom: 30,
          marginHorizontal: 10,
          borderRadius: 50,
          shadowColor: colors.blackColor,
          shadowOpacity: 0.66,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          zIndex: 0,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name={homeName}
        component={Home}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Tab.Screen
        name={scanName}
        component={Scan}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  position: "absolute",
                  top: -30,
                  shadowColor: colors.blackColor,
                  shadowOpacity: 0.66,
                  backgroundColor: colors.whiteColor,
                  padding: 5,
                  borderRadius: 50,
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.primaryColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons
                    name={focused ? "scan-helper" : "line-scan"}
                    size={24}
                    color={colors.whiteColor}
                  />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>
);
export default AppNavigator;
