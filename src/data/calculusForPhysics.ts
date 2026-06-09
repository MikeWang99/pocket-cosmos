import type { PracticeStep } from '../types/practice';

export const calculusForPhysicsMeta = {
  title: 'Calculus for Physics',
  subtitle: 'Diagnostic ladder for AP Physics C: Mechanics readiness.',
  eyebrow: 'AP Physics C Mechanics Readiness',
  description:
    'Move from function sense and graph meaning into derivatives, integrals, work, impulse, center of mass, and simple harmonic motion. Each prompt is framed as a simplified real-world physics model.',
  sources: [],
};

export const calculusForPhysicsSteps: PracticeStep[] = [
  {
    id: 'cfp-01-dolphin-video',
    title: 'Dolphin Tracking From Video',
    context:
      'A marine biologist tracks a dolphin swimming toward a floating marker. Video analysis gives x = 0 m, 3 m, 8 m, and 15 m at t = 0 s, 1 s, 2 s, and 3 s.',
    prompt:
      'a. Find the average horizontal velocity from 0 s to 3 s. b. Estimate the instantaneous velocity at 2 s using nearby data, and explain your method. c. Decide whether the dolphin is speeding up, slowing down, or moving at constant speed.',
    maxScore: 4,
    source: 'Level 1 - Function, Units, and Graph Sense',
    answerNudge:
      'Average velocity uses total change over total time. For the 2 s estimate, use a central difference from the nearby points.',
    criteria: [
      {
        id: 'cfp-01-average',
        label: 'Computes average velocity as 5 m/s.',
        point: '1',
        keywords: ['5 m/s', '5m/s', '(15-0)/3', '15/3'],
        feedback: 'Use average velocity = change in position divided by elapsed time.',
      },
      {
        id: 'cfp-01-instant-method',
        label: 'Uses a nearby-data or central-difference estimate at 2 s.',
        point: '2',
        keywords: ['central difference', 'nearby', 'x3 - x1', '(15-3)/2', 'slope'],
        feedback: 'Estimate the instantaneous velocity using the slope through points close to t = 2 s.',
      },
      {
        id: 'cfp-01-instant-value',
        label: 'Estimates instantaneous velocity near 2 s as 6 m/s.',
        point: '3',
        keywords: ['6 m/s', '6m/s', '12/2'],
        feedback: 'The central estimate is (15 m - 3 m) / (3 s - 1 s) = 6 m/s.',
      },
      {
        id: 'cfp-01-speeding',
        label: 'Concludes the dolphin is speeding up from interval velocities.',
        point: '4',
        keywords: ['speeding up', 'increasing', '3 m/s', '5 m/s', '7 m/s'],
        feedback: 'Compare interval velocities from each one-second segment.',
      },
    ],
  },
  {
    id: 'cfp-02-dolphin-leap',
    title: 'Dolphin Leap Model',
    context:
      'A dolphin jumps out of the water. A simplified projectile model gives y(t) = 0.6 + 5.8t - 4.9t^2, where y is height in meters and t is time in seconds.',
    prompt:
      'a. State the units of 0.6, 5.8, and 4.9. b. Without taking a derivative, explain what the negative -4.9t^2 term says about the motion. c. Identify the real physical effect behind the number 4.9.',
    maxScore: 4,
    source: 'Level 1 - Function, Units, and Graph Sense',
    answerNudge:
      'Every term in the height equation must have units of meters. The quadratic term controls how the height curve bends.',
    criteria: [
      {
        id: 'cfp-02-units-height',
        label: 'Identifies 0.6 as meters.',
        point: '1',
        keywords: ['0.6 m', '0.6 meters', 'meters'],
        anyKeywords: ['0.6', 'initial height'],
        feedback: 'The constant term is already a height, so its units are meters.',
      },
      {
        id: 'cfp-02-units-speed',
        label: 'Identifies 5.8 as m/s.',
        point: '2',
        keywords: ['m/s', 'meters per second'],
        anyKeywords: ['5.8', 'initial velocity', 'linear term'],
        feedback: 'The coefficient of t must be meters per second so 5.8t is measured in meters.',
      },
      {
        id: 'cfp-02-units-accel',
        label: 'Identifies 4.9 as m/s^2.',
        point: '3',
        keywords: ['m/s^2', 'm/s2', 'meters per second squared'],
        anyKeywords: ['4.9', 'quadratic', 't^2'],
        feedback: 'The coefficient of t^2 must be meters per second squared.',
      },
      {
        id: 'cfp-02-gravity',
        label: 'Connects the negative quadratic term to downward gravity.',
        point: '4',
        keywords: ['gravity', 'g/2', 'half of g', '9.8', 'downward', 'bends downward'],
        feedback: 'The -4.9t^2 term comes from -1/2 gt^2, so gravity reduces upward velocity.',
      },
    ],
  },
  {
    id: 'cfp-03-hummingbird',
    title: 'Hummingbird Motion Along a Feeder Line',
    context:
      'A hummingbird flies along a straight feeder line with velocity v(t) = 0.60 - 0.20t m/s for 0 <= t <= 5 s. Positive velocity means toward the feeder.',
    prompt:
      'a. Find when the hummingbird momentarily stops. b. Decide whether displacement from 0 s to 5 s is positive, negative, or zero using signed area. c. Explain whether total distance equals the magnitude of displacement.',
    maxScore: 4,
    source: 'Level 1 - Function, Units, and Graph Sense',
    answerNudge:
      'The bird changes direction when v crosses zero. Displacement is signed area; distance counts both directions as positive travel.',
    criteria: [
      {
        id: 'cfp-03-stop',
        label: 'Finds the stopping time t = 3 s.',
        point: '1',
        keywords: ['3 s', '3s', 't=3', '0.60/0.20'],
        feedback: 'Set v(t) = 0 and solve 0.60 - 0.20t = 0.',
      },
      {
        id: 'cfp-03-positive-area',
        label: 'Uses positive signed area before 3 s.',
        point: '2',
        keywords: ['0.90', '0.9', 'positive triangle', 'area from 0 to 3'],
        feedback: 'The positive triangular area from 0 to 3 s is 0.90 m.',
      },
      {
        id: 'cfp-03-negative-area',
        label: 'Uses negative signed area after 3 s.',
        point: '3',
        keywords: ['-0.40', '-0.4', 'negative triangle', 'area from 3 to 5'],
        feedback: 'The triangular area after the turnaround is negative because velocity is negative.',
      },
      {
        id: 'cfp-03-distance',
        label: 'Distinguishes total distance from displacement.',
        point: '4',
        keywords: ['distance', 'displacement', '1.30', '1.3', '0.50', '0.5', 'changes direction'],
        feedback: 'Distance is 0.90 m + 0.40 m, while displacement is only 0.50 m.',
      },
    ],
  },
  {
    id: 'cfp-04-camera-slider',
    title: 'Programmed Camera Slider',
    context:
      'A camera slider filming a slow-motion experiment is programmed with x(t) = 2t^3 - 9t^2 + 12t centimeters for 0 <= t <= 4 s.',
    prompt:
      'a. Find v(t). b. Find a(t). c. Find all rest times between 0 s and 4 s. d. At t = 1 s, decide whether the slider is speeding up or slowing down, and explain the special case.',
    maxScore: 4,
    source: 'Level 2 - Basic Calculus Operations',
    answerNudge:
      'Velocity is dx/dt and acceleration is dv/dt. For the last part, signs of v and a matter, but v = 0 at exactly t = 1 s.',
    criteria: [
      {
        id: 'cfp-04-velocity',
        label: 'Differentiates position to get v(t) = 6t^2 - 18t + 12.',
        point: '1',
        keywords: ['6t^2 - 18t + 12', '6 t^2 - 18 t + 12', 'dx/dt'],
        feedback: 'Differentiate the position function term by term.',
      },
      {
        id: 'cfp-04-acceleration',
        label: 'Differentiates velocity to get a(t) = 12t - 18.',
        point: '2',
        keywords: ['12t - 18', '12 t - 18', 'dv/dt'],
        feedback: 'Acceleration is the derivative of velocity.',
      },
      {
        id: 'cfp-04-rest',
        label: 'Solves v(t) = 0 and finds t = 1 s and t = 2 s.',
        point: '3',
        keywords: ['t=1', 't = 1', '1 s', 't=2', 't = 2', '2 s'],
        feedback: 'Set 6t^2 - 18t + 12 = 0 and factor it.',
      },
      {
        id: 'cfp-04-signs',
        label: 'Explains the t = 1 s sign nuance.',
        point: '4',
        keywords: ['v = 0', 'not well-defined', 'special', 'just before', 'just after', 'sign'],
        feedback: 'At exactly t = 1 s the speed is zero, so discuss the behavior just before and just after.',
      },
    ],
  },
  {
    id: 'cfp-05-elevator',
    title: 'Elevator Starting Smoothly',
    context:
      'An elevator begins moving upward with acceleration a(t) = 1.2 - 0.4t m/s^2. At t = 0, v(0) = 0.5 m/s upward and y(0) = 0.8 m.',
    prompt:
      'a. Find v(t). b. Find y(t). c. Find the elevator displacement from 0 s to 3 s.',
    maxScore: 4,
    source: 'Level 2 - Basic Calculus Operations',
    answerNudge:
      'Integrate acceleration to get velocity, then integrate velocity to get position. Use the initial conditions to find constants.',
    criteria: [
      {
        id: 'cfp-05-v-integral',
        label: 'Integrates acceleration to find v(t).',
        point: '1',
        keywords: ['1.2t', '-0.2t^2', 'integral'],
        anyKeywords: ['v(t)', 'velocity'],
        feedback: 'Integrating 1.2 - 0.4t gives 1.2t - 0.2t^2 plus a constant.',
      },
      {
        id: 'cfp-05-v-initial',
        label: 'Uses v(0) = 0.5 in the velocity function.',
        point: '2',
        keywords: ['0.5 + 1.2t - 0.2t^2', '0.5+1.2t-0.2t^2'],
        feedback: 'The initial velocity supplies the constant term in v(t).',
      },
      {
        id: 'cfp-05-position',
        label: 'Integrates velocity and uses y(0) = 0.8.',
        point: '3',
        keywords: ['0.8', '0.5t', '0.6t^2', 't^3/15', 'position'],
        feedback: 'Integrate v(t) and include the initial position constant.',
      },
      {
        id: 'cfp-05-displacement',
        label: 'Finds displacement from 0 s to 3 s as 5.1 m.',
        point: '4',
        keywords: ['5.1 m', '5.1m', 'delta y', 'displacement'],
        feedback: 'Evaluate y(3) - y(0), not just y(3).',
      },
    ],
  },
  {
    id: 'cfp-06-ebike',
    title: 'Regenerative Braking in an Electric Bike',
    context:
      'An electric bike slows down using regenerative braking. The bike kinetic energy is K = (1/2)mv^2, where m is constant and v changes with time.',
    prompt:
      'a. Use calculus to find dK/dt in terms of m, v, and dv/dt. b. If F_net = m dv/dt, rewrite dK/dt using F_net. c. Explain what dK/dt means physically and what sign you expect during braking.',
    maxScore: 4,
    source: 'Level 2 - Basic Calculus Operations',
    answerNudge:
      'Use the chain rule: K depends on v, and v depends on t. The result is the net power in one-dimensional motion.',
    criteria: [
      {
        id: 'cfp-06-chain-rule',
        label: 'Applies the chain rule to K = (1/2)mv^2.',
        point: '1',
        keywords: ['chain rule', 'dv/dt', 'derivative'],
        feedback: 'K changes in time because v is a function of time.',
      },
      {
        id: 'cfp-06-dkdt',
        label: 'Gets dK/dt = mv dv/dt.',
        point: '2',
        keywords: ['mv dv/dt', 'm v dv/dt'],
        feedback: 'Differentiate v^2 with respect to time to get 2v dv/dt.',
      },
      {
        id: 'cfp-06-power',
        label: 'Rewrites dK/dt as F_net v.',
        point: '3',
        keywords: ['F_net v', 'Fnet v', 'force times velocity', 'power'],
        feedback: 'Substitute F_net = m dv/dt.',
      },
      {
        id: 'cfp-06-sign',
        label: 'Interprets dK/dt as negative during braking.',
        point: '4',
        keywords: ['negative', 'braking', 'losing kinetic energy', 'rate of change', 'power'],
        feedback: 'During braking, kinetic energy decreases, so dK/dt should be negative.',
      },
    ],
  },
  {
    id: 'cfp-07-toy-rocket',
    title: 'Toy Rocket With Ramping Acceleration',
    context:
      'A toy rocket is tested on a vertical guide rail. During the first short interval, its net upward acceleration is modeled as a(t) = bt, where b is positive. At t = 0, the rocket is at rest at x = 0.',
    prompt:
      'a. Find v(t). b. Find x(t). c. State the units of b. d. Explain why using x = x0 + v0t + (1/2)at^2 directly would be wrong here.',
    maxScore: 4,
    source: 'Level 3 - AP Physics C Mechanics Calculus',
    answerNudge:
      'Acceleration changes with time, so integrate it. The familiar constant-acceleration equation only works when a is constant.',
    criteria: [
      {
        id: 'cfp-07-velocity',
        label: 'Integrates a(t) = bt to get v(t) = (1/2)bt^2.',
        point: '1',
        keywords: ['1/2 bt^2', 'bt^2/2', '0.5bt^2'],
        feedback: 'Integrate acceleration with respect to time and use v(0) = 0.',
      },
      {
        id: 'cfp-07-position',
        label: 'Integrates velocity to get x(t) = (1/6)bt^3.',
        point: '2',
        keywords: ['1/6 bt^3', 'bt^3/6', 'x(t)'],
        feedback: 'Integrate the velocity expression and use x(0) = 0.',
      },
      {
        id: 'cfp-07-units',
        label: 'Finds units of b as m/s^3.',
        point: '3',
        keywords: ['m/s^3', 'm/s3', 'meters per second cubed'],
        feedback: 'Because bt has units of m/s^2, b must have units of m/s^3.',
      },
      {
        id: 'cfp-07-not-constant',
        label: 'Explains that constant-acceleration equations do not apply.',
        point: '4',
        keywords: ['constant acceleration', 'not constant', 'changes with time', 'variable acceleration'],
        feedback: 'The kinematics shortcut assumes a constant acceleration, but here a depends on t.',
      },
    ],
  },
  {
    id: 'cfp-08-magnetic-launcher',
    title: 'Magnetic Launcher Rail',
    context:
      'A small cart is pushed along a magnetic launcher rail. As it moves away from the strongest part of the magnet, the force decreases as F(x) = F0(1 - x/L) for 0 <= x <= L.',
    prompt:
      'a. Write the work integral from x = 0 to x = L. b. Evaluate it. c. Describe the F vs. x graph and explain how the graph confirms the result.',
    maxScore: 4,
    source: 'Level 3 - AP Physics C Mechanics Calculus',
    answerNudge:
      'Work by a position-dependent force is area under the F vs. x curve.',
    criteria: [
      {
        id: 'cfp-08-integral',
        label: 'Sets up W = integral F(x) dx from 0 to L.',
        point: '1',
        keywords: ['integral', '0 to L', 'F0(1 - x/L)', 'work'],
        feedback: 'For a variable force over distance, write W = integral from 0 to L of F(x) dx.',
      },
      {
        id: 'cfp-08-evaluation',
        label: 'Evaluates the work as (1/2)F0L.',
        point: '2',
        keywords: ['1/2 F0 L', 'F0L/2', '0.5F0L'],
        feedback: 'Integrate the linear force expression over the full rail length.',
      },
      {
        id: 'cfp-08-graph',
        label: 'Describes a line decreasing from F0 to 0.',
        point: '3',
        keywords: ['line', 'decreasing', 'F0 to 0', 'linear'],
        feedback: 'The graph should be a straight line from force F0 at x = 0 to zero at x = L.',
      },
      {
        id: 'cfp-08-area',
        label: 'Uses triangular area to confirm the answer.',
        point: '4',
        keywords: ['triangle', 'area', '1/2 base height', 'base L', 'height F0'],
        feedback: 'The area under the line is a triangle with base L and height F0.',
      },
    ],
  },
  {
    id: 'cfp-09-spring-launcher',
    title: 'Spring Launcher Force Sensor',
    context:
      'A spring-loaded launcher pushes a cart forward. A force sensor records F(t) = A t (T - t) for 0 <= t <= T, where the force is along +x.',
    prompt:
      'a. Write the impulse integral. b. Evaluate the impulse. c. If the cart has mass m and initial speed v0 in +x, find its final speed after launch.',
    maxScore: 4,
    source: 'Level 3 - AP Physics C Mechanics Calculus',
    answerNudge:
      'Impulse is area under the force-time curve, and impulse equals change in momentum.',
    criteria: [
      {
        id: 'cfp-09-integral',
        label: 'Sets up impulse as integral of F(t) dt from 0 to T.',
        point: '1',
        keywords: ['impulse', 'integral', '0 to T', 'A t (T - t)'],
        feedback: 'Write J = integral from 0 to T of A t (T - t) dt.',
      },
      {
        id: 'cfp-09-evaluate',
        label: 'Evaluates impulse as AT^3/6.',
        point: '2',
        keywords: ['AT^3/6', 'A T^3 / 6', 'T^3/6'],
        feedback: 'Expand Tt - t^2 and integrate term by term.',
      },
      {
        id: 'cfp-09-momentum',
        label: 'Uses impulse-momentum relation.',
        point: '3',
        keywords: ['change in momentum', 'delta p', 'J =', 'mvf', 'mv0'],
        feedback: 'Connect impulse to momentum change: J = m v_f - m v_0.',
      },
      {
        id: 'cfp-09-final-speed',
        label: 'Finds final speed v_f = v0 + AT^3/(6m).',
        point: '4',
        keywords: ['v0 + AT^3/(6m)', 'v0+AT^3/(6m)', 'AT^3/6m'],
        feedback: 'Solve the impulse-momentum equation for the final speed.',
      },
    ],
  },
  {
    id: 'cfp-10-subway',
    title: 'Subway Train Acceleration Profile',
    context:
      'A subway train starts from rest. Acceleration ramps linearly from 0 to a0 over 0 <= t <= T, then stays at a0 from T to 2T.',
    prompt:
      'a. Find change in velocity from 0 to 2T using area under the acceleration-time graph. b. Write a(t) piecewise. c. Integrate to find v(t) for 0 <= t <= T. d. Evaluate v(T) and compare with the area method.',
    maxScore: 4,
    source: 'Level 3 - AP Physics C Mechanics Calculus',
    answerNudge:
      'Velocity change is area under acceleration. The first interval is a triangle; the second is a rectangle.',
    criteria: [
      {
        id: 'cfp-10-area',
        label: 'Gets total velocity change as (3/2)a0T.',
        point: '1',
        keywords: ['3/2 a0 T', '1.5a0T', '(3/2)a0T'],
        feedback: 'Add the triangular area from 0 to T and rectangular area from T to 2T.',
      },
      {
        id: 'cfp-10-piecewise',
        label: 'Writes the piecewise acceleration model.',
        point: '2',
        keywords: ['a0/T', 'piecewise', 'a0', '0 <= t <= T', 'T <= t <= 2T'],
        feedback: 'The ramp is a(t) = (a0/T)t, then a(t) = a0.',
      },
      {
        id: 'cfp-10-integral',
        label: 'Integrates ramp acceleration to get v(t) = a0 t^2/(2T).',
        point: '3',
        keywords: ['a0 t^2/(2T)', 'a0/(2T)', 't^2', 'integral'],
        feedback: 'Integrate (a0/T)t with respect to time and use v(0) = 0.',
      },
      {
        id: 'cfp-10-check',
        label: 'Checks v(T) = a0T/2 against triangular area.',
        point: '4',
        keywords: ['a0T/2', '1/2 a0T', 'triangle', 'matches'],
        feedback: 'Substitute t = T into v(t) and compare it to the first triangular area.',
      },
    ],
  },
  {
    id: 'cfp-11-rod',
    title: 'Balance Point of a Nonuniform Rod',
    context:
      'A thin experimental rod lies from x = 0 to x = L. Extra material near the right end gives linear mass density lambda(x) = lambda0(1 + x/L).',
    prompt:
      'a. Write an integral for total mass M. b. Write an integral for center of mass x_cm. c. Evaluate x_cm. d. Explain whether x_cm is less than, equal to, or greater than L/2.',
    maxScore: 4,
    source: 'Level 4 - Extension / Full Mastery Check',
    answerNudge:
      'For a continuous mass distribution, total mass is integral dm, and center of mass is weighted position divided by total mass.',
    criteria: [
      {
        id: 'cfp-11-mass',
        label: 'Sets up or evaluates the total mass integral.',
        point: '1',
        keywords: ['integral', 'lambda0(1 + x/L)', '3/2 lambda0 L', 'mass'],
        feedback: 'Use M = integral from 0 to L of lambda(x) dx.',
      },
      {
        id: 'cfp-11-center-setup',
        label: 'Sets up x_cm as a weighted integral over mass.',
        point: '2',
        keywords: ['x_cm', '1/M', 'x lambda', 'weighted'],
        feedback: 'Use x_cm = (1/M) integral x lambda(x) dx.',
      },
      {
        id: 'cfp-11-value',
        label: 'Evaluates x_cm = 5L/9.',
        point: '3',
        keywords: ['5L/9', '5/9 L', '(5/9)L'],
        feedback: 'Evaluate both integrals and divide the first moment by total mass.',
      },
      {
        id: 'cfp-11-physical',
        label: 'Explains why x_cm is greater than L/2.',
        point: '4',
        keywords: ['greater than L/2', 'right end', 'denser', 'extra material'],
        feedback: 'Because density increases toward the right, the balance point shifts right of the midpoint.',
      },
    ],
  },
  {
    id: 'cfp-12-stabilizer',
    title: 'Phone Camera Stabilizer Spring',
    context:
      'A tiny mass inside a phone camera stabilizer is attached to a spring. When the phone shakes, the spring pulls the mass back toward equilibrium with F = -kx.',
    prompt:
      'a. Use Newton\'s second law to write a differential equation for x(t). b. If x(t) = A cos(omega t), substitute it and find omega. c. Explain why the negative sign in F = -kx matters for a stabilizer.',
    maxScore: 4,
    source: 'Level 4 - Extension / Full Mastery Check',
    answerNudge:
      'Newton connects force to the second derivative of position. The minus sign should make the force restoring.',
    criteria: [
      {
        id: 'cfp-12-diffeq',
        label: 'Writes m d2x/dt2 = -kx or equivalent.',
        point: '1',
        keywords: ['m d2x/dt2 = -kx', 'm x"', '-kx', 'd^2x/dt^2'],
        feedback: 'Apply Newton\'s second law to the spring force.',
      },
      {
        id: 'cfp-12-substitute',
        label: 'Substitutes x = A cos(omega t) and its second derivative.',
        point: '2',
        keywords: ['-omega^2', 'cos', 'second derivative', 'substitute'],
        feedback: 'The second derivative of A cos(omega t) is -omega^2 A cos(omega t).',
      },
      {
        id: 'cfp-12-omega',
        label: 'Finds omega = sqrt(k/m).',
        point: '3',
        keywords: ['sqrt(k/m)', 'omega', 'k/m'],
        feedback: 'Cancel x and solve omega^2 = k/m.',
      },
      {
        id: 'cfp-12-restoring',
        label: 'Interprets the negative sign as restoring force.',
        point: '4',
        keywords: ['restoring', 'opposite displacement', 'equilibrium', 'negative sign', 'stabilizer'],
        feedback: 'The spring force points opposite displacement, pulling the mass back toward equilibrium.',
      },
    ],
  },
];
