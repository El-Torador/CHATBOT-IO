import { ChatApp } from './components/ChatApp.js';
import { BOTS } from './utils/actions.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = ChatApp(BOTS);
  document.getElementById('app')!.appendChild(app);
});