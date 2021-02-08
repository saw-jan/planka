const Errors = {
  COMMENT_ACTION_NOT_FOUND: {
    commentActionNotFound: 'Comment action not found',
  },
};

module.exports = {
  inputs: {
    id: {
      type: 'string',
      regex: /^[0-9]+$/,
      required: true,
    },
    text: {
      type: 'string',
      isNotEmptyString: true,
    },
  },

  exits: {
    commentActionNotFound: {
      responseType: 'notFound',
    },
  },

  async fn(inputs) {
    const { currentUser } = this.req;

    const path = await sails.helpers.actions
      .getProjectPath({
        id: inputs.id,
        type: 'commentCard',
        userId: currentUser.id,
      })
      .intercept('pathNotFound', () => Errors.COMMENT_ACTION_NOT_FOUND);

    let { action } = path;
    const { board } = path;

    const isBoardMember = await sails.helpers.users.isBoardMember(currentUser.id, board.id);

    if (!isBoardMember) {
      throw Errors.COMMENT_ACTION_NOT_FOUND; // Forbidden
    }

    const values = {
      data: _.pick(inputs, ['text']),
    };

    action = await sails.helpers.actions.updateOne(action, values, board, this.req);

    if (!action) {
      throw Errors.COMMENT_ACTION_NOT_FOUND;
    }

    return {
      item: action,
    };
  },
};
