import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_ADMIN_APP_URL;

// Define other related types as well
interface Store {
    id: string;
    name: string;
    // other fields...
}

interface Buyer {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    // other fields...
}

interface Image {
    id: string;
    url: string;
}

interface Product {
    id: string;
    name: string;
    images: Image[];
}

interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number | null;
    product: Product;
    // other fields...
}

interface Order {
    id: string;
    storeId: string;
    store: Store;
    buyerId: string;
    buyer: Buyer;
    orderItems: OrderItem[];
    isPaid: boolean;
    isDelivered: boolean;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export const sendOrderAlert = async (email: string, order: Order) => {
    const totalPrice = order.orderItems.reduce(
        (total, item) => total + (item.price || 0),
        0
    );
    const orderItemsHtml = order.orderItems
        .map(
            (item) => `
            <li style="background-color: rgb(255,0,0); gap:0.5rem;font-family: serif; margin-bottom: 8px;">
            <strong style="padding-left: 2px">${
                item.product.name
            }</strong> - Quantity: ${item.quantity} - Price: KES${
                item.price || 0
            }
            <table style="width: 100%; background-color: #e2e8f0; padding: 10px; border-spacing: 0.5rem;">
                <tr>
                    ${item.product.images
                        .map(
                            (image) => `
                        <td style="width: 50%;">
                            <img src="${image.url}" alt="${item.product.name}" style="width: 100%; height: auto; max-height: 200px; border-radius: 5px;" />
                        </td>
                    `
                        )
                        .join("")}
                </tr>
            </table>
        </li>
    `
        )
        .join("");

    const orderUrl = `https://sokofiti-admin.vercel.app/${order.store.id}/orders/${order.id}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Glamarace Delivery",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1 className="font-black text-2xl">Dear ${order.store.name},</h1>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            Thank you for partnering with <strong style="color: rgb(255,0,0);">Glamarace</strong>,
            your premier online destination for high-quality fashion.
          </p>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            You received your order on ${order.createdAt.toDateString()}. Kindly schedule these products for delivery.
          </p>
          <ul style="font-family: serif; font-size: 16px; color: #333; list-style-type: none; padding: 0;">
            ${orderItemsHtml}
          </ul>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            <strong>Total Price:</strong> $${totalPrice.toFixed(2)}
          </p>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            You can view the order details <a href="${orderUrl}" style="color: blue;">here</a>.
          </p>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            We are esteemed to have you as our partner.
          </p>
          <p style="font-family: serif; font-size: 16px; color: #333;">
            Kind regards,<br/>
            Glamarace Team
          </p>
        </div>
      `,
    });
};
