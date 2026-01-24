export const createWelcomeEmailTemplate = (fullName, clientURL) => {
  // extract first name
  const firstName = fullName.split(" ")[0];

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Chatify!</title>
    <style>
      body {
        font-family: 'Helvetica', Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      h1 {
        color: #4f46e5;
      }
      p {
        line-height: 1.6;
        margin-bottom: 20px;
      }
      a.button {
        display: inline-block;
        padding: 12px 25px;
        background-color: #4f46e5;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      a.button:hover {
        background-color: #4338ca;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Chatify, ${firstName}! 🎉</h1>
      <p>We’re excited to have you on board. Chatify is here to make your messaging experience smooth, fun, and secure.</p>
      <p>To get started, click the button below to access your dashboard:</p>
      <p style="text-align:center;">
        <a href="${clientURL}" class="button">Go to Chatify</a>
      </p>
      <p>If you didn’t sign up for Chatify, you can safely ignore this email.</p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Chatify. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};

