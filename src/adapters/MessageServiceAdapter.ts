import { IMessageService } from '../ports/IMessageService';
import { Message } from '../core/messages/Message';
import { LocalStorageService } from '../infrastructure/localStorage/LocalStorageService';

export class MessageServiceAdapter implements IMessageService {
  private localStorageService: LocalStorageService;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  public addMessage(message: Message): void {
    this.localStorageService.addMessage(message);
  }

  public getMessages(): Message[] {
    return this.localStorageService.getMessages();
  }

  public clearMessages(): void {
    this.localStorageService.clearMessages();
  }
}
