import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryFilter } from "../../../components/CategoryFilter";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Loader } from "../../../components/Loader";
import { ProductCard } from "../../../components/ProductCard";
import { SearchBar } from "../../../components/SearchBar";
import { Toast } from "../../../components/Toast";
import { useCategories } from "../../../hooks/useCategories";
import { useProductMutations } from "../../../hooks/useProductMutations";
import { useProducts } from "../../../hooks/useProducts";
import { useToast } from "../../../hooks/useToast";
import type { Product } from "../../../types/product.types";
import { confirmAction } from "../../../utils/confirm";
import { colors } from "../../../utils/theme";
import { useDebounce } from "../../../utils/useDebounce";

export function ProductsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debouncedSearch = useDebounce(search);

  const { products, isLoading, error } = useProducts({
    search: debouncedSearch || undefined,
    category: category || undefined,
  });
  const { categories } = useCategories();
  const { toast, showToast, hideToast } = useToast();
  const { deleteProduct } = useProductMutations();

  function handleDelete(product: Product) {
    confirmAction(
      "Supprimer le produit",
      `Voulez-vous vraiment supprimer "${product.title}" ?`,
      async () => {
        try {
          await deleteProduct(product.id);
          showToast("Produit supprimé avec succès");
        } catch {
          showToast("Suppression impossible", "error");
        }
      },
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un produit..."
        />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </View>

      {isLoading && <Loader label="Chargement des produits..." />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucun produit trouvé.</Text>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                router.push({
                  pathname: "/products/[id]",
                  params: { id: item.id },
                })
              }
              onEdit={() =>
                router.push({
                  pathname: "/products/form",
                  params: { id: item.id },
                })
              }
              onDelete={() => handleDelete(item)}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/products/form")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    gap: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  empty: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 40,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 30,
  },
});

export default ProductsScreen;
