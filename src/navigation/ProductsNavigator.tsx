import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetailScreen } from "../app/(Tabs)/ProductsScreen/ProductDetailScreen/ProductDetailScreen";
import { ProductFormScreen } from "../app/(Tabs)/ProductsScreen/ProductFormScreen/ProductFormScreen";
import { ProductsScreen } from "../app/(Tabs)/ProductsScreen/ProductsScreen";
import { colors } from "../utils/theme";
import type { ProductsStackParamList } from "./types";

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export function ProductsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#87ceeb" },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: "#87ceeb" },
      }}
    >
      <Stack.Screen
        name="ProductsList"
        component={ProductsScreen}
        options={{ title: "Produits" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Détail produit" }}
      />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={({ route }) => ({
          title: route.params?.id
            ? "Modifier le produit"
            : "Ajouter un produit",
          presentation: "modal",
        })}
      />
    </Stack.Navigator>
  );
}
