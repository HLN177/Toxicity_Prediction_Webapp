import supertest from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createProduct } from '../service/product.service';
import { signJwt } from '../utils/jwt.utils';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

// These payload could storage in other files
const productPayload = {
  user: userId,
  title: 'Air Jordan1',
  description: "This is a sneaker from Air Jordon. No.1 best selling sneakers in the world",
  price: 189,
  image: "abcdefghijklmn"
};

const userPayload = {
  _id: userId,
  email: 'harry.lee@example.com',
  name: 'Harry Lee'
};

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it("should return a 404", async () => {
        const productId = 'product-123'
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe('given the product does exist', () => {
      it("should return a 200 status and the product", async () => {

        const product = await createProduct(productPayload);
        const {body, statusCode} = await supertest(app).get(`/api/products/${product.productId}`);
        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    });
  })

  describe('create product route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const {statusCode} = await supertest(app).post('/api/products');
        expect(statusCode).toBe(403);
      });
    })

    describe('given the user is logged in', () => {
      it('should return a 200 and create the product', async () => {
        const jwt = signJwt(userPayload);
        const {statusCode, body} = await supertest(app).post('/api/products')
          .set('Authorization', `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String), // dynamic result
          createdAt: expect.any(String), // dynamic result
          description: "This is a sneaker from Air Jordon. No.1 best selling sneakers in the world",
          image: "abcdefghijklmn",
          price: 189,
          productId: expect.any(String), // dynamic result
          title: "Air Jordan1",
          updatedAt: expect.any(String), // dynamic result
          user: expect.any(String) // dynamic result
        });
      });
    })
  });
});