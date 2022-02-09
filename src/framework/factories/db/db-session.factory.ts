import { DbSession } from '@/framework/prisma';

const dbSessionFactory = (): DbSession => new DbSession();

export { dbSessionFactory };
