const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

const fonts = `
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
`;

indexHtml = indexHtml.replace('</head>', fonts + '</head>');
fs.writeFileSync('index.html', indexHtml);
console.log('Fonts added to index.html');
