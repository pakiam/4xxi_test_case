$(document).ready(function () {
    var added = false; // is element added
    var $downloadBanner=$('.download-banner');
    function showBanner() {
        if (!added && $(window).width() <= 768) {
            console.log('added');
            $downloadBanner.slideDown();
            added=true;
        }else if(added && $(window).width() > 768){
            console.log('removed');
            $downloadBanner.slideUp();
            added=false;
        }
    }


    //close banner button
    $('.fa-close').on('click',function () {
        $downloadBanner.slideUp();

    });
    $(window).resize(showBanner);

    showBanner();
});