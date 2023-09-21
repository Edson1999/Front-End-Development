import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Confirmación de cuenta',
    text: 'Comprueba tu cuenta en UpTask',
    html: ` <p>Hola: ${name}, comprueba tu cuenta en UpTask </p>
    <p>Tu cuenta ya está casi lista, solo debes hacer click en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar cuenta </a>

    <p>Si tu no solicitaste está cuenta, puedes ignorar el correo. </p>
    `,
  });
};

export const emailForgotPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Restablece tu password',
    text: 'Restablecer tu password',
    html: ` <p>Hola: ${name}, has solicitado restablecer tu password </p>
    <p>Sigue el siguiente enlace para generar un nuevo password:
    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer password </a>

    <p>Si tu no solicitaste este movimiento, puedes ignorar el correo. </p>
    `,
  });
};
