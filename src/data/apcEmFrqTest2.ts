import type { PracticeStep } from '../types/practice';

const img = (name: string) => `https://img.apstudy.net/ap/physics-c/br20/${name}`;

const frq = (
  id: string,
  title: string,
  topic: string,
  prompt: string,
  tags: string[],
  options: Partial<Pick<PracticeStep, 'image' | 'assets' | 'equations' | 'sampleAnswer'>> = {},
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
      sampleAnswer: '(A) $U = kQ^2/s \cdot (2 - 2/\sqrt{2})$ — sum pairwise potential energies for all 6 charge pairs. (B) By symmetry, horizontal components cancel; net $E$ points downward with magnitude $E = 4E_1\cos 45° = 4kQ/(s^2/2) \cdot (1/\sqrt{2}) = 4\sqrt{2}kQ/s^2$. (C) $V = 0$ at the center — the four charges sum to zero potential by symmetry. (D) The equipotential $V=0$ line is the horizontal midline of the square (where $r_1 = r_4$ and $r_2 = r_3$). (E) $W = -q(V_B - V_A) = -qV_B$ since $V_A = 0$. Compute $V_B$ from the four charges at the midpoint of the top side.',
      assets: [
        { id: 'em-frq2-q1-ans1', kind: 'source', src: img('Page_553_Image_0001.jpg'), alt: 'Q1 answer setup', downloadName: 'em-frq2-q1-answer-1.png' },
        { id: 'em-frq2-q1-ans2', kind: 'source', src: img('Page_553_Image_0002.jpg'), alt: 'Q1(A) potential energy', downloadName: 'em-frq2-q1-answer-2.png' },
        { id: 'em-frq2-q1-ans3', kind: 'source', src: img('Page_553_Image_0003.jpg'), alt: 'Q1(B) E field at center', downloadName: 'em-frq2-q1-answer-3.png' },
        { id: 'em-frq2-q1-ans4', kind: 'source', src: img('Page_553_Image_0004.jpg'), alt: 'Q1(B) E magnitude', downloadName: 'em-frq2-q1-answer-4.png' },
        { id: 'em-frq2-q1-ans5', kind: 'source', src: img('Page_553_Image_0005.jpg'), alt: 'Q1(C) V=0 at center', downloadName: 'em-frq2-q1-answer-5.png' },
        { id: 'em-frq2-q1-ans6', kind: 'source', src: img('Page_554_Image_0001.jpg'), alt: 'Q1(D) equipotential line', downloadName: 'em-frq2-q1-answer-6.png' },
        { id: 'em-frq2-q1-ans7', kind: 'source', src: img('Page_554_Image_0003.jpg'), alt: 'Q1(E) work formula', downloadName: 'em-frq2-q1-answer-7.png' },
        { id: 'em-frq2-q1-ans8', kind: 'source', src: img('Page_554_Image_0005.jpg'), alt: 'Q1(E) final work', downloadName: 'em-frq2-q1-answer-8.png' },
      ],
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
      sampleAnswer: '(A) $C = \varepsilon_0 A/d = \varepsilon_0 Lw/d$. (B) E field points downward (from positive top plate to negative bottom plate). (C) Force on electron points upward (opposite to E, since electron is negative). (D) Using kinematics: $\Delta y = d/2 = \frac{1}{2}(eE/m)(L/v_0)^2$, so $E = mdv_0^2/(eL^2)$. (E) $\Delta V = Ed = md^2v_0^2/(eL^2)$, so $Q = C\Delta V = \varepsilon_0 Lw/d \cdot md^2v_0^2/(eL^2) = \varepsilon_0 wmdv_0^2/(eL)$. (F) $U = \frac{1}{2}C(\Delta V)^2 = \frac{1}{2}(\varepsilon_0 Lw/d)(md^2v_0^2/(eL^2))^2 = \varepsilon_0 wm^2d^3v_0^4/(2e^2L^3)$.',
      assets: [
        { id: 'em-frq2-q2-electron', kind: 'source', src: img('Page_382_Image_0002.jpg'), alt: 'Electron trajectory between plates', downloadName: 'em-frq2-q2-electron-path.png' },
        { id: 'em-frq2-q2-ans1', kind: 'source', src: img('Page_554_Image_0006.jpg'), alt: 'Q2(B)(C) field and force vectors', downloadName: 'em-frq2-q2-answer-1.png' },
        { id: 'em-frq2-q2-ans2', kind: 'source', src: img('Page_554_Image_0007.jpg'), alt: 'Q2(D) kinematics setup', downloadName: 'em-frq2-q2-answer-2.png' },
        { id: 'em-frq2-q2-ans3', kind: 'source', src: img('Page_555_Image_0001.jpg'), alt: 'Q2(D) E field result', downloadName: 'em-frq2-q2-answer-3.png' },
        { id: 'em-frq2-q2-ans4', kind: 'source', src: img('Page_555_Image_0002.jpg'), alt: 'Q2(E) potential difference', downloadName: 'em-frq2-q2-answer-4.png' },
        { id: 'em-frq2-q2-ans5', kind: 'source', src: img('Page_555_Image_0003.jpg'), alt: 'Q2(E) charge Q', downloadName: 'em-frq2-q2-answer-5.png' },
        { id: 'em-frq2-q2-ans6', kind: 'source', src: img('Page_555_Image_0004.jpg'), alt: 'Q2(F) stored energy', downloadName: 'em-frq2-q2-answer-6.png' },
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
      sampleAnswer: '(A) Inside ($r < a$): $E = 0$ (conductor). Outside ($r \geq a$): $E = kQ/r^2$ (behaves as point charge at center). (B) Inside ($r < a$): $V = kQ/a$ (constant, equal to surface value). Outside ($r \geq a$): $V = kQ/r$. (C) $E(r)$: zero for $r < a$, then drops as $1/r^2$ for $r > a$. $V(r)$: constant $kQ/a$ for $r < a$, then drops as $1/r$ for $r > a$. Both continuous at $r = a$.',
      assets: [
        { id: 'em-frq2-q3-ans1', kind: 'source', src: img('Page_555_Image_0005.jpg'), alt: 'Q3(A) E field piecewise', downloadName: 'em-frq2-q3-answer-1.png' },
        { id: 'em-frq2-q3-ans2', kind: 'source', src: img('Page_555_Image_0006.jpg'), alt: 'Q3(B) V piecewise', downloadName: 'em-frq2-q3-answer-2.png' },
        { id: 'em-frq2-q3-ans3', kind: 'source', src: img('Page_556_Image_0001.jpg'), alt: 'Q3(C) E and V sketches', downloadName: 'em-frq2-q3-answer-3.png' },
      ],
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
      sampleAnswer: '(A) Inside ($r < a$): $Q_{\text{enc}} = \int_0^r \rho_0(r\'/a)^3 \cdot 4\pi r\'^2 dr\' = \pi\rho_0 r^6/(3a^3)$. By Gauss\'s law: $E = \rho_0 r^4/(12\varepsilon_0 a^3)$. Outside ($r \geq a$): $Q_{\text{total}} = \pi\rho_0 a^3/3$, so $E = \rho_0 a^3/(12\varepsilon_0 r^2)$. (B) Inside: $V(r) = \frac{\rho_0 a^3}{12\varepsilon_0}\left(\frac{1}{a} - \frac{r^5}{5a^6} + \frac{1}{5r}\right)$ — integrate $-E$ from $\infty$. Outside: $V = \rho_0 a^3/(12\varepsilon_0 r)$. (C) $E(r)$: rises as $r^4$ from 0 to $a$, then drops as $1/r^2$. $V(r)$: decreases smoothly, continuous at $r = a$.',
      assets: [
        { id: 'em-frq2-q4-ans1', kind: 'source', src: img('Page_556_Image_0002.jpg'), alt: 'Q4(A) charge integration', downloadName: 'em-frq2-q4-answer-1.png' },
        { id: 'em-frq2-q4-ans2', kind: 'source', src: img('Page_556_Image_0003.jpg'), alt: 'Q4(A) Gauss law inside', downloadName: 'em-frq2-q4-answer-2.png' },
        { id: 'em-frq2-q4-ans3', kind: 'source', src: img('Page_557_Image_0001.jpg'), alt: 'Q4(A) total charge', downloadName: 'em-frq2-q4-answer-3.png' },
        { id: 'em-frq2-q4-ans4', kind: 'source', src: img('Page_557_Image_0002.jpg'), alt: 'Q4(A) E outside', downloadName: 'em-frq2-q4-answer-4.png' },
        { id: 'em-frq2-q4-ans5', kind: 'source', src: img('Page_557_Image_0003.jpg'), alt: 'Q4(A) E summary', downloadName: 'em-frq2-q4-answer-5.png' },
        { id: 'em-frq2-q4-ans6', kind: 'source', src: img('Page_558_Image_0001.jpg'), alt: 'Q4(B) V inside', downloadName: 'em-frq2-q4-answer-6.png' },
        { id: 'em-frq2-q4-ans7', kind: 'source', src: img('Page_558_Image_0002.jpg'), alt: 'Q4(B) V outside', downloadName: 'em-frq2-q4-answer-7.png' },
        { id: 'em-frq2-q4-ans8', kind: 'source', src: img('Page_558_Image_0003.jpg'), alt: 'Q4(B) V summary', downloadName: 'em-frq2-q4-answer-8.png' },
        { id: 'em-frq2-q4-ans9', kind: 'source', src: img('Page_559_Image_0001.jpg'), alt: 'Q4(C) E and V sketches', downloadName: 'em-frq2-q4-answer-9.png' },
      ],
    },
  ),
];
