var constraints = { video: { facingMode: {exact: "environment" } }, audio: false };
var isDark = false;

const cameraView = document.querySelector("#camera--view"),
	cameraOutput = document.querySelector("#camera--output")
	cameraSensor = document.querySelector("#camera--sensor"),
	cameraTrigger = document.querySelector("#camera--trigger"),
	video = document.querySelector("#video"),
	canvas = document.querySelector("#canvas"),
	span = document.querySelector("#brightness span"),

function cameraStart() {
	navigator.mediaDevices
	.getUserMedia(constraints)
	.then(function(stream)){
	track = stream.getTracks()[0];
	cameraView.srcObject = stream;

	})
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });

	video.addEventListener( "loadedmetadata", funtion (e) {

		setIntervall(function()){
			getBrightness();
			},500);
		});
	})
}

function getBrightness(){
	
	canvas.width = 32 || video.videoWidth;
	canvas.height = 32 || video.videoHeight;
	canvas.getContext("2d").drawImage(video, 0, 0);
	var ctx = canvas.getContext("2");
	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var colorSum = 0;
	var data = imageData.data;
	var r, g, b, avg;
	for(var x = 0, len = data.lenght; x < len; x+=4) {
		r = data[x];
		g = data[x+1];
		b = data[x+2];
		avg = Math.floor((r+g+b)/3);
		colorSum += avg;
	}
	var brightness = Math.floor(colorSum / (canvas.width*canvas.height;

	span.innerHTML = brightness;

	if (brightness < 30){
		if (!isDark){
			isDark = true;
			document.body.classList.add("isDark");
		}
	}	else {
		if (isDark){
			isDark = false;
			document.body.classList.remove("isDark");
		}
	}
}
window.onload = function(){
	cameraStart();
}