import { Paylaod, botCreator } from '../core/bots/Bot';
import { Message } from '../core/messages/Message';
import { chatWindow as ChatWindow } from './ChatWindow.js';
import { chatInput as ChatInput } from './ChatInput.js';
import { contactList as ContactList } from './ContactList.js';
import { BotManager } from '../core/bots/BotManager.js';
import { MessageManager } from '../core/messages/MessageManager.js';
import { BotServiceAdapter } from '../adapters/BotServiceAdapter.js';
import { MessageServiceAdapter } from '../adapters/MessageServiceAdapter.js';


export function ChatApp(botData: Paylaod[]) {
  const appContainer = document.createElement('div');
  appContainer.className = 'chat-app flex';

  const botService = new BotServiceAdapter();
  const messageService = new MessageServiceAdapter();
  const botManager = new BotManager(botService);
  const messageManager = new MessageManager(messageService);

  botCreator(botData).forEach(bot => botManager.addBot(bot));

  const chatWindowContainer = document.createElement('div');
  const chatSection = document.createElement('div');
  chatSection.className = 'flex flex-col w-full border-r border-gray-200';
  chatWindowContainer.className = 'pl-4 h-full';

  function renderChatWindow() {
    chatWindowContainer.innerHTML = '';
    const chatWindow = ChatWindow(messageManager.getMessages());
    chatWindowContainer.appendChild(chatWindow);
  }

  function handleSendMessage(message: string) {
    const newMessage = new Message(message, 'Vous', "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", false);
    messageManager.addMessage(newMessage);
    const [command, ...params] = message.split(' ')
    botManager.executeCommand(command, params.join()).then(responses => {
      responses.forEach(data => {
        const botRespond =  botManager.getBot(data.botId)
        if (botRespond) {
          messageManager.addMessage(new Message(data.response, botRespond.getName(), botRespond.getAvatar(), true))
        }
      })
      renderChatWindow();
    })
    .catch(() => {
      alert("Nos bots n'ont pas pu resoudre votre requête.")
    })
    renderChatWindow();
  }

  function startChatWithBot(botId: string) {
    const botSelected = botManager.getBots().filter(bot => bot.getId() === botId)?.[0]
    alert(`Bonjour, je suis ${botSelected.getName()}.`)
  }

  const contactList = ContactList(botManager.getBots(), startChatWithBot);
  const chatInput = ChatInput(handleSendMessage);

  appContainer.appendChild(contactList);
  chatSection.appendChild(chatWindowContainer);
  chatSection.appendChild(chatInput);
  appContainer.appendChild(chatSection);
  renderChatWindow();

  return appContainer;
}
