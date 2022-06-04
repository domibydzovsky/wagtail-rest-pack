export const ytsticky = function () {
    var elementTarget = document.getElementsByClassName("ytsticky");
    var isStickyClosed = false;
    var stickyState = 0;
    var stickyFunction = function (e: any) {
        var el = elementTarget[0];
        var wrapperelementTarget = document.getElementById("ytsticky-wrapper");
        var scrollelementTarget = document.getElementById("ytsticky-scroll-wrapper");
        var videoelementTarget = document.getElementById("ytsticky-video-wrapper");
        var scrollclosebtn = document.getElementById("ytsticky-close-btn");
        var scrollY = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        // @ts-ignore
        if (isStickyClosed === false && stickyState == 0 && scrollY > (wrapperelementTarget.offsetTop + wrapperelementTarget.offsetHeight)) {
            // @ts-ignore
            wrapperelementTarget.style.height = el.offsetHeight+"px";
            //wrapperelementTarget.style.width = el.offsetWidth+"px";
            // @ts-ignore
            wrapperelementTarget.style.width = "auto";

            stickyState = 1;

            //console.log("sticky on");
            // @ts-ignore
        }else if (isStickyClosed === false && stickyState == 1 && scrollY <= (wrapperelementTarget.offsetTop + wrapperelementTarget.offsetHeight)){
            closeSticky();

            //console.log("sticky off");
        }
    }

    function closeSticky() {
        //return;
        var wrapperelementTarget = document.getElementById("ytsticky-wrapper");
        var scrollelementTarget = document.getElementById("ytsticky-scroll-wrapper");

        //el.style.height = wrapperelementTarget.style.height;
        //el.style.width = wrapperelementTarget.style.width;
        // @ts-ignore
        el.style.height = "";
        // @ts-ignore
        el.style.width = "";
        // @ts-ignore
        el.style.minHeight = "";
        // @ts-ignore
        el.style.position = "relative";
        // @ts-ignore
        el.style.top = "";
        // @ts-ignore
        el.style.right = "";
        // @ts-ignore
        el.style.left = "";
        // @ts-ignore
        el.style.bottom = "";
        // @ts-ignore
        scrollelementTarget.style.position = "relative";
        // @ts-ignore
        scrollelementTarget.style.top = "";
        // @ts-ignore
        scrollelementTarget.style.right = "";
        scrollclosebtn.style.display = "none";
        // @ts-ignore
        wrapperelementTarget.style.height = "";
        // @ts-ignore
        wrapperelementTarget.style.width = "";
        stickyState = 0;
    }

    if (elementTarget.length) {
        var el = elementTarget[0];

        var wrapper = document.createElement("div");
        wrapper.id = "ytsticky-wrapper";
        wrapper.style.position = "relative";
        wrapper.style.display = "block";
        // @ts-ignore
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        var scrollwrapper = document.createElement("div");
        scrollwrapper.id = "ytsticky-scroll-wrapper";
        scrollwrapper.style.position = "relative";
        scrollwrapper.style.display = "block";
        // @ts-ignore
        el.parentNode.insertBefore(scrollwrapper, el);
        scrollwrapper.appendChild(el);

        var videowrapper = document.createElement("div");
        videowrapper.id = "ytsticky-video-wrapper";
        videowrapper.style.position = "relative";
        videowrapper.style.display = "block";
        // @ts-ignore
        el.parentNode.insertBefore(videowrapper, el);
        videowrapper.appendChild(el);

        var scrollclosebtn = document.createElement("span");
        scrollclosebtn.id = "ytsticky-close-btn";
        scrollclosebtn.innerHTML = "Close";
        scrollclosebtn.style.boxSizing = "border-box";
        scrollclosebtn.style.wordBreak = "normal";
        scrollclosebtn.style.padding = "5px 8px";
        scrollclosebtn.style.position = "absolute";
        scrollclosebtn.style.cursor = "pointer";
        scrollclosebtn.style.top = "0px";
        scrollclosebtn.style.right = "0px";
        scrollclosebtn.style.display = "none";
        scrollclosebtn.style.background = "#eee";
        scrollclosebtn.style.borderRadius = "10px";
        scrollclosebtn.style.lineHeight = "14px";
        scrollclosebtn.style.fontSize = "15px";
        scrollclosebtn.style.fontWeight = "bold";
        scrollclosebtn.style.zIndex = "9999";
        videowrapper.appendChild(scrollclosebtn);
        // @ts-ignore
        function closebtnFunction(event) {
            isStickyClosed = true;
            closeSticky();
            //console.log('closed');
            event.preventDefault();
        }
        scrollclosebtn.addEventListener("click", function(event){ closebtnFunction(event); });
        scrollclosebtn.addEventListener("touchstart", function(event){ closebtnFunction(event); });
        // @ts-ignore
        stickyFunction();
    }
    if (elementTarget.length) {
        window.addEventListener("scroll", stickyFunction);
        window.addEventListener("onload", stickyFunction);
        window.addEventListener("resize", stickyFunction);
        window.addEventListener("touchmove", stickyFunction);
    }
};