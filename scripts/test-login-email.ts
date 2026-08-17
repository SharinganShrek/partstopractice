import { config } from 'dotenv';
import { createMagicLink, deliverLoginEmail } from '../lib/lms/deliver-login-email';
import { isSmtpConfigured } from '../lib/lms/login-email-smtp';

config({ path: '.env.local' });

async function main() {
  const email = process.argv[2] ?? 'nwx7606@gmail.com';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const redirectTo = `${siteUrl}/auth/callback?next=/kurs`;

  console.log('SMTP configured:', isSmtpConfigured());

  const link = await createMagicLink(email, redirectTo);
  if (!link.ok) {
    console.error('generateLink failed:', link.error);
    process.exit(1);
  }

  const result = await deliverLoginEmail(email, link.magicLink);
  console.log('properties keys:', Object.keys(data?.properties ?? {}));
  console.log('hashed_token:', data?.properties?.hashed_token ? 'yes' : 'no');
  console.log('action_link prefix:', data?.properties?.action_link?.slice(0, 80));
}

main().catch(console.error);
