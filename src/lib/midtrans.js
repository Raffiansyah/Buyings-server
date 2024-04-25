import MidtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

export const midtransSnap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const midtransParameter = ({
  products,
  order_id,
  gross_amount,
  username,
  email,
}) => {
  return {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    credit_card: {
      secure: true,
    },
    item_details: products.map((product) => ({
      id: product.id,
      price: product.price,
      quantity: product.quantity,
      name: product.name,
      category: product.categorySlug,
    })),
    customer_details: {
      first_name: username,
      email: email,
    },
  };
};
