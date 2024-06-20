export class Message {
  private content: string;
  private date: Date;
  private avatar: string;
  private senderName: string;
  private isReceived: boolean;

  constructor(content: string, senderName: string, avatar: string, isReceived: boolean, date?: Date) {
    this.content = content;
    this.date = date || new Date();
    this.senderName = senderName;
    this.avatar = avatar;
    this.isReceived = isReceived;
  }

  public getContent(): string {
    return this.content;
  }

  public getDate(): Date {
    return this.date;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getSenderName(): string {
    return this.senderName;
  }

  public isMessageReceived(): boolean {
    return this.isReceived;
  }
}
