import app from './app';
import { Server } from 'socket.io';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { configureWS } from './services/ws';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

configureWS(io);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(expressMiddleware(server));

  const port = process.env.PORT || 3030;

  new Promise((resolve) => httpServer.listen({ port }, resolve as () => void)).then(() => {
    console.log(`[server]: Server is running at ${port} port`);
  });
});
