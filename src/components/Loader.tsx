import { nw as loadingNw } from "../store/loading.store.tsx";
import { ActivityIndicator, Text, View } from "react-native";
import { colors } from "../utils/theme";
export function Loader({ label = "Chargement..." }: { label?: string }) {
  return (
    <View className={loadingNw.loader}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text className={loadingNw.loaderLabel}>{label}</Text>
    </View>
  );
}
