import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { GlobalProvider } from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  React.useEffect(() => {
    if (error && !fontsLoaded)
      throw new Error(`something went wrong while loading the fonts`);
    SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  //if fonts haven't loaded yet and no error
  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          animation: `slide_from_right`,
          animationDuration: 20,
        }}
      >
        <Stack.Screen name={`index`} options={{ headerShown: false }} />
        <Stack.Screen name={`(auth)`} options={{ headerShown: false }} />
        <Stack.Screen name={`(tabs)`} options={{ headerShown: false }} />

        <Stack.Screen
          name={`search/[query]`}
          options={{ headerShown: false }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
