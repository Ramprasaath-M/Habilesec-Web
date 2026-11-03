import fs from 'node:fs/promises';
const source = JSON.parse(await fs.readFile(new URL('../content/rebuild.json',import.meta.url),'utf8'));
const interactive = {
  company: { email: source.company.email },
  categories: source.categories.map(({slug,name,description})=>({slug,name,description})),
  practices: source.practices.map(({slug,name,label})=>({slug,name,label})),
  products: source.products.map(({slug,name,label,description,features})=>({slug,name,label,description,features})),
  industries: source.industries.map(({slug,name,description,challenges})=>({slug,name,description,challenges})),
  quotes: source.quotes
};
await fs.writeFile(new URL('../content/rebuild-interactive.json',import.meta.url),JSON.stringify(interactive,null,2)+'\n');
console.log('Refreshed lightweight interaction content; article bodies remain server-only.');
