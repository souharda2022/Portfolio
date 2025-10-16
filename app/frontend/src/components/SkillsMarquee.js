// import React, { useMemo } from "react";
// import { usePortfolio } from "../contexts/PortfolioContext";
// import { Badge } from "./ui/badge";

// /**
//  * A looping marquee that flattens your skills from portfolio.json
//  * into a single scrolling row (two rows, opposite directions).
//  */
// const flattenSkills = (skillsObj) => {
//   if (!skillsObj || typeof skillsObj !== "object") return [];
//   const entries = Object.entries(skillsObj);
//   const flat = [];
//   for (const [group, items] of entries) {
//     if (Array.isArray(items)) {
//       for (const s of items) flat.push({ group, label: s });
//     }
//   }
//   // de-dup (case-insensitive)
//   const seen = new Set();
//   return flat.filter(({ label }) => {
//     const k = label.toLowerCase();
//     if (seen.has(k)) return false;
//     seen.add(k);
//     return true;
//   });
// };

// const Row = ({ items, reverse = false }) => {
//   // duplicate list so the end meets the beginning seamlessly
//   const duo = useMemo(() => [...items, ...items], [items]);

//   return (
//     <div className="relative overflow-hidden marquee-fade">
//       <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
//         {duo.map((it, i) => (
//           <Badge
//             key={`${it.label}-${i}`}
//             variant="outline"
//             className="mx-2 my-3 whitespace-nowrap border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white/60 dark:bg-black/40 backdrop-blur-sm"
//           >
//             {it.label}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SkillsMarquee = () => {
//   const { portfolio } = usePortfolio();
//   const items = useMemo(() => flattenSkills(portfolio?.skills), [portfolio]);

//   if (!items.length) return null;

//   // Split into two roughly equal rows for a fuller look
//   const mid = Math.ceil(items.length / 2);
//   const row1 = items.slice(0, mid);
//   const row2 = items.slice(mid);

//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-6">
//           Tools & Technologies
//         </h2>
//         <div className="w-20 h-1 bg-black dark:bg-white mx-auto mb-10" />
//         <div className="space-y-2">
//           <Row items={row1} />
//           <Row items={row2} reverse />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SkillsMarquee;
