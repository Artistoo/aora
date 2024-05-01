import React from "react";
import { ScrollView, StyleSheet, Text, View, Image, Alert } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

//Asset
import { images } from "../../constants";

//Components
import CustomeButton from "../../components/CustomeButton.jsx";
import FormFeild from "../../components/FormFeild";
import { Sign_in, getCurrentUser } from "../../lib/appwrite.js";
import { GlobalContext } from "../../context/GlobalProvider.js";

//JSX
const SignIn = () => {
  //State
  const [form, setForm] = React.useState({ email: ``, password: `` });
  const [submitting, setSubmitting] = React.useState(false);

  //Global
  const { setCurrentUser, setIsLogged } =
    React.useContext(GlobalContext);

  //handlers
  const submit = async () => {
    if (!form.email || !form.password)
      return Alert.alert(
        `Missing data`,
        `please fill all the feilds to continue`
      );

    try {
      setSubmitting(true);
      await Sign_in(form.email, form.password);
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
        <View className={`my-5 w-full min-h-[90vh]   px-4 justify-center`}>
          <Image
            source={images?.logo}
            resizeMode="contain"
            className={`w-[115px] h-[35px]`}
          />
          <Text className={`text-2xl text-white mt-5 font-psemibold `}>
            Log in to Aora
          </Text>

          {[
            {
              title: `Email`,
              value: form.email,
              handleChangeText: (e) =>
                setForm((prev) => ({ ...prev, email: e })),
              otherStyles: `mt-7`,
              keyboardType: `email-address`,
            },
            {
              title: `Password`,
              value: form.password,
              handleChangeText: (e) =>
                setForm((prev) => ({ ...prev, password: e })),
              otherStyles: `mt-7`,
              keyboardType: `password`,
            },
          ].map(
            ({ title, value, handleChangeText, otherStyles, keyboardType }) => (
              <FormFeild
                key={title}
                title={title}
                value={value}
                handleChangeText={handleChangeText}
                otherStyles={otherStyles}
                keyboardType={keyboardType}
              />
            )
          )}

          <CustomeButton
            title={`sign in `}
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={submitting}
          />
          <View className={`justify-center gap-2 pt-5 flex-row`}>
            <Text className={`text-lg font-pregular text-gray-100`}>
              don't have account ?{" "}
            </Text>
            <Link
              href={`/sign-up`}
              className={`text-lg font-psemibold text-secondary-100`}
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
