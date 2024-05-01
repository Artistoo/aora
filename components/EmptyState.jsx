import React from "react";
import { View, Text, Image } from "react-native";
import { images } from "../constants";
import CustomeButton from "./CustomeButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className={`justify-center items-center px-4`}>
      <Image
        source={images.empty}
        className={`w-[270px] h-[250px]`}
        resizeMode="contain"
      />
      <Text className={`font-pmedium text-sm text-gray-100`}>{subtitle}</Text>
      <Text className={`text-xl text-center mt-2 font-psemibold text-white `}>
        {title}
      </Text>
      <CustomeButton
        title={`create video`}
        containerStyles={`w-full my-5`}
        handlePress={() => null}
      />
    </View>
  );
};

export default EmptyState;
