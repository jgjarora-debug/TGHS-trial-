const fs = require('fs');
const html = fs.readFileSync('../stitch_components/stitch_tghs_enterprise_ats/tghs_ats_candidate_management/code.html', 'utf8');

const match = html.match(/tailwind\.config=(\{.*?\});<\/script>/s);
if (match) {
  let configContent = match[1];
  const config = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  ...(${configContent})
};
`;
  fs.writeFileSync('tailwind.config.js', config);
  console.log('Tailwind config updated correctly.');
} else {
  console.log('No tailwind config found in HTML.');
}
