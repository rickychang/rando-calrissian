Handlebars.registerHelper('appearance-label', function (title) {
    return 'label-' + title.toLowerCase().replace(/[\:,\;]|\s/g, '-');
});

var queryDict = {}

location.search.substr(1).split("&").forEach(function(item) {
    var queryKey = item.split("=")[0];
    var queryValue = item.split("=")[1];
    if (queryValue) {
        queryDict[queryKey] = queryValue.replace(/^\/|\/$/g, '');
    }
})
var character_slug = queryDict["c"];
var character_map = {};

$.getJSON("character_data.json", function (data) {
    for (var i = 0; i < data.length; i++) {
        character_map[data[i]['slug']] = data[i];
    }
    var slug_list = Object.keys(character_map);
    if (character_slug && character_map[character_slug]) {
        var character_data = character_map[character_slug];
        var source = $('#character_template').html();
        var template = Handlebars.compile(source);
        var html = template(character_data);
        $("#character_content").html(html);
    } else {
        window.location = '/?c=' + slug_list[Math.floor(Math.random() * slug_list.length)];
    }
});
