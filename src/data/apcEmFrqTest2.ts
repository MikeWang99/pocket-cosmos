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
  source: `AP Physics C: E&M FRQ Test 2 — ${title}`,
  answerNudge: 'Show all work: state the law or principle, write the relevant equation, substitute, and solve. Include units.',
  criteria: [],
  ...options,
});

export const apcEmFrq2Meta = {
  title: 'Electric Potential and Capacitance · FRQ Practice',
  subtitle: 'Free-response practice on potential energy, electric potential, capacitance, and potential from charge distributions.',
  eyebrow: 'AP Physics C: Electricity and Magnetism',
  description:
    'Four free-response questions covering electrical potential energy of charge arrays, electric potential and equipotential surfaces, parallel-plate capacitors with electron trajectories, and potential from conducting and nonconducting charged spheres. Images are downloadable; question text is copyable.',
  sources: [
    {
      label: 'AP Study \u2014 AP Physics C: E&M FRQ Test 2',
      url: 'https://www.apstudy.net/ap/physics-c-electricity-and-magnetism/frq-test2.html',
    },
  ],
};

export const apcEmFrq2Steps: PracticeStep[] = [
  frq(
    'em-frq2-q1',
    'Charges on a Square — Potential and Energy',
    'Potential energy, electric potential, equipotential surface, work',
    `In the figure shown, all four charges are situated at the corners of a square with sides $s$.

**(A)** What is the total electrical potential energy of this array of fixed charges?

**(B)** What is the electric field at the center of the square?

**(C)** What is the electric potential at the center of the square?

**(D)** Sketch (on the diagram) the portion of the equipotential surface that lies in the plane of the figure and passes through the center of the square.

**(E)** How much work would the electric field perform on a charge $q$ as it moved from the midpoint of the right side of the square to the midpoint of the top of the square?`,
    ['electric potential energy', 'electric potential', 'equipotential', 'work by electric field'],
    {
      image: {
        src: img('Page_381_Image_0001.jpg'),
        alt: 'Four charges at corners of a square with sides s',
        caption: 'Four charges at corners of a square',
        role: 'diagram',
        downloadName: 'em-frq2-q1-diagram.png',
      },
    },
  ),
  frq(
    'em-frq2-q2',
    'Parallel-Plate Capacitor with Electron',
    'Capacitance, electric field, electron trajectory, stored energy',
    `The figure below shows a parallel-plate capacitor. Each rectangular plate has length $L$ and width $w$, and the plates are separated by a distance $d$.

**(A)** Determine the capacitance.

An electron (mass $m$, charge $-e$) is shot horizontally into the empty space between the plates, midway between them, with an initial velocity of magnitude $v_0$. The electron just barely misses hitting the end of the top plate as it exits. (Ignore gravity.)

**(B)** In the diagram, sketch the electric field vector at the position of the electron when it has traveled a horizontal distance of $L/2$.

**(C)** In the diagram, sketch the electric force vector on the electron at the same position as in part (b).

**(D)** Determine the strength of the electric field between the plates. Write your answer in terms of $L$, $d$, $m$, $e$, and $v_0$.

**(E)** Determine the charge on the top plate.

**(F)** How much potential energy is stored in the capacitor?`,
    ['capacitance', 'parallel-plate capacitor', 'electron deflection', 'stored energy'],
    {
      image: {
        src: img('Page_382_Image_0001.jpg'),
        alt: 'Parallel-plate capacitor with dimensions L, d',
        caption: 'Parallel-plate capacitor',
        role: 'diagram',
        downloadName: 'em-frq2-q2-capacitor.png',
      },
      assets: [
        {
          id: 'em-frq2-q2-electron',
          kind: 'source',
          src: img('Page_382_Image_0002.jpg'),
          alt: 'Electron trajectory between plates',
          downloadName: 'em-frq2-q2-electron-path.png',
        },
      ],
    },
  ),
  frq(
    'em-frq2-q3',
    'Conducting Sphere — E(r) and V(r)',
    'Electric field and potential of a conducting sphere, sketches',
    `A solid conducting sphere of radius $a$ carries an excess charge of $Q$.

**(A)** Determine the electric field magnitude, $E(r)$, as a function of $r$, the distance from the sphere's center.

**(B)** Determine the potential, $V(r)$, as a function of $r$. Take the zero of potential at $r = \\infty$.

**(C)** On the diagrams below, sketch $E(r)$ and $V(r)$. (Cover at least the range $0 < r < 2a$.)`,
    ['conducting sphere', 'electric field', 'electric potential', 'Gauss\u2019s law', 'sketch'],
    {
      image: {
        src: img('Page_383_Image_0001.jpg'),
        alt: 'Conducting sphere with E(r) and V(r) graph axes',
        caption: 'Conducting sphere and graph axes',
        role: 'diagram',
        downloadName: 'em-frq2-q3-diagram.png',
      },
    },
  ),
  frq(
    'em-frq2-q4',
    'Nonconducting Sphere with ρ(r) = ρ₀(r/a)³',
    'Electric field and potential from non-uniform charge, sketches',
    `A solid, nonconducting sphere of radius $a$ has a volume charge density given by the equation $\\rho(r) = \\rho_0 (r/a)^3$, where $r$ is the distance from the sphere's center.

**(A)** Determine the electric field magnitude, $E(r)$, as a function of $r$.

**(B)** Determine the potential, $V(r)$, as a function of $r$. Take the zero of potential at $r = \\infty$.

**(C)** On the diagrams below, sketch $E(r)$ and $V(r)$. Be sure to indicate on the vertical axis in each plot the value at $r = a$.`,
    ['nonconducting sphere', 'volume charge density', 'electric field', 'electric potential', 'Gauss\u2019s law', 'sketch'],
    {
      image: {
        src: img('Page_384_Image_0001.jpg'),
        alt: 'Nonconducting sphere with E(r) and V(r) graph axes',
        caption: 'Nonconducting sphere and graph axes',
        role: 'diagram',
        downloadName: 'em-frq2-q4-diagram.png',
      },
    },
  ),
];
