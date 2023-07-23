import define1 from "./7a9e12f9fb3d8e06@498.js";

function _1(md){return(
md`# Tree, Radial Tidy

D3’s [tree layout](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree) implements the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf) for constructing hierarchical node-link diagrams, improved to run in linear time by [Buchheim *et al.*](http://dirk.jivas.de/papers/buchheim02improving.pdf) Tidy trees are typically more compact than [cluster dendrograms](/@d3/radial-cluster), which place all leaves at the same level. See also the [Cartesian variant](/@d3/tree).`
)}

function _chart(Tree,flare){return(
Tree(flare, {
  label: d => d.name,
  title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}`, // hover text
  link: (d, n) => `https://github.com/prefuse/Flare/${n.children ? "tree" : "blob"}/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}${n.children ? "" : ".as"}`,
  width: 1200,
  height: 1200,
  margin: 120
})
)}

function _flare(FileAttachment){return(
FileAttachment("cwe_ltree-6-1@1.json").json()
)}

function _4(howto){return(
howto("Tree", "@d3/radial-tree")
)}

function _Tree(d3){return(
function Tree(data, {
  path,
  id = Array.isArray(data) ? d => d.id : null,
  parentId = Array.isArray(data) ? d => d.parentId : null,
  children,
  tree = d3.tree,
  separation = tree === d3.tree ? (a, b) => (a.parent == b.parent ? 1 : 1.5) / a.depth : (a, b) => a.parent == b.parent ? 1 : 1.5,
  sort,
  label,
  title,
  link,
  linkTarget = "_blank",
  width = 640,
  height = 640,
  margin = 100,
  marginTop = margin,
  marginRight = margin,
  marginBottom = margin,
  marginLeft = margin,
  radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 3,
  r = 6,
  padding = 1,
  fill = "#999",
  fillOpacity,
  stroke = "#555",
  strokeWidth = 1.5,
  strokeOpacity = 0.4,
  strokeLinejoin,
  strokeLinecap,
  halo = "#fff",
  haloWidth = 3,
} = {}) {

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const root = path != null ? d3.stratify().path(path)(data)
      : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
      : d3.hierarchy(data, children);

  if (sort != null) root.sort(sort);

  const descendants = root.descendants();
  const L = label == null ? null : descendants.map(d => label(d.data, d));

  tree().size([2 * Math.PI, radius]).separation(separation)(root);

  const svg = d3.create("svg")
      .attr("viewBox", [-marginLeft - radius, -marginTop - radius, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-opacity", strokeOpacity)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));

  const node = svg.append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
      .attr("xlink:href", link == null ? null : d => link(d.data, d))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

  node.append("circle")
      .attr("fill", d => d.children ? stroke : color(d.data.name.split(":")[0]))
      .attr("r", r);

  if (title != null) node.append("title")
      .text(d => title(d.data, d));
  
  let specialNames = ['Injection Vulnerabilities', 'Buffer Errors', 'Trust & Privilege Management', 'Path & Resource Issues', 'Crypto/Data Handling Issues','Pointer Subtraction Use','NULL Pointer Dereferencing']; // Add more names  

  if (L) node.append("text")
      .attr("transform", d => {
        // if (specialNames.includes(label(d.data, d)))  { 
        //   return `rotate(270) `;
     if (label(d.data, d) === 'Injection Vulnerabilities') { 
          return `rotate(270)`; // 
        } else if (label(d.data, d) === 'Crypto/Data Handling Issues') { 
          return `rotate(280)`; // 
        } else if (label(d.data, d) === 'NULL Pointer Dereferencing') { 
          return `rotate(130)`; // 
        } else if (label(d.data, d) === 'Path & Resource Issues') { 
          return `rotate(100)`; // 
        } else if (label(d.data, d) === 'Trust & Privilege Management Issues') { 
          return `rotate(30)`; // 
        } else if (label(d.data, d) === 'Buffer Errors') { 
          return `rotate(360)`; // 
        } else if (label(d.data, d) === 'Pointer Subtraction Use Issues') { 
          return `rotate(330)`; // 
        } else if (label(d.data, d) === 'CWE') { 
          return `rotate(260)`; // 
        } else {
          return `rotate(${d.x >= Math.PI ? 180 : 0})`;
        }
      })
      .attr("dy", "0.32em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("font-size", d => label(d.data, d) === 'CWE' ? "16px" : "10px")
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);

  return svg.node();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cwe_ltree-6-1@1.json", {url: new URL("./files/772cfab871e8911211b1884baf88aaa0b17dc7cb583e300f5747829fa7883544c92aba3a0c328f08c199ccb8c01832cfb2538e3b231cc2303b55cfb3468c2f01.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["Tree","flare"], _chart);
  main.variable(observer("flare")).define("flare", ["FileAttachment"], _flare);
  main.variable(observer()).define(["howto"], _4);
  main.variable(observer("Tree")).define("Tree", ["d3"], _Tree);
  const child1 = runtime.module(define1);
  main.import("howto", child1);
  return main;
}
