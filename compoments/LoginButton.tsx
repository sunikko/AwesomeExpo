import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LoginButton = () => {
  const router = useRouter();
  const isLoggedIn = false;
  const iconName = isLoggedIn ? "logout" : "login";

  //   const [isFocused, setIsFocused] = useState(false);
  //   useFocusEffect(() => {
  //     setIsFocused(true);
  //     return () => {
  //       setIsFocused(false);
  //     };
  //   });

  const onPressLogin = useCallback(() => {
    router.navigate({ pathname: "login" });
  }, [router]);
  const onPressLogout = useCallback(() => {}, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
