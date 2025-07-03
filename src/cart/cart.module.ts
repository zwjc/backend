import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [SupabaseModule, AuthModule], // Add AuthModule to imports
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}