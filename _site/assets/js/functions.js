$("document").ready(function() {
    var search = "";
    var myurl = 'https://en.wikipedia.org/w/api.php?callback=?';

    $("#searchQuery").on("input", function(event){
        search = event.target.value;
    });


    $("#myForm").on("submit", function(event){
        event.preventDefault();
        $("#wikiLinks").empty();
        getApiData(search);
    });

    function getApiData(theQuery) {

        $.ajax({
            type:"GET",
            url: myurl,
            dataType: "jsonp",
            data: {
               action: "opensearch",
               list: 'search',
               format: "json",
               search: theQuery,
               limit: 10
           },
            success: function(jsondata) {

                var titleArray = [];
                var descArray = [];
                var linkArray = [];

                $.each(jsondata[1], function(i, v){
                    titleArray.push(v);
                });
                $.each(jsondata[2], function(i, v){
                    descArray.push(v);
                });
                $.each(jsondata[3], function(i, v){
                    linkArray.push(v);
                });

                for (i = 0; i < titleArray.length; i++) {
                    $("#wikiLinks").append(
                        "<a href='"+ linkArray[i] +"'><div class='container block'><div class='title'><p>" + titleArray[i] + "</p></div><div class='info'><p>"+ descArray[i]+"</p></div></div></a>"
                    );
                }
            }
        });

    }

    function buttonColor () {
        $("#searchButton").on("mouseenter", function(){
            $(this).addClass('activeButton');
        });
        $("#searchButton").on("mouseleave", function() {
            $(this).removeClass('activeButton');
        });
    }

    buttonColor();
});
