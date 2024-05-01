import React from "react";
import { Alert } from "react-native";

export const useFetchPosts = (fetchPost) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPost();
      if (!response) Alert.alert(`empty`, `no results were found`);
      setPosts(response);
    } catch ({ message }) {
      Alert.alert(`backend fetching Error`, message);
    } finally {
      setIsLoading(false);
    }
  };
  const refetsh = async () => {
    await fetchPosts();
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return [posts || [], refetsh, isLoading];
};
