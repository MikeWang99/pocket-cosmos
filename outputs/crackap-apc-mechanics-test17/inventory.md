# AP Physics C: Mechanics Test 17 — Import Inventory

## Scope

- Source page: https://www.crackap.com/ap/physics-c-mechanics/test17.html
- Set title: AP Physics C: Mechanics Practice Test 17: Rotation II: Inertia, Equilibrium, and Combined Rotation/Translation
- Imported questions: 10 of 10
- Source question IDs: 163–172 (answer pages archived as `question-{id}.html`)
- Imported source images: 18 (8 stem figures + 10 graphical choice images for Q5/Q6)
- Formula images transcribed to LaTeX instead of reproduced: Q1 choice factors, Q7 stem inertia + choice formulas, Q8 choice vectors
- Target hierarchy: AP Physics C: Mechanics → Multiple Choice → Unit 6 · Energy and Momentum of Rotating Systems

The user explicitly requested this single-source import (CrackAP rotation/torque/rotational-dynamics/rotational-energy-momentum sets) and direct publication into the corresponding chapters. Test 16 (Rotation I) and Test 15 (Linear Momentum) were already imported previously; Test 17 completes the Unit 5/6 rotation coverage.

## Answer audit

| Question | Source answer | Independently verified | Result |
|---|---:|---:|---|
| 1 (163) | C | C | Pass — $L=I\omega$ conserved; $\omega$ doubles, $r_{max}$ halves, $v=\omega r_{max}$ unchanged |
| 2 (164) | B | B | Pass — torque balance $mgl\cos\theta=m_1gl\cos\theta\Rightarrow m=m_1$ |
| 3 (165) | D | D | Pass — parallel-axis: end axis gives $ML^2/3$, largest of the candidates |
| 4 (166) | B | B | Pass — static friction lets rotational KE convert to PE too (rolling constraint kills spin at the top) |
| 5 (167) | E | E | Pass — no torque, $L=pr_\perp$ constant |
| 6 (168) | E | E | Pass — tension $=mg/2$ from torque balance, pivot supplies $mg/2$ upward |
| 7 (169) | E | E | Pass — $mvr=(mr^2+\tfrac12Mr^2)\omega_f$, $v_f=r\omega_f=mv/(m+M/2)$ |
| 8 (170) | C | C | Pass — P on left side: centripetal term points right, $a_P=(a+\omega^2r)\hat{i}$ |
| 9 (171) | C | C | Pass — $I=2m(b/2)^2+2m(a^2+b^2/4)=m(2a^2+b^2)$ |
| 10 (172) | C | C | Pass — $\omega=\sqrt{2E/M}/R$, $K_{rot}=E I/(MR^2)$ |

## Source-data correction

Question 1: on the source site, options B and D reference the **same image file** (`image01364.jpeg` and `image01365.jpeg` are byte-identical, both rendering $\sqrt{2}$). The set's distractor structure ("decreases by a factor of X" / "increases by a factor of X" alongside the factor-of-2 endpoints) shows both should read $\sqrt{2}$. Both options were transcribed as $\sqrt{2}$ (one decreasing, one increasing). This deviation is noted in `asset-index.json` under `transcribedFormulas`.

## Rights and provenance

- Rights status: `unknown`
- Review status: `approved_by_direct_assignment_request`
- Attribution is retained in every question record (`source` field) and in both public indexes.
- The original HTML (test page + 10 answer pages) is archived locally under `source-snapshots/` for audit purposes.
- No claim of public-domain or redistribution permission is made.

## Public indexes

- `/apc-mechanics-rotation-test17/question-index.json`
- `/apc-mechanics-rotation-test17/asset-index.json`

The asset index records each asset's local path, original source URL, and pixel dimensions, plus a `transcribedFormulas` section documenting every formula image replaced with LaTeX.

## Display policy

- Stem figures are served locally from `/apc-mechanics-rotation-test17/source/` with download names.
- Graphical choices (Q5 L-vs-y graphs, Q6 force-direction arrows) render as images in a grid layout.
- Formula-only choices (Q1 B/D, Q7, Q8) use native LaTeX rendering; the tiny source formula images were not reproduced.
