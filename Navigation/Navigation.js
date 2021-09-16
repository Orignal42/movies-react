import * as React from "react";
import { View,Platform,Image,StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";

const Stack = createStackNavigator();
 function MyStack() {
  return (
   
      <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={Search}
          options={{
            title: "Rechercher",
            headerShown:false,
          }}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{
            title: "FilmDetail",
                headerShown:false,
          }}
        />
        
      </Stack.Navigator>  
  );
}

const Tab=createBottomTabNavigator();

  export default function BottonTab() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Rechercher" component={MyStack}
          options={{
                         tabBarIcon: ({ color }) => (
                          <Image
          style={styles.stretch}
         
          source={require( '../Images/loupe.png')}
        />
                        ),
                    }}  />
          <Tab.Screen name="Favorites" component={Favorites} 
              options={{
                       tabBarIcon: ({ color }) => (
                          <Image
          style={styles.stretch}
          source={require('../Images/1f9e1.png')}
        />
                        ),
                    }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    stretch: {
      height: 40,
      width:40,
    },

  })
