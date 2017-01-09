/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _layout = __webpack_require__(1);

	var _layout2 = _interopRequireDefault(_layout);

	var _loadOfVideos = __webpack_require__(2);

	var _loadOfVideos2 = _interopRequireDefault(_loadOfVideos);

	var _creationOfPages = __webpack_require__(3);

	var _creationOfPages2 = _interopRequireDefault(_creationOfPages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	window.onload = init;

	var form = document.createElement("form");
	form.id = "searchForm";
	var searchLine = document.createElement("input");
	searchLine.type = "search";
	searchLine.id = "searchLine";
	searchLine.placeholder = "I want to watch...";
	var searchButton = document.createElement("a");
	searchButton.id = "searchButton";
	var main = document.createElement("main");
	var ulFOrAllComponents = document.createElement("ul");
	ulFOrAllComponents.className = "mainUl";
	var paging = document.createElement("div");
	paging.className = "paging";

	function init() {
	  var body = document.body;
	  body.appendChild(form);
	  form.appendChild(searchButton);
	  form.appendChild(searchLine);
	  body.appendChild(main);
	  main.appendChild(ulFOrAllComponents);
	  body.appendChild(paging);
	}

	exports.searchLine = searchLine;
	exports.searchButton = searchButton;
	exports.ulFOrAllComponents = ulFOrAllComponents;
	exports.main = main;
	exports.paging = paging;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _layout = __webpack_require__(1);

	var _layout2 = _interopRequireDefault(_layout);

	var _creationOfPages = __webpack_require__(3);

	var _creationOfPages2 = _interopRequireDefault(_creationOfPages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var searchLine = _layout2.default.searchLine;
	var searchButton = _layout2.default.searchButton;
	var ulFOrAllComponents = _layout2.default.ulFOrAllComponents;
	var main = _layout2.default.main;
	var paging = _layout2.default.paging;
	var createPages = _creationOfPages2.default.createPages;
	var PageCounter = _creationOfPages2.default.PageCounter;
	var li = void 0;
	var pageForSwitch1 = void 0;
	var pageSwitchPrev = void 0;
	var pageSwitchNext = void 0;
	var pageCurrent = void 0;
	var aTitle = void 0;
	var preview = void 0;
	var prevImg = void 0;
	var prevDiv = void 0;
	var channel = void 0;
	var description = void 0;
	var dateOfPublication = void 0;
	var liToDelete = void 0;
	var count = 0;
	var pages = void 0;
	var nextPage = "";
	var search = "";
	var views = void 0;

	searchLine.addEventListener("keyup", searchFunc);
	searchButton.addEventListener("mouseup", loadOfVideos);
	paging.addEventListener("mouseup", pagingFunc);
	document.addEventListener("mouseover", mouseOverPages);
	document.addEventListener("mouseout", mouseOut);

	function searchFunc() {
	    search = searchLine.value;
	    search = searchVal();
	}

	function loadOfVideos() {
	    var videoObj = void 0;
	    var xhr = new XMLHttpRequest();
	    var src = "https://www.googleapis.com/youtube/v3/search?pageToken=" + nextPage + "&part=snippet&maxResults=15&q=" + search + "&key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y";
	    var videoBlock = void 0;
	    xhr.open("GET", src, true);
	    xhr.send();

	    xhr.onload = function () {
	        videoBlock = JSON.parse(xhr.responseText)["items"];
	        nextPage = JSON.parse(xhr.responseText).nextPageToken;

	        for (var i = 0; i < videoBlock.length; i++) {

	            videoObj = {
	                title: videoBlock[i].snippet.title,
	                watchVideo: "https://www.youtube.com/watch?v=" + videoBlock[i].id.videoId,
	                channelTitle: videoBlock[i].snippet.channelTitle,
	                publishedAt: videoBlock[i].snippet.publishedAt.slice(0, -14),
	                description: videoBlock[i].snippet.description,
	                thumbnails: videoBlock[i].snippet.thumbnails.medium.url
	            };
	            addElem();
	            aTitle.innerHTML = videoObj.title;
	            aTitle.href = videoObj.watchVideo;
	            prevImg.src = videoObj.thumbnails;
	            channel.innerHTML = videoObj.channelTitle;
	            dateOfPublication.innerHTML = videoObj.publishedAt;
	            description.innerHTML = videoObj.description;
	        }
	        pages = new PageCounter();
	        ulFOrAllComponents.style.width = pages.countPages();
	        document.addEventListener("mousedown", moveFunc);
	        window.addEventListener("resize", function () {
	            if (document.body.clientWidth < 600) {
	                ulFOrAllComponents.style.width = "calc(100vw *" + ulFOrAllComponents.children.length + ")";
	                pages.count = Math.ceil(ulFOrAllComponents.children.length);
	                pages.pageCount();
	                if (count > pages.pageCount()) {
	                    count = pages.pageCount() - 2;
	                }
	            } else if (document.body.clientWidth < 900) {
	                ulFOrAllComponents.style.width = "calc(50vw *" + ulFOrAllComponents.children.length + ")";
	                pages.count = Math.ceil(ulFOrAllComponents.children.length / 2);
	                pages.pageCount();
	                if (count > pages.pageCount()) {
	                    count = pages.pageCount() - 2;
	                }
	            } else if (document.body.clientWidth < 1200) {
	                ulFOrAllComponents.style.width = "calc(33.3vw *" + ulFOrAllComponents.children.length + ")";
	                pages.count = Math.ceil(ulFOrAllComponents.children.length / 3);
	                pages.pageCount();
	                if (count > pages.pageCount()) {
	                    count = pages.pageCount() - 2;
	                }
	            } else {
	                ulFOrAllComponents.style.width = "calc(25vw *" + ulFOrAllComponents.children.length + ")";
	                pages.count = Math.ceil(ulFOrAllComponents.children.length / 4);
	                pages.pageCount();
	                if (count > pages.pageCount()) {
	                    count = pages.pageCount() - 2;
	                }
	            }
	        });
	    };

	    if (paging.children.length === 0) {
	        addpageForSwitch();
	    }
	}

	function pagingFunc(e) {
	    var pageQuentity = pages.pageCount();

	    if (e.target.id === "pageSwitchNext" && count < pageQuentity) {
	        ulFOrAllComponents.style.transition = "transform 0.7s";
	        ulFOrAllComponents.style.transform = "translate3D(-" + document.body.clientWidth * count + "px, 0px, 0px)";
	        count++;
	        pageSwitchNext.innerHTML = count + 2;
	        pageCurrent.innerHTML = count + 1;
	    } else if (e.target.id === "pageSwitchPrev" && count > 0) {
	        count--;
	        ulFOrAllComponents.style.transition = "transform 0.7s";
	        ulFOrAllComponents.style.transform = "translate3D(-" + document.body.clientWidth * (count - 1) + "px, 0px, 0px)";
	        pageSwitchPrev.innerHTML = count;
	        pageCurrent.innerHTML = count + 1;
	    } else if (e.target.id === "pageSwitch1") {
	        ulFOrAllComponents.style.transition = "transform 0.7s";
	        ulFOrAllComponents.style.transform = "translate3D(0px, 0px, 0px)";
	        count = 0;
	        pageSwitchPrev.innerHTML = "<";
	        pageCurrent.innerHTML = 1;
	    } else if (e.target.id === "pageSwitchPrev" && count === 0) {
	        count = 0;
	    }
	    if (count === pageQuentity - 1) {
	        loadOfVideos();
	    }
	}

	function mouseOverPages(e) {
	    if (e.target === pageSwitchNext) {
	        pageSwitchNext.innerHTML = count + 2;
	    }
	    if (e.target === pageSwitchPrev && count > 1) {
	        pageSwitchPrev.innerHTML = count;
	    } else if (e.target === pageSwitchPrev && count <= 1) {
	        pageSwitchPrev.innerHTML = "<";
	    }
	}
	function mouseOut(e) {
	    if (e.target === pageSwitchNext) {
	        pageSwitchNext.innerHTML = ">";
	    }
	    if (e.target === pageSwitchPrev) {
	        pageSwitchPrev.innerHTML = "<";
	    }
	}

	function moveFunc(e) {
	    var pageQuentity = pages.pageCount();
	    var shift = void 0;

	    if (!e.touches) {
	        shift = e.pageX;
	    } else {
	        shift = e.touches[0].pageX;
	    }

	    function mouseDownFunc(e) {
	        e.preventDefault();
	        var eventMove = void 0;
	        if (!e.touches) {
	            eventMove = e.pageX;
	        } else {
	            eventMove = e.touches[0].pageX;
	        }
	        ulFOrAllComponents.style.transform = "translate3D(-" + (document.body.clientWidth * count + eventMove - shift) + "px, 0px, 0px)";
	    }
	    document.addEventListener("mousemove", mouseDownFunc);
	    document.addEventListener("touchstart", mouseDownFunc);

	    function removeListener(e) {
	        var eventMove = void 0;
	        if (!e.changedTouches) {
	            eventMove = e.pageX;
	        } else {
	            eventMove = e.changedTouches[0].pageX;
	        }
	        document.removeEventListener("mousemove", mouseDownFunc);
	        document.removeEventListener("touchstart", mouseDownFunc);

	        ulFOrAllComponents.style.transition = "transform 0.7s";

	        if (eventMove < shift && count != pageQuentity.length - 1) {
	            count++;
	            pageCurrent.innerHTML = count + 1;
	        }
	        if (eventMove > shift && count) {
	            count--;
	            pageCurrent.innerHTML = count + 1;
	        }
	        ulFOrAllComponents.style.transform = "translate3D(-" + document.body.clientWidth * count + "px, 0px, 0px)";

	        document.removeEventListener("mouseup", removeListener);
	        document.removeEventListener("touchend", removeListener);
	    }
	    document.addEventListener("mouseup", removeListener);
	    document.addEventListener("touchend", removeListener);

	    if (count === pageQuentity - 2) {
	        loadOfVideos();
	    }
	}

	function addElem() {
	    li = document.createElement("li");
	    li.className = "mainDiv";
	    aTitle = document.createElement("a");
	    aTitle.className = "headerOfVideo";
	    prevDiv = document.createElement("div");
	    prevDiv.className = "previewDiv";
	    prevImg = document.createElement("img");
	    prevImg.className = "preview";
	    var infoDiv = document.createElement("div");
	    channel = document.createElement("p");
	    channel.className = "author";
	    dateOfPublication = document.createElement("p");
	    dateOfPublication.className = "dateOfPublication";
	    description = document.createElement("p");
	    description.className = "description";

	    ulFOrAllComponents.appendChild(li);
	    li.appendChild(prevDiv);
	    prevDiv.appendChild(prevImg);
	    li.appendChild(aTitle);
	    li.appendChild(infoDiv);
	    infoDiv.appendChild(channel);
	    infoDiv.appendChild(dateOfPublication);
	    infoDiv.appendChild(description);
	}

	function addpageForSwitch() {
	    pageForSwitch1 = document.createElement("a");
	    pageForSwitch1.className = "pageSwitch";
	    pageForSwitch1.id = "pageSwitch1";
	    pageForSwitch1.innerHTML = "1";
	    pageSwitchPrev = document.createElement("a");
	    pageSwitchPrev.className = "pageSwitch";
	    pageSwitchPrev.id = "pageSwitchPrev";
	    pageSwitchPrev.innerHTML = "<";
	    pageCurrent = document.createElement("a");
	    pageCurrent.id = "pageCurrent";
	    pageCurrent.innerHTML = 1;
	    pageSwitchNext = document.createElement("a");
	    pageSwitchNext.className = "pageSwitch";
	    pageSwitchNext.id = "pageSwitchNext";
	    pageSwitchNext.innerHTML = ">";
	    paging.appendChild(pageForSwitch1);
	    paging.appendChild(pageSwitchPrev);
	    paging.appendChild(pageCurrent);
	    paging.appendChild(pageSwitchNext);
	}

	function searchVal() {
	    var newSearchVal = searchLine.value;
	    var prevSearchVal = search;
	    if (newSearchVal === prevSearchVal || newSearchVal.length === 0) {
	        main.innerHTML = "";
	        paging.innerHTML = "";
	        ulFOrAllComponents = document.createElement("ul");
	        ulFOrAllComponents.className = "mainUl";
	        main.appendChild(ulFOrAllComponents);
	        count = 0;
	    } else {
	        search = newSearchVal;
	    }
	    return search;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _layout = __webpack_require__(1);

	var _layout2 = _interopRequireDefault(_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ulFOrAllComponents = _layout2.default.ulFOrAllComponents;
	var main = _layout2.default.main;

	var PageCounter = function () {
		function PageCounter() {
			_classCallCheck(this, PageCounter);

			this.count = 0;
		}

		_createClass(PageCounter, [{
			key: "countPages",
			value: function countPages() {
				var videoBlocks = document.querySelectorAll(".mainDiv");
				if (document.body.clientWidth < 600) {
					this.count = videoBlocks.length;
					return "calc(100vw *" + videoBlocks.length + ")";
				} else if (document.body.clientWidth < 900) {
					this.count = Math.ceil(videoBlocks.length / 2);
					return "calc(50vw *" + videoBlocks.length + ")";
				} else if (document.body.clientWidth < 1200) {
					this.count = Math.ceil(videoBlocks.length / 3);
					return "calc(33.3vw *" + videoBlocks.length + ")";
				} else {
					this.count = Math.ceil(videoBlocks.length / 4);
					return "calc(25vw *" + videoBlocks.length + ")";
				}
			}
		}, {
			key: "pageCount",
			value: function pageCount() {
				return this.count;
			}
		}]);

		return PageCounter;
	}();

	exports.PageCounter = PageCounter;

/***/ }
/******/ ]);