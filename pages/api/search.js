/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === 'production') {
    posts = require('../../cache/data').posts;
  } else {
    const files = fs.readdirSync(path.join('posts'));

    posts = files.map(file => {
      const slug = file.replace('.md', '');
      const markdonWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');

      const { data: frontmatter } = matter(markdonWithMeta);

      return {
        slug,
        frontmatter,
      };
    });
  }

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1,
  );

  res.status(200).json(JSON.stringify(results));
};
