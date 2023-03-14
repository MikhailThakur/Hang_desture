Webcam.set({
    width:350,
    height:298,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cLtm3j99B/model.json',modelloaded);
function modelloaded(){
    console.log('modeloaded');
}
prediction_1="";
prediction_2="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the 1st prediction is"+prediction_1;
    speak_data_2="and the 2nd prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
    
}
function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="ok")
        {
            document.getElementById("update_emoji").innerHTML="👌🏽";
        }
        if(results[0].label=="high five")
        {
            document.getElementById("update_emoji").innerHTML="✋🏽";
        }
        if(results[0].label=="whats up")
        {
            document.getElementById("update_emoji").innerHTML="👊🏽";
        }
        
        if(results[1].label=="ok")
        {
            document.getElementById("update_emoji2").innerHTML="👌🏽";
        }
        if(results[1].label=="high five")
        {
            document.getElementById("update_emoji2").innerHTML="✋🏽";
        }
        if(results[1].label=="whats up")
        {
            document.getElementById("update_emoji2").innerHTML="👊🏽";
        }
    }
}