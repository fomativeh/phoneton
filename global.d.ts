declare global {
    interface Window {
      Telegram?: {
        WebApp: any; // Or a more specific type if available
      };
    }
  }

  export {};