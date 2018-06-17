import axios from 'axios';
import { XMLHttpRequest } from 'xmlhttprequest';
import Db from '../src/db';

global.XMLHttpRequest = XMLHttpRequest;

beforeAll(async done => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  await Db.models.product.destroy({ truncate : true});
  return await done();
  
});
describe('product resolvers', () => {
  test('allProducts should not reuturn any product ', async () => {
    const response = await axios.post('http://localhost:5000/graphql', {
      query: `
      query {
        products {
          name
          price
          description
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        products: [],
      },
    });
  });

  test('create firdt product ', async () => {
    const response = await axios.post('http://localhost:5000/graphql', {
      query: `
      mutation addProduct {
        addProduct(price: 65, name: "demo", description: "demo prod desc", imageUrl: "http://testurl.com") {
          name
          price
          description          
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        addProduct: {
          description: "demo prod desc", 
          name: "demo", 
          price: 65
        }
      }
    });
  });

  test('create second product', async () => {
    const response = await axios.post('http://localhost:5000/graphql', {
      query: `
      mutation addProduct {
        addProduct(price: 95, name: "test", description: "test prod desc", imageUrl: "http://testurl-2.com") {
          name
          price
          description          
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        addProduct: {
          description: "test prod desc", 
          name: "test", 
          price: 95
        }
      }
    });
  });

  test('allProducts should list 2 products', async () => {
    const response = await axios.post('http://localhost:5000/graphql', {
      query: `
      query {
        products {
          name
          price
          description
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        "products": [
          {
            "price": 65,
            "name": "demo",
            "description": "demo prod desc"
          },
          {
            "price": 95,
            "name": "test",
            "description": "test prod desc"
          }
        ]
      }
    });
  });
});


// afterAll(async done => {
//    await Db.models.product.destroy({ truncate : true});
//    await done();
// });