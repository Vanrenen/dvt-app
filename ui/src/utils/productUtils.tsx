export const fetchProductIdFromUrl = () => {
  const urlRegex = window.location.pathname.match(/[^/]+$/);
  return (urlRegex && urlRegex[0]) || '';
};

export const isProductsPage = () => {
  const urlRegex = window.location.pathname.match(/[^/]+$/);
  return (urlRegex && urlRegex[0]) === 'products';
};
