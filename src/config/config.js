export default {
  db: process.env.DB_CONNECT,
  // set this to build
  // dir: 'build/',
  sessionSecret: process.env.SESSION_SECRET || 'MEAN',
  adminAccountUsername: process.env.ADMIN_ACCOUNT_USERNAME || 'admin@admin.com',
  adminAccountName: process.env.ADMIN_ACCOUNT_NAME || 'admin',
  adminAccountPhone: process.env.ADMIN_ACCOUNT_PHONE || '0788297207',
  adminAccountPassword: process.env.ADMIN_ACCOUNT_PASSWORD || 'Password@2022',
  adminIsVerified: process.env.ADMIN_IS_VERIFIED || true,
};
