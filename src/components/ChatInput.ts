export function chatInput(onSendMessage: (message: string) => void) {
  const chatInputContainer = document.createElement('div');
  chatInputContainer.className = 'chat-input-container flex items-center p-4 bg-white border-t';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Entrez votre message ici...';
  input.className = 'flex-grow p-2 border rounded mr-2 bg-gray-50 focus:bg-white';

  const button = document.createElement('button');
  button.textContent = 'Envoyer';
  button.title = "Envoyer"
  button.className = 'p-2 bg-blue-500 text-white rounded';

  chatInputContainer.appendChild(input);
  chatInputContainer.appendChild(button);

  button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
      onSendMessage(input.value.trim());
      input.value = '';
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      onSendMessage(input.value.trim());
      input.value = '';
    }
  });
  return chatInputContainer;
}
