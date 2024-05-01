import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

import { useFetchPosts } from "../hooks/useFetchPosts";
import { fetchSearchResults } from "../lib/appwrite";

const SearchInput = ({
  key,
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
  ...props
}) => {
  //States
  const [query, setQuery] = React.useState();
  //Varibles
  const path = usePathname();

  return (
    <View
      className={`w-full h-16 bg-black-100 text-white border-2 flex-row px-[15px] border-black-200 rounded-2xl space-x-4 focus:border-secondary-100 items-center `}
    >
      <TextInput
        className={` text-white   h-full text-base mt-0.5 flex-1 font-pregular`}
        value={query}
        placeholder={"search for a video topic"}
        placeholderTextColor={`#cdcde0`}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() =>
          !query
            ? Alert.alert(`missing query`, `please input something`)
            : path.startsWith("/search")
            ? router.setParams({ query })
            : router.push(`/search/${query}`)
        }
      >
        <Image
          source={icons.search}
          className={`w-5 h-5`}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
