import { Message } from '../core/messages/Message';

export interface IMessageService {
  addMessage(message: Message): void;
  getMessages(): Message[];
  clearMessages(): void;
}
