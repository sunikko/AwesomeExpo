import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import WebView from "react-native-webview";

const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

const SHOPPING_HOME_URL = "https://shopping.naver.com/";

const ShoppingScreen = () => {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (webViewRef.current != null) {
      setRefreshing(true);
      webViewRef.current.reload();
    }
  }, []);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          ref={webViewRef}
          source={{ uri: SHOPPING_HOME_URL }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onShouldStartLoadWithRequest={(request) => {
            if (
              request.url.startsWith(SHOPPING_HOME_URL) ||
              request.mainDocumentURL?.startsWith(SHOPPING_HOME_URL)
            ) {
              // 쇼핑관련사이트니깐 보여줘
              return true;
            }

            if (request.url != null && request.url.startsWith("https://")) {
              //아니면 브라우저창에
              router.navigate({
                pathname: "browser",
                params: { initialUrl: request.url },
              });
              return false;
            }

            return true;
          }}
          onLoad={() => {
            setRefreshing(false);
          }}
          renderLoading={() => <></>}
          startInLoadingState={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShoppingScreen;
