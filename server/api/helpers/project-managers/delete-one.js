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
    const projectManager = await ProjectManager.destroyOne(inputs.record.id);

    if (projectManager) {
      const userIds = await sails.helpers.projects.getManagerAndBoardMembershipUserIds(
        projectManager.projectId,
      );

      userIds.forEach((userId) => {
        sails.sockets.broadcast(
          `user:${userId}`,
          'projectManagerDelete',
          {
            item: projectManager,
          },
          inputs.request,
        );
      });
    }

    return projectManager;
  },
};
