import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

/** Unique student emails from registration list (parent/guardian contact). */
const studentEmails = `
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
zuleyha2002@hotmail.com
ozlembarut@msn.com
kayaisa.526@gmail.com
edakaplan1104@gmail.com
eminebalcikurt009@gmail.com
kantarlisukran@gmail.com
merve.zng.93@gmail.com
ozdemirebru233@gmail.com
ilknuruzunlar@gmail.com
dilberhardal@gmail.com
`.trim();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const emails = [...new Set(studentEmails.split(/\s+/).map((e) => e.trim().toLowerCase()).filter(Boolean))];
  const { data: existing } = await supabase.from('course_enrollments').select('email');
  const enrolled = new Set((existing ?? []).map((r) => r.email.toLowerCase()));

  const missing = emails.filter((e) => !enrolled.has(e));
  console.log(`List: ${emails.length} unique | DB: ${enrolled.size} | Missing: ${missing.length}`);
  if (missing.length) console.log(missing.join('\n'));

  let added = 0;
  for (const email of missing) {
    const { error } = await supabase.from('course_enrollments').insert({ email });
    if (error) console.error(`FAIL ${email}:`, error.message);
    else {
      added++;
      console.log(`+ ${email}`);
    }
  }
  console.log(`\nAdded ${added} new enrollments. Total in DB: ${enrolled.size + added}`);
}

main().catch(console.error);
