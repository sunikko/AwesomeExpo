import { router } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

const LOGIN_URL = "https://nid.naver.com/nidlogin.login";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{ uri: LOGIN_URL }}
        onNavigationStateChange={(event) => {
          console.log(event);

          const allowedUrls = [
            "https://www.naver.com/",
            "https://nid.naver.com/user2",
          ];
          if (allowedUrls.includes(event.url)) {
            // TODO: webview refresh

            router.back();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
