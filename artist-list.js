$(document).ready(function(){

    $.getJSON("names.json", function(data){
        var artists = [];

        $.each(data, function(key, val){
            artists.push("<p id='art_"+val.id+"' class='artist'>"+val.name+"</p>");
        });

        $("<div/>", {
            "class":"listed-artist", html: artists.join("")
        }).appendTo(".artist-list");

        $(".artist,.tag").click(function(){
            $(".artist-info").css("display", "none");

            var string_id = $(this).attr("id");
            var panel_id = string_id.substr(7);
            $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"18%", "margin-left":"0", "top":"10%"});
            // $("#"+"ID_"+panel_id).css({"display":"block", "position":"fixed","left":"50%","margin-left":"-212px", "top":"10%"});
            
            // reset circles and highlight selected
            $("circle").css({'fill':'white',"stroke":'#ccc'});
            $("circle#"+string_id).css({'fill':'black','stroke':'gray'});
            // reset lins and highlight selected
            $("#connections-map line").css({"stroke": "black","opacity":"1","stroke-width": 1})
            $("line[source='"+string_id+"'").css({"stroke": "black","opacity":"1","stroke-width": 1})

            // artist list
            $(".artist-list p").css({"text-decoration":"none"})
            $(".artist-list #"+string_id).css({"text-decoration":"underline"})
            
            // cl = $("line[source='"+string_id+"'").attr("target");
            // console.log(cl);
            // $("circle#"+cl[0]).css({'fill':'gray','stroke':'gray'});

        });


    });

});
