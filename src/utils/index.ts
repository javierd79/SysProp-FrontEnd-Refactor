export const isNumber = (value: any) => {
  return !isNaN(value - parseFloat(value));
}