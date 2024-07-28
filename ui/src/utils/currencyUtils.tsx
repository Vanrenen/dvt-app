export const currencyFormatter = (price: string) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ZAR',
  });

  return formatter.format(parseFloat(price));
}