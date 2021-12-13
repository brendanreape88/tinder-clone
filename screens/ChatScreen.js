import React from "react";
import { SafeAreaView, Text } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import tw from "tailwind-rn";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
