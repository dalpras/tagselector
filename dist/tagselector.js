(function(global,factory){if(typeof define==="function"&&define.amd){define([],factory)}else if(typeof exports!=="undefined"){factory()}else{var mod={exports:{}};factory();global.tagselector=mod.exports}})(typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:this,function(){"use strict";function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _classCallCheck(a,n){if(!(a instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(t){var i=_toPrimitive(t,"string");return"symbol"==_typeof(i)?i:i+""}function _toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}/*!
 * TagSelector
 * 
 * @author Ryan Fitzgerald
 * @version 0.2.1
 * @license MIT
 * 
 * Repo: https://github.com/RyanFitzgerald/tagselector
 * Issues: https://github.com/RyanFitzgerald/tagselector/issues
 */var defaults={max:false,onInit:false,onDestroy:false,onSelect:false,onDeselect:false};var getSettings=function getSettings(userSettings){var updated={};Object.keys(defaults).forEach(function(key){if(userSettings[key]){updated[key]=userSettings[key]}else{updated[key]=defaults[key]}});return updated};var getOptions=function getOptions(ele){var optionList=ele.options;var optionObj={};for(var i=0;i<optionList.length;i++){optionObj[optionList[i].value]={"text":optionList[i].text,"index":i,"selected":optionList[i].selected}}return optionObj};var insertAfter=function insertAfter(ele,ref){ref.parentNode.insertBefore(ele,ref.nextSibling)};var TagSelector=/*#__PURE__*/function(){function TagSelector(ele,userSettings){_classCallCheck(this,TagSelector);// Create required properties
this.ele=ele;this.userSettings=userSettings||{};this.isMultiple=this.ele.multiple;this.selected=[];this.options={};this.settings={};this.wrapper=null;// Ensure ele was a valid select field
if(!this.ele||this.ele===null||this.ele.tagName!=="SELECT"){console.error("Error: Must provide a valid ID for select field");return}// Initialize
this.init()}return _createClass(TagSelector,[{key:"init",value:function init(){var _this=this;// Get options and settings
this.options=getOptions(this.ele);this.settings=getSettings(this.userSettings);// Hide select
this.ele.style.display="none";// Create wrapper element
this.wrapper=document.createElement("div");this.wrapper.className="tagselector-wrapper";insertAfter(this.wrapper,this.ele);// Add tags within wrapper
Object.keys(this.options).forEach(function(key,i){// Create tag with necessary properties
var tag=document.createElement("span");tag.className="tagselector-tag";tag.innerHTML=_this.options[key].text;tag.dataset.tagvalue=key;tag.dataset.tagindex=_this.options[key].index;// Add active class if selected
if(_this.options[key].selected){tag.classList.add("active");_this.selected.push(key)}// Add listener
_this.addTagListener(tag);// Add tag to wrapper
_this.wrapper.appendChild(tag)});// Call init function if provided
if(this.settings.onInit&&typeof this.settings.onInit==="function"){this.settings.onInit()}}},{key:"addTagListener",value:function addTagListener(tag){// Save copies of needed properties
var selected=this.selected;var ele=this.ele;var wrapper=this.wrapper;var isMultiple=this.isMultiple;var settings=this.settings;var options=this.options;tag.addEventListener("click",function(){var value=this.dataset.tagvalue;var index=this.dataset.tagindex;if(this.classList.contains("active")){// Do nothing if regular select
if(!isMultiple){return}// Remove active class
this.classList.remove("active");// Remove key from selected array
var keyIndex=selected.findIndex(function(x){return x.value===value&&x.index===index});if(keyIndex>-1){selected.splice(keyIndex,1)}// Deselect it
ele.options[index].selected=false;// Call deselect function if provided
if(settings.onDeselect&&typeof settings.onDeselect==="function"){settings.onDeselect(value,options[value].text)}}else{// Handle based on type of select
if(isMultiple){// Push to selected array
selected.push({value:value,index:index});// Check if greater than max
if(settings.max&&selected.length>settings.max){// Get index to remove
var removeValue=selected[0].value;var removeIndex=options[removeValue].index;// Deselect it
ele.options[removeIndex].selected=false;// Remove active class from first element
wrapper.querySelector(".tagselector-tag.active[data-tagvalue=\"".concat(removeValue,"\"]")).classList.remove("active");// Call deselect function if provided
if(settings.onDeselect&&typeof settings.onDeselect==="function"){settings.onDeselect(selected[0].value,options[selected[0].value].text)}// Pop first member of array
selected.shift()}}else{// Remove all active classes
wrapper.querySelector(".tagselector-tag.active").classList.remove("active")}// Select it
ele.options[index].selected=true;// Call select function if provided
if(settings.onSelect&&typeof settings.onSelect==="function"){settings.onSelect(value,options[value].text)}// Add active class
this.classList.add("active")}})}},{key:"destroy",value:function destroy(){// Clear properties
this.selected=[];this.options={};// Delete wrapper
this.wrapper.parentNode.removeChild(this.wrapper);this.wrapper=null;// Show ele and delete reference
this.ele.style.display="initial";// Call destroy function if provided
if(this.settings.onDestroy&&typeof this.settings.onDestroy==="function"){this.settings.onDestroy()}// Delete settings
this.settings={}}},{key:"reload",value:function reload(){// Clear properties
this.selected=[];this.options={};// Delete wrapper
this.wrapper.parentNode.removeChild(this.wrapper);this.wrapper=null;// Call init
this.init()}}])}();module.exports=TagSelector});
