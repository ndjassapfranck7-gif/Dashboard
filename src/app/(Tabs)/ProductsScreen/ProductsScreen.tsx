import { nw as commonNw } from "../../../store/common.store";
import { nw as fabNw } from "../../../store/fab.store";
import { nw as listNw } from "../../../store/list.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
import { useDebounce } from "../../../utils/useDebounce";
export function ProductsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debouncedSearch = useDebounce(search);
  const { products, isLoading, error } = useProducts({ search: debouncedSearch || undefined, category: category || undefined });
  const { categories } = useCategories();
  const { toast, showToast, hideToast } = useToast();
  const { deleteProduct } = useProductMutations();

  function handleDelete(product: Product) {
    confirmAction("Supprimer le produit", `Voulez-vous vraiment supprimer "${product.title}" ?`, async () => {
      try { await deleteProduct(product.id); showToast("Produit supprimé avec succès"); }
      catch { showToast("Suppression impossible", "error"); }
    });
  }

  return (
    <View className={commonNw.screen}>
      <View className="gap-[10px] p-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un produit..." />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      </View>
      {isLoading && <Loader label="Chargement des produits..." />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName={listNw.list}
          ListEmptyComponent={<Text className={listNw.empty}>Aucun produit trouvé.</Text>}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push({ pathname: "/products/[id]", params: { id: item.id } })}
              onEdit={() => router.push({ pathname: "/products/form", params: { id: item.id } })}
              onDelete={() => handleDelete(item)}
            />
          )}
        />
      )}
      <TouchableOpacity className={fabNw.fab} onPress={() => router.push("/products/form")}>
        <Text className={fabNw.fabText}>+</Text>
      </TouchableOpacity>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </View>
  );
}
export default ProductsScreen;
