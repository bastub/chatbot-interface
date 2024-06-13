import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition: any;
  isListening = false;
  result = '';

  constructor() {
    // Vérifie si webkitSpeechRecognition est disponible dans window
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const { webkitSpeechRecognition }: IWindow = window;
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.result += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  startListening(): void {
    if (!this.isListening && this.recognition) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  stopListening(): void {
    if (this.isListening && this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getTranscript(): string {
    return this.result;
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
