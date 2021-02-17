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
  },

  exits: {
    commentActionNotFound: {
      responseType: 'notFound',
    },
  },

  async fn(inputs) {
    const { currentUser } = this.req;

    const criteria = {
      id: inputs.id,
      type: Action.Types.COMMENT_CARD,
    };

    if (!currentUser.isAdmin) {
      criteria.userId = currentUser.id;
    }

    const path = await sails.helpers.actions
      .getProjectPath(criteria)
      .intercept('pathNotFound', () => Errors.COMMENT_ACTION_NOT_FOUND);

    let { action } = path;
    const { board } = path;

    const isBoardMember = await sails.helpers.users.isBoardMember(currentUser.id, board.id);

    if (!isBoardMember) {
      throw Errors.COMMENT_ACTION_NOT_FOUND; // Forbidden
    }

    action = await sails.helpers.actions.deleteOne(action, board, this.req);

    if (!action) {
      throw Errors.COMMENT_ACTION_NOT_FOUND;
    }

    return {
      item: action,
    };
  },
};
