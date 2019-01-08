(function () {
    "use strict";

    function switchItem(item, arrItemRange) {
        let activeItem = item;
        activateItem(activeItem);
        arrItemRange.forEach(function (item) {
            if (item.id !== activeItem.id) {
                deactivateItem(item);
            }
        });
    }

    function switchNavTab(index) {
        if (index !== window.navigation.tabIndex) {
            if (window.navigation.tabIndex === 0) {
                document.getElementById("_photo").style.display = "none";
            } else {
                document.getElementById("_tab" + window.navigation.tabIndex).style.display = "none";
            }
            document.getElementById("_tab" + index).style.display = "block";
            window.navigation.tabIndex = index;
        }
    }

    function switchContentTab(index) {
        if (index !== window._tab5.content.tabIndex) {
            document.getElementById("content_tab" + window._tab5.content.tabIndex).style.display = "none";
            document.getElementById("content_tab" + index).style.display = "block";
            window._tab5.content.tabIndex = index;
        }
    }

    function activateItem(item) {
        item.firstElementChild.style.display = "none";
        item.lastElementChild.style.display = "block";
    }

    function deactivateItem(item) {
        item.firstElementChild.style.display = "block";
        item.lastElementChild.style.display = "none";
    }

    function initializeTabs() {
        for(let i = 1; i < 6; i++) {
            document.getElementById("_tab" + i).style.display = i === window.navigation.tabIndex ? "block" : "none"
        }
    }

    function initializeToolbar(oToolbar, iIndex) {
        oToolbar.items.forEach(function(item, index) {
            item.firstElementChild.style.display = index === iIndex-1 ? "none" : "block";
            item.lastElementChild.style.display = index === iIndex-1 ? "block" : "none";
        })
    }

    function initializeContent() {
        for(let i = 1; i < 5; i++) {
            document.getElementById("content_tab" + i).style.display = i === window._tab5.content.tabIndex ? "block" : "none"
        }
    }

    function openPreview(id) {
        let oBody = document.getElementById("body");
        oBody.style.cssText =
            "filter: blur(4px) brightness(90%);" +
            "background-color: #ddd";
    }

    function closePreview() {
        let oBody = document.getElementById("body");
        oBody.style.cssText = "";
    }

    window.navigation = {
        tabIndex: 5
    };
    window._tab5 = {
        content: {
            tabIndex: 1
        }
    };
    window.onload = function () {
        let oLikes = {
            1: "256.478",
            2: "72.812",
            3: "156.402",
            4: "170.501",
            5: "850.236",
            6: "701.228",
            7: "146.408",
            8: "120.514",
            9: "540.264",
        }

        let oComments = {
            1: "6.148",
            2: "2.852",
            3: "6.402",
            4: "12.501",
            5: "15.236",
            6: "10.548",
            7: "146.408",
            8: "120.514",
            9: "540.264",
        }

        let btnReload = document.getElementById("_button01");
        let btnAddFriend = document.getElementById("_button02");
        let btnSettings = document.getElementById("_button03");

        let selContentToolbar = {};
        let itemOverview = document.getElementById("_button04");
        itemOverview.index = 1;
        let itemList = document.getElementById("_button05");
        itemList.index = 2;
        let itemMarked = document.getElementById("_button06");
        itemMarked.index = 3;
        let itemSaved = document.getElementById("_button07");
        itemSaved.index = 4;

        let selNavigationToolbar = {};
        let itemHome = document.getElementById("_button08");
        itemHome.index = 1;
        let itemSearch = document.getElementById("_button09");
        itemSearch.index = 2;
        let itemAddPicture = document.getElementById("_button10");
        itemAddPicture.index = 3;
        let itemActivity = document.getElementById("_button11");
        itemActivity.index = 4;
        let itemProfile = document.getElementById("_button12");
        itemProfile.index = 5;

        selContentToolbar.items = [itemOverview, itemList, itemMarked, itemSaved];
        selNavigationToolbar.items = [itemHome, itemSearch, itemAddPicture, itemActivity, itemProfile];

        selContentToolbar.items.forEach(function (item) {
            item.addEventListener("click", function() {
                switchItem(item, selContentToolbar.items);
                switchContentTab(this.index);
            });
        });

        selNavigationToolbar.items.forEach(function (item) {
            item.addEventListener("click", function() {
                switchItem(item, selNavigationToolbar.items);
                switchNavTab(this.index);
            });
        });

        let arrOverviewItems = document.getElementsByClassName("overview_item");
        Array.from(arrOverviewItems).forEach(function(item) {
            item.addEventListener("touchstart", function() {
                if (!window.bPhotoPressed) {
                    window.bPhotoPressed = true;
                    setTimeout(function() {
                        if (window.bPhotoPressed === true) {
                            openPreview();
                        }
                    }, 200);
                }

            });
            item.addEventListener("touchend", function() {
                closePreview();
                window.bPhotoPressed = false;
            });
            item.addEventListener("click", function(oEvent) {
                let oPhotoWrapper = document.getElementById("photo_wrapper");
                oPhotoWrapper.innerHTML = "<img src='" + oEvent.target.style.backgroundImage.slice(5,-2) + "'" +
                    "id='photo_full'>";
                setTimeout(function() {
                    document.getElementById("_tab" + window.navigation.tabIndex).style.display = "none";
                    window.navigation.tabIndex = 0;
                    document.getElementById("_photo").style.display = "block";
                }, 120);
            });
        });

        let itemNavBack = document.getElementById("nav_back");

        itemNavBack.addEventListener("click", function() {
            setTimeout(function(){
                document.getElementById("_tab5").style.display = "block";
                window.navigation.tabIndex = 5;
                document.getElementById("_photo").style.display = "none";
            }, 120);
        });

        initializeToolbar(selNavigationToolbar, window.navigation.tabIndex);
        initializeToolbar(selContentToolbar, window._tab5.content.tabIndex);
        initializeTabs();
        initializeContent();
    }
})();