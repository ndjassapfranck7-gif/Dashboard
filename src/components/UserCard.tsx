import { nw as userNw } from "../store/user.store";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { User } from "../schemas/user.schema";
import { fullName } from "../utils/format";
interface UserCardProps {
  user: User;
  onPress: () => void;
}

export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <TouchableOpacity className={userNw.userCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: user.image }} className={userNw.userAvatar} />
      <View className={userNw.userInfo}>
        <Text className={userNw.userName}>{fullName(user.firstName, user.lastName)}</Text>
        <Text className={userNw.userEmail} numberOfLines={1}>{user.email}</Text>
        <Text className={userNw.userMeta}>{user.company.name} · {user.address.country}</Text>
      </View>
    </TouchableOpacity>
  );
}
