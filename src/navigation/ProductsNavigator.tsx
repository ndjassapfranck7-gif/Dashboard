import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ProductsStackParamList } from "./types";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { ProductFormScreen } from "../screens/ProductFormScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { colors } from "../utils/theme";

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export function ProductsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsScreen} options={{ title: "Produits" }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Détail produit" }} />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? "Modifier le produit" : "Ajouter un produit",
          presentation: "modal",
        })}
      />
    </Stack.Navigator>
  );
}
