module.exports = {
  async fn() {
    const { currentUser } = this.req;

    const managerProjectIds = await sails.helpers.users.getManagersProjectIds(currentUser.id);
    const membershipBoardIds = await sails.helpers.users.getMembershipBoardIds(currentUser.id);

    const membershipBoards = await sails.helpers.boards.getMany({
      id: membershipBoardIds,
      projectId: {
        '!=': managerProjectIds,
      },
    });

    const membershipProjectIds = sails.helpers.utils.map(membershipBoards, 'projectId', true);

    const projects = await sails.helpers.projects.getMany([
      ...managerProjectIds,
      ...membershipProjectIds,
    ]);

    const projectManagers = await sails.helpers.projects.getProjectManagers(projectIds);

    const userIds = sails.helpers.utils.mapRecords(projectManagers, 'userId', true);
    const users = await sails.helpers.users.getMany(userIds);

    const managerBoards = await sails.helpers.projects.getBoards(managerProjectIds);
    const boards = [...managerBoards, ...membershipBoards];

    return {
      items: projects,
      included: {
        users,
        projectManagers,
        boards,
      },
    };
  },
};
