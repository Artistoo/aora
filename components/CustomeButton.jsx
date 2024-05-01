import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomeButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      className={`bg-secondary p-4 mt-10  rounded-xl min-h-[62px]  items-center justify-center transition-all duration-[500ms]
      ${isLoading && `opacity-20`}
      ${containerStyles} `}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;
