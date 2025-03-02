import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";
import { styles } from "../styles/browserstyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const NavButton = ({
  iconName,
  disabled,
  onPress,
}: {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  disabled?: boolean;
  onPress?: () => void;
}) => {
  const color = disabled ? "gray" : "white";
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disabled}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={iconName} color={color} size={24} />
    </TouchableOpacity>
  );
};

const BrowserScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialUrl = params.initialUrl as string;
  const [url, setUrl] = useState(initialUrl);
  const urlTitle = useMemo(
    () => url.replace("https://", "").split("/")[0],
    [url],
  );
  const progressAnim = useRef(new Animated.Value(0)).current;

  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.urlContainer}>
        <Text style={styles.urlText}>{urlTitle}</Text>
      </View>
      <View style={styles.loadingBarBackground}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: initialUrl }}
        onNavigationStateChange={(event) => {
          setUrl(event.url);
          setCanGoBack(event.canGoBack);
          setCanGoForward(event.canGoForward);
        }}
        onLoadProgress={(event) => {
          progressAnim.setValue(event.nativeEvent.progress);
        }}
        onLoadEnd={() => {
          progressAnim.setValue(0);
        }}
      ></WebView>
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.back();
          }}
        >
          <View style={styles.naverIconOutline}>
            <Text style={styles.naverIconText}>N</Text>
          </View>
        </TouchableOpacity>
        <NavButton
          iconName="arrow-left"
          disabled={!canGoBack}
          onPress={() => {
            webViewRef.current?.goBack();
          }}
        />
        <NavButton
          iconName="arrow-right"
          disabled={!canGoForward}
          onPress={() => {
            webViewRef.current?.goForward();
          }}
        />
        <NavButton
          iconName="refresh"
          onPress={() => {
            webViewRef.current?.reload();
          }}
        />
        <NavButton
          iconName="share-outline"
          onPress={() => {
            Share.share({ message: url });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrowserScreen;
