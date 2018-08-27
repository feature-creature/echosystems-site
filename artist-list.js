$(document).ready(function(){

    // show physical map
    $('#physical-map').click(function(){
       $('.connections-container, .info-container').addClass('hide');
       $('.map-container').removeClass('hide');
       $('#connections-map, #info-map').removeClass('active');
       $('#physical-map').addClass('active');
    });
    // show theme map
    $('#connections-map').click(function(){ 
        $('.map-container, .info-container').addClass('hide');
        $('.connections-container').removeClass('hide');
        $('#physical-map,#info-map').removeClass('active');
        $('#connections-map').addClass('active');
    });
    // show info page
    $('#info-map').click(function(){
        $('.connections-container,.map-container').addClass('hide');
        $('.info-container').removeClass('hide');
        $('#physical-map,#connections-map').removeClass('active');
        $('#info-map').addClass('active');
    });

    $.getJSON("names.json", function(data){
        var artists = [];

        $.each(data, function(key, val){
            artists.push("<p id='art_"+val.id+"' class='artist'>"+val.name+"</p>");
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
            $("#connections-map circle").css({'fill':'white',"stroke":'#ccc'});
            $("#exhibition-map g.artist circle").css({"display":"none"});
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



            // highlight associated entities
            for(var i = 0; i < dataset.edges.length; i++){
                if("art_" + dataset.edges[i].source.id == string_id || "art_" + dataset.edges[i].target.id == string_id){
                    $("circle#art_"+dataset.edges[i].target.id).css({'fill':'darkgray','stroke':'black'});
                    $("circle#art_"+dataset.edges[i].source.id).css({'fill':'darkgray','stroke':'black'});
                    if(dataset.edges[i].target.type == "artist"){
                        // $("g.artist#art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});
                        $("#exhibition-map g.artist#art_"+dataset.edges[i].target.id+" circle").css({"display":"block"});
                        $(".artist-list#art_"+dataset.edges[i].target.id).css({"text-decoration":"underline"});
                    }
                    if(dataset.edges[i].source.type == "artist"){
                        // $("g.artist#art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});
                        $("#exhibition-map g.artist#art_"+dataset.edges[i].source.id+" circle").css({"display":"block"});
                        $(".artist-list #art_"+dataset.edges[i].source.id).css({"text-decoration":"underline"});
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
            $("line[source='"+string_id+"']").css({"stroke": "black","opacity":"1","stroke-width": 2})
            $("line[target='"+string_id+"']").css({"stroke": "black","opacity":"1","stroke-width": 2})


            // highlight selected entity's circle
            $("circle#"+string_id).css({'fill':'black','stroke':'gray'});

            // selected artist
            if($(this).hasClass("artist")){
                $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});
                // highlight selected artist in the list
                $(".artist-list #"+string_id).css({"text-decoration":"underline"});
                // highlight selected artist on the physical map
                // $("g.artist#"+string_id).css({"text-decoration":"underline"});
                $("g.artist#"+string_id+" circle").css({"display":"block"});
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
            }
        });
    });
});
