import Button from '../components/Button';

const ArticlePage = () => {
  const articles = [
    {
      title: 'The Art of Cero',
      category: 'TECHNIQUE',
      description: 'A comprehensive guide to understanding Grimmjow\'s devastating Cero techniques and their destructive potential in combat.',
    },
    {
      title: 'Unmatched Speed',
      category: 'ANALYSIS',
      description: 'Analyzing the speed feats that made Grimmjow one of the most formidable combatants in the Bleach universe.',
    },
    {
      title: 'Resurrection Power',
      category: 'ABILITY',
      description: 'Exploring the transformation and power amplification of Grimmjow\'s Pantera resurrection form.',
    },
    {
      title: 'Legendary Battles',
      category: 'HISTORY',
      description: 'In-depth breakdown of Grimmjow\'s most iconic battles and tactical strategies throughout his journey.',
    },
  ];

  const deepDives = [
    {
      title: 'The Espada System',
      category: 'HIERARCHY',
      description: 'Understanding the rankings and power structure that positioned Grimmjow as the 6th most powerful Arrancar.',
    },
    {
      title: 'Path to Strength',
      category: 'EVOLUTION',
      description: 'Tracing Grimmjow\'s evolution from a hollow to becoming one of the most fearsome Captains of Arrancar forces.',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="border-y-2 border-gray-900 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-600">
            Knowledge Base
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Grimmjow's Battle Chronicles
          </h1>
          <p className="mb-8 max-w-3xl text-base leading-7 text-gray-700">
            Explore in-depth articles about legendary battles, ability analysis, character development, and the power hierarchy of Hueco Mundo.
          </p>
          <Button to="/" variant="primary">Return Home</Button>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="border-y-2 border-gray-900 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Featured Articles
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Community Insights</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article, idx) => (
              <div key={idx} className="rounded-2xl border-2 border-gray-900 bg-gray-50 p-6">
                <div className="mb-4 h-24 rounded-lg border-2 border-dashed border-gray-400 bg-gray-100"></div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                  {article.category}
                </p>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{article.title}</h3>
                <p className="mb-4 text-sm text-gray-700">{article.description}</p>
                <Button variant="secondary" className="text-xs">Read More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="border-y-2 border-gray-900 px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Extended Analysis
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Deep Dives</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {deepDives.map((dive, idx) => (
              <div key={idx} className="rounded-2xl border-2 border-gray-900 bg-gray-50 p-8">
                <div className="mb-4 h-32 rounded-lg border-2 border-dashed border-gray-400 bg-gray-100"></div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                  {dive.category}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">{dive.title}</h3>
                <p className="mb-6 text-sm text-gray-700">{dive.description}</p>
                <Button variant="secondary" className="text-xs">Explore</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;