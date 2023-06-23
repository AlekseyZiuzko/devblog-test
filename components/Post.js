import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';

export default function Post({
  slug,
  frontmatter: { cover_image, date, category, title, excerpt, author_image, author },
  compact,
}) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image src={cover_image} height={420} width={600} alt="" className="mb-4 rounded" />
      )}
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{date}</span>
        <CategoryLabel>{category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${slug}`} className="text-2xl text-gray-700 font-bold hover:underline">
          {title}
        </Link>
        <p className="mt-2 text-gray-600">{excerpt}</p>
      </div>
      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${slug}`} className="text-gray-900 hover:text-blue-600">
            Read More
          </Link>
          <div className="flex items-center">
            <img
              src={author_image}
              alt={author}
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="text-gray-700 font-bold">{author}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
