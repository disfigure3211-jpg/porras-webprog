import Button from '../components/Button';
import grimmjowHero from '../assets/grimmjow2.jpg';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-600">
            Hero Section
          </p>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                Grimmjow Jaegerjaquez
              </h1>
              <p className="text-base leading-7 text-slate-600">
                Discover the legendary Espada known for unmatched speed and devastating Cero techniques. Explore the journey of one of Bleach's most formidable warriors and the bonds that define his path.
              </p>
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>

            <div className="rounded-xl bg-slate-50 p-6 shadow-lg">
              <img
                src={grimmjowHero}
                alt="Grimmjow"
                className="mx-auto h-80 w-full max-w-xl rounded-xl object-contain transition duration-500 hover:scale-105 hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Power Statistics
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Combat Strength</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '99', label: 'Attack Power' },
              { value: '95', label: 'Speed' },
              { value: '97', label: 'Spiritual Power' },
              { value: '92', label: 'Technique' },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-6 shadow-sm">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Featured Content
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Explore Key Topics</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Ultimate Form',
                description: 'Witness the raw power of complete transformation, unleashing devastating Cero attacks that reshape the battlefield.',
              },
              {
                title: 'Battle Tactics',
                description: 'Master the art of combat through superior speed and devastating spiritual pressure in strategic encounters.',
              },
              {
                title: 'Zanpakuto Mastery',
                description: 'Explore the full spectrum of Pantera abilities and signature moves that define true strength.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 h-24 rounded-lg bg-slate-100"></div>
                <h3 className="mb-3 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="mb-4 text-sm text-gray-700">{feature.description}</p>
                <Button to="/notfound" variant="secondary" className="text-xs">Read More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;