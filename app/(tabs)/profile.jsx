import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/videoCard.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import { GlobalContext } from "../../context/GlobalProvider.js";

//HOOKS
import { useFetchPosts } from "../../hooks/useFetchPosts";

//API
import { fetchUserPosts, logout } from "../../lib/appwrite";
import icons from "../../constants/icons.js";
import InfoBox from "../../components/InfoBox.jsx";

const Profile = () => {
  const {
    currentUser: user,
    setLogged,
    setCurrentUser,
  } = React.useContext(GlobalContext);

  const [user_posts, refetch, isLoading] = useFetchPosts(() =>
    fetchUserPosts(user?.$id)
  );
  

  const Logout = async () => {
    await logout();
    setCurrentUser(null);
    setLogged(false);
    router.replace("/sign-in");
  };

 

  return (
    <SafeAreaView className={`bg-black py-5 h-full`}>
      <FlatList
        data={user_posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            className={`mb-6 mt-12 justify-center items-center w-full px-4 `}
          >
            <TouchableOpacity
              className={`w-full items-end mb-10 `}
              onPress={Logout}
            >
              <Image
                source={icons.logout}
                className={`w-7 h-7 rounded-md `}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              className={`w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center `}
            >
              <Image
                source={{ uri: user?.avatar }}
                className={`w-[90%] h-[90%] rounded-md`}
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username || "user"}
              titleStyles={`text-lg`}
              containerStyles={`mt-5`}
            />
            <View className={`mt-5 flex-row flex mx-auto   p-2  `}>
              <InfoBox
                title={user_posts?.length || 0}
                subtitle={`Posts`}
                titleStyles={`text-xl`}
                containerStyles={`mr-11`}
              />
              <InfoBox
                title={`1.2k`}
                subtitle={`Followers`}
                titleStyles={`text-xl`}
              />
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

export default Profile;
