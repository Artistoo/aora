import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { saveToBookmark } from "../lib/appwrite";

const VideoCard = ({
  index,
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
    bookmarked,
  },
}) => {
  //STATES
  const [play, setPlay] = React.useState(false);
  const [menu_open, setMenu_open] = React.useState(false);
  const [isAddding, setIsadding] = React.useState(false);
  const [isBookmarked, setisBookmarked] = React.useState(bookmarked);

  //HANDLERS
  const handleBookmark = async () => {
    try {
      setIsadding(true);
      const savedPost = await saveToBookmark($id, !Boolean(isBookmarked));
      setisBookmarked(savedPost.bookmarked);
    } catch ({ message: bookMarkError }) {
      console.log({ bookMarkError });
      Alert.alert(`bookmark error`, `could not be isBookmarked `);
    } finally {
      setIsadding(false);
    }
  };

  return (
    <View
      className={`flex-col items-center px-4 mb-14 ${
        isAddding && `opacity-50`
      }`}
    >
      <View className={`flex-row gap-3 items-start`}>
        <View className={`justify-center items-center flex-row flex-1`}>
          <View
            className={`w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5`}
          >
            <Image
              source={{ uri: avatar }}
              className={`w-full h-full rounded-lg`}
              resizeMode="cover"
            />
          </View>
          <View className={`justify-center flex-1 ml-3 gap-y-1`}>
            <Text
              numberOfLines={1}
              className={`text-white font-psemibold text-sm`}
            >
              {title}
            </Text>
            <Text className={`text-gray-100 text-xs font-pregular`}>
              {username}
            </Text>
          </View>
        </View>
        <View className={`pt-2`}>
          <TouchableOpacity
            onPress={() => setMenu_open((prev) => !prev)}
            activeOpacity={10}
            className={`w-8 h-8 `}
          >
            <Image
              source={icons.menu}
              className={` w-5 h-5`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        //POPOVER
        className={`absolute z-10  -translate-y-full  m-auto w-[80%] h-[75px] justify-center items-start pointer-events-none rounded-md bg-transparent overflow-hidden `}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBookmark}
          style={{ transition: `all 250ms ease ` }}
          className={`h-full overflow-hidden w-full pointer-events-auto  absolute top-0 rounded-lg bg-gray-200 
          ${menu_open ? `top-0 opacity-100` : `top-full opacity-0`}`}
        >
          <View>
            <View className={`w-full h-max items-start justify-center p-6`}>
              <Text className={`text-base font-pregular`}>
                {isBookmarked ? `remove from bookmark` : `add to bookbark`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className={`w-full  h-60 rounded-[35px] mt-3 bg-white/10`}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) =>
            status.didJustFinish && setPlay(false)
          }
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.8}
          className={`w-full h-60 items-center relative justify-center rounded-xl`}
        >
          <Image
            source={{ uri: thumbnail }}
            className={`w-full h-full mt-5 rounded-xl `}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className={`absolute w-16 aspect-square`}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
