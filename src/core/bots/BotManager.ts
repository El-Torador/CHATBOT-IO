import { IBotService, ResponseBot } from '../../ports/IBotService';
import { Bot } from './Bot';

export class BotManager {
  private botService: IBotService;

  constructor(botService: IBotService) {
    this.botService = botService;
  }

  public addBot(bot: Bot): void {
    this.botService.addBot(bot);
  }

  public getBots(): Bot[] {
    return this.botService.getBots();
  }

  public getBot(id: string): Bot | null {
    const bot = this.botService.getBots().filter(bot => bot.getId() === id);
    return bot.length ? bot[0] : null
  }

  public async executeCommand(command: string, params?: any): Promise<ResponseBot[]> {
    return this.botService.executeCommand(command, params);
  }
}
