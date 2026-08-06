import type { PracticeStep } from '../types/practice';

const img = (name: string) => `https://img.apstudy.net/ap/physics-c/br20/${name}`;

const frq = (
  id: string,
  title: string,
  topic: string,
  prompt: string,
  tags: string[],
  options: Partial<Pick<PracticeStep, 'image' | 'assets' | 'equations'>> = {},
): PracticeStep => ({
  id,
  mode: 'free_response',
  title,
  context: `Topic: ${topic}.`,
  prompt,
  tags,
  maxScore: 10,
  source: `AP Physics C: E&M FRQ Test 1 — ${title}`,
  answerNudge: 'Show all work: state the law or principle, write the relevant equation, substitute, and solve. Include units.',
  criteria: [],
  ...options,
});

export const apcEmFrq1Meta = {
  title: 'Electric Forces and Fields · FRQ Practice',
  subtitle: 'Free-response practice on Coulomb\u2019s law, electric fields, Gauss\u2019s law, and charge distributions.',
  eyebrow: 'AP Physics C: Electricity and Magnetism',
  description:
    'Five free-response questions covering electric forces between point charges, electric field superposition, Gauss\u2019s law with conducting shells, fields from continuous charge distributions, and non-uniform volume charge densities. Images are downloadable; question text is copyable.',
  sources: [
    {
      label: 'AP Study \u2014 AP Physics C: E&M FRQ Test 1',
      url: 'https://www.apstudy.net/ap/physics-c-electricity-and-magnetism/frq-test1.html',
    },
  ],
};

export const apcEmFrq1Steps: PracticeStep[] = [
  frq(
    'em-frq1-q1',
    'Four Charges on a Square',
    'Coulomb\u2019s law, equilibrium, electric field at center',
    `In the figure shown, all four charges ($+Q$, $+Q$, $-q$, and $-q$) are situated at the corners of a square. The net electric force on each charge $+Q$ is zero.

**(A)** Express the magnitude of $q$ in terms of $Q$.

**(B)** Is the net electric force on each charge $-q$ also equal to zero? Justify your answer.

**(C)** Determine the electric field at the center of the square.`,
    ['Coulomb\u2019s law', 'superposition', 'equilibrium', 'symmetry'],
    {
      image: {
        src: img('Page_341_Image_0001.jpg'),
        alt: 'Four charges at corners of a square: +Q, +Q, -q, -q',
        caption: 'Four charges at the corners of a square',
        role: 'diagram',
        downloadName: 'em-frq1-q1-diagram.png',
      },
    },
  ),
  frq(
    'em-frq1-q2',
    'Two Charges on the y-Axis',
    'Electric force, electric field, zero-field points, acceleration',
    `Two charges, $+Q$ and $+2Q$, are fixed in place along the $y$-axis of an $x$-$y$ coordinate system as shown in the figure below. Charge 1 is at the point $(0, a)$, and Charge 2 is at the point $(0, -2a)$.

**(A)** Find the electric force (magnitude and direction) felt by Charge 1 due to Charge 2.

**(B)** Find the electric field (magnitude and direction) at the origin created by both Charges 1 and 2.

**(C)** Is there a point on the $x$-axis where the total electric field is zero? If so, where? If not, explain briefly.

**(D)** Is there a point on the $y$-axis where the total electric field is zero? If so, where? If not, explain briefly.

**(E)** If a small negative charge, $-q$, of mass $m$ were placed at the origin, determine its initial acceleration (magnitude and direction).`,
    ['Coulomb\u2019s law', 'electric field', 'superposition', 'zero-field point', 'acceleration'],
    {
      image: {
        src: img('Page_341_Image_0002.jpg'),
        alt: 'Two charges on the y-axis: +Q at (0,a) and +2Q at (0,-2a)',
        caption: 'Two charges fixed on the y-axis',
        role: 'diagram',
        downloadName: 'em-frq1-q2-diagram.png',
      },
    },
  ),
  frq(
    'em-frq1-q3',
    'Concentric Conducting Spherical Shells',
    'Gauss\u2019s law, charge distribution on conductors',
    `A conducting spherical shell of inner radius $a$ and outer radius $b$ is inside (and concentric with) a larger conducting spherical shell of inner radius $c$ and outer radius $d$. The inner shell carries a net charge of $+2q$, and the outer shell has a net charge of $+3q$.

**(A)** Determine the electric field for
(i) $r < a$
(ii) $a < r < b$
(iii) $b < r < c$
(iv) $c < r < d$
(v) $r > d$

**(B)** Show in the figure the charges that reside on or inside each of the two shells.`,
    ['Gauss\u2019s law', 'conductors', 'spherical symmetry', 'charge distribution'],
    {
      image: {
        src: img('Page_342_Image_0001.jpg'),
        alt: 'Concentric conducting spherical shells with radii a, b, c, d',
        caption: 'Concentric conducting spherical shells',
        role: 'diagram',
        downloadName: 'em-frq1-q3-diagram.png',
      },
    },
  ),
  frq(
    'em-frq1-q4',
    'Charged Nonconducting Rod',
    'Gauss\u2019s law approximation, finite rod field',
    `A positively charged, thin nonconducting rod of length $\\ell$ lies along the $y$-axis with its midpoint at the origin. The linear charge density within the rod is uniform and denoted by $\\lambda$. Points $P_1$ and $P_2$ lie on the positive $x$-axis, at distances $x_1$ and $x_2$, respectively from the rod.

**(A)** Use Gauss's law to approximate the electric field at point $P_1$, given that $x_1$ is very small compared to $\\ell$. Write your answer in terms of $\\lambda$, $x_1$, and fundamental constants.

**(B)** What is the total charge $Q$ on the rod?

**(C)** Compute the electric field at point $P_2$, given that $x_2$ is not small compared to $\\ell$. For $x_2 = \\ell$, write your answer in terms of $Q$, $\\ell$, and fundamental constants. You may use the fact that:

$$\\int \\frac{dx}{(x^2 + a^2)^{3/2}} = \\frac{x}{a^2\\sqrt{x^2+a^2}}$$`,
    ['Gauss\u2019s law', 'continuous charge distribution', 'linear charge density', 'integration'],
    {
      image: {
        src: img('Page_343_Image_0001.jpg'),
        alt: 'Charged rod along y-axis with points P1 and P2 on x-axis',
        caption: 'Charged rod and field points',
        role: 'diagram',
        downloadName: 'em-frq1-q4-diagram.png',
      },
      assets: [
        {
          id: 'em-frq1-q4-formula',
          kind: 'source',
          src: img('Page_343_Image_0002.jpg'),
          alt: 'Integration formula hint',
          downloadName: 'em-frq1-q4-formula.png',
        },
      ],
    },
  ),
  frq(
    'em-frq1-q5',
    'Glass Sphere with Non-Uniform Charge Density',
    'Gauss\u2019s law, volume charge density, E-field sketch',
    `A solid glass sphere of radius $a$ contains excess charge distributed throughout its volume such that the volume charge density depends on the distance $r$ from the sphere's center according to the equation:

$$\\rho(r) = \\rho_s \\frac{r}{a}$$

where $\\rho_s$ is a constant.

**(A)** What are the units of $\\rho_s$?

**(B)** Compute the total charge $Q$ on the sphere.

**(C)** Determine the magnitude of the electric field for
(i) $r < a$
(ii) $r \\geq a$
Write your answers to both (i) and (ii) in terms of $Q$, $a$, $r$, and fundamental constants.

**(D)** Sketch the electric field magnitude $E$ as a function of $r$ on the graph below. Be sure to indicate on the vertical axis the value of $E$ at $r = a$.`,
    ['Gauss\u2019s law', 'volume charge density', 'spherical symmetry', 'E-field sketch'],
    {
      image: {
        src: img('Page_344_Image_0001.jpg'),
        alt: 'Glass sphere with charge density and E vs r graph',
        caption: 'Charged sphere and graph axes for E(r)',
        role: 'diagram',
        downloadName: 'em-frq1-q5-diagram.png',
      },
    },
  ),
];
