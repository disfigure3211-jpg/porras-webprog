import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200 mb-8">
            <div className="h-24 w-24 border-2 border-zinc-300 bg-zinc-100" />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] border-2 border-zinc-900 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Grimmjow's Notable Fights
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900">Legendary battles worth revisiting</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  fight: 'Ichigo Kurosaki',
                  highlight: 'Soul Society showdown',
                  details: 'A brutal clash of speed and spirit energy that defined Grimmjow’s rivalry with Ichigo.',
                },
                {
                  fight: 'Kenpachi Zaraki',
                  highlight: 'Raw power collision',
                  details: 'A devastating fight where Grimmjow tested his limits against Kenpachi’s overwhelming strength.',
                },
                {
                  fight: 'Nnoitra Gilga',
                  highlight: 'Arrancar supremacy',
                  details: 'A tactical duel in Hueco Mundo that showed Grimmjow’s cunning and ferocity in battle.',
                },
                {
                  fight: 'Ulquiorra Schiffer',
                  highlight: 'Pantera vs. Segunda',
                  details: 'A high-stakes encounter highlighting Grimmjow’s resilience and explosive Cero techniques.',
                },
              ].map((item, index) => (
                <div key={index} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {item.highlight}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-zinc-900">{item.fight}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;