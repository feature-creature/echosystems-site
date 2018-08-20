$(document).ready(function(){

    $.getJSON("names.json", function(data){
        var artists = [];

        $.each(data, function(key, val){
            artists.push("<p id='art_"+val.id+"' class='artist'>"+val.name+"</p>");
        });

        $("<div/>", {
            "class":"listed-artist", html: artists.join("")
        }).appendTo(".artist-list");

        $(".category,.artist,.tag").click(function(){

            // TODO:
            // categories (map and list) triggers category modal
            
            var string_id = $(this).attr("id"); //art_ID_SPECULATIVE
            var panel_id = string_id.substr(7); //SPECULATIVE
            
            // hide all artist modals
            $(".artist-info").css("display", "none");
            // show selected artist modal
            $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});
            // $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"50%","margin-left":"-212px", "top":"10%"});

            // reset all lines
            $("#connections-map line").css({"stroke": "gray","opacity":"1","stroke-width": 1})
            // highlight lines associated with selected artist
            $("line[source='"+string_id+"'").css({"stroke": "black","opacity":"1","stroke-width": 2})
            $("line[target='"+string_id+"'").css({"stroke": "black","opacity":"1","stroke-width": 2})

            
            // reset all circles
            $("circle").css({'fill':'white',"stroke":'#ccc'});

            // highlight associated entities circle
            for(var i = 0; i < dataset.edges.length; i++){
                if("art_" + dataset.edges[i].source.id == string_id || "art_" + dataset.edges[i].target.id == string_id){
                    $("circle#art_"+dataset.edges[i].target.id).css({'fill':'darkgray','stroke':'black'});
                    $("circle#art_"+dataset.edges[i].source.id).css({'fill':'darkgray','stroke':'black'});

                } 
            }

            // highlight selected artist's circle
            $("circle#"+string_id).css({'fill':'black','stroke':'gray'});

            // reset all listed artists
            $(".artist-list p").css({"text-decoration":"none"})
            // highlight selected artist in the list
            $(".artist-list #"+string_id).css({"text-decoration":"underline"})
            
            // open the modal for the artist of the tag
            if($(this).hasClass("tag")){
                var tagArtist =  panel_id.substring(0, panel_id.length - 2);
                console.log(tagArtist);
                $(".artist-list #art_ID_" + tagArtist).css({"text-decoration":"underline"})
                $("#"+"ID_"+tagArtist).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});

            }

        });


    });

});
