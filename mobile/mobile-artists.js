$(document).ready(function(){
    
    $.getJSON("names.json", function(data){
        
        
            var info_panels =[];
            var artist_list =[];
        
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
    
     $.each(data, function(key, val){
           
         
            list_id = val.id.substr(3);
         
            artist_list.push("<p id='"+list_id+"' class='artist-name'>"+val.name+"</p>");
         
        
         
            var categories = "";
            for(var i = 0; i < val.category.length; i++){
                var catId = ""
                for(var k = 0; k < 12; k++){
                    if(val.category[i].theme == dataset.nodes[k].name){
                       catId += dataset.nodes[k].id;
                    }
                }
                
                categories += "<div id='"+ catId +"'"+"class='category other-themes'>"+val.category[i].theme+"</div>"
            
                
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

                
            
            info_panels.push("<div id='"+val.id+"' class='artist-info'><div class='esc'>x</div><div class='name'>"+val.name+"</div><div id='category-list'>"+categories+"</div><div class='bio'>"+val.bio+"</div>"+websiteLink+socials+"</div></div>");
            
           var g_id = val.id.substr(3);
            console.log(g_id);
            
            var orig_id = $("#"+g_id).attr("id");
            console.log(orig_id);
            
            if(orig_id == g_id){
                console.log("Test");
            $("#"+g_id).addClass("'"+val.category[0].theme +"'");
                
            }
            
            });
        
        $("<div/>", {
            "class":"artist-name",
            html: artist_list.join("")
            
        }).appendTo(".list");
        
        
        $("<div/>", {
            "class":"artist-desc",
            html: info_panels.join("")
        }).appendTo(".artists");
        
        
         $(".artist-info").css("display", "none");
        
         $(".artist-name").click(function(){
              
              var _id = $(this).attr("id");
              console.log(_id);
              
            
              
              $("#"+"ID_"+_id).css({"display":"block"}); 
              
              
              
          });
        
         $(".esc").click(function(){
              
              $(".artist-info").css({"display":"none", "width":"90%", "height":"auto"});
              
          });
        
    
    
});
});