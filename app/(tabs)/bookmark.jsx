import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLatestPosts, fetchSavedPosts } from "../../lib/appwrite";
import { GlobalContext } from "../../context/GlobalProvider";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import EmptyState from "../../components/EmptyState";
import { images } from "../../constants";
import { Video } from "expo-av";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/videoCard";

const Bookmark = () => {
  //STATES
  const [posts, refetch] = useFetchPosts(fetchSavedPosts);
  const [refreshing, setRefreshing] = React.useState(false);

  //CONTEXT
  const { currentUser } = React.useContext(GlobalContext);

  //HANDLERS
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const result = await refetch();
      setRefreshing(false);
    } catch ({ message: bookmarkRefetchError }) {
      console.log({ bookmarkRefetchError });
    }
  };

  return (
    <SafeAreaView className={`bg-black py-5 h-full`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className={`mb-[50px] mt-6 px-4 space-y-6 `}>
            <View className={`justify-between items-start flex-row mb-6`}>
              <View>
                <Text className={`font-pmedium text-sm text-gray-100`}>
                  welcome back , {currentUser?.username || `member`}
                </Text>
                <Text className={`text-2xl font-psemibold text-white `}>
                  {currentUser?.username || "member"}
                </Text>
              </View>
              <View className={`mt-1.5`}>
                <Image
                  source={images.logoSmall}
                  className={`w-9 h-10 `}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`no videos found`}
            subtitle={`be the first to upload a video`}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
