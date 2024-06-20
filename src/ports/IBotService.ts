import { Bot } from '../core/bots/Bot';

export type ResponseBot = {
  botId: Bot['id'];
  response: string;
}

export interface IBotService {
  addBot(bot: Bot): void;
  getBots(): Bot[];
  executeCommand(command: string, params?: any): Promise<ResponseBot[]>;
}
