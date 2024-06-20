export interface BotAction {
  command: string;
  description: string;
  execute: (params?: any) => Promise<string>;
}

export class Bot {
  private id: string;
  private name: string;
  private avatar: string;
  private actions: BotAction[];

  constructor(name: string, avatar: string, actions: BotAction[]) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.avatar = avatar;
    this.actions = actions;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getActions(): BotAction[] {
    return this.actions;
  }

  public findAction(command: string): BotAction | undefined {
    return this.actions.find(action => action.command.toLowerCase() === command.toLowerCase());
  }
}

export type Paylaod = {
  name: string;
  avatar: string;
  actions: BotAction[];
}

export function botCreator(data: Paylaod[]) {
  return data.map(d => new Bot(d.name, d.avatar, d.actions));
}