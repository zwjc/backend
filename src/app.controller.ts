import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase/supabase.provider';

@Controller()
export class AppController {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient
  ) {}

  @Get('ping')
  async ping(@Req() req: Request) {
    // Test Supabase connection
    const { data, error } = await this.supabase.rpc('version'); 
    // If you haven’t defined version(), replace with a simple select:
    // const { data, error } = await this.supabase.from('products').select('id').limit(1);

    return { message: 'pong', version: data, error };
  }

  @Get('hello')
  getHello(): string {
    return 'Hello from the backend!';
  }
}
