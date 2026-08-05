import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { ProductForm } from "../components/ProductForm";
import { Toast } from "../components/Toast";
import { useProduct } from "../hooks/useProduct";
import { useToast } from "../hooks/useToast";
import { productService } from "../services/product.service";
import type { CreateProductInput } from "../types/product.types";
import { colors } from "../utils/theme";

type Params = {
  id?: string;
};

export function ProductFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  const editingId = params.id ? Number(params.id) : null;
  const { product, isLoading, error } = useProduct(editingId);
  const { toast, showToast, hideToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values: CreateProductInput) {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await productService.update(editingId, values);
      } else {
        await productService.create(values);
      }
      showToast("Produit enregistré avec succès");
      router.back();
    } catch {
      showToast("Une erreur est survenue", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (editingId && isLoading)
    return <Loader label="Chargement du produit..." />;
  if (editingId && error) return <ErrorMessage message={error} />;

  return (
    <View style={styles.container}>
      <ProductForm
        initialValues={product ?? undefined}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isSubmitting}
      />
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
    padding: 16,
  },
});
