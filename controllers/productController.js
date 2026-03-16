// Controller for Product
const Product = require('../models/Product');


// ✅ Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// ✅ Create a new Product
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, category, qty } = req.body;

    if (!title || !price || !description || !category || !qty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      qty,
      image: req.file ? req.file.filename : null, // ✅ image saved
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Get Product By Id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// ✅ Delete Product By Id
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// ✅ Update Product By Id (WITH IMAGE UPDATE)
exports.updateProductById = async (req, res) => {
  try {
    const { title, price, description, category, status, qty } = req.body;

    const updateData = {
      title,
      price,
      description,
      category,
      status,
      qty,
    };

    // ✅ If new image uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// ✅ Get Products By Category Id
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
