/* eslint-disable */
import nodemailer from "nodemailer";
import { NextApiResponse, NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: "do-not-reply@madvibes.com",
      to: "madvibes.la@gmail.com",
      subject: `Contact form submission from ${firstName} ${lastName}`,
      html: `<h2>You have a contact form submission</h2><br>
        <p><strong>Email: </strong> ${email}</p><br>
        <p><strong>Message: </strong> ${message}</p><br>
      `
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};
