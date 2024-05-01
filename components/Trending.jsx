import React from "react";

//Imports
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animate from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";

const Posts = ({ active, post }) => {
  const [play, setPlay] = React.useState(false);
  const zoomIn = {
      0: { scale: 0.8 },
      1: { scale: 1 },
    },
    zoomOut = {
      0: { scale: 1 },
      1: { scale: 0.8 },
    };

  return (
    <Animate.View
      duration={400}
      easing={"ease-out-cubic"}
      animation={active === post.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{ uri: post.video }}
          className={`w-52  h-72 rounded-[35px] mt-3 bg-white/10`}
          resizeMode={"cover"}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className={`relative justify-center items-center `}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: post.thumbnail }}
            className={`w-52 h-72 my-5 rounded-[35px] overflow-hidden shadow-lg shadow-black-100`}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className={`aspect-square  absolute  h-[50px]  `}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animate.View>
  );
};

const Trending = ({ posts }) => {
  const [active, setActive] = React.useState(posts[1]);

  const handleViewableChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={handleViewableChange}
      renderItem={({ item }) => <Posts active={active} post={item} />}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 70 }}
      horizontal
    />
  );
};

export default Trending;
