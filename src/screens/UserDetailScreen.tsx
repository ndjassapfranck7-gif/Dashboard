import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { useUser } from "../hooks/useUser";
import { fullName } from "../utils/format";
import { colors } from "../utils/theme";

type Params = {
  id: string;
};

export function UserDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const userId = Number(id);
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <Loader label="Chargement de l'utilisateur..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Image source={{ uri: user.image }} style={styles.avatar} />
        <Text style={styles.name}>
          {fullName(user.firstName, user.lastName)}
        </Text>
      </View>

      <View style={styles.card}>
        <Row label="Email" value={user.email} />
        <Row label="Téléphone" value={user.phone} />
        <Row
          label="Adresse"
          value={`${user.address.address}, ${user.address.city}, ${user.address.country}`}
        />
        <Row label="Société" value={user.company.name} />
        <Row label="Poste" value={user.company.title} last />
      </View>
    </ScrollView>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  rowValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
});
