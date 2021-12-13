import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { createAccount, signIn, error } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <ImageBackground
      style={tw("flex-1 pb-20")}
      source={require("../background.png")}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw("flex-1 justify-center items-center")}
          keyboardVerticalOffset={10}
        >
          <Image
            style={tw("h-32 w-32 mb-10")}
            source={require("../logo-white.png")}
          />
          <View style={tw("w-4/5 justify-center items-center")}>
            <TextInput
              style={tw(
                "border border-white rounded-full w-full h-12 mb-5 py-3 pl-5 text-white"
              )}
              placeholder="Email"
              placeholderTextColor="rgba(225, 225, 225, 0.8)"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={tw(
                "border border-white rounded-full w-full h-12 mb-5 py-3 pl-5 text-white"
              )}
              placeholder="Password"
              placeholderTextColor="rgba(225, 225, 225, 0.8)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={tw("flex-row justify-between w-4/5 mb-5")}>
            <TouchableOpacity
              style={[
                tw(
                  "w-1/2 justify-center items-center border border-white h-12 rounded-full bg-white"
                ),
                { width: "48%" },
              ]}
              onPress={() => signIn(email, password)}
            >
              <Text style={tw("text-red-400")}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw(
                  "w-1/2 justify-center items-center border border-white h-12 rounded-full"
                ),
                { width: "48%" },
              ]}
              onPress={() => createAccount(email, password)}
            >
              <Text style={tw("text-white")}>Register</Text>
            </TouchableOpacity>
          </View>
          {error && (
            <View
              style={tw("bg-red-400 w-4/5 h-12 justify-center items-center")}
            >
              <Text style={tw("text-white")}>{error}</Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;
