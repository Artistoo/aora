import React from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/videoCard.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import SearchInput from "../../components/SearchInput.jsx";

//HOOKS
import { useFetchPosts } from "../../hooks/useFetchPosts";

//API
import { fetchSearchResults } from "../../lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [posts, refetch, isLoading] = useFetchPosts(() =>
    fetchSearchResults(query)
  );

  React.useEffect(() => {
    refetch(() => fetchSearchResults(query));
  }, [query]);
  

  return (
    <SafeAreaView className={`bg-black py-5 h-full`}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className={`my-6 px-4 space-y-6`}>
            <View className={`justify-between items-start flex-row mb-6`}>
              <View>
                <Text className={`font-pmedium text-sm text-gray-100`}>
                  search results for
                </Text>
                <Text className={`text-2xl font-psemibold text-white `}>
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput />
            <View className={`w-full flex-1 pt-5 pb-8`}>
              <Text className={`text-gray-100 mb-3  text-lg font-pregular `}>
                Latest videos
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`no videos found`}
            subtitle={`be the first to upload a video`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
