import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormFeild = ({
  key,
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View {...(key && { key })} className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base font-pmedium text-gray-100`}>{title}</Text>
      <View
        className={`w-full h-16 bg-black-100 border-2 flex-row px-[15px] border-black-200 rounded-2xl focus:border-secondary-100 items-center `}
      >
        <TextInput
          className={`flex-1 text-white font-psemibold text-base  h-full`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={`#7b7b8b`}
          onChangeText={handleChangeText}
          secureTextEntry={title === `Password` && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              resizeMode="contain"
              className={`w-6 h-6 pointer-events-auto`}
              source={!showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFeild;
