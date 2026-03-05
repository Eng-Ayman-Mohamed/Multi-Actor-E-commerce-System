import { orderService } from "./DataBase/services/orderService.js";
import { productService } from "./DataBase/services/productService.js";

console.log(orderService.getById("f986397a-abbc-4e79-96f8-c20b96201291"));
console.log(
  productService.updateProductStock("bf314ffa-2e86-41de-8148-29811d127e16", 20),
);

console.log(orderService.updateStock());
//
