import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stangorlini.web',
  appName: 'Aurtistic',
  webDir: 'public',
  server: {
    url: 'https://aurtistic.vercel.app/',
    cleartext: true
  }
};

export default config;
