const moment = require("moment");
class Chat {
  constructor() {
    this.conversation = [];
  }

  async find() {
    return this.conversation;
  }

  async create(data) {
    const chat = {
      id: this.conversation.length,
      text: data.text,
      sender: data.sender
    };

    chat.time = moment().format('h:mm:ss a');

    this.conversation.push(chat);

    return chat;
  }
}

module.exports = Chat;