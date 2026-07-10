import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';

type AddressRecord = {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  isDefault: boolean;
};

@Controller('addresses')
export class AddressesController {
  private readonly addresses = new Map<string, AddressRecord[]>();

  private getUserAddresses(userId: string) {
    if (!this.addresses.has(userId)) {
      this.addresses.set(userId, []);
    }
    return this.addresses.get(userId)!;
  }

  @Get()
  list(@Req() req: any) {
    return { data: this.getUserAddresses(req.user?.userId ?? 'guest') };
  }

  @Post()
  add(@Req() req: any, @Body() body: any) {
    const userId = req.user?.userId ?? 'guest';
    const list = this.getUserAddresses(userId);
    const address: AddressRecord = {
      id: `addr-${Date.now()}`,
      userId,
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      line1: body.line1,
      line2: body.line2,
      city: body.city,
      state: body.state,
      postalCode: body.postalCode,
      country: body.country,
      addressType: body.addressType || 'Home',
      isDefault: body.isDefault || list.length === 0,
    };

    if (address.isDefault) {
      list.forEach((item) => {
        item.isDefault = false;
      });
    }

    list.push(address);
    return { message: 'Address added', data: address };
  }

  @Put(':addressId')
  update(@Req() req: any, @Param('addressId') addressId: string, @Body() body: any) {
    const list = this.getUserAddresses(req.user?.userId ?? 'guest');
    const address = list.find((item) => item.id === addressId);
    if (!address) {
      return { message: 'Address not found' };
    }

    Object.assign(address, body, { id: address.id, userId: address.userId });
    return { message: 'Address updated', data: address };
  }

  @Put(':addressId/default')
  setDefault(@Req() req: any, @Param('addressId') addressId: string) {
    const list = this.getUserAddresses(req.user?.userId ?? 'guest');
    list.forEach((item) => {
      item.isDefault = item.id === addressId;
    });
    return { message: 'Default address updated', addressId };
  }

  @Delete(':addressId')
  remove(@Req() req: any, @Param('addressId') addressId: string) {
    const list = this.getUserAddresses(req.user?.userId ?? 'guest').filter((item) => item.id !== addressId);
    this.addresses.set(req.user?.userId ?? 'guest', list);
    return { message: 'Address removed', addressId };
  }
}

