import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { User } from "../schemas/user.schema";
import { colors } from "../utils/theme";
import { fullName } from "../utils/format";

interface UserCardProps {
  user: User;
  onPress: () => void;
}

export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{fullName(user.firstName, user.lastName)}</Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        <Text style={styles.meta}>
          {user.company.name} · {user.address.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
