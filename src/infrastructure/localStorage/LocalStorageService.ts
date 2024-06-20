import { IMessageService } from '../../ports/IMessageService';
import { Message } from '../../core/messages/Message';
import { MessageBuilder, MessageData } from '../../core/messages/MessageBuilder';

export class LocalStorageService implements IMessageService {
  private storageKey: string = 'chatbot-messages';

  public addMessage(message: Message): void {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem(this.storageKey, JSON.stringify(messages.map(msg => MessageBuilder.buildForLocalStorage(msg))));
  }

  public getMessages(): Message[] {
    const storedMessages = localStorage.getItem(this.storageKey);
    if (storedMessages) {
      return JSON.parse(storedMessages).map((msg: MessageData) => MessageBuilder.buildFromLocalStorage(msg));
    }
    return [];
  }

  public clearMessages(): void {
    localStorage.removeItem(this.storageKey);
  }
}
