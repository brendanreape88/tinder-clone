import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>home screen</Text>
      <Button title="go to chat" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default HomeScreen;
