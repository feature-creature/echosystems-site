
			var dataset = {
				nodes : [
					{id: "ID_TEMPORAL", name: "TEMPORAL", type: "category"},
					{id: "ID_INTERFACING_AND_PLAY", name: "INTERFACING / PLAY", type: "category"},
					{id: "ID_AUTOMATA", name: "AUTOMATA", type: "category"},
					{id: "ID_DIGITAL_ECOLOGIES", name: "DIGITAL ECOLOGIES", type: "category"},
					{id: "ID_SPECULATION", name: "SPECULATION", type: "category"},
					{id: "ID_EMBODIMENT", name: "EMBODIMENT", type: "category"},
					{id: "ID_PERFORMANCE", name: "PERFORMANCE", type: "category"},
					{id: "ID_SONIC", name: "SONIC", type: "category"},
					{id: "ID_PHANTOMS", name: "PHANTOMS", type: "category"},
					{id: "ID_SIGNS_AND_SIGNALS", name: "SIGNS AND SIGNALS", type: "category"},
					{id: "ID_DISRUPTING_FORMS", name: "DISRUPTING FORMS", type: "category"},
					{id: "ID_WITNESSING_AND_INTERVENING", name: "WITNESSING / INTERVENING", type: "category"},
				],
				edges : []
			};


			// json dataset
			d3.json("names.json", function(data){
				// artist nodes

				// physical map
               	var physicalMapSVG = d3.select("#exhibition-map");
       
               	var ogs = physicalMapSVG.selectAll("g.artist")
					.data(data)
					.enter()
					.append("g")
					.attr("id", function(d,i){
						return "art_" + d.id;}
					)
					.classed("artist", true);

					ogs.append("circle")
					.attr("r","25")
					.attr("cx",function(d,i){return parseInt(d.location[0][0])+12})
					.attr("cy",function(d,i){return parseInt(d.location[0][1])-5})
					.style({"fill":"lightgray","display":"none"});
               		
					ogs.append("text")
					.text(function(d,i){
						return d.name;
					})
					.classed("cls-3",true)
					.attr("x",function(d,i){return d.location[0][0]})
					.attr("y",function(d,i){return d.location[0][1]});

					// physicalMapSVG.append().html(
				 //    "<g id='art_ID_Annie_Tådne' class='artist'>"+
				 //    "<circle cx='427' cy='565' r='25' style='fill:lightgray;display:none'/>"+
					// "<text class='cls-3' x='415' y='570'>Annie Tådne</text></g>"
					// );

				// force directed map

				for(var i = 0; i < data.length; i++){
					dataset.nodes.push(data[i]);
				}

				// artist's tag nodes
				// an edge between an artist and each of their tags
                // after the 12 categories
				for(var i = 0; i < data.length; i++){
					for(var j =0; j < data[i].tag.length; j++){
						dataset.nodes.push(data[i].tag[j]);
						dataset.edges.push({source: i+12, target: dataset.nodes.length-1});
					}
				}

				// category nodes
				for(var i = 0; i < data.length; i++){
					for(var j =0; j < data[i].category.length; j++){
						for(var k = 0; k < 12; k++){
							if(data[i].category[j].theme == dataset.nodes[k].name){
								dataset.edges.push({source: i+12, target: k});
							}
						}
					}
				}




				// SVG global
				var w = $(".info-container").width();
				// var h = $(".info-container").height();
				var h = 2500;

				//Initialize a force layout
				var force = d3.layout.force()
					.nodes(dataset.nodes)
					.links(dataset.edges)
					.size([w, h])
					.linkDistance([125])
					.charge([-2400])
					.start();

				var zoom = d3.behavior.zoom().on("zoom", function () {
						svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
					});

				//Append an SVG element to the page
				var svg = d3.select(".connections")
				   	.append("div")
   					.classed("svg-container", true) //container class to make it responsive
					.append("svg")
					//responsive SVG needs these 2 attributes and no width and height attr
				   	.attr("preserveAspectRatio", "xMinYMin meet")
				   	.attr("viewBox", "0 0 600 1200")
				   	//class to make it responsive
				   	.classed("svg-content-responsive", true)
					.attr("id","connections-map")
					.attr("width", w)
					.attr("height", h)
					.call(zoom)
    				.append('g');

				//Append each edge as a line
				var edges = svg.selectAll("line")
					.data(dataset.edges)
					.enter()
					.append("line")
					.style({"stroke": "gray","opacity":"1","stroke-width": 1})
					.attr("source", function(d,i){return "art_" + d.source.id})
					.attr("target", function(d,i){return "art_" + d.target.id});

				// Append each node as a circle
				var nodes = svg.selectAll("circle")
					.data(dataset.nodes)
					.enter()
					.append("circle")
					.attr("id", function(d,i){return "art_" + d.id;})
					.attr("class", function(d,i){return d.type;})
					.attr("r","10")
					.style({"fill":"white","stroke":'gray'})
					.call(force.drag);

	            // Append a title for each node
				var titles = svg.selectAll("text")
					.data(dataset.nodes)
					.enter()
					.append("text")
				  	.text(function(d,i) {
				  		return dataset.nodes[i].name
				  	})
				  	.attr("font-family", "spot_mono")
	              	.attr("font-size", function(d,i){
	                    if(dataset.nodes[i].type == "artist"){
	                        return "17px";
	                    }else if(dataset.nodes[i].type == "category"){
	                        return "21px";
	                    }else if(dataset.nodes[i].type == "tag"){
	                        return "12px";
	                    }else{
	                        return "12px";
	                    }
	                })
				  	.attr("id", function(d,i){return "art_" + d.id;})
					.attr("class", function(d,i){return d.type;})
				  	.attr("fill", "black")
					.call(force.drag);


				// on tick, recalculate location for each edge, node, and title
				force.on("tick", function() {
					edges.attr("x1", function(d) { return d.source.x; })
						 .attr("y1", function(d) { return d.source.y; })
						 .attr("x2", function(d) { return d.target.x; })
						 .attr("y2", function(d) { return d.target.y; });

					nodes.attr("cx", function(d) { return d.x; })
						 .attr("cy", function(d) { return d.y; });

					titles.attr("x", function(d) { return d.x -10;})
						 .attr("y", function(d) { return d.y - 20;});
				});

				zoom.scale(0.35);
				zoom.event(svg);
			});



