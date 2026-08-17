import { nw as toastNw } from "../store/toast.store.tsx";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View className={`${toastNw.toast} ${type === "success" ? toastNw.toastSuccess : toastNw.toastError}`} style={{ opacity }}>
      <Text className={toastNw.toastMessage}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text className={toastNw.toastClose}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
