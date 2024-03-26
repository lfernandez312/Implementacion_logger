class MessageRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(newUserInfo) {
    users.push(newUserInfo);
    await this.adapter.sendMessage(newUserInfo);
    return users;
  }
}

module.exports = MessageRepository;
