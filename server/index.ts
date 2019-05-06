import express from 'express';
import next from 'next';
import helmet from 'helmet';
import healthCheck from 'express-healthcheck';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(helmet());
    server.use(helmet.referrerPolicy({ policy: 'same-origin' }));
    // server.use(
    //   helmet.contentSecurityPolicy({
    //     directives: config.get('contentSecurityPolicy'),
    //   })
    // );
    server.use('/health-check', healthCheck());

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { title: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });