exports.Query = {
  products: (parents, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.map((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          let avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= avgRating;
        });
      }
      return filteredProducts;
    }
    return db.products;
  },
  product: (parents, { id }, { db }) => {
    return db.products.find((item) => item.id === id);
  },
  categories: (parents, args, { db }) => {
    return db.categories;
  },
  category: (parents, { id }, { db }) => {
    return db.categories.find((item) => item.id === id);
  },
};
