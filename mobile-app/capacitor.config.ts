import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easystay.app',
  appName: 'EasyStay',
  webDir: 'dist',
  server: {
    "androidScheme": "http",
    "cleartext": true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
