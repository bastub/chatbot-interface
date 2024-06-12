import { Renderer2, ElementRef, Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgIf } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, MatIconModule, RecaptchaModule, NgIf, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chatbot-interface';
  isHuman = false;
  showSettings = false;
  isBlueFilter = false;
  isFeedback = false;


  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient) {} 

  toggleChat() {
    const chat = document.getElementById('chat-container');

    // count the number of classes in the element chat

    if (chat) {
      const nb = chat.classList.length;
      chat.classList.toggle('chat-open');
      if (nb > 0) {
        chat.classList.toggle('chat-closed');
      }
      this.showSettings = false;
    }
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  toggleBlueFilter() {
    this.isBlueFilter = !this.isBlueFilter;
  }

  captchaResolved() {
    console.log('captcha resolved');
    this.isHuman = true;
  }


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

    this.sendToAI(message); // Envoyer le message à l'IA
  }

  sendToAI(message: string) {
    this.http.post<{ answer: string }>('http://127.0.0.1:8000/ask', { question: message })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return of({ answer: 'Sorry, there was an error processing your request.' });
        })
      )
      .subscribe(response => {
        this.aiMessage(response.answer);
      });
  }

  aiMessage(message: string) {
    const chat = document.getElementById('chat-messages');

    if (chat) {
      const newMessage_container_1 = this.renderer.createElement('div');
      const newMessage_container_2 = this.renderer.createElement('div');
      const newMessage_container_3 = this.renderer.createElement('div');
      const newMessage_content = this.renderer.createElement('p');
      const ai_photo_container = this.renderer.createElement('div');
      const ai_photo = this.renderer.createElement('div');
      const ai_photo_icon = this.renderer.createElement('img');
      const ai_copy = this.renderer.createElement('span');
      const ai_regenerate = this.renderer.createElement('span');
      const ai_thumbs = this.renderer.createElement('div');
      const ai_thumb_up = this.renderer.createElement('span');
      const ai_thumb_down = this.renderer.createElement('span');

      this.renderer.addClass(newMessage_container_1, 'chat-message');
      this.renderer.addClass(
        newMessage_container_1,
        'chat-message-ai-container'
      );
      this.renderer.addClass(newMessage_container_1, 'chat-message-ai');
      this.renderer.addClass(
        newMessage_container_2,
        'chat-message-ai-content-container'
      );
      this.renderer.addClass(
        newMessage_container_3,
        'chat-message-ai-big-content-container'
      );
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
      this.renderer.addClass(ai_thumbs, 'chat-message-ai-thumbs');
      if (this.isFeedback) {
        this.renderer.addClass(ai_thumbs, 'visible');
      }
      this.renderer.addClass(ai_copy, 'material-symbols-outlined');
      this.renderer.addClass(ai_copy, 'chat-message-ai-copy');
      this.renderer.addClass(ai_regenerate, 'material-symbols-outlined');
      this.renderer.addClass(ai_regenerate, 'chat-message-ai-regenerate');
      this.renderer.addClass(ai_thumb_up, 'material-symbols-outlined');
      this.renderer.addClass(ai_thumb_up, 'chat-message-ai-thumb-up');
      this.renderer.addClass(ai_thumb_down, 'material-symbols-outlined');
      this.renderer.addClass(ai_thumb_down, 'chat-message-ai-thumb-down');

      ai_copy.innerHTML = 'content_copy';
      ai_regenerate.innerHTML = 'autorenew';
      ai_thumb_up.innerHTML = 'thumb_up';
      ai_thumb_down.innerHTML = 'thumb_down';

      // Ajoute des écouteurs d'événements
      this.renderer.listen(ai_copy, 'click', (event) => {
        const text = newMessage_content.innerText;
        navigator.clipboard.writeText(text);
      });
      this.renderer.listen(ai_thumb_up, 'click', (event) =>
        this.thumbUp(event.target)
      );
      this.renderer.listen(ai_thumb_down, 'click', (event) =>
        this.thumbDown(event.target)
      );

      this.renderer.appendChild(ai_thumbs, ai_thumb_up);
      this.renderer.appendChild(ai_thumbs, ai_thumb_down);
      this.renderer.appendChild(ai_photo, ai_photo_icon);
      this.renderer.appendChild(ai_photo_container, ai_photo);
      this.renderer.appendChild(newMessage_container_1, ai_photo_container);
      const newMessage_text = this.renderer.createText(message);
      this.renderer.appendChild(newMessage_content, newMessage_text);
      this.renderer.appendChild(newMessage_content, ai_copy);
      this.renderer.appendChild(newMessage_content, ai_regenerate);
      this.renderer.appendChild(newMessage_container_3, newMessage_content);
      this.renderer.appendChild(newMessage_container_3, ai_copy);
      this.renderer.appendChild(newMessage_container_3, ai_regenerate);
      this.renderer.appendChild(newMessage_container_2, newMessage_container_3);
      this.renderer.appendChild(newMessage_container_2, ai_thumbs);
      this.renderer.appendChild(newMessage_container_1, newMessage_container_2);

      this.renderer.appendChild(chat, newMessage_container_1);
      chat.scrollTop = chat.scrollHeight;
    }
  }

  clearChat() {
    const messages = document.getElementsByClassName('chat-message');
    while (messages.length > 0) {
      messages[0].remove();
    }
  }

  toggleFeedback() {
    this.isFeedback = !this.isFeedback;
    // get all the elements with class thumbs
    const thumbs = document.getElementsByClassName('chat-message-ai-thumbs');
    for (let i = 0; i < thumbs.length; i++) {
      if (this.isFeedback) {
        thumbs[i].classList.add('visible');
      }
      if (!this.isFeedback) {
        thumbs[i].classList.remove('visible');
      }
    }
  }

  thumbUp(target: any) {
    console.log('thumb up');
    target.classList.toggle('material-symbols-filled');
    target.classList.toggle('chat-message-ai-thumb-up-clicked');
    target.nextElementSibling.classList.remove('material-symbols-filled');
    target.nextElementSibling.classList.remove(
      'chat-message-ai-thumb-down-clicked'
    );
  }

  thumbDown(target: any) {
    console.log('thumb down');
    target.classList.toggle('material-symbols-filled');
    target.classList.toggle('chat-message-ai-thumb-down-clicked');
    target.previousElementSibling.classList.remove('material-symbols-filled');
    target.previousElementSibling.classList.remove(
      'chat-message-ai-thumb-up-clicked'
    );
  }
}
