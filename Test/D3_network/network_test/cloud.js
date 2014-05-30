var width = 1200;
var height = 800;

var color = d3.scale.category10();

var force = d3.layout.force()
    .charge(-180)
    .linkDistance(70)
    .size([width, height]);

var svg = d3.select("#cloud");

d3.json("cloud.json", function(json) {
    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var links = svg.append("g").selectAll("line.link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)");

    var nodes = svg.selectAll("circle.node")
        .data(force.nodes())
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", function(d) { return d.size+5;}) // Radius: vorher stand hier eine feste Nummer, jetzt greift D3 auf das Attribut size zu (Idee von: https://groups.google.com/forum/#!topic/d3-js/r4s3rYZ43PA) 
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    nodes.append("title")
        .text(function(d) { return d.name + " | Energie: " + d.size; }); //vorher 'Stand hier nur d.name, Rest selbst hinzugefügt

    force.on("tick", function() {
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
});