import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async googleLogin() {
    const { data, error } = await this.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async handleGoogleCallback(code: string) {
    const { data, error } = await this.supabaseClient.auth.exchangeCodeForSession(code);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getUser(accessToken: string) {
    const { data, error } = await this.supabaseClient.auth.getUser(accessToken);

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }

  async logout() {
    const { error } = await this.supabaseClient.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Logged out successfully' };
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
