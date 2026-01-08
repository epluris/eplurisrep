const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/YOUR_PROJECT_ID/secrets/${secretName}/versions/latest`,
  });
  return version.payload.data.toString('utf8');
}

// Store all your API key names (not the actual keys!)
module.exports = {
  apiKeys: {
    DATA_GOV: 'data-gov-api-key',
    GOVINFO: 'govinfo-api-key',
    CONGRESS: 'congress-gov-api-key',
    FEDERAL_REGISTER: 'federal-register-api-key'
  },
  getSecret
};
