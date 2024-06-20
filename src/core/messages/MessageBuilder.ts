import { Message } from './Message';

export type MessageData = {
  content: string;
  senderName: string;
  avatar: string;
  isReceived: boolean;
  date: string;
};

export class MessageBuilder {
  static buildFromLocalStorage(data: MessageData): Message {
    return new Message(data.content, data.senderName, data.avatar, data.isReceived, new Date(data.date));
  }

  static buildForLocalStorage(message: Message): MessageData {
    return {
      content: message.getContent(),
      senderName: message.getSenderName(),
      avatar: message.getAvatar(),
      isReceived: message.isMessageReceived(),
      date: message.getDate().toISOString(),
    };
  }
}
