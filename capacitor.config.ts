import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stangorlini.web',
  appName: 'Stangorlini Web',
  webDir: 'public',
  server: {
    url: 'https://stangorliniweb.vercel.app',
    cleartext: true
  }
};

export default config;
