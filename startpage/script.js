const NAME = "John";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = '' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Social",
        "items":[
            {"name": "YouTube", "shortcutKey": "", "url": "https://youtube.com/"},
            {"name": "Twitch", "shortcutKey": "", "url": "https://www.twitch.tv/"},
            {"name": "WhatsApp", "shortcutKey": "", "url": "https://web.whatsapp.com/"},
            {"name": "r/2007scape", "shortcutKey": "", "url": "https://www.reddit.com/r/2007scape/"},
            {"name": "r/archlinux", "shortcutKey": "", "url": "https://www.reddit.com/r/archlinux/"},
            {"name": "4chan", "shortcutKey": "", "url": "https://4chan.org/"}
        ]
    },
    {
        "groupName": "University",
        "items":[
            {"name": "uSis", "shortcutKey": "", "url": "https://usis.leidenuniv.nl:8011/psc/S4PRD/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL?"},
            {"name": "Webmail", "shortcutKey": "", "url": "https://adfs.vuw.leidenuniv.nl/adfs/ls/?client-request-id=e5330bad-be40-4612-c95b-66f2a41dcf78&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQQIARAAjZLNa9NgAMb3Nl3cHOrYURBBPAlv-775alIQ1qTtun6s7Ua2ZR5GkyZrmo-3TdKmy1_gceBNPImngRcv6hDx4MUJOvCinkQQhiDIvOzohhdv-vDw47n_nlsUzuD8TfQnDDwnRJaFoWGer78SLFycfzzHflt8uVB-c8c6eXTt_WQfXO9F0SDMZ7NkFLmEOBliWbZhZgziZUncyT4D4AiAYwD2UzmBFZF4Vp7hBB4JmBMzqGPkWF3nIWYsAXJdHkNJ4ETYMQQDYU7iBQZ9Tl1pFkZRjzkHCezEPEnNWiTwtgckjO5TP0FRG8t2uByXC0VdWodid5Oprqlxc3m4EyohMgO5uFJfg5FWwm3G491dNifKnu6t-N7Glt5yVpNaxV2KXbdXdXbchtcs9BVeMbgxJrZI6m1vt6clqteTq82yKC4XNY3UFd8Vtid6K8JRCMPSSrIVNEZCB3Y5ZCUhxE0-KVRybWJJ69om4iQ12lhXVVVvM2HA2rVyyWA3FbY7RIOGZ_qSA4NKFLSdVifpy0s1ewQrBUzUbavIB2043PEGsl6DRWxXLVHep_7L2BOKPtPgEf-QosnA9O3uV-pqyLI8YkRmcTyKM65pd01_5NvjjO8epcGXNPieTqGZ0zR4OH3m-8PHBye_3L36vXKcfpvk04fT2dKQ1QfahHFaRmOiRH3FQLXVJupx5qCMJB71NbMwdLY2xnx8W8zjPRrs0fQBPTtDzU_doJQWPqbBTxrcvTB1MPuv8xzNgVeXpk4vvzv99Pr50xc_Kr8B0&cbcxt=&username=s3350282%40vuw.leidenuniv.nl&mkt=&lc="},
            {"name": "Brightspace", "shortcutKey": "", "url": "https://brightspace.universiteitleiden.nl/d2l/home"},
            {"name": "Webprint", "shortcutKey": "", "url": "https://webprint.leidenuniv.nl/Account/Login?ReturnUrl=%2F"},
            {"name": "UB Leiden", "shortcutKey": "", "url": "https://catalogue.leidenuniv.nl/primo-explore/account?vid=UBL_V1&section=overview&lang=en_US"}
        ]
    },
    {
        "groupName": "Games",
        "items":[
            {"name": "Old School Runescape", "shortcutKey": "", "url": "https://osrs.game/"},
            {"name": "Cookie Clicker", "shortcutKey": "", "url": "https://orteil.dashnet.org/cookieclicker/"},
            {"name": "NYT Sudoku", "shortcutKey": "", "url": "https://www.nytimes.com/puzzles/sudoku/hard"},
            {"name": "GeoGuessr", "shortcutKey": "", "url": "https://www.geoguessr.com/"},
            {"name": "Chess.com", "shortcutKey": "", "url": "https://www.chess.com/home"},
            {"name": "Skribbl.io", "shortcutKey": "", "url": "https://skribbl.io/"}
            
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = (new Date().getHours()<10?'0':'')+new Date().getHours();
    //curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    //if (curHours == 4) curHours = 3;
    //let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    let welcome = curHours + ":" + (new Date().getMinutes() <10?'0':'')+new Date().getMinutes();
    document.getElementById("welcome-string").innerHTML = welcome;
    const date = new Date();
    let month = date.toLocaleString('en-US',{weekday: "long", month:'long',day:'numeric'});
    document.getElementById("date-string").innerHTML = month;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
