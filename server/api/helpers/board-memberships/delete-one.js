module.exports = {
  inputs: {
    record: {
      type: 'ref',
      required: true,
    },
    request: {
      type: 'ref',
    },
  },

  async fn(inputs) {
    const cardIds = await sails.helpers.boards.getCardIds(inputs.record.id);

    await CardSubscription.destroy({
      cardId: cardIds,
      userId: inputs.record.userId,
    });

    await CardMembership.destroy({
      cardId: cardIds,
      userId: inputs.record.userId,
    });

    const boardMembership = await BoardMembership.destroyOne(inputs.record.id);

    if (boardMembership) {
      sails.sockets.broadcast(`user:${boardMembership.userId}`, 'boardMembershipDelete', {
        item: boardMembership,
      });

      sails.sockets.broadcast(
        `board:${boardMembership.boardId}`,
        'boardMembershipDelete',
        {
          item: boardMembership,
        },
        inputs.request,
      );

      // TODO: also remove if unsubscribed to user
      sails.sockets.removeRoomMembersFromRooms(
        `user:${boardMembership.userId}`,
        `board:${boardMembership.boardId}`,
      );
    }

    return boardMembership;
  },
};
