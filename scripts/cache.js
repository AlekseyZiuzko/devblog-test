const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function postsData() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map(file => {
    const slug = file.replace('.md', '');
    const markdonWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');

    const { data: frontmatter } = matter(markdonWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync('cache');
} catch {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/data.js', postsData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts Cached...');
});
