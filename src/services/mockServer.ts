import { createServer, Model } from 'miragejs';

interface ChatBot {
  id: number;
  name: string;
  phone: string;
  status: string;
  prompts: string[];
}

export function makeServer() {
  return createServer({
    models: {
      chatbot: Model.extend<Partial<ChatBot>>({}),
    },

    routes() {
      this.namespace = 'api';

      this.post('/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        return { token: 'mock-token', user: { email, name: 'UsuÃ¡rio Teste' } };
      });

      this.get('/chatbots', () => ({
        chatbots: [
          {
            id: 1,
            name: 'Suporte TÃ©cnico',
            phone: '+5511999999999',
            status: 'connected',
            prompts: []
          }
        ]
      }));
    },
  });
}
