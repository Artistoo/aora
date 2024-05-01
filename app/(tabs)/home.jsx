import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Asset
import { images } from "../../constants";
import { SearchBar } from "react-native-screens";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { fetchAllPosts, fetchLatestPosts } from "../../lib/appwrite";
import { useFetchPosts } from "../../hooks/useFetchPosts";
import VideoCard from "../../components/videoCard";
import { GlobalContext } from "../../context/GlobalProvider";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  //States
  const [refreshing, setRefreshing] = React.useState(false);
  const { currentUser } = React.useContext(GlobalContext);

  const [posts, isLoading] = useFetchPosts(fetchAllPosts);
  const [LatestPosts] = useFetchPosts(fetchLatestPosts);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className={`bg-black py-0 h-full`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <VideoCard video={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <View className={`mb-6 pt-[50px] px-4 space-y-10 `}>
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
            <View className={`w-full flex-1 pt-5 pb-8`}>
              <Text className={`text-gray-100 mb-3  text-lg font-pregular `}>
                Latest videos
              </Text>
              <Trending posts={LatestPosts ?? []} />
            </View>
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

export default Home;
