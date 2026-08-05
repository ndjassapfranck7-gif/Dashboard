import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createProductSchema } from "../schemas/product.schema";
import type { CreateProductInput } from "../types/product.types";
import { colors } from "../utils/theme";

interface ProductFormProps {
  initialValues?: Partial<CreateProductInput>;
  onSubmit: (values: CreateProductInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const emptyValues: CreateProductInput = {
  title: "",
  description: "",
  category: "",
  price: 0,
  stock: 0,
  brand: "",
  thumbnail: "",
};

export function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductFormProps) {
  const [values, setValues] = useState<CreateProductInput>({
    ...emptyValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange<K extends keyof CreateProductInput>(
    key: K,
    value: CreateProductInput[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    const result = createProductSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Field label="Nom" value={values.title} onChangeText={(v) => handleChange("title", v)} error={errors.title} />
      <Field
        label="Description"
        value={values.description}
        onChangeText={(v) => handleChange("description", v)}
        error={errors.description}
        multiline
      />
      <Field
        label="Catégorie"
        value={values.category}
        onChangeText={(v) => handleChange("category", v)}
        error={errors.category}
      />
      <Field label="Marque" value={values.brand} onChangeText={(v) => handleChange("brand", v)} error={errors.brand} />
      <Field
        label="Prix"
        value={String(values.price)}
        onChangeText={(v) => handleChange("price", Number(v) || 0)}
        error={errors.price}
        keyboardType="decimal-pad"
      />
      <Field
        label="Stock"
        value={String(values.stock)}
        onChangeText={(v) => handleChange("stock", Number(v) || 0)}
        error={errors.stock}
        keyboardType="number-pad"
      />
      <Field
        label="Image (URL)"
        value={values.thumbnail ?? ""}
        onChangeText={(v) => handleChange("thumbnail", v)}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitBtn, isSubmitting && styles.disabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitText}>
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: "default" | "decimal-pad" | "number-pad";
}

function Field({ label, value, onChangeText, error, multiline, keyboardType }: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType ?? "default"}
        style={[styles.input, multiline && styles.textarea]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.card,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  cancelText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  submitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
