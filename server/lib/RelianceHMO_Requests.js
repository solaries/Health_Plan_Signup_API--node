const request = require('../lib/Request');
const { Handler, ApiErrors, ModuleError } = require('./errors');

const trigger = async ({
  method = 'POST', path, credentials, payload = '',
}) => {
  try {
    const { host } = credentials;
    const options = {
      headers: {
        'Sandbox-Key': credentials.sandbox_key,
        'Content-Type': 'application/json',
      },
      body: payload,
      json: true,
    };
    if (credentials.params) {
      options.qs = { ...credentials.params };
    }

    const response = await request.http({
      method,
      host,
      path,
      options,
    });

    if (response.statusCode !== 200) {
      return new ApiErrors(Handler.Api(response.statusCode));
    }

    return typeof response.body === 'object' ? response.body : JSON.parse(response.body);
  } catch (error) {
    if (error.statusCode) {
      throw new ApiErrors(Handler.Api(error.statusCode));
    }
    throw new ModuleError(Handler.Module(error));
  }
};
exports.Plans = async (data) => {
  try {
    return await trigger({
      method: 'GET',
      path: '/relianceHMO/plans',
      credentials: { ...data },
      payload: data.payload,
    });
  } catch (error) {
    return error;
  }
};

exports.SignUp = async (data) => {
  try {
    return await trigger({
      method: 'POST',
      path: '/relianceHMO/retail/signup',
      credentials: { ...data },
      payload: data.payload.data,
    });
  } catch (error) {
    return error;
  }
};
