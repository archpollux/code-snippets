function treeize(container, tree) {
    function rnd(max) {
        return Math.floor(Math.random() * max);
    }

    function rndColour() {
        return [rnd(25)+230, rnd(25)+230, rnd(25)+230];
    }

    var key, item, div, text, colour;

    container = $(container) || $('body');

    for (key in tree) {
        item = tree[key];
        d = $('<div class="container"/>');
        colour = rndColour();
        d.css('background-color', 'rgb(' + colour.join(', ') + ')');
        d.css('color', 'rgb(' + colour.map(function (el) {
            return 255 - el;
        }).join(', ') + ')');

        text = $('<div class="title"/>');
        text.css('display', 'block');
        text.css('width', '100%');
        text.html(item.title);

        d.append(text);
        container.append(d);

        if (item['children'] != undefined) treeize(d, item.children);
    }
}

function parseMarkup(str) {
    function levelRegex(level) { return new RegExp('^\\s{' + level + '}'); }
    function parseMarkupLevel(level, lines) {
        var curLvl = levelRegex(level);
        var nextLvl = levelRegex(level+1);
        var results = [];
        while ( lines.length && lines[0].match(curLvl) ) {
            var line = lines.shift();
            var matches = line.match(/- (.+)$/);
            results.push({title: matches[1]});
            if ( lines.length && lines[0].match(nextLvl) ) results[results.length-1].children = parseMarkupLevel(level+1, lines);
        }
        
        return results;v
    }
    var lines = str.split("\n");
    return parseMarkupLevel(0, str.split("\n"));
}

var testTree = [{
    text: "Root",
    children: [{
        text: "Item 1"
    }, {
        text: "Item 2",
        children: [{
            text: "Item 3"
        }, {
            text: "Item 4"
        }]
    }]
}];

$('#inputString').keypress(function(event) {
    $('#pollux').empty();
    treeize($('#pollux'), parseMarkup($('#inputString').val()));
});
$('#pollux').empty();
treeize($('#pollux'), parseMarkup($('#inputString').val()));
