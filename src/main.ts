/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
import { AppModule } from './app.module';

async function bootstrap() {

	const port = 3001;
	const host = 'localhost';

	const app = await NestFactory.create(AppModule);

	await app.listen(port, host, () => {
		const message = `Listening at http://${host}:${port}`;
		console.log(chalk.magenta(message));
	});
}
bootstrap();
