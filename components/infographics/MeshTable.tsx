/** Screen mesh comparison for Florida sliding screen doors. Ratings are Phifer's own Good/Better/Best scale. */
const ROWS = [
  { mesh: "Standard fiberglass", weave: "18 x 16", durability: "Good", visibility: "Good", air: "Good", best: "An everyday door screen", spline: ".140 in." },
  { mesh: "Pool and patio fiberglass", weave: "18 x 14", durability: "Better", visibility: "Good", air: "Good", best: "Tall doors and big openings that need a heavier strand", spline: ".140 in." },
  { mesh: "No-see-um fiberglass", weave: "20 x 20", durability: "Not rated", visibility: "Good, slightly reduced", air: "Lower than standard", best: "Tiny biting midges, at the cost of some breeze", spline: ".140 in." },
  { mesh: "Pet-resistant polyester", weave: "Heavier, coarser weave", durability: "Best", visibility: "Good, slightly darker", air: "Good", best: "Dogs, cats and kids who push on the screen", spline: "One size smaller, often .125 in." },
  { mesh: "Solar screen (80% or 90%)", weave: "Tight polyester", durability: "Not rated", visibility: "Lower: roughly 36 to 39% or 18 to 20% of light passes", air: "Lower", best: "West or south doors that bake in afternoon sun", spline: "One size smaller, often .125 in." },
  { mesh: "Aluminum", weave: "Varies", durability: "Good", visibility: "Better", air: "Good", best: "Inland homes. Not on Phifer's list for coastal use", spline: ".125 in." },
];

export function MeshTable() {
  return (
    <figure aria-labelledby="mesh-cap">
      <div className="overflow-x-auto rounded border border-alu bg-white">
        <table className="min-w-[44rem] text-[0.93rem]">
          <caption className="px-4 pt-4 text-left">
            <span className="config-label">MESH COMPARISON</span>
            <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-semibold text-frame">Which screen mesh fits your door?</span>
          </caption>
          <thead>
            <tr>
              <th scope="col">Mesh</th>
              <th scope="col">Weave (strands per inch)</th>
              <th scope="col">Durability</th>
              <th scope="col">Seeing out</th>
              <th scope="col">Airflow</th>
              <th scope="col">Best for</th>
              <th scope="col">Typical spline</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.mesh}>
                <th scope="row" className="!bg-transparent">{r.mesh}</th>
                <td>{r.weave}</td>
                <td>{r.durability}</td>
                <td>{r.visibility}</td>
                <td>{r.air}</td>
                <td>{r.best}</td>
                <td>{r.spline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="mesh-cap" className="figcap">
        Finer or tougher mesh stops more bugs or claws but lets less air and light through. Pick by the problem your door actually
        has. Durability ratings follow Phifer&apos;s selection guide, light figures are from Phifer&apos;s SunTex data, and spline
        sizes assume a common groove, so measure yours.
      </figcaption>
    </figure>
  );
}
