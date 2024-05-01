import React from "react";
import { ScrollView, StyleSheet, Text, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { config, getCurrentUser } from "../../lib/appwrite.js";

//Asset
import { images } from "../../constants";

//Components
import CustomeButton from "../../components/CustomeButton.jsx";
import FormFeild from "../../components/FormFeild";
import { CreateNewAccount } from "../../lib/appwrite.js";
import { GlobalContext } from "../../context/GlobalProvider.js";
//JSX
const SignUp = () => {
  //State
  const [form, setForm] = React.useState({
    username: ``,
    email: ``,
    password: ``,
  });
  const [submitting, setSubmitting] = React.useState(false);

  //Global
  const { currentUser, setCurrentUser, setIsLogged } =
    React.useContext(GlobalContext);

  //handlers
  const ready = !!form.email && !!form.password && !!form.username;

  const submit = async () => {
    if (!ready)
      return Alert.alert(
        `Missing data`,
        `please fill all the feilds to continue`
      );

    try {
      setSubmitting(true);

      const result = await CreateNewAccount(
        form.email,
        form.password,
        form.username
      );
      router.replace(`/home`);
      const logged_user = await getCurrentUser();
      setCurrentUser(logged_user);
      setIsLogged(true);

      return;
    } catch ({ message }) {
      Alert.alert(`Register Error`, message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className={`bg-primary h-full flex`}>
      <ScrollView>
        <View className={`my-5 w-full min-h-[90vh] px-4 justify-center`}>
          <Image
            source={images?.logo}
            resizeMode="contain"
            className={`w-[115px] h-[35px]`}
          />
          <Text className={`text-2xl text-white mt-5 font-psemibold `}>
            Sign up to Aora
          </Text>

          <FormFeild
            title={"Username"}
            value={form.username}
            handleChangeText={(e) =>
              setForm((prev) => ({ ...prev, username: e }))
            }
            otherStyles={`mt-7`}
            keyboardType={`email-address`}
          />
          <FormFeild
            title={`Email`}
            value={form.email}
            handleChangeText={(e) => {
              setForm((prev) => ({ ...prev, email: e }));
            }}
            otherStyles={`mt-7`}
            keyboardType={`email-address`}
          />
          <FormFeild
            title={`Password`}
            value={form.password}
            handleChangeText={(e) =>
              setForm((prev) => ({ ...prev, password: e }))
            }
            otherStyles={`mt-7`}
            keyboardType={`password`}
          />

          <CustomeButton
            title={`sign up`}
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={submitting}
          />
          <View className={`justify-center gap-2 pt-5 flex-row`}>
            <Text className={`text-lg font-pregular text-gray-100`}>
              have an account already ?{" "}
            </Text>
            <Link
              href={`/sign-in`}
              className={`text-lg font-psemibold text-secondary-100`}
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
