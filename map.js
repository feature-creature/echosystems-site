$(document).ready(function(){

    // load json data
    $.getJSON("names.json", function(data){
        var info_panels = [];

        // populate info_panels array with formatted html modals
        $.each(data, function(key, val){

            var categories = "";
            for(var i = 0; i < val.category.length; i++){
                categories += "<div class='other-themes'>"+val.category[i].theme+"</div>"
            }

            var tags = "";
            for(var i = 0; i < val.tag.length; i++){
                tags += "<div class='other-themes'>"+val.tag[i].name+"</div>"
                $("#tag-list").append("<p class='personal-theme'>"+val.tag[i].name+"</p>");

            }


            info_panels.push(
                "<div id='"
                +val.id+"' class='artist-info'><div class='esc'>x</div><div class='name'>"
                +val.name+"</div>"
                +categories
                +tags
                +"<div class='bio'>"
                +val.bio+"</div>"
                // +"<div class='project'>"+val.project+"</div>"
                +"<a class='website' href='"+val.website+"'>Website</a></div></div>");
        });

        // append html modals to artists list
        $("<div/>", {
            "class":"map-items",
            html: info_panels.join("")
        }).appendTo(".artists");

        // make current artist's modal visible
        $("#Names g").click(function(){
            var _id = $(this).attr("id");
            console.log(_id);
            $(".artist-info").css("display", "none");
            $("#ID_"+_id).css({
                "display":"block",
                "position":"fixed",
                "left":"18%",
                "margin-left":0,
                "top":"10%"
            });

            $('circle').css({'fill':'white',"stroke":'#ccc'});
            $("circle#art_ID_"+_id).css({'fill':'black','stroke':'gray'});

            // artist list
            $(".artist-list p").css({"text-decoration":"none"})
            $(".artist-list #art_ID_"+_id).css({"text-decoration":"underline"})

        });

        // hide the current visible modal
        $(".esc").click(function(){
            $(".artist-info").css("display", "none");
        });

        // example theme highlighting on map
        $(".theme_1").click(function(){
            $(".theme_1").css("color", "#ff000");
            $("g text").css("fill","#ff0000");
        });
    });
});


