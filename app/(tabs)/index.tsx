import { useRouter } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: "https://m.naver.com" }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onShouldStartLoadWithRequest={(request) => {
          if (
            request.url.startsWith("https://m.naver.com") ||
            request.mainDocumentURL?.startsWith("https://m.naver.com")
          ) {
            return true;
          }

          if (request.url != null && request.url.startsWith("https://")) {
            router.navigate({
              pathname: "browser",
              params: { initialUrl: request.url },
            });
            return false;
          }

          return true;
        }}
      ></WebView>
    </SafeAreaView>
  );
};

export default HomeScreen;
