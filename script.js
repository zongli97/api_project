
    //
// These are the API URLS to use:
// https://jokes.p.rapidapi.com/joke/random
// https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize
//
"use strict";

$("#div-joke").show();
$("#div-speech").hide();
// supporting functions
function generate_joke(){

    var settings = {
        "async": true,
	"crossDomain": true,
	"url": "https://jokes10.p.rapidapi.com/api/jokes/random",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "jokes10.p.rapidapi.com",
		"x-rapidapi-key": "4ab27cc78bmsh823326e5d045bfap1e9051jsn41fe3cfc5933"
    }
}
    $.getJSON(settings).done(function(joke){
        console.log(joke);

        let setup = joke[0].joke_text;
        let punchline = joke[0].joke_punchline;
        let text = "<div class='bg-setup'>" + setup + "</div>" + 
        "<div class='bg-punchline'>" + punchline + "</div>" + "<br>";
        $('#get_joke').append(text);
    })
}

function generate_speech(){
    var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-host": "cloudlabs-text-to-speech.p.rapidapi.com",
		"x-rapidapi-key": "4ab27cc78bmsh823326e5d045bfap1e9051jsn41fe3cfc5933"
	},
	"data": {
		"voice_code": "en-US-1",
		"text": $('#pastetext').val(),
		"output_type": "audio_url"
	}
}

$.post(settings).done(function (speech) {
	console.log(speech);

    let audiolink = speech.result.audio_url;
    document.getElementById("audioPlayer").src = audiolink;
});
}

// click handlers

$('#btn_random_joke').click(function(){
	generate_joke();
})

$('#btn_hear_joke').click(function(){
    $("#div-joke").hide();
    $("#div-speech").show();
})

$('#btn_hear_speech').click(function(){
    let text=$('#pastetext').val()
    if(text==''){
    $('#confirmation').removeClass();
    $('#confirmation').html('Please type or paste a joke!');
    $('#confirmation').addClass('alert alert-danger');
}
    else{
    $('#confirmation').removeClass();
    $('#confirmation').html('');
    generate_speech();
}
})

$('#btn_another_joke').click(function(){
    $("#div-joke").show();
    $("#div-speech").hide();
})
