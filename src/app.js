// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('.pnpm/express@4.18.2/node_modules/express');
const cors = require('.pnpm/cors@2.8.5/node_modules/cors');
const chalk = require('chalk');
const morgan = require('.pnpm/morgan@1.10.0/node_modules/morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const authRoute = require('./routes/auth-route');
const dataRoute = require('./routes/data-route');
const authenticateMiddleware = require('./middlewares/authenticate');
const userRoute = require('./routes/user-route');

const app = express();

app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: { message: 'too many requests, pleasetry again later.' },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/datas', authenticateMiddleware, dataRoute);
app.use('/users', authenticateMiddleware, userRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.yellowBright.bold(`server running pn port: ${port}`)),
);
