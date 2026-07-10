export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Packed = 'packed',
  Shipped = 'shipped',
  OutForDelivery = 'out_for_delivery',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  ReturnRequested = 'return_requested',
  Refunded = 'refunded',
}

export enum PaymentStatus {
  Initiated = 'initiated',
  Pending = 'pending',
  RequiresAction = 'requires_action',
  Succeeded = 'succeeded',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Refunded = 'refunded',
}

export enum PaymentMethod {
  Card = 'card',
  NetBanking = 'netbanking',
  Upi = 'upi',
  Wallet = 'wallet',
  Cod = 'cod',
}

export enum CouponDiscountType {
  Percent = 'percent',
  Flat = 'flat',
}

