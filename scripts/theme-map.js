		    // START TODO: change links from integers to persons names.
			//    links.forEach(function(e) {
			//     var sourceNode = dataset.nodes.filter(function(n) { return n.name === e.source; })[0],
			//     targetNode = dataset.nodes.filter(function(n) { return n.name === e.target; })[0];
			    	
			//     dataset.edges.push({source: sourceNode, target: targetNode, value: e.value});
			// })

			var dataset = {
				nodes : [
					{id: "ID_TEMPORAL", name: "TEMPORAL", type: "category"},
					{id: "ID_INTERFACING / PLAY", name: "INTERFACING / PLAY", type: "category"},
					{id: "ID_AUTOMATA", name: "AUTOMATA", type: "category"},
					{id: "ID_DIGITAL ECOLOGIES", name: "DIGITAL ECOLOGIES", type: "category"},
					{id: "ID_SPECULATIVE", name: "SPECULATIVE", type: "category"},
					{id: "ID_EMBODIMENT", name: "EMBODIMENT", type: "category"},
					{id: "ID_PERFORMANCE", name: "PERFORMANCE", type: "category"},
					{id: "ID_SONIC", name: "SONIC", type: "category"},
					{id: "ID_PHANTOMS", name: "PHANTOMS", type: "category"},
					{id: "ID_SIGNS AND SIGNALS", name: "SIGNS AND SIGNALS", type: "category"},
					{id: "ID_DISRUPTING FORMS", name: "DISRUPTING FORMS", type: "category"},
					{id: "ID_WITNESSING / INTERVENING", name: "WITNESSING / INTERVENING", type: "category"},

				],
				edges : []
			};


			// json dataset
			d3.json("../names.json", function(data){

				// artist nodes
				for(var i = 0; i < data.length; i++){
					dataset.nodes.push(data[i]);
				}

				// artist's tag nodes
				// an edge between an artist and each of their tags
				for(var i = 0; i < data.length; i++){
					for(var j =0; j < data[i].tag.length; j++){
						dataset.nodes.push(data[i].tag[j]);
						dataset.edges.push({source: i+12, target: dataset.nodes.length-1});
					}
				}

				// category nodes
				for(var i = 0; i < data.length; i++){
					for(var j =0; j < data[i].category.length; j++){
						for(var k = 0; k < 13; k++){
							if(data[i].category[j].theme == dataset.nodes[k].name){
								dataset.edges.push({source: i+12, target: k});
							}
						}		
					}
				}				


				// SVG global
				var w = $(".map-container").width();
				var h = $(".map-container").height();

				//Initialize a force layout
				var force = d3.layout.force()
					.nodes(dataset.nodes)
					.links(dataset.edges)
					.size([w, h])
					.linkDistance([25])
					.charge([-2400])
					// .linkDistance([200])
					// .charge([-800])
					.start();

				//Append an SVG element to the page
				var svg = d3.select(".connections")
				   	.append("div")
   					.classed("svg-container", true) //container class to make it responsive
					.append("svg")
					//responsive SVG needs these 2 attributes and no width and height attr
				   	.attr("preserveAspectRatio", "xMinYMin meet")
				   	.attr("viewBox", "0 0 600 400")
				   	//class to make it responsive
				   	.classed("svg-content-responsive", true) 
					.attr("id","connections-map")
					.attr("width", w)
					.attr("height", h)

					.call(d3.behavior.zoom().on("zoom", function () {
						svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
					}))
    				.append('g');
				
				//Append each edge as a line
				var edges = svg.selectAll("line")
					.data(dataset.edges)
					.enter()
					.append("line")
					.style({"stroke": "black","opacity":"1","stroke-width": 1})
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
					.style({"fill":"white","stroke":'#ccc'})
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

	            // on click, 
				// $('circle,text').on('click',function(){
					
					// var _id = $(this).attr("id");
     //        		console.log(_id);

					// // style the circle that represents the artist
					// $('circle').css({'fill':'white',"stroke":'#ccc'});
     //        		$("circle#"+_id).css({'fill':'black','stroke':'gray'});

					// -------- should break - dependent on li data ------------------------

					// style each circle that represents a connection
					// var connects = $('li[aid='+ aid +']').attr('connections').split(",")
					// for(var i = 0; i < connects.length; i++){
					// 	$('circle[aid='+ connects[i] +']').css({'fill':'#999','stroke':'black'})
					// }
					
					// style each line that represents a connection
					// var conlines = $('circle[aid='+ aid +']').attr('cx')
					// $('line').css({'stroke':'#ccc','stroke-width':'0.25'})
					// $('line[x1="'+ conlines +'"]').css({'stroke':'black','stroke-width':'0.5'})
				
					// sidebar
					// d3.selectAll('.artist').attr('class','artist')
					// d3.select('li[aid='+ aid +']').attr('class','artist primary')
					// cl = d3.select('li[aid='+ aid +']').attr('connections').split(",");
					// for(var i =0;i<cl.length;i++){
						// var aidz =".artist[aid='"+cl[i]+"']"; 
					  	// d3.selectAll(aidz).attr('class','artist secondary')
					// }
				// })

			});