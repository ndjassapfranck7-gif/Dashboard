import { nw as commonNw } from "../../../../store/common.store.tsx";import { nw as detailNw } from "../../../../store/detail.store.tsx";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { ErrorMessage } from "../../../../components/ErrorMessage";
import { Loader } from "../../../../components/Loader";
import { useUser } from "../../../../hooks/useUser";
function fullName(firstName: string, lastName: string) { return `${firstName} ${lastName}`.trim(); }
type Params = { id: string };

export function UserDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const { user, isLoading, error } = useUser(Number(id));
  if (isLoading) return <Loader label="Chargement de l'utilisateur..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <ScrollView className={commonNw.screen} contentContainerClassName={detailNw.detailContent}>
      <View className={detailNw.userDetailHeader}>
        <Image source={{ uri: user.image }} className={detailNw.userDetailAvatar} />
        <Text className={detailNw.detailTitle}>{fullName(user.firstName, user.lastName)}</Text>
      </View>
      <View className={detailNw.detailCard}>
        <Row label="Email" value={user.email} />
        <Row label="Téléphone" value={user.phone} />
        <Row label="Adresse" value={`${user.address.address}, ${user.address.city}, ${user.address.country}`} />
        <Row label="Société" value={user.company.name} />
        <Row label="Poste" value={user.company.title} last />
      </View>
    </ScrollView>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View className={`${detailNw.detailRow} ${last ? "" : detailNw.detailRowBorder}`}>
      <Text className={detailNw.detailRowLabel}>{label}</Text>
      <Text className={`${detailNw.detailRowValue} flex-shrink`} numberOfLines={2}>{value}</Text>
    </View>
  );
}
export default UserDetailScreen;
