import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { UsersStackParamList } from "./types";
import { UserDetailScreen } from "../screens/UserDetailScreen";
import { UsersScreen } from "../screens/UsersScreen";
import { colors } from "../utils/theme";

const Stack = createNativeStackNavigator<UsersStackParamList>();

export function UsersNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="UsersList" component={UsersScreen} options={{ title: "Utilisateurs" }} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: "Détail utilisateur" }} />
    </Stack.Navigator>
  );
}
