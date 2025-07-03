import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService, // Inject AuthService
  ) {}

  private async getUserIdFromRequest(req: Request): Promise<string> {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new Error('No access token provided');
    }
    const user = await this.authService.getUser(accessToken);
    if (!user || !user.id) {
      throw new Error('Invalid or expired token');
    }
    return user.id;
  }

  @Get()
  async getCart(@Req() req: Request) {
    const userId = await this.getUserIdFromRequest(req);
    return this.cartService.getCart(userId);
  }

  @Post('items')
  async addItemToCart(
    @Req() req: Request,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = await this.getUserIdFromRequest(req);
    return this.cartService.addItemToCart(userId, productId, quantity);
  }

  @Put('items/:productId')
  async updateCartItemQuantity(
    @Req() req: Request,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = await this.getUserIdFromRequest(req);
    return this.cartService.updateCartItemQuantity(userId, productId, quantity);
  }

  @Delete('items/:productId')
  async removeItemFromCart(
    @Req() req: Request,
    @Param('productId') productId: string,
  ) {
    const userId = await this.getUserIdFromRequest(req);
    return this.cartService.removeItemFromCart(userId, productId);
  }
}