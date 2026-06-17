if (field.input_model == "check") {
  value = value ?? [];
  if (value.length == 0) {
    let normalizeDefaultValue = field.default_value?.flat(Infinity);

    let attVal = field.attribute_value?.find((option) =>
      normalizeDefaultValue.includes(option.id),
    );

    value = attVal ? [attVal] : null;
  }
}

if (field.input_model == "check") {
  value = [
    field.attribute_value.find((option) =>
      field.default_value.includes(option.id),
    ),
  ];
  console.log("selected value check", value);
}