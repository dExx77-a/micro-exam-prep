// Diagrams drawn as inline SVG. Each entry: { title, caption, svg() }.
// Colours come from CSS classes (see .g in style.css) so they follow light/dark mode.
(function () {
  let uid = 0;
  const defs = id => `<defs><marker id="ah${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker></defs>`;

  // A plot frame: maps data coords (0..xmax, 0..ymax) to SVG coords.
  function frame(w, h, xmax, ymax, xl, yl) {
    const id = ++uid, L = 58, R = 26, T = 22, B = 46;
    const X = x => L + (x / xmax) * (w - L - R);
    const Y = y => h - B - (y / ymax) * (h - T - B);
    const arrow = `marker-end="url(#ah${id})"`;
    const axes = `<line class="ax" x1="${L}" y1="${h - B}" x2="${w - 8}" y2="${h - B}" ${arrow}/>
      <line class="ax" x1="${L}" y1="${h - B}" x2="${L}" y2="6" ${arrow}/>
      <text x="${w - 10}" y="${h - B + 30}" text-anchor="end" class="axl">${xl}</text>
      <text x="16" y="${(h - B + T) / 2}" text-anchor="middle" class="axl" transform="rotate(-90 16 ${(h - B + T) / 2})">${yl}</text>`;
    const line = (pts, cls, extra = "") => `<polyline class="${cls}" points="${pts.map(p => X(p[0]) + "," + Y(p[1])).join(" ")}" ${extra}/>`;
    const dot = (x, y, label, dx = 8, dy = -8, cls = "") => `<circle class="dot" cx="${X(x)}" cy="${Y(y)}" r="5"/>${label ? `<text x="${X(x) + dx}" y="${Y(y) + dy}" class="${cls}" text-anchor="${dx < 0 ? "end" : "start"}">${label}</text>` : ""}`;
    const guides = (x, y, xlab, ylab) => `<polyline class="guide" points="${X(0)},${Y(y)} ${X(x)},${Y(y)} ${X(x)},${Y(0)}"/>` +
      (ylab ? `<text x="${X(0) - 8}" y="${Y(y) + 4}" text-anchor="end" class="tick">${ylab}</text>` : "") +
      (xlab ? `<text x="${X(x)}" y="${Y(0) + 18}" text-anchor="middle" class="tick">${xlab}</text>` : "");
    const label = (x, y, t, cls = "", anchor = "start") => `<text x="${X(x)}" y="${Y(y)}" class="${cls}" text-anchor="${anchor}">${t}</text>`;
    const arr = (x1, y1, x2, y2, cls = "move") => `<line class="${cls}" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" marker-end="url(#ah${id})"/>`;
    const open = `<svg viewBox="0 0 ${w} ${h}" role="img" xmlns="http://www.w3.org/2000/svg">${defs(id)}`;
    return { X, Y, axes, line, dot, guides, label, arr, open, id };
  }
  const bow = (xm, ym, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const t = (i / n) * Math.PI / 2; return [xm * Math.sin(t), ym * Math.cos(t)]; });

  const G = {};

  // ---------- Chapter 2 ----------
  G.circular = {
    title: "The circular-flow diagram",
    caption: "Solid arrows = goods, services and factors of production. Dashed green arrows = money. Households SELL factors and BUY goods; firms do the opposite.",
    svg() {
      const id = ++uid, m = `marker-end="url(#ah${id})"`;
      const box = (x, y, w, h, t1, t2, cls = "box") => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/><text x="${x + w / 2}" y="${y + h / 2 - (t2 ? 3 : -5)}" text-anchor="middle" class="bt">${t1}</text>${t2 ? `<text x="${x + w / 2}" y="${y + h / 2 + 15}" text-anchor="middle" class="bt2">${t2}</text>` : ""}`;
      const p = (d, cls) => `<path class="${cls}" d="${d}" ${m}/>`;
      const t = (x, y, a, ...lines) => `<text x="${x}" y="${y}" text-anchor="${a}" class="fl">${lines.map((l, i) => `<tspan x="${x}" dy="${i ? 15 : 0}">${l}</tspan>`).join("")}</text>`;
      return `<svg viewBox="0 0 680 420" role="img" xmlns="http://www.w3.org/2000/svg">${defs(id)}<g transform="translate(60,22)">
        ${box(170, 15, 220, 62, "MARKETS FOR", "GOODS & SERVICES", "box2")}
        ${box(170, 300, 220, 62, "MARKETS FOR", "FACTORS OF PRODUCTION", "box2")}
        ${box(-5, 160, 130, 58, "FIRMS")}
        ${box(435, 160, 130, 58, "HOUSEHOLDS")}
        ${p("M 168 32 Q 25 32 25 156", "money")}
        ${p("M 100 158 Q 100 62 166 62", "gflow")}
        ${p("M 392 62 Q 460 62 460 156", "gflow")}
        ${p("M 535 156 Q 535 32 394 32", "money")}
        ${p("M 460 222 Q 460 315 394 315", "gflow")}
        ${p("M 394 348 Q 535 348 535 224", "money")}
        ${p("M 166 315 Q 100 315 100 222", "gflow")}
        ${p("M 25 222 Q 25 348 166 348", "money")}
        ${t(18, 90, "end", "Revenue", "($)")}
        ${t(108, 105, "start", "Goods &amp;", "services sold")}
        ${t(452, 105, "end", "Goods &amp;", "services bought")}
        ${t(542, 90, "start", "Spending", "($)")}
        ${t(452, 262, "end", "Labor, land,", "and capital")}
        ${t(542, 280, "start", "Income", "($)")}
        ${t(108, 262, "start", "Factors of", "production")}
        ${t(18, 280, "end", "Wages, rent,", "profit ($)")}
        <text x="280" y="196" text-anchor="middle" class="tick">households own the</text>
        <text x="280" y="212" text-anchor="middle" class="tick">factors of production</text>
      </g></svg>`;
    }
  };

  G.ppf = {
    title: "The production possibilities frontier (PPF)",
    caption: "On the frontier (A, B) = efficient. Inside (C) = feasible but inefficient, e.g. unemployment. Outside (D) = not attainable. Moving A → B: more computers cost fewer cars — that is the opportunity cost. The curve is bowed out because opportunity cost rises.",
    svg() {
      const f = frame(560, 360, 10, 10, "Quantity of computers", "Quantity of cars");
      return f.open + f.axes + f.line(bow(8.5, 8.5), "c1") +
        f.label(7.4, 6.3, "PPF", "lbl-acc") +
        f.dot(8.5 * Math.sin(0.5), 8.5 * Math.cos(0.5), "A") +
        f.dot(8.5 * Math.sin(1.0), 8.5 * Math.cos(1.0), "B") +
        f.arr(8.5 * Math.sin(0.55), 8.5 * Math.cos(0.55) + 0.35, 8.5 * Math.sin(0.95) + 0.25, 8.5 * Math.cos(0.95) + 0.25) +
        f.dot(3.4, 3.2, "C inefficient", 8, 18) +
        f.dot(8.0, 7.6, "D unattainable", 8, -8) +
        "</svg>";
    }
  };

  G.ppfshift = {
    title: "Economic growth shifts the PPF outward",
    caption: "More capital, more workers or better technology → the whole frontier moves out. (Reducing unemployment only moves the economy from inside TO the frontier; a change in preferences only moves it ALONG the frontier.)",
    svg() {
      const f = frame(560, 360, 10, 10, "Quantity of computers", "Quantity of cars");
      return f.open + f.axes + f.line(bow(6.5, 6.5), "c1") + f.line(bow(9, 8.6), "c1b") +
        f.label(4.8, 4.9, "PPF₁", "lbl-acc") + f.label(6.9, 6.9, "PPF₂", "lbl-acc") +
        f.arr(3.4, 3.4, 4.9, 4.9, "move") + f.arr(0.4, 6.6, 0.4, 8.3, "move") + f.arr(6.6, 0.4, 8.6, 0.4, "move") +
        f.label(1.6, 9.2, "technological advance", "tick") + "</svg>";
    }
  };

  // ---------- Chapter 3 ----------
  G.trade = {
    title: "How trade expands consumption (Frank and Rose)",
    caption: "Without trade each person consumes ON their own PPF (A). With specialization and trade they consume at A* — OUTSIDE their own PPF. Frank: 16P+4M → 17P+5M. Rose: 24P+12M → 27P+13M.",
    svg() {
      const a = frame(330, 300, 36, 10, "Potatoes (oz)", "Meat (oz)");
      const b = frame(330, 300, 52, 28, "Potatoes (oz)", "Meat (oz)");
      return `<svg viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg">
        <g>${a.open.replace(/^<svg[^>]*>/, "")}${a.axes}${a.line([[0, 8], [32, 0]], "c1")}
          ${a.guides(0, 8, "", "8")}${a.guides(32, 0, "32", "")}
          ${a.dot(16, 4, "A", -8, -8)}${a.dot(17, 5, "A*", 8, -8, "lbl-good")}
          <text x="${a.X(18)}" y="22" text-anchor="middle" class="bt">Frank (farmer)</text></g>
        <g transform="translate(345,0)">${b.open.replace(/^<svg[^>]*>/, "")}${b.axes}${b.line([[0, 24], [48, 0]], "c1")}
          ${b.guides(0, 24, "", "24")}${b.guides(48, 0, "48", "")}
          ${b.dot(24, 12, "A", -8, -8)}${b.dot(27, 13, "A*", 8, -8, "lbl-good")}
          <text x="${b.X(26)}" y="22" text-anchor="middle" class="bt">Rose (rancher)</text></g>
      </svg>`;
    }
  };

  // ---------- Chapter 4 ----------
  const D = q => 10 - q;            // demand: P = 10 - Q
  const S = q => q;                 // supply: P = Q
  G.demand = {
    title: "The demand curve — law of demand",
    caption: "Price ↓ → quantity demanded ↑. A change in the good's OWN price = a movement ALONG the curve (A → B), called a change in quantity demanded.",
    svg() {
      const f = frame(560, 340, 10, 10, "Quantity demanded", "Price");
      return f.open + f.axes + f.line([[1, 9], [9, 1]], "cd") + f.label(9.1, 1.4, "D", "lbl-d") +
        f.guides(3, 7, "Q₁", "P₁") + f.guides(6, 4, "Q₂", "P₂") +
        f.dot(3, 7, "A") + f.dot(6, 4, "B") + f.arr(3.5, 6.9, 5.6, 4.8) + "</svg>";
    }
  };
  G.dshift = {
    title: "Shifts in the demand curve",
    caption: "Anything except the good's own price (income, prices of related goods, tastes, expectations, number of buyers) SHIFTS the whole curve. Right = increase in demand, left = decrease in demand.",
    svg() {
      const f = frame(560, 340, 10, 10, "Quantity", "Price");
      return f.open + f.axes + f.line([[0.5, 7.5], [6.5, 1.5]], "cd2") + f.line([[1.5, 8.5], [7.5, 2.5]], "cd") + f.line([[2.5, 9.5], [8.5, 3.5]], "cd2") +
        f.label(6.6, 1.2, "D₃", "lbl-d") + f.label(7.6, 2.2, "D₁", "lbl-d") + f.label(8.6, 3.2, "D₂", "lbl-d") +
        f.arr(5, 5.4, 6.1, 5.4) + f.arr(4.2, 4.6, 3.1, 4.6) +
        f.label(6.3, 5.6, "increase", "tick") + f.label(2.9, 4.4, "decrease", "tick", "end") + "</svg>";
    }
  };
  G.supply = {
    title: "The supply curve — law of supply",
    caption: "Price ↑ → quantity supplied ↑: a movement ALONG the curve (A → B). Input prices, technology, expectations and number of sellers SHIFT the curve — S₂ (dashed) is an increase in supply.",
    svg() {
      const f = frame(560, 340, 10, 10, "Quantity supplied", "Price");
      return f.open + f.axes + f.line([[1, 1], [9, 9]], "cs") + f.label(9.1, 9, "S", "lbl-s") +
        f.line([[2.5, 0.8], [9.5, 7.8]], "cs2") + f.label(9.6, 7.6, "S₂", "lbl-s") +
        f.guides(3, 3, "Q₁", "P₁") + f.guides(7, 7, "Q₂", "P₂") +
        f.dot(3, 3, "A", -10, -6) + f.dot(7, 7, "B", -10, -6) + f.arr(3.4, 3.6, 6.4, 6.6) + "</svg>";
    }
  };
  G.equilibrium = {
    title: "Equilibrium, surplus and shortage",
    caption: "Equilibrium where S and D cross: Qs = Qd. Price ABOVE equilibrium → surplus → price falls. Price BELOW → shortage → price rises.",
    svg() {
      const f = frame(560, 360, 10, 10, "Quantity", "Price");
      return f.open + f.axes +
        `<line class="band-s" x1="${f.X(3)}" y1="${f.Y(7)}" x2="${f.X(7)}" y2="${f.Y(7)}"/><line class="band-h" x1="${f.X(3)}" y1="${f.Y(3)}" x2="${f.X(7)}" y2="${f.Y(3)}"/>` +
        f.line([[1, 9], [9, 1]], "cd") + f.line([[1, 1], [9, 9]], "cs") + f.label(9.1, 1.2, "D", "lbl-d") + f.label(9.1, 9, "S", "lbl-s") +
        f.guides(5, 5, "Q*", "P*") + f.dot(5, 5, "Equilibrium", 10, 4) +
        `<text x="${f.X(0) - 8}" y="${f.Y(7) + 4}" text-anchor="end" class="tick">$7</text><text x="${f.X(0) - 8}" y="${f.Y(3) + 4}" text-anchor="end" class="tick">$3</text>` +
        f.label(5, 7.35, "SURPLUS", "lbl-bad", "middle") + f.label(5, 2.35, "SHORTAGE", "lbl-good", "middle") +
        `<polyline class="guide" points="${f.X(0)},${f.Y(7)} ${f.X(3)},${f.Y(7)}"/><polyline class="guide" points="${f.X(0)},${f.Y(3)} ${f.X(3)},${f.Y(3)}"/>` +
        "</svg>";
    }
  };
  G.dincrease = {
    title: "Demand increases (e.g. a hot summer for ice cream)",
    caption: "Step 1: demand curve. Step 2: shifts right. Step 3: new equilibrium → price ↑ and quantity ↑. Note: the supply curve does NOT shift — there is a movement along it (quantity supplied ↑).",
    svg() {
      const f = frame(560, 340, 12, 12, "Quantity", "Price");
      return f.open + f.axes + f.line([[1, 9], [9, 1]], "cd2") + f.line([[3, 9], [11, 1]], "cd") + f.line([[1, 1], [10, 10]], "cs") +
        f.label(9.1, 1.1, "D₁", "lbl-d") + f.label(11.1, 1.1, "D₂", "lbl-d") + f.label(10.1, 10.1, "S", "lbl-s") +
        f.guides(5, 5, "Q₁", "P₁") + f.guides(6, 6, "Q₂", "P₂") + f.dot(5, 5, "") + f.dot(6, 6, "") + f.arr(6.4, 3.6, 8, 3.6) + "</svg>";
    }
  };
  G.sdecrease = {
    title: "Supply decreases (e.g. input price ↑, frost, hurricane)",
    caption: "Supply shifts left → price ↑ and quantity ↓. The demand curve does NOT shift — there is a movement along it (quantity demanded ↓).",
    svg() {
      const f = frame(560, 340, 12, 12, "Quantity", "Price");
      return f.open + f.axes + f.line([[1, 9], [9, 1]], "cd") + f.line([[1, 1], [10, 10]], "cs2") + f.line([[0.5, 2.5], [8, 10]], "cs") +
        f.label(9.1, 1.1, "D", "lbl-d") + f.label(10.1, 10.1, "S₁", "lbl-s") + f.label(8.1, 10.2, "S₂", "lbl-s") +
        f.guides(5, 5, "Q₁", "P₁") + f.guides(4, 6, "Q₂", "P₂") + f.dot(5, 5, "") + f.dot(4, 6, "") + f.arr(7.4, 6.6, 6.2, 7.8) + "</svg>";
    }
  };

  window.GRAPHS = G;
  // Where each graph appears: "chapter-sectionIndex" → graph keys (shown after that section's bullets)
  window.GRAPH_PLACES = {
    "2-0": ["circular", "ppf", "ppfshift"],
    "3-0": ["trade"],
    "4-1": ["demand", "dshift"],
    "4-2": ["supply"],
    "4-3": ["equilibrium", "dincrease", "sdecrease"]
  };
})();
