import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "@firebase/storage";
import * as ImagePicker from "expo-image-picker";
// import uuid from "uuidv4";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const incompleteForm = !name || !downloadURL || !job || !age;

  useEffect(() => {
    if (params?.loggedInProfile) {
      setName(params.loggedInProfile.displayName);
      setImage(params.loggedInProfile.photoURL);
      setJob(params.loggedInProfile.job);
      setAge(params.loggedInProfile.age);
    } else {
      return;
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const imageRef = ref(storage, user.uid);

      await uploadBytes(imageRef, blob).then(async (snapshopt) => {
        const URL = await getDownloadURL(imageRef);
        setDownloadURL(URL);
      });
    }
  };

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: downloadURL,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home", {
          newPhoto: image,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={tw("flex-1 items-center pt-3")}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw("flex-1 justify-center items-center")}
          keyboardVerticalOffset={10}
        >
          <>
            <Image
              style={tw("h-20 w-full")}
              resizeMode="contain"
              source={{ uri: "https://links.papareact.com/2pf" }}
            />

            <Text style={tw("text-xl text-gray-500 font-bold")}>
              Welcome {user.displayName}
            </Text>

            <ScrollView
              style={tw("flex-1")}
              contentContainerStyle={tw("items-center")}
            >
              <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 1: Your Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={tw("text-center text-xl pb-2")}
                placeholder={name || "Enter your full name"}
              />

              <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 2: The Profile Pic
              </Text>
              <TouchableOpacity onPress={() => pickImage()}>
                <Image
                  style={tw("h-32 w-32 rounded-full")}
                  source={{ uri: image || user.photoURL }}
                />
              </TouchableOpacity>

              <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 3: The Job
              </Text>
              <TextInput
                value={job}
                onChangeText={setJob}
                style={tw("text-center text-xl pb-2")}
                placeholder={job || "Enter your occupation"}
              />

              <Text style={tw("text-center p-4 font-bold text-red-400")}>
                Step 4: The Age
              </Text>
              <TextInput
                value={age}
                onChangeText={setAge}
                style={tw("text-center text-xl pb-2")}
                placeholder={age || "Enter your age"}
                keyboardType="numeric"
                maxLength={2}
              />

              <TouchableOpacity
                disabled={incompleteForm}
                onPress={updateUserProfile}
                style={[
                  tw("my-8 w-64 p-3 rounded-xl"),
                  incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                ]}
              >
                <Text style={tw("text-center text-white text-xl")}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ModalScreen;
