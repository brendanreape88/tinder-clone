import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tw("h-full bg-red-500"), { opacity: 0.89 }]}>
      <View style={tw("justify-center px-10 pt-20")}>
        <Image
          style={tw("h-20 w-full")}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text style={tw("text-white text-center my-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={
            loggedInProfile.photoURL
              ? { uri: loggedInProfile.photoURL }
              : require("../avatar.png")
          }
        />
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={
            userSwiped.photoURL
              ? { uri: userSwiped.photoURL }
              : require("../avatar.png")
          }
        />
      </View>

      <TouchableOpacity
        style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tw("text-center")}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
