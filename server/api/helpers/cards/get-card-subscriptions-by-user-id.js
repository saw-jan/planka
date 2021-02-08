module.exports = {
  inputs: {
    idOrIds: {
      type: 'json',
      custom: (value) => _.isString(value) || _.every(value, _.isString),
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
  },

  async fn(inputs) {
    return sails.helpers.cardSubscriptions.getMany({
      cardId: inputs.idOrIds,
      userId: inputs.userId,
    });
  },
};
