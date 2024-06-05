import { Renderer2, ElementRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, RecaptchaModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chatbot-interface';
  isHuman = false;

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

  captchaResolved() {
    console.log('captcha resolved');
    this.isHuman = true;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  sendMessageInput() {
    const message = document.getElementById(
      'chat-input-box'
    ) as HTMLInputElement;
    const chat = document.getElementById('chat-messages');

    if (message.value === '') {
      return;
    }

    this.sendMessage(message.value);
    message.value = '';
  }

  sendMessage(message: string) {
    const chat = document.getElementById('chat-messages');

    if (chat) {
      const newMessage_container = this.renderer.createElement('div');
      const newMessage_content = this.renderer.createElement('p');
      this.renderer.addClass(newMessage_container, 'chat-message-user');
      this.renderer.addClass(newMessage_content, 'chat-message-user-content');
      const newMessage_text = this.renderer.createText(message);
      this.renderer.appendChild(newMessage_content, newMessage_text);
      this.renderer.appendChild(newMessage_container, newMessage_content);
      this.renderer.appendChild(chat, newMessage_container);
      chat.scrollTop = chat.scrollHeight;
    }

    // randomly pick a number between 0 and 5
    const random = Math.floor(Math.random() * 5);
    let botMessage = '';
    if (random === 0) {
      botMessage = "Cherche sur Google stp j'existe pas encore";
    } else if (random === 1) {
      botMessage = 'Au pif je dirais 12';
    } else if (random === 2) {
      botMessage = 'Parle moi sur un autre ton.';
    } else if (random === 3) {
      botMessage = 'Aucune idée, question suivante';
    } else if (random === 4) {
      botMessage = "Lalala j'écoute pas";
    }

    this.aiMessage(botMessage);
  }

  aiMessage(message: string) {
    const chat = document.getElementById('chat-messages');

    if (chat) {
      const newMessage_container = this.renderer.createElement('div');
      const newMessage_content = this.renderer.createElement('p');
      const ai_photo_container = this.renderer.createElement('div');
      const ai_photo = this.renderer.createElement('div');
      const ai_photo_icon = this.renderer.createElement('img');
      this.renderer.addClass(newMessage_container, 'chat-message-ai');
      this.renderer.addClass(newMessage_content, 'chat-message-ai-content');
      this.renderer.addClass(
        ai_photo_container,
        'chat-message-ai-photo-container'
      );
      this.renderer.addClass(ai_photo, 'chat-message-ai-photo');
      this.renderer.setAttribute(
        ai_photo_icon,
        'src',
        'assets/images/bot_png.png'
      );
      this.renderer.setAttribute(ai_photo_icon, 'width', '40px');
      this.renderer.setAttribute(ai_photo_icon, 'alt', 'Illustration de robot');
      this.renderer.appendChild(ai_photo, ai_photo_icon);
      this.renderer.appendChild(ai_photo_container, ai_photo);
      this.renderer.appendChild(newMessage_container, ai_photo_container);
      const newMessage_text = this.renderer.createText(message);
      this.renderer.appendChild(newMessage_content, newMessage_text);
      this.renderer.appendChild(newMessage_container, newMessage_content);
      this.renderer.appendChild(chat, newMessage_container);
      chat.scrollTop = chat.scrollHeight;
    }
  }
}
