import { Renderer2, ElementRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chatbot-interface';

  toggleChat() {
    const chat = document.getElementById('chat-container');

    // count the number of classes in the element chat

    if (chat) {
      const nb = chat.classList.length;
      chat.classList.toggle('chat-open');
      if (nb > 0) {
        chat.classList.toggle('chat-closed');
      }
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  sendMessage() {
    const message = document.getElementById(
      'chat-input-box'
    ) as HTMLInputElement;
    const chat = document.getElementById('chat-messages');

    if (message && chat) {
      if (message.value === '') {
        return;
      }
      const newMessage_container = this.renderer.createElement('div');
      const newMessage_content = this.renderer.createElement('p');
      this.renderer.addClass(newMessage_container, 'chat-message-user');
      this.renderer.addClass(newMessage_content, 'chat-message-user-content');
      const newMessage_text = this.renderer.createText(message.value);
      this.renderer.appendChild(newMessage_content, newMessage_text);
      this.renderer.appendChild(newMessage_container, newMessage_content);
      this.renderer.appendChild(chat, newMessage_container);
      chat.scrollTop = chat.scrollHeight;
      message.value = '';
    }
  }
}
