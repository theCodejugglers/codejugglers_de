var slang = localStorage?.getItem("lang");
var lang1 = slang ?? window.location.hostname.endsWith("de") ? "de" : "en";
function activateLang(lang1) {
	var lang2 = (lang1 === "de") ? "en" : "de";
	$('*[lang="'+lang2+'"]').hide();
	$('*[lang="'+lang1+'"]').show();
}
activateLang(lang1);
