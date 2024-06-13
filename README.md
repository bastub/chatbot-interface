# ChatbotInterface

## Description

- This project simulate a chatbot interface on the Evry Paris-Saclay website. It communicates with the chatbot API you can find [here](https://github.com/Maryam99911/projetchatbot.git).

- The project is divided into 3 main files:

  - `app.component.html` contains the html code of the chatbot interface.
  - `app.component.ts` contains the typescript code of the chatbot interface.
  - `app.component.scss` contains the css code of the chatbot interface.

- It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

- The settings options have the feedback features that doesn't work yet. The experimental model is very slow, please be patient.

- Most of this project is still in development and can be improved.

## Pre-requisites

- To get every node modules needed to run the project, run `npm install` in the project directory.

- You need to have a Google reCaptcha key to use the chatbot interface and configure it with the domain you want to use. You can get one [here](https://www.google.com/recaptcha/admin/create).

- To connect the interface to the chatbot API, please enter the IP address of the server hosting the chatbot API in the `sendToAI` function in the `app.component.ts` file.

## Development server

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- Run `ng serve --host [your ip]` to run the application on a specific ip and making it accessible from other devices on the same network.

## Build

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
