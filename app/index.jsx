import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import CustomeButton from "../components/CustomeButton";
import { GlobalContext } from "../context/GlobalProvider";
export default function App() {
  const { isLoading, isLogged, ...Context } = React.useContext(GlobalContext);

  if (!isLoading && isLogged) return <Redirect href={`/home`} />;

  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <ScrollView contentContainerStyle={{ height: `100%` }}>
        <View
          className={`min-h-[90vh]  w-full justify-center items-center px-4`}
        >
          <Image
            source={images?.logo}
            className={`w-[130px] h-[84px]`}
            resizeMode="contain"
          />
          <Image
            source={images?.cards}
            className={`max-w-[380px] w-full h-[300px]`}
            resizeMode="contain"
          />
          <View className={`relative mt-5`}>
            <Text className={`text-[30px] text-center font-bold text-white `}>
              Discover Endless Possibilities{" "}
              <Text className={`text-secondary-200 `}>Aora</Text>
            </Text>
            <Image
              source={images?.path}
              className={`w-[136px] h-[16px] absolute -bottom-2 -right-8 `}
              resizeMode="contain"
            />
          </View>
          <Text
            className={`text-gray-100 mt-7 text-center text-sm font-pregular `}
          >
            where creativity meet inovation : Embark on a journy of limitless
            exploration with aora
          </Text>
          <CustomeButton
            title={`continue with email`}
            handlePress={() => router.push(`/sign-in`)}
            containerStyles={`mt-7 w-full`}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={`#161622`} style="light" />
    </SafeAreaView>
  );
}
