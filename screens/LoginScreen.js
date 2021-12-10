import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loading, createAccount, signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.os === "ios" ? "padding" : "height"}
      style={tw("flex-1 justify-center items-center")}
      keyboardVerticalOffset={10}
    >
      <View style={tw("w-4/5 justify-center items-center")}>
        <TextInput
          style={tw("bg-white w-full h-8 mb-5")}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={tw("bg-white w-full h-8 mb-5")}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={tw("flex-row w-4/5")}>
        <TouchableOpacity
          style={tw("w-1/2 justify-center items-center")}
          onPress={() => signIn(email, password)}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw("w-1/2 justify-center items-center")}
          onPress={() => createAccount(email, password)}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
