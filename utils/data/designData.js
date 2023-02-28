import { clientCredentials } from '../client';
import { convertKeysToCamelCase } from '../utilityFunctions';

const dbUrl = clientCredentials.databaseURL;

const getDesigns = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/designs`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

const getSingleDesign = (designId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/designs/${designId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

export { getDesigns, getSingleDesign };
