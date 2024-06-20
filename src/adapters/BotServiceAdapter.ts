import { IBotService, ResponseBot } from '../ports/IBotService';
import { Bot } from '../core/bots/Bot';



export class BotServiceAdapter implements IBotService {
  private bots: Bot[];

  constructor() {
    this.bots = [];
  }

  public addBot(bot: Bot): void {
    this.bots.push(bot);
  }

  public getBots(): Bot[] {
    return this.bots;
  }

  public async executeCommand(command: string, params?: any): Promise<ResponseBot[]> {
    let responses: ResponseBot[] = [];
    for await (const bot of this.bots) {
      const action = bot.findAction(command);
      if (action) {
        const response = await action.execute(params);
        responses.push({
          botId: bot.getId(),
          response
        });
      }
    }
    return responses;
  }
}
