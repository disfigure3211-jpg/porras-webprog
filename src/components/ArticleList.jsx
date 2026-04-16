import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ cards, articles }) => {
  const items = cards || articles;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const isFight = item.type === 'fight';

        return (
          <article key={isFight ? `fight-${index}` : item.name} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              )}
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {isFight ? item.subtitle.toUpperCase() : `Article ${String(index + 1).padStart(2, '0')}`}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {isFight ? item.description : `${item.content[0].substring(0, 150)}...`}
            </p>
            {isFight ? (
              <Button to={`/fights/${item.slug}`} className="mt-4">Read More</Button>
            ) : (
              <Button to={`/articles/${item.name}`} className="mt-4">Read More</Button>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;