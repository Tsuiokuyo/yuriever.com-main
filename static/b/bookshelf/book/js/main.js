 $(document).ready(function(){

//背景更改
$('.blue').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('section').css({'background-color':'#F2F7FB','color':'black'});
  });
$('.green').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('section').css({'background-color':'#C7EDCC','color':'black'});
  });

$('.black').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('section').css({'background-color':'#3C3D3C','color':'#dddddd'});
  });

$('.white').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('section').css({'background-color':'#dddddd','color':'black'});
  });
$('.Navajo').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('section').css({'background-color':'#FFDEAD','color':'black'});
  });

//文字大小更改
$('.big').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('.story').css('font-size','18px');
  });

$('.normal').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('.story').css('font-size','16px');
  });

$('.small').on('click',function(e){
    event.preventDefault();//取消預設行為
    $('.story').css('font-size','14px');
  });
});
 $(function() {
  try {
    navigator.getBattery().then(function(battery) {
      function update() {
        $('#battery-status').html(
          (battery.charging?'':('<span class="glyphicon glyphicon-flash"></span>'+parseInt(battery.level*10000)/100+'%'))
          );
      }
      battery.onchargingchange=battery.onlevelchange=update;
      update();
    });
  } catch(_) {}
})
 function gettime() {
  var time=new Date();
  $('#timebar').text(
    (time.getHours()<10?('0'+time.getHours()):time.getHours())+':'+
    (time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes())
    );
}
gettime();

function infoswitch() {
  $('#infobar>p').fadeToggle(200);
}