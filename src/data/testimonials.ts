/**
 * Buyer feedback published with customer permission, summarised in our own
 * words (not quoted). Do not add Review/AggregateRating schema for it
 * (self-serving reviews are not eligible for Google review snippets).
 */
export type Testimonial = {
  summary: string;
  name: string;
  role: string;
  country: string;
  scope: string;
};

export const testimonials: Testimonial[] = [
  {
    summary:
      'Buys MTU 2000 and 4000 series spare parts from our team under a supply contract. The feedback focused on delivery dates and part quality matching the contract terms, and on continuing the supply relationship over the next years.',
    name: 'Ramazan',
    role: 'Fleet operator',
    country: 'Turkey',
    scope: 'MTU 2000 and 4000 marine spare parts under supply contract',
  },
  {
    summary:
      'Has sourced MTU marine diesel engine spare parts through our team for commercial vessels since 2019. Fast delivery, original parts, and after-sales support were named as the reasons for keeping us as a supplier.',
    name: 'David Joe',
    role: 'Marine engineer',
    country: 'Malaysia',
    scope: 'MTU marine diesel engine spare parts since 2019',
  },
  {
    summary:
      'A long-time buyer of MTU spare parts who now orders exclusively through us. He highlighted original parts, reliable delivery times, and a straightforward working relationship.',
    name: 'Luis López Palancar',
    role: 'Manager',
    country: 'Spain',
    scope: 'Repeat MTU spare-parts orders',
  },
];

/** Named sales contact shown on contact/about pages. */
export const salesContact = {
  name: 'Leo',
  role: 'export sales for MTU and diesel engine parts',
  languages: 'English and Chinese',
};
