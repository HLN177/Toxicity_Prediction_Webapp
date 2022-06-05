import { Request, Response } from "express";
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";

async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>, // just want body property
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const productInfo = {
    user: userId,
    ...body
  };
  const product = await createProduct(productInfo);
  return res.send(product);
}

async function updateProductHandler(
  req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const productId = req.params.productId;

  const update = req.body;

  const product = await findProduct({productId});

  if (!product) {
    return res.sendStatus(404);
  }

  // if the user that create this product is not the user trying to update it
  // product.user is a mongoose object id, need cast
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const query = {
    productId
  };

  const options = {
    new: true
  };

  const updatedProduct = await findAndUpdateProduct(query, update, options);

  return res.send(updatedProduct);
}

async function getProductHandler(
  req: Request<GetProductInput['params']>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({productId});

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

async function deleteProductHandler(
  req: Request<DeleteProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({productId});

  if (!product) {
    return res.sendStatus(404);
  }

  // if the user that create this product is not the user trying to update it
  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const query = {
    productId
  };

  await deleteProduct(query);

  return res.sendStatus(200);
}

export {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler
};