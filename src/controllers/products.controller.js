import Product from '../models/Product';

export async function getProducts(req, res) {
  const products = await Product.find();
  res.json(products);
}

export async function getProductById(req, res) {
  const product = await Product.findById(req.params.id);
  res.json(product);
}

export async function createProduct(req, res) {
  const { name, category, price, imgURL } = req.body;
  const product = new Product({ name, category, price, imgURL });
  const productSaved = await product.save();
  console.log(req.body);
  res.status(201).json(productSaved);
}

export async function updateProductById(req, res) {
  const productUpdated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(201).json(productUpdated);
}

export async function deleteProductById(req, res) {
  const productDeleted = await Product.findByIdAndDelete(req.params.id);
  res.json(productDeleted);
}
