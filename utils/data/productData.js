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

const getProductsByType = (queryParams) => new Promise((resolve, reject) => {
  const {
    type, careLevel, lightLevel, waterNeeds, petFriendly, decorStyle,
  } = queryParams;
  let queryString = `type=${type}`;
  if (type === 'Houseplants') {
    if (careLevel) {
      queryString += `&care_level=${careLevel}`;
    }
    if (lightLevel) {
      queryString += `&light_level=${lightLevel}`;
    }
    if (waterNeeds) {
      queryString += `&water_needs=${waterNeeds}`;
    }
    if (petFriendly) {
      queryString += '&pet_friendly=True';
    }
  } else if (type === 'Home/Decor') {
    if (decorStyle) {
      queryString += `&style=${decorStyle}`;
    }
  }
  fetch(`${dbUrl}/products?${queryString}`)
    .then((response) => response.json())
    .then((data) => resolve(convertKeysToCamelCase(data)))
    .catch(reject);
});

export {
  getProducts, getSingleProduct, getProductTypes, getProductsByType,
};
