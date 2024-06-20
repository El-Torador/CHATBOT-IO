import { IMessageService } from '../../ports/IMessageService';
import { Message } from './Message';

export class MessageManager {
  private messageService: IMessageService;

  constructor(messageService: IMessageService) {
    this.messageService = messageService;
  }

  public addMessage(message: Message): void {
    this.messageService.addMessage(message);
  }

  public getMessages(): Message[] {
    return this.messageService.getMessages();
  }

  public clearMessages(): void {
    this.messageService.clearMessages();
  }
}
