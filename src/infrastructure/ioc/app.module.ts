import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnv } from '../env';
import { ApplicationModule } from './application.module';
import { DomainModule } from './domain.module';
import { InfrastructureModule } from './infrastructure.module';

@Module({
  imports: [
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: getEnv(),
    }),
  ],
})
export class AppModule {}
