## Prototype architecture
- Keep Venn's fictional match data, scoring and screen state together in the index route; this is a single-file, frontend-only prototype with no persistence or network logic.
- Define Venn's visual treatments in the global semantic design system and use the shared Button variants; this keeps the collage frame separate from readable content.
- Use Motion layout animation for stable keyed match cards; this makes slider-driven reordering immediate without replacing card state.
- Render moving collage artwork as transparent images inside transform-only wrappers; this preserves scroll behavior while keeping original artwork intact.
- Drive questionnaire Earth separators from scroll position with a finite settling animation; this keeps spin and orbit reversible and completely still at rest.
- Reveal activity-scale artwork with clipping rather than transform scaling; this makes the branch pattern grow left-to-right without distorting its shape.
- Track activity drawing continuously and snap preferences on release; this keeps strokes fluid while preserving discrete choices.
- Generate crayon sound with browser Web Audio after pointer interaction, fading to silence when movement stops and disposing it on unmount; this avoids autoplay and network dependencies.
