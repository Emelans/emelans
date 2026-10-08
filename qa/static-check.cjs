const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const script = fs.readFileSync(path.join(root,'script.js'),'utf8');
const checks = [];
function check(name, run) { run(); checks.push(name); }
check('Local assets exist', () => {
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const file=match[1];
    if (!/^(?:https?:|mailto:|#)/.test(file)) assert.ok(fs.existsSync(path.join(root,file)),file);
  }
});
check('Anchor destinations and unique IDs', () => {
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
  for(const m of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(m[1]),m[1]);
});
check('Verified contact and preserved domain', () => {
  assert.equal(fs.readFileSync(path.join(root,'CNAME'),'utf8').trim(),'emelans.com');
  const addresses=[...html.matchAll(/mailto:([^"]+)"/g)].map(m=>m[1]);
  assert.ok(addresses.length>=2);
  assert.ok(addresses.every(a=>a==='emiryucelyucel27@hotmail.com'));
});
check('Approved MOK poses and accessible branding', () => {
  for (const pose of ['wave','peek','jump']) {
    assert.ok(html.includes(`assets/brand/mok/emelans-mok-${pose}-v1.png`));
  }
  assert.ok(!html.includes('brand-mark'));
  assert.ok(html.includes('mok-icon-32.png'));
  assert.ok(html.includes('mok-icon-180.png'));
  assert.equal([...html.matchAll(/class="sr-only">Emelans</g)].length,2);
});
class Element {
  constructor(attrs={},value='') {
    this.attrs={...attrs}; this.textContent=value; this.dataset={}; this.handlers={}; this.children=[];
    this.classes=new Set((attrs.class||'').split(' ').filter(Boolean));
    this.classList={add:(...xs)=>xs.forEach(x=>this.classes.add(x)),remove:(...xs)=>xs.forEach(x=>this.classes.delete(x)),contains:x=>this.classes.has(x),toggle:(x,force)=>{const on=force===undefined?!this.classes.has(x):force;if(on)this.classes.add(x);else this.classes.delete(x);return on;}};
    this.style={setProperty(){}};
    for(const [key,val] of Object.entries(attrs)) if(key.startsWith('data-')) this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=val;
    this.alt=attrs.alt; this.content=attrs.content; this.id=attrs.id;
  }
  setAttribute(key,val){this.attrs[key]=String(val);}
  getAttribute(key){return this.attrs[key]??null;}
  addEventListener(type,fn){(this.handlers[type]??=[]).push(fn);}
  fire(type,extra={}){for(const fn of this.handlers[type]||[])fn({target:this,...extra});}
  click(){this.fire('click');}
  replaceChildren(...children){this.children=children;}
  append(child){this.children.push(child);}
  focus(){this.owner.activeElement=this;}
  showModal(){this.open=true;}
  close(){this.open=false;this.fire('close');}
  getBoundingClientRect(){return {left:0,right:800,top:0,bottom:800};}
}
const nodes=[];
for(const match of html.matchAll(/<([a-z][a-z0-9-]*)([^>]*)>/gi)) {
  const attrs={};
  for(const a of match[2].matchAll(/([a-z][a-z0-9-]*)="([^"]*)"/gi)) attrs[a[1]]=a[2];
  const rest=html.slice(match.index+match[0].length);
  const end=rest.indexOf('</'+match[1]+'>');
  nodes.push(new Element(attrs, end<0?'':rest.slice(0,end).replace(/<[^>]*>/g,'').trim()));
}
const byId=id=>nodes.find(n=>n.id===id);
const byClass=name=>nodes.find(n=>n.classes.has(name));
const body=new Element(), documentElement=new Element();
const doc=new Element();
doc.body=body;doc.documentElement=documentElement;doc.hidden=false;
doc.title='Emelans — Independent Mobile Game Studio';
doc.querySelector=selector=>{
  if(selector==='.header-inner .wordmark')return byClass('wordmark');
  if(selector.startsWith('meta[')){const [,key,value]=selector.match(/\[([^=]+)="([^"]+)"\]/);return nodes.find(n=>n.attrs[key]===value);}
  if(selector.startsWith('.'))return byClass(selector.slice(1));
  throw new Error('Unsupported test selector: '+selector);
};
doc.querySelectorAll=selector=>{
  if(selector.startsWith('[data-')){const key=selector.slice(1,-1);return nodes.filter(n=>key in n.attrs);}
  if(selector==='.reveal,.animated-scene')return nodes.filter(n=>n.classes.has('reveal')||n.classes.has('animated-scene'));
  if(selector==='.animated-scene')return nodes.filter(n=>n.classes.has('animated-scene'));
  throw new Error('Unsupported test selector: '+selector);
};
doc.getElementById=byId;
doc.createElement=()=>{const n=new Element();n.owner=doc;return n;};
doc.createDocumentFragment=()=>new Element();
nodes.forEach(n=>n.owner=doc);
byId('navigation').querySelectorAll=()=>[new Element(),new Element(),new Element()];
let throwStorage=false;
const storage=new Map();
const media=new Map();
const ctx={document:doc,localStorage:{getItem:key=>{if(throwStorage)throw new Error('storage unavailable');return storage.get(key)||null;},setItem:(key,val)=>{if(throwStorage)throw new Error('storage unavailable');storage.set(key,val);}},matchMedia:query=>{if(!media.has(query)){const m=new Element();m.matches=false;media.set(query,m);}return media.get(query);},IntersectionObserver:class{observe(){}unobserve(){}},setTimeout:()=>1,clearTimeout(){},location:{href:''},Date,Math};
ctx.window=ctx;
vm.createContext(ctx);
check('Script initializes without missing nodes',()=>vm.runInContext(script,ctx));
check('All Turkish translations present',()=>{
  byId('language-toggle').click();
  assert.equal(documentElement.lang,'tr');
  for(const node of doc.querySelectorAll('[data-i18n]'))assert.ok(node.textContent.trim(),node.dataset.i18n);
  for(const node of doc.querySelectorAll('[data-i18n-aria]'))assert.ok(node.getAttribute('aria-label'),node.dataset.i18nAria);
  for(const node of doc.querySelectorAll('[data-i18n-alt]'))assert.ok(node.alt,node.dataset.i18nAlt);
  assert.equal(byId('hero-title').attrs.id,'hero-title');
});
check('Language round trip and preference',()=>{
  byId('language-toggle').click();
  assert.equal(doc.querySelectorAll('[data-i18n]').find(n=>n.dataset.i18n==='heroLine1').textContent,'Made for');
  assert.equal(storage.get('emelans-language'),'en');
});
check('Mobile navigation and Escape',()=>{
  byClass('menu-toggle').click();
  assert.equal(byClass('menu-toggle').getAttribute('aria-expanded'),'true');
  doc.fire('keydown',{key:'Escape'});
  assert.equal(byClass('menu-toggle').getAttribute('aria-expanded'),'false');
});
check('Project dialog opens, closes, and returns focus',()=>{
  byId('project-open').click();
  assert.equal(byId('project-dialog').open,true);
  byId('project-close').click();
  assert.equal(byId('project-dialog').open,false);
  assert.equal(doc.activeElement.id,'project-open');
});
check('System reduced motion without a manual toggle',()=>{
  assert.equal(byId('motion-toggle'),undefined);
  const m=media.get('(prefers-reduced-motion: reduce)');m.matches=true;m.fire('change');
  assert.equal(body.dataset.motion,'off');
  m.matches=false;m.fire('change');
  assert.equal(body.dataset.motion,'on');
});
check('Cancelled project and childish decoration removed',()=>{
  assert.ok(!/Astronaut Zero|joy-button|confetti|orbital-flower|motion-toggle/.test(html));
  const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
  assert.ok(!/infinite/.test(css));
  assert.ok(nodes.filter(n=>n.classes.has('wordmark')).every(n=>n.textContent.trim()==='Emelans'));
});
check('Social buttons honest and inactive without accounts',()=>{
  assert.equal([...html.matchAll(/<button[^>]*disabled[^>]*class="social-button"/g)].length,3);
  assert.ok(!/href="https:\/\/(?:www\.)?(?:instagram|youtube|x)\.com/.test(html));
  assert.equal(byClass('social-caption').textContent,'Follow Emelans');
  assert.ok(!/coming soon|GitHub|independent|Project I|contact-address|language-globe/i.test(html));
});
check('Dineit named consistently and image follows language',()=>{
  assert.equal(byClass('project-name').textContent,'Dineit');
  assert.equal(byId('dialog-title').textContent,'Dineit');
  const shot=doc.querySelectorAll('[data-image-en]')[0];
  assert.equal(shot.src,'assets/images/restaurant-phone-en.png');
  byId('language-toggle').click();
  assert.equal(shot.src,'assets/images/restaurant-phone.png');
  byId('language-toggle').click();
  assert.equal(shot.src,'assets/images/restaurant-phone-en.png');
});
check('Blocked storage does not break interactions',()=>{
  throwStorage=true;byId('language-toggle').click();throwStorage=false;
});
console.log(JSON.stringify({passed:true,type:'Static and simulated DOM (NOT real browser)',checks},null,2));
