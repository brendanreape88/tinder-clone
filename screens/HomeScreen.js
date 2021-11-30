import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <View>
      <Text>home screen</Text>
      <Button title="go to chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
