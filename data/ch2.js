// Chapter 2 — Thinking like an Economist (+ Appendix: Graphing)
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
  id: 2,
  title: "Thinking like an Economist",
  intro: "How economists work: as scientists (models, circular flow, PPF) and as policy advisers (positive vs. normative), and why they disagree.",
  sections: [
    {
      title: "2-1 The economist as scientist",
      bullets: [
        ["**The scientific method**: observation → theory → more observation.", [
          "Science is about **objectivity**: devising and testing theories without bias — not test tubes or labs.",
          "Economists can rarely do experiments (can't create inflation to test a theory), so they rely on **natural experiments** offered by history (e.g. oil price shocks in the Middle East).",
          "Most credible evidence comes from an objective, independent researcher (e.g. a university economist), not from someone paid by an interested party (a union, a company's lawyers, a talk-show host)."
        ]],
        ["**The role of assumptions**", [
          "Assumptions **simplify** the complex world to make it easier to understand.",
          "Physicists assume a marble falls in a vacuum (fine for a marble, not for a beach ball).",
          "To study the gains from trade, economists assume **only two people and two goods** — a reasonable simplification.",
          "The art is choosing assumptions that fit the question; different assumptions for short run vs. long run."
        ]],
        ["**Economic models**", [
          "An economic model is a **simplified representation** of some aspect of the economy, usually built from diagrams and equations.",
          "Models are **based on assumptions**; they omit details to show what is truly important.",
          "A model is NOT meant to replicate reality fully — simplicity is its strength."
        ]],
        ["**Model 1: the circular-flow diagram** — a visual model of the economy showing how dollars flow through markets among households and firms.", [
          "Two decision-makers: **households** and **firms**.",
          "Two markets: **markets for goods and services** (households = buyers, firms = sellers) and **markets for the factors of production** (households = **sellers**, firms = **buyers**).",
          "**Factors of production** = inputs: **labor, land, capital** (buildings, machines). Money/currency is NOT a factor of production.",
          "Households **own** the factors of production.",
          "Inner loop = goods and inputs; outer loop = money (spending, revenue, wages, rent, profit).",
          "Example: you work for a firm and get paid → **factor market** (you sell labor). The firm sells a computer → **goods & services market**."
        ]],
        ["**Model 2: the production possibilities frontier (PPF)** — a graph showing the combinations of output that the economy can possibly produce given the available factors of production and technology.", [
          "Book example: an economy producing **cars and computers**.",
          "Point **on** the frontier → **efficient** (getting the most from resources).",
          "Point **inside** the frontier → **feasible but inefficient** (e.g. unemployment, wasted resources).",
          "Point **outside** → **not attainable** with current resources.",
          "Moving **along** the frontier = trade-off: more of one good means less of the other → shows **opportunity cost**.",
          "PPF is **bowed outward**: opportunity cost rises as you produce more of a good (resources are not equally suited to both goods).",
          "**Economic growth** = PPF **shifts outward** (more capital, more labor, better technology).",
          "Reducing unemployment moves the economy from inside **to** the frontier — it does **NOT** shift the frontier.",
          "A change in **preferences** (people want more hot dogs) moves the economy **along** the frontier — the PPF itself doesn't move."
        ]],
        ["**Microeconomics vs. macroeconomics**", [
          "**Microeconomics**: how households and firms make decisions and interact in specific markets (cigarette taxes and teen smoking, Microsoft's pricing, anti-poverty programs).",
          "**Macroeconomics**: economy-wide phenomena — inflation, unemployment, economic growth, **government budget deficit**.",
          "They are linked: macro changes come from millions of micro decisions."
        ]]
      ]
    },
    {
      title: "2-2 The economist as policy adviser",
      bullets: [
        ["**Positive vs. normative statements**", [
          "**Positive statements**: claims that attempt to describe the world **as it is** — descriptive, can be **tested** with evidence. E.g. \"Minimum-wage laws cause unemployment.\" \"Law X will reduce national income.\"",
          "**Normative statements**: claims that attempt to prescribe how the world **should be** — involve **value judgments**. Key words: **should, ought, good, bad**. E.g. \"The government should raise the minimum wage.\"",
          "Economist as **scientist** → positive statements. Economist as **policy adviser** → normative statements."
        ]],
        ["**Economists in Washington**", [
          "Council of Economic Advisers (advises the US president), Office of Management and Budget, Treasury, Federal Reserve, Congressional Budget Office, etc.",
          "Advice is not always followed — policy is also shaped by politics, communication, and other advisers.",
          "Harry Truman joked he wanted a \"one-armed economist\" (no \"on the other hand\")."
        ]]
      ]
    },
    {
      title: "2-3 Why economists disagree",
      bullets: [
        "**Differences in scientific judgments**: disagreement about **positive** theories of how the world works (e.g. how much $50 billion of spending will reduce unemployment; whether a consumption tax is better than an income tax).",
        "**Differences in values**: disagreement about **normative** views (e.g. whether unemployment or inflation is the bigger social problem; how much to tax the rich).",
        "**Perception vs. reality**: economists actually agree on a lot — e.g. ~93% agree **rent control** reduces the quantity and quality of housing, ~93% agree **tariffs and import quotas** reduce general economic welfare."
      ]
    },
    {
      title: "Appendix: Graphing — a brief review",
      bullets: [
        "Graphs of a single variable: **pie chart, bar graph, time-series graph**.",
        "Graphs of two variables: the **coordinate system** (x-axis, y-axis, ordered pairs) → scatterplot.",
        "**Positive correlation**: variables move in the same direction. **Negative correlation**: opposite directions.",
        "A **demand curve** (price of novels vs quantity) slopes downward — price and quantity demanded are **negatively related**.",
        "**Movement along a curve** = change in a variable on an axis. **Shift of a curve** = change in a variable NOT on an axis (e.g. income).",
        "**Slope** = rise / run = Δy / Δx. Downward-sloping → negative slope; upward → positive; flat → slope 0; vertical → infinite slope.",
        "**Omitted variable** problem: a third variable causes both (e.g. cigarette lighters and cancer — smoking is the omitted variable).",
        "**Reverse causality**: thinking A causes B when B causes A (police officers and crime)."
      ]
    }
  ],
  tables: [
    {
      title: "Circular-flow: who buys and who sells?",
      head: ["Market", "Buyers", "Sellers", "Flows"],
      rows: [
        ["Goods & services", "Households", "Firms", "Goods → households; spending → firms (revenue)"],
        ["Factors of production (labor, land, capital)", "Firms", "Households", "Inputs → firms; wages, rent, profit → households (income)"]
      ]
    },
    {
      title: "PPF: what happens when...",
      head: ["Event", "Effect"],
      rows: [
        ["More capital / labor, better technology", "PPF shifts OUTWARD (growth)"],
        ["Unemployment falls", "Move from inside TO the PPF (no shift)"],
        ["Preferences change", "Move ALONG the PPF"],
        ["Resources destroyed (war, disaster)", "PPF shifts INWARD"]
      ]
    }
  ],
  summary: [
    "Economists try to be **objective scientists**: observation → theory → observation.",
    "They use **assumptions** and **models** (simplified representations) to understand the world.",
    "**Circular flow**: households sell factors of production and buy goods; firms do the opposite.",
    "**Factors of production** = labor, land, capital (not money). Households own them.",
    "**PPF**: on = efficient; inside = feasible but inefficient; outside = unattainable.",
    "PPF shows **trade-offs** and **opportunity cost**; it's bowed out because opportunity cost increases.",
    "**Economic growth** shifts the PPF outward.",
    "**Microeconomics** = individual markets; **macroeconomics** = economy-wide (inflation, unemployment, deficits, growth).",
    "**Positive** = what is (testable); **normative** = what should be (value judgment).",
    "Economists disagree because of different **scientific judgments** or different **values** — but agree on many things (rent control, tariffs are bad)."
  ],
  flashcards: [
    { q: "What does the scientific method require of scientists?", a: "Objectivity — dispassionate development and testing of theories." },
    { q: "Why do economists use natural experiments?", a: "Because controlled experiments in economics are often impossible, unethical or too costly; history provides them." },
    { q: "Why do economists make assumptions?", a: "To simplify the complex world and make it easier to understand." },
    { q: "Economic model", a: "A simplified representation of some aspect of the economy, based on assumptions (diagrams & equations)." },
    { q: "Circular-flow diagram", a: "A visual model of the economy showing how dollars flow through markets among households and firms." },
    { q: "Factors of production", a: "Inputs used to produce goods and services: labor, land and capital (NOT money)." },
    { q: "Who owns the factors of production?", a: "Households." },
    { q: "In the market for factors of production, who sells and who buys?", a: "Households sell, firms buy." },
    { q: "In the market for goods and services, who sells and who buys?", a: "Firms sell, households buy." },
    { q: "Production possibilities frontier", a: "A graph showing the combinations of output the economy can produce given available factors of production and technology." },
    { q: "Point ON the PPF", a: "Efficient (and feasible)." },
    { q: "Point INSIDE the PPF", a: "Feasible but inefficient." },
    { q: "Point OUTSIDE the PPF", a: "Not attainable (not feasible) with current resources." },
    { q: "Why is the PPF bowed outward?", a: "Opportunity cost increases — resources are not equally suited to producing both goods." },
    { q: "What shifts the PPF outward?", a: "Economic growth: more capital, more labor, technological advance. (NOT lower unemployment.)" },
    { q: "Effect of a change in consumer preferences on the PPF", a: "The economy moves along the PPF; the PPF does not shift." },
    { q: "Microeconomics", a: "The study of how households and firms make decisions and interact in markets." },
    { q: "Macroeconomics", a: "The study of economy-wide phenomena: inflation, unemployment, growth, budget deficits." },
    { q: "Positive statement", a: "A descriptive claim about how the world is; can be tested with evidence." },
    { q: "Normative statement", a: "A prescriptive claim about how the world should be; involves value judgments (\"should\", \"ought\")." },
    { q: "Scientist or policy adviser: \"Cutting unemployment benefits will reduce unemployment\"", a: "Scientist (positive statement)." },
    { q: "Two reasons economists disagree", a: "Different scientific judgments (positive) and different values (normative)." },
    { q: "\"Unemployment is the biggest problem\" vs. \"No, inflation is!\"", a: "Disagreement in values." },
    { q: "Two propositions most economists agree on", a: "Rent control reduces quantity/quality of housing; tariffs and import quotas reduce general welfare." },
    { q: "Slope of a line", a: "Rise over run: Δy / Δx." },
    { q: "Movement along vs. shift of a curve", a: "Movement: a variable on the axes changes. Shift: a variable NOT on the axes changes." },
    { q: "Omitted variable", a: "A third, unmeasured variable that causes both observed variables — leads to false causation." },
    { q: "Reverse causality", a: "Believing A causes B when actually B causes A." }
  ]
});
