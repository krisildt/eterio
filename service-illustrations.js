import { worlds, services } from './services.js';

const palettes = {
  technology: ['#8d7cf1', '#d8a45b'],
  creative: ['#d8a45b', '#6757d9'],
  media: ['#b2c3d5', '#d8a45b'],
  marketing: ['#c7a784', '#6757d9'],
  legal: ['#a99ce9', '#d8a45b']
};

// One original, service-specific vector plate per confirmed route. These are editorial diagrams,
// not fake client screens or marks; the sprite is generated from this source during the static build.
const plates = {
  'web-development': ['architecture', '<path d="M173 360V185l126-71 126 71v175M299 114v246M173 185h252M219 360V211l80-45 80 45v149"/><path d="m198 168 101-57 101 57M215 207h168M244 360v-93l55-31 55 31v93"/>', 'Layered structure with an open route from foundation to interface.'],
  'web-applications': ['flow', '<rect x="185" y="140" width="172" height="218" rx="2"/><rect x="216" y="173" width="172" height="218" rx="2"/><rect x="247" y="206" width="172" height="218" rx="2"/><path d="M271 250h122M271 278h82M271 322h104"/><circle cx="356" cy="318" r="7" fill="var(--a)"/>', 'Nested product layers with a visible task path.'],
  'mobile-apps': ['device', '<rect x="205" y="121" width="132" height="270" rx="19"/><rect x="229" y="151" width="84" height="179" rx="2"/><path d="M244 186h53M244 204h39M244 260h53M244 278h45"/><circle cx="271" cy="359" r="6"/><path d="M366 178h64v172h-64zM380 203h36M380 225h36M380 247h24"/>', 'Two responsive canvases arranged around the same essential task.'],
  'desktop-software': ['windows', '<path d="M161 149h215v171H161zM188 177h215v171H188zM215 205h215v171H215z"/><path d="M215 235h215M245 261h64M245 283h129M245 315h94"/><circle cx="231" cy="220" r="3" fill="var(--a)"/><circle cx="243" cy="220" r="3" fill="var(--b)"/>', 'Window layers with space for a focused desktop workflow.'],
  'game-development': ['topography', '<path d="m173 321 126-74 126 74-126 74-126-74Z"/><path d="m216 296 83-49 83 49-83 49-83-49ZM257 272l42-25 42 25-42 25-42-25Z"/><path d="M299 247V151M257 272V176M341 272V176M216 296V200M382 296V200M173 321V225"/><path d="M299 151v-28m0 0 18 12m-18-12-18 12"/>', 'A playable route mapped through terrain rather than a stock game screen.'],
  'ai-solutions': ['branches', '<path d="M207 164h94v64h-94zM341 164h94v64h-94zM274 315h94v64h-94z"/><path d="M254 228v42l67 45M388 228v42l-67 45M301 196h40"/><circle cx="321" cy="315" r="9" fill="var(--a)"/><path d="M191 125h260M191 414h260"/>', 'A bounded decision tree with a clear human review point.'],
  'saas-products': ['modules', '<path d="M184 174h102v78H184zM306 174h102v78H306zM184 274h102v78H184zM306 274h102v78H306z"/><path d="M286 213h20M235 252v22M357 252v22M286 313h20"/><circle cx="296" cy="213" r="5" fill="var(--a)"/><circle cx="296" cy="313" r="5" fill="var(--b)"/>', 'A modular service organized around repeated use and clear states.'],
  'automation-systems': ['workflow', '<circle cx="197" cy="230" r="18"/><rect x="276" y="147" width="102" height="62" rx="2"/><path d="m213 218 63-54M213 242l63 72"/><path d="M327 209v64M327 273h98v-52"/><path d="m415 211 10 10-10 10"/><path d="M276 283h102v62H276z"/><path d="M327 345v34H197v-95"/><circle cx="197" cy="284" r="6" fill="var(--a)"/>', 'A repeatable path with a visible exception loop.'],
  'graphic-design': ['print', '<path d="M184 127h248v296H184zM214 157h188v236H214z"/><path d="M246 189h105v91H246z" fill="var(--a)" fill-opacity=".22"/><path d="M246 301h138M246 325h102M246 349h126"/><path d="M171 145h26m-13-13v26M419 145h26m-13-13v26M171 405h26m-13-13v26M419 405h26m-13-13v26"/>', 'A print composition held by a deliberate grid and crop.'],
  'brand-identity': ['system', '<path d="M183 159h251M183 201h165M183 243h219M183 285h142"/><path d="M183 337h75v57h-75zM273 337h75v57h-75zM363 337h71v57h-71z" fill="var(--a)" fill-opacity=".24"/><path d="M259 159h175M348 201h86M402 243h32M325 285h109"/>', 'A family of visual rules, not a single decorative mark.'],
  'logo-design': ['type', '<path d="M179 149h264M179 199h264M179 249h264M179 299h264M179 349h264"/><text x="206" y="324" class="specimen">Aa</text><path d="M313 155v205M179 365h264"/><circle cx="313" cy="249" r="7" fill="var(--a)"/>', 'A typographic specimen under measured optical alignment.'],
  'uiux-design': ['journey', '<path d="M182 178h104v68H182zM335 178h104v68H335zM258 320h104v68H258z"/><path d="M286 212h49M387 246v40H310v34"/><circle cx="310" cy="320" r="8" fill="var(--a)"/><path d="M203 210h60M356 210h62M280 350h60"/>', 'A user journey made legible across states and decisions.'],
  'motion-graphics': ['sequence', '<rect x="171" y="155" width="122" height="90"/><rect x="299" y="155" width="122" height="90"/><rect x="235" y="263" width="122" height="90"/><path d="M195 218c18-49 55-49 73 0M323 218c18-49 55-49 73 0M259 326c18-49 55-49 73 0"/><path d="M293 198h6M292 304l7-5" stroke="var(--a)" stroke-width="4"/>', 'Three successive frames show one form moving through time.'],
  '3d-modeling': ['wireframe', '<path d="m299 124 127 73v147l-127 73-127-73V197l127-73Z"/><path d="m299 124v146m127-73-127 73-127-73M299 270v147m0-147 127 74M299 270l-127 74"/><path d="m219 178 126 73v146M379 170l-126 74v147"/>', 'A volume revealed through its underlying construction.'],
  '3d-animation': ['orbit', '<path d="m205 303 54-95 73 0 54 95-54 70h-73l-54-70Z" opacity=".28"/><path d="m257 303 54-95 73 0 54 95-54 70h-73l-54-70Z" opacity=".58"/><path d="m309 303 54-95 73 0 54 95-54 70h-73l-54-70Z"/><path d="M176 390c65 39 204 39 286-3" stroke="var(--a)"/><circle cx="462" cy="383" r="6" fill="var(--a)"/>', 'A changing silhouette tracked across a compact motion arc.'],
  'product-visualization': ['object', '<path d="m299 139 94 46-18 167-76 52-77-50-18-169 95-46Z"/><path d="m299 139-1 110m95-64-95 64-94-66m94 66-1 149M241 184l57 65 61-65M222 353l77-104 76 103"/><path d="M165 410h269M172 421h255" stroke="var(--a)"/>', 'A single object study with light, scale, and material in view.'],
  'video-editing': ['timeline', '<path d="M170 155h275M170 202h275M170 249h275M170 296h275M170 343h275"/><path d="M177 161h86v35h-86zM270 161h53v35h-53zM330 161h108v35H330z" fill="var(--a)" fill-opacity=".27"/><path d="M177 208h43v35h-43zM227 208h117v35H227zM351 208h87v35h-87z"/><path d="M310 136v225" stroke="var(--a)" stroke-width="2"/><path d="M176 319h261" stroke="var(--b)" stroke-width="2"/>', 'A cut rhythm organized across picture, sound, and a review point.'],
  'commercial-videos': ['storyboard', '<rect x="174" y="154" width="112" height="86"/><rect x="304" y="154" width="112" height="86"/><rect x="174" y="259" width="112" height="86"/><rect x="304" y="259" width="112" height="86"/><path d="M189 223 246 171l25 52M319 222l42-51 41 51M188 330l45-49 39 49M318 330l44-49 40 49"/><path d="M286 197h18M286 302h18" stroke="var(--a)" stroke-width="2"/>', 'Four framed moments map a story before the shoot.'],
  'music-videos': ['stage', '<path d="M202 124v155M419 124v155M202 279h217"/><path d="M202 124 302 246M419 124 319 246" stroke="var(--a)" stroke-width="3"/><path d="M235 279v94M386 279v94M276 246v127M345 246v127"/><circle cx="310" cy="202" r="36" stroke="var(--b)"/><path d="M310 165v74M273 202h74"/>', 'A staged composition built from contrast, tempo, and light.'],
  'sound-design': ['wave', '<path d="M164 267c37 0 37-87 74-87s37 174 74 174 37-174 74-174 37 87 74 87" stroke="var(--a)" stroke-width="3"/><path d="M164 267h370"/><circle cx="238" cy="180" r="7" fill="var(--b)"/><circle cx="312" cy="354" r="7" fill="var(--b)"/><circle cx="386" cy="180" r="7" fill="var(--b)"/><path d="M164 389h370M164 405h258"/>', 'A sound wave shaped as a physical contour, not a stock waveform.'],
  'audio-production': ['phase', '<circle cx="302" cy="267" r="112"/><circle cx="302" cy="267" r="81" stroke="var(--a)"/><circle cx="302" cy="267" r="48" stroke="var(--b)"/><path d="M414 267h74M116 267h74M302 155v-45M302 424v-45"/><path d="M190 267c0-62 50-112 112-112M414 267c0 62-50 112-112 112" stroke-width="5"/>', 'Phase and space arranged as a listening geometry.'],
  'song-production': ['rhythm', '<path d="M172 178h270M172 212h270M172 246h270M172 280h270M172 314h270"/><path d="M223 178v117M281 212v117M356 178v117M404 246v95" stroke="var(--a)" stroke-width="2"/><ellipse cx="217" cy="296" rx="10" ry="7" fill="var(--a)"/><ellipse cx="275" cy="328" rx="10" ry="7" fill="var(--b)"/><ellipse cx="350" cy="296" rx="10" ry="7" fill="var(--a)"/><ellipse cx="398" cy="324" rx="10" ry="7" fill="var(--b)"/>', 'Rhythm, arrangement, and a phrase in motion.'],
  'podcast-production': ['voice', '<path d="M195 203v60c0 64 41 103 103 103s103-39 103-103v-60"/><path d="M223 218v44c0 45 28 72 75 72s75-27 75-72v-44" stroke="var(--a)"/><path d="M298 366v42M256 410h84"/><path d="M149 239h24M423 239h24M165 264h18M413 264h18" stroke="var(--b)" stroke-width="3"/>', 'A focused recording space for a clear, human voice.'],
  'social-media': ['formats', '<rect x="172" y="148" width="90" height="126"/><rect x="279" y="148" width="126" height="126"/><rect x="422" y="148" width="58" height="126"/><path d="M189 170h56M189 189h42M297 170h90M297 190h72M436 170h30"/><path d="M172 302h308M172 320h214M172 338h264" stroke="var(--a)"/>', 'One content idea adapted to distinct social formats.'],
  'content-creation': ['editorial', '<path d="M185 147h224v267H185zM215 176h162v205H215z"/><path d="M215 283h162v98H215z" fill="var(--a)" fill-opacity=".2"/><path d="M235 201h110M235 221h82M235 244h131M235 309h113M235 331h87M235 353h123"/><path d="M394 132v30M379 147h30" stroke="var(--b)" stroke-width="2"/>', 'An editorial content frame with room for image and argument.'],
  'seo': ['index', '<path d="M173 165h238M173 202h184M173 239h214M173 276h151M173 346h238"/><path d="M173 315h202" stroke="var(--a)" stroke-width="3"/><circle cx="412" cy="313" r="35"/><path d="m438 339 32 32" stroke="var(--b)" stroke-width="6"/><path d="M192 386h183"/>', 'A content hierarchy inspected from query to useful page.'],
  'advertising-campaigns': ['campaign', '<rect x="172" y="153" width="154" height="212"/><rect x="344" y="153" width="120" height="120"/><rect x="344" y="292" width="120" height="73"/><path d="M190 172h118M190 192h82M190 322h118M360 174h88M360 313h88"/><path d="m326 259 18-43m-18 92 18-16" stroke="var(--a)" stroke-width="2"/>', 'One campaign idea translated across different placements.'],
  'meta-ads': ['routing', '<circle cx="304" cy="265" r="44" fill="var(--a)" fill-opacity=".2"/><circle cx="304" cy="265" r="10" fill="var(--a)"/><circle cx="176" cy="164" r="15"/><circle cx="432" cy="164" r="15"/><circle cx="176" cy="364" r="15"/><circle cx="432" cy="364" r="15"/><path d="m190 174 80 63m48 0 99-63M270 280l-80 72m146-72 82 72"/>', 'A controlled path between audience context and delivery.'],
  'google-ads': ['search', '<rect x="170" y="153" width="280" height="61" rx="30"/><circle cx="203" cy="184" r="10"/><path d="m211 192 13 13M247 184h160"/><path d="M183 254h219M183 277h171M183 304h202M183 342h112"/><path d="M424 252v107" stroke="var(--a)" stroke-width="2"/>', 'A search intent translated into a clear, relevant result.'],
  'influencer-marketing': ['network', '<circle cx="307" cy="260" r="37"/><circle cx="196" cy="169" r="21"/><circle cx="421" cy="171" r="21"/><circle cx="191" cy="355" r="21"/><circle cx="426" cy="354" r="21"/><path d="m278 237-67-55m125 55 68-50m-126 95-70 61m126-61 77 61"/><path d="M293 313h28" stroke="var(--a)" stroke-width="3"/>', 'A small, accountable network around shared audience context.'],
  'copyright': ['authorship', '<path d="M184 142h211l52 52v226H184zM395 142v56h52"/><path d="M216 229h194M216 258h146M216 287h174M216 343h194M216 373h126"/><path d="M354 313c-29-26-81-20-81 18 0 39 52 45 81 18" stroke="var(--a)" stroke-width="3"/>', 'A clear record of work, authorship, and supporting material.'],
  'trademark': ['clearance', '<path d="M175 165h261M175 213h261M175 261h261M175 309h261M175 357h261"/><text x="194" y="199" class="row-word">NAME</text><text x="194" y="247" class="row-word">SCOPE</text><text x="194" y="295" class="row-word">CLASS</text><path d="M360 145v227" stroke="var(--a)" stroke-width="2"/><circle cx="360" cy="165" r="5" fill="var(--b)"/><circle cx="360" cy="309" r="5" fill="var(--a)"/>', 'A name reviewed against scope, use, and prior material.'],
  'brand-protection': ['archive', '<path d="M173 178h268v205H173zM196 157h222M216 136h183"/><path d="M202 216h210M202 246h164M202 276h186M202 325h99"/><rect x="359" y="301" width="52" height="60" fill="var(--a)" fill-opacity=".2"/><path d="M375 316h22M375 330h22M375 344h16"/>', 'An orderly archive for assets, owners, and approved uses.'],
  'licensing-support': ['agreement', '<path d="M190 137h194l54 54v238H190zM384 137v59h54"/><path d="M220 232h176M220 263h176M220 294h92M220 349h176M220 379h128"/><path d="M317 294h79" stroke="var(--a)" stroke-width="5"/><path d="M317 288v12" stroke="var(--b)" stroke-width="2"/>', 'A document scope made visible before a handoff.']
};

const escXml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);

export const serviceIllustrationId = (slug) => `service-${slug}`;
export const serviceIllustrationDescription = (slug) => plates[slug]?.[2] || 'A service-specific editorial illustration.';

export function buildServiceArtAtlas() {
  const ids = new Set();
  const definitions = services.map((service) => {
    const recipe = plates[service.slug];
    if (!recipe) throw new Error(`Missing service illustration: ${service.slug}`);
    ids.add(service.slug);
    const world = worlds.find((entry) => entry.id === service.world);
    const [accent, secondary] = palettes[service.world];
    const [family, motif, description] = recipe;
    const title = escXml(service.title.toUpperCase());
    const worldTitle = escXml(world.title.toUpperCase());
    return `<symbol id="${serviceIllustrationId(service.slug)}" viewBox="0 0 620 440" data-family="${family}">
      <rect width="620" height="440" fill="#141419"/>
      <path d="M26 35H594M26 405H594" stroke="#2A2930"/>
      <path d="M26 35v370M594 35v370" stroke="#2A2930" stroke-opacity=".65"/>
      <text x="42" y="62" fill="#A5A1A0" font-family="IBM Plex Mono, monospace" font-size="11" font-weight="500" letter-spacing="1.25">${world.number} / ${worldTitle}</text>
      <text x="578" y="62" text-anchor="end" fill="${accent}" font-family="IBM Plex Mono, monospace" font-size="11" font-weight="500" letter-spacing="1.25">FIELD STUDY</text>
      <g fill="none" stroke="#F3F0E8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="--a:${accent};--b:${secondary}">${motif}</g>
      <text x="42" y="386" fill="#F3F0E8" font-family="Space Grotesk, sans-serif" font-size="17" font-weight="500" letter-spacing=".3">${title}</text>
      <path d="M42 421h92" stroke="${accent}" stroke-width="2"/>
    </symbol>`;
  }).join('\n');
  if (ids.size !== 34) throw new Error(`Service art must contain 34 unique symbols; found ${ids.size}.`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 440" width="620" height="440" fill="none" aria-hidden="true"><style>.specimen,.row-word{fill:#F3F0E8;font-family:Space Grotesk,sans-serif;font-weight:500}.specimen{font-size:110px}.row-word{font-size:22px;letter-spacing:3px;fill:#A5A1A0}</style>\n${definitions}\n</svg>\n`;
}
