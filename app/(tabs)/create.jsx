import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import * as imagePicker from "expo-image-picker";

//CONTEXT
import { GlobalContext } from "../../context/GlobalProvider";

//COMPONENTS
import FormFeild from "../../components/FormFeild.jsx";
import CustomeButton from "../../components/CustomeButton.jsx";
//ASSET
import icons from "../../constants/icons.js";
import { router } from "expo-router";
import { create_post } from "../../lib/appwrite.js";

const Create = () => {
  //Global States
  const { currentUser } = React.useContext(GlobalContext);

  //States
  const [uploading, setUploading] = React.useState(false);

  //Reducers
  const InitialForm = {
    creator: currentUser?.$id || "",
    video: null,
    title: "",
    thumbnail: null,
    prompt: "",
  };

  const Reducer = (state, action) => {
    switch (action.type) {
      case `update`:
        const update_state = { ...state };
        update_state[action.target] = action.new_value;
        return update_state;
      case "reset":
        return { video: null, title: "", thumbnail: null, prompt: "" };
      default:
        return state;
    }
  };
  const [form, updateForm] = React.useReducer(Reducer, InitialForm);

  //handlers
  const handleUpload = async (type) => {
    try {
      if (!`vidimg`.includes(type)) throw new Error(`ivalid format`);

      const { canceled, ...result } = await imagePicker.launchImageLibraryAsync(
        {
          mediaTypes: {
            img: imagePicker.MediaTypeOptions.Images,
            vid: imagePicker.MediaTypeOptions.Videos,
          }[type],
          aspect: [3, 1],
          quality: 1,
        }
      );
      if (!canceled) {
        updateForm({
          type: `update`,
          target: type === "vid" ? `video` : `thumbnail`,
          new_value: result.assets[0],
        });
      } else
        new Promise((res, rej) => {
          setTimeout(() => {
            Alert.alert(`document picked`, JSON.stringify(result, null, 2));
            res();
          }, 100);
        }).then((res) => clearTimeout(res));
    } catch ({ message: upload_file_error }) {
      console.log({ upload_file_error });
    }
  };
  const handleSubmit = async () => {
    try {
      !Boolean(Object.values(form).every(Boolean))
        ? Alert.alert(`missing data`, `please fill all feilds`)
        : await (async () => {
            setUploading(true);
            try {
              const created_post = await create_post(form);
              console.log({ created_post });
              Alert.alert(`Success`, `post uploaded successfully`);
              router.push(`/home`);
            } catch (error) {
              Alert.alert(`Error`, error.message);
            } finally {
              updateForm({ type: "reset" });
              setUploading(false);
            }
          })();
    } catch ({ message: submitting_error }) {
      console.log({ submitting_error });
    }
  };

  return (
    <SafeAreaView className={`h-full bg-primary  p-4 `}>
      <ScrollView className={` flex h-full py-0 `}>
        <Text className={`text-gray-200 text-md font-pregular h-max my-2`}>
          upload a video
        </Text>
        <FormFeild
          title={`video Title`}
          value={form.title}
          placeholder={`give your video a title`}
          handleChangeText={(e) =>
            updateForm({ type: `update`, target: `title`, new_value: e })
          }
          otherStyles={`mt-5`}
        />
        <View className={`mt-7  space-y-2`}>
          <Text className={`text-base text-gray-100 font-pmedium`}>
            upload a video
          </Text>
          <TouchableOpacity
            onLongPress={() => Boolean(form.video) && handleUpload("vid")}
            onPress={() => !Boolean(form.video) && handleUpload("vid")}
            activeOpacity={0.8}
          >
            {form.video ? (
              <Video
                source={{ uri: form?.video?.uri }}
                className={`w-full h-64`}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <View
                className={`w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center`}
              >
                <View
                  className={`w-14 h-14  border-secondary-100 justify-center items-center`}
                >
                  <Image
                    source={icons.upload}
                    className={`w-1/2 h-1/2 `}
                    resizeMode={`contain`}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className={`mt-7 space-y-2 `}>
          <Text className={`text-base text-gray-100 font-pmedium`}>
            thumbnail image
          </Text>
          <TouchableOpacity
            onLongPress={() => Boolean(form.thumbnail) && handleUpload("img")}
            onPress={() => !Boolean(form.thumbnail) && handleUpload("img")}
            activeOpacity={0.8}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form?.thumbnail?.uri }}
                className={`w-full h-64 rounded-2xl`}
                useNativeControls
                resizeMode={`cover`}
                isLooping
              />
            ) : (
              <View
                className={`w-full h-16 my-2 px-4 bg-black-100 rounded-2xl justify-center flex-row  items-center space-x-5 border-2 border-black-200`}
              >
                <Image
                  source={icons.upload}
                  className={`w-5 h-5 `}
                  resizeMode={`contain`}
                />
                <Text className={`text-sm font-pmedium text-gray-100`}>
                  choose a file
                </Text>

                <Text></Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormFeild
          title={`form Prompt`}
          value={form.prompt}
          placeholder={`the prompts you used for the video `}
          handleChangeText={(e) =>
            updateForm({ type: `update`, target: `prompt`, new_value: e })
          }
          otherStyles={`mt-3`}
        />
        <CustomeButton
          title={"submit and publish"}
          handlePress={handleSubmit}
          containerStyles={`mt-7`}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
