import { ChatApp } from './components/ChatApp.js';
import { Paylaod } from './core/bots/Bot.js';

// Define your bots here
const botData: Paylaod[] = []

document.addEventListener('DOMContentLoaded', () => {
  const app = ChatApp(botData);
  document.getElementById('app')!.appendChild(app);
});