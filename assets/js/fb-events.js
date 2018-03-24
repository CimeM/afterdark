<script>




  var todaysDate = new Date();
  var thisMonday = new Date();
  thisMonday.setDate(thisMonday.getDate() + (1 + 7 - thisMonday.getDay()) % 7);
  /*console.log(thisMonday);*/

  var d = new Date();
    var month = new Array();
    month[0] = "JAN";
    month[1] = "FEB";
    month[2] = "MAR";
    month[3] = "APR";
    month[4] = "MAY";
    month[5] = "JUN";
    month[6] = "JUL";
    month[7] = "AUG";
    month[8] = "SEP";
    month[9] = "OCT";
    month[10] = "NOV";
    month[11] = "DEC";



    var n = month[d.getMonth()];
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '431071407288985',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
    FB.AppEvents.logPageView();
    var token = "431071407288985|Wpg2oGMuVl5lguXu4k2e0be3n6w";


    /* make the API call */
    FB.api(
      '/ljubljanaafterdark/events?fields=cover,start_time,id,place,name&limit=100',
      'GET',
      {},
      function(response) {

        var counter = 0;
        var todayseventscounter = 0;
        /*filter for time - remove expired events*/
        for (var k = response.data.length-1; k > 0; k--) {
          if (new Date(response.data[k].start_time).getTime() < todaysDate.getTime() ){
            /*console.log(k);*/
            response.data.splice(k, 1);

          }else {
            /*dont delete cell*/
          };

        };
        /*console.log(response.data.length);*/
        for (var k = response.data.length-1; k > 0; k--) {
        /*for(var k in response.data) {
          //console.log(response.data[k]);*/


          fill = `
            <div class="col-xs-6 col-sm-6 col-md-4 event">
              <div class="thumbnail">
                <div class="thumbnailimage">
                  <img src="` + response.data[k].cover.source + `" alt="..." style='height: 100%; width: 100%; object-fit: contain'>
                </div>
                <div class="caption row" style="max-height: 350px;">
                  <div class="col-xs-3 date">
                    <h2s>`+ month[new Date(response.data[k].start_time).getMonth()] +`</h2s></br>
                    <h1s>`+ new Date(response.data[k].start_time).getDate() +`</h1s>
                  </div>
                  <div class="col-xs-9 meta" style="">
                    <h3s><a href="https://www.facebook.com/events/`+ response.data[k].id +`">` + response.data[k].name.substring(0, 25) + `</a></h3s></br>
                    <h4s>`+ response.data[k].place.name.substring(0, 12) +`</h4s>
                  </div>

                </div>
              </div>
            </div>
              `;

          fill1 = `
                <event>
                  <img class="thumbnail" src="` + response.data[k].cover.source + `" href="https://www.facebook.com/events/`+ response.data[k].id +`">
                  <div class="date">
                    <h2s>`+ month[new Date(response.data[k].start_time).getMonth()] +`</h2s></br>
                    <h1s>`+ new Date(response.data[k].start_time).getDate() +`</h1s>
                  </div>
                  <div class="meta">
                    <h3s><a href="https://www.facebook.com/events/`+ response.data[k].id +`">` + response.data[k].name.substring(0, 25) + `</a></h3s></br>
                    <h4s>`+ response.data[k].place.name +`</h4s>
                  </div>
                </event>
              `;
            if ( counter < 9
              && new Date(response.data[k].start_time).toDateString() == todaysDate.toDateString()
              ) {
              /*console.log(k);*/
              document.getElementById("firstpageresults").innerHTML += fill;
              todayseventscounter ++;
            }else if ( counter > 9
                        && counter < 19
                        || new Date(response.data[k].start_time).getTime() < thisMonday.getTime()
                        ){
              document.getElementById("secondpageresults").innerHTML += fill;
              console.log(fill);
            }
            if (todayseventscounter == 0) {
              document.getElementById("firstpageresults").innerHTML += `
              <p style="padding-top:40%; color:white;">No events today 💩</p>
              `;
              todayseventscounter++;
            }
            counter ++;

        }


      }
    , {access_token: token});
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
