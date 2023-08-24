import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    // resolve: {
    //   alias: {
    //     '@': pa.resolve(__dirname, 'src'),
    //   }
    // },
    server: {
      port: 3001,
    },
  };
});
