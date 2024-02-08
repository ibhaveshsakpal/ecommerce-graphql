exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    const categoryProduct = db.products.filter(
      (item) => item.categoryId === id
    );
    if (filter && filter.onSale === true) {
      const filteredProducts = categoryProduct.filter((product) => {
        return product.onSale;
      });
      return filteredProducts;
    }

    return categoryProduct;
  },
};
