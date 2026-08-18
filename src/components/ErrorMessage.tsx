import { nw as loadingNw } from "../store/loading.store";
import { Text, View } from "react-native";
export function ErrorMessage({ message }: { message: string }) {
  return (
    <View className={loadingNw.errorBox}>
      <Text className={loadingNw.errorText}>⚠️ {message}</Text>
    </View>
  );
}
