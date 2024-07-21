import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ProvidersModule } from './providers/providers.module';

@Global()
@Module({
  imports: [DatabaseModule, ProvidersModule],
  exports: [DatabaseModule, ProvidersModule],
})
export class GlobalModule {}
