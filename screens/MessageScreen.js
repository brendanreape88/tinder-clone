import { useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import tw from "tailwind-rn";
import {
  addDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.item.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.item.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.item.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [db, matchDetails]);

  return (
    <SafeAreaView style={tw("flex-1")}>
      <Header
        title={
          getMatchedUserInfo(matchDetails?.item.users, user.uid).displayName
        }
        // callEnabled
      />

      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View
        style={tw(
          "flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2"
        )}
      >
        <TextInput
          style={tw("h-10 text-lg w-4/5")}
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />

        <Button
          style={{
            backgroundColor: "red",
          }}
          onPress={sendMessage}
          title="Send"
          color="#FF5864"
        />
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
