const BRAND_NAME = 'IMC 4191 Yaz Kampı';
const RESEND_TEST_FROM = 'onboarding@resend.dev';

/** Public mail domains cannot be used as Resend "from" addresses. */
const PUBLIC_MAIL_DOMAINS =
  /^(gmail|googlemail|hotmail|outlook|live|yahoo|icloud|protonmail|yandex)\./i;

function extractEmailAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match?.[1] ?? from).trim();
}

function isPublicMailFrom(from: string): boolean {
  const email = extractEmailAddress(from);
  const domain = email.split('@')[1];
  return !domain || PUBLIC_MAIL_DOMAINS.test(domain);
}

/**
 * Resend requires a verified domain (or onboarding@resend.dev for testing).
 * Gmail/outlook addresses in RESEND_FROM_EMAIL always fail and previously
 * caused a silent fallback to Supabase's default magic-link email.
 */
export function getResendFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();

  if (!configured || isPublicMailFrom(configured)) {
    if (configured) {
      console.warn(
        `RESEND_FROM_EMAIL (${configured}) is not a verified Resend sender; using ${RESEND_TEST_FROM}`
      );
    }
    return `${BRAND_NAME} <${RESEND_TEST_FROM}>`;
  }

  if (configured.includes('<')) {
    return configured;
  }

  return `${BRAND_NAME} <${configured}>`;
}

/** Resend sandbox (onboarding@resend.dev) only delivers to the account owner email. */
export function canSendResendToRecipient(to: string): boolean {
  const fromAddress = extractEmailAddress(getResendFromAddress()).toLowerCase();

  if (!fromAddress.endsWith('@resend.dev')) {
    return true;
  }

  const owner =
    process.env.RESEND_SANDBOX_OWNER_EMAIL?.trim().toLowerCase() ?? 'team4191@gmail.com';

  return to.trim().toLowerCase() === owner;
}

export function isResendSandboxDeliveryError(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes('testing emails') ||
    lower.includes('verify a domain') ||
    lower.includes('domain is not verified')
  );
}
