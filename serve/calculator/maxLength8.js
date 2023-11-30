function main(value, target) {
  console.log(value);
  if (value && value.toString().trim().length >= 8) {
    return { mes: '请输入不超过8个字符' };
  }
  return null;
}
