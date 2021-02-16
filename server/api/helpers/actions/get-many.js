module.exports = {
  inputs: {
    criteria: {
      type: 'json',
      custom: (value) => _.isArray(value) || _.isPlainObject(value),
    },
    limit: {
      type: 'number',
    },
  },

  async fn(inputs) {
    return Action.find(inputs.criteria).sort('created_at DESC').limit(inputs.limit);
  },
};
