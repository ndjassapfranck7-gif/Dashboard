import { nw as commonNw } from "../../../../store/common.store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { ErrorMessage } from "../../../../components/ErrorMessage";
import { Loader } from "../../../../components/Loader";
import { ProductForm } from "../../../../components/ProductForm";
import { Toast } from "../../../../components/Toast";
import { useProduct } from "../../../../hooks/useProduct";
import { useProductMutations } from "../../../../hooks/useProductMutations";
import { useToast } from "../../../../hooks/useToast";
import type { CreateProductInput } from "../../../../schemas/product.schema";
type Params = { id?: string };

export function ProductFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  const editingId = params.id ? Number(params.id) : null;
  const { product, isLoading, error } = useProduct(editingId);
  const { toast, showToast, hideToast } = useToast();
  const { createProduct, updateProduct, isCreating, isUpdating } = useProductMutations();
  const isSubmitting = isCreating || isUpdating;

  async function handleSubmit(values: CreateProductInput) {
    try {
      if (editingId) await updateProduct({ id: editingId, input: values });
      else await createProduct(values);
      showToast("Produit enregistré avec succès");
      router.back();
    } catch { showToast("Une erreur est survenue", "error"); }
  }

  if (editingId && isLoading) return <Loader label="Chargement du produit..." />;
  if (editingId && error) return <ErrorMessage message={error} />;

  return (
    <View className={`${commonNw.screen} p-4`}>
      <ProductForm initialValues={product ?? undefined} onSubmit={handleSubmit} onCancel={() => router.back()} isSubmitting={isSubmitting} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </View>
  );
}
export default ProductFormScreen;
 