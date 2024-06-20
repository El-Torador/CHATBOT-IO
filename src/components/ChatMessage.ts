class ChatMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['content', 'sender-name', 'avatar', 'is-received', 'date'];
  }

  attributeChangedCallback() {
    this.render();
  }

  private formatRelativeTime(date: string) {
    const now = new Date();
    const messageTime = new Date(date);

    const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('fr', { style: 'short' });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return rtf.format(-diffInMinutes, 'minute');
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return rtf.format(-diffInHours, 'hour');
    }
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return rtf.format(-diffInDays, 'day');
  }

  render() {
    const content = this.getAttribute('content');
    const senderName = this.getAttribute('sender-name');
    const avatar = this.getAttribute('avatar');
    const isReceived = this.getAttribute('is-received') === 'true';
    const date = this.getAttribute('date')!;

    this.shadowRoot!.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');
      </style>
      <div class="flex items-start gap-3 ${isReceived ? "justify-end" : ""}">
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <img class="aspect-square h-full w-full" src="${avatar}" alt="${senderName}" />
        </span>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-2xl p-3 max-w-[70%]">
          <p class="text-sm">${content}</p>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${this.formatRelativeTime(date)}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('chat-message', ChatMessage);
