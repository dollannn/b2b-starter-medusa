import { QUOTE_MODULE } from './src/modules/quote';
import { APPROVAL_MODULE } from './src/modules/approval';
import { COMPANY_MODULE } from './src/modules/company';
import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV!, process.cwd());

module.exports = defineConfig({
	projectConfig: {
		databaseUrl: process.env.DATABASE_URL,
		redisUrl: process.env.REDIS_URL,
		http: {
			storeCors: process.env.STORE_CORS!,
			adminCors: process.env.ADMIN_CORS!,
			authCors: process.env.AUTH_CORS!,
			jwtSecret: process.env.JWT_SECRET || 'supersecret',
			cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
		},
	},
	modules: {
		[COMPANY_MODULE]: {
			resolve: './modules/company',
		},
		[QUOTE_MODULE]: {
			resolve: './modules/quote',
		},
		[APPROVAL_MODULE]: {
			resolve: './modules/approval',
		},
		[Modules.CACHE]: {
			resolve: '@medusajs/medusa/cache-redis',
			options: {
				redisUrl: process.env.REDIS_URL,
			},
		},
		[Modules.WORKFLOW_ENGINE]: {
			resolve: '@medusajs/medusa/workflow-engine-redis',
			options: {
				redis: {
					url: process.env.REDIS_URL,
				},
			},
		},
		[Modules.EVENT_BUS]: {
			resolve: '@medusajs/medusa/event-bus-redis',
			options: {
				redisUrl: process.env.REDIS_URL,
			},
		},
	},
});
