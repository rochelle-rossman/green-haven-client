const convertKeysToCamelCase = (response) => {
  if (Array.isArray(response)) {
    return response.map((item) => convertKeysToCamelCase(item));
  }
  if (typeof response === 'object') {
    const camelCasedResponse = {};
    Object.keys(response).forEach((key) => {
      let camelCasedKey = key;
      if (key.indexOf('') !== -1) {
        const parts = key.split('_');
        for (let i = 1; i < parts.length; i++) {
          parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }
        camelCasedKey = parts.join('');
      }
      camelCasedResponse[camelCasedKey] = response[key];
    });
    return camelCasedResponse;
  }
  return response;
};

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: 'USD', style: 'currency' });

function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

export { convertKeysToCamelCase, formatCurrency };
