import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.provider';

@Injectable()
export class CartService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async getCart(userId: string) {
    const { data, error } = await this.supabaseClient
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (id, name, description, price, image_url)
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async addItemToCart(userId: string, productId: string, quantity: number) {
    // Check if item already exists in cart for this user and product
    const { data: existingItem, error: existingError } = await this.supabaseClient
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') { // PGRST116 means no rows found
      throw new Error(existingError.message);
    }

    if (existingItem) {
      // Update quantity if item exists
      const newQuantity = existingItem.quantity + quantity;
      const { data, error } = await this.supabaseClient
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    } else {
      // Insert new item if it doesn't exist
      const { data, error } = await this.supabaseClient
        .from('cart_items')
        .insert([{ user_id: userId, product_id: productId, quantity: quantity }]);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  }

  async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
    const { data, error } = await this.supabaseClient
      .from('cart_items')
      .update({ quantity: quantity })
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async removeItemFromCart(userId: string, productId: string) {
    const { data, error } = await this.supabaseClient
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}