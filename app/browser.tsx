import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";

const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "black",
  },
});

const BrowserScreen = () => {
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView source={{ uri: initialUrl }}></WebView>
    </SafeAreaView>
  );
};

export default BrowserScreen;
