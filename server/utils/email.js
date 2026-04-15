const nodemailer = require('nodemailer');

// Gmail SMTP configuration — loaded from environment variables
// Set GMAIL_USER and GMAIL_PASS in Render dashboard
const GMAIL_USER = process.env.GMAIL_USER || 'harshtak2202@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_PASS || 'ftwbdzdtwhuqazou';

// Singleton transporter — initialized once, reused for all emails
let transporter = null;
let transporterReady = false;

/**
 * Initialize Gmail SMTP transporter.
 * Uses App Password for authentication (requires 2FA enabled on Google account).
 */
async function initTransporter() {
  console.log('[Email] Initializing Gmail SMTP transporter...');

  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // Verify the SMTP connection is working
    await transporter.verify();
    transporterReady = true;

    console.log('[Email] ✅ Gmail SMTP connection verified — transporter is ready');
    console.log(`[Email]   Sending from: ${GMAIL_USER}`);
    return true;
  } catch (err) {
    console.error('[Email] ❌ Failed to initialize Gmail transporter:', err.message);
    transporter = null;
    transporterReady = false;
    return false;
  }
}

/**
 * Send order confirmation email via Gmail.
 * Called AFTER successful order commit. Handles its own errors —
 * never crashes the server, never blocks the order response.
 */
async function sendOrderConfirmationEmail({ to, orderId, items, totalAmount, shipping, paymentMethod, paymentStatus }) {
  console.log(`[Email] Preparing to send order confirmation for Order #${orderId} to ${to}...`);

  try {
    // Initialize transporter on first call (lazy singleton)
    if (!transporterReady) {
      const success = await initTransporter();
      if (!success) {
        console.error(`[Email] Cannot send email for Order #${orderId} — transporter initialization failed`);
        return { success: false, error: 'Transporter not ready' };
      }
    }

    // Build items table rows
    const itemsHtml = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:10px 8px;border-bottom:1px solid #eee">${item.name}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">₹${Number(item.price).toLocaleString('en-IN')}</td>
          </tr>`
      )
      .join('');

    // Payment info section
    const paymentHtml = paymentMethod
      ? `<h3 style="margin-top:20px;color:#232f3e">Payment</h3>
         <p><strong>Method:</strong> ${paymentMethod.toUpperCase()}</p>
         <p><strong>Status:</strong> <span style="color:${paymentStatus === 'paid' ? '#067d62' : '#b7791f'};font-weight:bold">${paymentStatus === 'paid' ? 'Paid' : 'Pay on Delivery'}</span></p>`
      : '';

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:4px;overflow:hidden">
        <div style="background:#131921;padding:24px;text-align:center">
          <h1 style="color:#febd69;margin:0;font-size:28px;letter-spacing:1px">ShopZone</h1>
        </div>
        <div style="padding:24px 28px">
          <h2 style="color:#067d62;margin-top:0">✅ Order Confirmed!</h2>
          <p style="font-size:15px;color:#333">Thank you for your order. Here are your details:</p>
          <p style="font-size:16px;background:#f7f7f7;padding:10px 14px;border-radius:4px;display:inline-block"><strong>Order ID:</strong> #${orderId}</p>

          <h3 style="margin-top:24px;color:#232f3e">Items Ordered</h3>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#232f3e;color:white">
                <th style="padding:10px 8px;text-align:left">Product</th>
                <th style="padding:10px 8px;text-align:center">Qty</th>
                <th style="padding:10px 8px;text-align:right">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:4px;padding:12px 16px;margin-top:16px;text-align:right">
            <span style="font-size:20px;font-weight:bold;color:#065f46">Total: ₹${Number(totalAmount).toLocaleString('en-IN')}</span>
          </div>

          ${paymentHtml}

          <h3 style="margin-top:20px;color:#232f3e">Shipping Address</h3>
          <div style="background:#f7f7f7;padding:12px 16px;border-radius:4px">
            <p style="margin:0">${shipping.name}</p>
            <p style="margin:4px 0 0;color:#555">${shipping.address}</p>
            <p style="margin:4px 0 0;color:#555">${shipping.city}, ${shipping.state} ${shipping.zip}</p>
          </div>

          <hr style="border:none;border-top:1px solid #ddd;margin:28px 0 16px">
          <p style="color:#999;font-size:11px;text-align:center">This is an automated email from ShopZone. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    console.log(`[Email] Sending email to ${to} via Gmail SMTP...`);

    const info = await transporter.sendMail({
      from: `"ShopZone" <${GMAIL_USER}>`,
      to,
      subject: `ShopZone — Order Confirmed #${orderId}`,
      html,
    });

    console.log(`[Email] ✅ Email sent successfully for Order #${orderId}`);
    console.log(`[Email]   Message ID: ${info.messageId}`);
    console.log(`[Email]   To: ${to}`);
    console.log(`[Email]   From: ${GMAIL_USER}`);

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[Email] ❌ Failed to send email for Order #${orderId}:`);
    console.error(`[Email]   Error: ${err.message}`);
    console.error(`[Email]   To: ${to}`);

    // Reset transporter on connection errors for retry on next order
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET' || err.code === 'EAUTH') {
      console.log('[Email] Resetting transporter due to connection/auth error');
      transporter = null;
      transporterReady = false;
    }

    return { success: false, error: err.message };
  }
}

module.exports = { sendOrderConfirmationEmail };
