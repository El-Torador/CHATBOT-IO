import { Message } from '../core/messages/Message';
import { formatRelativeTime } from '../utils/formatDate';

export function chatWindow(messages: Message[]): HTMLDivElement {
  const chatWindow = document.createElement('div');
  chatWindow.className = 'messages-container flex flex-col max-h-[880px] overflow-y-auto p-10 relative';

  messages.forEach(msg => {
    const chatMessage = document.createElement('div');
    chatMessage.className = `message ${msg.isMessageReceived() ? 'bg-gray-100' : 'bg-blue-200'} p-4 rounded mb-2`;
    chatMessage.innerHTML = `
      <div class="flex items-center">
        <div class="message-content">
          <div class="flex">
            <img src="${msg.getAvatar()}" class="w-8 h-8 rounded-full mr-2" alt="${msg.getSenderName()}">
            <div class="message-header flex justify-between items-center gap-x-4">
              <span class="font-bold">${msg.getSenderName()}</span>
              <span class="text-xs text-gray-600">${formatRelativeTime(msg.getDate().toString())}</span>
            </div>
          </div>
          <div class="message-text ml-10">${msg.getContent()}</div>
        </div>
      </div>
    `;
    chatWindow.appendChild(chatMessage);
  });

  return chatWindow;
}
