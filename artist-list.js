$(document).ready(function(){

    $.getJSON("names.json", function(data){
        var artists = [];
        // var tags = [];

        $.each(data, function(key, val){
            artists.push("<p id='art_"+val.id+"' class='artist'>"+val.name+"</p>");
            // console.log(val.tag.length)
        });

        $("<div/>", {
            "class":"listed-artist", html: artists.join("")
        }).appendTo(".artist-list");

        $(".category,.artist,.tag").click(function(){
            
            var string_id = $(this).attr("id"); //art_ID_SPECULATIVE
            var panel_id = string_id.substr(7); //SPECULATIVE
            
            // reset all lines
            $("#connections-map line").css({"stroke": "gray","opacity":"1","stroke-width": 1})
            // reset all circles
            $("circle").css({'fill':'white',"stroke":'#ccc'});
            // reset all listed artists
            $(".artist-list p").css({"text-decoration":"none"});
            // reset all artists on the physical map
            $("g.artist").css({"text-decoration":"none"});
            // hide all artist modals
            $(".artist-info").css("display", "none");
            // hide all category modals
            $("#category-list p").css({"text-decoration":"none"});
            // hide all category modals
            $(".category-info").css("display","none");
            // hide all tag modals
            $("#tag-list p").css({"text-decoration":"none"});


            // highlight associated entities
            for(var i = 0; i < dataset.edges.length; i++){
                if("art_" + dataset.edges[i].source.id == string_id || "art_" + dataset.edges[i].target.id == string_id){
                    $("circle#art_"+dataset.edges[i].target.id).css({'fill':'darkgray','stroke':'black'});
                    $("circle#art_"+dataset.edges[i].source.id).css({'fill':'darkgray','stroke':'black'});
                    if(dataset.edges[i].target.type == "artist"){
                        $("g.artist#art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});
                        $(".artist-list#art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});
                    }
                    if(dataset.edges[i].source.type == "artist"){
                        $("g.artist#art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});
                        $(".artist-list #art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});
                    }
                    if(dataset.edges[i].target.type == "tag"){
                        $("#tag-list #art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});

                    }
                    if(dataset.edges[i].source.type == "tag"){
                        $("#tag-list #art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});

                    }
                    if(dataset.edges[i].target.type == "category"){
                        $("#category-list #art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});

                    }
                    if(dataset.edges[i].source.type == "category"){
                        $("#category-list #art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});

                    }
                } 
            }


            // highlight lines associated with the selected artist/category/tag
            $("line[source='"+string_id+"'").css({"stroke": "black","opacity":"1","stroke-width": 2})
            $("line[target='"+string_id+"'").css({"stroke": "black","opacity":"1","stroke-width": 2})


            // highlight selected entity's circle
            $("circle#"+string_id).css({'fill':'black','stroke':'gray'});

            // selected artist
            if($(this).hasClass("artist")){
                $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});
                // highlight selected artist in the list
                $(".artist-list #"+string_id).css({"text-decoration":"underline"});
                // highlight selected artist on the physical map
                $("g.artist#"+string_id).css({"text-decoration":"underline"});
            }
            
            // selected category
            if($(this).hasClass("category")){
                // show selected category's modal
                $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","right":"18%", "margin-right":"0", "top":"10%"});
                // highlight this category on the list
                $("#category-list #"+string_id).css({"text-decoration":"underline"});
            }       

            // selected tag
            if($(this).hasClass("tag")){
                var tagArtist =  panel_id.substring(0, panel_id.length - 2);
                // highlight the artist of the tag in the list
                $(".artist-list #art_ID_" + tagArtist).css({"text-decoration":"underline"})
                // highlight the artist of the tag on physical map
                $("g.artist#art_ID_" + tagArtist).css({"text-decoration":"underline"})
                // show selected artist's modal
                $("#"+"ID_"+tagArtist).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});
                // highlight this tag on the list
                $("#tag-list #"+string_id).css({"text-decoration":"underline"});
                // highlight all the tags for this artist
            }



        });


    });

});
