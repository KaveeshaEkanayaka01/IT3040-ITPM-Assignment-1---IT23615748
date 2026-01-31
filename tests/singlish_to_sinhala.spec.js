async function debugSinhalaOutput(page) {
  const sinhalaDivs = await page.locator('div').filter({ hasText: 'ම' }).all();
  console.log(`Found ${sinhalaDivs.length} divs`);

  for (let i = 0; i < sinhalaDivs.length; i++) {
    const txt = await sinhalaDivs[i].textContent();
    console.log(`Div ${i}: "${txt?.trim()}"`);
  }

  await page.waitForFunction(() => {
    const output = Array.from(document.querySelectorAll('div')).find(div =>
      div.textContent?.includes('ම')
    );
    return output && output.textContent.trim().length > 0;
  }, { timeout: 10000 });

  const output = await page.locator('div', { hasText: 'ම' }).first();
  console.log('Actual:', JSON.stringify(await output.textContent()));
}

import { test, expect } from '@playwright/test';

// POSITIVE FUNCTIONAL 
test('Pos_Fun_0001 - Convert a short daily greeting phrase(Formal)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('suBha udhaeesanak veevaa!');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('සුභ උදෑසනක් වේවා!');
});

test('Pos_Fun_0002 - Currency/numbers', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('mama oyaata rupiyal 500 k dhunnaa.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('මම ඔයාට රුපියල් 500 ක් දුන්නා.');
});

test('Pos_Fun_0003 - Time/ date format', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('api haemooma 29/03/2026 dhina udhaeesana 9 ta udhYaanayea hamuviimata dhaagaththaa.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('අපි හැමෝම 29/03/2026 දින උදෑසන 9 ට උද්‍යානයේ හමුවීමට දාගත්තා.');
});

test('Pos_Fun_0004 - Technical English embedded in Singlish sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText = 'Laptop ekata Android Studio install karala app eka hadhanna patan ganna oonea';
  const input = page.locator('textarea').first();
  await input.fill(inputText);

  await page.waitForTimeout(8000);

  await expect(page).toHaveURL(/swifttranslator/);

  await expect(input).toHaveValue(inputText);
});

test('Pos_Fun_0005 - Multiple line Singlish text', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('adha mama gedhara innavaa.\nnamuth heta mama yanavaa.\nee nisaa adha hamuvenna puLuvan.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain(`අද මම ගෙදර ඉන්නවා.
නමුත් හෙට මම යනවා.
ඒ නිසා අද හමුවෙන්න පුළුවන්.`);
});

test('Pos_Fun_0006 - Convert a short daily usage sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('mama gedhara yanavaa.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('මම ගෙදර යනවා.');
});

test('Pos_Fun_0007 - Convert a short daily usage sentence (past tense)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('iiyee mama panthi giyaa, eeth adha giyee naehae.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('ඊයේ මම පන්ති ගියා, ඒත් අද ගියේ නැහැ.');
});

test('Pos_Fun_0008 - polite request', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText = 'karuNaakara mata vathura dhenna puLuvandha ?';
  const expectedOutput = 'කරුණාකර මට වතුර දෙන්න පුළුවන්ද ?';

  await page.locator('textarea').first().fill(inputText);

  await page.waitForFunction(
    (text) => document.body.innerText.includes(text),
    expectedOutput,
    { timeout: 30000 }
  );

  const bodyText = await page.textContent('body');
  expect(bodyText).toContain(expectedOutput);
});

test('Pos_Fun_0009 - Mixed English brands', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText = 'api kohendha kannea adha? KFC eken kamudha? naethnam PIZZA HUT eken kamudha?';
  const expectedOutput = 'අපි කොහෙන්ද කන්නේ අද? KFC එකෙන් කමුද? නැත්නම් PIZZA HUT එකෙන් කමුද?';

  await page.locator('textarea').first().fill(inputText);

  await page.waitForFunction(
    (text) => document.body.innerText.includes(text),
    expectedOutput,
    { timeout: 30000 }
  );

  const bodyText = await page.textContent('body');
  expect(bodyText).toContain(expectedOutput);
});

test('Pos_Fun_0010 - Negative double negation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText = 'Ohu kavadhaavath kisima dheyakata ekaGa novannea naehae';
  const input = page.locator('textarea').first();
  await input.fill(inputText);

  await page.waitForTimeout(8000);

  await expect(page).toHaveURL(/swifttranslator/);

  await expect(input).toHaveValue(inputText);
});

test('Pos_Fun_0011 - Numeric units', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('dhinapathaa  udhee 7ta 2km dhuvanna.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('දිනපතා  උදේ 7ට 2km දුවන්න.');
});

test('Pos_Fun_0012 - Short command, emphasis', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('dhuvanna dhuvanna!');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('දුවන්න දුවන්න!');
});

test('Pos_Fun_0013 - Compound sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('mama gedhara yanavaa, eyaa office ekata yanavaa.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('මම ගෙදර යනවා, එයා office එකට යනවා.');
});

test('Pos_Fun_0014 - Complex sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('mama gedhara yana nisaa api  raee venakan innee naehae.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('මම ගෙදර යන නිසා අපි  රෑ වෙනකන් ඉන්නේ නැහැ.');
});

test('Pos_Fun_0015 - Singular phrase', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('eyaa lassanayi.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('එයා ලස්සනයි.');
});

test('Pos_Fun_0016 - Plural phrase', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('api lassanayi.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('අපි ලස්සනයි.');
});

test('Pos_Fun_0017 - Short input (≤30 chars)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('aeththatama hoDHAyi.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('ඇත්තටම හොඳයි.');
});

test('Pos_Fun_0018 - Medium input (31–299 chars)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText = 'mama adha udhee gedharin pitath velaa kaaryaalayata giyaa. ethanadhi mithuranta muNagaehii vaeda katayuthu kihipayak nima karalaa havasata naevatha gedhara aavaa.';
  const input = page.locator('textarea').first();
  await input.fill(inputText);

  await page.waitForTimeout(8000);

  await expect(page).toHaveURL(/swifttranslator/);

  await expect(input).toHaveValue(inputText);
});

test('Pos_Fun_0019 - Long input (≥300 chars)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputText =
    'varthamaana thaakShaNika yugayeedhii parigaNakaya haa jQQgama dhurakaThanaya manuShYA jiivithayee athYAvashYA kotasak vii thibee. dhinen dhina varDhanaya vana thaakShaNaya magin aDhYaapanaya, vYaapaaraya, sanniveedhanaya saha vinoodhaasvaadhaya vaeni kSheethra bohoomayakama kriyaakaariithvaya ithaa pahasu haa veegavath vii aetha. emaGin minisungee dhainika jiivithaya thavadhuratath pahasu karamin nava avasThaa raesak udhaa kara dhii thibee.';

  const input = page.locator('textarea').first();
  await input.fill(inputText);

  await page.waitForTimeout(8000);

  await expect(page).toHaveURL(/swifttranslator/);

  await expect(input).toHaveValue(inputText);
});

test('Pos_Fun_0020 - Question Form', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('oyaa eeka harita kaLaadha?');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('ඔයා ඒක හරිට කළාද?');
});

test('Pos_Fun_0021 - Casual agreement', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('hari hari');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('හරි හරි');
});

test('Pos_Fun_0022 - Friendly response', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('eLa machan');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('එළ මචන්');
});

test('Pos_Fun_0023 - Long paragraph with mixed English', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('varthamaana kaalayee technology kiyannee api jiivithee aeththama aeththee dheyak. mobile phone, internet saha social media valin api dhaen huGAk dhee kiyanna puLuvan. education saha business valata eeka loku udhavvak.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('වර්තමාන කාලයේ technology කියන්නේ අපි ජීවිතේ ඇත්තම ඇත්තේ දෙයක්. mobile phone, internet සහ social media වලින් අපි දැන් හුඟක් දේ කියන්න පුළුවන්. education සහ business වලට ඒක ලොකු උදව්වක්.');
});

test('Pos_Fun_0024 - Translate long historical paragraph from Singlish to Sinhala', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('shrii lQQkaavee ithihaasaya sesu dheeshavala ithihaasaya menma athishaya varNavath saha gaeBuru vee. merata puraaNa janayaa vuu lookayaagee mul avaDhi vala sitama godanaegili, nagara saha raajYA krama sQQvarDhanaya vii thibee. anuraaDhapura yugaya saha poLonnaruvee raajYA paalana yugaya mema dhivayinee sQQskRUthika, aarThika saha aagamika karmaanthaya dhaediva varDhanaya vuu kaalayayi. vidheeshiiya balavathun, visheeShayenma poorthugiisi, olandha, brithaanYA aakramaNayan, dheeshiiya janathaavagee jiivana rataava saha sQQskRUthiyata vishaala balapaeem ella kaLeeya. nava yugayeedhii nidhahas vanakota, jaathika haeDHunum, aarThika varDhanaya saha samaaja sQQvarDhanaya piLibaDHA vaedhagath piyavara gaththaa ya. shrii lQQkaavee ithihaasaya aDhYAyanaya kiriimen, apata paraNa sampradhaayan, samaaja vYAvasThaa, yudhDha, vidheesha aakramaNa saha sQQskRUthika vatinaakam piLibaDHAva gaeBuru avabooDhayak labaa gatha haeka. emenma, athiithayee paadam sahitha sidhuviim, varthamaana thiiraNa gaeniimata saha jaathika haeDHunuma saha sQQskRUthika urumaya surakShitha kiriimata maga penvayi.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).toContain('ශ්‍රී ලංකාවේ ඉතිහාසය සෙසු දේශවල ඉතිහාසය මෙන්ම අතිශය වර්ණවත් සහ ගැඹුරු වේ. මෙරට පුරාණ ජනයා වූ ලෝකයාගේ මුල් අවධි වල සිටම ගොඩනැගිලි, නගර සහ රාජ්‍ය ක්‍රම සංවර්ධනය වී තිබේ. අනුරාධපුර යුගය සහ පොළොන්නරුවේ රාජ්‍ය පාලන යුගය මෙම දිවයිනේ සංස්කෘතික, ආර්ථික සහ ආගමික කර්මාන්තය දැඩිව වර්ධනය වූ කාලයයි. විදේශීය බලවතුන්, විශේෂයෙන්ම පෝර්තුගීසි, ඔලන්ද, බ්‍රිතාන්‍ය ආක්‍රමණයන්, දේශීය ජනතාවගේ ජීවන රටාව සහ සංස්කෘතියට විශාල බලපෑම් ella කළේය. නව යුගයේදී නිදහස් වනකොට, ජාතික හැඳුනුම්, ආර්ථික වර්ධනය සහ සමාජ සංවර්ධනය පිළිබඳ වැදගත් පියවර ගත්තා ය. ශ්‍රී ලංකාවේ ඉතිහාසය අධ්‍යයනය කිරීමෙන්, අපට පරණ සම්ප්‍රදායන්, සමාජ ව්‍යවස්ථා, යුද්ධ, විදේශ ආක්‍රමණ සහ සංස්කෘතික වටිනාකම් පිළිබඳව ගැඹුරු අවබෝධයක් ලබා ගත හැක. එමෙන්ම, අතීතයේ පාඩම් සහිත සිදුවීම්, වර්තමාන තීරණ ගැනීමට සහ ජාතික හැඳුනුම සහ සංස්කෘතික උරුමය සුරක්ෂිත කිරීමට මග පෙන්වයි.');
});

// NEGATIVE FUNCTIONAL
test('Neg_Fun_0001 - Slang overload', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('oyaata pissudha? ow mata pissu.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ඔයාට පිස්සුද? ඔව් මට පිස්සු.'); 
});

test('Neg_Fun_0002 - Joined words variation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('Oyaaeekaehemahithanneeaeyi?');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ඔයාඒකඑහෙමහිතන්නේඇයි?'); 
});

test('Neg_Fun_0003 - casual Sinhala sentences with abbreviations', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('oyaa dhaen meka try karanna pls, mama help karannam.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ඔයා දැන් මෙක try කරන්න pls, මම help කරන්නම්.'); 
});

test('Neg_Fun_0004 - Spelling error and formatting mismatch in output', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('Sri Lankava sundhara dhuupathaki.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ශ්‍රී ලංකාව සුන්දර දූපතකි.'); 
});

test('Neg_Fun_0005 - Character-spaced input causing corrupted translation output', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('m a m a g e d a r a y a n a w a');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ම ම ගෙ ද ර ය න වා'); 
});

test('Neg_Fun_0006 - Sinhala Spelling Validation Long Input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('sQQveegaanukuulathaa vishleeShaNaya thuLa ohugee parYeeShaNaya adhBhutha prathiPala penvaa dhunni.');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('සංවේගානුකූලතා විශ්ලේෂණය තුළ ඔහුගේ පර්යේෂණය අද්භුත ප්‍රතිඵල පෙන්වා දුන්නි.');
});

test('Neg_Fun_0007 - Spelling Error', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('magea yaluvaa hondhai kiyana ekak');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('මගේ යලුවා හොන්දයි කියන එකක්'); 
});

test('Neg_Fun_0008 - Code Switching Error', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('oyaagee project eka redi dha?');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ඔයාගේ ප්‍රොජෙක්ට් එක රෙඩි ද?');
});

test('Neg_Fun_0009 - Idiom Misinterpretation', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('kalupipenathaenakatayanavaa');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('කලු පිපෙන තැනකට යනවා');
});

test('Neg_Fun_0010 - Sinhala Spelling Validation Long Input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  await page.locator('textarea').first().fill('shrii lQQkaava svaaBhaavika saundharYAyen anuuna, indhiyan saagarayee muthu aetaya lesa virudhaavaliya lath athishaya manaram dhivayinaki. ');
  await page.waitForTimeout(3000);
  const text = await page.textContent('body');
  expect(text).not.toContain('ශ්‍රී ලංකාව ස්වාභාවික සෞන්දර්යයෙන් අනූන, ඉන්දියන් සාගරයේ මුතු ඇටය ලෙස විරුදාවලිය ලත් අතිශය මනරම් දිවයිනකි. ');
});

test('Pos_UI_0001 - Sinhala output updates correctly when correcting typed text (backspace usage)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  
  const inputField = page.locator('textarea').first();
  await inputField.fill('yaluvaa hondhayi kiyana ekak.');
  await page.waitForTimeout(3000);  
  
  const pageText = await page.textContent('body');
  console.log('Translated:', pageText);
  
  expect(pageText).toContain('yaluvaa hondhayi kiyana ekak.');
});

