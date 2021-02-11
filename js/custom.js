$(document).ready(function(){
    $("#menu").click(function(e){
        $("#sidebarId").toggleClass("sidebar-hide");
        $("#menu").toggleClass("icon-hide");
        // $('.sidebar').toggle(function(){
        //     $(this).animate({left: '300px'});
        // },function(){
        //     $(this).animate({left: '0px'});
        // });
    });
});
$(".container").click(function(){
    if(!$('#menu').hasClass("icon-hide")){
        $("#menu").click();
    }
});

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function durationConvert(time){
    let hour = 0;
    let min = 0;
    hour = parseInt(time/(3600));
    time %= 3600;
    min = parseInt(time/60);
    return hour+"H - "+min+"M";
}
function timeConvert(time){
    let month = parseInt(time.slice(5,7));
    let year = parseInt(time.slice(2,4));
    let day = parseInt(time.slice(8,10));
    let hour = parseInt(time.slice(11,13));
    let min = parseInt(time.slice(14,16));
    return day+" "+months[month-1]+", "+year+" "+hour+":"+min;
}
let toRemove = "all";

showResult('all');
function showResult(api){
    document.getElementById(toRemove).classList.remove("active");
    document.getElementById(api).classList.add("active");
    toRemove = api;
    $('#upcomming_result').html("");
    $('#running_result').html("");
    $.getJSON("https://kontests.net/api/v1/"+api,
        function (data){
            for(let i = 0; i < data.length; i++){
                let img = api;
                let image = "";
                if(api == "all") img = data[i].site;
                for(let j = 0; j < img.length; j++){
                    if(!((img[j] == " ") || (img[j] == "_"))) image += img[j];
                }
                image = image.toLowerCase();

                if(data[i].status == 'BEFORE'){
                    let markup = `
                    <div class="mycard mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img src="image/`+image+`.png">
                            </div>
                            <div class="col-8 data">
                                <h4 class="header">`+data[i].name+`</h4>
                                <p>Duration : `+durationConvert(data[i].duration)+`</p>
                                <p>Start : `+timeConvert(data[i].start_time)+`</p>
                                <p>End : `+timeConvert(data[i].end_time)+`</p>
                                <p>Link : <a target="_blank" href="`+data[i].url+`">Click Here</a></p>
                            </div>
                        </div>
                    </div>
                    `;
                    $('#upcomming_result').append(markup);
                }else{
                    let markup = `
                    <div class="mycard mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img src="image/`+image+`.png">
                            </div>
                            <div class="col-8 data">
                                <h4 class="header">`+data[i].name+`</h4>
                                <p>Duration : `+durationConvert(data[i].duration)+`</p>
                                <p>End : `+timeConvert(data[i].end_time)+`</p>
                                <p>Link : <a href="`+data[i].url+`">Click Here</a></p>
                            </div>
                        </div>
                    </div>
                    `;
                    $('#running_result').append(markup);
                }
            }
        });
    };



    $('ul li').click(function(e){
        showResult(this.id);
    });