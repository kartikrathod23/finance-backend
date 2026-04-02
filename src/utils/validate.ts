export const validateRequired = (fields: Record<string, any>) => {
  for (const key in fields) {
    if (
      fields[key] === undefined ||
      fields[key] === null ||
      fields[key] === ""
    ) {
      throw new Error(`${key} is required`);
    }
  }
};