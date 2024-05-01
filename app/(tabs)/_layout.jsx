import { View, Text, Image, FlatList } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import React from "react";

const TabsLayout = ({ image, color, focused }) => {
  //variables
  const ID = React.useId();

  const TabBarIconComponent = ({ image, color, name, focused }) => (
    <View className={`flex items-center justify-center gap-2`}>
      <Image
        source={image}
        resizeMode="contain"
        tintColor={color}
        className={`w-6 h-6`}
      />
      <Text //The Tab icon title
        className={`${
          focused ? `font-psemibold` : `font-pregular`
        } text-xs text-gray-200`}
      >
        {name}
      </Text>
    </View>
  );

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: `#FFA001`,
          tabBarInactiveTintColor: `#CDCDE0`,
          tabBarStyle: {
            backgroundColor: `#161622`,
            height: `7.5%`,
            padding: `5px`,
            borderTopColor: `#232533`,
            borderTopWidth: 1,
          },
        }}
      >
        {[
          {
            name: "home",
            options: {
              title: `home`,
              headerShown: false,
              tabBarIcon: { image: icons?.home, color: "", focused: false },
            },
          },
          {
            name: "bookmark",
            options: {
              title: `bookmark`,
              headerShown: false,
              tabBarIcon: { image: icons?.bookmark, color: "", focused: false },
            },
          },
          {
            name: "create",
            options: {
              title: `create`,
              headerShown: false,
              tabBarIcon: { image: icons?.plus, color: "", focused: false },
            },
          },
          {
            name: "profile",
            options: {
              title: `profile`,
              headerShown: false,
              tabBarIcon: { image: icons?.profile, color: "", focused: false },
            },
          },
        ].map(({ name, options }) => (
          <Tabs.Screen
            key={ID}
            name={name}
            options={{
              ...options,
              tabBarIcon: ({ focused, color }) => (
                <TabBarIconComponent
                  image={options?.tabBarIcon.image}
                  name={name}
                  focused={focused}
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
