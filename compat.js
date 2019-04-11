var Relay = require('react-relay/compat');

function commitMutationPromise(environment, config) {
  return new Promise(function(resolve, reject) {
    Relay.commitMutation(
      environment,
      Object.assign({}, config, {
        onCompleted: function(payload, errors) {
          if (errors && errors.length !== 0) {
            const error = new Error(errors.toString());
            error.payload = payload;
            error.errors = errors;
            reject(error); // or throw error
            return;
          }
          resolve(payload);
        },
        onError: function(error) {
          reject(error);
        }
      })
    );
  });
}

module.exports = commitMutationPromise;
