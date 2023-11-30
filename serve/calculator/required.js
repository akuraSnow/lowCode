function main(value, target) {
  console.log(value);
  if (!value || value.toString().trim().length === 0) {
    return { mes: '111' };
  }
  return null;
}
