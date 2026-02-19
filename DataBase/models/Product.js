import { requireFields } from "../utils/validator.js";

export default class Product {
  constructor({
    vendorId,
    title,
    desc,
    category,
    price,
    discount,
    rating,
    reviews,
    stock,
    weight,
    images,
    featured,
    approved,
  }) {
    requireFields({ vendorId, title, price, category, stock }, [
      "vendorId",
      "title",
      "price",
      "category",
      "stock",
    ]);
    //  Core
    this.id = crypto.randomUUID();
    this.createdAt = Date.now();

    this.vendorId = vendorId;
    this.title = title;
    this.category = category;
    this.stock = Number(stock);

    this.desc = desc || "";
    this.price = Number(price);
    this.discount = Number(discount) || 0;
    this.rating = Number(rating) || 0;
    this.reviews = reviews || [];
    this.weight = weight || 0;
    this.images = images || [];
    this.finalPrice = this.price - (this.price * (this.discount || 0)) / 100;

    //  Flags
    this.featured = featured ?? false;
    this.approved = approved ?? false;
  }

  isInStock() {
    return this.stock > 0;
  }
}
