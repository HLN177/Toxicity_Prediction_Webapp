import {object, string, number, TypeOf} from 'zod';

/**
 * createProductHandler and updateProductHandler have similar input
 * getProductHandler and deleteProductHandler have similar input
 * 
 * validation(schema) should be set according to this feature
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required"
    }),
    description: string({
      required_error: "Description is required"
    }).min(20, "Description should be at least 20 charactors long"),
    price: number({
      required_error: "Price is required"
    }),
    image: string({
      required_error: "Image is required"
    })
  })
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required"
    })
  })
};

const createProductSchema = object({
  ...payload
});

const updateProductSchema = object({
  ...payload,
  ...params
});

const getProductSchema = object({
  ...params
});

const deleteProductSchema = object({
  ...params
});

type CreateProductInput = TypeOf<typeof createProductSchema>;
type UpdateProductInput = TypeOf<typeof updateProductSchema>;
type GetProductInput = TypeOf<typeof getProductSchema>;
type DeleteProductInput = TypeOf<typeof deleteProductSchema>;

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
  CreateProductInput,
  UpdateProductInput,
  GetProductInput,
  DeleteProductInput
};