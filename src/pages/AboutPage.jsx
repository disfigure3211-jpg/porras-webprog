import Button from '../components/Button';
import grimmjowImage from '../assets/grimmjow3.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-600">
            About Section
          </p>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="rounded-xl bg-slate-50 p-6 shadow-lg">
              <img
                src={grimmjowImage}
                alt="Grimmjow Jaegerjaquez"
                className="mx-auto h-80 w-full max-w-xl rounded-xl object-contain transition duration-500 hover:scale-105 hover:-translate-y-1"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                The Espada's True Power
              </h1>
              <p className="text-base leading-7 text-gray-700">
                Grimmjow Jaegerjaquez, the 6th Espada, stands as a symbol of Hueco Mundo's most formidable warriors. With his unprecedented speed and devastating Cero techniques, he represents the pinnacle of Arrancar evolution and raw combat prowess.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button to="/" variant="primary">
                  Return Home
                </Button>
                <Button to="/articles" variant="secondary">View Articles</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Attributes */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Character Profile
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Key Attributes</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 'Espada #6', label: 'Rank' },
              { value: 'Hueco Mundo', label: 'Origin' },
              { value: 'Pantera', label: 'Zanpakuto' },
              { value: 'Cero Mastery', label: 'Specialty' },
            ].map((attr, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-6 shadow-sm">
                <p className="text-2xl font-bold text-gray-900">{attr.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                  {attr.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Background */}
      <section className="bg-white px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-wider text-gray-600">
            Story & Background
          </p>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Journey to Power</h2>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {[
              {
                title: 'Resurrection Form',
                description: 'Upon resurrection, Grimmjow undergoes a dramatic transformation that amplifies his already formidable abilities. His feline features become more pronounced, and his Cero attacks reach catastrophic levels of destructive power.',
              },
              {
                title: 'Combat Philosophy',
                description: 'Grimmjow embraces a warrior\'s code, constantly seeking challenges to test his limits. His straightforward approach and love for direct combat showcase a predator\'s instinct merged with an Arrancar\'s intellect.',
              },
              {
                title: 'Legacy & Impact',
                description: 'As one of the most legendary Espadas, Grimmjow\'s influence extends far beyond Hueco Mundo. His battles became tales whispered in the corridors of the Soul Society.',
              },
            ].map((story, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-gray-900">{story.title}</h3>
                <p className="text-sm text-gray-700 leading-6">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;