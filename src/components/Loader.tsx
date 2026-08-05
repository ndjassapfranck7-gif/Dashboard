import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/theme";

export function Loader({ label = "Chargement..." }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 40,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
