/// <reference path="jquery-1.10.2.min.js" />
$(function () {
    seccTopNavigation();

    forceHomePageColsToHaveSameHeight(); //Name says it all

    setHeightForHomePageRightDivs(); //Name says it all

    changeOrderTotalsTaxText();

    seccImages();

    removeCertainWordsFromRecentlyViewedProdsBlock();

    fixColHeightsOnProdPage();

    addEmailWarning();

    hideCategorySidebars();

    addPlaceHoldersForPhoneInputs();

    customerInfoAndEstimatedShippingDropDown();

    stripProductNameFromVariants();

    centerBroadcastTable();

    moveHomePageLogoDiv();

    todaysDate();

    pageNotFoundLink();

    customerInfoExtraInfo();

    fixSearchPaginationUrls();

    //addingClickEventToDisabledAddToCartButton();
});

function forceHomePageColsToHaveSameHeight() {
    var homeLeftSide = $('#homePageLeft');
    var homeRightSide = $('#homePageRight');
    if (homeLeftSide.length && homeRightSide.length) {
        //ie11 is not rendering this correctly (surprise surprise), so I'll set a height for both THEN check for over flow
        homeLeftSide.height(800);
        homeRightSide.height(800);
        var longerHeight = Math.max(homeLeftSide.outerHeight(), homeRightSide.outerHeight());
        //check for overflow, have to use regular javascript
        var theLeft = document.getElementById('homePageLeft');
        var theRight = document.getElementById('homePageRight');
        if (theLeft && theRight) {
            if (theLeft.offsetHeight < theLeft.scrollHeight || theRight.offsetHeight < theRight.scrollHeight) {
                longerHeight += 120;
                $('.homePageCol').height(longerHeight);
            }
            else {
                $('.homePageCol').height(longerHeight);
            }
        }
    }
}

function setHeightForHomePageRightDivs() {
    if ($('#homePageMain').length) {
        var heightToWorkWith = $('#homePageRight').height() - $('#seccStoreHours').height();
        //var adSpaceHeight = heightToWorkWith * 0.6;
		var adSpaceHeight = 0;
        //$('#seccAdSpace').height(adSpaceHeight);
		if (heightToWorkWith < 250) {
			$('#seccRewards').height((heightToWorkWith - adSpaceHeight - 0));
		}
		else {
			$('#seccRewards').height((heightToWorkWith - adSpaceHeight));
			$('#seccRewards').css("margin-top","5%");
		}
    }
}

function changeOrderTotalsTaxText() {
    var theUrl = window.location.pathname.toString();
    if (theUrl.indexOf('cart') >= 0) {
        var taxSpan = document.getElementById('seccTax');
        if (taxSpan != null) {
            taxSpan.innerHTML = 'Calculated during checkout';
        }
        $('.order-total').html('Calculated during checkout');
    }
}

function seccTopNavigation() {
    var theUl = $('ul.sf-menu');
    theUl.append('<li><a href="/earn-rewards">Rewards</a></li>');

    var width = theUl.width();
    var liCount = $('ul.sf-menu > li').length; //number of li elements
    --liCount; //there's a reason I did this. Can't remember but it works.
    width = width - (liCount * 2); //same goes for this line. If I had more time I'd try to remember but alas time waits for no man. Though you could argue, if I have time to write these comments...
    ++liCount;
    width = width / liCount;
    $('ul.sf-menu > li').width(width);

    //do the same for the default nav bar cause still deciding between the default or the plugin
    var theMainUl = $('ul.top-menu');
    theMainUl.append('<li><a href="/earn-rewards">Rewards</a></li>');

    width = theMainUl.width();
    liCount = $('ul.top-menu > li').length;
    --liCount;
    width = width - (liCount * 2); //same goes for this line. If I had more time I'd try to remember but alas time waits for no man. Though you could argue, if I have time to write these comments...
    ++liCount;
    width = width / liCount;
    $('ul.top-menu > li').width(width);

}

function seccImages() {
    $('#seccRewards a, #earnRewards a').attr('href', '/earn-rewards');
    //$('#seccAdSpace a, #adSpace a').attr('href', '/building-bridges-and-making-connections');
    //$('#seccAdSpace a, #adSpace a').css('background', 'url(https://dev.livingword.org/Themes/seccNopTheme/Content/images/BuildingBridgesPromo.jpg)')
}

function removeCertainWordsFromRecentlyViewedProdsBlock() {
    var toolTips = $('#homePageLeft .block-recently-viewed-products .product-picture img[title^="Show details for"]');
    if (toolTips.length > 0) {
        toolTips.each(function () {
            var message = $(this).attr('title');
            message = message.replace('Show details for', '');
            $(this).attr('title', message);
        });
    }

}

function fixColHeightsOnProdPage() {
    var prodsLeft = $('#prodsLeftSide');
    var prodsRight = $('#prodsRightSide');
    if (prodsLeft.length && prodsRight.length) {
        var longerHeight = Math.max(prodsLeft.outerHeight(), prodsRight.outerHeight());
        if (longerHeight == prodsLeft.outerHeight()) {
            prodsLeft.css('border-right', '1px solid #cbcbcb');
        }
        else {
            prodsRight.css('border-left', '1px solid #cbcbcb');
        }
    }

}

function addEmailWarning() {
    var message = "To ensure delivery of email receipts and Living Word Rewards add orders@livingword.org and customerservice@livingword.org to your address book.";
	//message = message + "<p style='color:red;'><strong>Holiday Hours - <br />Orders placed after 3 pm on Saturday, December 23rd will not be shipped until Tuesday 1/2/2016 when the Living Word will resume its regular hours. Downloadable products will continue to be available immediately at the time of purchase.</strong></p>";
    $('.page.registration-page .page-title').append('<p class="emailInformation">' + message + '</p>');
    $('.customer-blocks .register-block .text').append('<p class="emailInformation">' + message + '</p>');
    $('.order-summary-content .common-buttons').append('<p class="emailInformation">' + message + '</p>');
}

function hideCategorySidebars() {
    var theUrl = window.location.pathname.toString();
    if (theUrl.indexOf('registerresult') >= 0) {
        $('div.side-2').hide();
    }
    if (theUrl.indexOf('passwordrecovery') >= 0) {
        $('div.side-2').hide();
    }
}

function addPlaceHoldersForPhoneInputs() {
    var phone = $('#Phone');
    if (phone.length) {
        addAttribute(phone);
    }
    var otherPhone = $('#Address_PhoneNumber');
    if (otherPhone.length) {
        addAttribute(otherPhone);
    }
    var otherPhone2 = $('#BillingNewAddress_PhoneNumber');
    if (otherPhone2.length) {
        addAttribute(otherPhone2);
    }
    var otherPhone3 = $('#ShippingNewAddress_PhoneNumber');
    if (otherPhone3.length) {
        addAttribute(otherphone3);
    }
}

function addAttribute(phoneInput) {
    phoneInput.attr('placeholder', 'xxx-xxx-xxxx');
}

function customerInfoAndEstimatedShippingDropDown() {
    //$('.registration-page #CountryId option:eq(0), .shipping-options #CountryId option:eq(0), .customer-info-page #CountryId option:eq(0)').removeAttr('selected');
    //$('.registration-page #CountryId option:eq(1), .shipping-options #CountryId option:eq(1), .customer-info-page #CountryId option:eq(1)').attr('selected', 'true');
    //$('.customer-info-page #CountryId option:eq(0)').remove();
    //$('#CountryId').change();
    $('.shipping-options #CountryId option:eq(0)').removeAttr('selected');
    $('.shipping-options #CountryId option:eq(1)').attr('selected', 'true');
    $('.shipping-options #CountryId option:eq(0)').remove();
}

function stripProductNameFromVariants() {
    var prodName = $('.product-name > h1');
    if (prodName.length > 0) {
        prodName = $.trim(prodName.html());
        var ddlOptions = $('#ddlProductVariants option');
        ddlOptions.each(function () {
            var variantOption = $(this).html();
            variantOption = variantOption.replace(prodName, '');
            $(this).html(variantOption);
        });
        if (ddlOptions.length == 2) {
            var htmlValue = ddlOptions.eq(1).html(); //
            var strongHtmlValue = $.trim($('.product-variant-list strong').html());
            $('.product-variant-list strong').html(strongHtmlValue + " " + htmlValue)
            
            var idValue = ddlOptions.eq(1).val();
            $('div[id=addtocart_container]').show();
            $('div[id=addtocart_' + idValue + ']').show();
            $('#temp-controls').hide();

            $('#ddlProductVariants').css('display', 'none');
            $('.product-variant-list .add-to-cart-button, .product-variant-list .qty-input, .product-variant-list .add-to-wishlist-button').removeAttr('disabled');

        }
    }
}

function centerBroadcastTable() {
    var theTable = $('table.stripe');
    if (theTable.length > 0) {
        theTable.css('margin', '0 auto');
    }
}

function moveHomePageLogoDiv() {
    var logoDiv = $('.header-logo');
    $('.header-selectors-wrapper').after(logoDiv);
    logoDiv.css('margin-top', '-85px');
}

function todaysDate() {
    $('#calendar .today').removeAttr('class');
    var months = ["January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"];

    var today = new Date();
    var dateToday = today.getDate().toString();
    var dateTodayPattern = "(<\w*.*>)*" + dateToday + "<?";
    var datePattern = new RegExp(dateTodayPattern);

    var month = today.getMonth();
    var monthPattern = new RegExp(months[month].toUpperCase());
    var monthCaption = $.trim($('#cal').html());

    $('#calendar > tbody > tr > td').each(function () {
        if (monthCaption != '') {
            if (monthPattern.test(monthCaption.toUpperCase())) {
                if (datePattern.test($.trim($(this).html()))) {
                    $(this).addClass('today');
                    return false;
                }
            }
        }
    });

    var daysOfFifthWeek = $('#calendar tr.fifthWeek td');
    var daysOfSixthWeek = $('#calendar .sixthWeek td');

    $('.fifthWeek').hide();
    $('.sixthWeek').hide();

    if (daysOfFifthWeek.length > 0) {
        daysOfFifthWeek.each(function () {
            if ($.trim($(this).html()) != '' && $.trim($(this).html()) != null && $.trim($(this).html()) != '&nbsp;') {
                $('.fifthWeek').show();
                return false;
            }
        });
    }

    if (daysOfSixthWeek.length > 0) {
        daysOfSixthWeek.each(function () {
            if ($.trim($(this).html()) != '' && $.trim($(this).html()) != null && $.trim($(this).html()) != '&nbsp;') {
                $('.sixthWeek').show();
                return false;
            }
        });
    }
}

function pageNotFoundLink() {
    $('#pageNotFoundLink').attr('href', 'https://dev.livingword.org').html('Living Word Home');
}

function customerInfoExtraInfo() {
    var msg = "Use this screen to update username (email address and phone number. This WILL NOT update your billing information. To update your billing and email address for order notifications go to Addresses under 'My Account'";
    $('#extraInfo').html(msg).css('color', '#C26161');
}

function fixSearchPaginationUrls() {
    $('.search-results .pager li a').each(function () {
        var href = $(this).attr('href');
        var newhref = href.replace("/search?As", "/search?Q=&As");
        $(this).attr('href', newhref);
    });
}

function addingClickEventToDisabledAddToCartButton() {
    //var addToCartButton = $('#temp-controls .add-to-cart-button');
    //addToCartButton.after('<div id="clickedObj" style="position:absolute; left:0; right:0; top:0; bottom:0;"></div>');
    //$('#clickedObj').click(function () {
    //    alert('You must choose a format');
    //});
    $('#temp-controls').hover(
        function () {
            $('#ddlProductVariants').after('<span id="theWarning" style="color:red; padding-left:5px">Please select a format</span>');
        },
        function () {
            $('#theWarning').remove(); 
        }
    );

}