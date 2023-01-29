"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}function _createForOfIteratorHelper(o,allowArrayLike){var it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function(){};return{s:F,n:function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function(){it=it.call(o)},n:function(){var step=it.next();return normalCompletion=step.done,step},e:function(_e2){didErr=!0,err=_e2},f:function(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}window.furrets=window.furrets||{},window.USER_OVERRIDE=window.USER_OVERRIDE||{};var noop=function(){},storage=function(){var storage,result,uid=new Date;try{return(storage=window.localStorage).setItem(uid,uid),result=storage.getItem(uid)==uid,storage.removeItem(uid),result&&storage}catch(exception){noop()}return(storage=function(){console.log("localStorage Disabled.")}).getItem=function(){console.log("localStorage Disabled.")},storage.setItem=function(){console.log("localStorage Disabled.")},storage}(),acceptedHostnames=window.USER_OVERRIDE.acceptedHostnames?window.USER_OVERRIDE.acceptedHostnames:["css.furret.dev","furretcss-lib.rayhanadev.repl.co"],DOMRegex=function(elem,attr,regex){var _step,output=[],_iterator=_createForOfIteratorHelper(document.querySelectorAll(elem));try{for(_iterator.s();!(_step=_iterator.n()).done;){var link=_step.value,url=acceptedHostnames.includes(location.hostname)?new URL(link[attr],location.origin):new URL(link[attr]);regex.test(url.pathname)&&output.push(link)}}catch(err){_iterator.e(err)}finally{_iterator.f()}return output},loadColorScheme=function(scheme){["light","dark"].includes(scheme)||(scheme="light");var links=[],furretcssPath=new RegExp("/furretcss/v2/full/(?:light|dark)(?:.min)?.css");links.push.apply(links,_toConsumableArray(DOMRegex("link","href",furretcssPath)));var furretcssHljsPath=new RegExp("/highlightjs/(?:light|dark)(?:.min)?.css");links.push.apply(links,_toConsumableArray(DOMRegex("link","href",furretcssHljsPath)));for(var _i=0,_links=links;_i<_links.length;_i++){var link=_links[_i],url=acceptedHostnames.includes(location.hostname)?new URL(link.href,location.origin):new URL(link.href);if(acceptedHostnames.includes(url.hostname)&&"stylesheet"===link.rel){if(link.href.includes("/furretcss/v2/full")){var min=link.href.includes(".min")?".min":"";link.href="".concat(url.protocol,"//").concat(url.hostname,"/furretcss/v2/full/").concat(scheme).concat(min,".css")}link.href.includes("/highlightjs")&&(link.href="".concat(url.protocol,"//").concat(url.hostname,"/highlightjs/").concat(scheme,".css"))}}};"true"!==storage.getItem("furretcss-interacted")&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(storage.setItem("furretcss-theme","dark"),storage.setItem("furretcss-interacted","true")):storage.setItem("furretcss-theme","none")),window.furrets.themeToggle=function(toggleBtn){var themeToSet="dark"===storage.getItem("furretcss-theme")?"light":"dark";return loadColorScheme(themeToSet),storage.setItem("furretcss-theme",themeToSet),toggleBtn&&(toggleBtn.innerText="light"===themeToSet?"☀️":"🌙"),themeToSet},window.furrets.addThemeToggle=function(){var storedTheme=storage.getItem("furretcss-theme"),themeToggle=document.createElement("button");themeToggle.innerText="light"===storedTheme?"☀️":"🌙",themeToggle.className="theme-toggle-btn",themeToggle.addEventListener("click",(function(){return window.furrets.themeToggle(themeToggle)})),document.querySelector("body").insertAdjacentElement("afterbegin",themeToggle);var furretcssPath=new RegExp("/furretcss/v2/full/(?:light|dark)(?:.min)?.css"),links=DOMRegex("link","href",furretcssPath);if(0!==links.length){var loadedTheme="light"===links[0].href.split("/").pop().split(".")[0]?"light":"dark",themeToPreload="light"===loadedTheme?"dark":"light",preload=document.createElement("link");preload.rel="preconnect",preload.href=links[0].href.replace(loadedTheme,themeToPreload),preload.as="text/css",links[0].after(preload),loadColorScheme(storedTheme)}else console.warn("Warning: a full furretcss stylesheet was not found. Cannot choose stylesheet to preload.")};
//# sourceMappingURL=theme-toggle.js.map
