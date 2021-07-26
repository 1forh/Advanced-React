import { createSchema, config } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';

import { User } from './schemas/User';
import { Product } from './schemas/Product';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sickfits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should user stay logged in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // todo: add in initial roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO add data seeding here
    },
    lists: createSchema({
      // schema items go in here
      User,
      Product,
    }),
    ui: {
      // show ui only for people who pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
