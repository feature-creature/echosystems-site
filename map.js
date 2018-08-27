$(document).ready(function(){

    // load json data
    $.getJSON("names.json", function(data){
        var info_panels = [];

        // populate info_panels array with formatted html modals
        $.each(data, function(key, val){

            var categories = "";
            for(var i = 0; i < val.category.length; i++){
                var catId = ""
                for(var k = 0; k < 12; k++){
                    if(val.category[i].theme == dataset.nodes[k].name){
                        catId += "art_" + dataset.nodes[k].id;
                    }
                }

                categories += "<div id='"+ catId +"'' class='category other-themes'>"+val.category[i].theme+"</div>"
            }

            var tags = "";
            for(var i = 0; i < val.tag.length; i++){
                tags += "<div class='tag other-themes'>"+val.tag[i].name+"</div>"
             }

            var socials = "";
            var targeted = "";
            for(var i = 0; i < val.social.length; i++){
                Object.keys(val.social[i])[0] == "email" ? targeted = "" : targeted = "_blank";
                socials += "<br><br><a class='website' target='"+targeted+"' href='"+Object.values(val.social[i])[0]+"'>"+Object.keys(val.social[i])[0]+"</a>";
            }

            var websiteLink = "";

            if(val.website != ""){
                websiteLink = "<a class='website' target='_blank' href='"+val.website+"'>Website</a>";
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
                +websiteLink
                +socials
                +"</div></div>"
                );
        });

        // append html modals to artists list
        $("<div/>", {
            "class":"map-items",
            html: info_panels.join("")
        }).appendTo(".artists");

        // make current artist's modal visible
        $("#Names g").click(function(){
            var _id = $(this).attr("id");
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
        $(".artist-info .esc").click(function(){
            $(".artist-info").css("display", "none");
        });

        $(".category-info .esc").click(function(){
            $(".category-info").css("display", "none");
        });

    });
});


