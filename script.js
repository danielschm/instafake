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
            document.getElementById("_tab" + window.navigation.tabIndex).style.display = "none";
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

    window.navigation = {
        tabIndex: 5
    };
    window._tab5 = {
        content: {
            tabIndex: 1
        }
    };
    window.onload = function () {

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

        initializeToolbar(selNavigationToolbar, window.navigation.tabIndex);
        initializeToolbar(selContentToolbar, window._tab5.content.tabIndex);
        initializeTabs();
        initializeContent();
    }
})();