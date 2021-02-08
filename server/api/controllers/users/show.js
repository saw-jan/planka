module.exports = {
  async fn() {
    const { currentUser } = this.req;

    if (this.req.isSocket) {
      sails.sockets.join(this.req, `user:${currentUser.id}`); // TODO: only when subscription needed
    }

    return {
      item: currentUser,
    };
  },
};
