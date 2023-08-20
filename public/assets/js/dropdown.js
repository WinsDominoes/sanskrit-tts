var options = [
    "bengali",
    "devanagari",
    "gujarati",
    "gurmukhi",
    "kannada",
    "malayalam",
    "oriya",
    "tamil",
    "telugu",
    "grantha",
    "grantamil",
    "hk",
    "iast",
    "iso15919",
    "itrans",
    "slp1",
    "velthuis",
    "wx"
];

$('#script').empty();
$.each(options, function(i, p) {
    $('#script').append($('<option></option>').val(p).html(p));
});
