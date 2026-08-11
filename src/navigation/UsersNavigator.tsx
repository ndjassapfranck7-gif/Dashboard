import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserDetailScreen } from "../app/(Tabs)/UsersScreen/UserDetailScreen/UserDetailScreen";
import { UsersScreen } from "../app/(Tabs)/UsersScreen/UsersScreen";
import { colors } from "../utils/theme";
import type { UsersStackParamList } from "./types";

const Stack = createNativeStackNavigator<UsersStackParamList>();

export function UsersNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#87ceeb" },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: "#87ceeb" },
      }}
    >
      <Stack.Screen
        name="UsersList"
        component={UsersScreen}
        options={{ title: "Utilisateurs" }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ title: "Détail utilisateur" }}
      />
    </Stack.Navigator>
  );
}
