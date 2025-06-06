export const config = {
	environment: import.meta.env.APP_ENV || 'development'
};

export const isDev = config.environment === 'development';
export const isProd = config.environment === 'production';
export const isTest = config.environment === 'test';
