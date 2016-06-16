$(document).ready(function () {
    var added = false; // is element added
    function showBanner() {
        if (!added && $(window).width() <= 768) {
            console.log('added');
            $('.download-banner').slideDown();
            added=true;
        }else if(added && $(window).width() > 768){
            console.log('removed');
            $('.download-banner').slideUp();
            added=false;
        }
    }


    //close banner button
    $('.fa-close').on('click',function () {
       $('.download-banner').slideUp();
        
    });
    $(window).resize(showBanner);

    showBanner();
});