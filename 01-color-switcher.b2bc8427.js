!function(){var t=null,n={startChangingColorBtn:document.querySelector("[data-start]"),stopChangingColorBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};function o(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}n.startChangingColorBtn.addEventListener("click",(function(){n.body.style.backgroundColor=o(),n.startChangingColorBtn.disabled=!0,t=setInterval((function(){n.body.style.backgroundColor=o()}),1e3)})),n.stopChangingColorBtn.addEventListener("click",(function(){clearInterval(t),n.startChangingColorBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.b2bc8427.js.map
