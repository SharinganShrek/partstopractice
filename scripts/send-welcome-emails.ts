import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import {
  deliverWelcomeEmail,
  isSmtpConfigured,
  WELCOME_EMAIL_SUBJECT,
  WELCOME_LOGIN_URL,
} from '../lib/lms/welcome-email';
import { getResendFromAddress } from '../lib/lms/resend-from';

config({ path: '.env.local' });

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: rows, error } = await supabase
    .from('course_enrollments')
    .select('email')
    .order('email');

  if (error) {
    console.error('Enrollments fetch failed:', error.message);
    process.exit(1);
  }

  const emails = [...new Set((rows ?? []).map((r) => r.email.trim().toLowerCase()).filter(Boolean))];

  console.log(`Subject: ${WELCOME_EMAIL_SUBJECT}`);
  console.log(`Login URL: ${WELCOME_LOGIN_URL}`);
  console.log(`SMTP: ${isSmtpConfigured() ? 'yes' : 'no'}`);
  console.log(`From: ${isSmtpConfigured() ? (process.env.SMTP_FROM ?? process.env.SMTP_USER) : getResendFromAddress()}`);
  console.log(`Recipients: ${emails.length}${dryRun ? ' (dry run)' : ''}\n`);

  if (dryRun) {
    emails.forEach((email) => console.log(`  would send → ${email}`));
    return;
  }

  let sent = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const email of emails) {
    const result = await deliverWelcomeEmail(email);
    if (result.ok) {
      sent++;
      console.log(`  ✓ ${email} (${result.channel})`);
    } else {
      failed++;
      failures.push(`${email}: ${result.error}`);
      console.log(`  ✗ ${email}: ${result.error}`);
    }

    // Gentle rate limit for SMTP/Resend
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nDone: ${sent} sent, ${failed} failed`);
  if (failures.length) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  ${f}`));
    process.exit(1);
  }
}

main().catch(console.error);
