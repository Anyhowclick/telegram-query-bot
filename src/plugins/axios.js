const Axios = require('axios');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

const kyber = (network) =>
  Axios.create({
    baseURL:
      ['mainnet', 'staging'].indexOf(network) !== -1
        ? config.axios.kyber.mainnetURL
        : config.axios.kyber.ropstenURL,
    timeout: config.axios.kyber.timeout,
  });
const ethgasstation = Axios.create({
  baseURL: config.axios.ethgasstation.baseURL,
  timeout: config.axios.ethgasstation.timeout,
});
const feargreedindex = Axios.create({
  baseURL: config.axios.feargreedindex.baseURL,
  timeout: config.axios.feargreedindex.timeout,
});

const axios = {
  kyber,
  ethgasstation,
  feargreedindex,
};

module.exports = axios;
