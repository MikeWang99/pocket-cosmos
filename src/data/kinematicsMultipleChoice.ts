import type { PracticeStep } from '../types/practice';

export const kinematicsMultipleChoiceMeta = {
  "title": "AP Physics C Mechanics: Kinematics MC",
  "subtitle": "Multiple-choice practice from the kinematics revision bank.",
  "eyebrow": "AP Physics C Mechanics",
  "description": "Work through the full kinematics multiple-choice set. Each item gives immediate scoring, the correct answer, and a compact solution explanation.",
  "sources": [
    {
      "label": "Kinematics revision bank",
      "url": "https://pocket-cosmos.com"
    }
  ]
};

export const kinematicsMultipleChoiceSteps: PracticeStep[] = [
  {
    "id": "apc_kinematics_mc_001",
    "mode": "multiple_choice",
    "title": "Question 1",
    "prompt": "An object slides off a roof $10\\,\\mathrm{m}$ above the ground with an initial horizontal speed of $5\\,\\mathrm{m/s}$, as shown. The time between the object's leaving the roof and hitting the ground is most nearly:",
    "context": "Topic: Horizontal projectile / free fall time. Difficulty: basic. Tags: projectile_motion, free_fall, independent_motion.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_001_roof.png",
      "alt": "A ball leaves a 10 m roof horizontally at 5 m/s.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q1",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$\\frac{1}{2}\\,\\mathrm{s}$"
      },
      {
        "label": "B",
        "text": "$\\frac{1}{\\sqrt{2}}\\,\\mathrm{s}$"
      },
      {
        "label": "C",
        "text": "$\\sqrt{2}\\,\\mathrm{s}$"
      },
      {
        "label": "D",
        "text": "$2\\,\\mathrm{s}$"
      },
      {
        "label": "E",
        "text": "$5\\sqrt{2}\\,\\mathrm{s}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "Use vertical motion only: $10=\\frac12gt^2\\approx5t^2$, so $t=\\sqrt2\\,\\mathrm{s}$."
  },
  {
    "id": "apc_kinematics_mc_002",
    "mode": "multiple_choice",
    "title": "Question 2",
    "prompt": "Which of the following is true at time $t=20\\,\\mathrm{s}$?",
    "context": "At time $t=0$, car X traveling with speed $v_0$ passes car Y, which is just starting to move. Both cars then travel in two parallel lanes of the same straight road. The graph shows speed $v$ versus time $t$ for both cars.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_002_003_vt_graph.png",
      "alt": "Speed-time graph for cars X and Y.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q2",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Car Y is behind car X."
      },
      {
        "label": "B",
        "text": "Car Y is passing car X."
      },
      {
        "label": "C",
        "text": "Car Y is in front of car X."
      },
      {
        "label": "D",
        "text": "Both cars have the same acceleration."
      },
      {
        "label": "E",
        "text": "Car X is accelerating faster than car Y."
      }
    ],
    "correctAnswer": "A",
    "solution": "Position is area under the $v$-$t$ graph. From $0$ to $20\\,\\mathrm{s}$, car X's rectangular area is larger than car Y's triangular area."
  },
  {
    "id": "apc_kinematics_mc_003",
    "mode": "multiple_choice",
    "title": "Question 3",
    "prompt": "From time $t=0$ to $t=40\\,\\mathrm{s}$, the areas under both curves are equal. Therefore, which of the following is true at time $t=40\\,\\mathrm{s}$?",
    "context": "Use the same car X and car Y speed-time graph.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_002_003_vt_graph.png",
      "alt": "Speed-time graph for cars X and Y.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q3",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Car Y is behind car X."
      },
      {
        "label": "B",
        "text": "Car Y is passing car X."
      },
      {
        "label": "C",
        "text": "Car Y is in front of car X."
      },
      {
        "label": "D",
        "text": "Both cars have the same acceleration."
      },
      {
        "label": "E",
        "text": "Car X is accelerating faster than car Y."
      }
    ],
    "correctAnswer": "B",
    "solution": "Equal areas mean equal displacement from the same starting position, so car Y has caught car X at $t=40\\,\\mathrm{s}$."
  },
  {
    "id": "apc_kinematics_mc_004",
    "mode": "multiple_choice",
    "title": "Question 4",
    "prompt": "A body moving in the positive $x$ direction passes the origin at time $t=0$. Between $t=0$ and $t=1\\,\\mathrm{s}$, the body has a constant speed of $24\\,\\mathrm{m/s}$. At $t=1\\,\\mathrm{s}$, the body is given a constant acceleration of $6\\,\\mathrm{m/s^2}$ in the negative $x$ direction. The position $x$ of the body at $t=11\\,\\mathrm{s}$ is:",
    "context": "Topic: Piecewise one-dimensional motion. Difficulty: core. Tags: constant_acceleration, piecewise_motion, sign_convention.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q4",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$+99\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$+36\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$-36\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$-75\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$-99\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "First second: $\\Delta x=24\\,\\mathrm{m}$. Next $10\\,\\mathrm{s}$: $\\Delta x=24(10)+\\frac12(-6)(10)^2=-60\\,\\mathrm{m}$. Total: $-36\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_005",
    "mode": "multiple_choice",
    "title": "Question 5",
    "prompt": "Which of the following pairs of graphs shows the distance traveled versus time and the speed versus time for an object uniformly accelerated from rest?",
    "context": "Topic: Graph matching for uniformly accelerated motion. Difficulty: basic. Tags: motion_graphs, constant_acceleration, from_rest.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_005_graph_choices.png",
      "alt": "Graph choices A through E for distance-time and speed-time pairs.",
      "caption": "Graph choices A through E."
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q5",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Graph pair A"
      },
      {
        "label": "B",
        "text": "Graph pair B"
      },
      {
        "label": "C",
        "text": "Graph pair C"
      },
      {
        "label": "D",
        "text": "Graph pair D"
      },
      {
        "label": "E",
        "text": "Graph pair E"
      }
    ],
    "correctAnswer": "E",
    "solution": "For uniform acceleration from rest, $v=at$ is linear and $x=\\frac12at^2$ is concave up."
  },
  {
    "id": "apc_kinematics_mc_006",
    "mode": "multiple_choice",
    "title": "Question 6",
    "prompt": "An object released from rest at time $t=0$ slides down a frictionless incline a distance of $1\\,\\mathrm{m}$ during the first second. The distance traveled during the interval from $t=1\\,\\mathrm{s}$ to $t=2\\,\\mathrm{s}$ is:",
    "context": "Topic: Uniform acceleration distance intervals. Difficulty: basic. Tags: constant_acceleration, distance_intervals, from_rest.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q6",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$1\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$2\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$3\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$4\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$5\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "From rest with constant acceleration, $x\\propto t^2$. If $x(1)=1\\,\\mathrm{m}$, then $x(2)=4\\,\\mathrm{m}$, so the second-second distance is $3\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_007",
    "mode": "multiple_choice",
    "title": "Question 7",
    "prompt": "Two people are in a boat capable of a maximum speed of $5\\,\\mathrm{km/h}$ in still water and wish to cross a river $1\\,\\mathrm{km}$ wide to a point directly across from their starting point. If the river speed is $5\\,\\mathrm{km/h}$, how much time is required for the crossing?",
    "context": "Topic: Relative velocity / river crossing. Difficulty: core. Tags: relative_velocity, vectors, river_crossing.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q7",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$0.05\\,\\mathrm{hr}$"
      },
      {
        "label": "B",
        "text": "$0.1\\,\\mathrm{hr}$"
      },
      {
        "label": "C",
        "text": "$1\\,\\mathrm{hr}$"
      },
      {
        "label": "D",
        "text": "$10\\,\\mathrm{hr}$"
      },
      {
        "label": "E",
        "text": "The point directly across from the starting point cannot be reached under these conditions."
      }
    ],
    "correctAnswer": "E",
    "solution": "Canceling a $5\\,\\mathrm{km/h}$ current requires the entire boat speed, leaving no component across the river."
  },
  {
    "id": "apc_kinematics_mc_008",
    "mode": "multiple_choice",
    "title": "Question 8",
    "prompt": "Vectors $\\vec V_1$ and $\\vec V_2$ shown have equal magnitudes. The vectors represent the velocities of an object at times $t_1$ and $t_2$, respectively. The average acceleration of the object between $t_1$ and $t_2$ was:",
    "context": "Topic: Average acceleration as vector change. Difficulty: core. Tags: vectors, average_acceleration, velocity_change.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_008_velocity_vectors.png",
      "alt": "Velocity vector V1 points northeast at time t1; velocity vector V2 points north at time t2.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q8",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "zero"
      },
      {
        "label": "B",
        "text": "directed north"
      },
      {
        "label": "C",
        "text": "directed west"
      },
      {
        "label": "D",
        "text": "directed north of east"
      },
      {
        "label": "E",
        "text": "directed north of west"
      }
    ],
    "correctAnswer": "E",
    "solution": "Average acceleration points along $\\Delta\\vec v=\\vec V_2-\\vec V_1$, which points north of west."
  },
  {
    "id": "apc_kinematics_mc_009",
    "mode": "multiple_choice",
    "title": "Question 9",
    "prompt": "A projectile is fired from the surface of Earth with a speed of $200\\,\\mathrm{m/s}$ at an angle of $30^\\circ$ above the horizontal. If the ground is level, what is the maximum height reached by the projectile?",
    "context": "Topic: Projectile maximum height. Difficulty: basic. Tags: projectile_motion, maximum_height, vertical_component.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q9",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$5\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$10\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$500\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$1{,}000\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$2{,}000\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "$v_{0y}=200\\sin30^\\circ=100\\,\\mathrm{m/s}$, so $h=\\frac{v_{0y}^2}{2g}\\approx\\frac{100^2}{20}=500\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_010",
    "mode": "multiple_choice",
    "title": "Question 10",
    "prompt": "A particle moves along the $x$-axis with nonconstant acceleration $a=12t$, where $a$ is in $\\mathrm{m/s^2}$ and $t$ is in seconds. If the particle starts from rest so that $v=0$ and $x=0$ when $t=0$, where is it located when $t=2\\,\\mathrm{s}$?",
    "context": "Topic: Calculus kinematics from acceleration. Difficulty: core_plus. Tags: calculus_kinematics, integration, acceleration_function.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q10",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$x=12\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$x=16\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$x=24\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$x=32\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$x=48\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "B",
    "solution": "Integrate twice: $v=6t^2$ and $x=2t^3$. At $t=2\\,\\mathrm{s}$, $x=16\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_011",
    "mode": "multiple_choice",
    "title": "Question 11",
    "prompt": "The instantaneous acceleration of the object at $t=2\\,\\mathrm{s}$ is:",
    "context": "An object moving in a straight line has velocity $v=4+0.5t^2$, where $v$ is in $\\mathrm{m/s}$ and $t$ is in seconds.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q11",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$2\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "B",
        "text": "$4\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "C",
        "text": "$5\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "D",
        "text": "$6\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "E",
        "text": "$8\\,\\mathrm{m/s^2}$"
      }
    ],
    "correctAnswer": "A",
    "solution": "$a=dv/dt=t$, so at $t=2\\,\\mathrm{s}$, $a=2\\,\\mathrm{m/s^2}$."
  },
  {
    "id": "apc_kinematics_mc_012",
    "mode": "multiple_choice",
    "title": "Question 12",
    "prompt": "The displacement of the object between $t=0$ and $t=6\\,\\mathrm{s}$ is:",
    "context": "Use the same velocity function $v=4+0.5t^2$.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q12",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$22\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$28\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$40\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$42\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$60\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "E",
    "solution": "$\\Delta x=\\int_0^6(4+0.5t^2)dt=24+36=60\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_013",
    "mode": "multiple_choice",
    "title": "Question 13",
    "prompt": "A rock is dropped from the top of a $45\\,\\mathrm{m}$ tower, and at the same time a ball is thrown horizontally from the top. Air resistance is negligible. The ball and the rock hit level ground a distance of $30\\,\\mathrm{m}$ apart. The horizontal velocity of the ball was most nearly:",
    "context": "Topic: Horizontal projectile / independence of motion. Difficulty: core. Tags: projectile_motion, horizontal_launch, independent_motion.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q13",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$5\\,\\mathrm{m/s}$"
      },
      {
        "label": "B",
        "text": "$10\\,\\mathrm{m/s}$"
      },
      {
        "label": "C",
        "text": "$14.1\\,\\mathrm{m/s}$"
      },
      {
        "label": "D",
        "text": "$20\\,\\mathrm{m/s}$"
      },
      {
        "label": "E",
        "text": "$28.3\\,\\mathrm{m/s}$"
      }
    ],
    "correctAnswer": "B",
    "solution": "The fall time is $t=\\sqrt{2h/g}\\approx\\sqrt{90/10}=3\\,\\mathrm{s}$. Horizontal speed is $30/3=10\\,\\mathrm{m/s}$."
  },
  {
    "id": "apc_kinematics_mc_014",
    "mode": "multiple_choice",
    "title": "Question 14",
    "prompt": "In the absence of air friction, an object dropped near Earth's surface experiences a constant acceleration of about $9.8\\,\\mathrm{m/s^2}$. This means that the:",
    "context": "Topic: Meaning of gravitational acceleration. Difficulty: basic. Tags: free_fall, acceleration, conceptual.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q14",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "speed of the object increases $9.8\\,\\mathrm{m/s}$ during each second"
      },
      {
        "label": "B",
        "text": "speed of the object as it falls is $9.8\\,\\mathrm{m/s}$"
      },
      {
        "label": "C",
        "text": "object falls $9.8\\,\\mathrm{m}$ during each second"
      },
      {
        "label": "D",
        "text": "object falls $9.8\\,\\mathrm{m}$ during the first second only"
      },
      {
        "label": "E",
        "text": "derivative of distance with respect to time equals $9.8\\,\\mathrm{m/s^2}$"
      }
    ],
    "correctAnswer": "A",
    "solution": "Acceleration is rate of change of velocity, so speed changes by about $9.8\\,\\mathrm{m/s}$ each second."
  },
  {
    "id": "apc_kinematics_mc_015",
    "mode": "multiple_choice",
    "title": "Question 15",
    "prompt": "A $500\\,\\mathrm{kg}$ sports car accelerates uniformly from rest, reaching $30\\,\\mathrm{m/s}$ in $6\\,\\mathrm{s}$. During the $6\\,\\mathrm{s}$, the car has traveled a distance of:",
    "context": "Topic: Uniform acceleration distance. Difficulty: basic. Tags: constant_acceleration, average_velocity.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q15",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$15\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$30\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$60\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$90\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$180\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "D",
    "solution": "Average speed is $(0+30)/2=15\\,\\mathrm{m/s}$. Distance is $15\\times6=90\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_016",
    "mode": "multiple_choice",
    "title": "Question 16",
    "prompt": "At a particular instant, a stationary observer on the ground sees a package falling with speed $v_1$ at an angle to the vertical. To a pilot flying horizontally at constant speed relative to the ground, the package appears to be falling vertically with speed $v_2$ at that instant. What is the speed of the pilot relative to the ground?",
    "context": "Topic: Relative velocity in two dimensions. Difficulty: core_plus. Tags: relative_velocity, vectors, components.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q16",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$v_1+v_2$"
      },
      {
        "label": "B",
        "text": "$v_1-v_2$"
      },
      {
        "label": "C",
        "text": "$v_2-v_1$"
      },
      {
        "label": "D",
        "text": "$\\sqrt{v_1^2-v_2^2}$"
      },
      {
        "label": "E",
        "text": "$\\sqrt{v_1^2+v_2^2}$"
      }
    ],
    "correctAnswer": "D",
    "solution": "The pilot removes the package's horizontal velocity component. Since $v_1^2=v_x^2+v_2^2$, the pilot's speed is $v_x=\\sqrt{v_1^2-v_2^2}$."
  },
  {
    "id": "apc_kinematics_mc_017",
    "mode": "multiple_choice",
    "title": "Question 17",
    "prompt": "An object is shot vertically upward with a positive initial velocity. Which correctly describes the velocity and acceleration at maximum elevation?",
    "context": "Topic: Velocity and acceleration at top of vertical motion. Difficulty: core. Tags: vertical_motion, free_fall, misconception_check.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q17",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Velocity positive; acceleration positive"
      },
      {
        "label": "B",
        "text": "Velocity zero; acceleration zero"
      },
      {
        "label": "C",
        "text": "Velocity negative; acceleration negative"
      },
      {
        "label": "D",
        "text": "Velocity zero; acceleration negative"
      },
      {
        "label": "E",
        "text": "Velocity positive; acceleration negative"
      }
    ],
    "correctAnswer": "D",
    "solution": "At the top, instantaneous velocity is zero, but acceleration remains downward, i.e. negative if upward is positive."
  },
  {
    "id": "apc_kinematics_mc_018",
    "mode": "multiple_choice",
    "title": "Question 18",
    "prompt": "A spring-loaded gun can fire a projectile to height $h$ if fired straight up. If the same gun is pointed at an angle of $45^\\circ$ from the vertical, what maximum height can now be reached?",
    "context": "Topic: Projectile maximum height and components. Difficulty: core_plus. Tags: projectile_motion, components, maximum_height.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q18",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$h/4$"
      },
      {
        "label": "B",
        "text": "$\\frac{h}{2\\sqrt2}$"
      },
      {
        "label": "C",
        "text": "$h/2$"
      },
      {
        "label": "D",
        "text": "$\\frac{h}{\\sqrt2}$"
      },
      {
        "label": "E",
        "text": "$h$"
      }
    ],
    "correctAnswer": "C",
    "solution": "Height is proportional to the square of the vertical launch speed. The vertical component is $v/\\sqrt2$, so the height is $h/2$."
  },
  {
    "id": "apc_kinematics_mc_019",
    "mode": "multiple_choice",
    "title": "Question 19",
    "prompt": "A projectile's launch velocity has horizontal component $v_h$ and vertical component $v_v$. With negligible air resistance, when the projectile is at the highest point, which row gives vertical velocity, horizontal velocity, and vertical acceleration?",
    "context": "Topic: Projectile top-point components. Difficulty: core. Tags: projectile_motion, top_of_trajectory, components.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q19",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$v_v,\\ v_h,\\ 0$"
      },
      {
        "label": "B",
        "text": "$v_v,\\ 0,\\ 0$"
      },
      {
        "label": "C",
        "text": "$0,\\ v_h,\\ 0$"
      },
      {
        "label": "D",
        "text": "$0,\\ 0,\\ g$"
      },
      {
        "label": "E",
        "text": "$0,\\ v_h,\\ g$"
      }
    ],
    "correctAnswer": "E",
    "solution": "At the top, vertical velocity is zero, horizontal velocity remains $v_h$, and vertical acceleration is still downward with magnitude $g$."
  },
  {
    "id": "apc_kinematics_mc_020",
    "mode": "multiple_choice",
    "title": "Question 20",
    "prompt": "The graph shown gives velocity $v$ as a function of time $t$ for an object moving in a straight line. Which graph shows the corresponding displacement $x$ as a function of time $t$ over the same interval?",
    "context": "Topic: Velocity-time graph to displacement-time graph. Difficulty: core. Tags: velocity_time_graph, position_time_graph, graph_matching.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_020_vt_graph.png",
      "alt": "Input velocity-time graph for Q20.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q20",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Graph A"
      },
      {
        "label": "B",
        "text": "Graph B"
      },
      {
        "label": "C",
        "text": "Graph C"
      },
      {
        "label": "D",
        "text": "Graph D"
      },
      {
        "label": "E",
        "text": "Graph E"
      }
    ],
    "correctAnswer": "D",
    "solution": "The slope of $x(t)$ is $v(t)$. Positive velocity means $x$ increases; constant positive velocity gives a straight segment; decreasing positive velocity gives increasing $x$ with decreasing slope."
  },
  {
    "id": "apc_kinematics_mc_021",
    "mode": "multiple_choice",
    "title": "Question 21",
    "prompt": "A target $T$ lies flat on the ground $3\\,\\mathrm{m}$ from the side of a building that is $10\\,\\mathrm{m}$ tall, as shown. A student rolls a ball off the horizontal roof toward the target. Air resistance is negligible. The horizontal speed needed for the ball to strike the target is most nearly:",
    "context": "Topic: Horizontal projectile to target. Difficulty: core. Tags: projectile_motion, horizontal_launch, target.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_021_building_target.png",
      "alt": "A ball rolls horizontally off a 10 m building toward a target 3 m from the wall.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q21",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$3/10\\,\\mathrm{m/s}$"
      },
      {
        "label": "B",
        "text": "$\\sqrt2\\,\\mathrm{m/s}$"
      },
      {
        "label": "C",
        "text": "$\\frac{3}{\\sqrt2}\\,\\mathrm{m/s}$"
      },
      {
        "label": "D",
        "text": "$3\\,\\mathrm{m/s}$"
      },
      {
        "label": "E",
        "text": "$10\\sqrt{\\frac{5}{3}}\\,\\mathrm{m/s}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "The fall time is $t=\\sqrt{2h/g}\\approx\\sqrt2\\,\\mathrm{s}$. Horizontal speed is $v_x=3/\\sqrt2\\,\\mathrm{m/s}$."
  },
  {
    "id": "apc_kinematics_mc_022",
    "mode": "multiple_choice",
    "title": "Question 22",
    "prompt": "The graph shown gives velocity $v$ versus time $t$ for an object in linear motion. Which graph is a possible graph of position $x$ versus time $t$ for this object?",
    "context": "Topic: Velocity-time graph to position-time graph. Difficulty: core_plus. Tags: velocity_time_graph, position_time_graph, sign_change.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_022_vt_graph.png",
      "alt": "Input velocity-time graph for Q22.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q22",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Graph A"
      },
      {
        "label": "B",
        "text": "Graph B"
      },
      {
        "label": "C",
        "text": "Graph C"
      },
      {
        "label": "D",
        "text": "Graph D"
      },
      {
        "label": "E",
        "text": "Graph E"
      }
    ],
    "correctAnswer": "A",
    "solution": "Since slope of $x(t)$ is $v(t)$, position first increases, flattens as $v\\to0$, then decreases when $v<0$."
  },
  {
    "id": "apc_kinematics_mc_023",
    "mode": "multiple_choice",
    "title": "Question 23",
    "prompt": "An object is dropped from rest from the top of a $400\\,\\mathrm{m}$ cliff on Earth. If air resistance is negligible, what distance does the object travel during the first $6\\,\\mathrm{s}$?",
    "context": "Topic: Free fall from rest. Difficulty: basic. Tags: free_fall, constant_acceleration.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q23",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$30\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$60\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$120\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$180\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$360\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "D",
    "solution": "$\\Delta y=\\frac12gt^2\\approx5(6^2)=180\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_024",
    "mode": "multiple_choice",
    "title": "Question 24",
    "prompt": "The position of an object is $x=3.0t^2+1.5t+4.5$, where $x$ is in meters and $t$ is in seconds. What is the instantaneous acceleration at $t=3.0\\,\\mathrm{s}$?",
    "context": "Topic: Acceleration from position function. Difficulty: basic. Tags: calculus_kinematics, second_derivative.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q24",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$3.0\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "B",
        "text": "$6.0\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "C",
        "text": "$9.0\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "D",
        "text": "$19.5\\,\\mathrm{m/s^2}$"
      },
      {
        "label": "E",
        "text": "$36\\,\\mathrm{m/s^2}$"
      }
    ],
    "correctAnswer": "B",
    "solution": "$v=dx/dt=6t+1.5$ and $a=dv/dt=6.0\\,\\mathrm{m/s^2}$."
  },
  {
    "id": "apc_kinematics_mc_025",
    "mode": "multiple_choice",
    "title": "Question 25",
    "prompt": "A student tests uniformly accelerated motion by measuring the time for lightweight plastic balls to fall from $3\\,\\mathrm{m}$. The predicted time uses $g=9.80\\,\\mathrm{m/s^2}$, but the measured time is $35\\%$ greater. Which is the most likely cause of the large percent error?",
    "context": "Topic: Model assumptions / air resistance. Difficulty: core_plus. Tags: modeling, air_resistance, experimental_error.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q25",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "The acceleration due to gravity is $70\\%$ greater than $9.80\\,\\mathrm{m/s^2}$ at this location."
      },
      {
        "label": "B",
        "text": "The acceleration due to gravity is $70\\%$ less than $9.80\\,\\mathrm{m/s^2}$ at this location."
      },
      {
        "label": "C",
        "text": "Air resistance increases the downward acceleration."
      },
      {
        "label": "D",
        "text": "The acceleration of the plastic balls is not uniform."
      },
      {
        "label": "E",
        "text": "The plastic balls are not truly spherical."
      }
    ],
    "correctAnswer": "D",
    "solution": "Light plastic balls are strongly affected by air resistance, so acceleration is not constant at $g$."
  },
  {
    "id": "apc_kinematics_mc_026",
    "mode": "multiple_choice",
    "title": "Question 26",
    "prompt": "An object is thrown with speed $v$ from the edge of a cliff above level ground. Neglect air resistance. To travel a maximum horizontal distance before hitting the ground, the launch angle $\\theta$ relative to the horizontal should be:",
    "context": "Topic: Maximum range from a cliff. Difficulty: challenge. Tags: projectile_motion, range, nonlevel_landing.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_026_cliff.png",
      "alt": "Object launched from a cliff at angle theta above horizontal.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q26",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "greater than $60^\\circ$ above horizontal"
      },
      {
        "label": "B",
        "text": "greater than $45^\\circ$ but less than $60^\\circ$ above horizontal"
      },
      {
        "label": "C",
        "text": "greater than zero but less than $45^\\circ$ above horizontal"
      },
      {
        "label": "D",
        "text": "zero"
      },
      {
        "label": "E",
        "text": "greater than zero but less than $45^\\circ$ below horizontal"
      }
    ],
    "correctAnswer": "C",
    "solution": "Because the landing point is below the launch height, the optimal angle is less than the level-ground $45^\\circ$ result but still above horizontal."
  },
  {
    "id": "apc_kinematics_mc_027",
    "mode": "multiple_choice",
    "title": "Question 27",
    "prompt": "Starting from rest, a vehicle accelerates on a straight level road at $4.0\\,\\mathrm{m/s^2}$ for $5.0\\,\\mathrm{s}$. What is the speed at the end of this interval?",
    "context": "Topic: Uniform acceleration from rest. Difficulty: basic. Tags: constant_acceleration, final_velocity.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q27",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$1.3\\,\\mathrm{m/s}$"
      },
      {
        "label": "B",
        "text": "$10\\,\\mathrm{m/s}$"
      },
      {
        "label": "C",
        "text": "$20\\,\\mathrm{m/s}$"
      },
      {
        "label": "D",
        "text": "$80\\,\\mathrm{m/s}$"
      },
      {
        "label": "E",
        "text": "$100\\,\\mathrm{m/s}$"
      }
    ],
    "correctAnswer": "C",
    "solution": "$v=at=4.0(5.0)=20\\,\\mathrm{m/s}$."
  },
  {
    "id": "apc_kinematics_mc_028",
    "mode": "multiple_choice",
    "title": "Question 28",
    "prompt": "For the same vehicle accelerating from rest at $4.0\\,\\mathrm{m/s^2}$ for $5.0\\,\\mathrm{s}$, what is the total distance traveled?",
    "context": "Topic: Uniform acceleration from rest. Difficulty: basic. Tags: constant_acceleration, displacement.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q28",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$10\\,\\mathrm{m}$"
      },
      {
        "label": "B",
        "text": "$20\\,\\mathrm{m}$"
      },
      {
        "label": "C",
        "text": "$25\\,\\mathrm{m}$"
      },
      {
        "label": "D",
        "text": "$40\\,\\mathrm{m}$"
      },
      {
        "label": "E",
        "text": "$50\\,\\mathrm{m}$"
      }
    ],
    "correctAnswer": "E",
    "solution": "$x=\\frac12at^2=\\frac12(4.0)(5.0)^2=50\\,\\mathrm{m}$."
  },
  {
    "id": "apc_kinematics_mc_029",
    "mode": "multiple_choice",
    "title": "Question 29",
    "prompt": "An object is thrown vertically upward where $g$ is constant and air resistance is negligible. Its speed is recorded from launch until maximum height. Which graph best represents speed $v$ versus time $t$?",
    "context": "Topic: Speed-time graph for vertical throw. Difficulty: core. Tags: vertical_motion, speed_time_graph, free_fall.",
    "image": {
      "src": "/kinematics-assets/apc_kinematics_mc_029_speed_graph_choices.png",
      "alt": "Five speed-time graph choices for a vertical throw.",
      "caption": ""
    },
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q29",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "Graph A"
      },
      {
        "label": "B",
        "text": "Graph B"
      },
      {
        "label": "C",
        "text": "Graph C"
      },
      {
        "label": "D",
        "text": "Graph D"
      },
      {
        "label": "E",
        "text": "Graph E"
      }
    ],
    "correctAnswer": "C",
    "solution": "The speed decreases linearly to zero under constant downward acceleration."
  },
  {
    "id": "apc_kinematics_mc_030",
    "mode": "multiple_choice",
    "title": "Question 30",
    "prompt": "If air resistance is negligible, the speed of a $2\\,\\mathrm{kg}$ sphere that falls from rest through a vertical displacement of $0.2\\,\\mathrm{m}$ is most nearly:",
    "context": "Topic: Free-fall speed after displacement. Difficulty: basic. Tags: free_fall, kinematic_equations.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q30",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$1\\,\\mathrm{m/s}$"
      },
      {
        "label": "B",
        "text": "$2\\,\\mathrm{m/s}$"
      },
      {
        "label": "C",
        "text": "$3\\,\\mathrm{m/s}$"
      },
      {
        "label": "D",
        "text": "$4\\,\\mathrm{m/s}$"
      },
      {
        "label": "E",
        "text": "$5\\,\\mathrm{m/s}$"
      }
    ],
    "correctAnswer": "B",
    "solution": "$v=\\sqrt{2g\\Delta y}\\approx\\sqrt{2(10)(0.2)}=2\\,\\mathrm{m/s}$."
  },
  {
    "id": "apc_kinematics_mc_031",
    "mode": "multiple_choice",
    "title": "Question 31",
    "prompt": "A projectile is launched from level ground with initial speed $v_0$ at angle $\\theta$ above horizontal. If air resistance is negligible, how long will it remain in the air?",
    "context": "Topic: Projectile flight time. Difficulty: core. Tags: projectile_motion, flight_time, vertical_component.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q31",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$2v_0/g$"
      },
      {
        "label": "B",
        "text": "$2v_0\\cos\\theta/g$"
      },
      {
        "label": "C",
        "text": "$v_0\\cos\\theta/g$"
      },
      {
        "label": "D",
        "text": "$v_0\\sin\\theta/g$"
      },
      {
        "label": "E",
        "text": "$2v_0\\sin\\theta/g$"
      }
    ],
    "correctAnswer": "E",
    "solution": "Time to the top is $v_0\\sin\\theta/g$; returning to the launch height doubles it."
  },
  {
    "id": "apc_kinematics_mc_032",
    "mode": "multiple_choice",
    "title": "Question 32",
    "prompt": "An object is initially at rest and dropped from height $h$, reaching the ground with speed $v_1$. The same object is raised to height $h$ again and thrown downward with initial speed $v_1$, reaching the ground with speed $v_2$. How is $v_2$ related to $v_1$?",
    "context": "Topic: Energy/kinematics relation for downward throw. Difficulty: challenge. Tags: free_fall, squared_speed, energy_connection.",
    "maxScore": 1,
    "source": "AP Physics C Mechanics Kinematics Q32",
    "answerNudge": "Choose the best answer, then check your response.",
    "criteria": [],
    "choices": [
      {
        "label": "A",
        "text": "$v_2=v_1/2$"
      },
      {
        "label": "B",
        "text": "$v_2=v_1$"
      },
      {
        "label": "C",
        "text": "$v_2=\\sqrt2v_1$"
      },
      {
        "label": "D",
        "text": "$v_2=2v_1$"
      },
      {
        "label": "E",
        "text": "$v_2=4v_1$"
      }
    ],
    "correctAnswer": "C",
    "solution": "The first drop gives $v_1^2=2gh$. The second gives $v_2^2=v_1^2+2gh=2v_1^2$, so $v_2=\\sqrt2v_1$."
  }
];
