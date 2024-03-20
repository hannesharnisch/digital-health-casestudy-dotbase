import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import aggregators from './aggregators';
import KPIAggregatorRegistry from './KPIRegistry';

async function bootstrap() {
  for (const aggregator of aggregators) {
    KPIAggregatorRegistry.register(aggregator);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
