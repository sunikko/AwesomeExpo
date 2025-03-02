import { StyleSheet, Platform, StatusBar } from "react-native";

const COLORS = {
  background: "black",
  text: "white",
  progress: "green",
};

export const styles = StyleSheet.create({
  safearea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: COLORS.background,
  },
  urlContainer: {
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  urlText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingBarBackground: {
    height: 3,
    backgroundColor: "white",
  },
  loadingBar: {
    height: "100%",
    backgroundColor: COLORS.progress,
  },
  navigator: {
    backgroundColor: "black",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },
  button: {
    width: 30,
    height: 30,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  naverIconOutline: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  naverIconText: {
    color: COLORS.text,
  },
});
