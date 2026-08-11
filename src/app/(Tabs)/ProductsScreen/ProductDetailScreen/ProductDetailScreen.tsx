import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ErrorMessage } from "../../../../components/ErrorMessage";
import { Loader } from "../../../../components/Loader";
import { useProduct } from "../../../../hooks/useProduct";
import { formatPrice } from "../../../../utils/format";
import { colors } from "../../../../utils/theme";

type Params = {
  id: string;
};

export function ProductDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const productId = Number(id);
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) return <Loader label="Chargement du produit..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.card}>
        <Row label="Catégorie" value={product.category} />
        <Row label="Marque" value={product.brand} />
        <Row label="Prix" value={formatPrice(product.price)} />
        <Row label="Stock" value={String(product.stock)} />
        <Row label="Note" value={`${product.rating} / 5`} last />
      </View>
    </ScrollView>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 16,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  rowValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default ProductDetailScreen;
