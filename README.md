
# OpenAI Chat Application:

This application allows users to enter prompts and receive AI-generated responses. It is built using OpenAI's API and implements server-side rendering with Axios. The application manages prompts and responses efficiently, storing them in localStorage to ensure data persistence even when the application is closed. Upon reopening, previously stored data is displayed in the UI.

Key Features:

Prompt Input and AI Response: Users can send prompts and view AI responses in real time.
Persistent Storage: Both prompts and AI responses are saved in localStorage, ensuring that the data remains accessible after restarting the application.
Sidebar for History: Prompts are displayed in a sidebar, allowing users to revisit their conversation history.
Context Management: Application data is managed using React Context, making it accessible throughout the app for a seamless experience.
User-Friendly UI: The interface is intuitive, displaying prompts and responses in a chat-like format for easy interaction.

## Installation
Follow these steps to set up the application with Next.js, TypeScript, Shadcn, Tailwind CSS, and Lucide icons:

1. **Create a new Next.js application with TypeScript**

```js
 npx create-next-app@latest my-app-name --typescript
```

2. **Navigate to your project directory**

```js
 cd my-app-name
```

3. **Install Tailwind CSS and its dependencies**

```js
 npm install -D tailwindcss postcss autoprefixer
 npx tailwindcss init -p
```

4. **Install Shadcn and Lucide Icons**

```js
  npm install @nextui-org/react
```

5. **Ensure all dependencies are installed**

```js
  npm install
```

### Usage

1. **Start the development server:**

```js
npm run dev
```

# Live Link

[Live Application] []
