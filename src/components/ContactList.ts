import { Bot } from '../core/bots/Bot';

export function contactList(bots: Bot[], onSelectBot: (botId: string) => void) {
  const contactList = document.createElement('div');
  contactList.className = 'contact-list p-4 bg-gray-200 min-w-[300px] min-h-screen overflow-y-auto';

  const title = document.createElement('h2');
  title.className = 'font-bold text-lg mb-2';
  title.textContent = 'Contacts';
  contactList.appendChild(title);

  bots.forEach(bot => {
    const contact = document.createElement('div');
    contact.className = 'contact flex items-center p-2 cursor-pointer border-b';
    contact.dataset.botId = bot.getId();
    contact.innerHTML = `
      <img src="${bot.getAvatar()}" class="w-8 h-8 rounded-full mr-2" alt="${bot.getName()}">
      ${bot.getName()}
    `;
    contact.addEventListener('click', () => {
      onSelectBot(bot.getId());
    });
    contactList.appendChild(contact);
  });

  return contactList;
}