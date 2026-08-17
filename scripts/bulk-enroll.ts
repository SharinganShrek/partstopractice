import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const emailsRaw = `
b3linaysw@gmail.com
eceserrausta@gmail.com
algurceren@gmail.com
beratbulut2010@gmail.com
aysegultanrikulu994@gmail.com
mehmeteminfidan810@gmail.com
yusuf.kagan.dalmis@hotmail.com
eliffidan42@gmail.com
yagmurozturk2510@gmail.com
reyyanyilmaz0334@gmail.com
drsibelmutlu@yahoo.com.tr
okurovgu@gmail.com
ecrinfidanci07@gmail.com
akcazey1@gmail.com
yildizgenc@yahoo.com
ilayermis@gmail.com
bhrecebhr@gmail.com
azra69137@gmail.com
yelizkabasakal.1984@gmail.com
asozdogan@tevitol.k12.tr
sibel.kurnaz1980@gmail.com
seyman_17@windowslive.com
melikeozkaleksi@gmail.com
aliaras01905@gmail.com
elf57elf@gmail.com
jerkank@hotmail.com
leventus55@gmail.com
tekben76@gmail.com
bunal.esra@gmail.com
hsynturkseven@hotmail.com
cokgencmehtap@gmail.com
sengilmelek@gmail.com
aryakync@gmail.com
eiyilmaz@gmail.com
aysegullyildirim@gmail.com
semihpolatt@hotmail.com
bedriye_ozer@hotmail.com
serdarmestan3@gmail.com
mnmtekin@hotmail.com
elifak931@gmail.com
ozzice@hotmail.com
pinarerhanoglu@gmail.com
ulviorhan23@yahoo.com
hsbgzn@hotmail.com
mertaltinpinar725@gmail.com
berilkkoc@gmail.com
zehrakartayuysal@gmail.com
zuhalsatir4@gmail.com
ezgiikizler99@gmail.com
zuhalsatir@gmail.com
zuleyha2002@hotmail.com
tanriverdiayberk7606@gmail.com
`.trim();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const emails = [...new Set(emailsRaw.split(/\s+/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
  console.log(`Enrolling ${emails.length} unique emails...\n`);

  let added = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const email of emails) {
    const { error } = await supabase.from('course_enrollments').insert({ email });
    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        skipped++;
        console.log(`  ~ already enrolled: ${email}`);
      } else {
        errors.push(`${email}: ${error.message}`);
        console.log(`  ✗ ${email}: ${error.message}`);
      }
    } else {
      added++;
      console.log(`  ✓ ${email}`);
    }
  }

  console.log(`\nDone: ${added} added, ${skipped} already existed, ${errors.length} errors`);
  if (errors.length) process.exit(1);
}

main().catch(console.error);
