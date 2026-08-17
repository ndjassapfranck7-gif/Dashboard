import { nw as commonNw } from "../../../../store/common.store";
import { nw as detailNw } from "../../../../store/detail.store";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { ErrorMessage } from "../../../../components/ErrorMessage";
import { Loader } from "../../../../components/Loader";
import { useProduct } from "../../../../hooks/useProduct";
import { formatPrice } from "../../../../utils/format";
type Params = { id: string };

export function ProductDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const { product, isLoading, error } = useProduct(Number(id));
  if (isLoading) return <Loader label="Chargement du produit..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <ScrollView className={commonNw.screen} contentContainerClassName={detailNw.detailContent}>
      <Image source={{ uri: product.thumbnail }} className={detailNw.detailImage} />
      <Text className={detailNw.detailTitle}>{product.title}</Text>
      <Text className={detailNw.detailDescription}>{product.description}</Text>
      <View className={detailNw.detailCard}>
        <Row label="Catégorie" value={product.category} />
        <Row label="Marque" value={product.brand} />
        <Row label="Prix" value={formatPrice(product.price)} />
        <Row label="Stock" value={String(product.stock)} />
        <Row label="Note" value={`${product.rating} / 5`} last />
      </View>
    </ScrollView>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View className={`${detailNw.detailRow} ${last ? "" : detailNw.detailRowBorder}`}>
      <Text className={detailNw.detailRowLabel}>{label}</Text>
      <Text className={detailNw.detailRowValue}>{value}</Text>
    </View>
  );
}
export default ProductDetailScreen;
