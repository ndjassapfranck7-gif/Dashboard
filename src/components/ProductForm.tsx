import { nw as formNw } from "../store/form.store";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createProductSchema } from "../schemas/product.schema";
import type { CreateProductInput } from "../types/product.types";
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

export function ProductForm({ initialValues, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const [values, setValues] = useState<CreateProductInput>({ ...emptyValues, ...initialValues });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange<K extends keyof CreateProductInput>(key: K, value: CreateProductInput[K]) {
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
    <ScrollView className={formNw.formScroll} keyboardShouldPersistTaps="handled">
      <Field label="Nom" value={values.title} onChangeText={(v) => handleChange("title", v)} error={errors.title} />
      <Field label="Description" value={values.description} onChangeText={(v) => handleChange("description", v)} error={errors.description} multiline />
      <Field label="Catégorie" value={values.category} onChangeText={(v) => handleChange("category", v)} error={errors.category} />
      <Field label="Marque" value={values.brand} onChangeText={(v) => handleChange("brand", v)} error={errors.brand} />
      <Field label="Prix" value={String(values.price)} onChangeText={(v) => handleChange("price", Number(v) || 0)} error={errors.price} keyboardType="decimal-pad" />
      <Field label="Stock" value={String(values.stock)} onChangeText={(v) => handleChange("stock", Number(v) || 0)} error={errors.stock} keyboardType="number-pad" />
      <Field label="Image (URL)" value={values.thumbnail ?? ""} onChangeText={(v) => handleChange("thumbnail", v)} />

      <View className={formNw.formActions}>
        <TouchableOpacity className={formNw.cancelButton} onPress={onCancel}>
          <Text className={formNw.cancelText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${formNw.submitButton} ${isSubmitting ? formNw.disabled : ""}`}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className={formNw.submitText}>{isSubmitting ? "Enregistrement..." : "Enregistrer"}</Text>
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
    <View className={formNw.field}>
      <Text className={formNw.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType ?? "default"}
        className={`${formNw.formInput} ${multiline ? formNw.textarea : ""}`}
      />
      {error && <Text className={formNw.fieldError}>{error}</Text>}
    </View>
  );
}
