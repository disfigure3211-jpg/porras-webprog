import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import adjuchaImg from '../assets/adjucha.jpg';
import cerograbImg from '../assets/cerograb.jpg';
import granrayceroImg from '../assets/granraycero.jpg';
import grimmvsshinjiImg from '../assets/grimmvsshinji.jpg';
import showdownImg from '../assets/showdown.jpg';

const notableFights = [
  {
    slug: 'grimmjow-vs-ichigo',
    title: 'Grimmjow vs Ichigo',
    subtitle: 'Soul Society Showdown',
    image: cerograbImg,
    description: 'An intense clash between Grimmjow and Ichigo in the Soul Society, showcasing raw power and determination as they clash with devastating spirit energy.',
    fullContent: [
      'The confrontation between Grimmjow and Ichigo in the Soul Society stands as one of the most intense battles of the series. When Grimmjow arrived in the Soul Society, he immediately sought out Ichigo, recognizing a kindred spirit of immense power.',
      'Throughout their clash, both warriors pushed each other to their limits. Grimmjow\'s masterful use of Cero techniques combined with his incredible speed created a barrage of attacks that tested Ichigo\'s reflexes and spiritual power.',
      'This battle became the foundation of their rivalry, establishing mutual respect between the two and setting the stage for their future encounters. The raw energy and determination displayed by both fighters resonated throughout the Soul Society, leaving a lasting impact on all who witnessed it.',
    ]
  },
  {
    slug: 'grimmjow-vs-shinji',
    title: 'Grimmjow vs Shinji',
    subtitle: 'Arrancar Dominance',
    image: grimmvsshinjiImg,
    description: 'A fierce battle where Grimmjow demonstrated his superiority against Shinji, proving his position among the Espada with aggressive tactics.',
    fullContent: [
      'When Grimmjow faced off against Shinji, it was a demonstration of sheer Arrancar dominance. Grimmjow\'s battle IQ and combat prowess were on full display as he methodically dissected Shinji\'s techniques.',
      'The fight showcased Grimmjow\'s tactical superiority and his ability to adapt to different combat styles. His aggressive assault was relentless, overwhelming Shinji with a combination of speed, power, and strategic maneuvering.',
      'This victory was crucial in establishing Grimmjow\'s reputation among the Espada ranks. It proved that his rise to the 6th seat was no accident, but rather earned through raw talent and combat prowess unmatched by many.',
    ]
  },
  {
    slug: 'first-arrival',
    title: 'First Arrival',
    subtitle: 'Hueco Mundo Entry',
    image: granrayceroImg,
    description: 'Grimmjow\'s introduction to the Soul Society, marked by destructive power and an immediate challenge to the established hierarchy.',
    fullContent: [
      'Grimmjow\'s first appearance in the Soul Society was nothing short of catastrophic. He arrived with overwhelming power, effortlessly defeating numerous Soul Reapers and establishing himself as a major threat.',
      'His arrival sent shockwaves through the spiritual realm. The sheer destructive power he displayed upon entry made it clear that a new era was beginning, one where the balance of power would be fundamentally challenged.',
      'From that moment forward, Grimmjow became a focal point of conflict. His presence forced the Soul Society to adapt and ultimately led to one of the most pivotal storylines in the series.',
    ]
  },
  {
    slug: 'becoming-an-arrancar',
    title: 'Becoming an Arrancar',
    subtitle: 'From Adjucha to Espada',
    image: adjuchaImg,
    description: 'The transformation of Grimmjow from a powerful Adjucha Hollow to a full-fledged Arrancar, gaining immense strength and status in Hueco Mundo.',
    fullContent: [
      'The process of Grimmjow\'s transformation into an Arrancar represents a pivotal moment in his journey. As an Adjucha, he was already formidable, but the removal of his mask unlocked extraordinary power within him.',
      'This metamorphosis wasn\'t just physical; it fundamentally altered his capabilities and standing within Hueco Mundo. The Arrancar form granted him access to abilities that far surpassed his previous incarnation, including the devastating Pantera resurrection.',
      'Becoming an Arrancar marked Grimmjow\'s ascension to a position of significance. It was through this transformation that he climbed the ranks to become the 6th Espada, earning his place among the most powerful beings in the spiritual realm.',
    ]
  },
  {
    slug: 'rivalry-born',
    title: 'Rivalry Born',
    subtitle: 'Ichigo Connection',
    image: showdownImg,
    description: 'The beginning of Grimmjow\'s intense rivalry with Ichigo, rooted in respect for his power and a constant desire to test their strength against each other.',
    fullContent: [
      'When Grimmjow first encountered Ichigo, something extraordinary happened. Despite being enemies, Grimmjow recognized in Ichigo a warrior spirit that matched his own. This recognition birthed an obsession that would define much of their relationship.',
      'Unlike typical antagonistic relationships, Grimmjow\'s rivalry with Ichigo was built on genuine respect. He saw in Ichigo a worthy opponent, someone whose power and determination were worthy of exploration and challenge.',
      'This rivalry transcended the typical hero-villain dynamic. It became a driving force for both characters, pushing them to continuously test their limits against each other. The mutual desire to see who truly stood supreme became the foundation of their complex relationship.',
    ]
  },
];

const ArticleListPage = () => {
  const cards = notableFights.map((fight) => ({ type: 'fight', ...fight }));

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Grimmjow Highlights
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Notable Grimmjow fights and moments
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Explore the most important battles and moments from Grimmjow’s story, presented in a clean, focused grid.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Grimmjow Moments
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Key fights and moments</h2>
        </div>
        <ArticleList cards={cards} />
      </section>
    </div>
  );
};

export default ArticleListPage;