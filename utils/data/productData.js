import { clientCredentials } from '../client';
import { convertKeysToCamelCase } from '../utilityFunctions';

const dbUrl = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

const getProductTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/product_types`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getProductsByType = (type) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products?type=${type}`)
    .then((response) => response.json())
    .then((data) => resolve(convertKeysToCamelCase(data)))
    .catch(reject);
});

export {
  getProducts, getSingleProduct, getProductTypes, getProductsByType,
};
