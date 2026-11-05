var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,ie());else{var t=n(l);t!==null&&se(x,t.startTime-e)}}var ee=!1,S=-1,C=5,te=-1;function ne(){return g?!0:!(e.unstable_now()-te<C)}function re(){if(g=!1,ee){var t=e.unstable_now();te=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ne());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ie():ee=!1}}}var ie;if(typeof y==`function`)ie=function(){y(re)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=re,ie=function(){oe.postMessage(null)}}else ie=function(){_(re,0)};function se(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,se(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,ie()))),r},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),n=e(((e,n)=>{n.exports=t()})),r=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function ne(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function re(e,t){return ne(e.type,t,e.props)}function ie(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ae(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var oe=/\/+/g;function se(e,t){return typeof e==`object`&&e&&e.key!=null?ae(``+e.key):t.toString(36)}function ce(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function w(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,w(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+se(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(oe,`$&/`)+`/`),w(o,r,i,``,function(e){return e})):o!=null&&(ie(o)&&(o=re(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(oe,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+se(a,u),c+=w(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+se(a,u++),c+=w(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return w(ce(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function T(e,t,n){if(e==null)return e;var r=[],i=0;return w(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:T,forEach:function(e,t,n){T(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return T(e,function(){t++}),t},toArray:function(e){return T(e,function(e){return e})||[]},only:function(e){if(!ie(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ne(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ne(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ie,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.6`})),i=e(((e,t)=>{t.exports=r()})),a=e((e=>{var t=i();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var a={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},o=Symbol.for(`react.portal`);function s(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function l(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return s(e,t,null,r)},e.flushSync=function(e){var t=c.T,n=a.p;try{if(c.T=null,a.p=2,e)return e()}finally{c.T=t,a.p=n,a.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,a.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&a.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin),i=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?a.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:i,fetchPriority:o}):n===`script`&&a.d.X(e,{crossOrigin:r,integrity:i,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=l(t.as,t.crossOrigin);a.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??a.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=l(n,t.crossOrigin);a.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=l(t.as,t.crossOrigin);a.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else a.d.m(e)},e.requestFormReset=function(e){a.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return c.H.useFormState(e,t,n)},e.useFormStatus=function(){return c.H.useHostTransitionStatus()},e.version=`19.2.6`})),o=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=a()})),s=e((e=>{var t=n(),r=i(),a=o();function s(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function u(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function d(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function f(e){if(l(e)!==e)throw Error(s(188))}function p(e){var t=e.alternate;if(!t){if(t=l(e),t===null)throw Error(s(188));return t===e?e:null}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return f(i),e;if(a===r)return f(i),t;a=a.sibling}throw Error(s(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,c=i.child;c;){if(c===n){o=!0,n=i,r=a;break}if(c===r){o=!0,r=i,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=i;break}if(c===r){o=!0,r=a,n=i;break}c=c.sibling}if(!o)throw Error(s(189))}}if(n.alternate!==r)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),te=Symbol.for(`react.suspense`),ne=Symbol.for(`react.suspense_list`),re=Symbol.for(`react.memo`),ie=Symbol.for(`react.lazy`),ae=Symbol.for(`react.activity`),oe=Symbol.for(`react.memo_cache_sentinel`),se=Symbol.iterator;function ce(e){return typeof e!=`object`||!e?null:(e=se&&e[se]||e[`@@iterator`],typeof e==`function`?e:null)}var w=Symbol.for(`react.client.reference`);function T(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===w?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case te:return`Suspense`;case ne:return`SuspenseList`;case ae:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case re:return t=e.displayName||null,t===null?T(e.type)||`Memo`:t;case ie:t=e._payload,e=e._init;try{return T(e(t))}catch{}}return null}var le=Array.isArray,E=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function O(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function k(e,t){fe++,de[fe]=e.current,e.current=t}var me=pe(null),he=pe(null),A=pe(null),ge=pe(null);function _e(e,t){switch(k(A,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}O(me),k(me,e)}function ve(){O(me),O(he),O(A)}function ye(e){e.memoizedState!==null&&k(ge,e);var t=me.current,n=Hd(t,e.type);t!==n&&(k(he,e),k(me,n))}function be(e){he.current===e&&(O(me),O(he)),ge.current===e&&(O(ge),Qf._currentValue=ue)}var xe,Se;function Ce(e){if(xe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);xe=t&&t[1]||``,Se=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+xe+e+Se}var we=!1;function Te(e,t){if(!e||we)return``;we=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{we=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ce(n):``}function Ee(e,t){switch(e.tag){case 26:case 27:case 5:return Ce(e.type);case 16:return Ce(`Lazy`);case 13:return e.child!==t&&t!==null?Ce(`Suspense Fallback`):Ce(`Suspense`);case 19:return Ce(`SuspenseList`);case 0:case 15:return Te(e.type,!1);case 11:return Te(e.type.render,!1);case 1:return Te(e.type,!0);case 31:return Ce(`Activity`);default:return``}}function De(e){try{var t=``,n=null;do t+=Ee(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Oe=Object.prototype.hasOwnProperty,j=t.unstable_scheduleCallback,ke=t.unstable_cancelCallback,Ae=t.unstable_shouldYield,je=t.unstable_requestPaint,Me=t.unstable_now,Ne=t.unstable_getCurrentPriorityLevel,Pe=t.unstable_ImmediatePriority,Fe=t.unstable_UserBlockingPriority,Ie=t.unstable_NormalPriority,Le=t.unstable_LowPriority,Re=t.unstable_IdlePriority,ze=t.log,Be=t.unstable_setDisableYieldValue,Ve=null,He=null;function Ue(e){if(typeof ze==`function`&&Be(e),He&&typeof He.setStrictMode==`function`)try{He.setStrictMode(Ve,e)}catch{}}var We=Math.clz32?Math.clz32:qe,Ge=Math.log,Ke=Math.LN2;function qe(e){return e>>>=0,e===0?32:31-(Ge(e)/Ke|0)|0}var Je=256,Ye=262144,Xe=4194304;function Ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ze(n))):i=Ze(o):i=Ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ze(n))):i=Ze(o)):i=Ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function $e(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function et(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tt(){var e=Xe;return Xe<<=1,!(Xe&62914560)&&(Xe=4194304),e}function nt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function it(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-We(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&at(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function at(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-We(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ot(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function st(e,t){var n=t&-t;return n=n&42?1:ct(n),(n&(e.suspendedLanes|t))===0?n:0}function ct(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function lt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ut(){var e=D.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function dt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var ft=Math.random().toString(36).slice(2),pt=`__reactFiber$`+ft,mt=`__reactProps$`+ft,ht=`__reactContainer$`+ft,gt=`__reactEvents$`+ft,_t=`__reactListeners$`+ft,vt=`__reactHandles$`+ft,yt=`__reactResources$`+ft,bt=`__reactMarker$`+ft;function xt(e){delete e[pt],delete e[mt],delete e[gt],delete e[_t],delete e[vt]}function St(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[pt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[pt]||e[ht]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(s(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return Oe.call(Nt,e)?!0:Oe.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Lt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){if(!e._valueTracker){var t=zt(e)?`checked`:`value`;e._valueTracker=Bt(e,t,``+e[t])}}function Ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function Gt(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Kt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Jt(e,o,Rt(n)):Jt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function qt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Vt(e);return}n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Vt(e)}function Jt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Yt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Xt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function Zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(s(92));if(le(r)){if(1<r.length)throw Error(s(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Vt(e)}function Qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $t=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function en(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||$t.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function tn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(s(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var i in t)r=t[i],t.hasOwnProperty(i)&&n[i]!==r&&en(e,i,r)}else for(var a in t)t.hasOwnProperty(a)&&en(e,a,t[a])}function nn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var rn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),an=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function on(e){return an.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function sn(){}var cn=null;function ln(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var un=null,dn=null;function fn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Kt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Gt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=r[mt]||null;if(!i)throw Error(s(90));Kt(r,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ht(r)}break a;case`textarea`:Xt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Yt(e,!!n.multiple,t,!1)}}}var pn=!1;function mn(e,t,n){if(pn)return e(t,n);pn=!0;try{return e(t)}finally{if(pn=!1,(un!==null||dn!==null)&&(bu(),un&&(t=un,e=dn,dn=un=null,fn(t),e)))for(t=0;t<e.length;t++)fn(e[t])}}function hn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(s(231,t,typeof n));return n}var gn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),_n=!1;if(gn)try{var vn={};Object.defineProperty(vn,`passive`,{get:function(){_n=!0}}),window.addEventListener(`test`,vn,vn),window.removeEventListener(`test`,vn,vn)}catch{_n=!1}var yn=null,bn=null,xn=null;function Sn(){if(xn)return xn;var e,t=bn,n=t.length,r,i=`value`in yn?yn.value:yn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return xn=i.slice(e,1<r?1-r:void 0)}function Cn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function wn(){return!0}function Tn(){return!1}function En(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?wn:Tn,this.isPropagationStopped=Tn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=wn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=wn)},persist:function(){},isPersistent:wn}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},On=En(Dn),kn=h({},Dn,{view:0,detail:0}),An=En(kn),jn,Mn,Nn,Pn=h({},kn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Nn&&(Nn&&e.type===`mousemove`?(jn=e.screenX-Nn.screenX,Mn=e.screenY-Nn.screenY):Mn=jn=0,Nn=e),jn)},movementY:function(e){return`movementY`in e?e.movementY:Mn}}),Fn=En(Pn),In=En(h({},Pn,{dataTransfer:0})),Ln=En(h({},kn,{relatedTarget:0})),Rn=En(h({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0})),zn=En(h({},Dn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Bn=En(h({},Dn,{data:0})),Vn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Hn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Un={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Wn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Un[e])?!!t[e]:!1}function Gn(){return Wn}var Kn=En(h({},kn,{key:function(e){if(e.key){var t=Vn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Cn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Hn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gn,charCode:function(e){return e.type===`keypress`?Cn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Cn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),qn=En(h({},Pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Jn=En(h({},kn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gn})),Yn=En(h({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Xn=En(h({},Pn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Zn=En(h({},Dn,{newState:0,oldState:0})),Qn=[9,13,27,32],$n=gn&&`CompositionEvent`in window,er=null;gn&&`documentMode`in document&&(er=document.documentMode);var tr=gn&&`TextEvent`in window&&!er,nr=gn&&(!$n||er&&8<er&&11>=er),rr=` `,ir=!1;function ar(e,t){switch(e){case`keyup`:return Qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function or(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var sr=!1;function cr(e,t){switch(e){case`compositionend`:return or(t);case`keypress`:return t.which===32?(ir=!0,rr):null;case`textInput`:return e=t.data,e===rr&&ir?null:e;default:return null}}function lr(e,t){if(sr)return e===`compositionend`||!$n&&ar(e,t)?(e=Sn(),xn=bn=yn=null,sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return nr&&t.locale!==`ko`?null:t.data;default:return null}}var ur={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ur[e.type]:t===`textarea`}function fr(e,t,n,r){un?dn?dn.push(r):dn=[r]:un=r,t=Ed(t,`onChange`),0<t.length&&(n=new On(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var pr=null,mr=null;function hr(e){yd(e,0)}function gr(e){if(Ht(wt(e)))return e}function _r(e,t){if(e===`change`)return t}var vr=!1;if(gn){var yr;if(gn){var br=`oninput`in document;if(!br){var xr=document.createElement(`div`);xr.setAttribute(`oninput`,`return;`),br=typeof xr.oninput==`function`}yr=br}else yr=!1;vr=yr&&(!document.documentMode||9<document.documentMode)}function Sr(){pr&&(pr.detachEvent(`onpropertychange`,Cr),mr=pr=null)}function Cr(e){if(e.propertyName===`value`&&gr(mr)){var t=[];fr(t,mr,e,ln(e)),mn(hr,t)}}function wr(e,t,n){e===`focusin`?(Sr(),pr=t,mr=n,pr.attachEvent(`onpropertychange`,Cr)):e===`focusout`&&Sr()}function Tr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return gr(mr)}function Er(e,t){if(e===`click`)return gr(t)}function Dr(e,t){if(e===`input`||e===`change`)return gr(t)}function Or(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var kr=typeof Object.is==`function`?Object.is:Or;function Ar(e,t){if(kr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Oe.call(t,i)||!kr(e[i],t[i]))return!1}return!0}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=gn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Ut(r)||(r=Lr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&Ar(zr,r)||(zr=r,r=Ed(Rr,`onSelect`),0<r.length&&(t=new On(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};gn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),Xr=Kr(`transitionrun`),Zr=Kr(`transitionstart`),Qr=Kr(`transitioncancel`),$r=Kr(`transitionend`),ei=new Map,ti=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ti.push(`scrollEnd`);function ni(e,t){ei.set(e,t),kt(t,[e])}var ri=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ii=[],ai=0,oi=0;function si(){for(var e=ai,t=oi=ai=0;t<e;){var n=ii[t];ii[t++]=null;var r=ii[t];ii[t++]=null;var i=ii[t];ii[t++]=null;var a=ii[t];if(ii[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&di(n,i,a)}}function ci(e,t,n,r){ii[ai++]=e,ii[ai++]=t,ii[ai++]=n,ii[ai++]=r,oi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function li(e,t,n,r){return ci(e,t,n,r),fi(e)}function ui(e,t){return ci(e,null,null,t),fi(e)}function di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-We(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function fi(e){if(50<du)throw du=0,fu=null,Error(s(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var pi={};function mi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(e,t,n,r){return new mi(e,t,n,r)}function gi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function _i(e,t){var n=e.alternate;return n===null?(n=hi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function vi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function yi(e,t,n,r,i,a){var o=0;if(r=e,typeof e==`function`)gi(e)&&(o=1);else if(typeof e==`string`)o=Uf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ae:return e=hi(31,n,t,i),e.elementType=ae,e.lanes=a,e;case y:return bi(n.children,i,a,t);case b:o=8,i|=24;break;case x:return e=hi(12,n,t,i|2),e.elementType=x,e.lanes=a,e;case te:return e=hi(13,n,t,i),e.elementType=te,e.lanes=a,e;case ne:return e=hi(19,n,t,i),e.elementType=ne,e.lanes=a,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:o=10;break a;case ee:o=9;break a;case C:o=11;break a;case re:o=14;break a;case ie:o=16,r=null;break a}o=29,n=Error(s(130,e===null?`null`:typeof e,``)),r=null}return t=hi(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function bi(e,t,n,r){return e=hi(7,e,r,t),e.lanes=n,e}function xi(e,t,n){return e=hi(6,e,null,t),e.lanes=n,e}function Si(e){var t=hi(18,null,null,0);return t.stateNode=e,t}function Ci(e,t,n){return t=hi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var wi=new WeakMap;function Ti(e,t){if(typeof e==`object`&&e){var n=wi.get(e);return n===void 0?(t={value:e,source:t,stack:De(t)},wi.set(e,t),t):n}return{value:e,source:t,stack:De(t)}}var Ei=[],Di=0,Oi=null,ki=0,Ai=[],ji=0,Mi=null,Ni=1,Pi=``;function Fi(e,t){Ei[Di++]=ki,Ei[Di++]=Oi,Oi=e,ki=t}function Ii(e,t,n){Ai[ji++]=Ni,Ai[ji++]=Pi,Ai[ji++]=Mi,Mi=e;var r=Ni;e=Pi;var i=32-We(r)-1;r&=~(1<<i),n+=1;var a=32-We(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ni=1<<32-We(t)+i|n<<i|r,Pi=a+e}else Ni=1<<a|n<<i|r,Pi=e}function Li(e){e.return!==null&&(Fi(e,1),Ii(e,1,0))}function Ri(e){for(;e===Oi;)Oi=Ei[--Di],Ei[Di]=null,ki=Ei[--Di],Ei[Di]=null;for(;e===Mi;)Mi=Ai[--ji],Ai[ji]=null,Pi=Ai[--ji],Ai[ji]=null,Ni=Ai[--ji],Ai[ji]=null}function zi(e,t){Ai[ji++]=Ni,Ai[ji++]=Pi,Ai[ji++]=Mi,Ni=t.id,Pi=t.overflow,Mi=e}var Bi=null,M=null,N=!1,Vi=null,Hi=!1,Ui=Error(s(519));function Wi(e){throw Xi(Ti(Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ui}function Gi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[pt]=e,t[mt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=sn),t=!0):t=!1,t||Wi(e,!0)}function Ki(e){for(Bi=e.return;Bi;)switch(Bi.tag){case 5:case 31:case 13:Hi=!1;return;case 27:case 3:Hi=!0;return;default:Bi=Bi.return}}function qi(e){if(e!==Bi)return!1;if(!N)return Ki(e),N=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&M&&Wi(e),Ki(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));M=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(317));M=uf(e)}else t===27?(t=M,Zd(e.type)?(e=lf,lf=null,M=e):M=t):M=Bi?cf(e.stateNode.nextSibling):null;return!0}function Ji(){M=Bi=null,N=!1}function Yi(){var e=Vi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Vi=null),e}function Xi(e){Vi===null?Vi=[e]:Vi.push(e)}var Zi=pe(null),Qi=null,$i=null;function ea(e,t,n){k(Zi,t._currentValue),t._currentValue=n}function ta(e){e._currentValue=Zi.current,O(Zi)}function na(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ra(e,t,n,r){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){var o=i.child;a=a.firstContext;a:for(;a!==null;){var c=a;a=i;for(var l=0;l<t.length;l++)if(c.context===t[l]){a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),na(a.return,n,e),r||(o=null);break a}a=c.next}}else if(i.tag===18){if(o=i.return,o===null)throw Error(s(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),na(o,n,e),o=null}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}}function ia(e,t,n,r){e=null;for(var i=t,a=!1;i!==null;){if(!a){if(i.flags&524288)a=!0;else if(i.flags&262144)break}if(i.tag===10){var o=i.alternate;if(o===null)throw Error(s(387));if(o=o.memoizedProps,o!==null){var c=i.type;kr(i.pendingProps.value,o.value)||(e===null?e=[c]:e.push(c))}}else if(i===ge.current){if(o=i.alternate,o===null)throw Error(s(387));o.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}i=i.return}e!==null&&ra(t,e,n,r),t.flags|=262144}function aa(e){for(e=e.firstContext;e!==null;){if(!kr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function oa(e){Qi=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function sa(e){return la(Qi,e)}function ca(e,t){return Qi===null&&oa(e),la(e,t)}function la(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},$i===null){if(e===null)throw Error(s(308));$i=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else $i=$i.next=t;return n}var ua=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},da=t.unstable_scheduleCallback,fa=t.unstable_NormalPriority,P={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pa(){return{controller:new ua,data:new Map,refCount:0}}function ma(e){e.refCount--,e.refCount===0&&da(fa,function(){e.controller.abort()})}var ha=null,ga=0,_a=0,va=null;function ya(e,t){if(ha===null){var n=ha=[];ga=0,_a=dd(),va={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ga++,t.then(ba,ba),t}function ba(){if(--ga===0&&ha!==null){va!==null&&(va.status=`fulfilled`);var e=ha;ha=null,_a=0,va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function xa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Sa=E.S;E.S=function(e,t){eu=Me(),typeof t==`object`&&t&&typeof t.then==`function`&&ya(e,t),Sa!==null&&Sa(e,t)};var Ca=pe(null);function wa(){var e=Ca.current;return e===null?K.pooledCache:e}function Ta(e,t){t===null?k(Ca,Ca.current):k(Ca,t.pool)}function Ea(){var e=wa();return e===null?null:{parent:P._currentValue,pool:e}}var Da=Error(s(460)),Oa=Error(s(474)),ka=Error(s(542)),Aa={then:function(){}};function ja(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ma(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(sn,sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e;default:if(typeof t.status==`string`)t.then(sn,sn);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e}throw Pa=t,Da}}function Na(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Pa=e,Da):e}}var Pa=null;function Fa(){if(Pa===null)throw Error(s(459));var e=Pa;return Pa=null,e}function Ia(e){if(e===Da||e===ka)throw Error(s(483))}var La=null,Ra=0;function za(e){var t=Ra;return Ra+=1,La===null&&(La=[]),Ma(La,e,t)}function Ba(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Va(e,t){throw t.$$typeof===g?Error(s(525)):(e=Object.prototype.toString.call(t),Error(s(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function i(e,t){return e=_i(e,t),e.index=0,e.sibling=null,e}function a(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function o(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=xi(n,e.mode,r),t.return=e,t):(t=i(t,n),t.return=e,t)}function l(e,t,n,r){var a=n.type;return a===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===a||typeof a==`object`&&a&&a.$$typeof===ie&&Na(a)===t.type)?(t=i(t,n.props),Ba(t,n),t.return=e,t):(t=yi(n.type,n.key,n.props,null,e.mode,r),Ba(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ci(n,e.mode,r),t.return=e,t):(t=i(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,a){return t===null||t.tag!==7?(t=bi(n,e.mode,r,a),t.return=e,t):(t=i(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=xi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=yi(t.type,t.key,t.props,null,e.mode,n),Ba(n,t),n.return=e,n;case v:return t=Ci(t,e.mode,n),t.return=e,t;case ie:return t=Na(t),f(e,t,n)}if(le(t)||ce(t))return t=bi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,za(t),n);if(t.$$typeof===S)return f(e,ca(e,t),n);Va(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case ie:return n=Na(n),p(e,t,n,r)}if(le(n)||ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,za(n),r);if(n.$$typeof===S)return p(e,t,ca(e,n),r);Va(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ie:return r=Na(r),m(e,t,n,r,i)}if(le(r)||ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,za(r),i);if(r.$$typeof===S)return m(e,t,n,ca(t,r),i);Va(t,r)}return null}function h(i,o,s,c){for(var l=null,u=null,d=o,h=o=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),o=a(_,o,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),N&&Fi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(o=a(d,o,h),u===null?l=d:u.sibling=d,u=d);return N&&Fi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),o=a(g,o,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),N&&Fi(i,h),l}function g(i,o,c,l){if(c==null)throw Error(s(151));for(var u=null,d=null,h=o,g=o=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(i,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(i,h),o=a(y,o,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(i,h),N&&Fi(i,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(i,v.value,l),v!==null&&(o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return N&&Fi(i,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,i,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),o=a(v,o,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(i,e)}),N&&Fi(i,g),u}function b(e,r,a,c){if(typeof a==`object`&&a&&a.type===y&&a.key===null&&(a=a.props.children),typeof a==`object`&&a){switch(a.$$typeof){case _:a:{for(var l=a.key;r!==null;){if(r.key===l){if(l=a.type,l===y){if(r.tag===7){n(e,r.sibling),c=i(r,a.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ie&&Na(l)===r.type){n(e,r.sibling),c=i(r,a.props),Ba(c,a),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}a.type===y?(c=bi(a.props.children,e.mode,c,a.key),c.return=e,e=c):(c=yi(a.type,a.key,a.props,null,e.mode,c),Ba(c,a),c.return=e,e=c)}return o(e);case v:a:{for(l=a.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===a.containerInfo&&r.stateNode.implementation===a.implementation){n(e,r.sibling),c=i(r,a.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=Ci(a,e.mode,c),c.return=e,e=c}return o(e);case ie:return a=Na(a),b(e,r,a,c)}if(le(a))return h(e,r,a,c);if(ce(a)){if(l=ce(a),typeof l!=`function`)throw Error(s(150));return a=l.call(a),g(e,r,a,c)}if(typeof a.then==`function`)return b(e,r,za(a),c);if(a.$$typeof===S)return b(e,r,ca(e,a),c);Va(e,a)}return typeof a==`string`&&a!==``||typeof a==`number`||typeof a==`bigint`?(a=``+a,r!==null&&r.tag===6?(n(e,r.sibling),c=i(r,a),c.return=e,e=c):(n(e,r),c=xi(a,e.mode,c),c.return=e,e=c),o(e)):n(e,r)}return function(e,t,n,r){try{Ra=0;var i=b(e,t,n,r);return La=null,i}catch(t){if(t===Da||t===ka)throw t;var a=hi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ua=Ha(!0),Wa=Ha(!1),Ga=!1;function Ka(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ja(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ya(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=fi(e),di(e,null,n),t}return ci(e,r,t,n),fi(e)}function Xa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}function Za(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Qa=!1;function $a(){if(Qa){var e=va;if(e!==null)throw e}}function eo(e,t,n,r){Qa=!1;var i=e.updateQueue;Ga=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===_a&&(Qa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ga=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function to(e,t){if(typeof e!=`function`)throw Error(s(191,e));e.call(t)}function no(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)to(n[e],t)}var ro=pe(null),io=pe(0);function ao(e,t){e=Wl,k(io,e),k(ro,t),Wl=e|t.baseLanes}function oo(){k(io,Wl),k(ro,ro.current)}function so(){Wl=io.current,O(ro),O(io)}var co=pe(null),lo=null;function uo(e){var t=e.alternate;k(F,F.current&1),k(co,e),lo===null&&(t===null||ro.current!==null||t.memoizedState!==null)&&(lo=e)}function fo(e){k(F,F.current),k(co,e),lo===null&&(lo=e)}function po(e){e.tag===22?(k(F,F.current),k(co,e),lo===null&&(lo=e)):mo(e)}function mo(){k(F,F.current),k(co,co.current)}function ho(e){O(co),lo===e&&(lo=null),O(F)}var F=pe(0);function go(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=0,I=null,L=null,R=null,vo=!1,yo=!1,bo=!1,xo=0,So=0,Co=null,wo=0;function z(){throw Error(s(321))}function To(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kr(e[n],t[n]))return!1;return!0}function Eo(e,t,n,r,i,a){return _o=a,I=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Hs:Us,bo=!1,a=n(r,i),bo=!1,yo&&(a=Oo(t,n,r,i)),Do(e),a}function Do(e){E.H=Vs;var t=L!==null&&L.next!==null;if(_o=0,R=L=I=null,vo=!1,So=0,Co=null,t)throw Error(s(300));e===null||V||(e=e.dependencies,e!==null&&aa(e)&&(V=!0))}function Oo(e,t,n,r){I=e;var i=0;do{if(yo&&(Co=null),So=0,yo=!1,25<=i)throw Error(s(301));if(i+=1,R=L=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}E.H=Ws,a=t(n,r)}while(yo);return a}function ko(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Fo(t):t,e=e.useState()[0],(L===null?null:L.memoizedState)!==e&&(I.flags|=1024),t}function Ao(){var e=xo!==0;return xo=0,e}function jo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mo(e){if(vo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}vo=!1}_o=0,R=L=I=null,yo=!1,So=xo=0,Co=null}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return R===null?I.memoizedState=R=e:R=R.next=e,R}function B(){if(L===null){var e=I.alternate;e=e===null?null:e.memoizedState}else e=L.next;var t=R===null?I.memoizedState:R.next;if(t!==null)R=t,L=e;else{if(e===null)throw I.alternate===null?Error(s(467)):Error(s(310));L=e,e={memoizedState:L.memoizedState,baseState:L.baseState,baseQueue:L.baseQueue,queue:L.queue,next:null},R===null?I.memoizedState=R=e:R=R.next=e}return R}function Po(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fo(e){var t=So;return So+=1,Co===null&&(Co=[]),e=Ma(Co,e,t),t=I,(R===null?t.memoizedState:R.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Hs:Us),e}function Io(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Fo(e);if(e.$$typeof===S)return sa(e)}throw Error(s(438,String(e)))}function Lo(e){var t=null,n=I.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=I.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Po(),I.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=oe;return t.index++,n}function Ro(e,t){return typeof t==`function`?t(e):t}function zo(e){return Bo(B(),L,e)}function Bo(e,t,n){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=n;var i=e.baseQueue,a=r.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}t.baseQueue=i=a,r.pending=null}if(a=e.baseState,i===null)e.memoizedState=a;else{t=i.next;var c=o=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(_o&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===_a&&(d=!0);else if((_o&p)===p){u=u.next,p===_a&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,o=a):l=l.next=f,I.lanes|=p,Gl|=p;f=u.action,bo&&n(a,f),a=u.hasEagerState?u.eagerState:n(a,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,o=a):l=l.next=p,I.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?o=a:l.next=c,!kr(a,e.memoizedState)&&(V=!0,d&&(n=va,n!==null)))throw n;e.memoizedState=a,e.baseState=o,e.baseQueue=l,r.lastRenderedState=a}return i===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Vo(e){var t=B(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);kr(a,t.memoizedState)||(V=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Ho(e,t,n){var r=I,i=B(),a=N;if(a){if(n===void 0)throw Error(s(407));n=n()}else n=t();var o=!kr((L||i).memoizedState,n);if(o&&(i.memoizedState=n,V=!0),i=i.queue,ps(Go.bind(null,r,i,e),[e]),i.getSnapshot!==t||o||R!==null&&R.memoizedState.tag&1){if(r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,i,n,t),null),K===null)throw Error(s(349));a||_o&127||Uo(r,t,n)}return n}function Uo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=I.updateQueue,t===null?(t=Po(),I.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wo(e,t,n,r){t.value=n,t.getSnapshot=r,Ko(t)&&qo(e)}function Go(e,t,n){return n(function(){Ko(t)&&qo(e)})}function Ko(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kr(e,n)}catch{return!0}}function qo(e){var t=ui(e,2);t!==null&&hu(t,e,2)}function Jo(e){var t=No();if(typeof e==`function`){var n=e;if(e=n(),bo){Ue(!0);try{n()}finally{Ue(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:e},t}function Yo(e,t,n,r){return e.baseState=n,Bo(e,L,typeof r==`function`?r:Ro)}function Xo(e,t,n,r,i){if(Rs(e))throw Error(s(485));if(e=t.action,e!==null){var a={payload:i,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){a.listeners.push(e)}};E.T===null?a.isTransition=!1:n(!0),r(a),n=t.pending,n===null?(a.next=t.pending=a,Zo(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Zo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Qo(e,t,s)}catch(n){es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Qo(e,t,a)}catch(n){es(e,t,n)}}function Qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){$o(e,t,n)},function(n){return es(e,t,n)}):$o(e,t,n)}function $o(e,t,n){t.status=`fulfilled`,t.value=n,ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Zo(e,n)))}function es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ts(t),t=t.next;while(t!==r)}e.action=null}function ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ns(e,t){return t}function rs(e,t){if(N){var n=K.formState;if(n!==null){a:{var r=I;if(N){if(M){b:{for(var i=M,a=Hi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){M=cf(i.nextSibling),r=i.data===`F!`;break a}}Wi(r)}r=!1}r&&(t=n[0])}}return n=No(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:t},n.queue=r,n=Fs.bind(null,I,r),r.dispatch=n,r=Jo(!1),a=Ls.bind(null,I,!1,r.queue),r=No(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Xo.bind(null,I,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function is(e){return as(B(),L,e)}function as(e,t,n){if(t=Bo(e,t,ns)[0],e=zo(Ro)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Fo(t)}catch(e){throw e===Da?ka:e}else r=t;t=B();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(I.flags|=2048,cs(9,{destroy:void 0},os.bind(null,i,n),null)),[r,a,e]}function os(e,t){e.action=t}function ss(e){var t=B(),n=L;if(n!==null)return as(t,n,e);B(),t=t.memoizedState,n=B();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function cs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=I.updateQueue,t===null&&(t=Po(),I.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return B().memoizedState}function us(e,t,n,r){var i=No();I.flags|=e,i.memoizedState=cs(1|t,{destroy:void 0},n,r===void 0?null:r)}function ds(e,t,n,r){var i=B();r=r===void 0?null:r;var a=i.memoizedState.inst;L!==null&&r!==null&&To(r,L.memoizedState.deps)?i.memoizedState=cs(t,a,n,r):(I.flags|=e,i.memoizedState=cs(1|t,a,n,r))}function fs(e,t){us(8390656,8,e,t)}function ps(e,t){ds(2048,8,e,t)}function ms(e){I.flags|=4;var t=I.updateQueue;if(t===null)t=Po(),I.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hs(e){var t=B().memoizedState;return ms({ref:t,nextImpl:e}),function(){if(G&2)throw Error(s(440));return t.impl.apply(void 0,arguments)}}function gs(e,t){return ds(4,2,e,t)}function _s(e,t){return ds(4,4,e,t)}function vs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ys(e,t,n){n=n==null?null:n.concat([e]),ds(4,4,vs.bind(null,t,e),n)}function bs(){}function xs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&To(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ss(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&To(t,r[1]))return r[0];if(r=e(),bo){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r}function Cs(e,t,n){return n===void 0||_o&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),I.lanes|=e,Gl|=e,n)}function ws(e,t,n,r){return kr(n,t)?n:ro.current===null?!(_o&42)||_o&1073741824&&!(J&261930)?(V=!0,e.memoizedState=n):(e=mu(),I.lanes|=e,Gl|=e,t):(e=Cs(e,n,r),kr(e,t)||(V=!0),e)}function Ts(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Ls(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Is(e,t,xa(c,r),pu(e)):Is(e,t,r,pu(e))}catch(n){Is(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function Es(){}function Ds(e,t,n,r){if(e.tag!==5)throw Error(s(476));var i=Os(e).queue;Ts(e,i,t,ue,n===null?Es:function(){return ks(e),n(r)})}function Os(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ks(e){var t=Os(e);t.next===null&&(t=e.alternate.memoizedState),Is(e,t.next.queue,{},pu())}function As(){return sa(Qf)}function js(){return B().memoizedState}function Ms(){return B().memoizedState}function Ns(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ja(n);var r=Ya(t,e,n);r!==null&&(hu(r,t,n),Xa(r,t,n)),t={cache:pa()},e.payload=t;return}t=t.return}}function Ps(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rs(e)?zs(t,n):(n=li(e,t,n,r),n!==null&&(hu(n,e,r),Bs(n,t,r)))}function Fs(e,t,n){Is(e,t,n,pu())}function Is(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rs(e))zs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,kr(s,o))return ci(e,t,i,0),K===null&&si(),!1}catch{}if(n=li(e,t,i,r),n!==null)return hu(n,e,r),Bs(n,t,r),!0}return!1}function Ls(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Rs(e)){if(t)throw Error(s(479))}else t=li(e,n,r,2),t!==null&&hu(t,e,2)}function Rs(e){var t=e.alternate;return e===I||t!==null&&t===I}function zs(e,t){yo=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}var Vs={readContext:sa,use:Io,useCallback:z,useContext:z,useEffect:z,useImperativeHandle:z,useLayoutEffect:z,useInsertionEffect:z,useMemo:z,useReducer:z,useRef:z,useState:z,useDebugValue:z,useDeferredValue:z,useTransition:z,useSyncExternalStore:z,useId:z,useHostTransitionStatus:z,useFormState:z,useActionState:z,useOptimistic:z,useMemoCache:z,useCacheRefresh:z};Vs.useEffectEvent=z;var Hs={readContext:sa,use:Io,useCallback:function(e,t){return No().memoizedState=[e,t===void 0?null:t],e},useContext:sa,useEffect:fs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,vs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=No();t=t===void 0?null:t;var r=e();if(bo){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=No();if(n!==void 0){var i=n(t);if(bo){Ue(!0);try{n(t)}finally{Ue(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ps.bind(null,I,e),[r.memoizedState,e]},useRef:function(e){var t=No();return e={current:e},t.memoizedState=e},useState:function(e){e=Jo(e);var t=e.queue,n=Fs.bind(null,I,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(e,t){return Cs(No(),e,t)},useTransition:function(){var e=Jo(!1);return e=Ts.bind(null,I,e.queue,!0,!1),No().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=I,i=No();if(N){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),K===null)throw Error(s(349));J&127||Uo(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,fs(Go.bind(null,r,a,e),[e]),r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,a,n,t),null),n},useId:function(){var e=No(),t=K.identifierPrefix;if(N){var n=Pi,r=Ni;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=xo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=wo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:As,useFormState:rs,useActionState:rs,useOptimistic:function(e){var t=No();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ls.bind(null,I,!0,n),n.dispatch=t,[e,t]},useMemoCache:Lo,useCacheRefresh:function(){return No().memoizedState=Ns.bind(null,I)},useEffectEvent:function(e){var t=No(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(s(440));return n.impl.apply(void 0,arguments)}}},Us={readContext:sa,use:Io,useCallback:xs,useContext:sa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:zo,useRef:ls,useState:function(){return zo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){return ws(B(),L.memoizedState,e,t)},useTransition:function(){var e=zo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:is,useActionState:is,useOptimistic:function(e,t){return Yo(B(),L,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Us.useEffectEvent=hs;var Ws={readContext:sa,use:Io,useCallback:xs,useContext:sa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:Vo,useRef:ls,useState:function(){return Vo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){var n=B();return L===null?Cs(n,e,t):ws(n,L.memoizedState,e,t)},useTransition:function(){var e=Vo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:ss,useActionState:ss,useOptimistic:function(e,t){var n=B();return L===null?(n.baseState=e,[e,n.queue.dispatch]):Yo(n,L,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Ws.useEffectEvent=hs;function Gs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ks={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ja(r);i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(hu(t,e,r),Xa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ja(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(hu(t,e,r),Xa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ja(n);r.tag=2,t!=null&&(r.callback=t),t=Ya(e,r,n),t!==null&&(hu(t,e,n),Xa(t,e,n))}};function qs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(i,a):!0}function Js(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ks.enqueueReplaceState(t,t.state,null)}function Ys(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Xs(e){ri(e)}function Zs(e){console.error(e)}function Qs(e){ri(e)}function $s(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){return n=Ja(n),n.tag=3,n.payload={element:null},n.callback=function(){$s(e,t)},n}function nc(e){return e=Ja(e),e.tag=3,e}function rc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){ec(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ic(e,t,n,r,i){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ia(t,n,i,!0),n=co.current,n!==null){switch(n.tag){case 31:case 13:return lo===null?Du():n.alternate===null&&X===0&&(X=3),n.flags&=-257,n.flags|=65536,n.lanes=i,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,i)),!1;case 22:return n.flags|=65536,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,i)),!1}throw Error(s(435,n.tag))}return Gu(e,r,i),Du(),!1}if(N)return t=co.current,t===null?(r!==Ui&&(t=Error(s(423),{cause:r}),Xi(Ti(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,r=Ti(r,n),i=tc(e.stateNode,r,i),Za(e,i),X!==4&&(X=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,r!==Ui&&(e=Error(s(422),{cause:r}),Xi(Ti(e,n)))),!1;var a=Error(s(520),{cause:r});if(a=Ti(a,n),Xl===null?Xl=[a]:Xl.push(a),X!==4&&(X=2),t===null)return!0;r=Ti(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=tc(n.stateNode,r,e),Za(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||a!==null&&typeof a.componentDidCatch==`function`&&(ru===null||!ru.has(a))))return n.flags|=65536,i&=-i,n.lanes|=i,i=nc(i),rc(i,e,n,r),Za(n,i),!1}n=n.return}while(n!==null);return!1}var ac=Error(s(461)),V=!1;function oc(e,t,n,r){t.child=e===null?Wa(t,null,n,r):Ua(t,e.child,n,r)}function sc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return oa(t),r=Eo(e,t,n,o,a,i),s=Ao(),e!==null&&!V?(jo(e,t,i),jc(e,t,i)):(N&&s&&Li(t),t.flags|=1,oc(e,t,r,i),t.child)}function cc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!gi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,lc(e,t,a,r,i)):(e=yi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Mc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ar:n,n(o,r)&&e.ref===t.ref)return jc(e,t,i)}return t.flags|=1,e=_i(a,r),e.ref=t.ref,e.return=t,t.child=e}function lc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ar(a,r)&&e.ref===t.ref)if(V=!1,t.pendingProps=r=a,Mc(e,i))e.flags&131072&&(V=!0);else return t.lanes=e.lanes,jc(e,t,i)}return _c(e,t,n,r,i)}function uc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return fc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ta(t,a===null?null:a.cachePool),a===null?oo():ao(t,a),po(t);else return r=t.lanes=536870912,fc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ta(t,null),oo(),mo(t)):(Ta(t,a.cachePool),ao(t,a),mo(t),t.memoizedState=null);return oc(e,t,i,n),t.child}function dc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function fc(e,t,n,r,i){var a=wa();return a=a===null?null:{parent:P._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ta(t,null),oo(),po(t),e!==null&&ia(e,t,r,!0),t.childLanes=i,null}function pc(e,t){return t=Ec({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function mc(e,t,n){return Ua(t,e.child,null,n),e=pc(t,t.pendingProps),e.flags|=2,ho(t),t.memoizedState=null,e}function hc(e,t,n){var r=t.pendingProps,i=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(N){if(r.mode===`hidden`)return e=pc(t,r),t.lanes=536870912,dc(null,e);if(fo(t),(e=M)?(e=rf(e,Hi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Mi===null?null:{id:Ni,overflow:Pi},retryLane:536870912,hydrationErrors:null},n=Si(e),n.return=t,t.child=n,Bi=t,M=null)):e=null,e===null)throw Wi(t);return t.lanes=536870912,null}return pc(t,r)}var a=e.memoizedState;if(a!==null){var o=a.dehydrated;if(fo(t),i)if(t.flags&256)t.flags&=-257,t=mc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(s(558));else if(V||ia(e,t,n,!1),i=(n&e.childLanes)!==0,V||i){if(r=K,r!==null&&(o=st(r,n),o!==0&&o!==a.retryLane))throw a.retryLane=o,ui(e,o),hu(r,e,o),ac;Du(),t=mc(e,t,n)}else e=a.treeContext,M=cf(o.nextSibling),Bi=t,N=!0,Vi=null,Hi=!1,e!==null&&zi(t,e),t=pc(t,r),t.flags|=4096;return t}return e=_i(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function gc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(s(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function _c(e,t,n,r,i){return oa(t),n=Eo(e,t,n,r,void 0,i),r=Ao(),e!==null&&!V?(jo(e,t,i),jc(e,t,i)):(N&&r&&Li(t),t.flags|=1,oc(e,t,n,i),t.child)}function vc(e,t,n,r,i,a){return oa(t),t.updateQueue=null,n=Oo(t,r,n,i),Do(e),r=Ao(),e!==null&&!V?(jo(e,t,a),jc(e,t,a)):(N&&r&&Li(t),t.flags|=1,oc(e,t,n,a),t.child)}function yc(e,t,n,r,i){if(oa(t),t.stateNode===null){var a=pi,o=n.contextType;typeof o==`object`&&o&&(a=sa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ks,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ka(t),o=n.contextType,a.context=typeof o==`object`&&o?sa(o):pi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Gs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ks.enqueueReplaceState(a,a.state,null),eo(t,r,a,i),$a(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ys(n,s);a.props=c;var l=a.context,u=n.contextType;o=pi,typeof u==`object`&&u&&(o=sa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Js(t,a,r,o),Ga=!1;var f=t.memoizedState;a.state=f,eo(t,r,a,i),$a(),l=t.memoizedState,s||f!==l||Ga?(typeof d==`function`&&(Gs(t,n,d,r),l=t.memoizedState),(c=Ga||qs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,qa(e,t),o=t.memoizedProps,u=Ys(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=pi,typeof l==`object`&&l&&(c=sa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Js(t,a,r,c),Ga=!1,f=t.memoizedState,a.state=f,eo(t,r,a,i),$a();var p=t.memoizedState;o!==d||f!==p||Ga||e!==null&&e.dependencies!==null&&aa(e.dependencies)?(typeof s==`function`&&(Gs(t,n,s,r),p=t.memoizedState),(u=Ga||qs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&aa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,gc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ua(t,e.child,null,i),t.child=Ua(t,null,n,i)):oc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=jc(e,t,i),e}function bc(e,t,n,r){return Ji(),t.flags|=256,oc(e,t,n,r),t.child}var xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:Ea()}}function Cc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function wc(e,t,n){var r=t.pendingProps,i=!1,a=(t.flags&128)!=0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(F.current&2)!=0),o&&(i=!0,t.flags&=-129),o=(t.flags&32)!=0,t.flags&=-33,e===null){if(N){if(i?uo(t):mo(t),(e=M)?(e=rf(e,Hi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Mi===null?null:{id:Ni,overflow:Pi},retryLane:536870912,hydrationErrors:null},n=Si(e),n.return=t,t.child=n,Bi=t,M=null)):e=null,e===null)throw Wi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,i?(mo(t),i=t.mode,c=Ec({mode:`hidden`,children:c},i),r=bi(r,i,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,o,n),t.memoizedState=xc,dc(null,r)):(uo(t),Tc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(a)t.flags&256?(uo(t),t.flags&=-257,t=Dc(e,t,n)):t.memoizedState===null?(mo(t),c=r.fallback,i=t.mode,r=Ec({mode:`visible`,children:r.children},i),c=bi(c,i,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ua(t,e.child,null,n),r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,o,n),t.memoizedState=xc,t=dc(null,r)):(mo(t),t.child=e.child,t.flags|=128,t=null);else if(uo(t),of(c)){if(o=c.nextSibling&&c.nextSibling.dataset,o)var u=o.dgst;o=u,r=Error(s(419)),r.stack=``,r.digest=o,Xi({value:r,source:null,stack:null}),t=Dc(e,t,n)}else if(V||ia(e,t,n,!1),o=(n&e.childLanes)!==0,V||o){if(o=K,o!==null&&(r=st(o,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ui(e,r),hu(o,e,r),ac;af(c)||Du(),t=Dc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,M=cf(c.nextSibling),Bi=t,N=!0,Vi=null,Hi=!1,e!==null&&zi(t,e),t=Tc(t,r.children),t.flags|=4096);return t}return i?(mo(t),c=r.fallback,i=t.mode,l=e.child,u=l.sibling,r=_i(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=bi(c,i,n,null),c.flags|=2):c=_i(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,dc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Sc(n):(i=c.cachePool,i===null?i=Ea():(l=P._currentValue,i=i.parent===l?i:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:i}),r.memoizedState=c,r.childLanes=Cc(e,o,n),t.memoizedState=xc,dc(e.child,r)):(uo(t),n=e.child,e=n.sibling,n=_i(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Tc(e,t){return t=Ec({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Ec(e,t){return e=hi(22,e,null,t),e.lanes=0,e}function Dc(e,t,n){return Ua(t,e.child,null,n),e=Tc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Oc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),na(e.return,t,n)}function kc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ac(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=F.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,k(F,o),oc(e,t,r,n),r=N?ki:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Oc(e,n,t);else if(e.tag===19)Oc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&go(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),kc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&go(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}kc(t,!0,n,null,a,r);break;case`together`:kc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function jc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(ia(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=_i(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=_i(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Mc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&aa(e))):!0}function Nc(e,t,n){switch(t.tag){case 3:_e(t,t.stateNode.containerInfo),ea(t,P,e.memoizedState.cache),Ji();break;case 27:case 5:ye(t);break;case 4:_e(t,t.stateNode.containerInfo);break;case 10:ea(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(uo(t),e=jc(e,t,n),e===null?null:e.sibling):wc(e,t,n):(uo(t),t.flags|=128,null);uo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(ia(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ac(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(F,F.current),r)break;return null;case 22:return t.lanes=0,uc(e,t,n,t.pendingProps);case 24:ea(t,P,e.memoizedState.cache)}return jc(e,t,n)}function Pc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)V=!0;else{if(!Mc(e,n)&&!(t.flags&128))return V=!1,Nc(e,t,n);V=!!(e.flags&131072)}else V=!1,N&&t.flags&1048576&&Ii(t,ki,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Na(t.elementType),t.type=e,typeof e==`function`)gi(e)?(r=Ys(e,r),t.tag=1,t=yc(null,t,e,r,n)):(t.tag=0,t=_c(null,t,e,r,n));else{if(e!=null){var i=e.$$typeof;if(i===C){t.tag=11,t=sc(null,t,e,r,n);break a}else if(i===re){t.tag=14,t=cc(null,t,e,r,n);break a}}throw t=T(e)||e,Error(s(306,t,``))}}return t;case 0:return _c(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,i=Ys(r,t.pendingProps),yc(e,t,r,i,n);case 3:a:{if(_e(t,t.stateNode.containerInfo),e===null)throw Error(s(387));r=t.pendingProps;var a=t.memoizedState;i=a.element,qa(e,t),eo(t,r,null,n);var o=t.memoizedState;if(r=o.cache,ea(t,P,r),r!==a.cache&&ra(t,[P],n,!0),$a(),r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=bc(e,t,r,n);break a}else if(r!==i){i=Ti(Error(s(424)),t),Xi(i),t=bc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(M=cf(e.firstChild),Bi=t,N=!0,Vi=null,Hi=!0,n=Wa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ji(),r===i){t=jc(e,t,n);break a}oc(e,t,r,n)}t=t.child}return t;case 26:return gc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:N||(n=t.type,e=t.pendingProps,r=Bd(A.current).createElement(n),r[pt]=t,r[mt]=e,Pd(r,n,e),Et(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ye(t),e===null&&N&&(r=t.stateNode=ff(t.type,t.pendingProps,A.current),Bi=t,Hi=!0,i=M,Zd(t.type)?(lf=i,M=cf(r.firstChild)):M=i),oc(e,t,t.pendingProps.children,n),gc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&N&&((i=r=M)&&(r=tf(r,t.type,t.pendingProps,Hi),r===null?i=!1:(t.stateNode=r,Bi=t,M=cf(r.firstChild),Hi=!1,i=!0)),i||Wi(t)),ye(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,r=a.children,Ud(i,a)?r=null:o!==null&&Ud(i,o)&&(t.flags|=32),t.memoizedState!==null&&(i=Eo(e,t,ko,null,null,n),Qf._currentValue=i),gc(e,t),oc(e,t,r,n),t.child;case 6:return e===null&&N&&((e=n=M)&&(n=nf(n,t.pendingProps,Hi),n===null?e=!1:(t.stateNode=n,Bi=t,M=null,e=!0)),e||Wi(t)),null;case 13:return wc(e,t,n);case 4:return _e(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ua(t,null,r,n):oc(e,t,r,n),t.child;case 11:return sc(e,t,t.type,t.pendingProps,n);case 7:return oc(e,t,t.pendingProps,n),t.child;case 8:return oc(e,t,t.pendingProps.children,n),t.child;case 12:return oc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ea(t,t.type,r.value),oc(e,t,r.children,n),t.child;case 9:return i=t.type._context,r=t.pendingProps.children,oa(t),i=sa(i),r=r(i),t.flags|=1,oc(e,t,r,n),t.child;case 14:return cc(e,t,t.type,t.pendingProps,n);case 15:return lc(e,t,t.type,t.pendingProps,n);case 19:return Ac(e,t,n);case 31:return hc(e,t,n);case 22:return uc(e,t,n,t.pendingProps);case 24:return oa(t),r=sa(P),e===null?(i=wa(),i===null&&(i=K,a=pa(),i.pooledCache=a,a.refCount++,a!==null&&(i.pooledCacheLanes|=n),i=a),t.memoizedState={parent:r,cache:i},Ka(t),ea(t,P,i)):((e.lanes&n)!==0&&(qa(e,t),eo(t,null,null,n),$a()),i=e.memoizedState,a=t.memoizedState,i.parent===r?(r=a.cache,ea(t,P,r),r!==i.cache&&ra(t,[P],n,!0)):(i={parent:r,cache:r},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),ea(t,P,r))),oc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(s(156,t.tag))}function Fc(e){e.flags|=4}function Ic(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Pa=Aa,Oa}else e.flags&=-16777217}function Lc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Pa=Aa,Oa}function Rc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:tt(),e.lanes|=t,Yl|=t)}function zc(e,t){if(!N)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function H(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Bc(e,t,n){var r=t.pendingProps;switch(Ri(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return H(t),null;case 1:return H(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ta(P),ve(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(qi(t)?Fc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Yi())),H(t),null;case 26:var i=t.type,a=t.memoizedState;return e===null?(Fc(t),a===null?(H(t),Ic(t,i,null,r,n)):(H(t),Lc(t,a))):a?a===e.memoizedState?(H(t),t.flags&=-16777217):(Fc(t),H(t),Lc(t,a)):(e=e.memoizedProps,e!==r&&Fc(t),H(t),Ic(t,i,e,r,n)),null;case 27:if(be(t),n=A.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return H(t),null}e=me.current,qi(t)?Gi(t,e):(e=ff(i,r,n),t.stateNode=e,Fc(t))}return H(t),null;case 5:if(be(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(s(166));return H(t),null}if(a=me.current,qi(t))Gi(t,a);else{var o=Bd(A.current);switch(a){case 1:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case 2:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;default:switch(i){case`svg`:a=o.createElementNS(`http://www.w3.org/2000/svg`,i);break;case`math`:a=o.createElementNS(`http://www.w3.org/1998/Math/MathML`,i);break;case`script`:a=o.createElement(`div`),a.innerHTML=`<script><\/script>`,a=a.removeChild(a.firstChild);break;case`select`:a=typeof r.is==`string`?o.createElement(`select`,{is:r.is}):o.createElement(`select`),r.multiple?a.multiple=!0:r.size&&(a.size=r.size);break;default:a=typeof r.is==`string`?o.createElement(i,{is:r.is}):o.createElement(i)}}a[pt]=t,a[mt]=r;a:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)a.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break a;for(;o.sibling===null;){if(o.return===null||o.return===t)break a;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=a;a:switch(Pd(a,i,r),i){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Fc(t)}}return H(t),Ic(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(s(166));if(e=A.current,qi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,i=Bi,i!==null)switch(i.tag){case 27:case 5:r=i.memoizedProps}e[pt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Wi(t,!0)}else e=Bd(e).createTextNode(r),e[pt]=t,t.stateNode=e}return H(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=qi(t),n!==null){if(e===null){if(!r)throw Error(s(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(s(557));e[pt]=t}else Ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),e=!1}else n=Yi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ho(t),t):(ho(t),null);if(t.flags&128)throw Error(s(558))}return H(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=qi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(s(318));if(i=t.memoizedState,i=i===null?null:i.dehydrated,!i)throw Error(s(317));i[pt]=t}else Ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),i=!1}else i=Yi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ho(t),t):(ho(t),null)}return ho(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,i=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(i=r.alternate.memoizedState.cachePool.pool),a=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(a=r.memoizedState.cachePool.pool),a!==i&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Rc(t,t.updateQueue),H(t),null);case 4:return ve(),e===null&&Sd(t.stateNode.containerInfo),H(t),null;case 10:return ta(t.type),H(t),null;case 19:if(O(F),r=t.memoizedState,r===null)return H(t),null;if(i=(t.flags&128)!=0,a=r.rendering,a===null)if(i)zc(r,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=go(e),a!==null){for(t.flags|=128,zc(r,!1),e=a.updateQueue,t.updateQueue=e,Rc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)vi(n,e),n=n.sibling;return k(F,F.current&1|2),N&&Fi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Me()>tu&&(t.flags|=128,i=!0,zc(r,!1),t.lanes=4194304)}else{if(!i)if(e=go(a),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Rc(t,e),zc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!a.alternate&&!N)return H(t),null}else 2*Me()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,i=!0,zc(r,!1),t.lanes=4194304);r.isBackwards?(a.sibling=t.child,t.child=a):(e=r.last,e===null?t.child=a:e.sibling=a,r.last=a)}return r.tail===null?(H(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Me(),e.sibling=null,n=F.current,k(F,i?n&1|2:n&1),N&&Fi(t,r.treeForkCount),e);case 22:case 23:return ho(t),so(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(H(t),t.subtreeFlags&6&&(t.flags|=8192)):H(t),n=t.updateQueue,n!==null&&Rc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&O(Ca),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ta(P),H(t),null;case 25:return null;case 30:return null}throw Error(s(156,t.tag))}function Vc(e,t){switch(Ri(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ta(P),ve(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return be(t),null;case 31:if(t.memoizedState!==null){if(ho(t),t.alternate===null)throw Error(s(340));Ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ho(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));Ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(F),null;case 4:return ve(),null;case 10:return ta(t.type),null;case 22:case 23:return ho(t),so(),e!==null&&O(Ca),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ta(P),null;case 25:return null;default:return null}}function Hc(e,t){switch(Ri(t),t.tag){case 3:ta(P),ve();break;case 26:case 27:case 5:be(t);break;case 4:ve();break;case 31:t.memoizedState!==null&&ho(t);break;case 13:ho(t);break;case 19:O(F);break;case 10:ta(t.type);break;case 22:case 23:ho(t),so(),e!==null&&O(Ca);break;case 24:ta(P)}}function Uc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Wc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Gc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{no(t,n)}catch(t){Z(e,e.return,t)}}}function Kc(e,t,n){n.props=Ys(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function qc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Jc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Yc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Xc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[mt]=t}catch(t){Z(e,e.return,t)}}function Zc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Qc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Zc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=sn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for($c(e,t,n),e=e.sibling;e!==null;)$c(e,t,n),e=e.sibling}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[pt]=e,t[mt]=n}catch(t){Z(e,e.return,t)}}var nl=!1,U=!1,rl=!1,il=typeof WeakSet==`function`?WeakSet:Set,al=null;function ol(e,t){if(e=e.containerInfo,Rd=sp,e=Pr(e),Fr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break a}var o=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||i!==0&&f.nodeType!==3||(c=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===i&&(c=o),p===a&&++d===r&&(l=o),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,al=t;al!==null;)if(t=al,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,al=e;else for(;al!==null;){switch(t=al,a=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&a!==null){e=void 0,n=t,i=a.memoizedProps,a=a.memoizedState,r=n.stateNode;try{var h=Ys(n.type,i);e=r.getSnapshotBeforeUpdate(h,a),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(s(163))}if(e=t.sibling,e!==null){e.return=t.return,al=e;break}al=t.return}}function sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:xl(e,n),r&4&&Uc(5,n);break;case 1:if(xl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ys(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Gc(n),r&512&&qc(n,n.return);break;case 3:if(xl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{no(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&tl(n);case 26:case 5:xl(e,n),t===null&&r&4&&Yc(n),r&512&&qc(n,n.return);break;case 12:xl(e,n);break;case 31:xl(e,n),r&4&&fl(e,n);break;case 13:xl(e,n),r&4&&pl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||nl,!r){t=t!==null&&t.memoizedState!==null||U,i=nl;var a=U;nl=r,(U=t)&&!a?Cl(e,n,(n.subtreeFlags&8772)!=0):xl(e,n),nl=i,U=a}break;case 30:break;default:xl(e,n)}}function cl(e){var t=e.alternate;t!==null&&(e.alternate=null,cl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ll=!1;function ul(e,t,n){for(n=n.child;n!==null;)dl(e,t,n),n=n.sibling}function dl(e,t,n){if(He&&typeof He.onCommitFiberUnmount==`function`)try{He.onCommitFiberUnmount(Ve,n)}catch{}switch(n.tag){case 26:U||Jc(n,t),ul(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:U||Jc(n,t);var r=W,i=ll;Zd(n.type)&&(W=n.stateNode,ll=!1),ul(e,t,n),pf(n.stateNode),W=r,ll=i;break;case 5:U||Jc(n,t);case 6:if(r=W,i=ll,W=null,ul(e,t,n),W=r,ll=i,W!==null)if(ll)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:W!==null&&(ll?(e=W,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(W,n.stateNode));break;case 4:r=W,i=ll,W=n.stateNode.containerInfo,ll=!0,ul(e,t,n),W=r,ll=i;break;case 0:case 11:case 14:case 15:Wc(2,n,t),U||Wc(4,n,t),ul(e,t,n);break;case 1:U||(Jc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Kc(n,t,r)),ul(e,t,n);break;case 21:ul(e,t,n);break;case 22:U=(r=U)||n.memoizedState!==null,ul(e,t,n),U=r;break;default:ul(e,t,n)}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ml(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new il),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new il),t;default:throw Error(s(435,e.tag))}}function hl(e,t){var n=ml(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function gl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r],a=e,o=t,c=o;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){W=c.stateNode,ll=!1;break a}break;case 5:W=c.stateNode,ll=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ll=!0;break a}c=c.return}if(W===null)throw Error(s(160));dl(a,o,i),W=null,ll=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vl(t,e),t=t.sibling}var _l=null;function vl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gl(t,e),yl(e),r&4&&(Wc(3,e,e.return),Uc(3,e),Wc(5,e,e.return));break;case 1:gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),r&64&&nl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var i=_l;if(gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),r&4){var a=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,i=i.ownerDocument||i;b:switch(r){case`title`:a=i.getElementsByTagName(`title`)[0],(!a||a[bt]||a[pt]||a.namespaceURI===`http://www.w3.org/2000/svg`||a.hasAttribute(`itemprop`))&&(a=i.createElement(r),i.head.insertBefore(a,i.querySelector(`head > title`))),Pd(a,r,n),a[pt]=e,Et(a),r=a;break a;case`link`:var o=Vf(`link`,`href`,i).get(r+(n.href||``));if(o){for(var c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&a.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&a.getAttribute(`title`)===(n.title==null?null:n.title)&&a.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;case`meta`:if(o=Vf(`meta`,`content`,i).get(r+(n.content||``))){for(c=0;c<o.length;c++)if(a=o[c],a.getAttribute(`content`)===(n.content==null?null:``+n.content)&&a.getAttribute(`name`)===(n.name==null?null:n.name)&&a.getAttribute(`property`)===(n.property==null?null:n.property)&&a.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&a.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(c,1);break b}}a=i.createElement(r),Pd(a,r,n),i.head.appendChild(a);break;default:throw Error(s(468,r))}a[pt]=e,Et(a),r=a}e.stateNode=r}else Hf(i,e.type,e.stateNode);else e.stateNode=If(i,r,e.memoizedProps);else a===r?r===null&&e.stateNode!==null&&Xc(e,e.memoizedProps,n.memoizedProps):(a===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):a.count--,r===null?Hf(i,e.type,e.stateNode):If(i,r,e.memoizedProps))}break;case 27:gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),n!==null&&r&4&&Xc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),e.flags&32){i=e.stateNode;try{Qt(i,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(i=e.memoizedProps,Xc(e,i,n===null?i:n.memoizedProps)),r&1024&&(rl=!0);break;case 6:if(gl(t,e),yl(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,i=_l,_l=gf(t.containerInfo),gl(t,e),_l=i,yl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}rl&&(rl=!1,bl(e));break;case 4:r=_l,_l=gf(e.stateNode.containerInfo),gl(t,e),yl(e),_l=r;break;case 12:gl(t,e),yl(e);break;case 31:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 13:gl(t,e),yl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Me()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 22:i=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=nl,d=U;if(nl=u||i,U=d||l,gl(t,e),U=d,nl=u,yl(e),r&8192)a:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||l||nl||U||Sl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(a=l.stateNode,i)o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=i?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;i?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,hl(e,n))));break;case 19:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 30:break;case 21:break;default:gl(t,e),yl(e)}}function yl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Zc(r)){n=r;break}r=r.return}if(n==null)throw Error(s(160));switch(n.tag){case 27:var i=n.stateNode;el(e,Qc(e),i);break;case 5:var a=n.stateNode;n.flags&32&&(Qt(a,``),n.flags&=-33),el(e,Qc(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;$c(e,Qc(e),o);break;default:throw Error(s(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function xl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sl(e,t.alternate,t),t=t.sibling}function Sl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Wc(4,t,t.return),Sl(t);break;case 1:Jc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Kc(t,t.return,n),Sl(t);break;case 27:pf(t.stateNode);case 26:case 5:Jc(t,t.return),Sl(t);break;case 22:t.memoizedState===null&&Sl(t);break;case 30:Sl(t);break;default:Sl(t)}e=e.sibling}}function Cl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Cl(i,a,n),Uc(4,a);break;case 1:if(Cl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)to(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Gc(a),qc(a,a.return);break;case 27:tl(a);case 26:case 5:Cl(i,a,n),n&&r===null&&o&4&&Yc(a),qc(a,a.return);break;case 12:Cl(i,a,n);break;case 31:Cl(i,a,n),n&&o&4&&fl(i,a);break;case 13:Cl(i,a,n),n&&o&4&&pl(i,a);break;case 22:a.memoizedState===null&&Cl(i,a,n),qc(a,a.return);break;case 30:break;default:Cl(i,a,n)}t=t.sibling}}function wl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ma(n))}function Tl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e))}function El(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dl(e,t,n,r),t=t.sibling}function Dl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:El(e,t,n,r),i&2048&&Uc(9,t);break;case 1:El(e,t,n,r);break;case 3:El(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e)));break;case 12:if(i&2048){El(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else El(e,t,n,r);break;case 31:El(e,t,n,r);break;case 13:El(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?El(e,t,n,r):(a._visibility|=2,Ol(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?El(e,t,n,r):kl(e,t),i&2048&&wl(o,t);break;case 24:El(e,t,n,r),i&2048&&Tl(t.alternate,t);break;default:El(e,t,n,r)}}function Ol(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Ol(a,o,s,c,i),Uc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Ol(a,o,s,c,i)):u._visibility&2?Ol(a,o,s,c,i):kl(a,o),i&&l&2048&&wl(o.alternate,o);break;case 24:Ol(a,o,s,c,i),i&&l&2048&&Tl(o.alternate,o);break;default:Ol(a,o,s,c,i)}t=t.sibling}}function kl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:kl(n,r),i&2048&&wl(r.alternate,r);break;case 24:kl(n,r),i&2048&&Tl(r.alternate,r);break;default:kl(n,r)}t=t.sibling}}var Al=8192;function jl(e,t,n){if(e.subtreeFlags&Al)for(e=e.child;e!==null;)Ml(e,t,n),e=e.sibling}function Ml(e,t,n){switch(e.tag){case 26:jl(e,t,n),e.flags&Al&&e.memoizedState!==null&&Gf(n,_l,e.memoizedState,e.memoizedProps);break;case 5:jl(e,t,n);break;case 3:case 4:var r=_l;_l=gf(e.stateNode.containerInfo),jl(e,t,n),_l=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Al,Al=16777216,jl(e,t,n),Al=r):jl(e,t,n));break;default:jl(e,t,n)}}function Nl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Pl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fl(e),e=e.sibling}function Fl(e){switch(e.tag){case 0:case 11:case 15:Pl(e),e.flags&2048&&Wc(9,e,e.return);break;case 3:Pl(e);break;case 12:Pl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Il(e)):Pl(e);break;default:Pl(e)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Wc(8,t,t.return),Il(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Il(t));break;default:Il(t)}e=e.sibling}}function Ll(e,t){for(;al!==null;){var n=al;switch(n.tag){case 0:case 11:case 15:Wc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,al=r;else a:for(n=e;al!==null;){r=al;var i=r.sibling,a=r.return;if(cl(r),r===n){al=null;break a}if(i!==null){i.return=a,al=i;break a}al=a}}}var Rl={getCacheForType:function(e){var t=sa(P),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return sa(P).controller.signal}},zl=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,Bl=null,Vl=!1,Hl=!1,Ul=!1,Wl=0,X=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return G&2&&J!==0?J&-J:E.T===null?ut():dd()}function mu(){if(Jl===0)if(!(J&536870912)||N){var e=Ye;Ye<<=1,!(Ye&3932160)&&(Ye=262144),Jl=e}else Jl=536870912;return e=co.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,J,Jl,!1)),rt(e,n),(!(G&2)||e!==K)&&(e===K&&(!(G&2)&&(Kl|=n),X===4&&yu(e,J,Jl,!1)),rd(e))}function gu(e,t,n){if(G&6)throw Error(s(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||$e(e,t),i=r?Au(e,t):Ou(e,t,!0),a=r;do{if(i===0){Hl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!vu(n)){i=Ou(e,t,!1),a=!1;continue}if(i===2){if(a=t,e.errorRecoveryDisabledLanes&a)var o=0;else o=e.pendingLanes&-536870913,o=o===0?o&536870912?536870912:0:o;if(o!==0){t=o;a:{var c=e;i=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,o).flags|=256),o=Ou(c,o,!1),o!==2){if(Ul&&!l){c.errorRecoveryDisabledLanes|=a,Kl|=a,i=4;break a}a=Zl,Zl=i,a!==null&&(Zl===null?Zl=a:Zl.push.apply(Zl,a))}i=o}if(a=!1,i!==2)continue}}if(i===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,a=i,a){case 0:case 1:throw Error(s(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Vl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(s(329))}if((t&62914560)===t&&(i=$l+300-Me(),10<i)){if(yu(r,t,Jl,!Vl),Qe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,a,`Throttled`,-0,0),i);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,a,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:sn},Ml(t,a,d);var m=(a&62914560)===a?$l-Me():(a&4194048)===a?eu-Me():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!kr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-We(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&at(e,n,t)}function bu(){return G&6?!0:(id(0,!1),!1)}function xu(){if(q!==null){if(Y===0)var e=q.return;else e=q,$i=Qi=null,Mo(e),La=null,Ra=0,e=q;for(;e!==null;)Hc(e.alternate,e),e=e.return;q=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),K=e,q=n=_i(e.current,null),J=t,Y=0,Bl=null,Vl=!1,Hl=$e(e,t),Ul=!1,Yl=Jl=ql=Kl=Gl=X=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-We(r),a=1<<i;t|=e[i],r&=~a}return Wl=t,si(),n}function Cu(e,t){I=null,E.H=Vs,t===Da||t===ka?(t=Fa(),Y=3):t===Oa?(t=Fa(),Y=4):Y=t===ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Bl=t,q===null&&(X=1,$s(e,Ti(t,e.current)))}function wu(){var e=co.current;return e===null?!0:(J&4194048)===J?lo===null:(J&62914560)===J||J&536870912?e===lo:!1}function Tu(){var e=E.H;return E.H=Vs,e===null?Vs:e}function Eu(){var e=E.A;return E.A=Rl,e}function Du(){X=4,Vl||(J&4194048)!==J&&co.current!==null||(Hl=!0),!(Gl&134217727)&&!(Kl&134217727)||K===null||yu(K,J,Jl,!1)}function Ou(e,t,n){var r=G;G|=2;var i=Tu(),a=Eu();(K!==e||J!==t)&&(nu=null,Su(e,t)),t=!1;var o=X;a:do try{if(Y!==0&&q!==null){var s=q,c=Bl;switch(Y){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:co.current===null&&(t=!0);var l=Y;if(Y=0,Bl=null,Pu(e,s,c,l),n&&Hl){o=0;break a}break;default:l=Y,Y=0,Bl=null,Pu(e,s,c,l)}}ku(),o=X;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,$i=Qi=null,G=r,E.H=i,E.A=a,q===null&&(K=null,J=0,si()),o}function ku(){for(;q!==null;)Mu(q)}function Au(e,t){var n=G;G|=2;var r=Tu(),i=Eu();K!==e||J!==t?(nu=null,tu=Me()+500,Su(e,t)):Hl=$e(e,t);a:do try{if(Y!==0&&q!==null){t=q;var a=Bl;b:switch(Y){case 1:Y=0,Bl=null,Pu(e,t,a,1);break;case 2:case 9:if(ja(a)){Y=0,Bl=null,Nu(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),rd(e)},a.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:ja(a)?(Y=0,Bl=null,Nu(t)):(Y=0,Bl=null,Pu(e,t,a,7));break;case 5:var o=null;switch(q.tag){case 26:o=q.memoizedState;case 5:case 27:var c=q;if(o?Wf(o):c.stateNode.complete){Y=0,Bl=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,Fu(u))}break b}}Y=0,Bl=null,Pu(e,t,a,5);break;case 6:Y=0,Bl=null,Pu(e,t,a,6);break;case 8:xu(),X=6;break a;default:throw Error(s(462))}}ju();break}catch(t){Cu(e,t)}while(1);return $i=Qi=null,E.H=r,E.A=i,G=n,q===null?(K=null,J=0,si(),X):0}function ju(){for(;q!==null&&!Ae();)Mu(q)}function Mu(e){var t=Pc(e.alternate,e,Wl);e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=vc(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=vc(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:Mo(t);default:Hc(n,t),t=q=vi(t,Wl),t=Pc(n,t,Wl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Pu(e,t,n,r){$i=Qi=null,Mo(t),La=null,Ra=0;var i=t.return;try{if(ic(e,i,t,n,J)){X=1,$s(e,Ti(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;X=1,$s(e,Ti(n,e.current)),q=null;return}t.flags&32768?(N||r===1?e=!0:Hl||J&536870912?e=!1:(Vl=e=!0,(r===2||r===9||r===3||r===6)&&(r=co.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Vl);return}e=t.return;var n=Bc(t.alternate,t,Wl);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);X===0&&(X=5)}function Iu(e,t){do{var n=Vc(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);X=6,q=null}function Lu(e,t,n,r,i,a,o,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(G&6)throw Error(s(327));if(t!==null){if(t===e.current)throw Error(s(177));if(a=t.lanes|t.childLanes,a|=oi,it(e,n,a,o,c,l),e===K&&(q=K=null,J=0),ou=t,au=e,su=n,cu=a,lu=i,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ie,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=E.T,E.T=null,i=D.p,D.p=2,o=G,G|=4;try{ol(e,t,n)}finally{G=o,D.p=i,E.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{vl(t,e);var a=zd,o=Pr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Nr(s.ownerDocument.documentElement,s)){if(c!==null&&Fr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Mr(s,h),v=Mr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{G=i,D.p=r,E.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{sl(e,t.alternate,t)}finally{G=i,D.p=r,E.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,je();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),lt(n),t=t.stateNode,He&&typeof He.onCommitFiberRoot==`function`)try{He.onCommitFiberRoot(Ve,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ma(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=lt(su),r=E.T,i=D.p;try{D.p=32>n?32:n,E.T=null,n=lu,lu=null;var a=au,o=su;if(iu=0,ou=au=null,su=0,G&6)throw Error(s(331));var c=G;if(G|=4,Fl(a.current),Dl(a,a.current,o,n),G=c,id(0,!1),He&&typeof He.onPostCommitFiberRoot==`function`)try{He.onPostCommitFiberRoot(Ve,a)}catch{}return!0}finally{D.p=i,E.T=r,Vu(e,t)}}function Wu(e,t,n){t=Ti(n,t),t=tc(e.stateNode,t,2),e=Ya(e,t,2),e!==null&&(rt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=Ti(n,e),n=nc(2),r=Ya(t,n,2),r!==null&&(rc(n,r,t,e),rt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new zl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Ul=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(X===4||X===3&&(J&62914560)===J&&300>Me()-$l?!(G&2)&&Su(e,0):ql|=n,Yl===J&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=tt()),e=ui(e,t),e!==null&&(rt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return j(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-We(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=J,a=Qe(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||$e(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Me(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-We(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=et(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=Qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ke(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||$e(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ke(r),lt(n)){case 2:case 8:n=Fe;break;case 32:n=Ie;break;case 268435456:n=Re;break;default:n=Ie}return r=cd.bind(null,e),n=j(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ke(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=J;return r=Qe(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Me()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){G&6?j(Pe,ad):od()})}function dd(){if(nd===0){var e=_a;e===0&&(e=Je,Je<<=1,!(Je&261888)&&(Je=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:on(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[mt]||null).action),o=r.submitter;o&&(t=(t=o[mt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new On(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ds(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ds(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ti.length;hd++){var gd=ti[hd];ni(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ni(qr,`onAnimationEnd`),ni(Jr,`onAnimationIteration`),ni(Yr,`onAnimationStart`),ni(`dblclick`,`onDoubleClick`),ni(`focusin`,`onFocus`),ni(`focusout`,`onBlur`),ni(Xr,`onTransitionRun`),ni(Zr,`onTransitionStart`),ni(Qr,`onTransitionCancel`),ni($r,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[gt];n===void 0&&(n=t[gt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!_n||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===i)return;o=o.return}for(;s!==null;){if(o=St(s),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=a=o;continue a}s=s.parentNode}}r=r.return}mn(function(){var r=a,i=ln(n),o=[];a:{var s=ei.get(e);if(s!==void 0){var c=On,u=e;switch(e){case`keypress`:if(Cn(n)===0)break a;case`keydown`:case`keyup`:c=Kn;break;case`focusin`:u=`focus`,c=Ln;break;case`focusout`:u=`blur`,c=Ln;break;case`beforeblur`:case`afterblur`:c=Ln;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=Fn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=In;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Jn;break;case qr:case Jr:case Yr:c=Rn;break;case $r:c=Yn;break;case`scroll`:case`scrollend`:c=An;break;case`wheel`:c=Xn;break;case`copy`:case`cut`:case`paste`:c=zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=qn;break;case`toggle`:case`beforetoggle`:c=Zn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?s===null?null:s+`Capture`:s;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=hn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(s=new c(s,u,null,n,i),o.push({event:s,listeners:d}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==cn&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[ht]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(u=n.relatedTarget||n.toElement,c=r,u=u?St(u):null,u!==null&&(f=l(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(c=null,u=r),c!==u)){if(d=Fn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=qn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?s:wt(c),h=u==null?s:wt(u),s=new d(g,m+`leave`,c,n,i),s.target=f,s.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,c&&u)b:{for(d=Dd,p=c,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;c!==null&&Od(o,s,c,d,!1),u!==null&&f!==null&&Od(o,f,u,d,!0)}}a:{if(s=r?wt(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var v=_r;else if(dr(s))if(vr)v=Dr;else{v=Tr;var y=wr}else c=s.nodeName,!c||c.toLowerCase()!==`input`||s.type!==`checkbox`&&s.type!==`radio`?r&&nn(r.elementType)&&(v=_r):v=Er;if(v&&=v(e,r)){fr(o,v,n,i);break a}y&&y(e,s,r),e===`focusout`&&r&&s.type===`number`&&r.memoizedProps.value!=null&&Jt(s,`number`,s.value)}switch(y=r?wt(r):window,e){case`focusin`:(dr(y)||y.contentEditable===`true`)&&(Lr=y,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(o,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(o,n,i)}var b;if($n)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else sr?ar(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(nr&&n.locale!==`ko`&&(sr||x!==`onCompositionStart`?x===`onCompositionEnd`&&sr&&(b=Sn()):(yn=i,bn=`value`in yn?yn.value:yn.textContent,sr=!0)),y=Ed(r,x),0<y.length&&(x=new Bn(x,e,null,n,i),o.push({event:x,listeners:y}),b?x.data=b:(b=or(n),b!==null&&(x.data=b)))),(b=tr?cr(e,n):lr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Bn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:y,listeners:x}),y.data=b)),md(o,e,r,n,i)}yd(o,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=hn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=hn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=hn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=hn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,i,a){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Qt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:tn(e,r,a);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof a==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,i.name,i,null),$(e,t,`formEncType`,i.formEncType,i,null),$(e,t,`formMethod`,i.formMethod,i,null),$(e,t,`formTarget`,i.formTarget,i,null)):($(e,t,`encType`,i.encType,i,null),$(e,t,`method`,i.method,i,null),$(e,t,`target`,i.target,i,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=on(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=on(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Lt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Lt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=rn.get(n)||n,Ft(e,n,r))}}function Nd(e,t,n,r,i,a){switch(n){case`style`:tn(e,r,a);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(s(61));if(n=r.__html,n!=null){if(i.children!=null)throw Error(s(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Qt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=sn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(i=n.endsWith(`Capture`),t=n.slice(2,i?n.length-7:void 0),a=e[mt]||null,a=a==null?null:a[n],typeof a==`function`&&e.removeEventListener(t,a,i),typeof r==`function`)){typeof a!=`function`&&a!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,i);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,i=!1,a;for(a in n)if(n.hasOwnProperty(a)){var o=n[a];if(o!=null)switch(a){case`src`:r=!0;break;case`srcSet`:i=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,a,o,n,null)}}i&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=a=o=i=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:i=d;break;case`type`:o=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:a=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(s(137,t));break;default:$(e,t,r,d,n,null)}}qt(e,a,c,l,u,o,i,!1);return;case`select`:for(i in Q(`invalid`,e),r=o=a=null,n)if(n.hasOwnProperty(i)&&(c=n[i],c!=null))switch(i){case`value`:a=c;break;case`defaultValue`:o=c;break;case`multiple`:r=c;default:$(e,t,i,c,n,null)}t=a,n=o,e.multiple=!!r,t==null?n!=null&&Yt(e,!!r,n,!0):Yt(e,!!r,t,!1);return;case`textarea`:for(o in Q(`invalid`,e),a=i=r=null,n)if(n.hasOwnProperty(o)&&(c=n[o],c!=null))switch(o){case`value`:r=c;break;case`defaultValue`:i=c;break;case`children`:a=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(s(91));break;default:$(e,t,o,c,n,null)}Zt(e,r,i,a);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(s(137,t));default:$(e,t,u,r,n,null)}return;default:if(nn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var i=null,a=null,o=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:a=m;break;case`name`:i=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:o=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(s(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Kt(e,o,c,l,u,d,a,i);return;case`select`:for(a in m=o=c=p=null,n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(a)||$(e,t,a,null,r,l)}for(i in r)if(a=r[i],l=n[i],r.hasOwnProperty(i)&&(a!=null||l!=null))switch(i){case`value`:p=a;break;case`defaultValue`:c=a;break;case`multiple`:o=a;default:a!==l&&$(e,t,i,a,r,l)}t=c,n=o,r=m,p==null?!!r!=!!n&&(t==null?Yt(e,!!n,n?[]:``,!1):Yt(e,!!n,t,!0)):Yt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(i=n[c],n.hasOwnProperty(c)&&i!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,i)}for(o in r)if(i=r[o],a=n[o],r.hasOwnProperty(o)&&(i!=null||a!=null))switch(o){case`value`:p=i;break;case`defaultValue`:m=i;break;case`children`:break;case`dangerouslySetInnerHTML`:if(i!=null)throw Error(s(91));break;default:i!==a&&$(e,t,o,i,r,a)}Xt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(s(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(nn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(s(452));return e;case`head`:if(e=t.head,!e)throw Error(s(453));return e;case`body`:if(e=t.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=D.d;D.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?ks(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Gt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Gt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Gt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Gt(n.imageSizes)+`"]`)):i+=`[href="`+Gt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Gt(r)+`"][href="`+Gt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Tt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Et(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var i=(i=A.current)?gf(i):null;if(!i)throw Error(s(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Tt(i).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var a=Tt(i).hoistableStyles,o=a.get(e);if(o||(i=i.ownerDocument||i,o={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},a.set(e,o),(a=i.querySelector(jf(e)))&&!a._p&&(o.instance=a,o.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),a||Nf(i,e,n,o.state))),t&&r===null)throw Error(s(528,``));return o}if(t&&r!==null)throw Error(s(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Tt(i).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(s(444,e))}}function Af(e){return`href="`+Gt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Et(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Gt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Gt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var i=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Pd(r,`style`,i),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:i=Af(n.href);var a=e.querySelector(jf(i));if(a)return t.state.loading|=4,t.instance=a,Et(a),a;r=Mf(n),(i=mf.get(i))&&Rf(r,i),a=(e.ownerDocument||e).createElement(`link`),Et(a);var o=a;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),t.state.loading|=4,Lf(a,n.precedence,e),t.instance=a;case`script`:return a=Pf(n.src),(i=e.querySelector(Ff(a)))?(t.instance=i,Et(i),i):(r=n,(i=mf.get(a))&&(r=h({},n),zf(r,i)),e=e.ownerDocument||e,i=e.createElement(`script`),Et(i),Pd(i,`link`,r),e.head.appendChild(i),t.instance=i);case`void`:return null;default:throw Error(s(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[pt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nt(0),this.hiddenUpdates=nt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=hi(3,null,null,t),e.current=a,a.stateNode=e,t=pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ka(a),e}function tp(e){return e?(e=pi,e):pi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ja(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ya(e,r,t),n!==null&&(hu(n,e,t),Xa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ui(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ct(t);var n=ui(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,up(e,t,n,r)}finally{D.p=a,E.T=i}}function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,up(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-We(o);s.entanglements[1]|=c,o&=~c}rd(a),!(G&6)&&(tu=Me()+500,id(0,!1))}}break;case 31:case 13:s=ui(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=ln(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=St(e),e!==null){var t=l(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=u(t),e!==null)return e;e=null}else if(n===31){if(e=d(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ne()){case Pe:return 2;case Fe:return 8;case Ie:case Le:return 32;case Re:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=St(e.target);if(t!==null){var n=l(t);if(n!==null){if(t=n.tag,t===13){if(t=u(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===31){if(t=d(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);cn=r,n.target.dispatchEvent(r),cn=null}else return t=Ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Ds(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[mt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[mt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ht]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ut();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=r.version;if(Lp!==`19.2.6`)throw Error(s(527,Lp,`19.2.6`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(s(188)):(e=Object.keys(e).join(`,`),Error(s(268,e)));return e=p(t),e=e===null?null:m(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.6`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.6`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ve=zp.inject(Rp),He=zp}catch{}}e.createRoot=function(e,t){if(!c(e))throw Error(s(299));var n=!1,r=``,i=Xs,a=Zs,o=Qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,i,a,o,Pp),e[ht]=t.current,Sd(e),new Fp(t)}})),c=e(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=s()}))(),l=e((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),u=e(((e,t)=>{t.exports=l()}))(),d=`v3`,f=[`key`,`tool`,`light`,`food`,`token`,`info`,`weapon`,`strange`],p=[`hp`,`sanity`,`max_hp`,`cleanse`,`attack`],m=[`on_enter`,`passive`],h={hp:[1,2],sanity:[1,1],max_hp:[1,1],attack:[1,1]},g=3;function _(e,t,n){var r=parseInt(e,10);return isNaN(r)&&(r=t),typeof n==`number`&&r<n&&(r=n),r}function v(e,t){return e==null?t||``:String(e)}function y(e){return{schema:d,level:typeof e==`number`?e:1,player:{hp:3,max_hp:3,sanity:2,level:1,status:`normal`,curses:[]},items:[],clues:[],exit_hook:``,prev_world:``,next_world:``,tombstone:{}}}function b(e){if(!e||typeof e!=`object`||Array.isArray(e))return null;var t=v(e.stat,``).trim().toLowerCase();if(p.indexOf(t)===-1)return null;var n=v(e.trigger,``).trim().toLowerCase();if(m.indexOf(n)===-1)return null;if(t===`cleanse`)return e.value===!0?{stat:t,value:!0,trigger:n}:null;var r=h[t],i=e.value;return typeof i!=`number`||!Number.isInteger(i)||!r||i<r[0]||i>r[1]?null:{stat:t,value:i,trigger:n}}function x(e){if(!e||typeof e!=`object`||Array.isArray(e))return null;var t=v(e.type,`strange`).trim().toLowerCase();f.indexOf(t)===-1&&(t=`strange`);var n={id:v(e.id,``).trim().slice(0,64)||`item_`+Math.random().toString(36).slice(2,8),name:(v(e.name,`未知物品`).trim()||`未知物品`).slice(0,32),type:t,relic:e.relic===!0};e.desc!==void 0&&(n.desc=v(e.desc,``).slice(0,120));var r=b(e.effect);return r&&(n.effect=r),e.durability!==void 0&&(n.durability=Math.max(0,_(e.durability,1,0))),n}function ee(e){return Array.isArray(e)?e.map(x).filter(Boolean).slice(-g):[]}function S(e){return Array.isArray(e)?e.map(function(e){return v(e,``).trim()}).filter(function(e){return e}):[]}function C(e,t){var n=y(t);if(!e||typeof e!=`object`||Array.isArray(e))return n;var r=e.player&&typeof e.player==`object`?e.player:{},i=Math.min(10,Math.max(1,_(r.max_hp,3,1))),a=Math.min(i,_(r.hp,3,0)),o=v(r.status,a<=0?`dead`:`normal`);[`normal`,`wounded`,`cursed`,`dead`,`specter`].indexOf(o)===-1&&(o=`normal`);var s=e.tombstone&&typeof e.tombstone==`object`&&!Array.isArray(e.tombstone)?e.tombstone:{};return{schema:d,level:typeof t==`number`?t:_(e.level,1,0),world:v(e.world,``),player:{hp:a,max_hp:i,level:Math.min(10,_(r.level,1,1)),sanity:_(r.sanity,2,0),status:o,curses:Array.isArray(r.curses)?r.curses.map(function(e){return v(e,``).slice(0,40)}).filter(Boolean).slice(0,8):[],deaths:_(r.deaths,0,0)},items:ee(e.items),settled:Array.isArray(e.settled)?e.settled.map(function(e){return v(e,``).slice(0,64)}).filter(Boolean).slice(-8):[],clues:S(e.clues).slice(-8),exit_hook:v(e.exit_hook,``),prev_world:v(e.prev_world,``),next_world:v(e.next_world,``),tombstone:{fallen_level:_(s.fallen_level,0,0),cause:v(s.cause,``).slice(0,100),epitaph:v(s.epitaph,``).slice(0,200)}}}function te(e){var t=C(e,null),n=t.settled;return t.items.forEach(function(e){var r=e.effect;!r||r.trigger!==`on_enter`||n.indexOf(e.id)!==-1||(r.stat===`hp`?t.player.hp=Math.min(t.player.max_hp,t.player.hp+r.value):r.stat===`sanity`?t.player.sanity=Math.max(0,t.player.sanity+r.value):r.stat===`max_hp`?t.player.max_hp=Math.min(10,t.player.max_hp+r.value):r.stat===`cleanse`&&t.player.curses.length&&(t.player.curses.splice(0,1),t.player.status===`cursed`&&(t.player.status=`normal`)),n.push(e.id))}),t.settled=n.slice(-8),t}function ne(e={}){let t=C({schema:`v3`,...e,player:{hp:3,max_hp:3,sanity:2,...e.player}});return t.player.sanity=Math.min(99,t.player.sanity),t.player.deaths=0,t}function re(e,t,n,{settle:r=!0}={}){let i=C(e,n+1);return i.world=t.stages[n].world,i.prev_world=n?t.stages[n-1].world:`主神大厅`,i.next_world=t.stages[n+1]?.world||`终局结算`,i.exit_hook=t.stages[n].exitHook,i.player.sanity=Math.min(99,i.player.sanity),i.clues=i.clues.slice(-2),r?te(i):i}function ie(e,t,n){let r=e.stages[t],i=e.stages[t+1];return{routeId:e.id,slot:t,gameId:r.id,level:t+1,world:r.world,prevWorld:t?e.stages[t-1].world:`主神大厅`,nextWorld:i?.world||`终局结算`,exitHook:r.exitHook,passViaUrl:!0,nextUrl:i?i.external_url||`/play/`+e.id+`/`+(t+1)+`/`+i.entry_path:`/play/`+e.id+`/`+e.stages.length+`/__finish.html`}}function ae(e,t,n){let r=e.step;if(e.done||n.step!==r)return e;let i=re(n.save||e.save,t,r,{settle:!1});if(i.settled=Array.isArray(e.save.settled)?e.save.settled.slice(-8):[],n.failure===!0||i.player.hp<=0||i.player.status===`dead`){let t=String(n.reason||`探索者生命耗尽`).slice(0,100);i.items=i.items.map(e=>({...e,relic:!0,name:(`前人的`+e.name.replace(/^(前人的)+/,``)).slice(0,32)})),i.items.length||(i.items=[{id:`relic_survival_knife`,name:`前人的求生短刀`,type:`tool`,relic:!0}]);let a=e.save.tombstone?.epitaph||i.tombstone?.epitaph||``;i.tombstone={fallen_level:r+1,cause:t,epitaph:(a+(a?` | `:``)+`[第`+(r+1)+`关] `+t).slice(-200)},i.player=ne().player}i.player.deaths=0;let a=[...e.history.slice(0,r),{level:r+1,world:t.stages[r].world,hook:t.stages[r].exitHook}].slice(-64),o=r===t.stages.length-1,s=o?{...i,level:t.stages.length+1,next_world:`终局结算`}:re(i,t,r+1);return{...e,step:o?r:r+1,save:s,history:a,done:o,revision:e.revision+1,enteredAt:Date.now()}}var oe={"example-wasteland":`<!doctype html>
<html lang="zh-CN">
<head><script>(function bridgeRuntime(C,seed){
 'use strict';
 const memory=Object.assign(Object.create(null),seed);
 const tell=(type,data)=>parent.postMessage({...data,type,routeId:C.routeId,slot:C.slot,gameId:C.gameId},'*');
 const storage={
  getItem:key=>Object.hasOwn(memory,String(key))?memory[String(key)]:null,
  setItem(key,value){key=String(key);value=String(value);if(key.length>150||value.length>65536)return;memory[key]=value;tell('iw-storage',{key,value});},
  removeItem(key){delete memory[String(key)];tell('iw-storage',{key:String(key),value:null});},
  clear(){Object.keys(memory).forEach(key=>storage.removeItem(key));},
  key:index=>Object.keys(memory)[index]||null
 };
 Object.defineProperty(storage,'length',{get:()=>Object.keys(memory).length});
 try{Object.defineProperty(window,'localStorage',{get:()=>storage});}catch{}
 const clone=value=>JSON.parse(JSON.stringify(value));
 const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
 const initial=C.save?freeze(clone(C.save)):null;
 const fix=config=>({...config,level:C.slot+1,world:C.world,prevWorld:C.prevWorld,nextWorld:C.nextWorld,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
 let config=fix({}),wl;
 Object.defineProperty(window,'CONFIG',{configurable:true,get:()=>config,set:value=>{config=fix(value);}});
 const install=value=>{
  if(!value||value.__portalBridge)return value;
  const read=value.readSave,complete=value.completeLevel,history=value.readHistory;
  value.readSave=()=>initial?clone(initial):read.call(value,C.slot+1);
  value.getInitialSave=()=>freeze(initial?clone(initial):read.call(value,C.slot+1));
  value.readHistory=()=>Array.isArray(C.history)?clone(C.history):history.call(value);
  value.completeLevel=(c,save,opts)=>{
   const result=complete.call(value,fix(c),save,{...opts,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
   if(result)tell('iw-save',{save:result,history:value.readHistory()});
   return result;
  };
  value.__portalBridge=true;return value;
 };
 Object.defineProperty(window,'WL',{configurable:true,get:()=>wl,set:value=>{wl=install(value);}});
 addEventListener('message',event=>{
  if(event.source!==parent||!event.data||typeof event.data!=='object')return;
  if(event.data.type==='IW_STORAGE_INIT'&&event.data.values&&typeof event.data.values==='object'){
   for(const [key,value]of Object.entries(event.data.values))if(key.length<150&&typeof value==='string'&&value.length<=65536)memory[key]=value;
  }
 });
 addEventListener('load',()=>tell('IW_READY',{world:C.world}));
})(window.__iw_staticContext||{"routeId":"infinite-world","slot":0,"gameId":"example-wasteland","world":"废土集市","prevWorld":"主神大厅","nextWorld":"幽冥戏班","exitHook":"青灯照出幽冥戏班，下一段故事正在等待。","nextUrl":"#finished"},{});<\/script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#eee9dc">
  <meta name="description" content="这里什么都卖，除了明天。一款二维像素废土集市探索与以物易物游戏。">
  <title>废土集市 · 余烬之约</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%233b493c'/%3E%3Cpath d='M6 20h20v6H6zM10 16h12v4H10zM14 7h4v9h-4z' fill='%23edbc6c'/%3E%3C/svg%3E">
  <style>@charset "UTF-8";
:root{--paper:#eeeade;--white:#f9f6ed;--ink:#353b30;--muted:#8c8c78;--line:#d8d5c5;--green:#4f6245;--orange:#b96a3d;--blue:#688e99;--mono:Consolas,"Courier New",monospace}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:14px/1.65 "Microsoft YaHei","PingFang SC",system-ui,sans-serif}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit;cursor:pointer}button:disabled{cursor:not-allowed;opacity:.44}button:focus-visible,a:focus-visible,canvas:focus-visible,summary:focus-visible{outline:2px solid var(--orange);outline-offset:4px}a{color:inherit;text-decoration:none}.site-header{height:86px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 max(3.3vw,24px);gap:28px}.brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:800;letter-spacing:2px;line-height:1.4;white-space:nowrap}.brand small{display:block;font:9px/1.7 var(--mono);letter-spacing:2px;font-weight:400}.brand-icon{width:39px;height:42px;display:grid;place-items:center;background:#45533c;color:#e6ba77;font-size:33px;line-height:1;box-shadow:3px 3px 0 #d1cbbb;clip-path:polygon(0 0,90% 0,90% 9%,100% 9%,100% 100%,10% 100%,10% 90%,0 90%)}nav{display:flex;height:100%;gap:34px;margin-right:auto;margin-left:45px}.nav-button{border:0;background:transparent;color:#838775;font-size:13px;padding:4px 1px 0;position:relative}.nav-button span{font:10px var(--mono);margin-left:7px}.nav-button.active{color:#3c4d35;font-weight:bold}.nav-button.active:after{content:"";position:absolute;bottom:0;height:3px;background:#596c49;left:0;right:0}.header-right{display:flex;align-items:center;gap:25px}.world-tag{font-size:11px;color:#7b806b;letter-spacing:1px;white-space:nowrap}.world-tag i,.live-dot{display:inline-block;width:6px;height:6px;background:#657b4c;margin-right:8px}.icon-button{width:32px;height:32px;border:1px solid var(--line);background:transparent;position:relative;font-size:18px}.sound-off{position:absolute;left:7px;top:1px;color:#a58064}.page{max-width:1600px;margin:0 auto;padding:35px max(3.3vw,24px) 0}.page-intro{display:flex;align-items:center;justify-content:space-between;margin-bottom:29px}.eyebrow,.section-eyebrow{font:10px/1.5 var(--mono);letter-spacing:1.5px;color:#878975}.eyebrow{font-size:10px;letter-spacing:2.2px}.eyebrow span{color:#b2ae98;margin:0 9px}h1{margin:9px 0 6px;font-size:29px;letter-spacing:1.2px;font-weight:650;line-height:1.6}h1 em{font-style:normal;color:#a76643}.page-intro p{margin:0;color:#8b8c78;font-size:12px;letter-spacing:.6px}.chapter-mark{border-left:1px solid var(--line);padding-left:28px;text-align:right}.chapter-mark>span{font:11px var(--mono);letter-spacing:2px}.chapter-mark b{font-size:33px;letter-spacing:0;font-weight:400;margin-left:6px}.chapter-mark small{display:block;font-size:10px;color:#8b8c78;letter-spacing:2px;margin-top:6px}.game-layout{display:grid;grid-template-columns:minmax(0,1fr) 286px;gap:27px;align-items:start}.play-column{min-width:0}.scene-heading{height:48px;background:#faf7ee;border:1px solid var(--line);border-bottom:0;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-size:11px}.scene-heading strong{font-size:13px;letter-spacing:1px}.live-dot{width:5px;height:5px;vertical-align:2px}.scene-coordinates{margin-left:18px;color:#a6a28c;font:9px var(--mono);letter-spacing:1px}.weather{display:flex;gap:8px;align-items:center;color:#898b74}.weather>span:first-child{font-size:16px;color:#ab8853}.weather .time{margin-left:12px;padding-left:14px;border-left:1px solid var(--line);font:11px var(--mono);color:#575f4c}.scene{position:relative;overflow:hidden;border:1px solid #a7a080;background:#c5ad7e;isolation:isolate}canvas{display:block;width:100%;height:auto;aspect-ratio:8/5;image-rendering:pixelated;touch-action:none;cursor:crosshair;outline:none}.scene:after{content:"";position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 80px #514c2510;background:repeating-linear-gradient(0deg,transparent,transparent 3px,#48392505 3px,#48392505 4px);z-index:2}.scene-corner{position:absolute;bottom:17px;left:18px;right:18px;display:flex;justify-content:space-between;pointer-events:none;font:9px var(--mono);letter-spacing:1px;color:#665f43}.map-tag{border:1px solid #857b5460;padding:2px 7px;font-size:9px;background:#decca266}.map-button{position:absolute;right:18px;top:17px;background:#f6eacdc9;border:1px solid #827b545e;width:32px;height:32px;font-size:23px;line-height:1;color:#6b6c4c}.map-note{position:absolute;right:60px;top:17px;background:#f7f0ddf5;padding:12px 18px;border:1px solid #a69d7c;font-size:11px;z-index:3;box-shadow:4px 4px 0 #766a3b24}.map-note span{display:block;color:#777b61}.map-note b{display:block;margin-bottom:6px}.control-strip{height:49px;background:var(--white);border:1px solid var(--line);border-top:0;display:flex;align-items:center;justify-content:space-between;padding:0 15px;color:#8a8b79;font-size:10px}.control-strip>div{display:flex;align-items:center;gap:18px}.control-strip>div>span{display:flex;gap:4px;align-items:center}kbd{display:inline-block;border:1px solid #d4d3c5;border-bottom:2px solid #cac8b8;min-width:19px;height:20px;text-align:center;line-height:17px;padding:0 4px;background:#eeede3;color:#6e7561;font:10px/17px var(--mono);border-radius:2px}.control-strip button{background:none;border:none;font:bold 17px var(--mono);color:#858773}.click-hint{color:#a4a18b;font-size:10px}.below-map{display:flex;justify-content:space-between;padding-top:11px;font-size:10px;color:#96937c}.tiny-star{font-style:normal;color:#af8a54;margin-right:6px}#save-status i{display:inline-block;width:4px;height:4px;background:#7c8b63;vertical-align:2px;margin-right:5px}.journal{background:#f7f4e9;border:1px solid var(--line);padding:18px 20px 0}.traveler{display:flex;gap:13px;position:relative;padding-bottom:19px}.avatar{width:45px;height:49px;background:#ddd8be;border:1px solid #b7b59a;display:grid;place-items:center;flex:none}.avatar-pixel{width:8px;height:8px;background:#5b6145;box-shadow:-8px 0 #5b6145,8px 0 #5b6145,-8px -8px #454c37,0 -8px #454c37,8px -8px #454c37,-8px 8px #b57f52,0 8px #d3a271,8px 8px #b57f52,0 16px #907345,-8px 16px #566846,8px 16px #566846,-8px 24px #596345,8px 24px #596345;transform:translateY(-10px)}.traveler .section-eyebrow{font-size:8px;letter-spacing:1.1px}h2{font-size:15px;line-height:1.5;font-weight:650;margin:3px 0 5px;letter-spacing:.5px}.traveler h2{font-size:14px;white-space:nowrap}.traveler h2>span{font-size:8px;font-weight:400;color:#8d907a;margin-left:4px}.vitals{display:flex;gap:12px;font-size:10px;color:#99977c;align-items:center;line-height:1.6}.vitals #hp{color:#b67d58;letter-spacing:2px;font-size:11px}.small-icon{position:absolute;right:-4px;top:-4px;border:0;background:transparent;color:#93977d;font-size:19px}.resource-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:15px 0}.resource-grid>div{text-align:center;border-right:1px dashed #d8d5c7;line-height:1.3;display:grid;grid-template-columns:auto auto;justify-content:center;gap:3px 7px}.resource-grid>div:last-child{border:0}.resource-grid b{font:20px/1.3 var(--mono);font-weight:400}.resource-grid small{grid-column:1/-1;color:#97957f;font-size:9px;margin-top:2px}.resource-icon{font-size:20px;align-self:center;line-height:1}.water-icon{color:#6c9199;font-size:16px}.scrap-icon{color:#a98a5b;transform:rotate(-20deg)}.trust-icon{color:#76835a}.mission{padding:20px 0 17px;border-bottom:1px solid var(--line)}.section-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:12px}.section-eyebrow{font-size:10px;letter-spacing:1.2px}.paper-tag{font-size:8px;border:1px solid #ccceb9;color:#7d8968;padding:1px 5px;line-height:1.5}.mission h2{font-size:17px;margin-bottom:9px}.mission p{font-size:11px;color:#96917a;line-height:1.9;margin:0}.progress-track{height:3px;background:#e3dfcf;margin:17px 0 14px}.progress-track i{display:block;width:0;height:100%;background:#8a946a;transition:width .4s}.objectives{display:grid;gap:10px}.objective{display:flex;align-items:center;gap:9px;font-size:11px;color:#777e65}.objective .check{border:1px solid #c2c6af;width:12px;height:12px;color:#f8f5e9;line-height:10px;font-size:9px;flex:none;text-align:center}.objective.complete .check{background:#7f8f60;border-color:#7f8f60}.objective .objective-count{font:9px var(--mono);color:#a1a58c;margin-left:auto}.text-button{border:0;background:none;display:flex;align-items:center;justify-content:space-between;width:100%;color:#a48c64;padding:0;font-size:10px;margin-top:17px}.text-button:hover{color:#625f37}.inventory{padding:17px 0 14px;border-bottom:1px solid var(--line)}.inventory-capacity{font:9px var(--mono);color:#a4a18b}.bag-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}.bag-slot{height:34px;border:1px solid #d9d6c6;background:#eeeadd;display:grid;place-items:center;color:#b8b49b;font:20px var(--mono);position:relative}.bag-slot.filled{border-color:#a7b18b;background:#e9ebdc;color:#778365}.bag-slot>span{position:absolute;bottom:3px;right:4px;font:7px var(--mono)}.inventory p{font-size:9px;color:#a19e85;margin:8px 0 0}.field-notes{padding:18px 0 15px}.field-notes .section-heading{margin-bottom:12px}.note-line{height:1px;background:#d9d5c4;flex:1}.activity-log{display:grid;gap:11px;min-height:87px}.log-entry{display:flex;gap:9px;line-height:1.7;font-size:10px;color:#8d8e77}.log-entry time{font:9px/1.8 var(--mono);flex:none;color:#b5aa8d}.log-entry:first-child{color:#697759}.journal-foot{border-top:1px solid var(--line);font:7px/1 var(--mono);letter-spacing:.7px;color:#aaa78e;display:flex;align-items:center;justify-content:space-between;margin:0 -20px;padding:15px 20px}.journal-foot span{font-size:14px;color:#939878}.site-footer{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding:16px 0;margin-top:24px;color:#a3a08a;font-size:9px;letter-spacing:.7px}.site-footer>span>span{margin:0 11px}.site-footer button{background:none;border:0;font-size:10px;color:#8b9076;padding:0}.site-footer button span{margin-left:7px}.intro-note{position:absolute;left:50%;top:50%;transform:translate(-50%,-43%);width:min(430px,85%);background:#f7f0dfed;border:1px solid #a79d78;padding:28px 31px 22px;box-shadow:6px 6px 0 #524c302e;z-index:4;backdrop-filter:blur(3px)}.intro-kicker{font-size:9px;color:#969175;letter-spacing:1px}.intro-note h2{font-size:23px;margin:10px 0}.intro-note p{font-size:12px;color:#86846b;line-height:2;margin:0 0 20px}.primary-button{background:#4e6242;color:#fbf6e5;border:1px solid #455b38;padding:10px 19px;font-size:12px;letter-spacing:1px;box-shadow:2px 2px 0 #2d382b2e;display:flex;align-items:center;justify-content:space-between;gap:30px}.primary-button:hover{background:#3d5434}.intro-hint{display:block;margin-top:13px;font-size:9px;color:#a09a7f}.interaction-prompt{position:absolute;left:50%;bottom:47px;transform:translateX(-50%);background:#f8f2e3ed;border:1px solid #aaa382;padding:8px 14px;color:#626c4f;font-size:11px;box-shadow:3px 3px 0 #5d533430;white-space:nowrap;z-index:3}.interaction-prompt kbd{margin-right:8px}.toast{position:absolute;left:50%;top:17px;transform:translateX(-50%);max-width:80%;background:#45583eea;color:#fff8e6;font-size:11px;padding:10px 18px;border:1px solid #889175;z-index:5;text-align:center;box-shadow:3px 3px 0 #3d41282e}.pause-badge{position:absolute;inset:0;background:#333c2b8c;z-index:6;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;color:#f9eed5;letter-spacing:3px;font-size:23px;backdrop-filter:blur(3px)}.pause-badge button{background:#f5edda;border:1px solid #bfc4a5;padding:8px 18px;font-size:12px;letter-spacing:1px;color:#556344}.touch-controls,.touch-interact{display:none}dialog{width:min(480px,90vw);background:#f5f0e2;color:var(--ink);border:1px solid #b9b397;padding:23px 27px 26px;box-shadow:7px 7px 0 #1f301c26;max-height:90vh;overflow:auto}dialog::backdrop{background:#26312470;backdrop-filter:blur(3px)}dialog h2{font-size:23px;letter-spacing:1px;margin:14px 0 12px}dialog p{font-size:12px;line-height:2;color:#7e826b}dialog .character-quote{font-size:14px;color:#5f694f;padding-left:14px;border-left:2px solid #a5ad87;margin:20px 0}.dialog-top{display:flex;justify-content:space-between;align-items:center;font:9px var(--mono);letter-spacing:1px;color:#90947b}.close-button{border:0;background:none;font:25px/1 var(--mono);color:#90967e;padding:0 0 0 10px}.dialog-actions{display:grid;gap:9px;margin-top:21px}.action-button{padding:12px 14px;border:1px solid #c8c9b4;background:#eeebdb;display:flex;justify-content:space-between;align-items:center;gap:14px;text-align:left;font-size:12px;color:#677654}.action-button:hover:not(:disabled){background:#e2e6d0;border-color:#9fae88}.action-button small{font-size:10px;color:#9a9272;white-space:nowrap}.action-button.featured{background:#4e6242;border-color:#455b38;color:#faf5e8}.action-button.featured small{color:#ced5b9}.dialog-chip{display:inline-block;padding:2px 7px;border:1px solid #cac8b0;color:#8a8d70;font-size:9px;margin-right:7px}.help-controls{display:grid;gap:8px;padding:14px;background:#eae8d8;font-size:12px;color:#7e856a}.help-controls kbd{margin-right:8px}.dialog-small{font-size:10px!important;color:#a29a7c!important}.result-stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #d3d0bd;border-bottom:1px solid #d3d0bd;margin:21px 0;padding:15px 0;text-align:center}.result-stats b{font:25px var(--mono);display:block;color:#6d7b53}.result-stats span{font-size:10px;color:#8e9177}#relay-dialog{width:min(650px,93vw)}#relay-dialog h2{font-size:21px}#relay-dialog .wl-opening{background:#eeebdc;border:1px dashed #c3c5ac;color:#747c62;font-size:12px;line-height:1.9}#relay-dialog .wl-card{background:#eaeadd;border:1px solid #c4c9ae;border-left:3px solid #85976a;color:#6a775a;font-size:12px;line-height:1.9;max-width:none;border-radius:0}#relay-dialog .wl-card-title{color:#62794f}#relay-dialog .wl-next{color:#959977}#echo-log{font-size:12px;color:#889074;margin:16px 0}details{border-top:1px solid #d5d3bf;margin-top:20px;padding-top:12px;font-size:11px;color:#8e937c}summary{cursor:pointer}pre{white-space:pre-wrap;word-break:break-word;font:10px/1.6 var(--mono);max-height:180px;overflow:auto}textarea{width:100%;background:#fbf7eb;border:1px solid #cacdb8;color:#7b866b;font:10px/1.5 var(--mono);padding:8px;resize:vertical}.debug-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.debug-row button{font-size:11px;padding:6px 10px;background:#e5e8d8;border:1px solid #c4cbb0}.relay-note{font-size:10px!important;color:#a29b82!important}.wl-overlay .wl-handoff{background:#eee9da;border:1px solid #aab292;box-shadow:6px 6px 0 #232d2055}.wl-overlay{background:#263124e8!important}.wl-overlay .wl-handoff-kicker{color:#7c8c5e}.wl-overlay .wl-handoff-route{color:#4d6040}.wl-overlay .wl-handoff-hook{color:#80846b}.wl-overlay .wl-card{background:#e5e6d5;border:1px solid #b3bea0;border-radius:0;color:#68765a}.wl-overlay .wl-card-title{color:#5c744a}.wl-overlay .wl-next{color:#849475}.wl-overlay .wl-btn{background:#526b42;color:#f9f3df;border-radius:0}[hidden]{display:none!important}@media(min-width:1500px){.journal{padding-top:23px}.mission{padding-top:24px;padding-bottom:23px}.inventory{padding-top:22px;padding-bottom:20px}.field-notes{padding-top:23px;padding-bottom:22px}.activity-log{gap:15px;min-height:112px}}@media(max-width:1180px){.game-layout{grid-template-columns:minmax(0,1fr) 255px;gap:20px}.journal{padding-left:16px;padding-right:16px}.journal-foot{margin-left:-16px;margin-right:-16px;padding-left:16px;padding-right:16px}.site-header nav{margin-left:20px;gap:25px}.scene-coordinates{display:none}.control-strip>div{gap:12px}.desktop-hint{display:none!important}.traveler{gap:9px}.traveler h2{font-size:13px}.bag-grid{gap:4px}.bag-slot{height:30px}.mission{padding-top:15px;padding-bottom:13px}.resource-grid{padding:12px 0}.field-notes{padding-top:14px}.activity-log{gap:9px}}@media(max-width:950px){.site-header{height:74px}.header-right .world-tag{display:none}.site-header nav{gap:22px;margin-left:10px}.page{padding-top:25px}.page-intro{margin-bottom:23px}h1{font-size:24px}.game-layout{grid-template-columns:minmax(0,1fr) 230px;gap:16px}.journal{padding:14px 14px 0}.journal-foot{margin-left:-14px;margin-right:-14px;padding-left:14px;padding-right:14px;letter-spacing:0;font-size:6px}.traveler h2>span{display:none}.section-heading{margin-bottom:8px}.traveler{padding-bottom:13px}.avatar{width:37px;height:44px}.resource-grid b{font-size:17px}.mission h2{font-size:15px}.mission p{font-size:10px}.objectives{gap:7px}.objective{font-size:10px}.progress-track{margin:12px 0}.inventory{padding:13px 0}.bag-grid{grid-template-columns:repeat(6,1fr);gap:3px}.bag-slot{height:26px;font-size:16px}.activity-log .log-entry:nth-child(3){display:none}.activity-log{min-height:65px}.scene-heading{padding:0 12px}.control-strip .click-hint{display:none}.control-strip{font-size:9px;padding:0 10px}.control-strip>div{gap:10px}.page-intro p{font-size:11px}.intro-note{padding:19px 23px}.intro-note h2{font-size:20px}.intro-note p{font-size:11px;margin-bottom:15px}.intro-kicker{font-size:8px}.chapter-mark{padding-left:15px}.intro-hint{font-size:8px}}@media(max-width:760px){.site-header{height:68px;padding:0 18px;gap:12px}.brand{font-size:17px;gap:9px;letter-spacing:1px}.brand-icon{width:31px;height:35px;font-size:27px}.brand small{font-size:7px;letter-spacing:1.5px}.site-header nav{margin-left:auto;gap:18px}.nav-button{font-size:11px}.nav-button.active>span{display:none}.header-right{gap:0}.page{padding:23px 16px 0}.page-intro{align-items:flex-start;margin-bottom:20px}h1{font-size:21px;letter-spacing:.4px;margin:8px 0}.eyebrow{font-size:8px;letter-spacing:1.3px}.page-intro p{max-width:290px;font-size:10px}.chapter-mark{padding-left:12px;white-space:nowrap}.chapter-mark>span{font-size:8px;letter-spacing:1px}.chapter-mark b{font-size:25px}.chapter-mark small{font-size:8px;letter-spacing:.5px}.game-layout{display:flex;flex-direction:column;gap:19px}.play-column{width:100%}.scene-heading{height:40px}.scene-heading strong{font-size:12px}.weather{font-size:9px}.weather .time{font-size:10px}.scene-coordinates{display:inline-block;font-size:8px;margin-left:11px}.scene{min-height:0}.journal{width:100%;display:grid;grid-template-columns:1fr 1fr;column-gap:24px;padding:18px 18px 0}.traveler{align-items:center}.traveler h2>span{display:inline}.resource-grid{border-top:0;padding:0 0 14px;align-self:stretch;align-items:center}.mission{grid-column:1;padding:15px 0;border-top:1px solid var(--line);border-bottom:0;grid-row:2/4}.mission p br{display:none}.inventory{grid-column:2;grid-row:2;border-bottom:0}.field-notes{grid-column:2;grid-row:3;padding-top:8px}.activity-log .log-entry:nth-child(3){display:none}.activity-log{min-height:45px;gap:7px}.journal-foot{grid-column:1/-1;margin:0 -18px;font-size:7px;letter-spacing:1px;padding:13px 18px}.bag-slot{height:31px}.site-footer{margin-top:19px;font-size:8px;letter-spacing:0}.site-footer>span>span{margin:0 5px}.control-strip .click-hint{display:flex}.scene-corner{bottom:12px;left:12px;right:12px;font-size:7px}.map-tag{font-size:7px}.map-button{right:12px;top:12px;width:27px;height:27px;font-size:20px}.toast{top:11px;font-size:10px;padding:7px 12px}.interaction-prompt{bottom:39px;font-size:10px;padding:6px 10px}.intro-note{width:min(380px,86%);padding:20px 25px}.intro-note h2{font-size:21px}.intro-note p{font-size:11px}.below-map{font-size:9px}}@media(max-width:420px){.site-header nav{gap:13px}.nav-button{font-size:10px}.header-right{display:none}.brand{font-size:16px}.page-intro h1{font-size:19px}.chapter-mark{display:none}.scene-coordinates{display:none}.scene{margin:0 -3px}.journal{column-gap:17px;padding:15px 14px 0}.journal-foot{margin:0 -14px;padding:13px 14px;font-size:6px}.intro-note{padding:14px 18px}.intro-note h2{font-size:18px;margin:7px 0}.intro-note p{font-size:10px;line-height:1.8;margin-bottom:11px}.intro-hint{margin-top:9px}.intro-kicker{font-size:7px}.primary-button{padding:8px 16px;font-size:11px}.control-strip .click-hint{font-size:8px}.control-strip>div{gap:8px}kbd{min-width:17px;padding:0 3px}.mission h2{font-size:14px}.bag-slot{height:25px}.resource-grid>div{gap:3px 4px}.traveler h2>span{display:none}.vitals{gap:8px}.site-footer>span{max-width:260px}.site-footer button{font-size:9px}}@media(pointer:coarse){.touch-controls{position:absolute;left:13px;bottom:36px;display:block;opacity:.77;z-index:3;text-align:center}.touch-controls button{width:29px;height:29px;background:#ece1c3b8;border:1px solid #7e7d5566;color:#5f6c4f;touch-action:none;font:16px var(--mono);padding:0}.touch-controls>div{display:flex;gap:3px;margin-top:3px}.touch-interact{display:block;position:absolute;right:15px;bottom:44px;background:#f6ebcbbe;color:#5d6b4e;border:1px solid #85855d77;padding:10px 12px;font-size:10px;z-index:3}.interaction-prompt{bottom:19px}.scene-corner{display:none}}@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}

.intro-note{max-height:calc(100% - 28px);overflow:auto;transform:translate(-50%,-50%)}.intro-note #entry-echo{white-space:pre-line}\r

@media(max-width:760px){.intro-note{display:flex;flex-direction:column;padding:14px 18px}.intro-kicker{display:none}.intro-note h2{font-size:18px;margin:0 0 9px;flex:none}.intro-note p{min-height:0;overflow:auto;max-height:72px;line-height:1.8;font-size:10px;margin:0 0 11px}.intro-note .primary-button{flex:none;padding:8px 16px}.intro-note .intro-hint{display:none}}\r
</style>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="废土集市首页"><span class="brand-icon" aria-hidden="true">▟</span><span>废土集市<small>WASTELAND BAZAAR</small></span></a>
    <nav aria-label="游戏导航"><button class="nav-button active" id="market-tab">集市<span>01</span></button><button class="nav-button" id="guide-button">旅人手册</button><button class="nav-button" id="world-button">世界线 <span>↗</span></button></nav>
    <div class="header-right"><span class="world-tag"><i></i> 无限世界 · 世界签 05</span><button class="icon-button" id="sound-button" aria-label="开启声音" title="开启声音">♫<span class="sound-off">／</span></button></div>
  </header>

  <main class="page">
    <section class="page-intro"><div><div class="eyebrow">THE EMBER PACT <span>／</span> 余烬之约</div><h1>这里什么都卖，<em>除了明天。</em></h1><p>沙暴来临之前，做几笔好买卖。或许，能换来一条回家的路。</p></div><div class="chapter-mark"><span>DAY <b>01</b></span><small>锈风集市 · 旱季</small></div></section>

    <div class="game-layout">
      <section class="play-column" aria-label="像素游戏区域">
        <div class="scene-heading"><div><span class="live-dot"></span><strong>锈风集市</strong><span class="scene-coordinates">SECTOR 07 / 24.6° N</span></div><div class="weather"><span aria-hidden="true">☀</span><span id="weather-text">晴 · 东南风</span><span class="time" id="clock">09:00</span></div></div>
        <div class="scene" id="scene">
          <canvas id="game-canvas" width="960" height="600" tabindex="0" aria-label="废土集市地图。方向键或 WASD 移动，E 交互，也可以点击地图中的人物或物资自动前往。">请使用支持 Canvas 的浏览器游玩。</canvas>
          <div class="scene-corner"><span>← 拾荒者入口</span><span class="map-tag">自由探索</span></div>
          <div class="map-note" id="map-note" hidden><b>集市导览</b><span>北 · 穿界电台</span><span>西 · 水婆与老莫</span><span>东 · 阿锈与小满</span><span>发光的废料堆可拾荒</span></div>
          <button class="map-button" id="map-button" aria-label="查看集市导览" aria-pressed="false">⌖</button>
          <button class="interaction-prompt" id="interaction-prompt" hidden><kbd>E</kbd><span>交互</span></button>
          <div class="intro-note" id="intro-note"><div class="intro-kicker">一段旅程的终点，是另一段的开始</div><h2>旅人，欢迎来到锈风。</h2><p id="entry-echo">你穿过漫天黄沙，在一座由废铁和旧梦搭起的集市前停下。北边那台电台，或许知道离开的路。</p><button class="primary-button" id="start-button">进入集市 <span>→</span></button><span class="intro-hint">约 5–8 分钟 · 支持键盘与鼠标</span></div>
          <div id="toast" class="toast" role="status" hidden></div>
          <div class="touch-controls" aria-label="触屏移动"><button data-dir="up" aria-label="向上">↑</button><div><button data-dir="left" aria-label="向左">←</button><button data-dir="down" aria-label="向下">↓</button><button data-dir="right" aria-label="向右">→</button></div></div>
          <button class="touch-interact" id="touch-interact">交互 E</button>
          <div class="pause-badge" id="pause-badge" hidden>休息一下 · 已暂停<button id="resume-button">继续旅程 →</button></div>
        </div>
        <div class="control-strip"><div><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> 移动</span><span><kbd>E</kbd> 交互</span><span class="desktop-hint"><kbd>SHIFT</kbd> 快跑</span><span class="click-hint">也可点击地图前往</span></div><button id="pause-button" aria-label="暂停游戏">Ⅱ</button></div>
        <div class="below-map"><span><i class="tiny-star">✦</i> 废铁有价，人情无价。</span><span id="save-status"><i></i> 旅程自动保存</span></div>
      </section>

      <aside class="journal" aria-label="旅人日志">
        <section class="traveler"><div class="avatar" aria-hidden="true"><div class="avatar-pixel"></div></div><div><span class="section-eyebrow">THE TRAVELER</span><h2>无名旅人 <span>流浪中</span></h2><div class="vitals"><span id="hp" aria-label="生命">♥ ♥ ♥</span><span id="sanity">理智 2</span></div></div><button class="small-icon" id="restart-button" aria-label="重新开始本关" title="重新开始本关">↺</button></section>
        <section class="resource-grid" aria-label="物资"><div><span class="resource-icon water-icon">◆</span><b id="water-count">3</b><small>净水</small></div><div><span class="resource-icon scrap-icon">▰</span><b id="scrap-count">4</b><small>废料</small></div><div><span class="resource-icon trust-icon">✧</span><b id="trust-count">0</b><small>声望</small></div></section>
        <section class="mission"><div class="section-heading"><span class="section-eyebrow">当前委托</span><span class="paper-tag">主线</span></div><h2>给明天一个信号</h2><p>修好集市北面的穿界电台，<br>接通下一段世界线。</p><div class="progress-track"><i id="mission-progress"></i></div><div class="objectives" id="objectives"></div><button class="text-button" id="mission-button">查看委托详情 <span>↗</span></button></section>
        <section class="inventory"><div class="section-heading"><span class="section-eyebrow">随身行囊</span><span class="inventory-capacity" id="bag-count">0 / 6</span></div><div id="bag-grid" class="bag-grid"></div><p id="bag-caption">轻装上路，也是一种勇气。</p></section>
        <section class="field-notes"><div class="section-heading"><span class="section-eyebrow">风中的消息</span><span class="note-line"></span></div><div id="activity-log" class="activity-log" aria-live="polite"></div></section>
        <div class="journal-foot">KEEP A LITTLE HOPE IN YOUR POCKET.<span>✳</span></div>
      </aside>
    </div>
    <footer class="site-footer"><span>无限世界 <span>／</span> 一场关于交换与选择的像素旅程</span><button id="relay-button">接力存档 <span>↗</span></button></footer>
  </main>

  <dialog id="game-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><span id="dialog-kicker">锈风集市</span><button class="close-button" id="dialog-close" aria-label="关闭对话">×</button></div><div id="dialog-body"></div><div id="dialog-actions" class="dialog-actions"></div></dialog>
  <dialog id="relay-dialog" aria-labelledby="relay-title"><div class="dialog-top"><span>INFINITE WORLDS / SAVE_STATE v2</span><button class="close-button" id="relay-close" aria-label="关闭世界线">×</button></div><h2 id="relay-title">每一次告别，都有回响。</h2><div id="opening-strip"></div><section id="echo-log"></section><section id="card-preview"></section><details id="debug-panel"><summary>接力联调工具</summary><pre id="debug-json"></pre><textarea id="debug-code" rows="3" aria-label="接力存档码"></textarea><div class="debug-row"><button id="debug-copy">复制当前存档码</button><button id="debug-import">导入存档码</button><button id="debug-reset">重置本关</button></div></details><p class="relay-note">当前出口通往幽冥戏班；信号提灯会在那里化为引魂灯。正式比赛仍按接线表填写 game.js 顶部的 CONFIG。</p></dialog>
  <script>/* =========================================================\r
 * 无限世界 · SAVE_STATE v3 存档协议核心库\r
 * ---------------------------------------------------------\r
 * 整条世界线的关卡都靠这个文件衔接，队伍【不需要修改本文件】。\r
 *\r
 * 队伍常用 API：\r
 *   WL.readSave(levelNo)        读档（宽容：缺字段补默认、多字段忽略、类型自动转换）\r
 *   WL.consumeAny(items, type)  按类型取用上家道具，取不到返回 null → 触发本关兜底剧情\r
 *   WL.addItem(save, item)      往背包加道具 { id, name, type }\r
 *   WL.addClue(save, text)      加线索\r
 *   WL.setPlayer(save, patch)   改面板 { hp, max_hp, sanity, level, status, curses }\r
 *   WL.respawn()                恢复进入本关时的存档快照\r
 *   WL.failLevel(reason)        本关失败：生成遗物、墓碑和满血二代探索者\r
 *   WL.forcePass()              裁判强制结束本关并走遗物交接\r
 *   WL.completeLevel(config, save, opts)\r
 *                               校验出口 → 写档 → 过场 → 跳转；缺交接必填项返回 null\r
 *                               opts = { exitHook: '结尾一句话', nextUrl: '下一关页面地址' }\r
 *   WL.renderOpening(save)      前情提要条（自动呼应上家钩子）\r
 *   WL.renderSaveCard(save, level, world)   五行「通关存档卡」\r
 *   WL.goTo(url, save)          带存档与旅程进入页面（大厅首跳也使用）\r
 *   WL.mountDebug(save)         安装存档复制、导入、重置按钮\r
 *\r
 * 存档传递通道：localStorage（同一台电脑接力）\r
 *              + URL ?save=存档码&history=旅程码（跳转时自动附加，兼容 file:// 分页存储）\r
 *\r
 * 纯静态实现：file:// 双击即可运行，无任何依赖。\r
 * ========================================================= */\r
(function (global) {\r
  'use strict';\r
\r
  var STORAGE_KEY = 'wuxianliu_save_v3';\r
  var HISTORY_KEY = 'wuxianliu_history_v3';\r
  var LEGACY_STORAGE_KEY = 'wuxianliu_save_v2';\r
  var LEGACY_HISTORY_KEY = 'wuxianliu_history_v2';\r
  var memoryHistory = null;\r
  var memoryInitialSave = null;\r
  var SCHEMA = 'v3';\r
\r
  /* 道具类型词表（8 类，消费按类型匹配，不按名称匹配） */\r
  var ITEM_TYPES = ['key', 'tool', 'light', 'food', 'token', 'info', 'weapon', 'strange'];\r
  var TYPE_LABELS = {\r
    key: '钥匙', tool: '工具', light: '照明', food: '食物',\r
    token: '信物', info: '情报', weapon: '武器', strange: '异物'\r
  };\r
\r
  /* 通用道具效果词表（宪章第二章）：有限集合，不开放自由字段。\r
   * hp/sanity/max_hp/attack 的 value 必须在区间内；cleanse 只接受 true。 */\r
  var EFFECT_STATS = ['hp', 'sanity', 'max_hp', 'cleanse', 'attack'];\r
  var EFFECT_TRIGGERS = ['on_enter', 'passive'];\r
  var EFFECT_RANGE = { hp: [1, 2], sanity: [1, 1], max_hp: [1, 1], attack: [1, 1] };\r
  var ITEMS_MAX = 3;\r
\r
  /* ---------------- 基础工具 ---------------- */\r
\r
  function esc(text) {\r
    return String(text === undefined || text === null ? '' : text)\r
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')\r
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');\r
  }\r
\r
  function toInt(value, fallback, min) {\r
    var n = parseInt(value, 10);\r
    if (isNaN(n)) n = fallback;\r
    if (typeof min === 'number' && n < min) n = min;\r
    return n;\r
  }\r
\r
  function toStr(value, fallback) {\r
    if (value === undefined || value === null) return fallback || '';\r
    return String(value);\r
  }\r
\r
  function defaultSave(levelNo) {\r
    return {\r
      schema: SCHEMA,\r
      level: typeof levelNo === 'number' ? levelNo : 1,\r
      player: { hp: 3, max_hp: 3, sanity: 2, level: 1, status: 'normal', curses: [] },\r
      items: [],\r
      clues: [],\r
      exit_hook: '',\r
      prev_world: '',\r
      next_world: '',\r
      tombstone: {}\r
    };\r
  }\r
\r
  /* 效果词条校验：不合规返回 null → 道具降级为纯装饰，不参与结算 */\r
  function coerceEffect(raw) {\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
    var stat = toStr(raw.stat, '').trim().toLowerCase();\r
    if (EFFECT_STATS.indexOf(stat) === -1) return null;\r
    var trigger = toStr(raw.trigger, '').trim().toLowerCase();\r
    if (EFFECT_TRIGGERS.indexOf(trigger) === -1) return null;\r
    if (stat === 'cleanse') {\r
      if (raw.value !== true) return null;\r
      return { stat: stat, value: true, trigger: trigger };\r
    }\r
    var range = EFFECT_RANGE[stat], n = raw.value;
    if (typeof n !== 'number' || !Number.isInteger(n)) return null;\r
    if (!range || n < range[0] || n > range[1]) return null;\r
    return { stat: stat, value: n, trigger: trigger };\r
  }\r
\r
  /* 道具归一化：类型不在词表内 → 归为 strange（异物）；effect 不合规 → 丢弃 */\r
  function coerceItem(raw) {\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
    var type = toStr(raw.type, 'strange').trim().toLowerCase();\r
    if (ITEM_TYPES.indexOf(type) === -1) type = 'strange';\r
    var item = {\r
      id: toStr(raw.id, '').trim().slice(0,64) || 'item_' + Math.random().toString(36).slice(2, 8),\r
      name: (toStr(raw.name, '未知物品').trim() || '未知物品').slice(0, 32),\r
      type: type,\r
      relic: raw.relic === true\r
    };\r
    if (raw.desc !== undefined) item.desc = toStr(raw.desc, '').slice(0, 120);\r
    var effect = coerceEffect(raw.effect);\r
    if (effect) item.effect = effect;\r
    if (raw.durability !== undefined) item.durability = Math.max(0, toInt(raw.durability, 1, 0));\r
    return item;\r
  }\r
\r
  function coerceItems(raw) {\r
    if (!Array.isArray(raw)) return [];\r
    return raw.map(coerceItem).filter(Boolean).slice(-ITEMS_MAX);\r
  }\r
\r
  function coerceClues(raw) {\r
    if (!Array.isArray(raw)) return [];\r
    return raw.map(function (c) { return toStr(c, '').trim(); }).filter(function (c) { return c; });\r
  }\r
\r
  /* ---------------- 存档码（base64，用于 URL 传递与手动导入） ---------------- */\r
\r
  function toB64(str) {\r
    if (typeof btoa === 'function') return btoa(unescape(encodeURIComponent(str)));\r
    if (typeof Buffer !== 'undefined') return Buffer.from(str, 'utf-8').toString('base64');\r
    throw new Error('当前环境不支持 base64');\r
  }\r
  function fromB64(b64) {\r
    if (typeof atob === 'function') return decodeURIComponent(escape(atob(b64)));\r
    if (typeof Buffer !== 'undefined') return Buffer.from(b64, 'base64').toString('utf-8');\r
    throw new Error('当前环境不支持 base64');\r
  }\r
\r
  function encodeCode(save) {\r
    return toB64(JSON.stringify(save));\r
  }\r
\r
  function decodeCode(code) {\r
    try {\r
      return JSON.parse(fromB64(String(code).trim()));\r
    } catch (e) {\r
      return null;\r
    }\r
  }\r
\r
  /* ---------------- 旅程记录（供终局结算页回放） ---------------- */\r
\r
  /* 与存档分开存放：存档卡保持严格五栏，旅程回放数据走独立通道 */\r
  function readHistory() {\r
    try {\r
      var arr = memoryHistory;\r
      var m = global.location.search.match(/[?&]history=([^&]+)/);\r
      if (!Array.isArray(arr) && m) arr = decodeCode(decodeURIComponent(m[1]));\r
      if (!Array.isArray(arr)) {\r
        var raw = global.localStorage.getItem(HISTORY_KEY) || global.localStorage.getItem(LEGACY_HISTORY_KEY);\r
        arr = raw ? JSON.parse(raw) : [];\r
      }\r
      if (!Array.isArray(arr)) return [];\r
      return arr.map(function (h) {\r
        if (!h || typeof h !== 'object') return null;\r
        return {\r
          level: toInt(h.level, 0, 0),\r
          world: toStr(h.world, '？？？'),\r
          hook: toStr(h.hook, '')\r
        };\r
      }).filter(Boolean).slice(-64);\r
    } catch (e) { return []; }\r
  }\r
\r
  /* 每通完一关自动记录一条：第几关 · 什么世界 · 留下了什么结局 */\r
  function recordPassage(config, save) {\r
    var list = readHistory();\r
    list.push({\r
      level: toInt(config.level, 0, 0),\r
      world: toStr(config.world, '？？？'),\r
      hook: toStr(save.exit_hook, '')\r
    });\r
    if (list.length > 64) list = list.slice(-64); /* 安全上限 */\r
    memoryHistory = list;\r
    try {\r
      global.localStorage.setItem(HISTORY_KEY, JSON.stringify(list));\r
    } catch (e) { /* ignore */ }\r
  }\r
\r
  /* 开始新一局：清空旧数据，生成全场统一开局面板（命3 · 理智2 · 空背包） */\r
  function startRun(levelNo) {\r
    resetRun();\r
    var save = defaultSave(typeof levelNo === 'number' ? levelNo : 1);\r
    persist(save);\r
    return save;\r
  }\r
\r
  /* 清空本机全部运行数据（存档 + 旅程记录） */\r
  function resetRun() {\r
    memoryHistory = [];\r
    memoryInitialSave = null;\r
    try {\r
      global.localStorage.removeItem(STORAGE_KEY);\r
      global.localStorage.removeItem(HISTORY_KEY);\r
      global.localStorage.removeItem(LEGACY_STORAGE_KEY);\r
      global.localStorage.removeItem(LEGACY_HISTORY_KEY);\r
    } catch (e) { /* ignore */ }\r
  }\r
\r
  /* ---------------- 读档（宽容处理核心） ---------------- */\r
\r
  /* 缺字段补默认值、多字段一律忽略、类型自动转换 */\r
  function normalize(raw, levelNo) {\r
    var base = defaultSave(levelNo);\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return base;\r
    var player = raw.player && typeof raw.player === 'object' ? raw.player : {};\r
    var maxHp = Math.min(10, Math.max(1, toInt(player.max_hp, 3, 1)));\r
    var hp = Math.min(maxHp, toInt(player.hp, 3, 0));\r
    var status = toStr(player.status, hp <= 0 ? 'dead' : 'normal');\r
    if (['normal', 'wounded', 'cursed', 'dead', 'specter'].indexOf(status) === -1) status = 'normal';\r
    var tomb = raw.tombstone && typeof raw.tombstone === 'object' && !Array.isArray(raw.tombstone) ? raw.tombstone : {};\r
    return {\r
      schema: SCHEMA,\r
      level: typeof levelNo === 'number' ? levelNo : toInt(raw.level, 1, 0),\r
      world: toStr(raw.world, ''),\r
      player: {\r
        hp: hp,\r
        max_hp: maxHp,\r
        level: Math.min(10, toInt(player.level, 1, 1)),\r
        sanity: toInt(player.sanity, 2, 0),\r
        status: status,\r
        curses: Array.isArray(player.curses) ? player.curses.map(function (c) { return toStr(c, '').slice(0, 40); }).filter(Boolean).slice(0, 8) : [],\r
        deaths: toInt(player.deaths, 0, 0)\r
      },\r
      items: coerceItems(raw.items),\r
      /* 已结算的 on_enter 道具 id：防止换关卡或刷新时重复回血 */\r
      settled: Array.isArray(raw.settled) ? raw.settled.map(function (id) { return toStr(id, '').slice(0, 64); }).filter(Boolean).slice(-8) : [],\r
      clues: coerceClues(raw.clues).slice(-8),\r
      exit_hook: toStr(raw.exit_hook, ''),\r
      prev_world: toStr(raw.prev_world, ''),\r
      next_world: toStr(raw.next_world, ''),\r
      tombstone: {\r
        fallen_level: toInt(tomb.fallen_level, 0, 0),\r
        cause: toStr(tomb.cause, '').slice(0, 100),\r
        epitaph: toStr(tomb.epitaph, '').slice(0, 200)\r
      }\r
    };\r
  }\r
\r
  function persist(save) {\r
    try {\r
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));\r
    } catch (e) { /* 隐私模式等场景静默忽略，不影响游戏 */ }\r
  }\r
\r
  /* 读取优先级：URL ?save=存档码 → localStorage → 默认开局 */\r
  function readSave(levelNo) {\r
    var raw = null;\r
    try {\r
      var m = global.location.search.match(/[?&]save=([^&]+)/);\r
      if (m) {\r
        raw = decodeCode(decodeURIComponent(m[1]));\r
        if (raw) persist(normalize(raw, levelNo)); /* 落地本地，刷新不丢 */\r
      }\r
    } catch (e) { /* ignore */ }\r
    if (!raw) {\r
      try {\r
        var stored = global.localStorage.getItem(STORAGE_KEY) || global.localStorage.getItem(LEGACY_STORAGE_KEY);\r
        if (stored) raw = JSON.parse(stored);\r
      } catch (e) { /* ignore */ }\r
    }\r
    var save = applyEntryEffects(normalize(raw, levelNo));\r
    if (!memoryInitialSave) memoryInitialSave = normalize(save, levelNo);\r
    return save;\r
  }\r
\r
  function freezeSnapshot(value) {
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(function (key) { freezeSnapshot(value[key]); });
      Object.freeze(value);
    }
    return value;
  }
  function getInitialSave() {\r
    if (memoryInitialSave) return normalize(memoryInitialSave, null);\r
    return readSave();\r
  }\r
\r
  /* 通用道具 on_enter 结算：每件道具只结算一次（settled 标记随存档一路传递）。\r
   * passive 效果不改数值，由下一关玩法自行读取 save.items[].effect。 */\r
  function applyEntryEffects(save) {\r
    var current = normalize(save, null);\r
    var done = current.settled;\r
    current.items.forEach(function (it) {\r
      var fx = it.effect;\r
      if (!fx || fx.trigger !== 'on_enter' || done.indexOf(it.id) !== -1) return;\r
      if (fx.stat === 'hp') current.player.hp = Math.min(current.player.max_hp, current.player.hp + fx.value);\r
      else if (fx.stat === 'sanity') current.player.sanity = Math.max(0, current.player.sanity + fx.value);\r
      else if (fx.stat === 'max_hp') current.player.max_hp = Math.min(10, current.player.max_hp + fx.value);\r
      else if (fx.stat === 'cleanse' && current.player.curses.length) {\r
        current.player.curses.splice(0, 1);\r
        if (current.player.status === 'cursed') current.player.status = 'normal';\r
      }\r
      done.push(it.id);\r
    });\r
    current.settled = done.slice(-8);\r
    return current;\r
  }\r
\r
  function respawn() {\r
    var initial = applyEntryEffects(getInitialSave());\r
    initial.player.deaths = (initial.player.deaths || 0) + 1;\r
    memoryInitialSave = normalize(initial, null);\r
    persist(initial);\r
    return initial;\r
  }\r
\r
  /* 连续阵亡放水档位：0 正常 / 1 连死两次 / 2 连死三次以上；具体放水由选手实现 */\r
  function assist(save) {\r
    var n = toInt(save && save.player ? save.player.deaths : 0, 0, 0);\r
    return n >= 3 ? 2 : n >= 2 ? 1 : 0;\r
  }\r
\r
  /* ---------------- 游戏内编辑存档 ---------------- */\r
\r
  /* 按类型取用上家道具：命中则从背包移除并返回该道具；取不到返回 null，\r
   * 此时队伍必须走本关兜底剧情（评审「衔接分」硬性要求！） */\r
  function consumeAny(items, type) {\r
    if (!Array.isArray(items)) return null;\r
    for (var i = 0; i < items.length; i++) {\r
      if (items[i] && items[i].type === type) {\r
        return items.splice(i, 1)[0];\r
      }\r
    }\r
    return null;\r
  }\r
\r
  function addItem(save, item) {\r
    var rawEffect = item && typeof item === 'object' ? item.effect : null;\r
    var it = coerceItem(item);\r
    if (it) {\r
      if (rawEffect && !it.effect && typeof console !== 'undefined') {\r
        console.warn('[WL] 道具「' + it.name + '」的 effect 不符合宪章词表，已降级为纯装饰道具。');\r
      }\r
      save.items.push(it);\r
      if (save.items.length > ITEMS_MAX) {\r
        save.items = save.items.slice(-ITEMS_MAX);\r
        if (typeof console !== 'undefined') console.warn('[WL] 跨关道具最多 3 件，已丢弃最早的一件。');\r
      }\r
    }\r
    return save;\r
  }\r
\r
  function addClue(save, text) {\r
    var t = toStr(text, '');\r
    if (t) save.clues.push(t);\r
    return save;\r
  }\r
\r
  function setPlayer(save, patch) {\r
    if (!patch) return save;\r
    if (patch.max_hp !== undefined) save.player.max_hp = Math.min(10, Math.max(1, toInt(patch.max_hp, save.player.max_hp || 3, 1)));\r
    if (patch.hp !== undefined) save.player.hp = Math.min(save.player.max_hp || 3, toInt(patch.hp, save.player.hp, 0));\r
    if (patch.level !== undefined) save.player.level = Math.min(10, toInt(patch.level, save.player.level || 1, 1));\r
    if (patch.sanity !== undefined) save.player.sanity = toInt(patch.sanity, save.player.sanity, 0);\r
    if (patch.status !== undefined) save.player.status = toStr(patch.status, save.player.status);\r
    if (Array.isArray(patch.curses)) save.player.curses = patch.curses.slice(0, 8);\r
    return save;\r
  }\r
\r
  /* ---------------- 写档 → 过场演出 → 跳转 ---------------- */\r
\r
  /* 超量保留最近取得的内容，让本关的交接信息优先传给下家。 */\r
  function softValidate(save) {\r
    var warnings = [];\r
    if (save.items.length > 3) {\r
      save.items = save.items.slice(-3);\r
      warnings.push('道具超过 3 件，已优先保留最近取得的 3 件');\r
    }\r
    if (save.clues.length > 2) {\r
      save.clues = save.clues.slice(-2);\r
      warnings.push('线索超过 2 条，已优先保留最近取得的 2 条');\r
    }\r
    return warnings;\r
  }\r
\r
  /* 读档保持宽容；交接必填项缺失时明确提示，不写入无效出口。 */\r
  function validateExit(save, config, opts) {\r
    config = config || {};\r
    opts = opts || {};\r
    var errors = [];\r
    if (!save.items.length) errors.push('请为出口准备至少 1 件道具，并标注道具类型。');\r
    if (!save.clues.length) errors.push('请为出口准备至少 1 条本关线索。');\r
    if (!toStr(save.exit_hook, '').trim()) errors.push('请填写指向下一个世界的结尾一句话。');\r
    if (!toStr(config.world, '').trim()) errors.push('请填写本关世界名。');\r
    if (!toStr(config.nextWorld, '').trim()) errors.push('请填写下一关世界名。');\r
    if (!toStr(opts.nextUrl, '').trim()) errors.push('请填写下一关页面地址。');\r
    return errors;\r
  }\r
\r
  function showExitErrors(errors) {\r
    if (typeof document === 'undefined') return;\r
    var box = document.getElementById('wl-exit-errors');\r
    if (!box) {\r
      box = document.createElement('div');\r
      box.id = 'wl-exit-errors';\r
      (document.getElementById('finish-area') || document.body).appendChild(box);\r
    }\r
    box.innerHTML = errors.length ? '<div class="wl-warn" role="alert"><strong>交接尚未完成</strong><br>' + errors.map(esc).join('<br>') + '</div>' : '';\r
  }\r
\r
  /*\r
   * config = { level: 本关序号, world: 本关世界名, nextWorld: 下家世界名 }\r
   * save   = readSave 拿到、游戏过程中已修改的存档对象\r
   * opts   = { exitHook: '结尾一句话（必须指向下一签世界）', nextUrl: '下家页面地址', passViaUrl: 是否附加存档码（默认 true） }\r
   */\r
  function failLevel(reason, fallenSave, configOverride) {\r
    var config = configOverride || global.CONFIG || {};\r
    var current = fallenSave ? normalize(fallenSave, toInt(config.level, 1, 1)) : readSave(toInt(config.level, 1, 1));\r
    var cause = toStr(reason, '力竭倒地').slice(0, 100);\r
    var items = coerceItems(current.items);\r
    if (!items.length) {\r
      items = [{ id: 'relic_survival_knife', name: '前人的求生短刀', type: 'tool', relic: true }];\r
    } else {\r
      items = items.map(function (it) {\r
        it.relic = true;\r
        it.name = ('前人的' + it.name.replace(/^(前人的)+/, '')).slice(0, 32);\r
        return it;\r
      }).slice(0, 3);\r
    }\r
    var previous = current.tombstone || {};\r
    var marker = '[第' + current.level + '关] ' + cause;\r
    var relicSave = normalize({\r
      schema: SCHEMA,\r
      level: current.level + 1,\r
      world: current.world || config.world,\r
      player: { hp: 3, max_hp: 3, sanity: 2, level: 1, status: 'normal', curses: [] },\r
      items: items,\r
      clues: current.clues.length ? current.clues : ['前人倒在此处，留下了未解的谜题'],\r
      exit_hook: '【遗物交接】一代探索者在此长眠，新求生者拾起遗物踏入下一世界……',\r
      prev_world: current.world || config.world,\r
      next_world: config.nextWorld || current.next_world || '未知世界',\r
      tombstone: {\r
        fallen_level: current.level,\r
        cause: cause,\r
        epitaph: ((previous.epitaph ? previous.epitaph + ' | ' : '') + marker).slice(0, 200)\r
      }\r
    }, current.level + 1);\r
    persist(relicSave);\r
    recordPassage(config, relicSave);\r
    if (global.parent && global.parent !== global) {\r
      global.parent.postMessage({ type: 'IW_FAIL', reason: cause, fallenSave: current }, '*');\r
      global.parent.postMessage({ type: 'IW_SAVE', save: relicSave, history: readHistory(), failure: true }, '*');\r
    }\r
    if (config.nextUrl) showHandoffOverlay(config, relicSave, [], config.nextUrl, true);\r
    return relicSave;\r
  }\r
\r
  function forcePass() {\r
    return failLevel('时空裂隙坍缩（演示超时）');\r
  }\r
\r
  function completeLevel(config, save, opts) {\r
    opts = opts || {};\r
    config = config || {};\r
    if (global.CONFIG && global.parent && global.parent !== global) { config = global.CONFIG; opts.exitHook = config.exitHook; opts.nextUrl = config.nextUrl; }
    var current = normalize(save, toInt(config.level, 1, 1));\r
    if (current.player.hp <= 0 || current.player.status === 'dead') {\r
      return failLevel('探索者生命耗尽', save, config);\r
    }\r
    var candidate = normalize(save, toInt(config.level, 1, 1) + 1);\r
    candidate.player.deaths = 0;\r
    candidate.exit_hook = toStr(opts.exitHook, '').trim();\r
    candidate.prev_world = toStr(config.world, '').trim();\r
    candidate.next_world = toStr(config.nextWorld, '').trim();\r
    var warnings = softValidate(candidate);
    if (Array.isArray(save.items) && save.items.length > 3) warnings.push('道具超过 3 件，已保留最近 3 件');
    if (Array.isArray(save.clues) && save.clues.length > 2) warnings.push('线索超过 2 条，已保留最近 2 条');
    if (warnings.length && typeof console !== 'undefined') console.warn('[WL] ' + warnings.join('；'));\r
    var errors = validateExit(candidate, config, opts);\r
    showExitErrors(errors);\r
    if (errors.length) return null;\r
    Object.keys(candidate).forEach(function (key) { save[key] = candidate[key]; });\r
    persist(save);\r
    recordPassage(config, save); /* 旅程记录：终局结算页回放用 */\r
    if (global.parent && global.parent !== global) {\r
      global.parent.postMessage({ type: 'IW_COMPLETE', save: save, history: readHistory() }, '*');\r
    }\r
    showHandoffOverlay(config, save, warnings, opts.nextUrl, opts.passViaUrl !== false);\r
    return save;\r
  }\r
\r
  /* 替换旧参数、保留其他参数与锚点，导入不会再次读到旧 URL 存档。 */\r
  function transferUrl(nextUrl, save, history) {\r
    var parts = String(nextUrl).split('#');\r
    var hash = parts.length > 1 ? '#' + parts.slice(1).join('#') : '';\r
    var beforeHash = parts[0];\r
    var queryAt = beforeHash.indexOf('?');\r
    var base = queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt);\r
    var query = queryAt === -1 ? [] : beforeHash.slice(queryAt + 1).split('&').filter(function (p) {\r
      return p && !/^(save|history)(=|$)/.test(p);\r
    });\r
    query.push('save=' + encodeURIComponent(encodeCode(save)));\r
    query.push('history=' + encodeURIComponent(encodeCode(history)));\r
    return base + '?' + query.join('&') + hash;\r
  }\r
\r
  function jumpTo(nextUrl, save, passViaUrl) {\r
    if (!nextUrl) return;\r
    var url = nextUrl;\r
    if (passViaUrl) {\r
      url = transferUrl(nextUrl, save, readHistory());\r
    }\r
    global.location.href = url;\r
  }\r
\r
  /* 自动过场演出：世界线移动画面 + 上家结尾钩子 + 通关存档卡 */\r
  function showHandoffOverlay(config, save, warnings, nextUrl, passViaUrl) {\r
    if (typeof document === 'undefined') return; /* 非浏览器环境（如自动化测试）跳过 UI */\r
    var ov = document.createElement('div');\r
    ov.className = 'wl-overlay';\r
    var seconds = 8;\r
    ov.innerHTML =\r
      '<div class="wl-handoff">' +\r
        '<div class="wl-handoff-kicker">世 界 线 移 动</div>' +\r
        '<div class="wl-handoff-route">' + esc(config.world) + ' → ' + esc(config.nextWorld || '？？？') + '</div>' +\r
        '<div class="wl-handoff-hook">“' + esc(save.exit_hook || '……') + '”</div>' +\r
        renderSaveCard(save, config.level, config.world) +\r
        (warnings.length ? '<div class="wl-warn">提示：' + warnings.map(esc).join('；') + '</div>' : '') +\r
        '<button class="wl-btn" id="wl-next-btn" type="button">进入下一关（' + seconds + 's）</button>' +\r
      '</div>';\r
    document.body.appendChild(ov);\r
    var done = false;\r
    function go() {\r
      if (done) return;\r
      done = true;\r
      clearInterval(timer);\r
      jumpTo(nextUrl, save, passViaUrl);\r
    }\r
    document.getElementById('wl-next-btn').onclick = go;\r
    var timer = setInterval(function () {\r
      seconds--;\r
      var btn = document.getElementById('wl-next-btn');\r
      if (btn) btn.textContent = '进入下一关（' + seconds + 's）';\r
      if (seconds <= 0) { clearInterval(timer); go(); }\r
    }, 1000);\r
  }\r
\r
  /* ---------------- 渲染组件 ---------------- */\r
\r
  function describeBag(items) {\r
    if (!items.length) return '空';\r
    return items.map(function (i) {\r
      return esc(i.name) + '（' + (TYPE_LABELS[i.type] || i.type) + '类）';\r
    }).join('、');\r
  }\r
\r
  /* 前情提要条：每关开场自动渲染，零成本完成衔接最低保障 */\r
  function renderOpening(save) {\r
    if (save.prev_world) {\r
      return '<div class="wl-opening">前情提要：你从『' + esc(save.prev_world) + '』的结局里醒来——' +\r
        (save.exit_hook ? '“' + esc(save.exit_hook) + '”' : '（上家没有留下结尾钩子）') +\r
        '<br>随身行李：' + describeBag(save.items) + '</div>';\r
    }\r
    return '<div class="wl-opening">前情提要：（未读到上家存档，按默认开局：命 3 · 理智 2 · 空背包。' +\r
      '你可能是本世界线第 1 关，或直接打开了本页。）</div>';\r
  }\r
\r
  /* 五行「通关存档卡」 */\r
  function renderSaveCard(save, level, world) {\r
    var lv = (level === undefined || level === null) ? save.level : level;\r
    var w = world || save.prev_world || '？？？';\r
    var cluesHtml = save.clues.length ? save.clues.map(esc).join('<br>') : '无';\r
    return '<div class="wl-card">' +\r
      '<div class="wl-card-title">【第 ' + toInt(lv, 1, 1) + ' 关 · ' + esc(w) + ' 通关存档卡】</div>' +\r
      '<div class="wl-row">命：' + save.player.hp + '/' + (save.player.max_hp || 3) + '　　等级：' + (save.player.level || 1) + '/10　　理智：' + save.player.sanity + '</div>' +\r
      '<div class="wl-row">背包：' + describeBag(save.items) + '</div>' +\r
      '<div class="wl-row">线索：' + cluesHtml + '</div>' +\r
      '<div class="wl-row">结尾一句话：' + (save.exit_hook ? esc(save.exit_hook) : '（未填写）') + '</div>' +\r
      '<div class="wl-row wl-next">（下一关：' + esc(save.next_world || '未知') + '）</div>' +\r
      '</div>';\r
  }\r
\r
  /* ---------------- 调试工具 ---------------- */\r
\r
  var debug = {\r
    json: function (save) {\r
      try { return JSON.stringify(save, null, 2); } catch (e) { return '{}'; }\r
    },\r
    code: function (save) { return encodeCode(save); },\r
    importCode: function (code) {\r
      var raw = decodeCode(code);\r
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
      var save = normalize(raw, null);\r
      persist(save);\r
      return save;\r
    },\r
    reset: function () {\r
      try { global.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }\r
    }\r
  };\r
\r
  function mountDebug(save) {\r
    var jsonEl = document.getElementById('debug-json');\r
    var codeEl = document.getElementById('debug-code');\r
    function sync() {\r
      jsonEl.textContent = debug.json(save);\r
      codeEl.value = debug.code(save);\r
    }\r
    sync();\r
    document.getElementById('debug-copy').onclick = function () {\r
      sync();\r
      codeEl.select();\r
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }\r
    };\r
    document.getElementById('debug-import').onclick = function () {\r
      var restored = debug.importCode(codeEl.value);\r
      if (!restored) { global.alert('存档码无法识别'); return; }\r
      /* 单独的存档码不含旅程；清掉当前 URL 的旧旅程，避免串线。 */\r
      resetRun();\r
      persist(restored);\r
      jumpTo(global.location.href, restored, true);\r
    };\r
    document.getElementById('debug-reset').onclick = function () {\r
      jumpTo(global.location.href, startRun(save.level), true);\r
    };\r
  }\r
\r
  /* ---------------- 内置样式（过场/存档卡，避免被队伍样式影响） ---------------- */\r
\r
  var LIB_CSS = [\r
    '.wl-card{background:#0f1724;border:1px solid #2a3b57;border-left:3px solid #35e08c;border-radius:10px;padding:14px 16px;color:#e8eef8;font:14px/23px "PingFang SC","Microsoft YaHei",system-ui,sans-serif;max-width:560px;box-sizing:border-box;}',\r
    '.wl-card-title{font-weight:600;margin-bottom:8px;color:#9ff5c8;}',\r
    '.wl-row{margin:2px 0;}',\r
    '.wl-next{color:#8fa3bf;font-size:12px;margin-top:6px;}',\r
    '.wl-opening{background:#141d2e;border:1px dashed #33455f;border-radius:8px;padding:10px 14px;color:#c6d4e8;font:14px/22px "PingFang SC","Microsoft YaHei",sans-serif;margin:0 0 16px;}',\r
    '.wl-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(5,10,18,.94);display:flex;align-items:center;justify-content:center;z-index:9999;animation:wl-fade .35s ease;}',\r
    '.wl-handoff{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;max-width:640px;}',\r
    '.wl-handoff-kicker{letter-spacing:12px;color:#35e08c;font:600 14px/20px sans-serif;}',\r
    '.wl-handoff-route{color:#e8eef8;font:600 20px/28px "PingFang SC","Microsoft YaHei",sans-serif;}',\r
    '.wl-handoff-hook{color:#aebdd4;font:15px/24px "PingFang SC","Microsoft YaHei",sans-serif;font-style:italic;max-width:520px;}',\r
    '.wl-warn{color:#f0b429;font:12px/18px "PingFang SC","Microsoft YaHei",sans-serif;max-width:560px;text-align:left;}',\r
    '.wl-btn{background:#35e08c;color:#04140b;border:none;border-radius:8px;padding:10px 26px;font:600 15px/22px "PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;}',\r
    '.wl-btn:hover{filter:brightness(1.08);}',\r
    '@keyframes wl-fade{from{opacity:0}to{opacity:1}}'\r
  ].join('');\r
\r
  function injectStyles() {\r
    try {\r
      if (!document.getElementById('wl-lib-style')) {\r
        var s = document.createElement('style');\r
        s.id = 'wl-lib-style';\r
        s.textContent = LIB_CSS;\r
        document.head.appendChild(s);\r
      }\r
    } catch (e) { /* ignore */ }\r
  }\r
  if (typeof document !== 'undefined') injectStyles();\r
\r
  /* 外链作品没有云端注入桥时，也由核心库完成双向握手与裁判指令。 */\r
  if (typeof global.addEventListener === 'function') {\r
    global.addEventListener('message', function (event) {\r
      if (global.parent && event.source !== global.parent) return;
      var message = event.data;\r
      if (!message || typeof message !== 'object') return;\r
      if (message.type === 'IW_INIT_SAVE' || message.type === 'iw-init') {\r
        if (message.config && typeof message.config === 'object') global.CONFIG = message.config;
        var incoming = applyEntryEffects(normalize(message.save || readSave(), message.save && message.save.level));\r
        memoryInitialSave = normalize(incoming, incoming.level);\r
        persist(incoming);\r
        if (typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
          global.dispatchEvent(new global.CustomEvent('iw-save-ready', { detail: incoming }));\r
        }\r
      }\r
      if (message.type !== 'IW_ADMIN_COMMAND') return;\r
      var command = String(message.command || message.action || '').toLowerCase();\r
      if (command === 'force_pass') command = 'forcepass';\r
      if (command === 'heal_player') command = 'heal';\r
      if (command === 'heal' || command === 'respawn') {\r
        var restored = command === 'respawn' ? respawn() : readSave();\r
        if (command === 'heal') {\r
          setPlayer(restored, { hp: restored.player.max_hp || 3, status: 'normal' });\r
          persist(restored);\r
        }\r
        if (typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
          global.dispatchEvent(new global.CustomEvent('iw-admin', { detail: { command: command, save: restored } }));\r
        }\r
      } else if (command === 'skip' || command === 'forcepass') {\r
        forcePass();\r
      } else if (command === 'reload' && global.location && typeof global.location.reload === 'function') {\r
        global.location.reload();\r
      } else if (command === 'audio' && typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
        global.dispatchEvent(new global.CustomEvent('iw-admin', { detail: { command: 'audio' } }));\r
      }\r
    });\r
    global.addEventListener('load', function () {\r
      if (global.parent && global.parent !== global) global.parent.postMessage({ type: 'IW_READY' }, '*');\r
    });\r
  }\r
\r
  /* ---------------- 导出 ---------------- */\r
\r
  global.WL = {\r
    version: SCHEMA,\r
    ITEM_TYPES: ITEM_TYPES,\r
    TYPE_LABELS: TYPE_LABELS,\r
    EFFECT_STATS: EFFECT_STATS,\r
    readSave: readSave,\r
    getInitialSave: getInitialSave,\r
    respawn: respawn,\r
    assist: assist,\r
    settle: applyEntryEffects,\r
    normalize: normalize,\r
    completeLevel: completeLevel,\r
    failLevel: failLevel,\r
    forcePass: forcePass,\r
    validateExit: validateExit,\r
    goTo: function (url, save) { jumpTo(url, save, true); },\r
    mountDebug: mountDebug,\r
    consumeAny: consumeAny,\r
    addItem: addItem,\r
    addClue: addClue,\r
    setPlayer: setPlayer,\r
    renderOpening: renderOpening,\r
    renderSaveCard: renderSaveCard,\r
    readHistory: readHistory,\r
    startRun: startRun,\r
    resetRun: resetRun,\r
    escapeHtml: esc,\r
    encodeCode: encodeCode,\r
    decodeCode: decodeCode,\r
    debug: debug\r
  };\r
})(typeof window !== 'undefined' ? window : globalThis);\r
<\/script><script>/*
 * 废土集市：不依赖 DOM 的玩法模型。
 * 浏览器：MarketModel.create / action / tick；Node：require('./model.js')。
 * 状态由调用者持有，模型只改动传入的本关状态，不读写接力存档。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MarketModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var nodes = [
    { id: 'water', kind: 'npc', name: '水婆', x: 166, y: 234 },
    { id: 'oscillator', kind: 'npc', name: '老莫', x: 336, y: 232 },
    { id: 'cable', kind: 'npc', name: '阿锈', x: 720, y: 230 },
    { id: 'battery', kind: 'npc', name: '小满', x: 737, y: 435 },
    { id: 'board', kind: 'board', name: '悬赏榜', x: 482, y: 308 },
    { id: 'radio', kind: 'radio', name: '穿界电台', x: 480, y: 147 },
    { id: 'camp', kind: 'camp', name: '旅人营火', x: 278, y: 445 },
    { id: 'salvage1', kind: 'salvage', name: '废料堆', x: 104, y: 380 },
    { id: 'salvage2', kind: 'salvage', name: '旧收音机', x: 820, y: 303 },
    { id: 'salvage3', kind: 'salvage', name: '废车残骸', x: 824, y: 494 },
    { id: 'salvage4', kind: 'salvage', name: '旧行李箱', x: 170, y: 505 },
    { id: 'salvage5', kind: 'salvage', name: '废零件', x: 365, y: 360 },
    { id: 'salvage6', kind: 'salvage', name: '铁皮箱', x: 571, y: 424 }
  ];

  var solids = [
    { x: 100, y: 150, w: 135, h: 60 },
    { x: 277, y: 150, w: 135, h: 60 },
    { x: 650, y: 150, w: 145, h: 60 },
    { x: 680, y: 355, w: 135, h: 60 },
    { x: 420, y: 65, w: 122, h: 63 },
    { x: 48, y: 105, w: 45, h: 65 }
  ];

  var salvageAmounts = [2, 3, 2, 3, 2, 2];

  function integer(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) && value !== null && value !== ''
      ? Math.max(0, Math.floor(n))
      : fallback;
  }

  function create(incomingSave, hasTool) {
    var incoming = incomingSave && incomingSave.player || {};
    var hp = Math.max(1, integer(incoming.hp, 3));
    return {
      player: { x: 480, y: 500, dir: 'down', moving: false },
      resources: { water: 3, scrap: hasTool ? 7 : 4, trust: 0 },
      parts: { cable: false, battery: false, oscillator: false },
      coil: 0,
      relic: false,
      flags: {},
      salvaged: [],
      elapsed: 0,
      hydration: 0,
      started: false,
      repaired: false,
      dead: false,
      ending: null,
      hp: hp,
      maxHp: Math.max(3, hp),
      sanity: integer(incoming.sanity, 2)
    };
  }

  /* 在缺水伤害的准确时刻停表；暂停、死亡和修复完成均不再消耗净水。 */
  function tick(state, seconds) {
    var messages = [];
    var remaining = Number(seconds);
    if (!state.started || state.dead || state.repaired || !Number.isFinite(remaining) || remaining <= 0) return messages;

    while (remaining > 0.000001 && !state.dead) {
      if (!state.flags.storm && state.elapsed >= 300) {
        state.flags.storm = true;
        messages.push('沙暴卷过集市。风更大了，摊主们仍在等你。');
      }
      var untilWater = Math.max(0, 90 - state.hydration);
      var untilStorm = state.flags.storm ? Infinity : Math.max(0, 300 - state.elapsed);
      var step = Math.min(remaining, untilWater, untilStorm);
      state.elapsed += step;
      state.hydration += step;
      remaining -= step;

      if (state.hydration >= 90 - 0.000001) {
        state.hydration = 0;
        if (state.resources.water > 0) {
          state.resources.water--;
          messages.push(state.resources.water === 0
            ? '喝完了最后一份净水。去找水婆，帮忙抽水也能换来补给。'
            : '烈日下喝掉一份净水。净水 -1。');
        } else {
          state.hp = Math.max(0, state.hp - 1);
          messages.push('缺水让你步履艰难。生命 -1，水婆的水泵还能使用。');
          if (state.hp === 0) {
            state.dead = true;
            state.player.moving = false;
            messages.push('你倒在黄沙中。重整行囊，再来一次吧。');
          }
        }
      }
      if (!state.flags.storm && state.elapsed >= 300 && !state.dead) {
        state.flags.storm = true;
        messages.push('沙暴卷过集市。风更大了，摊主们仍在等你。');
      }
    }
    return messages;
  }

  function failure(message) {
    return { ok: false, message: message };
  }

  function action(state, id) {
    if (state.dead) return failure('旅程暂时结束了，重新开始本关再试一次吧。');
    if (state.ending) return failure('这一段旅程已经完成。');
    if (state.repaired && id !== 'ending_kindness' && id !== 'ending_leave') {
      return failure('电台已修复，是时候选择如何告别集市了。');
    }

    var bag = state.resources;
    var message = '';
    var kind = 'trade';
    var duration = 6;
    var salvageIndex = /^salvage([1-6])$/.exec(id);

    if (salvageIndex) {
      if (state.salvaged.indexOf(id) !== -1) return failure('这里已经搜寻过了。');
      var index = Number(salvageIndex[1]) - 1;
      bag.scrap += salvageAmounts[index];
      state.salvaged.push(id);
      message = '拾荒有收获：废料 +' + salvageAmounts[index] + '。';
      if (id === 'salvage2') {
        state.coil++;
        message += '你还找到一枚完整的旧线圈，老莫应该用得上。';
      }
      if (id === 'salvage4') {
        state.relic = true;
        message += '箱底躺着一只发条蜥蜴，依然轻轻转动。';
      }
      kind = 'salvage';
    } else if (id === 'water_buy') {
      if (bag.scrap < 1) return failure('需要 1 份废料。也可以免费帮水婆抽水。');
      bag.scrap--;
      bag.water += 2;
      message = '水婆把水壶灌满。废料 -1，净水 +2。';
    } else if (id === 'pump') {
      /* 先拿到水，再推进时间，避免临界时刻的免费补给反而致命。 */
      bag.water++;
      duration = 14;
      message = '你帮忙摇动水泵，水婆分给你一份净水。净水 +1。';
      kind = 'water';
    } else if (id === 'cable_full' || id === 'cable_fair' || id === 'cable_water') {
      if (state.parts.cable) return failure('你已经拿到了绝缘电缆。');
      if (id === 'cable_fair' && bag.trust < 1) return failure('阿锈还不认识你。先完成悬赏，或帮帮其他摊主。');
      var cableCost = id === 'cable_fair' ? 2 : 4;
      if (id === 'cable_water') {
        if (bag.water < 2) return failure('这笔交换需要 2 份净水。');
        bag.water -= 2;
        message = '阿锈接过净水，把电缆推给你。净水 -2，绝缘电缆 +1。';
      } else {
        if (bag.scrap < cableCost) return failure('还需要 ' + cableCost + ' 份废料。周围的残骸里还能找到一些。');
        bag.scrap -= cableCost;
        message = id === 'cable_fair'
          ? '“听说你帮了集市。”阿锈给你一个人情价。废料 -2，绝缘电缆 +1。'
          : '交易达成。废料 -4，绝缘电缆 +1。';
      }
      state.parts.cable = true;
    } else if (id === 'battery_water' || id === 'battery_scrap') {
      if (state.parts.battery) return failure('你已经拿到了储能电池。');
      if (id === 'battery_water') {
        if (bag.water < 2) return failure('小满需要 2 份净水。去水婆那里看看吧。');
        bag.water -= 2;
        bag.trust += 2;
        message = '小满给家人装好净水，郑重递来电池。净水 -2，储能电池 +1，声望 +2。';
      } else {
        if (bag.scrap < 3) return failure('这笔交换需要 3 份废料。');
        bag.scrap -= 3;
        message = '你用备用零件换下小满的储能电池。废料 -3，储能电池 +1。';
      }
      state.parts.battery = true;
    } else if (id === 'oscillator_scrap' || id === 'oscillator_coil') {
      if (state.parts.oscillator) return failure('你已经拿到了信号振荡器。');
      if (id === 'oscillator_coil') {
        if (state.coil < 1) return failure('需要一枚旧线圈。东侧的旧收音机也许还没坏透。');
        state.coil--;
        bag.trust++;
        message = '旧线圈让老莫的收音机重新唱歌。旧线圈 -1，信号振荡器 +1，声望 +1。';
      } else {
        if (bag.scrap < 3) return failure('老莫需要 3 份废料来修他的机器。');
        bag.scrap -= 3;
        message = '老莫从工具箱底翻出一个振荡器。废料 -3，信号振荡器 +1。';
      }
      state.parts.oscillator = true;
    } else if (id === 'bounty') {
      if (state.flags.bounty) return failure('这张净水泵维修悬赏已经结清了。');
      if (bag.scrap < 3) return failure('修水泵需要 3 份废料。完成后可领 4 份净水。');
      bag.scrap -= 3;
      bag.water += 4;
      bag.trust++;
      state.flags.bounty = true;
      message = '水泵重新运转，集市记住了你的名字。废料 -3，净水 +4，声望 +1。';
      kind = 'quest';
    } else if (id === 'rest') {
      var maxHp = Math.max(3, state.maxHp || 3);
      if (state.hp >= maxHp) return failure('你现在精神不错，暂时不需要休息。');
      if (bag.water < 1) return failure('休息需要 1 份净水。水婆的水泵一直开着。');
      bag.water--;
      state.hp++;
      message = '在营火边喝一口水，缓过气来。净水 -1，生命 +1。';
      kind = 'heal';
    } else if (id === 'repair') {
      if (!state.parts.cable || !state.parts.battery || !state.parts.oscillator) {
        return failure('电台还缺零件：需要绝缘电缆、储能电池和信号振荡器。');
      }
      state.repaired = true;
      state.player.moving = false;
      message = '电流穿过旧线路，穿界电台终于亮了。明天，有了信号。';
      kind = 'repair';
      duration = 0;
    } else if (id === 'ending_kindness' || id === 'ending_leave') {
      if (!state.repaired) return failure('先修好北面的穿界电台，才能接通世界线。');
      if (id === 'ending_kindness') {
        if (bag.water < 1) return failure('至少留下一份净水，才能把这份希望交给集市。');
        bag.water--;
        state.ending = 'kindness';
        message = '你留下一份净水。集市的灯火会替你守住这条回家的路。';
      } else {
        state.ending = 'leave';
        message = '你带着集市的信号告别。下一段旅程，正在电波的另一端等你。';
      }
      kind = 'ending';
      duration = 0;
    } else {
      return failure('这里暂时没有可以进行的交易。');
    }

    var events = tick(state, duration);
    if (events.length) message += ' ' + events.join(' ');
    return { ok: true, message: message, kind: kind, events: events };
  }

  return { create: create, action: action, tick: tick, nodes: nodes, solids: solids };
});
<\/script><script>/* Original, dependency-free pixel artwork for the Rustwind Bazaar. */
(function (global) {
  'use strict';

  const C = {
    sand: '#c8b481', pale: '#d9c797', path: '#dccb9c', shadow: '#a18e5e',
    deep: '#5b6248', green: '#687651', moss: '#90936a', light: '#e8d8a9',
    rust: '#a56b48', orange: '#c58c57', darkRust: '#845c43', teal: '#6e9184',
    darkTeal: '#526d61', red: '#b57857', cream: '#e8d3a3', wood: '#8f7750',
    darkWood: '#6c6244', metal: '#85836a', darkMetal: '#626a55'
  };

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function poly(ctx, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(Math.round(p[0]), Math.round(p[1])) : ctx.moveTo(Math.round(p[0]), Math.round(p[1])));
    ctx.closePath();
    ctx.fill();
  }

  function random(seed) {
    let x = seed >>> 0;
    return function () {
      x = (Math.imul(1664525, x) + 1013904223) >>> 0;
      return x / 4294967296;
    };
  }

  function shadow(ctx, x, y, w, h) {
    rect(ctx, x - w / 2, y - h / 2 + 2, w, h - 4, '#6c684329');
    rect(ctx, x - w / 2 + 4, y - h / 2, w - 8, h, '#6c684329');
  }

  function crate(ctx, x, y, size, shade) {
    const s = size || 24;
    shadow(ctx, x + s / 2 + 4, y + s + 3, s + 10, 9);
    rect(ctx, x, y, s, s, C.darkWood);
    rect(ctx, x + 2, y + 2, s - 4, s - 4, shade || '#a88d5a');
    rect(ctx, x + 4, y + 4, s - 8, s - 8, '#b39b68');
    rect(ctx, x + 2, y + s / 2 - 1, s - 4, 3, '#897446');
    rect(ctx, x + s / 2 - 1, y + 2, 3, s - 4, '#897446');
    rect(ctx, x + 2, y + 2, s - 4, 2, '#d1b77e');
    rect(ctx, x + 3, y + s - 4, s - 6, 2, '#8d784d');
    for (let i = 3; i < s - 3; i += 4) {
      rect(ctx, x + i, y + i, 3, 3, '#d0b078');
      rect(ctx, x + s - i - 3, y + i, 3, 3, '#d0b078');
    }
    rect(ctx, x + 3, y + 3, 2, 2, '#675e42');
    rect(ctx, x + s - 5, y + s - 5, 2, 2, '#675e42');
  }

  function barrel(ctx, x, y, color, scale) {
    const s = scale || 1;
    shadow(ctx, x + 11 * s, y + 27 * s, 30 * s, 10 * s);
    rect(ctx, x + 3 * s, y, 16 * s, 3 * s, '#5d644d');
    rect(ctx, x, y + 3 * s, 22 * s, 23 * s, color || '#8c9877');
    rect(ctx, x + 3 * s, y + 26 * s, 16 * s, 3 * s, '#626c52');
    rect(ctx, x + 3 * s, y + 4 * s, 5 * s, 21 * s, '#ffffff18');
    rect(ctx, x, y + 8 * s, 22 * s, 3 * s, '#59665099');
    rect(ctx, x, y + 20 * s, 22 * s, 3 * s, '#59665099');
    rect(ctx, x + 4 * s, y + 2 * s, 13 * s, 3 * s, '#c0b995');
    rect(ctx, x + 13 * s, y + 3 * s, 4 * s, 3 * s, '#626c52');
  }

  function cactus(ctx, x, y, s) {
    s = s || 1;
    shadow(ctx, x + 2 * s, y + 2 * s, 29 * s, 9 * s);
    rect(ctx, x - 5 * s, y - 28 * s, 10 * s, 29 * s, '#778657');
    rect(ctx, x - 2 * s, y - 31 * s, 5 * s, 4 * s, '#778657');
    rect(ctx, x - 14 * s, y - 20 * s, 6 * s, 15 * s, '#748052');
    rect(ctx, x - 11 * s, y - 9 * s, 8 * s, 5 * s, '#748052');
    rect(ctx, x + 4 * s, y - 14 * s, 8 * s, 5 * s, '#69794e');
    rect(ctx, x + 9 * s, y - 24 * s, 5 * s, 15 * s, '#69794e');
    rect(ctx, x - 2 * s, y - 26 * s, 2 * s, 26 * s, '#a4ab73');
    rect(ctx, x - 12 * s, y - 17 * s, 2 * s, 9 * s, '#a4ab73');
    rect(ctx, x + 10 * s, y - 22 * s, 2 * s, 8 * s, '#92a16a');
    rect(ctx, x + 2 * s, y - 18 * s, 2 * s, 2 * s, '#526346');
    rect(ctx, x - 4 * s, y - 7 * s, 2 * s, 2 * s, '#526346');
    rect(ctx, x - 1 * s, y - 33 * s, 4 * s, 3 * s, '#b88464');
  }

  function rock(ctx, x, y, s) {
    s = s || 1;
    poly(ctx, [[x, y], [x + 5 * s, y - 7 * s], [x + 15 * s, y - 8 * s], [x + 22 * s, y - 2 * s], [x + 23 * s, y + 5 * s], [x + 4 * s, y + 6 * s]], '#9b926c');
    rect(ctx, x + 5 * s, y - 6 * s, 9 * s, 3 * s, '#b4aa7e');
    rect(ctx, x + 6 * s, y + 4 * s, 16 * s, 2 * s, '#8e875f');
  }

  function grass(ctx, x, y, color) {
    const c = color || '#999d69';
    rect(ctx, x, y, 2, 8, c);
    rect(ctx, x - 3, y + 2, 2, 5, c);
    rect(ctx, x + 3, y - 2, 2, 9, c);
    rect(ctx, x + 6, y + 3, 2, 4, c);
  }

  function rug(ctx, x, y, w, h, color) {
    rect(ctx, x, y, w, h, '#796f4c36');
    rect(ctx, x + 3, y + 2, w - 6, h - 5, color || '#b29169');
    rect(ctx, x + 8, y + 7, w - 16, h - 15, '#cbb482');
    rect(ctx, x + 12, y + 11, w - 24, h - 23, color || '#b29169');
    for (let i = 8; i < w - 5; i += 8) {
      rect(ctx, x + i, y - 3, 2, 5, '#dbbd8e');
      rect(ctx, x + i, y + h - 3, 2, 5, '#dbbd8e');
    }
    for (let i = 21; i < w - 20; i += 17) {
      rect(ctx, x + i, y + h / 2 - 2, 4, 4, '#ded0a1');
      rect(ctx, x + i - 2, y + h / 2, 8, 2, '#ded0a1');
    }
  }

  function pixelText(ctx, text, x, y, color, size, align) {
    ctx.font = \`\${size || 11}px "Microsoft YaHei", "PingFang SC", sans-serif\`;
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color || C.deep;
    ctx.fillText(text, Math.round(x), Math.round(y));
  }

  function sign(ctx, text, x, y, w, color) {
    const width = w || text.length * 13 + 18;
    rect(ctx, x - width / 2 + 2, y - 8, width, 21, '#76674836');
    rect(ctx, x - width / 2, y - 11, width, 21, color || '#e9d6a6');
    rect(ctx, x - width / 2, y - 11, width, 2, '#f2e3b9');
    rect(ctx, x - width / 2, y + 8, width, 2, '#9b885f');
    rect(ctx, x - width / 2 + 4, y - 3, 2, 2, '#9a885f');
    rect(ctx, x + width / 2 - 6, y - 3, 2, 2, '#9a885f');
    pixelText(ctx, text, x, y, '#6b664a', 10);
  }

  function stall(ctx, x, y, w, color, stripe, merchandise) {
    const h = 61;
    shadow(ctx, x + w / 2 + 4, y + 58, w + 22, 27);
    rect(ctx, x + 6, y - 19, 5, h + 40, C.darkWood);
    rect(ctx, x + w - 11, y - 19, 5, h + 40, C.darkWood);
    rect(ctx, x + 7, y - 22, w - 14, 4, '#92805a');
    rect(ctx, x + 8, y + 24, w - 16, 30, '#7d7653');
    rect(ctx, x + 12, y + 27, w - 24, 24, '#9d8b5f');
    rect(ctx, x + 11, y + 31, w - 22, 2, '#b29c6b');
    rect(ctx, x + 11, y + 45, w - 22, 2, '#b29c6b');
    rect(ctx, x + 18, y + 31, 2, 20, '#786d4b');
    rect(ctx, x + w - 21, y + 31, 2, 20, '#786d4b');
    rect(ctx, x + 3, y + 50, w - 6, 10, '#6b6447');
    rect(ctx, x + 1, y + 47, w - 2, 7, '#b9a171');
    rect(ctx, x + 1, y + 47, w - 2, 2, '#d5bc87');
    // The roof is formed from hard, stepped pixels rather than smooth paths.
    rect(ctx, x + 10, y - 17, w - 20, 5, color);
    rect(ctx, x + 6, y - 12, w - 12, 9, color);
    rect(ctx, x + 2, y - 3, w - 4, 12, color);
    rect(ctx, x - 2, y + 9, w + 4, 14, color);
    for (let i = 0; i < w; i += 28) {
      const sw = Math.min(14, w - i);
      rect(ctx, x + i + 4, y - 12, sw - 3, 8, stripe);
      rect(ctx, x + i + 1, y - 4, sw + 1, 13, stripe);
      rect(ctx, x + i - 2, y + 9, sw + 5, 14, stripe);
    }
    rect(ctx, x - 2, y + 22, w + 4, 6, color);
    for (let i = 0; i < w + 2; i += 14) {
      rect(ctx, x + i - 2, y + 28, 12, 7, i % 28 ? stripe : color);
      rect(ctx, x + i, y + 35, 8, 3, i % 28 ? stripe : color);
    }
    rect(ctx, x + 13, y - 13, 19, 2, '#f2d9ac48');
    rect(ctx, x + w - 28, y + 4, 12, 7, '#c4b18c');
    rect(ctx, x + w - 28, y + 4, 12, 1, '#e3d2aa');
    rect(ctx, x + w - 23, y + 3, 1, 9, '#7e7757');
    if (merchandise === 'water') {
      for (let i = 0; i < 5; i++) {
        rect(ctx, x + 18 + i * 18, y + 39, 7, 8, '#759b91');
        rect(ctx, x + 20 + i * 18, y + 35, 3, 5, '#8fb0a0');
        rect(ctx, x + 20 + i * 18, y + 34, 3, 2, '#d2c49a');
        rect(ctx, x + 19 + i * 18, y + 39, 2, 5, '#bad0b0');
      }
    } else if (merchandise === 'mechanic') {
      rect(ctx, x + 21, y + 40, 19, 7, '#77836b');
      rect(ctx, x + 23, y + 38, 12, 2, '#afb18b');
      rect(ctx, x + 55, y + 39, 10, 8, '#5a6e5b');
      rect(ctx, x + 57, y + 41, 6, 3, '#abbd8a');
      rect(ctx, x + 83, y + 42, 23, 3, '#c5ac72');
      rect(ctx, x + 93, y + 38, 4, 9, '#72745c');
    } else {
      for (let i = 0; i < 5; i++) {
        rect(ctx, x + 19 + i * 21, y + 41, 13, 5, '#7e8264');
        rect(ctx, x + 22 + i * 21, y + 37, 7, 12, '#a8a884');
        rect(ctx, x + 24 + i * 21, y + 40, 3, 6, '#616e54');
      }
    }
  }

  function person(ctx, x, y, kind, dir, stride) {
    x = Math.round(x / 2) * 2;
    y = Math.round(y / 2) * 2;
    const styles = {
      player: { hat: '#536145', brim: '#6d7950', coat: '#6f8052', scarf: '#bb7c50', skin: '#d9b17b', pack: '#927d4e' },
      water: { hat: '#ac8d68', brim: '#c5ad7d', coat: '#819a87', scarf: '#c8b98b', skin: '#c49464', pack: '#a88b5f' },
      oscillator: { hat: '#8a8a67', brim: '#beb68d', coat: '#96885d', scarf: '#71836b', skin: '#c8a377', pack: '#616f57' },
      cable: { hat: '#b17651', brim: '#d69a68', coat: '#8a7656', scarf: '#e3bd80', skin: '#d2a36e', pack: '#777d5e' },
      battery: { hat: '#839071', brim: '#a3af86', coat: '#9d8b66', scarf: '#c58c65', skin: '#d9b17b', pack: '#7b7858' },
      visitor: { hat: '#8e8664', brim: '#aba078', coat: '#8a8c69', scarf: '#b69e6e', skin: '#c6a371', pack: '#777951' }
    };
    const s = styles[kind] || styles.visitor;
    const foot = stride || 0;
    shadow(ctx, x + 1, y + 1, 28, 10);
    if (kind === 'battery') { y += 4; }
    rect(ctx, x - 8, y - 13, 6, 12 + Math.max(0, foot), '#5f6249');
    rect(ctx, x + 3, y - 13, 6, 12 + Math.max(0, -foot), '#5f6249');
    rect(ctx, x - 9, y - 3 + Math.max(0, foot), 8, 4, '#535a43');
    rect(ctx, x + 3, y - 3 + Math.max(0, -foot), 8, 4, '#535a43');
    rect(ctx, x - 11, y - 27, 22, 19, s.coat);
    rect(ctx, x - 13, y - 25, 4, 15, s.coat);
    rect(ctx, x + 10, y - 25, 4, 15, s.coat);
    rect(ctx, x - 12, y - 12, 4, 5, s.skin);
    rect(ctx, x + 10, y - 12, 4, 5, s.skin);
    rect(ctx, x - 8, y - 10, 17, 3, '#5b684a');
    rect(ctx, x - 6, y - 26, 3, 15, '#a4ac79');
    rect(ctx, x - 5, y - 19, 4, 2, '#b5bb8a');
    if (dir === 'up') {
      rect(ctx, x - 8, y - 26, 16, 15, s.pack);
      rect(ctx, x - 6, y - 24, 12, 2, '#b9a476');
      rect(ctx, x - 5, y - 18, 10, 5, '#a58e5e');
      rect(ctx, x - 8, y - 19, 16, 2, '#776848');
    } else {
      rect(ctx, x + (dir === 'left' ? 8 : -13), y - 25, 6, 16, s.pack);
      rect(ctx, x + (dir === 'left' ? 9 : -12), y - 23, 3, 2, '#b5a071');
    }
    rect(ctx, x - 8, y - 40, 16, 15, s.skin);
    rect(ctx, x - 10, y - 38, 2, 8, '#b08c61');
    rect(ctx, x + 8, y - 38, 2, 8, '#b08c61');
    rect(ctx, x - 8, y - 28, 16, 5, s.scarf);
    rect(ctx, x + 5, y - 25, 5, 8, s.scarf);
    rect(ctx, x - 10, y - 44, 20, 9, s.hat);
    rect(ctx, x - 7, y - 47, 14, 4, s.hat);
    rect(ctx, x - 14, y - 37, 28, 4, s.brim);
    rect(ctx, x - 8, y - 44, 14, 2, '#d3c49a52');
    if (dir !== 'up') {
      if (dir !== 'right') rect(ctx, x - 5, y - 32, 2, 2, '#5b5c43');
      if (dir !== 'left') rect(ctx, x + 4, y - 32, 2, 2, '#5b5c43');
      rect(ctx, x - 2, y - 27, 5, 2, '#b18a61');
    }
    if (kind === 'oscillator') {
      rect(ctx, x - 8, y - 33, 7, 5, '#535f4c');
      rect(ctx, x + 2, y - 33, 7, 5, '#535f4c');
      rect(ctx, x - 6, y - 32, 3, 2, '#b7c8a1');
      rect(ctx, x + 4, y - 32, 3, 2, '#b7c8a1');
      rect(ctx, x - 1, y - 32, 3, 2, '#6d6e51');
    }
    if (kind === 'water') {
      rect(ctx, x - 8, y - 29, 3, 5, '#ddd0a5');
      rect(ctx, x + 5, y - 29, 3, 5, '#ddd0a5');
    }
  }

  function salvage(ctx, x, y, depleted) {
    shadow(ctx, x + 3, y + 3, 50, 15);
    const a = depleted ? '#a99b72' : '#85856a';
    const b = depleted ? '#b5a379' : '#a18c60';
    rect(ctx, x - 18, y - 8, 23, 11, a);
    rect(ctx, x - 16, y - 13, 17, 6, b);
    rect(ctx, x - 11, y - 15, 5, 3, '#c2b087');
    rect(ctx, x + 4, y - 6, 16, 10, b);
    rect(ctx, x + 8, y - 9, 10, 4, '#bba175');
    rect(ctx, x - 6, y - 7, 18, 5, '#7e7859');
    rect(ctx, x - 4, y - 4, 5, 12, a);
    rect(ctx, x - 21, y + 3, 12, 4, '#a18d62');
    rect(ctx, x + 9, y + 5, 14, 3, '#d0b57e');
    if (!depleted) {
      rect(ctx, x - 14, y - 7, 6, 2, '#c8c59a');
      rect(ctx, x + 6, y - 3, 4, 4, '#c1c6a0');
      rect(ctx, x + 10, y - 5, 4, 3, '#8a9e7f');
    }
  }

  class MarketRenderer {
    constructor(canvas, nodes, solids) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;
      this.nodes = Array.isArray(nodes) ? nodes : [];
      this.solids = solids || [];
      this.background = document.createElement('canvas');
      this.background.width = 960;
      this.background.height = 600;
      this.makeBackground(this.background.getContext('2d'));
    }

    makeBackground(ctx) {
      const rnd = random(42107);
      rect(ctx, 0, 0, 960, 600, C.sand);
      // A dust-softened skyline establishes the world beyond the bazaar.
      rect(ctx, 0, 0, 960, 86, '#d3c293');
      poly(ctx, [[0, 39], [44, 39], [44, 32], [100, 32], [100, 44], [159, 44], [159, 37], [216, 37], [216, 51], [301, 51], [301, 43], [382, 43], [382, 57], [478, 57], [478, 39], [589, 39], [589, 47], [670, 47], [670, 35], [733, 35], [733, 48], [815, 48], [815, 37], [887, 37], [887, 43], [960, 43], [960, 86], [0, 86]], '#c1b385');
      for (let i = 0; i < 12; i++) {
        const x = 22 + i * 88 + Math.floor(rnd() * 20);
        const h = 17 + Math.floor(rnd() * 29);
        rect(ctx, x, 52 - h, 27 + rnd() * 15, h + 17, '#aaa47b');
        rect(ctx, x + 3, 49 - h, 17, 3, '#b9ad82');
        if (i % 3 === 0) rect(ctx, x + 10, 37 - h, 3, 16, '#aaa47b');
        rect(ctx, x + 6, 58 - h, 5, 6, '#bfb288');
        rect(ctx, x + 18, 59 - h, 5, 6, '#bfb288');
      }
      rect(ctx, 0, 66, 960, 8, '#b7a77b');
      rect(ctx, 0, 74, 960, 8, '#c3af7f');
      // Old foundation stones and a deliberately open market street.
      rect(ctx, 25, 89, 910, 470, '#bfa976');
      rect(ctx, 31, 96, 898, 455, C.sand);
      rect(ctx, 438, 133, 90, 410, C.path);
      rect(ctx, 410, 318, 145, 157, C.path);
      rect(ctx, 121, 247, 704, 42, C.path);
      rect(ctx, 78, 276, 126, 64, '#cdb986');
      rect(ctx, 718, 280, 135, 170, '#cdb986');
      rect(ctx, 373, 279, 226, 80, C.path);
      rect(ctx, 359, 302, 255, 33, C.path);
      rect(ctx, 443, 533, 87, 56, '#cbb988');
      for (let i = 0; i < 2300; i++) {
        const x = Math.floor(rnd() * 960 / 3) * 3;
        const y = 82 + Math.floor(rnd() * 518 / 3) * 3;
        const shade = i % 5 === 0 ? '#e5d3a140' : i % 3 === 0 ? '#9a895e24' : '#ab98662a';
        rect(ctx, x, y, i % 7 ? 2 : 5, 2, shade);
      }
      for (let i = 0; i < 82; i++) {
        const y = 92 + i * 6;
        rect(ctx, 434 - Math.floor(rnd() * 8), y, 4 + rnd() * 9, 3, '#d6c28e');
        rect(ctx, 527 + Math.floor(rnd() * 8), y, 4 + rnd() * 9, 3, '#d6c28e');
      }
      // A broken wall and small fenced enclosures frame the playable area.
      for (let y = 99; y < 553; y += 22) {
        rect(ctx, 17, y, 16, 15, '#9c946b');
        rect(ctx, 19, y, 12, 3, '#b6ac7d');
        rect(ctx, 930, y + 6, 16, 15, '#a2986d');
        rect(ctx, 933, y + 6, 12, 3, '#b8ab79');
      }
      for (let x = 40; x < 430; x += 24) {
        rect(ctx, x, 550, 20, 14, '#a39569');
        rect(ctx, x + 2, 550, 17, 3, '#c0ad7b');
      }
      for (let x = 545; x < 936; x += 24) {
        rect(ctx, x, 550, 20, 14, '#a39569');
        rect(ctx, x + 2, 550, 17, 3, '#c0ad7b');
      }
      rect(ctx, 410, 533, 8, 40, '#766b48');
      rect(ctx, 543, 531, 8, 42, '#766b48');
      rect(ctx, 413, 534, 3, 36, '#a7925f');
      rect(ctx, 546, 533, 3, 37, '#a7925f');
      for (let x = 415; x < 548; x += 15) rect(ctx, x, 529 + ((x / 15 | 0) % 2) * 3, 13, 4, '#998454');
      sign(ctx, '锈 风 集 市', 482, 560, 112, '#ddc28e');

      // The water tank, complete with ladder, spigot, and patched pipes.
      shadow(ctx, 76, 171, 66, 16);
      rect(ctx, 49, 109, 43, 52, '#607e6f');
      rect(ctx, 53, 103, 35, 7, '#8b9c80');
      rect(ctx, 53, 159, 35, 5, '#4f6c5f');
      rect(ctx, 54, 111, 7, 44, '#8aa48a');
      rect(ctx, 49, 118, 43, 4, '#adb394');
      rect(ctx, 49, 146, 43, 4, '#a6af8c');
      rect(ctx, 59, 128, 15, 12, '#c0c2a0');
      rect(ctx, 64, 130, 5, 8, '#7e9a85');
      rect(ctx, 51, 164, 5, 12, '#716f4e');
      rect(ctx, 85, 163, 5, 13, '#716f4e');
      rect(ctx, 83, 107, 3, 51, '#c5b691');
      for (let y = 113; y < 156; y += 10) rect(ctx, 80, y, 11, 2, '#c5b691');
      rect(ctx, 91, 145, 9, 5, '#737a5e');
      rect(ctx, 96, 148, 4, 15, '#737a5e');
      rect(ctx, 93, 161, 10, 3, '#737a5e');
      rect(ctx, 98, 169, 12, 4, '#91a68a');
      rug(ctx, 97, 214, 137, 25, '#ac9270');
      stall(ctx, 100, 150, 135, '#708c79', '#c1c3a0', 'water');
      sign(ctx, '水 婆 · 净水', 167, 132, 94, '#e6d3a3');
      barrel(ctx, 102, 224, '#829980', .8);
      barrel(ctx, 214, 218, '#799182', .8);
      crate(ctx, 245, 185, 22);
      crate(ctx, 248, 209, 25);

      rug(ctx, 281, 214, 127, 23, '#b99b70');
      stall(ctx, 277, 150, 135, '#aa7753', '#d3b884', 'mechanic');
      sign(ctx, '老 莫 · 修理铺', 344, 132, 109, '#e3c999');
      crate(ctx, 286, 223, 20, '#8c8e6b');
      rect(ctx, 390, 217, 24, 4, '#79754e');
      rect(ctx, 392, 219, 4, 17, '#7b714d');
      rect(ctx, 410, 219, 4, 17, '#7b714d');
      rect(ctx, 394, 212, 16, 5, '#a7956a');
      barrel(ctx, 260, 138, '#989d77', .7);

      rug(ctx, 652, 214, 140, 23, '#a19d73');
      stall(ctx, 650, 150, 145, '#b88d4d', '#ddbf82', 'cable');
      sign(ctx, '阿 锈 · 旧物交换', 723, 132, 120, '#dfc89b');
      crate(ctx, 803, 181, 29);
      crate(ctx, 809, 158, 23, '#8c8c68');
      barrel(ctx, 626, 202, '#959b73', .85);
      // Tires and old machinery sit in the far east, away from the crossing.
      rect(ctx, 866, 179, 39, 14, '#7e7f63');
      rect(ctx, 860, 188, 48, 31, '#97906a');
      rect(ctx, 868, 192, 11, 14, '#b2a074');
      rect(ctx, 886, 190, 14, 18, '#666e55');
      rect(ctx, 865, 216, 13, 10, '#60684f');
      rect(ctx, 891, 216, 13, 10, '#60684f');
      rect(ctx, 867, 219, 8, 4, '#b6aa7d');
      rect(ctx, 894, 219, 7, 4, '#b6aa7d');

      // The child's home is a patched sailcloth tent rather than another stall.
      shadow(ctx, 748, 411, 158, 33);
      poly(ctx, [[677, 408], [691, 381], [705, 357], [726, 332], [747, 332], [772, 358], [800, 385], [818, 409]], '#9a916c');
      poly(ctx, [[682, 405], [702, 366], [726, 337], [741, 337], [760, 363], [787, 405]], '#d5bc84');
      poly(ctx, [[742, 338], [767, 357], [799, 388], [811, 405], [789, 405]], '#b29b70');
      rect(ctx, 704, 379, 6, 30, '#d9c18c');
      poly(ctx, [[711, 407], [722, 375], [731, 360], [744, 379], [752, 407]], '#6e7051');
      poly(ctx, [[716, 405], [727, 373], [731, 369], [737, 405]], '#848362');
      rect(ctx, 752, 359, 16, 12, '#9b9d75');
      rect(ctx, 757, 357, 2, 16, '#c9ba8a');
      rect(ctx, 750, 364, 20, 2, '#c9ba8a');
      rect(ctx, 675, 407, 146, 4, '#8a7b54');
      rect(ctx, 672, 405, 3, 12, '#84724c');
      rect(ctx, 824, 405, 3, 12, '#84724c');
      rug(ctx, 710, 416, 71, 24, '#b28e65');
      crate(ctx, 800, 420, 24);
      barrel(ctx, 670, 422, '#9a9a70', .7);
      rect(ctx, 783, 438, 12, 4, '#7f8161');
      rect(ctx, 785, 435, 8, 4, '#aba37d');

      // Satellite architecture, old cables, and the crossing's stone plinth.
      rect(ctx, 411, 120, 140, 14, '#b19b6e');
      rect(ctx, 418, 113, 126, 15, '#c7b381');
      rect(ctx, 426, 105, 109, 15, '#d3c18f');
      rect(ctx, 432, 74, 12, 43, '#6a7456');
      rect(ctx, 519, 74, 12, 43, '#6a7456');
      rect(ctx, 436, 78, 4, 35, '#a5ae7a');
      rect(ctx, 522, 77, 4, 34, '#a5ae7a');
      rect(ctx, 440, 66, 85, 10, '#6a7456');
      rect(ctx, 448, 59, 68, 10, '#87916a');
      rect(ctx, 455, 55, 54, 7, '#a2a67b');
      rect(ctx, 443, 74, 77, 31, '#87906c');
      rect(ctx, 449, 78, 64, 25, '#a6ac81');
      rect(ctx, 454, 83, 52, 16, '#657b5d');
      for (let i = 0; i < 6; i++) rect(ctx, 458 + i * 8, 91 - (i % 3) * 3, 4, 3 + (i % 3) * 3, '#a8bc86');
      rect(ctx, 471, 102, 20, 6, '#686d50');
      rect(ctx, 460, 110, 42, 8, '#8b8e67');
      rect(ctx, 467, 109, 5, 3, '#bdad79');
      rect(ctx, 482, 109, 5, 3, '#bf9867');
      rect(ctx, 496, 108, 3, 4, '#c4bd89');
      rect(ctx, 537, 66, 4, 52, '#8b8b62');
      rect(ctx, 535, 59, 8, 8, '#a4a97b');
      rect(ctx, 539, 31, 2, 30, '#727c5c');
      rect(ctx, 525, 39, 30, 2, '#76825e');
      rect(ctx, 530, 47, 20, 2, '#76825e');
      rect(ctx, 536, 28, 7, 4, '#a17f52');
      sign(ctx, '穿 界 电 台', 481, 40, 104, '#dcca9d');
      rect(ctx, 385, 87, 18, 26, '#747e5f');
      rect(ctx, 388, 90, 12, 17, '#99a080');
      rect(ctx, 390, 93, 8, 9, '#566d57');
      rect(ctx, 389, 108, 3, 2, '#c4b785');
      rect(ctx, 396, 108, 3, 2, '#c4b785');
      for (let x = 401; x < 431; x += 4) rect(ctx, x, 112 + (x % 3), 6, 2, '#7c7b53');
      barrel(ctx, 561, 100, '#839174', .8);

      // The bounty board is a landmark in the central market square.
      shadow(ctx, 483, 303, 66, 12);
      rect(ctx, 453, 250, 5, 56, '#766c48');
      rect(ctx, 509, 250, 5, 56, '#766c48');
      rect(ctx, 449, 247, 69, 40, '#766c48');
      rect(ctx, 452, 250, 63, 33, '#9c8d60');
      rect(ctx, 448, 245, 71, 5, '#b5a075');
      rect(ctx, 456, 255, 19, 20, '#e2cca1');
      rect(ctx, 479, 254, 14, 17, '#c8b48e');
      rect(ctx, 495, 257, 14, 21, '#ddd2aa');
      rect(ctx, 459, 259, 12, 2, '#a5906b');
      rect(ctx, 459, 264, 10, 2, '#a5906b');
      rect(ctx, 459, 269, 7, 2, '#a5906b');
      rect(ctx, 482, 258, 7, 2, '#94866b');
      rect(ctx, 498, 262, 8, 2, '#a5906b');
      rect(ctx, 499, 267, 5, 5, '#b58a61');
      rect(ctx, 461, 253, 2, 2, '#b17e55');
      rect(ctx, 500, 255, 2, 2, '#b17e55');

      // A fire ring, stools, cups, and a tarpaulin cart make the lower half lived-in.
      rug(ctx, 228, 434, 103, 48, '#a99168');
      const stones = [[-17, -4], [-8, -12], [5, -12], [16, -5], [17, 5], [6, 12], [-7, 12], [-18, 5]];
      stones.forEach(p => { rect(ctx, 278 + p[0], 430 + p[1], 9, 6, '#8e8d67'); rect(ctx, 279 + p[0], 430 + p[1], 6, 2, '#b3a67a'); });
      rect(ctx, 268, 430, 26, 5, '#6d6546');
      rect(ctx, 273, 424, 5, 17, '#8c714b');
      rect(ctx, 286, 425, 5, 15, '#886c48');
      rect(ctx, 237, 417, 14, 13, '#8a7c52');
      rect(ctx, 235, 415, 18, 6, '#b19a6c');
      rect(ctx, 309, 449, 15, 12, '#8a7c52');
      rect(ctx, 307, 447, 19, 5, '#b19a6c');
      rect(ctx, 241, 463, 12, 5, '#8d7b55');
      rect(ctx, 244, 459, 6, 4, '#c2af7f');
      rect(ctx, 312, 419, 8, 6, '#bba67a');
      rect(ctx, 314, 417, 4, 3, '#d3c393');
      shadow(ctx, 80, 466, 90, 23);
      rect(ctx, 47, 431, 74, 27, '#8d835c');
      rect(ctx, 51, 434, 65, 19, '#b29d6c');
      rect(ctx, 48, 432, 4, 25, '#d0b480');
      rect(ctx, 115, 432, 4, 25, '#c8b07a');
      rect(ctx, 55, 437, 55, 2, '#928456');
      rect(ctx, 55, 446, 55, 2, '#928456');
      rect(ctx, 59, 424, 49, 9, '#91a081');
      rect(ctx, 64, 420, 38, 6, '#9caa88');
      rect(ctx, 71, 420, 4, 14, '#d0c49b');
      rect(ctx, 96, 420, 4, 14, '#d0c49b');
      rect(ctx, 42, 454, 14, 18, '#656c51');
      rect(ctx, 45, 458, 8, 9, '#b9a77c');
      rect(ctx, 107, 454, 14, 18, '#656c51');
      rect(ctx, 110, 458, 8, 9, '#b9a77c');
      rect(ctx, 121, 444, 29, 4, '#8b7a51');
      rect(ctx, 145, 444, 4, 12, '#8b7a51');
      crate(ctx, 60, 491, 29);
      crate(ctx, 92, 501, 22, '#919674');
      crate(ctx, 58, 472, 20);

      // String lights across the crossing, in deliberately stepped runs.
      for (let i = 0; i < 88; i++) {
        const x = 198 + i * 6;
        const y = 107 + Math.round((1 - Math.pow((i - 44) / 44, 2)) * 18 / 2) * 2;
        rect(ctx, x, y, 7, 2, '#6b72514d');
        if (i % 8 === 0) {
          rect(ctx, x + 2, y + 2, 2, 7, '#797958');
          rect(ctx, x, y + 7, 6, 6, '#ddc58b');
          rect(ctx, x + 2, y + 8, 2, 4, '#f0dda5');
        }
      }
      // Scatter is kept to the margins, leaving every documented interaction reachable.
      [[55, 256, 1], [890, 291, 1.2], [600, 181, .75], [64, 348, .8], [893, 475, 1.15], [220, 518, .8], [601, 516, .65], [391, 488, .55]].forEach(a => cactus(ctx, ...a));
      [[57, 294, 1], [857, 336, .8], [389, 90, .7], [624, 331, .6], [40, 523, .6], [864, 525, 1], [205, 363, .7], [604, 480, .65], [205, 112, .6]].forEach(a => rock(ctx, ...a));
      [[82, 315], [210, 328], [56, 394], [228, 389], [618, 380], [887, 390], [900, 427], [327, 513], [641, 501], [380, 459], [843, 115], [592, 268], [122, 509], [36, 212], [607, 134], [615, 446], [839, 444]].forEach(a => grass(ctx, ...a));
      // Footprints add scale and subtle life to the bare sand.
      for (let i = 0; i < 13; i++) {
        const x = 463 + Math.sin(i * .7) * 7;
        const y = 364 + i * 9;
        rect(ctx, x, y, 3, 4, '#9c8d6030');
        rect(ctx, x + 9, y + 5, 3, 4, '#9c8d6030');
      }
      // A small pack animal waits beside the west wall.
      shadow(ctx, 83, 292, 38, 10);
      rect(ctx, 70, 271, 26, 16, '#b1996f');
      rect(ctx, 66, 267, 12, 14, '#b1996f');
      rect(ctx, 66, 261, 3, 8, '#ae926b');
      rect(ctx, 74, 260, 3, 9, '#ae926b');
      rect(ctx, 64, 273, 5, 5, '#d1bd8a');
      rect(ctx, 69, 270, 2, 2, '#63654a');
      rect(ctx, 73, 285, 4, 9, '#827756');
      rect(ctx, 90, 285, 4, 9, '#827756');
      rect(ctx, 79, 269, 13, 11, '#839070');
      rect(ctx, 83, 267, 3, 16, '#d1c091');
      rect(ctx, 96, 271, 4, 13, '#9b845e');
      // A reclaimed road sign on the right tells the oldest joke in the market.
      rect(ctx, 872, 92, 4, 39, '#8e8057');
      rect(ctx, 839, 96, 73, 19, '#bdb187');
      rect(ctx, 842, 98, 67, 15, '#d2c193');
      pixelText(ctx, '明天再来 →', 876, 106, '#8a805e', 10);
    }

    label(ctx, node, nearest, depleted) {
      const names = {
        water: '水婆 · 净水', oscillator: '老莫 · 振荡器', cable: '阿锈 · 电缆',
        battery: '小满 · 蓄电池', board: '悬赏榜', radio: '穿界电台', camp: '篝火'
      };
      let label = names[node.id] || node.name || '废料堆';
      if (node.id.indexOf('salvage') === 0) label = depleted ? '已拾取' : '拾荒';
      const small = node.id.indexOf('salvage') === 0 || node.id === 'camp';
      ctx.font = \`\${small ? 10 : 11}px "Microsoft YaHei", sans-serif\`;
      const width = Math.ceil(ctx.measureText(label).width) + (small ? 12 : 18);
      const y = node.y + (node.id === 'camp' ? 21 : 24);
      const color = nearest ? '#f7efd5' : small ? '#e6d6adcf' : '#f1e3bfdf';
      if (depleted && !nearest) return;
      rect(ctx, node.x - width / 2 + 2, y - 7, width, small ? 17 : 20, '#7467471c');
      rect(ctx, node.x - width / 2, y - 9, width, small ? 17 : 20, color);
      if (nearest) {
        rect(ctx, node.x - width / 2, y - 9, width, 1, '#8e9c6d');
        rect(ctx, node.x - width / 2, y + (small ? 7 : 10), width, 1, '#8e9c6d');
      }
      pixelText(ctx, label, node.x, y + (small ? -1 : 1), nearest ? '#4e6541' : '#767654', small ? 10 : 11);
    }

    render(state, nowMs, target, nearestId) {
      const ctx = this.ctx;
      const now = Number.isFinite(nowMs) ? nowMs : 0;
      const player = state.player || { x: 480, y: 500, dir: 'down', moving: false };
      ctx.clearRect(0, 0, 960, 600);
      ctx.drawImage(this.background, 0, 0);
      const time = now / 1000;
      const salvaged = Array.isArray(state.salvaged) ? state.salvaged : [];
      // Interactive scrap has its own sprite so that depletion is immediately visible.
      this.nodes.filter(n => n.id.indexOf('salvage') === 0).forEach(n => {
        const depleted = salvaged.indexOf(n.id) !== -1;
        salvage(ctx, n.x, n.y, depleted);
        if (!depleted) {
          const d = Math.sin(time * 2.3 + n.x) > -.25;
          const sparkleY = n.y - 23 - Math.round(Math.sin(time * 2 + n.x) * 2);
          if (d) {
            rect(ctx, n.x + 17, sparkleY, 2, 8, '#f5e3af');
            rect(ctx, n.x + 14, sparkleY + 3, 8, 2, '#f5e3af');
            rect(ctx, n.x - 18, n.y - 17, 2, 2, '#e9dca8');
          }
        }
      });

      // Embers are tiny hard-edged clusters, keeping the canvas consistently pixel based.
      const fire = Math.floor(time * 6) % 3;
      rect(ctx, 274, 416 - fire * 2, 10, 18 + fire * 2, '#bb8050');
      rect(ctx, 282, 412 + fire * 2, 8, 20 - fire * 2, '#c58d50');
      rect(ctx, 277, 420 - fire * 2, 7, 13 + fire * 2, '#e5b76b');
      rect(ctx, 281, 424, 4, 9, '#f1d293');
      for (let i = 0; i < 4; i++) {
        const p = (time * 12 + i * 12) % 43;
        rect(ctx, 281 + Math.round(Math.sin(p / 7 + i) * 8 / 2) * 2, 414 - p, 2, 3, i % 2 ? '#c3bb9444' : '#bfaf8455');
      }

      const people = this.nodes.filter(n => ['water', 'oscillator', 'cable', 'battery'].indexOf(n.id) !== -1).map(n => ({ x: n.x, y: n.y, kind: n.id, dir: 'down', stride: 0 }));
      people.push({ x: player.x, y: player.y, kind: 'player', dir: player.dir, stride: player.moving ? Math.sin(time * 14) > 0 ? 3 : -3 : 0 });
      people.push({ x: 596 + Math.round(Math.sin(time * .22) * 8), y: 286, kind: 'visitor', dir: 'left', stride: 0 });
      people.push({ x: 207, y: 393, kind: 'visitor', dir: 'right', stride: 0 });
      people.sort((a, b) => a.y - b.y).forEach(p => person(ctx, p.x, p.y, p.kind, p.dir, p.stride));

      // A pale triangle makes the player's identity clear without a modern outline.
      const markerY = Math.round(player.y - 59 + Math.sin(time * 2) * 2);
      rect(ctx, player.x - 5, markerY, 10, 2, '#ede4b8');
      rect(ctx, player.x - 3, markerY + 2, 6, 2, '#ede4b8');
      rect(ctx, player.x - 1, markerY + 4, 2, 2, '#ede4b8');
      if (target && Number.isFinite(target.x) && Number.isFinite(target.y)) {
        const x = Math.round(target.x), y = Math.round(target.y);
        const s = 8 + (Math.sin(time * 5) > 0 ? 2 : 0);
        rect(ctx, x - s, y - s, 6, 2, '#f1e8c7');
        rect(ctx, x - s, y - s, 2, 6, '#f1e8c7');
        rect(ctx, x + s - 5, y - s, 6, 2, '#f1e8c7');
        rect(ctx, x + s, y - s, 2, 6, '#f1e8c7');
        rect(ctx, x - s, y + s, 6, 2, '#f1e8c7');
        rect(ctx, x - s, y + s - 4, 2, 6, '#f1e8c7');
        rect(ctx, x + s - 5, y + s, 7, 2, '#f1e8c7');
        rect(ctx, x + s, y + s - 4, 2, 6, '#f1e8c7');
      }

      if (state.repaired) {
        // The working radio is a visual payoff that remains readable behind the ending.
        rect(ctx, 454, 83, 52, 16, '#5d805f');
        const p = Math.floor(time * 6) % 6;
        for (let i = 0; i < 6; i++) rect(ctx, 458 + i * 8, 88 - (i + p) % 3, 4, 7 + (i + p) % 3, '#bacc8d');
        for (let i = 0; i < 3; i++) {
          const r = 12 + ((time * 14 + i * 13) % 38);
          const a = Math.max(0, .55 - (r - 12) / 85);
          ctx.strokeStyle = \`rgba(223,231,166,\${a})\`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(540, 34, r, -.7, .7);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(540, 34, r, Math.PI - .7, Math.PI + .7);
          ctx.stroke();
        }
      } else {
        rect(ctx, 496, 108, 3, 4, Math.sin(time * 2) > 0 ? '#d8aa6c' : '#a09262');
      }

      // Labels render after characters, preventing a merchant from hiding their own name.
      this.nodes.forEach(n => this.label(ctx, n, n.id === nearestId, salvaged.indexOf(n.id) !== -1));
      if (nearestId) {
        const node = this.nodes.find(n => n.id === nearestId);
        if (node) {
          const y = node.y - (['water', 'cable', 'oscillator', 'battery'].indexOf(node.id) !== -1 ? 58 : 39);
          rect(ctx, node.x - 7, y, 14, 12, '#f4e8c5');
          pixelText(ctx, '· · ·', node.x + 1, y + 4, '#8b9367', 10);
          rect(ctx, node.x - 2, y + 11, 4, 3, '#f4e8c5');
        }
      }

      // Sparse drifting sand and an occasional bird make the still world feel alive.
      for (let i = 0; i < 24; i++) {
        const x = (i * 173 + time * (9 + i % 3) + Math.sin(i) * 60) % 1000 - 20;
        const y = 90 + (i * 97 % 475) + Math.sin(time * .5 + i) * 2;
        rect(ctx, x, y, i % 3 === 0 ? 6 : 3, 1, '#f4e5b955');
      }
      const birdX = (time * 12 + 219) % 1100 - 60;
      if (birdX > 0 && birdX < 960) {
        const birdY = 15 + Math.sin(time * .3) * 5;
        rect(ctx, birdX, birdY, 3, 2, '#8e977039');
        rect(ctx, birdX - 4, birdY - (Math.sin(time * 4) > 0 ? 2 : 0), 4, 1, '#8e977039');
        rect(ctx, birdX + 3, birdY - (Math.sin(time * 4) > 0 ? 2 : 0), 4, 1, '#8e977039');
      }
      if ((state.elapsed || 0) > 300) {
        const intensity = Math.min(.14, ((state.elapsed || 0) - 300) / 1800);
        rect(ctx, 0, 0, 960, 600, \`rgba(171,133,70,\${intensity})\`);
        for (let i = 0; i < 32; i++) {
          rect(ctx, (time * (42 + i % 4 * 11) + i * 119) % 1010 - 50, (i * 53 + time * 2) % 600, 14 + i % 7, 2, '#e3c28637');
        }
      }
    }
  }

  global.MarketRenderer = MarketRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
<\/script><script>/* 正式比赛只需根据接线表填写下列配置；世界签编号 05 不是本线关序。 */
var CONFIG = {
  level: 1,
  world: '废土集市',
  prevWorld: '主神大厅',
  nextWorld: '幽冥戏班',
  nextUrl: '../ghost-opera/index.html',
  passViaUrl: true
};

(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = WL.escapeHtml;
  var canvas = $('game-canvas');
  var model = MarketModel;
  var renderer = new MarketRenderer(canvas, model.nodes, model.solids);
  var entry = WL.readSave(CONFIG.level);
  var fingerprint = WL.encodeCode(entry);
  var sessionKey = 'wasteland_market_session_v1';
  var state, save, logs = [], echo = '', finished = false, paused = false;
  var keys = {}, path = [], target = null, pendingNode = null, near = null;
  var lastTime = 0, saveTimer = 0, toastTimer = 0, currentEntity = null;
  var audioContext = null, soundOn = false, lastFootstep = 0;

  function freshState() {
    save = WL.normalize(JSON.parse(JSON.stringify(entry)), CONFIG.level);
    var tool = WL.consumeAny(save.items, 'tool');
    state = model.create(save, !!tool);
    echo = tool
      ? '你用从「' + (entry.prev_world || '上一个世界') + '」带来的「' + tool.name + '」帮守门人修好了推车。他送你 3 份废料作为谢礼。'
      : '没有工具也没关系。守门人递来一根撬棍和一小袋废料：「去找摊主聊聊，锈风从不拒绝空手的旅人。」';
    if (entry.player.hp === 0) echo += ' 水婆先替你包扎了伤口，你以 1 点生命重新站起。';
    logs = [{ time: '09:00', text: tool ? '旧世界的工具，换来了集市的第一份善意。' : '抵达锈风集市。先去看看中央的悬赏榜吧。' }];
  }

  function initialize() {
    freshState();
    try {
      var stored = JSON.parse(localStorage.getItem(sessionKey) || 'null');
      if (stored && stored.v === 1 && stored.fingerprint === fingerprint && stored.state && stored.state.player && stored.state.resources && stored.state.parts && Array.isArray(stored.state.salvaged) && Array.isArray(stored.logs) && !stored.finished) {
        state = stored.state;
        state.player.moving = false;
        save = WL.normalize(stored.relay, CONFIG.level);
        logs = stored.logs;
        echo = stored.echo || echo;
      }
    } catch (e) { /* 浏览器禁用存储或旧快照损坏时，仍可从上家入口游玩。 */ }
    $('opening-strip').innerHTML = WL.renderOpening(entry);
    $('echo-log').textContent = echo;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\\n\\n' : '') + echo;
    $('intro-note').hidden = state.started;
    WL.mountDebug(save);
    $('debug-reset').onclick = confirmRestart;
    renderUI();
    if (state.dead) showGameOver();
    else if (state.repaired) showEnding();
  }

  function clockText() {
    var minutes = 9 * 60 + Math.floor(state.elapsed / 3);
    return String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
  }

  function persist() {
    if (finished) return;
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    try {
      localStorage.setItem(sessionKey, JSON.stringify({ v: 1, fingerprint: fingerprint, state: state, relay: save, logs: logs, echo: echo, finished: false }));
      $('save-status').innerHTML = '<i></i> 旅程自动保存';
    } catch (e) {
      $('save-status').textContent = '此浏览器未开放本地存储';
    }
  }

  function addLog(text) {
    logs.unshift({ time: clockText(), text: text });
    logs = logs.slice(0, 18);
    renderUI();
  }

  function toast(text) {
    $('toast').textContent = text;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { $('toast').hidden = true; }, 3400);
  }

  function renderUI() {
    $('water-count').textContent = state.resources.water;
    $('scrap-count').textContent = state.resources.scrap;
    $('trust-count').textContent = state.resources.trust;
    $('hp').textContent = '♥ '.repeat(Math.min(8, state.hp)) + '♡ '.repeat(Math.max(0, 3 - state.hp));
    $('hp').setAttribute('aria-label', '生命 ' + state.hp);
    $('sanity').textContent = '理智 ' + state.sanity;
    $('clock').textContent = clockText();
    $('weather-text').textContent = state.flags.storm ? '扬沙 · 注意饮水' : '晴 · 东南风';
    var parts = [
      { id: 'oscillator', name: '寻回振荡器', icon: '▥', hint: '老莫 · 西北修理摊' },
      { id: 'cable', name: '换取铜线组', icon: '≋', hint: '阿锈 · 东北零件摊' },
      { id: 'battery', name: '找到蓄电池', icon: '▣', hint: '小满 · 东南帐篷' }
    ];
    var count = parts.filter(function (p) { return state.parts[p.id]; }).length;
    $('mission-progress').style.width = count / 3 * 100 + '%';
    $('objectives').innerHTML = parts.map(function (p) {
      return '<div class="objective ' + (state.parts[p.id] ? 'complete' : '') + '" title="' + p.hint + '"><span class="check">' + (state.parts[p.id] ? '✓' : '') + '</span><span>' + p.name + '</span><span class="objective-count">' + (state.parts[p.id] ? '1' : '0') + '/1</span></div>';
    }).join('');
    var bag = parts.filter(function (p) { return state.parts[p.id]; }).map(function (p) { return { name: p.name.slice(2), icon: p.icon }; });
    if (state.coil) bag.push({ name: '旧线圈 · 可与老莫交换', icon: '◎' });
    if (state.relic) bag.push({ name: '机械蜥蜴 · 废土纪念物', icon: '⌁' });
    save.items.forEach(function (item) { if (bag.length < 6) bag.push({ name: item.name + ' · 来自上一个世界', icon: '◇' }); });
    $('bag-count').textContent = bag.length + ' / 6';
    $('bag-grid').innerHTML = Array.from({ length: 6 }, function (_, i) {
      var item = bag[i];
      return '<div class="bag-slot ' + (item ? 'filled' : '') + '" title="' + esc(item ? item.name : '空位') + '" aria-label="' + esc(item ? item.name : '空位') + '">' + (item ? item.icon : '·') + (item ? '<span>1</span>' : '') + '</div>';
    }).join('');
    $('bag-caption').textContent = count === 3 ? '零件齐了。去北面的电台试试吧。' : state.coil ? '旧线圈，也许有人用得上。' : '轻装上路，也是一种勇气。';
    $('activity-log').innerHTML = logs.slice(0, 3).map(function (l) { return '<div class="log-entry"><time>' + esc(l.time) + '</time><span>' + esc(l.text) + '</span></div>'; }).join('');
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    $('card-preview').innerHTML = WL.renderSaveCard(save, CONFIG.level, CONFIG.world);
    $('debug-json').textContent = WL.debug.json(save);
  }

  function closeDialog() {
    $('game-dialog').close();
    currentEntity = null;
    keys = {};
    canvas.focus({ preventScroll: true });
  }

  function openDialog(kicker, title, body, choices) {
    path = []; target = null; pendingNode = null; keys = {};
    state.player.moving = false;
    $('dialog-kicker').textContent = kicker;
    $('dialog-body').innerHTML = '<h2 id="dialog-title">' + esc(title) + '</h2>' + body;
    $('dialog-actions').innerHTML = '';
    (choices || []).forEach(function (choice) {
      var button = document.createElement('button');
      button.className = 'action-button' + (choice.featured ? ' featured' : '');
      button.innerHTML = '<span>' + esc(choice.label) + '</span>' + (choice.hint ? '<small>' + esc(choice.hint) + '</small>' : '');
      button.disabled = !!choice.disabled;
      if (choice.id) button.dataset.action = choice.id;
      button.onclick = choice.onClick || function () {
        var entity = currentEntity;
        var result = doAction(choice.id);
        if (!result.ok) return;
        if (state.dead) return;
        if (state.repaired) { showEnding(); return; }
        if (entity) openEntity(entity);
      };
      $('dialog-actions').appendChild(button);
    });
    if (!$('game-dialog').open) $('game-dialog').showModal();
  }

  function doAction(id) {
    if (finished) return { ok: false };
    var result = model.action(state, id);
    if (result.ok) {
      addLog(result.message);
      tone(id.indexOf('salvage') === 0 ? 'loot' : 'trade');
      if (id === 'bounty') WL.addClue(save, '悬赏榜背面刻着一组穿界频率：07-24-6。');
      if (id === 'oscillator_coil') WL.addClue(save, '老莫说：穿界频率 07-24-6，只有信任能让它稳定。');
    }
    toast(result.message || '这笔交换暂时做不了。');
    renderUI(); persist();
    if (state.dead) showGameOver();
    return result;
  }

  function openEntity(id) {
    var node = model.nodes.find(function (n) { return n.id === id; });
    if (!node || !state.started || state.dead || finished) return;
    if (node.kind === 'salvage') { doAction(id); return; }
    currentEntity = id;
    var r = state.resources;
    if (id === 'water') {
      openDialog('水婆 / 净水摊', '在这里，水比承诺更珍贵。', '<p class="character-quote">「喝一口再谈买卖吧，孩子。你要是没东西换，就帮我抽一会儿水。」</p><p>你可以用废料交换净水，也可以花一点时间帮忙抽水。行走和交易都会消耗时间；每 90 秒需要饮用 1 份净水。</p>', [
        { id: 'water_buy', label: '换两份净水', hint: '1 废料 → 2 净水', disabled: r.scrap < 1 },
        { id: 'pump', label: '帮忙抽水', hint: '+1 净水 · 花费 14 秒', featured: !r.water },
        { label: '把水壶收好，继续逛逛', onClick: closeDialog }
      ]);
    } else if (id === 'oscillator') {
      openDialog('老莫 / 旧物修理铺', state.parts.oscillator ? '旧东西，还能有新去处。' : '要让电台发声，先找回心跳。', '<p class="character-quote">「这枚振荡器还管用。拿三份废料来，或者——东边废料堆里的旧线圈，我找它很久了。」</p><p>旧线圈藏在集市东面的废料堆里。帮老莫找回来，他会记住你的这份心意。</p>', state.parts.oscillator ? [
        { label: '多谢了，老莫', onClick: closeDialog }
      ] : [
        { id: 'oscillator_coil', label: '用找回的旧线圈交换', hint: '1 旧线圈 · 声望 +1', disabled: !state.coil, featured: !!state.coil },
        { id: 'oscillator_scrap', label: '用废料交换振荡器', hint: '3 废料', disabled: r.scrap < 3 },
        { label: '我再去找找', onClick: closeDialog }
      ]);
    } else if (id === 'cable') {
      openDialog('阿锈 / 零件摊', state.parts.cable ? '这笔生意，做得不赖。' : '好铜线，要给值得的人。', '<p class="character-quote">「四份废料，不二价。嗯……如果你在集市帮过忙，两份也能谈。两壶水？那也成。」</p><p>完成中央悬赏、帮老莫找回线圈，或为小满送水，都能获得声望。熟人的价格，总会温柔一点。</p>', state.parts.cable ? [
        { label: '收好铜线，告辞', onClick: closeDialog }
      ] : [
        { id: 'cable_fair', label: '谈一笔熟人的买卖', hint: '2 废料 · 需声望 1', disabled: r.trust < 1 || r.scrap < 2, featured: r.trust >= 1 },
        { id: 'cable_full', label: '按原价交换铜线', hint: '4 废料', disabled: r.scrap < 4 },
        { id: 'cable_water', label: '用净水以物易物', hint: '2 净水', disabled: r.water < 2 },
        { label: '先去别处转转', onClick: closeDialog }
      ]);
    } else if (id === 'battery') {
      openDialog('小满 / 南边的帐篷', state.parts.battery ? '希望你能收到，明天的声音。' : '一块电池，两个人的明天。', '<p class="character-quote">「这块蓄电池是爸爸留下的。我们缺水……你能给我们两份净水吗？或者，三份废料也可以。」</p><p>给小满净水，可以得到蓄电池和 2 点声望。废土里的选择，总有买卖之外的分量。</p>', state.parts.battery ? [
        { label: '愿你们的水壶一直满着', onClick: closeDialog }
      ] : [
        { id: 'battery_water', label: '把两份净水递给小满', hint: '2 净水 · 声望 +2', disabled: r.water < 2, featured: r.water >= 2 },
        { id: 'battery_scrap', label: '用废料交换蓄电池', hint: '3 废料', disabled: r.scrap < 3 },
        { label: '等我一会儿', onClick: closeDialog }
      ]);
    } else if (id === 'board') {
      openDialog('悬赏榜 / 集市公告', '有些委托，值得多走几步。', '<span class="dialog-chip">公开悬赏</span><span class="dialog-chip">水是共同的财富</span><p class="character-quote">「净水泵缺少修补材料。交来三份废料，换四份净水；集市会记住帮忙的人。」</p><p>主线线索：老莫有振荡器，阿锈有铜线组，小满有蓄电池。凑齐三件后，去北面的穿界电台。</p><p class="dialog-small">公告背面有人刻着：07-24-6。旁边写了一句——别忘了留下一个信号。</p>', [
        { id: 'bounty', label: state.flags.bounty ? '净水泵已修好，悬赏已领取' : '完成净水泵悬赏', hint: '3 废料 → 4 净水 · 声望 +1', disabled: !!state.flags.bounty || r.scrap < 3, featured: !state.flags.bounty && r.scrap >= 3 },
        { label: '记下线索，继续探索', onClick: closeDialog }
      ]);
      if (!state.flags.readBoard) {
        state.flags.readBoard = true;
        WL.addClue(save, '悬赏榜背面刻着一组穿界频率：07-24-6。');
        addLog('看过悬赏榜：三名摊主，各有一件电台零件。'); persist();
      }
    } else if (id === 'camp') {
      openDialog('营火 / 短暂歇脚', '风在走，你可以歇一会儿。', '<p class="character-quote">「人只要还有一口水，就总能再往前走一点。」</p><p>喝一份净水，恢复 1 点生命。停在对话中时，时间暂停。</p>', [
        { id: 'rest', label: '在营火边喝水休息', hint: '1 净水 → 1 生命', disabled: r.water < 1 || state.hp >= Math.max(3, entry.player.hp), featured: state.hp < 3 && r.water > 0 },
        { label: '拍拍尘土，继续上路', onClick: closeDialog }
      ]);
    } else if (id === 'radio') {
      if (state.repaired) { showEnding(); return; }
      var ready = state.parts.cable && state.parts.battery && state.parts.oscillator;
      openDialog('穿界电台 / 北方旧站', ready ? '零件齐了。试着呼叫明天吧。' : '沉默的电台，等一个声音。', '<p class="character-quote">「……这里是……锈风……有……人……吗？」</p><p>电台还缺少振荡器、铜线组和蓄电池。把三件零件装回去，就能接通离开废土的世界线。</p><p class="dialog-small">下一世界：' + esc(CONFIG.nextWorld) + (CONFIG.nextWorld === '待接线世界' ? '（演示接入虚拟下家，正式比赛按接线表配置）' : '') + '</p>', [
        { id: 'repair', label: ready ? '装好零件，接通电台' : '还需要集齐三件零件', hint: ready ? '开启结局' : '收集进度见旅人日志', disabled: !ready, featured: ready },
        { label: '再去集市看看', onClick: closeDialog }
      ]);
    }
    currentEntity = id;
  }

  function showEnding() {
    currentEntity = null;
    if (!state.ending) {
      tone('win');
      openDialog('信号已接通 / A LITTLE HOPE', '原来，明天也可以交换。', '<p>电台里的杂音渐渐退去。集市的灯一盏盏亮起来，你听见了另一端的风声。</p><p class="character-quote">「旅人，能不能给后来的人，也留下一个信号？」</p><p>离开之前，你还可以选择给集市留下一份净水。</p>', [
        { label: '留一份净水，再向明天出发', hint: '净水 −1 · 余温结局', disabled: state.resources.water < 1, featured: true, onClick: function () { if (doAction('ending_kindness').ok) showEnding(); } },
        { label: '带着集市的信号继续上路', hint: '远行结局', onClick: function () { if (doAction('ending_leave').ok) showEnding(); } }
      ]);
      return;
    }
    var kind = state.ending === 'kindness';
    openDialog('旅程完成 / ' + (kind ? 'THE EMBER PACT' : 'THE NEXT FREQUENCY'), kind ? '你留下的水，长成了明天。' : '带着一缕信号，继续远行。', '<p>' + (kind ? '水婆把一枚刻着火种的铜牌放进你掌心。小满朝你挥手，集市的电台第一次播出了清晰的声音。' : '阿锈把一枚集市通行牌递给你。风穿过布棚，电台替你记住了这条来时的路。') + '</p><div class="result-stats"><div><b>' + state.resources.trust + '</b><span>收获声望</span></div><div><b>' + state.salvaged.length + '/6</b><span>探索废墟</span></div><div><b>' + Math.floor(state.elapsed / 60) + ':' + String(Math.floor(state.elapsed % 60)).padStart(2, '0') + '</b><span>旅途用时</span></div></div><p>随身带走：集市通行牌、信号提灯' + (state.resources.water > 0 ? '和封好的净水' : '') + '。你的道具和线索会通过主办方的接力存档，真实流入下一关。</p>', [
      { label: '保存旅程，进入下一世界', hint: '接力交接 →', featured: true, onClick: finish },
      { label: '再看一眼集市', onClick: closeDialog }
    ]);
    persist();
  }

  function finish() {
    if (finished || !state.repaired || !state.ending) return;
    if (!state.flags.rewards) {
      WL.addItem(save, { id: 'rustwind_pass', name: '锈风集市通行牌', type: 'token' });
      WL.addItem(save, { id: 'frequency_lantern', name: '穿界信号提灯', type: 'light' });
      if (state.resources.water > 0) WL.addItem(save, { id: 'sealed_market_water', name: '封好的废土净水', type: 'food' });
      WL.addClue(save, CONFIG.nextWorld === '幽冥戏班' ? '电台戏腔唱着：空位留客，脸谱归真，落幕莫回头。信号提灯靠近朱门时泛起青光。' : '穿界电台的稳定频率是 07-24-6；信号提灯能引出同一频率的门。');
      WL.addClue(save, state.ending === 'kindness' ? '锈风集市相信：给后来者留下水的人，能被火种铜牌认出。' : '通行牌背面写着：遇见陌生的门，先听一听门后的电台声。');
      state.flags.rewards = true;
    }
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    var hook = CONFIG.nextWorld === '幽冥戏班'
      ? '电台忽然传出一段戏腔，三声锣响压过集市的风。信号提灯泛起青光，照出一道朱门。你推门而入，红灯笼下坐满了没有影子的看客——幽冥戏班，今夜等你替班。'
      : '电台锁定了「' + CONFIG.nextWorld + '」的频率。信号提灯照出一道门，你推开门，集市的风声在身后消失——另一段世界正等着你。';
    var complete = WL.completeLevel(CONFIG, save, { exitHook: hook, nextUrl: CONFIG.nextUrl, passViaUrl: CONFIG.passViaUrl });
    if (complete) {
      finished = true;
      $('game-dialog').close();
      keys = {}; path = [];
      try { localStorage.removeItem(sessionKey); } catch (e) { /* URL 交接不依赖本地存储。 */ }
    } else {
      toast('出口交接还未配置完整，请打开接力存档查看提示。');
    }
  }

  function showGameOver() {
    openDialog('旅途暂歇 / THE DUST SETTLES', '先把自己，从风里找回来。', '<p>水壶空了，你的脚步也慢了下来。集市的守门人把你带回入口。</p><p>下一次可以先在水婆处补水，或帮忙抽水。每 90 秒需要 1 份净水；对话时不会消耗时间。</p>', [{ label: '从这一关的入口重新出发', featured: true, onClick: restart }]);
  }

  function confirmRestart() {
    openDialog('重走旅程', '回到第一次抵达集市的时候？', '<p>本关的探索和交易将重新开始。上一个世界传来的道具、面板和故事会重新带入。</p>', [
      { label: '重新开始本关', featured: true, onClick: restart },
      { label: '继续眼前的旅程', onClick: closeDialog }
    ]);
  }

  function restart() {
    finished = false; paused = false; path = []; target = null; pendingNode = null; keys = {};
    $('pause-badge').hidden = true;
    $('pause-button').textContent = 'Ⅱ';
    if ($('relay-dialog').open) $('relay-dialog').close();
    closeDialog(); freshState();
    $('intro-note').hidden = false;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\\n\\n' : '') + echo;
    $('echo-log').textContent = echo;
    WL.mountDebug(save); $('debug-reset').onclick = confirmRestart;
    renderUI(); persist();
  }

  function showGuide() {
    openDialog('旅人手册 / FIELD GUIDE', '在废土里，做一点有用的事。', '<div class="help-controls"><span><kbd>W A S D</kbd> 或方向键 · 移动</span><span><kbd>E</kbd> 靠近人物、公告和废料堆后交互</span><span><kbd>SHIFT</kbd> 按住快跑</span><span>鼠标 / 触屏 · 点击人物或物资，自动前往</span><span><kbd>ESC</kbd> 暂停或关闭对话</span></div><p>你的目标是换齐三件零件，修好北面的穿界电台。可以先看中央悬赏榜，再拾荒、换水、与摊主谈条件。</p><p>水既是生存物资，也是交换的筹码。每 90 秒需要 1 份水；缺水会损失生命。物资不足时，可在水婆处帮忙抽水。</p><p class="dialog-small">游戏会自动记录本关进度。上家道具按类型接入；没有对应道具也有完整通关路线。声音默认关闭，可从右上角开启。</p>', [{ label: '记住了，出发', featured: true, onClick: closeDialog }]);
  }

  function showMission() {
    openDialog('当前委托 / THE NEXT FREQUENCY', '给明天一个信号', '<p>① 西北修理铺：老莫保管着振荡器。东边废料堆里的旧线圈能换到它。</p><p>② 东北零件摊：阿锈出售铜线。积攒 1 点声望后，可以把四份废料的价格谈到两份。</p><p>③ 东南帐篷：小满愿意用蓄电池交换净水，也接受废料。</p><p>凑齐三件零件后，到北面的穿界电台接通下一世界。不要忘记，中央悬赏榜和水婆能帮你补给。</p>', [
      { label: '在地图上前往电台', hint: '自动寻路', onClick: function () { closeDialog(); if (state.started) navigateTo(model.nodes.find(function (n) { return n.id === 'radio'; }), 'radio'); else toast('先点击「进入集市」开启旅程。'); } },
      { label: '继续探索', featured: true, onClick: closeDialog }
    ]);
  }

  function showRelay() {
    keys = {}; path = []; target = null; pendingNode = null;
    renderUI();
    $('debug-code').value = WL.debug.code(save);
    if (!$('relay-dialog').open) $('relay-dialog').showModal();
  }

  function blocked(x, y) {
    if (x < 24 || x > 936 || y < 90 || y > 558) return true;
    return model.solids.some(function (s) { return x > s.x - 9 + 0.01 && x < s.x + s.w + 9 - 0.01 && y > s.y - 9 + 0.01 && y < s.y + s.h + 9 - 0.01; });
  }

  // 小地图使用网格寻路；拒绝穿过摊位，也不让斜线切过障碍物的角。
  function findPath(destination) {
    var step = 12, cols = 80, rows = 50;
    var start = { x: Math.round(state.player.x / step), y: Math.round(state.player.y / step) };
    var end = { x: Math.round(destination.x / step), y: Math.round(destination.y / step) };
    function index(p) { return p.y * cols + p.x; }
    function free(x, y) { return x >= 0 && x < cols && y >= 0 && y < rows && !blocked(x * step, y * step); }
    function nearestFree(p) {
      if (free(p.x, p.y)) return p;
      for (var r = 1; r < 16; r++) {
        for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (free(p.x + dx, p.y + dy)) return { x: p.x + dx, y: p.y + dy };
        }
      }
      return null;
    }
    start = nearestFree(start); end = nearestFree(end);
    if (!start || !end) return [];
    var queue = [start], parents = new Int32Array(cols * rows).fill(-1), seen = new Uint8Array(cols * rows);
    seen[index(start)] = 1;
    var found = false;
    var directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (var head = 0; head < queue.length; head++) {
      var p = queue[head];
      if (p.x === end.x && p.y === end.y) { found = true; break; }
      directions.forEach(function (d) {
        var x = p.x + d[0], y = p.y + d[1], i = y * cols + x;
        if (!free(x, y) || seen[i]) return;
        if (d[0] && d[1] && (!free(p.x + d[0], p.y) || !free(p.x, p.y + d[1]))) return;
        seen[i] = 1; parents[i] = index(p); queue.push({ x: x, y: y });
      });
    }
    if (!found) return [];
    var points = [], cursor = index(end), origin = index(start);
    while (cursor !== origin && cursor >= 0) { points.push({ x: cursor % cols * step, y: Math.floor(cursor / cols) * step }); cursor = parents[cursor]; }
    points.reverse();
    return points;
  }

  function navigateTo(destination, nodeId) {
    path = findPath(destination); target = { x: destination.x, y: destination.y }; pendingNode = nodeId || null;
    if (!path.length) {
      target = null;
      if (nodeId && Math.hypot(state.player.x - destination.x, state.player.y - destination.y) < 55) openEntity(nodeId);
      else if (nodeId) toast('那边暂时走不过去，试试另一条路。');
      pendingNode = null;
    }
  }

  function updateMovement(dt) {
    var dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
    var dy = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
    var speed = (keys.shift ? 177 : 113) * (state.flags.storm ? 0.82 : 1);
    if (dx || dy) { path = []; target = null; pendingNode = null; }
    else if (path.length) {
      var next = path[0], distance = Math.hypot(next.x - state.player.x, next.y - state.player.y);
      if (distance <= speed * dt + 1) {
        state.player.x = next.x; state.player.y = next.y; path.shift();
        if (!path.length) {
          target = null;
          var id = pendingNode; pendingNode = null;
          if (id) { openEntity(id); return; }
        }
        return;
      }
      dx = next.x - state.player.x; dy = next.y - state.player.y;
    }
    var length = Math.hypot(dx, dy);
    state.player.moving = length > 0;
    if (!length) return;
    dx /= length; dy /= length;
    state.player.dir = Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up';
    var nx = state.player.x + dx * speed * dt, ny = state.player.y + dy * speed * dt;
    if (!blocked(nx, state.player.y)) state.player.x = nx;
    if (!blocked(state.player.x, ny)) state.player.y = ny;
    if (soundOn && performance.now() - lastFootstep > 350) { tone('step'); lastFootstep = performance.now(); }
  }

  function updateNear() {
    var best = null, distance = 57;
    model.nodes.forEach(function (node) {
      if (node.kind === 'salvage' && state.salvaged.indexOf(node.id) !== -1) return;
      var d = Math.hypot(state.player.x - node.x, state.player.y - node.y);
      if (d < distance) { distance = d; best = node; }
    });
    near = best;
    var prompt = $('interaction-prompt');
    prompt.hidden = !best || !state.started || state.dead || paused || finished || $('game-dialog').open || $('relay-dialog').open;
    if (best) prompt.innerHTML = '<kbd>E</kbd><span>' + (best.kind === 'salvage' ? '搜寻' : best.id === 'board' ? '查看' : best.id === 'radio' ? '检查' : '交谈 · ') + esc(best.name) + '</span>';
  }

  function isActive() {
    return state.started && !state.dead && !paused && !finished && !$('game-dialog').open && !$('relay-dialog').open && !document.hidden;
  }

  function frame(now) {
    var dt = lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0;
    lastTime = now;
    if (isActive()) {
      updateMovement(dt);
      if (isActive()) {
        var events = model.tick(state, dt) || [];
        events.forEach(function (event) { var message = typeof event === 'string' ? event : event.message; addLog(message); toast(message); });
        if (state.dead) showGameOver();
        saveTimer += dt;
        if (saveTimer >= 2) { saveTimer = 0; renderUI(); persist(); }
      }
    } else state.player.moving = false;
    updateNear();
    renderer.render(state, now, target, near ? near.id : null);
    requestAnimationFrame(frame);
  }

  function togglePause() {
    if (!state.started || state.dead || finished || $('game-dialog').open || $('relay-dialog').open) return;
    paused = !paused; keys = {};
    $('pause-badge').hidden = !paused;
    $('pause-button').textContent = paused ? '▷' : 'Ⅱ';
    $('pause-button').setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏');
    persist();
  }

  function tone(kind) {
    if (!soundOn) return;
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      var frequencies = kind === 'win' ? [392, 494, 587, 784] : kind === 'loot' ? [523, 784] : kind === 'trade' ? [440, 659] : [110];
      frequencies.forEach(function (f, i) {
        var osc = audioContext.createOscillator(), gain = audioContext.createGain(), at = audioContext.currentTime + i * 0.09;
        osc.type = kind === 'step' ? 'triangle' : 'square'; osc.frequency.value = f;
        gain.gain.setValueAtTime(kind === 'step' ? 0.012 : 0.025, at); gain.gain.exponentialRampToValueAtTime(0.001, at + 0.12);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(at); osc.stop(at + 0.13);
      });
    } catch (e) { soundOn = false; }
  }

  $('start-button').onclick = function () { state.started = true; $('intro-note').hidden = true; persist(); canvas.focus({ preventScroll: true }); toast('点击人物或废料堆即可前往。先看看中央悬赏榜吧。'); };
  $('guide-button').onclick = showGuide;
  $('mission-button').onclick = showMission;
  $('world-button').onclick = showRelay;
  $('relay-button').onclick = showRelay;
  $('market-tab').onclick = function () { if ($('relay-dialog').open) $('relay-dialog').close(); if ($('game-dialog').open) closeDialog(); canvas.focus({ preventScroll: true }); };
  $('dialog-close').onclick = closeDialog;
  $('relay-close').onclick = function () { $('relay-dialog').close(); canvas.focus({ preventScroll: true }); };
  $('restart-button').onclick = confirmRestart;
  $('pause-button').onclick = togglePause;
  $('resume-button').onclick = togglePause;
  $('interaction-prompt').onclick = function () { if (near && isActive()) openEntity(near.id); };
  $('touch-interact').onclick = function () { if (near && isActive()) openEntity(near.id); else if (state.repaired) showEnding(); else toast('靠近摊主、悬赏榜或废料堆再交互。'); };
  $('map-button').onclick = function () { $('map-note').hidden = !$('map-note').hidden; $('map-button').setAttribute('aria-pressed', String(!$('map-note').hidden)); };
  $('sound-button').onclick = function () { soundOn = !soundOn; $('sound-button').querySelector('.sound-off').hidden = soundOn; $('sound-button').setAttribute('aria-label', soundOn ? '关闭声音' : '开启声音'); $('sound-button').title = soundOn ? '关闭声音' : '开启声音'; if (soundOn) tone('trade'); };

  canvas.addEventListener('pointerdown', function (event) {
    if (!isActive()) return;
    event.preventDefault(); canvas.focus({ preventScroll: true });
    var box = canvas.getBoundingClientRect();
    var point = { x: (event.clientX - box.left) / box.width * canvas.width, y: (event.clientY - box.top) / box.height * canvas.height };
    var selected = model.nodes.map(function (n) { return { node: n, d: Math.min(Math.hypot(point.x - n.x, point.y - n.y), Math.hypot(point.x - n.x, point.y - (n.y - 27))) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    if (selected && selected.d < 38) navigateTo(selected.node, selected.node.id);
    else navigateTo(point, null);
  });

  document.addEventListener('keydown', function (event) {
    var key = event.key.toLowerCase();
    if (/input|textarea/i.test(event.target.tagName)) return;
    if ($('game-dialog').open || $('relay-dialog').open) return;
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift', 'e', 'escape'].indexOf(key) !== -1) event.preventDefault();
    if (key === 'escape' && !event.repeat) { togglePause(); return; }
    if (key === 'e' && !event.repeat && isActive()) {
      if (near) openEntity(near.id);
      else if (state.repaired) showEnding();
      else toast('靠近摊主、悬赏榜或发光的废料堆再按 E。');
      return;
    }
    if (isActive()) keys[key] = true;
  });
  document.addEventListener('keyup', function (event) { keys[event.key.toLowerCase()] = false; });
  document.querySelectorAll('[data-dir]').forEach(function (button) {
    var key = { up: 'w', left: 'a', down: 's', right: 'd' }[button.dataset.dir];
    button.addEventListener('pointerdown', function (event) { event.preventDefault(); if (isActive()) { button.setPointerCapture(event.pointerId); keys[key] = true; } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) { button.addEventListener(type, function () { keys[key] = false; }); });
  });
  window.addEventListener('blur', function () { keys = {}; });
  document.addEventListener('visibilitychange', function () { keys = {}; lastTime = 0; if (document.hidden) persist(); });
  window.addEventListener('pagehide', persist);
  $('game-dialog').addEventListener('close', function () { keys = {}; currentEntity = null; });
  $('relay-dialog').addEventListener('close', function () { keys = {}; });

  initialize();
  requestAnimationFrame(frame);
})();
<\/script>
</body>
</html>
`,"example-opera":`<!doctype html>
<html lang="zh-CN"><head><script>(function bridgeRuntime(C,seed){
 'use strict';
 const memory=Object.assign(Object.create(null),seed);
 const tell=(type,data)=>parent.postMessage({...data,type,routeId:C.routeId,slot:C.slot,gameId:C.gameId},'*');
 const storage={
  getItem:key=>Object.hasOwn(memory,String(key))?memory[String(key)]:null,
  setItem(key,value){key=String(key);value=String(value);if(key.length>150||value.length>65536)return;memory[key]=value;tell('iw-storage',{key,value});},
  removeItem(key){delete memory[String(key)];tell('iw-storage',{key:String(key),value:null});},
  clear(){Object.keys(memory).forEach(key=>storage.removeItem(key));},
  key:index=>Object.keys(memory)[index]||null
 };
 Object.defineProperty(storage,'length',{get:()=>Object.keys(memory).length});
 try{Object.defineProperty(window,'localStorage',{get:()=>storage});}catch{}
 const clone=value=>JSON.parse(JSON.stringify(value));
 const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
 const initial=C.save?freeze(clone(C.save)):null;
 const fix=config=>({...config,level:C.slot+1,world:C.world,prevWorld:C.prevWorld,nextWorld:C.nextWorld,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
 let config=fix({}),wl;
 Object.defineProperty(window,'CONFIG',{configurable:true,get:()=>config,set:value=>{config=fix(value);}});
 const install=value=>{
  if(!value||value.__portalBridge)return value;
  const read=value.readSave,complete=value.completeLevel,history=value.readHistory;
  value.readSave=()=>initial?clone(initial):read.call(value,C.slot+1);
  value.getInitialSave=()=>freeze(initial?clone(initial):read.call(value,C.slot+1));
  value.readHistory=()=>Array.isArray(C.history)?clone(C.history):history.call(value);
  value.completeLevel=(c,save,opts)=>{
   const result=complete.call(value,fix(c),save,{...opts,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
   if(result)tell('iw-save',{save:result,history:value.readHistory()});
   return result;
  };
  value.__portalBridge=true;return value;
 };
 Object.defineProperty(window,'WL',{configurable:true,get:()=>wl,set:value=>{wl=install(value);}});
 addEventListener('message',event=>{
  if(event.source!==parent||!event.data||typeof event.data!=='object')return;
  if(event.data.type==='IW_STORAGE_INIT'&&event.data.values&&typeof event.data.values==='object'){
   for(const [key,value]of Object.entries(event.data.values))if(key.length<150&&typeof value==='string'&&value.length<=65536)memory[key]=value;
  }
 });
 addEventListener('load',()=>tell('IW_READY',{world:C.world}));
})(window.__iw_staticContext||{"routeId":"infinite-world","slot":1,"gameId":"example-opera","world":"幽冥戏班","prevWorld":"废土集市","nextWorld":"终局结算","exitHook":"携着遗物走回大陆，让旅程中的故事留在心中。","nextUrl":"#finished"},{});<\/script><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101a23"><meta name="description" content="锣鼓一响，活人也要给死人让座。二维像素国风怪谈：循戏本、正脸谱、鸣送魂。"><title>幽冥戏班 · 子夜折子</title><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23121e29'/%3E%3Cpath d='M8 6h16l-2 17-6 5-6-5z' fill='%23c9b788'/%3E%3Cpath d='m11 12 4 2-3 3m9-5-4 2 3 3' stroke='%23a33e3b' stroke-width='3' fill='none'/%3E%3C/svg%3E"><style>@charset "UTF-8";
:root{--bg:#101922;--panel:#15232d;--panel-deep:#111c26;--ink:#dfd6be;--muted:#73898b;--gold:#c5a36d;--line:#304047;--red:#ac4946;--jade:#79a49b;--mono:Consolas,"Courier New",monospace;--serif:"STSong","SimSun",serif}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:13px/1.7 "Microsoft YaHei","PingFang SC",system-ui,sans-serif;background-image:radial-gradient(ellipse at 50% 5%,#21313a55,transparent 60%)}button,a{-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit;cursor:pointer}button:disabled{cursor:not-allowed;opacity:.35}button:focus-visible,a:focus-visible,canvas:focus-visible,summary:focus-visible{outline:2px solid var(--gold);outline-offset:4px}a{color:inherit;text-decoration:none}.site-header{height:82px;border-bottom:1px solid #2a383e;display:flex;align-items:center;padding:0 max(3.3vw,24px);gap:35px;background:#101921b3}.brand{display:flex;align-items:center;gap:12px;font:700 22px/1.4 var(--serif);letter-spacing:3px;white-space:nowrap}.brand small{display:block;font:8px/1.7 var(--mono);letter-spacing:2px;color:#758a8d}.brand-mask{width:36px;height:40px;border:1px solid #9c8359;background:#263330;position:relative;display:block;box-shadow:3px 3px 0 #090e13}.brand-mask:before{content:"";position:absolute;width:22px;height:27px;background:#b4aa86;left:6px;top:5px;clip-path:polygon(0 0,100% 0,89% 74%,50% 100%,11% 74%)}.brand-mask i:before,.brand-mask i:after{content:"";position:absolute;width:7px;height:7px;background:#853f38;top:14px;transform:skewY(30deg)}.brand-mask i:before{left:10px}.brand-mask i:after{right:9px;transform:skewY(-30deg)}nav{display:flex;gap:30px;height:100%;margin-left:38px}.nav-button{border:0;background:none;color:#7b9191;font-size:12px;padding:0 2px;position:relative;letter-spacing:1px}.nav-button span{font:10px var(--serif);margin-left:6px}.nav-button.active{color:#dcc99e}.nav-button.active:after{content:"";position:absolute;bottom:0;left:0;right:0;height:2px;background:#b79764}.header-right{margin-left:auto;display:flex;gap:22px;align-items:center}.world-tag{font-size:10px;color:#7e9694;letter-spacing:1px;white-space:nowrap}.world-tag i,.live-dot{width:5px;height:5px;background:#b95b4f;display:inline-block;margin-right:8px;box-shadow:0 0 10px #b7484770}.icon-button{width:31px;height:31px;position:relative;background:none;border:1px solid var(--line);font-size:18px;color:#acb6a2}.sound-off{position:absolute;top:1px;left:6px;color:#b27159}.page{max-width:1600px;padding:34px max(3.3vw,24px) 0;margin:0 auto}.page-intro{display:flex;align-items:center;justify-content:space-between;margin-bottom:29px}.intro-title{display:flex;align-items:center;gap:20px}.seal{font:12px/1.25 var(--serif);border:1px solid #874943;color:#bc6b59;padding:5px 7px;outline:1px solid #87494377;outline-offset:3px;background:#6f30211c}.eyebrow,.section-eyebrow{font:9px/1.5 var(--mono);letter-spacing:1.6px;color:#778e8b}.eyebrow span{margin:0 8px;color:#586d6d}h1{font:400 34px/1.6 var(--serif);letter-spacing:2px;margin:6px 0 4px;color:#e0d1ae}h1 em{font-style:normal;color:#bb9a6b}.page-intro p{color:#768d8c;font-size:11px;letter-spacing:.7px;margin:0}.chapter-mark{border-left:1px solid var(--line);padding-left:26px;text-align:right;line-height:1.5;color:#758a88}.chapter-mark>span{font:11px var(--serif);letter-spacing:5px}.chapter-mark b{font:32px var(--serif);color:#bba477;font-weight:400}.chapter-mark small{display:block;margin-top:7px;font-size:9px;letter-spacing:2px}.game-layout{display:grid;grid-template-columns:minmax(0,1fr) 284px;gap:26px;align-items:start}.play-column{min-width:0}.scene-heading{display:flex;align-items:center;justify-content:space-between;background:#17252e;border:1px solid #46514f;border-bottom:0;height:47px;padding:0 17px;font-size:10px}.scene-heading strong{font:15px var(--serif);letter-spacing:2px;color:#d3c39e}.live-dot{vertical-align:2px}.scene-coordinates{font:8px var(--mono);letter-spacing:1.4px;color:#6b8182;margin-left:14px}.weather{display:flex;align-items:center;gap:9px;color:#7f9691;font-size:10px}.moon{font-size:18px;color:#afac7c}.time{font:11px var(--mono);border-left:1px solid #3a494c;padding-left:13px;margin-left:5px;color:#b3b796}.scene{position:relative;border:1px solid #667066;isolation:isolate;background:#15222c;overflow:hidden}.scene:before,.scene:after{content:"";position:absolute;inset:6px;pointer-events:none;z-index:3}.scene:before{border:1px solid #b29b5d2b;box-shadow:inset 0 0 60px #07131a70}.scene:after{inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,#07101c13 3px,#07101c13 4px);mix-blend-mode:multiply}canvas{display:block;width:100%;height:auto;aspect-ratio:8/5;image-rendering:pixelated;cursor:crosshair;touch-action:none;outline:none}.scene-corner{position:absolute;left:19px;right:19px;bottom:15px;display:flex;justify-content:space-between;font-size:9px;letter-spacing:1px;color:#9fa88d;pointer-events:none;z-index:4;text-shadow:1px 1px #0b1c24}.map-tag{padding:1px 7px;border:1px solid #aa9a6c55;font-size:8px;background:#11202ac4}.map-button{position:absolute;top:16px;right:16px;width:31px;height:31px;border:1px solid #6f7b6866;background:#14252fd9;color:#c5c8a1;font-size:23px;line-height:1;z-index:4}.map-note{position:absolute;right:56px;top:16px;background:#17272ff5;border:1px solid #6d7762;padding:13px 17px;color:#a6b49a;z-index:6;font-size:11px;box-shadow:4px 4px 0 #06101955}.map-note b{display:block;font:15px var(--serif);color:#c6b37e;margin-bottom:8px}.map-note span{display:block;line-height:1.9}.intro-note{position:absolute;left:25px;bottom:30px;width:min(365px,84%);background:#17242bf2;border:1px solid #7c775a;padding:23px 26px 20px;box-shadow:5px 5px 0 #040d1770;z-index:5;backdrop-filter:blur(4px);max-height:calc(100% - 45px);overflow:auto}.intro-kicker{font-size:9px;letter-spacing:1px;color:#a9956d;display:flex;gap:8px;align-items:center}.intro-kicker i{width:4px;height:4px;background:#bb6652;box-shadow:0 0 9px #c9604d}h2{font-weight:500;font-size:15px;letter-spacing:.7px;margin:4px 0 7px;line-height:1.5}.intro-note h2{font:24px/1.5 var(--serif);color:#dcc79c;margin:9px 0}.intro-note p{color:#97a297;font-size:11px;line-height:1.95;margin:0 0 18px;white-space:pre-line}.primary-button{background:#8d443d;border:1px solid #b06350;color:#ebd9b5;display:flex;justify-content:space-between;align-items:center;gap:45px;padding:9px 17px;font-size:12px;letter-spacing:2px;box-shadow:2px 2px 0 #070c1355}.primary-button:hover{background:#a24b3f}.intro-hint{display:block;font-size:8px;color:#6d8986;margin-top:12px;letter-spacing:1px}.control-strip{height:47px;background:#17252e;border:1px solid #46514f;border-top:0;display:flex;align-items:center;justify-content:space-between;padding:0 14px;color:#7a918e;font-size:10px}.control-strip>div{display:flex;gap:17px;align-items:center}.control-strip>div>span{display:flex;gap:4px;align-items:center}kbd{display:inline-block;min-width:18px;height:20px;padding:0 4px;text-align:center;border:1px solid #435453;border-bottom:2px solid #4c6059;background:#1e3038;border-radius:2px;color:#a2ae96;font:10px/17px var(--mono)}.control-strip button{border:0;background:none;color:#9aaa8f;font:18px var(--mono);padding:3px 7px}.click-hint{font-size:9px;color:#607c7b}.below-map{display:flex;justify-content:space-between;padding-top:12px;color:#5f7c7a;font-size:9px;letter-spacing:.3px}.below-map>span>i{font-style:normal;color:#aa9166;margin-right:4px}#save-status i{width:4px;height:4px;display:inline-block;background:#658c7d;vertical-align:2px}.journal{border:1px solid #34484b;background:linear-gradient(#172730,#13212a);padding:18px 20px 0;position:relative}.journal:before{content:"";position:absolute;top:-1px;left:20px;width:28px;height:2px;background:#a88154}.traveler{position:relative;display:flex;gap:13px;padding-bottom:18px;border-bottom:1px solid var(--line)}.avatar{width:44px;height:49px;border:1px solid #5b7265;background:#203c3d;flex:none;display:grid;place-items:center;box-shadow:inset 0 0 0 3px #122a30}.avatar-pixel{width:7px;height:7px;background:#d4c195;box-shadow:-7px 0 #b8ad87,7px 0 #d4c195,-7px -7px #3f4e4c,0 -7px #3f4e4c,7px -7px #3f4e4c,-7px 7px #b8ad87,0 7px #b8ad87,7px 7px #b8ad87,-7px 14px #63776d,0 14px #a15949,7px 14px #63776d,-7px 21px #465f5c,7px 21px #465f5c;transform:translateY(-7px)}.traveler .section-eyebrow{font-size:8px;letter-spacing:1.4px}.traveler h2{font-size:14px;white-space:nowrap;margin:4px 0}.traveler h2>span{font-size:8px;color:#658582;margin-left:4px}.vitals{display:flex;gap:12px;font-size:9px;color:#729c92;line-height:1.5}.vitals #hp{color:#b86659;letter-spacing:1px;font-size:11px}.small-icon{position:absolute;right:-3px;top:-4px;background:none;border:0;color:#78948e;font-size:19px}.act-progress{padding:16px 0;border-bottom:1px solid var(--line);text-align:center}.act-progress>div:first-child{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}.paper-tag{font:9px var(--serif);color:#b39b6a;border:1px solid #685e43;padding:2px 6px}.act-progress h2{font:24px/1.4 var(--serif);color:#d5c292;letter-spacing:6px;margin:10px 0 2px}.act-progress>span{font:10px var(--serif);letter-spacing:2px;color:#738b84}.chapter-dots{display:flex;gap:8px;margin-top:15px}.chapter-dots i{height:3px;background:#334c4d;flex:1}.chapter-dots i.done{background:#b18f59;box-shadow:0 0 8px #c3a06622}.mission{padding:18px 0;border-bottom:1px solid var(--line)}.section-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px}.section-eyebrow{font-size:9px;letter-spacing:1.4px}.gold-mark{font:13px var(--serif);color:#9f8251}.mission h2{font:18px var(--serif);letter-spacing:1px;margin-bottom:12px;color:#d2c6a5}.mission p{color:#7b968e;font-size:10px;line-height:1.9;margin:0 0 17px}.objectives{display:grid;gap:11px}.objective{display:flex;gap:9px;align-items:center;font-size:10px;color:#8ca298}.objective .check{width:11px;height:11px;border:1px solid #576c62;font:9px/9px var(--mono);text-align:center;color:#132321;flex:none}.objective.complete .check{background:#9fa477;border-color:#9fa477}.objective-count{font:8px var(--mono);color:#596f6d;margin-left:auto}.text-button{display:flex;justify-content:space-between;width:100%;border:0;background:none;font-size:10px;color:#ac9569;padding:0;margin-top:17px}.text-button:hover{color:#debd79}.inventory{padding:17px 0;border-bottom:1px solid var(--line)}.inventory-capacity{font:9px var(--mono);color:#688a81}.bag-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.bag-slot{height:36px;border:1px solid #3c5453;background:#1b3037;display:flex;align-items:center;justify-content:center;color:#4f6a68;position:relative;font:18px var(--mono)}.bag-slot.filled{border-color:#6b7a61;color:#bba372;background:#293b36}.bag-slot>span{position:absolute;bottom:2px;right:4px;font:7px var(--mono);color:#81967d}.mini-mask{width:16px;height:23px;clip-path:polygon(0 0,100% 0,89% 73%,50% 100%,11% 73%);position:relative;display:inline-block;background:var(--mask-color);box-shadow:inset 0 0 0 2px #161e26}.mini-mask:before,.mini-mask:after{content:"";position:absolute;width:5px;height:4px;background:#18252a;top:7px;transform:skewY(25deg)}.mini-mask:before{left:2px}.mini-mask:after{right:2px;transform:skewY(-25deg)}.inventory p{color:#608079;font-size:9px;margin:9px 0 0}.rules-strip{padding:14px 0;border-bottom:1px solid var(--line)}.rules-strip>span{font-size:8px;color:#667f7d;letter-spacing:1px}.rules-strip p{font:9px/2 var(--serif);color:#96a08b;margin:4px 0 0;display:flex;align-items:center;justify-content:space-between;gap:3px}.rules-strip i{font-style:normal;color:#a87553;font-size:10px}.field-notes{padding:16px 0 17px}.note-line{height:1px;background:var(--line);flex:1}.field-notes .section-heading{margin-bottom:12px}.activity-log{min-height:70px;display:grid;gap:10px}.log-entry{display:flex;gap:9px;line-height:1.8;color:#728e86;font-size:9px}.log-entry time{font:8px/2 var(--mono);color:#536c6c;flex:none}.log-entry:first-child{color:#9eae91}.journal-foot{font:6px/1 var(--mono);letter-spacing:.6px;display:flex;align-items:center;justify-content:space-between;color:#496862;margin:0 -20px;padding:14px 20px;border-top:1px solid var(--line)}.journal-foot span{font-size:13px;color:#7d895f}.site-footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #263c40;padding:16px 0;margin-top:25px;color:#536e6b;font-size:9px;letter-spacing:.5px}.site-footer>span>span{margin:0 9px}.site-footer>div{display:flex;gap:24px;align-items:center}.site-footer a{color:#5e7c76;font-size:9px}.site-footer button{border:0;background:none;padding:0;color:#91a082;font-size:9px}.interaction-prompt{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);background:#182b34ec;border:1px solid #8b8e68;color:#c3c3a0;z-index:5;padding:7px 13px;white-space:nowrap;font-size:11px;box-shadow:3px 3px 0 #06121c66}.interaction-prompt kbd{margin-right:7px}.toast{position:absolute;left:50%;top:16px;transform:translateX(-50%);background:#293b38ed;border:1px solid #859276;color:#ded3a9;padding:10px 17px;max-width:85%;z-index:6;text-align:center;font-size:11px;box-shadow:3px 3px 0 #07121c77}.pause-badge{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;background:#0b1622aa;backdrop-filter:blur(4px);z-index:7}.pause-badge>span{font:30px var(--serif);letter-spacing:8px;color:#cbb48a}.pause-badge button{background:#773e37;border:1px solid #a45e47;color:#d8c69e;padding:8px 20px;font-size:12px}.touch-controls,.touch-interact{display:none}dialog{width:min(500px,92vw);padding:23px 27px 26px;background:#182831;color:#c6c8ac;border:1px solid #737b61;box-shadow:6px 6px 0 #050d1a66;max-height:90vh;overflow:auto}dialog::backdrop{background:#06121bb3;backdrop-filter:blur(3px)}.dialog-top{display:flex;align-items:center;justify-content:space-between;font:9px var(--mono);letter-spacing:1px;color:#819c8d}.close-button{background:none;border:0;color:#82968b;font:25px/1 var(--mono);padding:0 0 0 10px}dialog h2{font:26px/1.5 var(--serif);color:#d7c093;letter-spacing:1px;margin:13px 0 14px}dialog p{font-size:12px;line-height:2;color:#8fa599}.character-quote{border-left:2px solid #9f6b49;padding-left:15px;font:15px/1.9 var(--serif)!important;color:#c1ba94!important;margin:20px 0}.dialog-small{font-size:10px!important;color:#678c81!important}.dialog-chip{font-size:9px;padding:3px 7px;border:1px solid #5c6f58;color:#a9ad83;display:inline-block;margin-right:6px}.dialog-actions{display:grid;gap:8px;margin-top:20px}.action-button{display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left;padding:11px 13px;border:1px solid #425e58;background:#223a3e;font-size:12px;color:#afba9e}.action-button small{font-size:9px;color:#779a89;white-space:nowrap}.action-button:hover:not(:disabled){background:#2c4847;border-color:#7c8f6e}.action-button.featured{background:#82443c;border-color:#ab6852;color:#e5cfaa}.action-button.featured small{color:#c3946c}.action-button.danger{border-color:#654841;color:#b88d78}.mask-legend{display:flex;gap:10px;justify-content:center;background:#12232b;padding:13px;margin:15px 0;font-size:10px;color:#889e8b}.mask-legend>span{display:flex;gap:7px;align-items:center}.mask-legend .mini-mask{width:14px;height:19px}.casting-board{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:18px 0}.casting-slot{background:#12232c;border:1px solid #3e5954;padding:12px 6px;text-align:center}.casting-slot>b{display:block;font:14px var(--serif);color:#c1b58f;margin-bottom:12px}.casting-slot .big-mask{height:53px;display:grid;place-items:center;color:#567970;font-size:27px}.big-mask .mini-mask{width:30px;height:44px}.big-mask .mini-mask:before,.big-mask .mini-mask:after{width:9px;height:8px;top:13px}.big-mask .mini-mask:before{left:4px}.big-mask .mini-mask:after{right:4px}.mask-options{display:flex;gap:5px;justify-content:center;margin-top:12px}.mask-choice{height:29px;width:27px;background:#263c3e;border:1px solid #4e6658;padding:4px;display:grid;place-items:center}.mask-choice:hover{border-color:#c7ac70;background:#3a4f40}.mask-choice.selected{border-color:#ceab67}.rhythm-row{display:flex;justify-content:center;gap:9px;margin:18px 0}.rhythm-step{width:48px;height:45px;display:grid;place-items:center;background:#11212b;border:1px solid #3b5a54;font:20px var(--serif);color:#59796e}.rhythm-step.filled{color:#d4bd86;border-color:#78865e}.rhythm-step.flash{background:#695b3a;box-shadow:0 0 16px #bda35f30}.rhythm-buttons{display:flex;gap:9px;margin:16px 0}.rhythm-buttons button{flex:1;background:#26403f;border:1px solid #577361;padding:14px 8px;color:#c0c7a1;font:22px var(--serif)}.rhythm-buttons button small{display:block;font:9px var(--mono);color:#7f9b84;margin-top:5px}.rhythm-buttons button:hover{background:#3b5144;border-color:#b6aa6b}.script-page{background:#293b36;border:1px solid #6d7653;padding:19px;margin-top:16px;color:#b8b891;position:relative}.script-page:before{content:"归 客";font:24px var(--serif);letter-spacing:12px;color:#d0bd88;display:block;text-align:center;padding-bottom:13px;border-bottom:1px solid #63705255;margin-bottom:15px}.script-page p{font:13px/2 var(--serif);color:#b6b591;margin:6px 0}.script-page strong{color:#e3c489;font-weight:400}.script-page .beat-note{font:17px/2 var(--serif);letter-spacing:5px;text-align:center;border-top:1px solid #64745c55;padding-top:12px;margin-top:15px;color:#d2be8c}.result-stats{display:grid;grid-template-columns:repeat(3,1fr);text-align:center;border-top:1px solid #3e5750;border-bottom:1px solid #3e5750;margin:20px 0;padding:17px 0}.result-stats b{font:24px var(--serif);color:#cbb78a;display:block}.result-stats span{font-size:9px;color:#779b87}#relay-dialog{width:min(650px,93vw)}#relay-dialog .wl-opening{border:1px dashed #4c665c;background:#1b3035;color:#a6b29b;font-size:11px;border-radius:0}#relay-dialog .wl-card{background:#1c3135;border:1px solid #536b59;border-left:3px solid #a78d57;color:#b2b999;font-size:11px;line-height:1.9;max-width:none;border-radius:0}#relay-dialog .wl-card-title{color:#d0bb85}#relay-dialog .wl-next{color:#7d9f89}#echo-log{font-size:11px;color:#83a38c;margin:16px 0}details{border-top:1px solid #3c554f;margin-top:20px;padding-top:12px;font-size:11px;color:#8caa91}summary{cursor:pointer}pre{font:10px/1.6 var(--mono);white-space:pre-wrap;word-break:break-word;max-height:160px;overflow:auto}textarea{width:100%;border:1px solid #4d6657;background:#13252d;color:#9bb093;font:10px/1.5 var(--mono);padding:8px;resize:vertical}.debug-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.debug-row button{background:#253e3b;border:1px solid #526c57;padding:6px 9px;font-size:10px}.relay-note{font-size:10px!important;color:#6b8b7e!important}.wl-overlay{background:#07131aed!important}.wl-overlay .wl-handoff{background:#172932;border:1px solid #8c855f;box-shadow:6px 6px 0 #02091277}.wl-overlay .wl-handoff-kicker{color:#b99963}.wl-overlay .wl-handoff-route{color:#d5c598;font-family:var(--serif)}.wl-overlay .wl-handoff-hook{color:#a6b49a}.wl-overlay .wl-card{border:1px solid #4c6c59;background:#1b3338;color:#a4b89b;border-radius:0}.wl-overlay .wl-card-title{color:#c3b47e}.wl-overlay .wl-next{color:#89a78a}.wl-overlay .wl-btn{background:#8d4c3d;color:#ead4a9;border-radius:0}.wl-warn{color:#9aab84!important}[hidden]{display:none!important}@media(min-width:1500px){.journal{padding-top:22px}.mission{padding:24px 0}.act-progress{padding:20px 0}.inventory{padding:21px 0}.field-notes{padding:21px 0}.activity-log{min-height:94px;gap:13px}}@media(max-width:1180px){.game-layout{grid-template-columns:minmax(0,1fr) 256px;gap:20px}.journal{padding:16px 16px 0}.journal-foot{margin:0 -16px;padding:14px 16px}.site-header nav{margin-left:12px;gap:23px}.scene-coordinates{display:none}.control-strip>div{gap:12px}.desktop-hint{display:none!important}.traveler{gap:10px}.traveler h2{font-size:13px}.act-progress{padding:13px 0}.mission{padding:15px 0}.mission h2{font-size:16px}.rules-strip{padding:11px 0}.rules-strip p{font-size:8px}.activity-log{min-height:62px}.intro-note{width:330px;padding:19px 23px}.intro-note h2{font-size:22px}}@media(max-width:950px){.site-header{height:73px;gap:20px}.header-right .world-tag{display:none}.site-header nav{gap:22px;margin-left:auto}.page{padding-top:26px}.game-layout{grid-template-columns:minmax(0,1fr) 228px;gap:15px}.journal{padding:14px 14px 0}.journal-foot{margin:0 -14px;padding:12px 14px;font-size:5px;letter-spacing:.5px}.traveler h2>span{display:none}.avatar{width:36px;height:44px}.traveler{gap:8px}.section-heading{margin-bottom:10px}.mission h2{font-size:15px;letter-spacing:0}.mission p{font-size:9px;margin-bottom:13px}.objectives{gap:8px}.objective{font-size:9px}.bag-slot{height:29px}.bag-grid{gap:5px}.act-progress h2{font-size:21px}.act-progress>span{font-size:9px}.act-progress{padding:10px 0}.rules-strip p{flex-wrap:wrap;justify-content:flex-start;gap:4px 7px}.field-notes{padding:13px 0}.activity-log .log-entry:nth-child(3){display:none}.activity-log{min-height:55px}.scene-heading{padding:0 12px}.control-strip{font-size:9px;padding:0 10px}.control-strip .click-hint{display:none}.page-intro h1{font-size:29px}.page-intro p{font-size:10px}.eyebrow{font-size:8px;letter-spacing:1.3px}.intro-title{gap:15px}.chapter-mark{padding-left:15px}.intro-note{width:300px;padding:16px 20px}.intro-note p{font-size:10px;margin-bottom:14px}.intro-note h2{font-size:20px}.intro-kicker{font-size:8px}.intro-hint{font-size:7px}}@media(max-width:1000px){.site-header{height:67px;padding:0 18px;gap:17px}.brand{font-size:19px;letter-spacing:2px;gap:10px}.brand small{font-size:6px;letter-spacing:1.6px}.brand-mask{width:31px;height:35px}.brand-mask:before{left:5px;top:4px;width:20px;height:25px}.brand-mask i:before{left:8px}.brand-mask i:after{right:7px}.brand-mask i:before,.brand-mask i:after{top:12px}.site-header nav{gap:18px}.nav-button{font-size:10px;letter-spacing:0}.nav-button.active>span{display:none}.header-right{gap:0}.icon-button{width:27px;height:27px;font-size:16px}.page{padding:24px 16px 0}.page-intro{margin-bottom:23px}.intro-title{gap:13px}.seal{font-size:10px;padding:4px 5px}.page-intro h1{font-size:25px;letter-spacing:1px;margin:6px 0}.eyebrow{font-size:7px;letter-spacing:1px}.eyebrow span{margin:0 3px}.page-intro p{font-size:9px;letter-spacing:.1px;max-width:350px}.chapter-mark{display:none}.game-layout{display:flex;flex-direction:column;gap:19px}.play-column{width:100%}.scene-heading{height:40px}.scene-heading strong{font-size:13px}.scene-coordinates{display:inline;font-size:7px;margin-left:12px;letter-spacing:.5px}.weather{font-size:9px;gap:7px}.time{font-size:10px}.scene{margin:0 -2px}.scene-corner{font-size:7px;bottom:11px;left:12px;right:12px}.map-tag{font-size:7px}.map-button{top:12px;right:12px;width:26px;height:26px;font-size:21px}.intro-note{left:15px;bottom:21px;max-height:calc(100% - 36px);padding:13px 17px;width:min(310px,84%);display:flex;flex-direction:column}.intro-note h2{font-size:19px;margin:0 0 9px;flex:none}.intro-kicker{display:none}.intro-note p{min-height:0;max-height:70px;overflow:auto;font-size:10px;line-height:1.8;margin-bottom:10px}.intro-note .primary-button{flex:none;padding:7px 13px;font-size:11px}.intro-hint{display:none}.control-strip .click-hint{display:flex;font-size:8px}.control-strip>div{gap:11px}.control-strip{height:43px}.below-map{font-size:8px;padding-top:10px}.journal{width:100%;display:grid;grid-template-columns:1fr 1fr;column-gap:24px;padding:17px 18px 0}.traveler{align-items:center;grid-column:1;border-bottom:1px solid var(--line)}.traveler h2>span{display:inline}.act-progress{grid-column:2;grid-row:1;padding:0 0 14px}.act-progress>div:first-child{margin:0}.act-progress h2{font-size:22px;margin:2px 0}.act-progress>span{font-size:8px}.chapter-dots{margin-top:9px}.mission{grid-column:1;grid-row:2/4;border-bottom:0;padding-top:17px}.mission h2{font-size:15px}.mission p br{display:none}.inventory{grid-column:2;grid-row:2;padding-top:17px;border-bottom:0}.rules-strip{grid-column:1/-1;grid-row:4;padding:11px 0 14px;border-top:1px solid var(--line);border-bottom:0;display:flex;gap:15px;align-items:center}.rules-strip p{margin:0;gap:6px;flex:1;justify-content:space-around;font-size:9px}.rules-strip>span{white-space:nowrap}.field-notes{grid-column:2;grid-row:3;padding:5px 0 15px}.field-notes .section-eyebrow{font-size:8px;letter-spacing:.2px}.activity-log{gap:8px;min-height:55px}.activity-log .log-entry:nth-child(3){display:none}.journal-foot{grid-column:1/-1;margin:0 -18px;padding:12px 18px;font-size:6px;letter-spacing:1px}.site-footer{margin-top:20px;font-size:8px;letter-spacing:0}.site-footer>div{gap:10px}.site-footer a{display:none}.site-footer button{font-size:9px}.site-footer>span>span{margin:0 5px}.interaction-prompt{bottom:34px;font-size:10px;padding:6px 10px}.toast{top:11px;padding:7px 11px;font-size:10px}.casting-board{gap:7px}.casting-slot{padding:12px 4px}.casting-slot>b{font-size:12px}.mask-options{gap:4px}.mask-choice{width:24px}.mask-legend{gap:8px;font-size:9px;padding:10px 5px}}@media(max-width:420px){.site-header{padding:0 15px;gap:10px}.brand{font-size:17px;gap:8px}.site-header nav{gap:14px}.header-right{display:none}.page-intro h1{font-size:22px}.eyebrow{font-size:6px;letter-spacing:.6px}.page-intro p{font-size:9px;max-width:275px}.scene-coordinates{display:none}.control-strip>div{gap:7px}.control-strip .click-hint{font-size:7px}kbd{min-width:16px;padding:0 2px}.journal{column-gap:16px;padding:15px 14px 0}.journal-foot{margin:0 -14px;padding:12px 14px;font-size:5px}.traveler h2>span{display:none}.traveler .section-eyebrow{font-size:7px}.vitals{gap:8px;font-size:8px}.vitals #hp{font-size:10px}.mission h2{font-size:14px}.bag-slot{height:27px}.bag-grid{gap:4px}.mission p{font-size:9px}.objective{font-size:9px;gap:6px}.objective-count{font-size:7px}.rules-strip{gap:7px}.rules-strip p{font-size:8px;gap:4px}.rules-strip i{font-size:9px}.site-footer{font-size:7px}dialog{padding:19px 20px}dialog h2{font-size:23px}.mask-options{gap:3px}.casting-slot>b{font-size:11px}.action-button{font-size:11px}.action-button small{font-size:8px}.dialog-chip{font-size:8px}.script-page{padding:15px}}@media(pointer:coarse){.touch-controls{display:block;position:absolute;left:13px;bottom:32px;z-index:5;opacity:.8;text-align:center}.touch-controls>div{display:flex;gap:3px;margin-top:3px}.touch-controls button{width:29px;height:29px;background:#1a303bc9;border:1px solid #71876a;color:#c0c6a0;font:16px var(--mono);touch-action:none;padding:0}.touch-interact{display:block;position:absolute;right:14px;bottom:37px;z-index:5;background:#2d443dc9;color:#c4c4a2;border:1px solid #71876a;padding:10px 12px;font-size:10px}.scene-corner{display:none}.interaction-prompt{bottom:12px}}@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
</style></head>
<body>
  <header class="site-header"><a class="brand" href="index.html"><span class="brand-mask" aria-hidden="true"><i></i></span><span>幽冥戏班<small>THE MIDNIGHT OPERA</small></span></a><nav aria-label="游戏导航"><button class="nav-button active" id="market-tab">戏院 <span>壹</span></button><button class="nav-button" id="guide-button">戏班规矩</button><button class="nav-button" id="world-button">前尘回响 <span>↗</span></button></nav><div class="header-right"><span class="world-tag"><i></i> 无限世界 · 第六签</span><button class="icon-button" id="sound-button" aria-label="开启声音" title="开启声音">♫<span class="sound-off">／</span></button></div></header>
  <main class="page"><section class="page-intro"><div class="intro-title"><span class="seal">子<br>夜<br>折<br>子</span><div><div class="eyebrow">A PLAY FOR THE FORGOTTEN <span>／</span> 国风怪谈</div><h1>今夜，<em>你是替班人。</em></h1><p>锣鼓一响，活人也要给死人让座。唱完这折戏，才有归途。</p></div></div><div class="chapter-mark"><span>第 <b>陆</b> 签</span><small>梨园旧院 · 子时三刻</small></div></section>
    <div class="game-layout"><section class="play-column" aria-label="幽冥戏院像素游戏"><div class="scene-heading"><div><span class="live-dot"></span><strong>梨园旧院</strong><span class="scene-coordinates">THEATRE OF LOST SOULS</span></div><div class="weather"><span class="moon">◒</span><span id="weather-text">阴 · 有客来</span><span class="time" id="clock">23:00</span></div></div>
      <div class="scene" id="scene"><canvas id="game-canvas" width="960" height="600" tabindex="0" aria-label="幽冥戏院地图。WASD或方向键移动，E交互，也可点击人物、戏本和道具自动前往。">请使用支持 Canvas 的浏览器游玩。</canvas><div class="scene-corner"><span>※ 看戏可以，别坐错位。</span><span class="map-tag">夜戏未散</span></div><button class="map-button" id="map-button" aria-label="查看戏院导览" aria-pressed="false">⌖</button><div class="map-note" id="map-note" hidden><b>梨园旧院</b><span>西南 · 守门纸人</span><span>西北 · 戏本与引魂灯</span><span>东侧 · 脸谱与铜锣</span><span>北方 · 戏台、幕后之门</span></div><button class="interaction-prompt" id="interaction-prompt" hidden><kbd>E</kbd><span>查看</span></button>
        <div class="intro-note" id="intro-note"><div class="intro-kicker"><i></i> 今夜缺一位，恰好是你</div><h2>客官，戏还没散。</h2><p id="entry-echo">你循着锣声走进一座旧戏院。台下坐满了人，却听不见一声呼吸。</p><button class="primary-button" id="start-button">持灯入戏 <span>→</span></button><span class="intro-hint">约 5–10 分钟 · 无突发惊吓</span></div><div class="toast" id="toast" role="status" hidden></div><div class="touch-controls" aria-label="触屏移动"><button data-dir="up" aria-label="向上">↑</button><div><button data-dir="left" aria-label="向左">←</button><button data-dir="down" aria-label="向下">↓</button><button data-dir="right" aria-label="向右">→</button></div></div><button class="touch-interact" id="touch-interact">查看 E</button><div class="pause-badge" id="pause-badge" hidden><span>暂歇一折</span><button id="resume-button">继续入戏 →</button></div>
      </div><div class="control-strip"><div><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> 移步</span><span><kbd>E</kbd> 查看</span><span class="desktop-hint"><kbd>SHIFT</kbd> 疾行</span><span class="click-hint">亦可点击地图自动前往</span></div><button id="pause-button" aria-label="暂停游戏">Ⅱ</button></div><div class="below-map"><span><i>✦</i> 戏中人未走，局外人莫留。</span><span id="save-status"><i></i> 前尘自动记下</span></div></section>
      <aside class="journal" aria-label="入戏手札"><section class="traveler"><div class="avatar" aria-hidden="true"><div class="avatar-pixel"></div></div><div><span class="section-eyebrow">THE STAND-IN</span><h2>无名戏客 <span>借身入戏</span></h2><div class="vitals"><span id="hp" aria-label="生命">♥ ♥ ♥</span><span id="sanity">理智 ◇ ◇</span></div></div><button class="small-icon" id="restart-button" aria-label="重新开始本关" title="重入此戏">↺</button></section>
        <section class="act-progress"><div><span class="section-eyebrow">今夜的戏</span><span class="paper-tag" id="act-label">候场</span></div><h2>《归客》</h2><span>一折未完，一念未散。</span><div class="chapter-dots" id="chapter-dots"><i></i><i></i><i></i><i></i></div></section>
        <section class="mission"><div class="section-heading"><span class="section-eyebrow">入戏手札</span><span class="gold-mark">记</span></div><h2>替他们，唱完这一折。</h2><p>循戏本，正脸谱，鸣送魂。<br>待帷幕落下，再走向那扇门。</p><div class="objectives" id="objectives"></div><button class="text-button" id="mission-button">展开戏本线索 <span>↗</span></button></section>
        <section class="inventory"><div class="section-heading"><span class="section-eyebrow">随身旧物</span><span class="inventory-capacity" id="bag-count">0 件</span></div><div class="bag-grid" id="bag-grid"></div><p id="bag-caption">借来的脸，记得还。</p></section>
        <section class="rules-strip"><span>三句叮嘱</span><p><i>壹</i> 空位留客 <i>贰</i> 脸谱归真 <i>叁</i> 落幕莫回头</p></section><section class="field-notes"><div class="section-heading"><span class="section-eyebrow">帷幕后，有人低语</span><span class="note-line"></span></div><div class="activity-log" id="activity-log" aria-live="polite"></div></section><div class="journal-foot">THE PLAY ENDS. THE STORY DOES NOT.<span>❖</span></div>
      </aside></div><footer class="site-footer"><span>无限世界 <span>／</span> 幽冥戏班 · 子夜折子</span><div><a href="https://wasteland-bazaar-embers-1025.cheekyotter1025.chatgpt.site" target="_blank" rel="noopener">另一段旅程：废土集市 ↗</a><button id="relay-button">接力存档 ↗</button></div></footer></main>
  <dialog id="game-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><span id="dialog-kicker">幽冥戏班</span><button class="close-button" id="dialog-close" aria-label="关闭对话">×</button></div><div id="dialog-body"></div><div class="dialog-actions" id="dialog-actions"></div></dialog>
  <dialog id="relay-dialog" aria-labelledby="relay-title"><div class="dialog-top"><span>INFINITE WORLDS / SAVE_STATE v2</span><button class="close-button" id="relay-close" aria-label="关闭前尘回响">×</button></div><h2 id="relay-title">你从哪一场梦里来？</h2><div id="opening-strip"></div><section id="echo-log"></section><section id="card-preview"></section><details id="debug-panel"><summary>接力联调工具</summary><pre id="debug-json"></pre><textarea id="debug-code" rows="3" aria-label="接力存档码"></textarea><div class="debug-row"><button id="debug-copy">复制当前存档码</button><button id="debug-import">导入存档码</button><button id="debug-reset">重置本关</button></div></details><p class="relay-note">自测出口接入主办方虚拟下家。正式接线时按接线表填写 game.js 顶部的 CONFIG。</p></dialog>
  <script>/* =========================================================\r
 * 无限世界 · SAVE_STATE v3 存档协议核心库\r
 * ---------------------------------------------------------\r
 * 整条世界线的关卡都靠这个文件衔接，队伍【不需要修改本文件】。\r
 *\r
 * 队伍常用 API：\r
 *   WL.readSave(levelNo)        读档（宽容：缺字段补默认、多字段忽略、类型自动转换）\r
 *   WL.consumeAny(items, type)  按类型取用上家道具，取不到返回 null → 触发本关兜底剧情\r
 *   WL.addItem(save, item)      往背包加道具 { id, name, type }\r
 *   WL.addClue(save, text)      加线索\r
 *   WL.setPlayer(save, patch)   改面板 { hp, max_hp, sanity, level, status, curses }\r
 *   WL.respawn()                恢复进入本关时的存档快照\r
 *   WL.failLevel(reason)        本关失败：生成遗物、墓碑和满血二代探索者\r
 *   WL.forcePass()              裁判强制结束本关并走遗物交接\r
 *   WL.completeLevel(config, save, opts)\r
 *                               校验出口 → 写档 → 过场 → 跳转；缺交接必填项返回 null\r
 *                               opts = { exitHook: '结尾一句话', nextUrl: '下一关页面地址' }\r
 *   WL.renderOpening(save)      前情提要条（自动呼应上家钩子）\r
 *   WL.renderSaveCard(save, level, world)   五行「通关存档卡」\r
 *   WL.goTo(url, save)          带存档与旅程进入页面（大厅首跳也使用）\r
 *   WL.mountDebug(save)         安装存档复制、导入、重置按钮\r
 *\r
 * 存档传递通道：localStorage（同一台电脑接力）\r
 *              + URL ?save=存档码&history=旅程码（跳转时自动附加，兼容 file:// 分页存储）\r
 *\r
 * 纯静态实现：file:// 双击即可运行，无任何依赖。\r
 * ========================================================= */\r
(function (global) {\r
  'use strict';\r
\r
  var STORAGE_KEY = 'wuxianliu_save_v3';\r
  var HISTORY_KEY = 'wuxianliu_history_v3';\r
  var LEGACY_STORAGE_KEY = 'wuxianliu_save_v2';\r
  var LEGACY_HISTORY_KEY = 'wuxianliu_history_v2';\r
  var memoryHistory = null;\r
  var memoryInitialSave = null;\r
  var SCHEMA = 'v3';\r
\r
  /* 道具类型词表（8 类，消费按类型匹配，不按名称匹配） */\r
  var ITEM_TYPES = ['key', 'tool', 'light', 'food', 'token', 'info', 'weapon', 'strange'];\r
  var TYPE_LABELS = {\r
    key: '钥匙', tool: '工具', light: '照明', food: '食物',\r
    token: '信物', info: '情报', weapon: '武器', strange: '异物'\r
  };\r
\r
  /* 通用道具效果词表（宪章第二章）：有限集合，不开放自由字段。\r
   * hp/sanity/max_hp/attack 的 value 必须在区间内；cleanse 只接受 true。 */\r
  var EFFECT_STATS = ['hp', 'sanity', 'max_hp', 'cleanse', 'attack'];\r
  var EFFECT_TRIGGERS = ['on_enter', 'passive'];\r
  var EFFECT_RANGE = { hp: [1, 2], sanity: [1, 1], max_hp: [1, 1], attack: [1, 1] };\r
  var ITEMS_MAX = 3;\r
\r
  /* ---------------- 基础工具 ---------------- */\r
\r
  function esc(text) {\r
    return String(text === undefined || text === null ? '' : text)\r
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')\r
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');\r
  }\r
\r
  function toInt(value, fallback, min) {\r
    var n = parseInt(value, 10);\r
    if (isNaN(n)) n = fallback;\r
    if (typeof min === 'number' && n < min) n = min;\r
    return n;\r
  }\r
\r
  function toStr(value, fallback) {\r
    if (value === undefined || value === null) return fallback || '';\r
    return String(value);\r
  }\r
\r
  function defaultSave(levelNo) {\r
    return {\r
      schema: SCHEMA,\r
      level: typeof levelNo === 'number' ? levelNo : 1,\r
      player: { hp: 3, max_hp: 3, sanity: 2, level: 1, status: 'normal', curses: [] },\r
      items: [],\r
      clues: [],\r
      exit_hook: '',\r
      prev_world: '',\r
      next_world: '',\r
      tombstone: {}\r
    };\r
  }\r
\r
  /* 效果词条校验：不合规返回 null → 道具降级为纯装饰，不参与结算 */\r
  function coerceEffect(raw) {\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
    var stat = toStr(raw.stat, '').trim().toLowerCase();\r
    if (EFFECT_STATS.indexOf(stat) === -1) return null;\r
    var trigger = toStr(raw.trigger, '').trim().toLowerCase();\r
    if (EFFECT_TRIGGERS.indexOf(trigger) === -1) return null;\r
    if (stat === 'cleanse') {\r
      if (raw.value !== true) return null;\r
      return { stat: stat, value: true, trigger: trigger };\r
    }\r
    var range = EFFECT_RANGE[stat], n = raw.value;
    if (typeof n !== 'number' || !Number.isInteger(n)) return null;\r
    if (!range || n < range[0] || n > range[1]) return null;\r
    return { stat: stat, value: n, trigger: trigger };\r
  }\r
\r
  /* 道具归一化：类型不在词表内 → 归为 strange（异物）；effect 不合规 → 丢弃 */\r
  function coerceItem(raw) {\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
    var type = toStr(raw.type, 'strange').trim().toLowerCase();\r
    if (ITEM_TYPES.indexOf(type) === -1) type = 'strange';\r
    var item = {\r
      id: toStr(raw.id, '').trim().slice(0,64) || 'item_' + Math.random().toString(36).slice(2, 8),\r
      name: (toStr(raw.name, '未知物品').trim() || '未知物品').slice(0, 32),\r
      type: type,\r
      relic: raw.relic === true\r
    };\r
    if (raw.desc !== undefined) item.desc = toStr(raw.desc, '').slice(0, 120);\r
    var effect = coerceEffect(raw.effect);\r
    if (effect) item.effect = effect;\r
    if (raw.durability !== undefined) item.durability = Math.max(0, toInt(raw.durability, 1, 0));\r
    return item;\r
  }\r
\r
  function coerceItems(raw) {\r
    if (!Array.isArray(raw)) return [];\r
    return raw.map(coerceItem).filter(Boolean).slice(-ITEMS_MAX);\r
  }\r
\r
  function coerceClues(raw) {\r
    if (!Array.isArray(raw)) return [];\r
    return raw.map(function (c) { return toStr(c, '').trim(); }).filter(function (c) { return c; });\r
  }\r
\r
  /* ---------------- 存档码（base64，用于 URL 传递与手动导入） ---------------- */\r
\r
  function toB64(str) {\r
    if (typeof btoa === 'function') return btoa(unescape(encodeURIComponent(str)));\r
    if (typeof Buffer !== 'undefined') return Buffer.from(str, 'utf-8').toString('base64');\r
    throw new Error('当前环境不支持 base64');\r
  }\r
  function fromB64(b64) {\r
    if (typeof atob === 'function') return decodeURIComponent(escape(atob(b64)));\r
    if (typeof Buffer !== 'undefined') return Buffer.from(b64, 'base64').toString('utf-8');\r
    throw new Error('当前环境不支持 base64');\r
  }\r
\r
  function encodeCode(save) {\r
    return toB64(JSON.stringify(save));\r
  }\r
\r
  function decodeCode(code) {\r
    try {\r
      return JSON.parse(fromB64(String(code).trim()));\r
    } catch (e) {\r
      return null;\r
    }\r
  }\r
\r
  /* ---------------- 旅程记录（供终局结算页回放） ---------------- */\r
\r
  /* 与存档分开存放：存档卡保持严格五栏，旅程回放数据走独立通道 */\r
  function readHistory() {\r
    try {\r
      var arr = memoryHistory;\r
      var m = global.location.search.match(/[?&]history=([^&]+)/);\r
      if (!Array.isArray(arr) && m) arr = decodeCode(decodeURIComponent(m[1]));\r
      if (!Array.isArray(arr)) {\r
        var raw = global.localStorage.getItem(HISTORY_KEY) || global.localStorage.getItem(LEGACY_HISTORY_KEY);\r
        arr = raw ? JSON.parse(raw) : [];\r
      }\r
      if (!Array.isArray(arr)) return [];\r
      return arr.map(function (h) {\r
        if (!h || typeof h !== 'object') return null;\r
        return {\r
          level: toInt(h.level, 0, 0),\r
          world: toStr(h.world, '？？？'),\r
          hook: toStr(h.hook, '')\r
        };\r
      }).filter(Boolean).slice(-64);\r
    } catch (e) { return []; }\r
  }\r
\r
  /* 每通完一关自动记录一条：第几关 · 什么世界 · 留下了什么结局 */\r
  function recordPassage(config, save) {\r
    var list = readHistory();\r
    list.push({\r
      level: toInt(config.level, 0, 0),\r
      world: toStr(config.world, '？？？'),\r
      hook: toStr(save.exit_hook, '')\r
    });\r
    if (list.length > 64) list = list.slice(-64); /* 安全上限 */\r
    memoryHistory = list;\r
    try {\r
      global.localStorage.setItem(HISTORY_KEY, JSON.stringify(list));\r
    } catch (e) { /* ignore */ }\r
  }\r
\r
  /* 开始新一局：清空旧数据，生成全场统一开局面板（命3 · 理智2 · 空背包） */\r
  function startRun(levelNo) {\r
    resetRun();\r
    var save = defaultSave(typeof levelNo === 'number' ? levelNo : 1);\r
    persist(save);\r
    return save;\r
  }\r
\r
  /* 清空本机全部运行数据（存档 + 旅程记录） */\r
  function resetRun() {\r
    memoryHistory = [];\r
    memoryInitialSave = null;\r
    try {\r
      global.localStorage.removeItem(STORAGE_KEY);\r
      global.localStorage.removeItem(HISTORY_KEY);\r
      global.localStorage.removeItem(LEGACY_STORAGE_KEY);\r
      global.localStorage.removeItem(LEGACY_HISTORY_KEY);\r
    } catch (e) { /* ignore */ }\r
  }\r
\r
  /* ---------------- 读档（宽容处理核心） ---------------- */\r
\r
  /* 缺字段补默认值、多字段一律忽略、类型自动转换 */\r
  function normalize(raw, levelNo) {\r
    var base = defaultSave(levelNo);\r
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return base;\r
    var player = raw.player && typeof raw.player === 'object' ? raw.player : {};\r
    var maxHp = Math.min(10, Math.max(1, toInt(player.max_hp, 3, 1)));\r
    var hp = Math.min(maxHp, toInt(player.hp, 3, 0));\r
    var status = toStr(player.status, hp <= 0 ? 'dead' : 'normal');\r
    if (['normal', 'wounded', 'cursed', 'dead', 'specter'].indexOf(status) === -1) status = 'normal';\r
    var tomb = raw.tombstone && typeof raw.tombstone === 'object' && !Array.isArray(raw.tombstone) ? raw.tombstone : {};\r
    return {\r
      schema: SCHEMA,\r
      level: typeof levelNo === 'number' ? levelNo : toInt(raw.level, 1, 0),\r
      world: toStr(raw.world, ''),\r
      player: {\r
        hp: hp,\r
        max_hp: maxHp,\r
        level: Math.min(10, toInt(player.level, 1, 1)),\r
        sanity: toInt(player.sanity, 2, 0),\r
        status: status,\r
        curses: Array.isArray(player.curses) ? player.curses.map(function (c) { return toStr(c, '').slice(0, 40); }).filter(Boolean).slice(0, 8) : [],\r
        deaths: toInt(player.deaths, 0, 0)\r
      },\r
      items: coerceItems(raw.items),\r
      /* 已结算的 on_enter 道具 id：防止换关卡或刷新时重复回血 */\r
      settled: Array.isArray(raw.settled) ? raw.settled.map(function (id) { return toStr(id, '').slice(0, 64); }).filter(Boolean).slice(-8) : [],\r
      clues: coerceClues(raw.clues).slice(-8),\r
      exit_hook: toStr(raw.exit_hook, ''),\r
      prev_world: toStr(raw.prev_world, ''),\r
      next_world: toStr(raw.next_world, ''),\r
      tombstone: {\r
        fallen_level: toInt(tomb.fallen_level, 0, 0),\r
        cause: toStr(tomb.cause, '').slice(0, 100),\r
        epitaph: toStr(tomb.epitaph, '').slice(0, 200)\r
      }\r
    };\r
  }\r
\r
  function persist(save) {\r
    try {\r
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));\r
    } catch (e) { /* 隐私模式等场景静默忽略，不影响游戏 */ }\r
  }\r
\r
  /* 读取优先级：URL ?save=存档码 → localStorage → 默认开局 */\r
  function readSave(levelNo) {\r
    var raw = null;\r
    try {\r
      var m = global.location.search.match(/[?&]save=([^&]+)/);\r
      if (m) {\r
        raw = decodeCode(decodeURIComponent(m[1]));\r
        if (raw) persist(normalize(raw, levelNo)); /* 落地本地，刷新不丢 */\r
      }\r
    } catch (e) { /* ignore */ }\r
    if (!raw) {\r
      try {\r
        var stored = global.localStorage.getItem(STORAGE_KEY) || global.localStorage.getItem(LEGACY_STORAGE_KEY);\r
        if (stored) raw = JSON.parse(stored);\r
      } catch (e) { /* ignore */ }\r
    }\r
    var save = applyEntryEffects(normalize(raw, levelNo));\r
    if (!memoryInitialSave) memoryInitialSave = normalize(save, levelNo);\r
    return save;\r
  }\r
\r
  function freezeSnapshot(value) {
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(function (key) { freezeSnapshot(value[key]); });
      Object.freeze(value);
    }
    return value;
  }
  function getInitialSave() {\r
    if (memoryInitialSave) return normalize(memoryInitialSave, null);\r
    return readSave();\r
  }\r
\r
  /* 通用道具 on_enter 结算：每件道具只结算一次（settled 标记随存档一路传递）。\r
   * passive 效果不改数值，由下一关玩法自行读取 save.items[].effect。 */\r
  function applyEntryEffects(save) {\r
    var current = normalize(save, null);\r
    var done = current.settled;\r
    current.items.forEach(function (it) {\r
      var fx = it.effect;\r
      if (!fx || fx.trigger !== 'on_enter' || done.indexOf(it.id) !== -1) return;\r
      if (fx.stat === 'hp') current.player.hp = Math.min(current.player.max_hp, current.player.hp + fx.value);\r
      else if (fx.stat === 'sanity') current.player.sanity = Math.max(0, current.player.sanity + fx.value);\r
      else if (fx.stat === 'max_hp') current.player.max_hp = Math.min(10, current.player.max_hp + fx.value);\r
      else if (fx.stat === 'cleanse' && current.player.curses.length) {\r
        current.player.curses.splice(0, 1);\r
        if (current.player.status === 'cursed') current.player.status = 'normal';\r
      }\r
      done.push(it.id);\r
    });\r
    current.settled = done.slice(-8);\r
    return current;\r
  }\r
\r
  function respawn() {\r
    var initial = applyEntryEffects(getInitialSave());\r
    initial.player.deaths = (initial.player.deaths || 0) + 1;\r
    memoryInitialSave = normalize(initial, null);\r
    persist(initial);\r
    return initial;\r
  }\r
\r
  /* 连续阵亡放水档位：0 正常 / 1 连死两次 / 2 连死三次以上；具体放水由选手实现 */\r
  function assist(save) {\r
    var n = toInt(save && save.player ? save.player.deaths : 0, 0, 0);\r
    return n >= 3 ? 2 : n >= 2 ? 1 : 0;\r
  }\r
\r
  /* ---------------- 游戏内编辑存档 ---------------- */\r
\r
  /* 按类型取用上家道具：命中则从背包移除并返回该道具；取不到返回 null，\r
   * 此时队伍必须走本关兜底剧情（评审「衔接分」硬性要求！） */\r
  function consumeAny(items, type) {\r
    if (!Array.isArray(items)) return null;\r
    for (var i = 0; i < items.length; i++) {\r
      if (items[i] && items[i].type === type) {\r
        return items.splice(i, 1)[0];\r
      }\r
    }\r
    return null;\r
  }\r
\r
  function addItem(save, item) {\r
    var rawEffect = item && typeof item === 'object' ? item.effect : null;\r
    var it = coerceItem(item);\r
    if (it) {\r
      if (rawEffect && !it.effect && typeof console !== 'undefined') {\r
        console.warn('[WL] 道具「' + it.name + '」的 effect 不符合宪章词表，已降级为纯装饰道具。');\r
      }\r
      save.items.push(it);\r
      if (save.items.length > ITEMS_MAX) {\r
        save.items = save.items.slice(-ITEMS_MAX);\r
        if (typeof console !== 'undefined') console.warn('[WL] 跨关道具最多 3 件，已丢弃最早的一件。');\r
      }\r
    }\r
    return save;\r
  }\r
\r
  function addClue(save, text) {\r
    var t = toStr(text, '');\r
    if (t) save.clues.push(t);\r
    return save;\r
  }\r
\r
  function setPlayer(save, patch) {\r
    if (!patch) return save;\r
    if (patch.max_hp !== undefined) save.player.max_hp = Math.min(10, Math.max(1, toInt(patch.max_hp, save.player.max_hp || 3, 1)));\r
    if (patch.hp !== undefined) save.player.hp = Math.min(save.player.max_hp || 3, toInt(patch.hp, save.player.hp, 0));\r
    if (patch.level !== undefined) save.player.level = Math.min(10, toInt(patch.level, save.player.level || 1, 1));\r
    if (patch.sanity !== undefined) save.player.sanity = toInt(patch.sanity, save.player.sanity, 0);\r
    if (patch.status !== undefined) save.player.status = toStr(patch.status, save.player.status);\r
    if (Array.isArray(patch.curses)) save.player.curses = patch.curses.slice(0, 8);\r
    return save;\r
  }\r
\r
  /* ---------------- 写档 → 过场演出 → 跳转 ---------------- */\r
\r
  /* 超量保留最近取得的内容，让本关的交接信息优先传给下家。 */\r
  function softValidate(save) {\r
    var warnings = [];\r
    if (save.items.length > 3) {\r
      save.items = save.items.slice(-3);\r
      warnings.push('道具超过 3 件，已优先保留最近取得的 3 件');\r
    }\r
    if (save.clues.length > 2) {\r
      save.clues = save.clues.slice(-2);\r
      warnings.push('线索超过 2 条，已优先保留最近取得的 2 条');\r
    }\r
    return warnings;\r
  }\r
\r
  /* 读档保持宽容；交接必填项缺失时明确提示，不写入无效出口。 */\r
  function validateExit(save, config, opts) {\r
    config = config || {};\r
    opts = opts || {};\r
    var errors = [];\r
    if (!save.items.length) errors.push('请为出口准备至少 1 件道具，并标注道具类型。');\r
    if (!save.clues.length) errors.push('请为出口准备至少 1 条本关线索。');\r
    if (!toStr(save.exit_hook, '').trim()) errors.push('请填写指向下一个世界的结尾一句话。');\r
    if (!toStr(config.world, '').trim()) errors.push('请填写本关世界名。');\r
    if (!toStr(config.nextWorld, '').trim()) errors.push('请填写下一关世界名。');\r
    if (!toStr(opts.nextUrl, '').trim()) errors.push('请填写下一关页面地址。');\r
    return errors;\r
  }\r
\r
  function showExitErrors(errors) {\r
    if (typeof document === 'undefined') return;\r
    var box = document.getElementById('wl-exit-errors');\r
    if (!box) {\r
      box = document.createElement('div');\r
      box.id = 'wl-exit-errors';\r
      (document.getElementById('finish-area') || document.body).appendChild(box);\r
    }\r
    box.innerHTML = errors.length ? '<div class="wl-warn" role="alert"><strong>交接尚未完成</strong><br>' + errors.map(esc).join('<br>') + '</div>' : '';\r
  }\r
\r
  /*\r
   * config = { level: 本关序号, world: 本关世界名, nextWorld: 下家世界名 }\r
   * save   = readSave 拿到、游戏过程中已修改的存档对象\r
   * opts   = { exitHook: '结尾一句话（必须指向下一签世界）', nextUrl: '下家页面地址', passViaUrl: 是否附加存档码（默认 true） }\r
   */\r
  function failLevel(reason, fallenSave, configOverride) {\r
    var config = configOverride || global.CONFIG || {};\r
    var current = fallenSave ? normalize(fallenSave, toInt(config.level, 1, 1)) : readSave(toInt(config.level, 1, 1));\r
    var cause = toStr(reason, '力竭倒地').slice(0, 100);\r
    var items = coerceItems(current.items);\r
    if (!items.length) {\r
      items = [{ id: 'relic_survival_knife', name: '前人的求生短刀', type: 'tool', relic: true }];\r
    } else {\r
      items = items.map(function (it) {\r
        it.relic = true;\r
        it.name = ('前人的' + it.name.replace(/^(前人的)+/, '')).slice(0, 32);\r
        return it;\r
      }).slice(0, 3);\r
    }\r
    var previous = current.tombstone || {};\r
    var marker = '[第' + current.level + '关] ' + cause;\r
    var relicSave = normalize({\r
      schema: SCHEMA,\r
      level: current.level + 1,\r
      world: current.world || config.world,\r
      player: { hp: 3, max_hp: 3, sanity: 2, level: 1, status: 'normal', curses: [] },\r
      items: items,\r
      clues: current.clues.length ? current.clues : ['前人倒在此处，留下了未解的谜题'],\r
      exit_hook: '【遗物交接】一代探索者在此长眠，新求生者拾起遗物踏入下一世界……',\r
      prev_world: current.world || config.world,\r
      next_world: config.nextWorld || current.next_world || '未知世界',\r
      tombstone: {\r
        fallen_level: current.level,\r
        cause: cause,\r
        epitaph: ((previous.epitaph ? previous.epitaph + ' | ' : '') + marker).slice(0, 200)\r
      }\r
    }, current.level + 1);\r
    persist(relicSave);\r
    recordPassage(config, relicSave);\r
    if (global.parent && global.parent !== global) {\r
      global.parent.postMessage({ type: 'IW_FAIL', reason: cause, fallenSave: current }, '*');\r
      global.parent.postMessage({ type: 'IW_SAVE', save: relicSave, history: readHistory(), failure: true }, '*');\r
    }\r
    if (config.nextUrl) showHandoffOverlay(config, relicSave, [], config.nextUrl, true);\r
    return relicSave;\r
  }\r
\r
  function forcePass() {\r
    return failLevel('时空裂隙坍缩（演示超时）');\r
  }\r
\r
  function completeLevel(config, save, opts) {\r
    opts = opts || {};\r
    config = config || {};\r
    if (global.CONFIG && global.parent && global.parent !== global) { config = global.CONFIG; opts.exitHook = config.exitHook; opts.nextUrl = config.nextUrl; }
    var current = normalize(save, toInt(config.level, 1, 1));\r
    if (current.player.hp <= 0 || current.player.status === 'dead') {\r
      return failLevel('探索者生命耗尽', save, config);\r
    }\r
    var candidate = normalize(save, toInt(config.level, 1, 1) + 1);\r
    candidate.player.deaths = 0;\r
    candidate.exit_hook = toStr(opts.exitHook, '').trim();\r
    candidate.prev_world = toStr(config.world, '').trim();\r
    candidate.next_world = toStr(config.nextWorld, '').trim();\r
    var warnings = softValidate(candidate);
    if (Array.isArray(save.items) && save.items.length > 3) warnings.push('道具超过 3 件，已保留最近 3 件');
    if (Array.isArray(save.clues) && save.clues.length > 2) warnings.push('线索超过 2 条，已保留最近 2 条');
    if (warnings.length && typeof console !== 'undefined') console.warn('[WL] ' + warnings.join('；'));\r
    var errors = validateExit(candidate, config, opts);\r
    showExitErrors(errors);\r
    if (errors.length) return null;\r
    Object.keys(candidate).forEach(function (key) { save[key] = candidate[key]; });\r
    persist(save);\r
    recordPassage(config, save); /* 旅程记录：终局结算页回放用 */\r
    if (global.parent && global.parent !== global) {\r
      global.parent.postMessage({ type: 'IW_COMPLETE', save: save, history: readHistory() }, '*');\r
    }\r
    showHandoffOverlay(config, save, warnings, opts.nextUrl, opts.passViaUrl !== false);\r
    return save;\r
  }\r
\r
  /* 替换旧参数、保留其他参数与锚点，导入不会再次读到旧 URL 存档。 */\r
  function transferUrl(nextUrl, save, history) {\r
    var parts = String(nextUrl).split('#');\r
    var hash = parts.length > 1 ? '#' + parts.slice(1).join('#') : '';\r
    var beforeHash = parts[0];\r
    var queryAt = beforeHash.indexOf('?');\r
    var base = queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt);\r
    var query = queryAt === -1 ? [] : beforeHash.slice(queryAt + 1).split('&').filter(function (p) {\r
      return p && !/^(save|history)(=|$)/.test(p);\r
    });\r
    query.push('save=' + encodeURIComponent(encodeCode(save)));\r
    query.push('history=' + encodeURIComponent(encodeCode(history)));\r
    return base + '?' + query.join('&') + hash;\r
  }\r
\r
  function jumpTo(nextUrl, save, passViaUrl) {\r
    if (!nextUrl) return;\r
    var url = nextUrl;\r
    if (passViaUrl) {\r
      url = transferUrl(nextUrl, save, readHistory());\r
    }\r
    global.location.href = url;\r
  }\r
\r
  /* 自动过场演出：世界线移动画面 + 上家结尾钩子 + 通关存档卡 */\r
  function showHandoffOverlay(config, save, warnings, nextUrl, passViaUrl) {\r
    if (typeof document === 'undefined') return; /* 非浏览器环境（如自动化测试）跳过 UI */\r
    var ov = document.createElement('div');\r
    ov.className = 'wl-overlay';\r
    var seconds = 8;\r
    ov.innerHTML =\r
      '<div class="wl-handoff">' +\r
        '<div class="wl-handoff-kicker">世 界 线 移 动</div>' +\r
        '<div class="wl-handoff-route">' + esc(config.world) + ' → ' + esc(config.nextWorld || '？？？') + '</div>' +\r
        '<div class="wl-handoff-hook">“' + esc(save.exit_hook || '……') + '”</div>' +\r
        renderSaveCard(save, config.level, config.world) +\r
        (warnings.length ? '<div class="wl-warn">提示：' + warnings.map(esc).join('；') + '</div>' : '') +\r
        '<button class="wl-btn" id="wl-next-btn" type="button">进入下一关（' + seconds + 's）</button>' +\r
      '</div>';\r
    document.body.appendChild(ov);\r
    var done = false;\r
    function go() {\r
      if (done) return;\r
      done = true;\r
      clearInterval(timer);\r
      jumpTo(nextUrl, save, passViaUrl);\r
    }\r
    document.getElementById('wl-next-btn').onclick = go;\r
    var timer = setInterval(function () {\r
      seconds--;\r
      var btn = document.getElementById('wl-next-btn');\r
      if (btn) btn.textContent = '进入下一关（' + seconds + 's）';\r
      if (seconds <= 0) { clearInterval(timer); go(); }\r
    }, 1000);\r
  }\r
\r
  /* ---------------- 渲染组件 ---------------- */\r
\r
  function describeBag(items) {\r
    if (!items.length) return '空';\r
    return items.map(function (i) {\r
      return esc(i.name) + '（' + (TYPE_LABELS[i.type] || i.type) + '类）';\r
    }).join('、');\r
  }\r
\r
  /* 前情提要条：每关开场自动渲染，零成本完成衔接最低保障 */\r
  function renderOpening(save) {\r
    if (save.prev_world) {\r
      return '<div class="wl-opening">前情提要：你从『' + esc(save.prev_world) + '』的结局里醒来——' +\r
        (save.exit_hook ? '“' + esc(save.exit_hook) + '”' : '（上家没有留下结尾钩子）') +\r
        '<br>随身行李：' + describeBag(save.items) + '</div>';\r
    }\r
    return '<div class="wl-opening">前情提要：（未读到上家存档，按默认开局：命 3 · 理智 2 · 空背包。' +\r
      '你可能是本世界线第 1 关，或直接打开了本页。）</div>';\r
  }\r
\r
  /* 五行「通关存档卡」 */\r
  function renderSaveCard(save, level, world) {\r
    var lv = (level === undefined || level === null) ? save.level : level;\r
    var w = world || save.prev_world || '？？？';\r
    var cluesHtml = save.clues.length ? save.clues.map(esc).join('<br>') : '无';\r
    return '<div class="wl-card">' +\r
      '<div class="wl-card-title">【第 ' + toInt(lv, 1, 1) + ' 关 · ' + esc(w) + ' 通关存档卡】</div>' +\r
      '<div class="wl-row">命：' + save.player.hp + '/' + (save.player.max_hp || 3) + '　　等级：' + (save.player.level || 1) + '/10　　理智：' + save.player.sanity + '</div>' +\r
      '<div class="wl-row">背包：' + describeBag(save.items) + '</div>' +\r
      '<div class="wl-row">线索：' + cluesHtml + '</div>' +\r
      '<div class="wl-row">结尾一句话：' + (save.exit_hook ? esc(save.exit_hook) : '（未填写）') + '</div>' +\r
      '<div class="wl-row wl-next">（下一关：' + esc(save.next_world || '未知') + '）</div>' +\r
      '</div>';\r
  }\r
\r
  /* ---------------- 调试工具 ---------------- */\r
\r
  var debug = {\r
    json: function (save) {\r
      try { return JSON.stringify(save, null, 2); } catch (e) { return '{}'; }\r
    },\r
    code: function (save) { return encodeCode(save); },\r
    importCode: function (code) {\r
      var raw = decodeCode(code);\r
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;\r
      var save = normalize(raw, null);\r
      persist(save);\r
      return save;\r
    },\r
    reset: function () {\r
      try { global.localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }\r
    }\r
  };\r
\r
  function mountDebug(save) {\r
    var jsonEl = document.getElementById('debug-json');\r
    var codeEl = document.getElementById('debug-code');\r
    function sync() {\r
      jsonEl.textContent = debug.json(save);\r
      codeEl.value = debug.code(save);\r
    }\r
    sync();\r
    document.getElementById('debug-copy').onclick = function () {\r
      sync();\r
      codeEl.select();\r
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }\r
    };\r
    document.getElementById('debug-import').onclick = function () {\r
      var restored = debug.importCode(codeEl.value);\r
      if (!restored) { global.alert('存档码无法识别'); return; }\r
      /* 单独的存档码不含旅程；清掉当前 URL 的旧旅程，避免串线。 */\r
      resetRun();\r
      persist(restored);\r
      jumpTo(global.location.href, restored, true);\r
    };\r
    document.getElementById('debug-reset').onclick = function () {\r
      jumpTo(global.location.href, startRun(save.level), true);\r
    };\r
  }\r
\r
  /* ---------------- 内置样式（过场/存档卡，避免被队伍样式影响） ---------------- */\r
\r
  var LIB_CSS = [\r
    '.wl-card{background:#0f1724;border:1px solid #2a3b57;border-left:3px solid #35e08c;border-radius:10px;padding:14px 16px;color:#e8eef8;font:14px/23px "PingFang SC","Microsoft YaHei",system-ui,sans-serif;max-width:560px;box-sizing:border-box;}',\r
    '.wl-card-title{font-weight:600;margin-bottom:8px;color:#9ff5c8;}',\r
    '.wl-row{margin:2px 0;}',\r
    '.wl-next{color:#8fa3bf;font-size:12px;margin-top:6px;}',\r
    '.wl-opening{background:#141d2e;border:1px dashed #33455f;border-radius:8px;padding:10px 14px;color:#c6d4e8;font:14px/22px "PingFang SC","Microsoft YaHei",sans-serif;margin:0 0 16px;}',\r
    '.wl-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(5,10,18,.94);display:flex;align-items:center;justify-content:center;z-index:9999;animation:wl-fade .35s ease;}',\r
    '.wl-handoff{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;max-width:640px;}',\r
    '.wl-handoff-kicker{letter-spacing:12px;color:#35e08c;font:600 14px/20px sans-serif;}',\r
    '.wl-handoff-route{color:#e8eef8;font:600 20px/28px "PingFang SC","Microsoft YaHei",sans-serif;}',\r
    '.wl-handoff-hook{color:#aebdd4;font:15px/24px "PingFang SC","Microsoft YaHei",sans-serif;font-style:italic;max-width:520px;}',\r
    '.wl-warn{color:#f0b429;font:12px/18px "PingFang SC","Microsoft YaHei",sans-serif;max-width:560px;text-align:left;}',\r
    '.wl-btn{background:#35e08c;color:#04140b;border:none;border-radius:8px;padding:10px 26px;font:600 15px/22px "PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;}',\r
    '.wl-btn:hover{filter:brightness(1.08);}',\r
    '@keyframes wl-fade{from{opacity:0}to{opacity:1}}'\r
  ].join('');\r
\r
  function injectStyles() {\r
    try {\r
      if (!document.getElementById('wl-lib-style')) {\r
        var s = document.createElement('style');\r
        s.id = 'wl-lib-style';\r
        s.textContent = LIB_CSS;\r
        document.head.appendChild(s);\r
      }\r
    } catch (e) { /* ignore */ }\r
  }\r
  if (typeof document !== 'undefined') injectStyles();\r
\r
  /* 外链作品没有云端注入桥时，也由核心库完成双向握手与裁判指令。 */\r
  if (typeof global.addEventListener === 'function') {\r
    global.addEventListener('message', function (event) {\r
      if (global.parent && event.source !== global.parent) return;
      var message = event.data;\r
      if (!message || typeof message !== 'object') return;\r
      if (message.type === 'IW_INIT_SAVE' || message.type === 'iw-init') {\r
        if (message.config && typeof message.config === 'object') global.CONFIG = message.config;
        var incoming = applyEntryEffects(normalize(message.save || readSave(), message.save && message.save.level));\r
        memoryInitialSave = normalize(incoming, incoming.level);\r
        persist(incoming);\r
        if (typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
          global.dispatchEvent(new global.CustomEvent('iw-save-ready', { detail: incoming }));\r
        }\r
      }\r
      if (message.type !== 'IW_ADMIN_COMMAND') return;\r
      var command = String(message.command || message.action || '').toLowerCase();\r
      if (command === 'force_pass') command = 'forcepass';\r
      if (command === 'heal_player') command = 'heal';\r
      if (command === 'heal' || command === 'respawn') {\r
        var restored = command === 'respawn' ? respawn() : readSave();\r
        if (command === 'heal') {\r
          setPlayer(restored, { hp: restored.player.max_hp || 3, status: 'normal' });\r
          persist(restored);\r
        }\r
        if (typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
          global.dispatchEvent(new global.CustomEvent('iw-admin', { detail: { command: command, save: restored } }));\r
        }\r
      } else if (command === 'skip' || command === 'forcepass') {\r
        forcePass();\r
      } else if (command === 'reload' && global.location && typeof global.location.reload === 'function') {\r
        global.location.reload();\r
      } else if (command === 'audio' && typeof global.dispatchEvent === 'function' && typeof global.CustomEvent === 'function') {\r
        global.dispatchEvent(new global.CustomEvent('iw-admin', { detail: { command: 'audio' } }));\r
      }\r
    });\r
    global.addEventListener('load', function () {\r
      if (global.parent && global.parent !== global) global.parent.postMessage({ type: 'IW_READY' }, '*');\r
    });\r
  }\r
\r
  /* ---------------- 导出 ---------------- */\r
\r
  global.WL = {\r
    version: SCHEMA,\r
    ITEM_TYPES: ITEM_TYPES,\r
    TYPE_LABELS: TYPE_LABELS,\r
    EFFECT_STATS: EFFECT_STATS,\r
    readSave: readSave,\r
    getInitialSave: getInitialSave,\r
    respawn: respawn,\r
    assist: assist,\r
    settle: applyEntryEffects,\r
    normalize: normalize,\r
    completeLevel: completeLevel,\r
    failLevel: failLevel,\r
    forcePass: forcePass,\r
    validateExit: validateExit,\r
    goTo: function (url, save) { jumpTo(url, save, true); },\r
    mountDebug: mountDebug,\r
    consumeAny: consumeAny,\r
    addItem: addItem,\r
    addClue: addClue,\r
    setPlayer: setPlayer,\r
    renderOpening: renderOpening,\r
    renderSaveCard: renderSaveCard,\r
    readHistory: readHistory,\r
    startRun: startRun,\r
    resetRun: resetRun,\r
    escapeHtml: esc,\r
    encodeCode: encodeCode,\r
    decodeCode: decodeCode,\r
    debug: debug\r
  };\r
})(typeof window !== 'undefined' ? window : globalThis);\r
<\/script><script>/* 幽冥戏班：独立于 DOM 与接力协议的关卡规则。 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OperaModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var nodes = [
    { id: 'ticket', kind: 'npc', name: '守门纸人', x: 160, y: 435 },
    { id: 'script', kind: 'script', name: '旧戏本', x: 240, y: 230 },
    { id: 'masks', kind: 'masks', name: '脸谱架', x: 788, y: 278 },
    { id: 'seat', kind: 'seat', name: '空座', x: 474, y: 385 },
    { id: 'gong', kind: 'gong', name: '铜锣', x: 720, y: 455 },
    { id: 'stage', kind: 'stage', name: '戏台', x: 480, y: 234 },
    { id: 'lantern', kind: 'lantern', name: '引魂灯', x: 110, y: 285 },
    { id: 'exit', kind: 'exit', name: '幕后之门', x: 480, y: 125 }
  ];
  var solids = [
    { x: 329, y: 70, w: 105, h: 126 },
    { x: 526, y: 70, w: 105, h: 126 },
    { x: 66, y: 132, w: 93, h: 90 },
    { x: 194, y: 173, w: 92, h: 31 },
    { x: 749, y: 193, w: 100, h: 47 },
    { x: 101, y: 370, w: 100, h: 31 },
    { x: 651, y: 396, w: 98, h: 22 },
    { x: 330, y: 285, w: 54, h: 30 },
    { x: 420, y: 285, w: 54, h: 30 },
    { x: 510, y: 285, w: 54, h: 30 },
    { x: 600, y: 285, w: 54, h: 30 },
    { x: 330, y: 346, w: 54, h: 30 },
    { x: 600, y: 346, w: 54, h: 30 }
  ];
  var maskOrder = ['white', 'red', 'black'];
  var rhythmOrder = ['drum', 'gong', 'bell', 'gong'];
  var maskNames = { white: '白面', red: '红面', black: '黑面' };
  var beatNames = { drum: '鼓', gong: '锣', bell: '铃' };

  function integer(value, fallback) {
    var n = Number(value);
    return value !== null && value !== '' && Number.isFinite(n)
      ? Math.max(0, Math.floor(n)) : fallback;
  }

  function create(incomingSave, hasLight) {
    var incoming = incomingSave && incomingSave.player || {};
    var sanity = Math.max(1, integer(incoming.sanity, 2)) + (hasLight ? 1 : 0);
    return {
      player: { x: 480, y: 525, dir: 'down', moving: false },
      hp: Math.max(1, integer(incoming.hp, 3)),
      sanity: sanity,
      maxSanity: Math.max(3, sanity),
      elapsed: 0,
      started: false,
      lost: false,
      performed: false,
      ending: null,
      flags: {},
      learned: false,
      masksCollected: [],
      casting: [null, null, null],
      maskSolved: false,
      rhythm: [],
      gongSolved: false,
      act: 0
    };
  }

  // 戏院没有隐藏的生存倒计时，演出完成后也不再累计旅途用时。
  function tick(state, seconds) {
    var dt = Number(seconds);
    if (state.started && !state.lost && !state.performed && !state.ending && Number.isFinite(dt) && dt > 0) state.elapsed += dt;
    return [];
  }

  function fail(message) { return { ok: false, message: message }; }
  function finish(state, message, kind, duration) {
    tick(state, duration === undefined ? 6 : duration);
    return { ok: true, message: message, kind: kind || 'story' };
  }
  function costSanity(state, message, clear) {
    state.sanity = Math.max(0, state.sanity - 1);
    if (clear === 'casting') state.casting = [null, null, null];
    if (clear === 'rhythm') state.rhythm = [];
    // 先记录此次判定的时间，再冻结失神状态。
    var result = finish(state, message + '理智 -1。', 'mistake');
    if (state.sanity === 0) {
      state.lost = true;
      state.player.moving = false;
      result.message += '你被戏声困住了；到引魂灯前重新点灯，可以找回神志。';
    }
    return result;
  }

  function action(state, id) {
    if (state.ending) return fail('这一折戏已经落幕，下一段世界正在等你。');
    if (state.lost && id !== 'relight') return fail(state.hp === 0
      ? '你已无力继续这一折戏，请从入口重新开始。'
      : '你暂时迷失在戏声里，先到引魂灯前找回神志。');
    if (state.performed && id !== 'ending_release' && id !== 'ending_inherit') return fail('送魂戏已经唱完，去幕后之门选择告别吧。');

    if (id === 'ticket') {
      if (state.flags.ticket) return fail('冥戏票已经收好，纸人不会再收第二次票。');
      state.flags.ticket = true;
      return finish(state, '纸人递来一张冥戏票：空座不可坐，脸谱不可乱，锣鼓不可错。');
    }

    if (id === 'read_script') {
      if (state.learned) return finish(state, '再读戏本：白面饰伪言者，红面饰守誓者，黑面饰断是非者；送魂四拍是鼓、锣、铃、锣。', 'story', 0);
      state.learned = true;
      state.flags.script = true;
      state.act = Math.max(state.act, 1);
      return finish(state, '你读懂了旧戏本：左起伪言者、守誓者、断是非者，对应白面、红面、黑面；落幕四拍为鼓、锣、铃、锣。');
    }

    if (id === 'take_masks') {
      if (!state.flags.ticket) return fail('先向守门纸人领一张冥戏票，才能借取脸谱。');
      if (state.masksCollected.length) return fail('三张脸谱已经借出，就在你的行囊里。');
      state.masksCollected = ['red', 'white', 'black'];
      state.flags.masks = true;
      return finish(state, '你借下红、白、黑三张脸谱。它们等着回到戏本里各自的位置。', 'item');
    }

    var assignment = /^assign_([0-2])_(red|white|black)$/.exec(id);
    if (assignment) {
      if (!state.masksCollected.length) return fail('脸谱架还没打开，先借下三张脸谱。');
      if (state.maskSolved) return fail('三张脸谱已经归位，不要再惊动台上的人。');
      var slot = Number(assignment[1]);
      var mask = assignment[2];
      if (state.masksCollected.indexOf(mask) === -1) return fail('行囊里没有这张脸谱。');
      var previous = state.casting[slot];
      var occupied = state.casting.indexOf(mask);
      if (occupied !== -1 && occupied !== slot) state.casting[occupied] = previous;
      state.casting[slot] = mask;
      return finish(state, '第 ' + (slot + 1) + ' 位换上了' + maskNames[mask] + '。', 'selection', 0);
    }

    if (id === 'check_masks') {
      if (!state.learned) return fail('先读旧戏本，认清三位戏中人的身份。');
      if (!state.masksCollected.length) return fail('你还没有向脸谱架借取脸谱。');
      if (state.maskSolved) return fail('脸谱已经归位，这一关考验不必再来一次。');
      if (state.casting.length !== 3 || state.casting.some(function (mask) { return !maskNames[mask]; }) || new Set(state.casting).size !== 3) return fail('请先为三个角色各放一张不同的脸谱。');
      if (!state.casting.every(function (mask, index) { return mask === maskOrder[index]; })) return costSanity(state, '脸谱的眼角同时转向你。身份错位了，三张脸谱又退回暗处。', 'casting');
      state.maskSolved = true;
      state.act = Math.max(state.act, 2);
      return finish(state, '白面藏谎，红面守誓，黑面断是非。脸谱终于归位，戏台深处传来一声轻叹。', 'puzzle');
    }

    var beat = /^beat_(drum|gong|bell)$/.exec(id);
    if (beat) {
      if (!state.maskSolved) return fail('先让三张脸谱归位，锣鼓才肯听你的指挥。');
      if (state.gongSolved) return fail('送魂四拍已经奏对，不必再打断余音。');
      if (state.rhythm.length >= 4) return fail('四拍已齐，先确认，或清空后重新敲击。');
      state.rhythm.push(beat[1]);
      return finish(state, '第 ' + state.rhythm.length + ' 拍：' + beatNames[beat[1]] + '。', 'beat', 0);
    }

    if (id === 'clear_rhythm') {
      if (state.gongSolved) return fail('已经奏对的送魂四拍不会被抹去。');
      state.rhythm = [];
      return finish(state, '铜锣的余音散去，可以重新起拍。', 'selection', 0);
    }

    if (id === 'check_rhythm') {
      if (!state.maskSolved) return fail('先让脸谱归位，才能奏送魂四拍。');
      if (state.gongSolved) return fail('送魂四拍已经奏对，台上的影子正在等你。');
      if (state.rhythm.length !== 4) return fail('送魂曲需要完整的四拍，先把四拍敲齐。');
      if (!state.rhythm.every(function (beat, index) { return beat === rhythmOrder[index]; })) return costSanity(state, '锣鼓错了拍，台下传来不属于活人的应声。再看看戏本里的四拍。', 'rhythm');
      state.gongSolved = true;
      state.act = Math.max(state.act, 3);
      return finish(state, '鼓起，锣应，铃过，锣收。四拍相接，台下的影子安静下来。', 'puzzle');
    }

    if (id === 'respect_seat') {
      if (state.flags.seat) return fail('这张空座已经留给原来的客人了。');
      state.flags.seat = true;
      return finish(state, '你向空座欠身，给看不见的客人让了路。椅上的薄霜悄悄散去。');
    }

    if (id === 'sit_seat') {
      if (state.flags.seatWarning) return fail('椅子已经给过警告，不要再坐下。');
      state.flags.seatWarning = true;
      state.hp = Math.max(0, state.hp - 1);
      var seated = finish(state, '你刚要落座，一只冰冷的手便将你推开。生命 -1。这张座位有它的主人。', 'mistake');
      if (state.hp === 0) {
        state.lost = true;
        state.player.moving = false;
        seated.message += '你已无力起身，请从戏院入口重新开始。';
      }
      return seated;
    }

    if (id === 'relight') {
      if (state.hp === 0) return fail('引魂灯能找回神志，却扶不起耗尽的身体。请重新开始本关。');
      if (state.sanity >= state.maxSanity && !state.lost) return fail('心神已经安定，灯火会在这里等你。');
      state.sanity = Math.min(state.maxSanity, Math.max(0, state.sanity) + 1);
      state.lost = false;
      state.flags.lantern = true;
      return finish(state, '你在引魂灯前重新点起一缕火。理智 +1，戏声中的杂念渐渐远去。', 'restore');
    }

    if (id === 'perform') {
      if (!state.flags.ticket) return fail('纸人还未放行，先领取冥戏票。');
      if (!state.learned) return fail('台词还未认清，先读懂旧戏本。');
      if (!state.maskSolved) return fail('三位戏中人的脸谱还没归位。');
      if (!state.gongSolved) return fail('送魂四拍还没奏对，暂时不能登台。');
      if (!state.flags.seat) return fail('台下还有客人无座。先向院中空座欠身让路。');
      state.performed = true;
      state.flags.performed = true;
      state.act = 4;
      state.player.moving = false;
      return finish(state, '你替戏中人唱完最后一句。红帷缓缓落下，无名的观众终于起身，幕后之门开了。', 'performance', 0);
    }

    if (id === 'ending_release' || id === 'ending_inherit') {
      if (!state.performed) return fail('这一折送魂戏尚未落幕，幕后之门还不能通行。');
      state.ending = id === 'ending_release' ? 'release' : 'inherit';
      if (state.ending === 'inherit') {
        state.sanity = Math.max(0, state.sanity - 1);
        return finish(state, '你留下自己的名字，接过戏班的脸谱。理智 -1；今夜之后，余音将随你远行。', 'ending', 0);
      }
      return finish(state, '你归还脸谱，不曾回头。灯火替戏中人照亮归途，也照出你的下一段世界。', 'ending', 0);
    }

    return fail('这件事不在今夜的戏本里。');
  }

  return { create: create, action: action, tick: tick, nodes: nodes, solids: solids };
});
<\/script><script>/* Original pixel scenery for 幽冥戏班 · 子夜折子. No external assets. */
(function (global) {
  'use strict';

  const C = {
    night: '#101924', floor: '#26353b', joint: '#1c2b32', stone: '#34444a',
    stoneLight: '#43545a', teal: '#506f73', mist: '#8ba8a5', ink: '#111b24',
    wood: '#4b3435', woodLight: '#71504a', woodDark: '#2d252e',
    red: '#aa463e', brightRed: '#d86548', deepRed: '#612f37',
    gold: '#b6965e', lightGold: '#e6c385', bone: '#ded5b5', dimBone: '#b8b69e',
    jade: '#71938a', cyan: '#a2c4ad', outline: '#14222b'
  };

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function seeded(seed) {
    let n = seed >>> 0;
    return function () { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; return n / 4294967296; };
  }

  function line(ctx, x1, y1, x2, y2, color, size) {
    const w = size || 2;
    const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    if (!n) { rect(ctx, x1, y1, w, w, color); return; }
    for (let i = 0; i <= n; i += 2) rect(ctx, x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, w, w, color);
  }

  function text(ctx, value, x, y, color, size, align) {
    ctx.font = '600 ' + (size || 11) + 'px "Microsoft YaHei","PingFang SC",sans-serif';
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color || C.dimBone;
    ctx.fillText(value, Math.round(x), Math.round(y));
  }

  function steppedShadow(ctx, x, y, w, h) {
    rect(ctx, x - w / 2 + 3, y - h / 2, w - 6, h, '#0d1721aa');
    rect(ctx, x - w / 2, y - h / 2 + 3, w, h - 6, '#0d1721aa');
  }

  function squareGlow(ctx, x, y, radius, color) {
    for (let i = 4; i > 0; i--) {
      ctx.globalAlpha = 0.016 * (5 - i);
      rect(ctx, x - radius * i / 4, y - radius * i / 6, radius * i / 2, radius * i / 3, color);
    }
    ctx.globalAlpha = 1;
  }

  function lantern(ctx, x, y, scale, frame, spirit) {
    const s = scale || 1;
    const dx = frame ? Math.round(Math.sin(frame) * 2) : 0;
    x += dx;
    const shell = spirit ? '#6a9d90' : '#bd5444';
    const shine = spirit ? '#bbd7b0' : '#e79459';
    line(ctx, x, y - 17 * s, x, y - 2 * s, C.gold, s);
    rect(ctx, x - 6 * s, y - 3 * s, 12 * s, 2 * s, C.gold);
    rect(ctx, x - 9 * s, y, 18 * s, 16 * s, C.deepRed);
    rect(ctx, x - 11 * s, y + 3 * s, 22 * s, 10 * s, shell);
    rect(ctx, x - 8 * s, y + 1 * s, 16 * s, 14 * s, shell);
    rect(ctx, x - 5 * s, y + 2 * s, 3 * s, 12 * s, shine);
    rect(ctx, x + 2 * s, y + 2 * s, 2 * s, 12 * s, shine);
    rect(ctx, x - 7 * s, y + 16 * s, 14 * s, 2 * s, C.gold);
    rect(ctx, x - s, y + 18 * s, 2 * s, 10 * s, C.gold);
    rect(ctx, x - 3 * s, y + 26 * s, 6 * s, 4 * s, spirit ? C.cyan : C.red);
  }

  function roofTile(ctx, x, y, w, color) {
    rect(ctx, x, y, w, 7, color || '#304047');
    for (let i = 3; i < w - 3; i += 10) {
      rect(ctx, x + i, y, 2, 7, '#4b5a5c');
      rect(ctx, x + i - 2, y + 5, 7, 2, '#1d2b34');
    }
  }

  function mask(ctx, x, y, kind, s) {
    const scale = s || 1;
    const main = kind === 'red' ? '#c45047' : kind === 'white' ? '#dcd6b9' : '#29323b';
    const dark = kind === 'black' ? '#a6b3a0' : '#282c32';
    const r = (a, b, w, h, c) => rect(ctx, x + a * scale, y + b * scale, w * scale, h * scale, c);
    r(-7, -8, 14, 14, C.outline); r(-5, -10, 10, 18, C.outline);
    r(-5, -7, 10, 13, main); r(-3, -9, 6, 17, main);
    r(-5, -3, 4, 2, dark); r(1, -3, 4, 2, dark);
    r(-4, -5, 3, 2, dark); r(2, -5, 3, 2, dark);
    r(-1, -5, 2, 7, kind === 'red' ? '#e9c78c' : kind === 'white' ? '#b6403e' : '#dfd6b5');
    r(-3, 4, 6, 2, dark); r(-1, 6, 2, 2, C.gold);
    r(-3, -8, 2, 2, '#f2e0b9');
  }

  function pillar(ctx, x, y, h, color) {
    rect(ctx, x - 8, y + 4, 18, h, C.woodDark);
    rect(ctx, x - 7, y, 14, h, color || C.deepRed);
    rect(ctx, x - 6, y + 4, 3, h - 8, '#a04a42');
    rect(ctx, x - 11, y - 3, 22, 7, C.gold);
    rect(ctx, x - 10, y + h - 8, 20, 8, '#535557');
    rect(ctx, x - 12, y + h, 24, 7, '#2c353d');
  }

  function chair(ctx, x, y, occupied, ghostPhase, facing) {
    steppedShadow(ctx, x + 5, y + 4, 55, 14);
    rect(ctx, x - 21, y - 23, 42, 6, '#302b32');
    rect(ctx, x - 19, y - 24, 38, 4, C.woodLight);
    rect(ctx, x - 18, y - 21, 4, 18, C.wood);
    rect(ctx, x + 14, y - 21, 4, 18, C.wood);
    rect(ctx, x - 16, y - 12, 32, 4, '#664b43');
    rect(ctx, x - 23, y - 7, 5, 18, '#61483f');
    rect(ctx, x + 18, y - 7, 5, 18, '#61483f');
    rect(ctx, x - 20, y + 3, 40, 5, C.woodLight);
    rect(ctx, x - 18, y + 8, 4, 9, C.wood);
    rect(ctx, x + 14, y + 8, 4, 9, C.wood);
    rect(ctx, x - 16, y + 4, 32, 2, C.gold);
    if (occupied) {
      const bob = Math.round(Math.sin(ghostPhase || 0) * 2);
      ctx.globalAlpha = 0.58;
      rect(ctx, x - 11, y - 24 + bob, 22, 19, '#678883');
      rect(ctx, x - 8, y - 30 + bob, 16, 11, '#829b8d');
      rect(ctx, x - 5, y - 32 + bob, 10, 3, '#a3b7a0');
      rect(ctx, x - 14, y - 16 + bob, 5, 14, '#4b7271');
      rect(ctx, x + 9, y - 16 + bob, 5, 14, '#4b7271');
      rect(ctx, x - 11, y - 2 + bob, 22, 6, '#526f71');
      if (facing === 'front') {
        rect(ctx, x - 5, y - 26 + bob, 3, 2, C.ink);
        rect(ctx, x + 2, y - 26 + bob, 3, 2, C.ink);
      }
      ctx.globalAlpha = 1;
    }
  }

  function person(ctx, x, y, type, dir, stride, phase) {
    x = Math.round(x); y = Math.round(y);
    const walking = stride || 0;
    const ghost = type === 'paper';
    steppedShadow(ctx, x + 3, y + 1, type === 'actor' ? 34 : 28, 10);
    const r = (a, b, w, h, c) => rect(ctx, x + a, y + b, w, h, c);
    if (type === 'actor') {
      r(-14, -30, 28, 24, C.deepRed); r(-11, -33, 22, 28, '#ba5149');
      r(-8, -37, 16, 14, '#e3d5b0'); r(-10, -40, 20, 7, '#253642');
      r(-13, -43, 26, 5, '#bb9d67'); r(-8, -47, 16, 6, '#2c4c55');
      r(-2, -50, 4, 5, C.lightGold);
      r(-5, -34, 3, 2, C.ink); r(3, -34, 3, 2, C.ink);
      r(-7, -30, 4, 2, C.red); r(4, -30, 4, 2, C.red);
      r(-1, -29, 3, 4, C.red); r(-3, -22, 6, 13, C.lightGold);
      r(-16, -25, 6, 15, C.red); r(10, -25, 6, 15, C.red);
      const sway = Math.round(Math.sin(phase || 0) * 4);
      r(-30, -21 + sway, 17, 7, '#ddd7bc'); r(-36, -19 + sway, 9, 15, '#ddd7bc');
      r(13, -20 - sway, 21, 7, '#ddd7bc'); r(28, -17 - sway, 8, 13, '#ddd7bc');
      r(-11, -9, 22, 6, C.gold); r(-9, -3, 6, 5, '#202c36'); r(4, -3, 6, 5, '#202c36');
      return;
    }
    const coat = ghost ? '#b8bfaa' : '#426f72';
    const lit = ghost ? '#d6d8b8' : '#6d9d92';
    const shade = ghost ? '#798b81' : '#2a505d';
    r(-10, -32, 20, 29, C.outline); r(-12, -26, 24, 21, C.outline);
    r(-8, -25, 16, 20, coat); r(-10, -23, 5, 15, shade); r(7, -23, 5, 15, shade);
    r(-9, -8, 18, 5, shade); r(-7, -5, 6, 7 + Math.max(0, walking), '#21343d');
    r(3, -5, 6, 7 + Math.max(0, -walking), '#21343d');
    r(-8, 1 + Math.max(0, walking), 8, 3, '#182733'); r(2, 1 + Math.max(0, -walking), 8, 3, '#182733');
    r(-6, -38, 14, 14, ghost ? C.bone : '#c49b77'); r(-8, -36, 18, 8, ghost ? C.bone : '#c49b77');
    if (ghost) {
      r(-9, -42, 19, 7, '#2e454a'); r(-5, -47, 12, 7, '#384e50'); r(-2, -44, 4, 4, C.gold);
      r(-6, -32, 4, 2, '#3e5558'); r(3, -32, 4, 2, '#3e5558'); r(-1, -28, 4, 2, '#8e4941');
      r(-3, -22, 6, 16, '#ae5650'); r(-11, -16, 4, 9, '#d1ceae'); r(9, -16, 4, 9, '#d1ceae');
    } else {
      r(-8, -41, 18, 6, '#2d3f4b'); r(-11, -36, 24, 4, '#354a53'); r(-6, -43, 14, 3, '#60776d');
      r(-1, -25, 7, 6, '#c47355'); r(4, -21, 5, 8, '#b4614d'); r(-6, -21, 3, 11, lit);
      r(-12, -19, 5, 10, '#b18c6d'); r(9, -19, 5, 10, '#b18c6d');
      if (dir !== 'up') {
        if (dir !== 'right') r(-4, -31, 2, 2, '#2b3439');
        if (dir !== 'left') r(5, -31, 2, 2, '#2b3439');
      } else {
        r(-6, -33, 14, 8, '#38494d'); r(-3, -25, 9, 5, '#c47355');
      }
      r(-9, -12, 18, 3, '#b39b6c'); r(0, -12, 3, 3, '#e0bd79');
    }
  }

  function makeBackground(ctx) {
    const random = seeded(460617);
    rect(ctx, 0, 0, 960, 600, C.night);
    // The enclosing wall, with little hints of a dark village beyond it.
    for (let x = 0; x < 960; x += 27) {
      const height = 10 + Math.floor(random() * 30);
      rect(ctx, x, 47 - height, 24, height + 21, '#17232f');
      if (random() > .7) rect(ctx, x + 7, 48 - height, 3, 5, '#6c6b4e');
    }
    rect(ctx, 0, 65, 960, 39, '#2d3b40');
    for (let row = 0; row < 3; row++) for (let x = -24; x < 984; x += 48) {
      const xx = x + (row % 2 ? 24 : 0);
      rect(ctx, xx + 2, 69 + row * 11, 45, 9, row % 2 ? '#344247' : '#303d42');
      rect(ctx, xx + 3, 69 + row * 11, 41, 1, '#435054');
    }
    roofTile(ctx, 0, 59, 960, '#26383f');
    rect(ctx, 0, 100, 960, 500, C.floor);
    // Courtyard paving. Patterns are intentionally hard-edged rather than filtered.
    for (let row = 0; row < 24; row++) for (let col = 0; col < 35; col++) {
      const x = col * 29 + (row % 2 ? -14 : 0), y = 102 + row * 21;
      const shade = random();
      rect(ctx, x + 1, y + 1, 27, 19, shade < .25 ? '#2b3c41' : shade > .81 ? '#304148' : '#29393f');
      if (random() > .64) rect(ctx, x + 3, y + 3, 10 + random() * 12, 1, '#4c5b592b');
    }
    rect(ctx, 439, 174, 82, 381, '#3d4d50');
    rect(ctx, 447, 176, 66, 379, '#465459');
    for (let row = 0; row < 21; row++) {
      const y = 179 + row * 18;
      rect(ctx, 447, y, 66, 2, '#2d3f46');
      rect(ctx, row % 2 ? 474 : 479, y + 2, 2, 16, '#34464a');
      rect(ctx, 450, y + 3, 18, 1, '#65717055');
    }
    // Weathered side walls and low courtyard rails.
    for (const x of [15, 925]) {
      rect(ctx, x, 94, 20, 476, '#273339'); rect(ctx, x + 3, 94, 7, 476, '#3e4b4d');
      for (let y = 110; y < 570; y += 35) {
        rect(ctx, x - 2, y, 24, 7, '#4a5451'); rect(ctx, x + 2, y + 7, 16, 3, '#172932');
      }
    }
    rect(ctx, 22, 560, 394, 13, '#2f3e43'); rect(ctx, 544, 560, 393, 13, '#2f3e43');
    roofTile(ctx, 22, 553, 394); roofTile(ctx, 544, 553, 393);
    // Main stage: a wide, layered roof and red curtains around a passable center.
    steppedShadow(ctx, 487, 241, 406, 37);
    rect(ctx, 303, 77, 354, 143, '#252631'); rect(ctx, 319, 76, 322, 131, '#3e2d35');
    rect(ctx, 431, 94, 98, 99, '#182830');
    rect(ctx, 443, 101, 74, 90, '#13252c');
    rect(ctx, 451, 111, 58, 79, '#263a3a');
    rect(ctx, 460, 119, 40, 72, '#354b44');
    rect(ctx, 473, 123, 13, 69, '#65725633');
    rect(ctx, 326, 88, 105, 104, '#742f37'); rect(ctx, 529, 88, 105, 104, '#742f37');
    for (let i = 0; i < 7; i++) {
      rect(ctx, 329 + i * 14, 91, 7, 101, i % 2 ? '#9b403d' : '#80323a');
      rect(ctx, 531 + i * 14, 91, 7, 101, i % 2 ? '#80323a' : '#9b403d');
      rect(ctx, 331 + i * 14, 185 + i % 2 * 2, 10, 7, C.gold);
      rect(ctx, 531 + i * 14, 185 + i % 2 * 2, 10, 7, C.gold);
    }
    for (let i = 0; i < 4; i++) {
      rect(ctx, 397 + i * 8, 111 + i * 18, 30 - i * 7, 22, '#672f39');
      rect(ctx, 529 - i * 3, 111 + i * 18, 34 - i * 7, 22, '#672f39');
    }
    rect(ctx, 322, 82, 316, 19, '#6f3038');
    for (let i = 0; i < 17; i++) {
      rect(ctx, 325 + i * 18, 95, 15, 4 + (i % 2) * 3, C.red);
      rect(ctx, 330 + i * 18, 100, 4, 3, C.gold);
    }
    rect(ctx, 303, 197, 354, 22, '#59403c'); rect(ctx, 306, 198, 348, 3, '#b08158');
    for (let x = 309; x < 654; x += 25) {
      rect(ctx, x, 202, 23, 11, '#6a4940'); rect(ctx, x + 2, 203, 19, 1, '#86614d');
    }
    rect(ctx, 302, 217, 356, 8, '#292c31'); rect(ctx, 434, 218, 92, 7, '#758078');
    rect(ctx, 431, 225, 98, 7, '#3b5051'); rect(ctx, 425, 232, 110, 6, '#5c6b63');
    rect(ctx, 420, 238, 120, 5, '#2a3c42');
    pillar(ctx, 314, 78, 142); pillar(ctx, 646, 78, 142);
    rect(ctx, 289, 72, 382, 13, '#60363a'); rect(ctx, 286, 68, 388, 6, C.gold);
    // Pixel-step flying eaves.
    rect(ctx, 305, 30, 350, 9, '#344850'); rect(ctx, 293, 38, 374, 8, '#3e5459');
    rect(ctx, 280, 46, 400, 9, '#31454d'); rect(ctx, 266, 55, 428, 9, '#273c47');
    rect(ctx, 255, 62, 450, 7, '#1c303d');
    rect(ctx, 250, 58, 28, 8, '#476163'); rect(ctx, 245, 51, 13, 9, '#526b68');
    rect(ctx, 241, 44, 8, 9, C.gold); rect(ctx, 682, 58, 28, 8, '#476163');
    rect(ctx, 703, 51, 13, 9, '#526b68'); rect(ctx, 711, 44, 8, 9, C.gold);
    for (let y = 35; y < 66; y += 8) {
      const inset = (64 - y) * 1.5;
      for (let x = 264 + inset; x < 698 - inset; x += 13) {
        rect(ctx, x, y, 9, 2, '#657573'); rect(ctx, x + 7, y + 2, 2, 4, '#1a2a35');
      }
    }
    rect(ctx, 402, 48, 156, 40, '#1d242c'); rect(ctx, 406, 51, 148, 34, C.gold);
    rect(ctx, 409, 54, 142, 28, '#382a2e'); rect(ctx, 413, 58, 134, 20, '#4f3032');
    text(ctx, '幽 冥 戏 班', 480, 68, C.lightGold, 17);
    rect(ctx, 316, 104, 18, 92, '#442a30'); rect(ctx, 627, 104, 18, 92, '#442a30');
    ['一','曲','未','了'].forEach((v, i) => text(ctx, v, 326, 119 + i * 20, '#c4a672', 11));
    ['故','人','莫','归'].forEach((v, i) => text(ctx, v, 635, 119 + i * 20, '#c4a672', 11));
    // Left changing room and an old opera manuscript.
    rect(ctx, 186, 149, 107, 24, '#29383e'); roofTile(ctx, 181, 143, 116);
    pillar(ctx, 192, 166, 52, '#304f52'); pillar(ctx, 288, 166, 52, '#304f52');
    rect(ctx, 198, 168, 86, 28, '#5b4741'); rect(ctx, 194, 192, 94, 9, C.woodDark);
    rect(ctx, 194, 174, 94, 5, '#9b7d58'); rect(ctx, 204, 198, 5, 24, C.wood); rect(ctx, 273, 198, 5, 24, C.wood);
    rect(ctx, 218, 175, 40, 23, '#b9b69b'); rect(ctx, 220, 176, 16, 20, '#dad1b0');
    rect(ctx, 240, 176, 16, 20, '#d2c6a5'); rect(ctx, 237, 176, 3, 20, '#8a876f');
    for (let i = 0; i < 4; i++) {
      rect(ctx, 223, 180 + i * 4, 10, 1, '#817e69'); rect(ctx, 244, 180 + i * 4, 9, 1, '#817e69');
    }
    rect(ctx, 261, 175, 7, 19, '#2e3c40'); rect(ctx, 258, 175, 13, 4, '#9e8e61');
    text(ctx, '旧戏本 · 未完折子', 240, 158, '#c3bd98', 10);
    // Right wing: the hanging masks, ribbons and costume cabinet.
    rect(ctx, 743, 165, 114, 13, '#463437'); roofTile(ctx, 738, 158, 125);
    rect(ctx, 749, 182, 7, 60, C.woodLight); rect(ctx, 845, 182, 7, 60, C.woodLight);
    rect(ctx, 752, 180, 96, 6, C.gold); rect(ctx, 756, 192, 90, 43, '#222d33');
    for (let i = 0; i < 3; i++) {
      rect(ctx, 769 + i * 29, 186, 2, 10, '#9d916e');
      mask(ctx, 770 + i * 29, 209, ['red', 'white', 'black'][i], 1.35);
      rect(ctx, 768 + i * 29, 222, 4, 13, i === 1 ? '#b8b9a0' : C.deepRed);
    }
    rect(ctx, 743, 239, 115, 8, '#5b4240'); rect(ctx, 746, 245, 8, 16, '#3d3539'); rect(ctx, 846, 245, 8, 16, '#3d3539');
    text(ctx, '借 一 张 面，唱 一 段 命', 800, 174, '#d0b789', 9);
    // Ancient tree: angular branches and cold foliage.
    steppedShadow(ctx, 113, 229, 120, 24);
    rect(ctx, 101, 143, 19, 79, '#41403c'); rect(ctx, 108, 122, 17, 95, '#605447');
    rect(ctx, 111, 146, 4, 66, '#8b7150'); rect(ctx, 100, 212, 37, 8, '#4d4e43');
    line(ctx, 115, 155, 72, 120, '#5d5546', 8); line(ctx, 118, 151, 152, 104, '#5d5546', 9);
    line(ctx, 108, 135, 102, 88, '#4b4d42', 8); line(ctx, 103, 106, 77, 88, '#4b4d42', 5);
    const foliage = [[58,96,43,34],[78,71,43,42],[105,88,43,37],[132,84,34,43],[64,123,41,35],[119,118,45,37],[91,111,40,42]];
    foliage.forEach((p, i) => {
      rect(ctx, p[0] + 5, p[1], p[2] - 10, p[3], i % 2 ? '#324d4b' : '#2b4344');
      rect(ctx, p[0], p[1] + 6, p[2], p[3] - 13, i % 2 ? '#355450' : '#304b48');
      rect(ctx, p[0] + 7, p[1] + 5, p[2] - 20, 4, '#557065');
    });
    for (let i = 0; i < 25; i++) {
      const x = 57 + random() * 110, y = 80 + random() * 75;
      rect(ctx, x, y, 4, 3, '#69827655');
    }
    // Shrine beneath the tree, burning a cold guide flame.
    rect(ctx, 89, 239, 42, 8, '#394c51'); rect(ctx, 96, 244, 28, 26, '#2b4048');
    rect(ctx, 101, 251, 18, 20, '#5a746d'); rect(ctx, 105, 248, 10, 27, '#a4bd96');
    rect(ctx, 88, 268, 44, 8, '#5d6c64'); rect(ctx, 82, 275, 56, 7, '#253e46');
    // Ticket booth and paper charms.
    steppedShadow(ctx, 156, 415, 133, 18);
    rect(ctx, 96, 351, 109, 16, '#48363a'); roofTile(ctx, 90, 344, 121);
    pillar(ctx, 103, 368, 43); pillar(ctx, 199, 368, 43);
    rect(ctx, 107, 370, 88, 27, '#67453d'); rect(ctx, 109, 373, 84, 3, '#b18c5e');
    rect(ctx, 112, 391, 78, 9, '#3f3035');
    rect(ctx, 121, 374, 29, 18, '#bcb797'); rect(ctx, 124, 377, 22, 12, '#d4c7a1');
    rect(ctx, 128, 380, 14, 2, '#8a7358'); rect(ctx, 161, 375, 14, 13, '#8b493c');
    text(ctx, '请 对 号 入 座', 151, 359, C.lightGold, 10);
    // Gong stand at the right, with a visible mallet and red cloth.
    rect(ctx, 650, 378, 6, 40, '#735649'); rect(ctx, 745, 378, 6, 40, '#735649');
    rect(ctx, 649, 376, 102, 7, C.gold); rect(ctx, 657, 386, 86, 3, '#bd925d');
    rect(ctx, 693, 384, 3, 10, '#c1a275'); rect(ctx, 679, 392, 34, 33, '#735c45');
    rect(ctx, 674, 398, 44, 21, '#a28455'); rect(ctx, 681, 393, 30, 31, '#bb9f65');
    rect(ctx, 686, 398, 20, 21, '#d4b578'); rect(ctx, 690, 403, 12, 12, '#a78551');
    rect(ctx, 692, 405, 8, 8, '#e3c98b'); rect(ctx, 677, 418, 38, 5, '#6f5846');
    rect(ctx, 650, 416, 13, 6, '#3f4140'); rect(ctx, 738, 416, 13, 6, '#3f4140');
    line(ctx, 731, 393, 744, 421, '#b09164', 3); rect(ctx, 728, 389, 9, 8, '#9a4840');
    rect(ctx, 661, 389, 7, 32, '#843a3e');
    // Audience rows leave the broad central aisle open.
    [[357,309],[447,309],[537,309],[627,309],[357,370],[627,370]].forEach(p => chair(ctx, p[0], p[1], false));
    chair(ctx, 474, 366, false);
    rect(ctx, 461, 361, 26, 13, '#d2c4a1'); rect(ctx, 464, 364, 20, 1, '#9d8063');
    rect(ctx, 466, 367, 16, 1, '#9d8063'); text(ctx, '客', 474, 368, '#764d41', 9);
    // Red side rugs and small backstage piles.
    for (const x of [62, 854]) {
      rect(ctx, x, 318, 37, 103, '#4f3439'); rect(ctx, x + 3, 321, 31, 97, '#6a3b3e');
      for (let y = 326; y < 415; y += 14) rect(ctx, x + 7, y, 23, 2, '#a76a4866');
      rect(ctx, x + 4, 319, 29, 2, C.gold); rect(ctx, x + 4, 419, 29, 2, C.gold);
    }
    [[270,469],[793,487],[212,304],[845,332]].forEach((p, index) => {
      steppedShadow(ctx, p[0] + 3, p[1] + 7, 32, 13);
      rect(ctx, p[0] - 13, p[1] - 16, 26, 25, '#51413b'); rect(ctx, p[0] - 10, p[1] - 13, 20, 19, '#725545');
      rect(ctx, p[0] - 15, p[1] - 18, 30, 4, '#997650'); rect(ctx, p[0] - 3, p[1] - 15, 4, 23, '#b79b6b');
      rect(ctx, p[0] - 12, p[1] - 2, 24, 3, '#3c3435');
      if (index % 2 === 0) rect(ctx, p[0] - 9, p[1] - 25, 17, 8, '#baae89');
    });
    // Fallen leaves, folded paper money and tiny cracks.
    for (let i = 0; i < 150; i++) {
      const x = 42 + random() * 876, y = 110 + random() * 435;
      if (x > 303 && x < 659 && y < 245) continue;
      const paper = i % 6 === 0;
      rect(ctx, x, y, paper ? 6 : 3, paper ? 4 : 2, paper ? '#b6ad8877' : '#8c816155');
      if (paper) rect(ctx, x + 2, y + 1, 2, 2, '#5b5b4988');
      if (i % 13 === 0) { rect(ctx, x + 3, y + 7, 15, 1, '#172932'); rect(ctx, x + 15, y + 8, 5, 1, '#172932'); }
    }
    // Entry gateway, a subdued route back to the unknown.
    rect(ctx, 423, 542, 8, 40, '#69524a'); rect(ctx, 529, 542, 8, 40, '#69524a');
    rect(ctx, 417, 537, 126, 8, '#33474d'); rect(ctx, 431, 545, 98, 16, '#28383e');
    text(ctx, '子 时 · 戏 院 入 口', 480, 554, '#b09f7b', 9);
  }

  class OperaRenderer {
    constructor(canvas, nodes, solids) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;
      this.nodes = nodes || [];
      this.solids = solids || [];
      this.background = document.createElement('canvas');
      this.background.width = 960; this.background.height = 600;
      const ctx = this.background.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      makeBackground(ctx);
      this.reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    label(ctx, node, active, state) {
      const gone = node.id === 'ticket' && state.flags && state.flags.ticket;
      const name = node.id === 'exit' && !state.ending ? '幕后之门 · 封' : node.name;
      const w = Math.max(48, name.length * 11 + 20);
      const y = node.y + (node.id === 'exit' ? 8 : 16);
      rect(ctx, node.x - w / 2 - 1, y - 8, w + 2, 20, active ? '#b69b64' : '#52646299');
      rect(ctx, node.x - w / 2, y - 7, w, 18, active ? '#d3c9a6' : '#192b33df');
      rect(ctx, node.x - w / 2 + 3, y - 5, 2, 14, active ? '#8b4c41' : '#9b835e');
      text(ctx, name, node.x + 2, y + 2, active ? '#283d42' : gone ? '#92a39b' : '#d7c9a6', 10);
    }

    render(state, nowMs, target, nearestId) {
      const ctx = this.ctx;
      const time = this.reducedMotion ? 0 : (Number(nowMs) || 0) / 1000;
      const flags = state.flags || {};
      const player = state.player || { x: 480, y: 525, dir: 'down', moving: false };
      ctx.clearRect(0, 0, 960, 600);
      ctx.drawImage(this.background, 0, 0);

      // A few low, stepped patches of fog never obscure the walkable central aisle.
      for (let i = 0; i < 6; i++) {
        const x = (time * (3 + i % 3) + i * 187) % 1220 - 160;
        const y = 115 + i * 69 + Math.round(Math.sin(time * .2 + i) * 5);
        rect(ctx, x + 15, y, 104, 5, '#8aafa611');
        rect(ctx, x, y + 5, 165, 5, '#8aafa60d');
        rect(ctx, x + 35, y + 10, 114, 3, '#8aafa60a');
      }

      // Square light pools give lanterns a warm falloff without smoothing the art.
      const lamps = [[284,113,1.25],[676,113,1.25],[53,295,.9],[905,295,.9],[221,464,.9],[811,463,.9]];
      lamps.forEach((p, i) => {
        squareGlow(ctx, p[0], p[1] + 13, 55, '#d87341');
        lantern(ctx, p[0], p[1], p[2], time * .8 + i);
      });
      line(ctx, 45, 246, 187, 243, '#68756a', 1);
      line(ctx, 775, 243, 911, 247, '#68756a', 1);
      lantern(ctx, 110, 240, 1.05, time * .65, true);
      if (flags.lantern) {
        squareGlow(ctx, 110, 274, 57, '#bad7a4');
        rect(ctx, 106, 252, 10, 15, '#afcfa5'); rect(ctx, 109, 245 + Math.round(Math.sin(time * 2) * 2), 4, 17, '#d9e7b6');
      }

      // The waiting audience grows clearer as the three acts proceed.
      const act = Number(state.act) || 0;
      const guests = [[357,309],[447,309],[537,309],[627,309],[357,370],[627,370]];
      guests.forEach((p, i) => chair(ctx, p[0], p[1], i < 3 + act, time * .7 + i));
      chair(ctx, 474, 366, !!flags.seat, time * .8, 'front');
      if (!flags.seat) {
        rect(ctx, 464, 360, 21, 12, '#c2baa0'); text(ctx, '客', 474, 366, '#7f5948', 10);
      }

      // A singer remains on the boards; white sleeves sway in the quiet air.
      person(ctx, 480 + Math.round(Math.sin(time * .4) * 3), 188, 'actor', 'down', 0, time * 1.2);
      if (state.maskSolved) {
        [0, 1, 2].forEach((i) => {
          rect(ctx, 424 + i * 54, 92, 3, 6, '#d4c698');
          mask(ctx, 425 + i * 54, 104, ['red', 'white', 'black'][i], .8);
        });
      }
      if (state.gongSolved) {
        rect(ctx, 686, 403, 20, 11, '#efcf88');
        const pulse = Math.floor(time * 2) % 3;
        for (let i = 0; i < 3; i++) rect(ctx, 723 + i * 5, 398 - i * 3, 2, 8 + (i + pulse) % 3 * 2, '#dbc28277');
      }
      // Scroll readability and a tiny guiding mote reward inspection.
      if (flags.script || state.learned) {
        rect(ctx, 219, 176, 38, 20, '#d8d2af');
        rect(ctx, 236, 176, 2, 20, '#837d62');
        for (let i = 0; i < 4; i++) rect(ctx, 223, 180 + i * 4, 9, 1, '#7b7760');
        squareGlow(ctx, 240, 195, 30, '#d0cf98');
      }

      const people = [{ x: 160, y: 435, type: 'paper', dir: 'down', stride: 0 }];
      people.push({ x: player.x, y: player.y, type: 'player', dir: player.dir, stride: player.moving ? (Math.sin(time * 15) > 0 ? 3 : -3) : 0 });
      people.sort((a, b) => a.y - b.y).forEach(p => person(ctx, p.x, p.y, p.type, p.dir, p.stride));

      // The player's travelling lamp makes them immediately identifiable in the night.
      const px = player.x + 19, py = player.y - 18;
      if (flags.lantern) {
        squareGlow(ctx, player.x, player.y - 11, 47, '#a8d3ac');
        rect(ctx, px - 2, py - 3, 7, 10, '#8ea990'); rect(ctx, px, py - 2, 3, 7, '#e2dfb4');
      }
      rect(ctx, player.x - 5, player.y - 57, 10, 2, '#d6c38c');
      rect(ctx, player.x - 3, player.y - 55, 6, 2, '#d6c38c');
      rect(ctx, player.x - 1, player.y - 53, 2, 2, '#d6c38c');

      if (target && Number.isFinite(target.x) && Number.isFinite(target.y)) {
        const s = 8 + (Math.sin(time * 4) > 0 ? 2 : 0), x = Math.round(target.x), y = Math.round(target.y);
        rect(ctx, x - s, y - s, 6, 2, C.lightGold); rect(ctx, x - s, y - s, 2, 6, C.lightGold);
        rect(ctx, x + s - 4, y - s, 6, 2, C.lightGold); rect(ctx, x + s, y - s, 2, 6, C.lightGold);
        rect(ctx, x - s, y + s, 6, 2, C.lightGold); rect(ctx, x - s, y + s - 4, 2, 6, C.lightGold);
        rect(ctx, x + s - 4, y + s, 6, 2, C.lightGold); rect(ctx, x + s, y + s - 4, 2, 6, C.lightGold);
      }

      if (state.ending || flags.performed) {
        squareGlow(ctx, 480, 133, 150, '#a0c297');
        rect(ctx, 458, 105, 45, 86, '#759a8188'); rect(ctx, 468, 112, 25, 79, '#bdd0a255');
        for (let i = 0; i < 10; i++) {
          const yy = 188 - (time * 12 + i * 17) % 96;
          rect(ctx, 457 + i % 4 * 14, yy, 2, 4, '#d9ddb4');
        }
      }

      this.nodes.forEach(node => this.label(ctx, node, node.id === nearestId, state));
      if (nearestId) {
        const node = this.nodes.find(n => n.id === nearestId);
        if (node) {
          const y = node.y - (node.kind === 'npc' ? 60 : 32);
          rect(ctx, node.x - 8, y, 16, 13, '#d9cfac'); rect(ctx, node.x - 2, y + 12, 4, 3, '#d9cfac');
          text(ctx, '···', node.x, y + 5, '#4c6262', 11);
        }
      }

      // Paper fragments and fireflies move sparingly; the important geometry stays clear.
      for (let i = 0; i < 16; i++) {
        const x = (i * 137 + time * (4 + i % 3)) % 1000 - 20;
        const y = 113 + i * 83 % 417 + Math.sin(time * .45 + i) * 9;
        if (i % 3) rect(ctx, x, y, 2, 2, '#b6c5a655');
        else { rect(ctx, x, y, 5, 3, '#d7c7a066'); rect(ctx, x + 2, y + 1, 1, 1, '#8e7f6a'); }
      }
      // Mild, stepped edge shading maintains the hand-pixelled look.
      rect(ctx, 0, 0, 960, 6, '#0b1726aa'); rect(ctx, 0, 0, 8, 600, '#0b172666');
      rect(ctx, 952, 0, 8, 600, '#0b172666'); rect(ctx, 0, 591, 960, 9, '#0b172688');
    }
  }

  global.OperaRenderer = OperaRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
<\/script><script>/* 当前示范链：废土集市（第1关）→ 幽冥戏班（第2关）。世界签06并非关序。 */
var CONFIG = {
  level: 2,
  world: '幽冥戏班',
  prevWorld: '废土集市',
  nextWorld: '待接线世界',
  nextUrl: '../dev-tools/virtual-downstream.html',
  passViaUrl: true
};

(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = WL.escapeHtml;
  var model = OperaModel;
  var canvas = $('game-canvas');
  var renderer = new OperaRenderer(canvas, model.nodes, model.solids);
  var entry = WL.readSave(CONFIG.level), fingerprint = WL.encodeCode(entry);
  var sessionKey = 'ghost_opera_session_v1';
  var state, save, echo, logs = [], finished = false, paused = false;
  var keys = {}, path = [], target = null, pendingNode = null, near = null;
  var lastTime = 0, saveTimer = 0, toastTimer = 0, currentEntity = null;
  var soundOn = false, audioContext = null, lastFootstep = 0, demoTimer = null;
  var maskNames = { white: '白面', red: '红面', black: '黑面' };
  var maskColors = { white: '#d7cda4', red: '#ae4c43', black: '#759196' };
  var beatNames = { drum: '鼓', gong: '锣', bell: '铃' };

  function freshState() {
    save = WL.normalize(JSON.parse(JSON.stringify(entry)), CONFIG.level);
    var light = WL.consumeAny(save.items, 'light');
    state = model.create(save, !!light);
    echo = light ? '你举起从「' + (entry.prev_world || '上个世界') + '」带来的「' + light.name + '」。它在院门前化作一盏青灯，替你守住一分清明。理智 +1。' : '手边没有照明物。守门纸人替你点亮一盏纸灯：「拿稳了。这里的人，认灯不认脸。」没有旧物，也能走完这出戏。';
    if (entry.prev_world === '废土集市') echo = '电台里的戏腔已经近在耳边，门后的红灯笼一盏盏亮起。' + echo + ' 纸人朝你作揖：「锈风来的客，今夜的替班位给你留着。」';
    if (!entry.player.hp || !entry.player.sanity) echo += ' 灯火托住你摇摇欲坠的神思，将不足 1 的面板恢复到 1。';
    logs = [{ time: '23:00', text: '锣响三更，抵达梨园旧院。先去西南找守门纸人。' }];
  }

  function initialize() {
    freshState();
    try {
      var stored = JSON.parse(localStorage.getItem(sessionKey) || 'null');
      if (stored && stored.v === 1 && stored.fingerprint === fingerprint && stored.state && stored.state.player && stored.state.flags && Array.isArray(stored.state.casting) && Array.isArray(stored.state.masksCollected) && Array.isArray(stored.state.rhythm) && Array.isArray(stored.logs) && !stored.finished) {
        state = stored.state; state.player.moving = false;
        save = WL.normalize(stored.relay, CONFIG.level); logs = stored.logs; echo = stored.echo || echo;
      }
    } catch (e) { /* 无本地存储时可完整游玩，并使用 URL 接力。 */ }
    $('opening-strip').innerHTML = WL.renderOpening(entry);
    $('echo-log').textContent = echo;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\\n\\n' : '') + echo;
    $('intro-note').hidden = state.started;
    WL.mountDebug(save); $('debug-reset').onclick = confirmRestart;
    renderUI();
    if (state.lost) showLost();
    else if (state.ending) showEnding();
    else if (state.performed) showCurtain();
  }

  function clockText() {
    var minutes = 23 * 60 + Math.floor(state.elapsed / 8);
    return String(Math.floor(minutes / 60) % 24).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
  }

  function persist() {
    if (finished) return;
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    try {
      localStorage.setItem(sessionKey, JSON.stringify({ v: 1, fingerprint: fingerprint, state: state, relay: save, echo: echo, logs: logs, finished: false }));
      $('save-status').innerHTML = '<i></i> 前尘自动记下';
    } catch (e) { $('save-status').textContent = '当前浏览器未开放本地存储'; }
  }

  function addLog(message) { logs.unshift({ time: clockText(), text: message }); logs = logs.slice(0, 20); renderUI(); }
  function toast(message) {
    $('toast').textContent = message; $('toast').hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { $('toast').hidden = true; }, 3400);
  }

  function maskIcon(color) { return '<i class="mini-mask" style="--mask-color:' + maskColors[color] + '" aria-hidden="true"></i>'; }

  function renderUI() {
    $('hp').textContent = '♥ '.repeat(Math.min(state.hp, 8)) + '♡ '.repeat(Math.max(0, 3 - state.hp));
    $('hp').setAttribute('aria-label', '生命 ' + state.hp);
    $('sanity').textContent = '理智 ' + state.sanity;
    $('clock').textContent = clockText();
    $('weather-text').textContent = state.performed ? '夜戏将散' : state.gongSolved ? '雾 · 锣声已定' : '阴 · 有客来';
    $('act-label').textContent = ['候场', '寻谱', '正面', '鸣锣', '落幕'][state.act] || '候场';
    $('chapter-dots').innerHTML = Array.from({ length: 4 }, function (_, i) { return '<i class="' + (state.act > i ? 'done' : '') + '"></i>'; }).join('');
    var tasks = [
      { done: state.learned, name: '读懂旧戏本', hint: '西北角 · 旧戏本' },
      { done: state.maskSolved, name: '让三张脸谱归真', hint: '东侧脸谱架 · 依据戏本分配' },
      { done: state.gongSolved, name: '敲响四拍送魂锣', hint: '东南铜锣 · 按戏本记下的顺序' }
    ];
    $('objectives').innerHTML = tasks.map(function (t) { return '<div class="objective ' + (t.done ? 'complete' : '') + '" title="' + t.hint + '"><span class="check">' + (t.done ? '✓' : '') + '</span><span>' + t.name + '</span><span class="objective-count">' + (t.done ? '1' : '0') + '/1</span></div>'; }).join('');
    var bag = [];
    if (state.flags.ticket) bag.push({ name: '冥戏票', html: '▤' });
    if (state.learned) bag.push({ name: '《归客》残卷', html: '冊' });
    state.masksCollected.forEach(function (m) { bag.push({ name: maskNames[m] + (state.maskSolved ? ' · 已归位' : ' · 待归位'), html: maskIcon(m) }); });
    $('bag-count').textContent = bag.length + ' 件';
    $('bag-grid').innerHTML = Array.from({ length: 5 }, function (_, i) { var item = bag[i]; return '<div class="bag-slot ' + (item ? 'filled' : '') + '" title="' + esc(item ? item.name : '空位') + '" aria-label="' + esc(item ? item.name : '空位') + '">' + (item ? item.html : '·') + (item ? '<span>1</span>' : '') + '</div>'; }).join('');
    $('bag-caption').textContent = state.performed ? '帷幕将落。去幕后之门，道一声告别。' : save.items.length ? '上家遗物 ' + save.items.length + ' 件，见「前尘回响」。' : state.flags.seat ? '空座已留给客人。你记住了规矩。' : '借来的脸，记得还。';
    $('activity-log').innerHTML = logs.slice(0, 3).map(function (l) { return '<div class="log-entry"><time>' + esc(l.time) + '</time><span>' + esc(l.text) + '</span></div>'; }).join('');
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    $('card-preview').innerHTML = WL.renderSaveCard(save, CONFIG.level, CONFIG.world);
    $('debug-json').textContent = WL.debug.json(save);
  }

  function stopDemo() { if (demoTimer) clearInterval(demoTimer); demoTimer = null; }
  function closeDialog() { stopDemo(); $('game-dialog').close(); currentEntity = null; keys = {}; canvas.focus({ preventScroll: true }); }
  function openDialog(kicker, title, body, choices) {
    stopDemo(); keys = {}; path = []; target = null; pendingNode = null; state.player.moving = false;
    $('dialog-kicker').textContent = kicker;
    $('dialog-body').innerHTML = '<h2 id="dialog-title">' + esc(title) + '</h2>' + body;
    $('dialog-actions').innerHTML = '';
    (choices || []).forEach(function (choice) {
      var button = document.createElement('button');
      button.className = 'action-button' + (choice.featured ? ' featured' : '') + (choice.danger ? ' danger' : '');
      button.innerHTML = '<span>' + esc(choice.label) + '</span>' + (choice.hint ? '<small>' + esc(choice.hint) + '</small>' : '');
      button.disabled = !!choice.disabled;
      if (choice.id) button.dataset.action = choice.id;
      button.onclick = choice.onClick || function () {
        var id = currentEntity, result = doAction(choice.id);
        if (!result.ok || state.lost) return;
        if (choice.id === 'perform') { showCurtain(); return; }
        if (id) openEntity(id);
      };
      $('dialog-actions').appendChild(button);
    });
    if (!$('game-dialog').open) $('game-dialog').showModal();
  }

  function doAction(id) {
    if (finished) return { ok: false };
    var result = model.action(state, id);
    if (result.ok) {
      if (result.kind === 'mistake') state.flags.mistakes = (state.flags.mistakes || 0) + 1;
      if (!/^assign_|^beat_|^clear_rhythm/.test(id)) addLog(result.message);
      if (/^beat_/.test(id)) tone(id.slice(5)); else if (result.kind === 'mistake') tone('wrong'); else if (!/^assign_|^clear_/.test(id)) tone('clue');
      if (id === 'read_script' && state.learned) WL.addClue(save, '《归客》戏本：白面藏言、红面守誓、黑面断是非；送魂四拍为鼓、锣、铃、锣。');
      if (id === 'respect_seat') WL.addClue(save, '梨园旧院的空座有人预留；活人让座，亡客方能入场。');
    }
    if (!/^assign_|^beat_|^clear_rhythm/.test(id)) toast(result.message || '此刻还不能这样做。');
    renderUI(); persist();
    if (state.lost) showLost();
    return result;
  }

  function scriptBody() {
    return '<div class="script-page"><p>三位旧角，一人藏言，一人守誓，一人断是非。</p><p><strong>白面藏言，红面守誓，黑面断是非。</strong></p><p>从左至右：<strong>藏言者 · 守誓者 · 断是非者</strong>。脸借错了，戏魂就认不出自己。</p><p>客到台下，留一空座。四拍送魂，方可登台。</p><div class="beat-note">鼓 → 锣 → 铃 → 锣</div><p>灯不灭，人不回头。待《归客》唱罢，幕后的门，自会打开。</p></div>';
  }

  function openBook() {
    currentEntity = 'script';
    openDialog('旧戏本 / 残卷其一', '纸上的字，正在等你读完。', '<p class="character-quote">「人会忘记自己是谁，戏不会。」</p>' + scriptBody(), [{ label: '记下这几行，合上戏本', featured: true, onClick: closeDialog }]);
    currentEntity = 'script';
  }

  function openMasks() {
    currentEntity = 'masks';
    if (!state.flags.ticket) {
      openDialog('后台 / 脸谱架', '无票者，不碰戏中脸。', '<p>三张脸谱同时转向你。架后的声音很轻：「先去西南，领一张冥戏票。戏班不收无名的客。」</p>', [{ label: '去找守门纸人', onClick: closeDialog }]); return;
    }
    if (!state.masksCollected.length) {
      openDialog('后台 / 三张借来的脸', '脸谱认人，也认错人。', '<p class="character-quote">「拿走可以，别把自己当成他们。」</p><p>红、白、黑三张脸谱各有一位旧主。西北角的戏本记着他们的身份。</p><div class="mask-legend"><span>' + maskIcon('white') + '白面</span><span>' + maskIcon('red') + '红面</span><span>' + maskIcon('black') + '黑面</span></div>', [{ id: 'take_masks', label: '接过三张脸谱', hint: '收进旧物', featured: true }, { label: '先不碰它们', onClick: closeDialog }]); currentEntity = 'masks'; return;
    }
    if (state.maskSolved) {
      openDialog('脸谱归真 / 第二折', '三位戏魂，终于想起了名字。', '<p>白面低笑，红面作揖，黑面拂袖。架上的三张脸不再朝你转动。</p><p class="character-quote">「还差一段送魂的锣鼓。去东南角吧，别把拍子敲错。」</p>', [{ label: '记住了，去敲送魂锣', featured: true, onClick: closeDialog }]); return;
    }
    var roles = ['藏言者', '守誓者', '断是非者'];
    var body = '<p>为三位戏魂归还原本的脸。点击每位角色下的脸谱；同一张脸会交换位置。</p>' + (!state.learned ? '<p class="dialog-small">还未读过戏本。可先去西北角寻找身份线索。</p>' : '<p class="dialog-small">戏本记着：白面藏言，红面守誓，黑面断是非。</p>');
    body += '<div class="casting-board">' + roles.map(function (role, i) {
      return '<div class="casting-slot"><b>' + role + '</b><div class="big-mask" aria-label="' + role + '：' + (state.casting[i] ? maskNames[state.casting[i]] : '未选择') + '">' + (state.casting[i] ? maskIcon(state.casting[i]) : '？') + '</div><div class="mask-options">' + ['white', 'red', 'black'].map(function (color) { return '<button class="mask-choice ' + (state.casting[i] === color ? 'selected' : '') + '" data-mask-slot="' + i + '" data-mask-color="' + color + '" aria-label="给' + role + '选择' + maskNames[color] + '">' + maskIcon(color) + '</button>'; }).join('') + '</div></div>';
    }).join('') + '</div>';
    openDialog('归还脸谱 / 不是每张脸都属于你', '借来的脸，归给何人？', body, [
      { id: 'check_masks', label: '请三位戏魂认回自己', hint: '答错理智 −1', disabled: !state.learned || state.casting.some(function (m) { return !m; }), featured: true },
      { label: state.learned ? '再看一眼戏本' : '先去找戏本', onClick: state.learned ? openBook : closeDialog },
      { label: '暂时离开脸谱架', onClick: closeDialog }
    ]);
    currentEntity = 'masks';
    $('dialog-body').querySelectorAll('[data-mask-slot]').forEach(function (button) {
      button.onclick = function () { var result = doAction('assign_' + button.dataset.maskSlot + '_' + button.dataset.maskColor); if (result.ok) openMasks(); };
    });
  }

  function openGong() {
    currentEntity = 'gong';
    if (!state.maskSolved) { openDialog('东南角 / 铜锣', '先正其面，才闻其声。', '<p>铜锣蒙着一层雾。三张脸还没有找到自己的主人，此时敲下去，只会惊动台下的客。</p><p>先翻阅戏本，再到东侧脸谱架让三张脸谱归位。</p>', [{ label: '暂且收起鼓槌', onClick: closeDialog }]); return; }
    if (state.gongSolved) { openDialog('送魂四拍 / 第三折', '最后一声锣，落在了人间。', '<p>鼓、锣、铃、锣。声响一停，台下的雾轻了许多。</p><p class="character-quote">「若给客人留好了空位，就去北面的戏台，把《归客》唱完。」</p>', [{ label: '去唱最后一折', featured: true, onClick: closeDialog }]); return; }
    var body = '<p>照戏本留下的顺序，敲出四拍送魂声。无需抢拍，依次点击即可。</p><div class="rhythm-row">' + Array.from({ length: 4 }, function (_, i) { return '<div class="rhythm-step ' + (state.rhythm[i] ? 'filled' : '') + '" data-beat-index="' + i + '">' + (state.rhythm[i] ? beatNames[state.rhythm[i]] : '·') + '</div>'; }).join('') + '</div><div class="rhythm-buttons">' + ['drum', 'gong', 'bell'].map(function (beat) { return '<button data-beat="' + beat + '" aria-label="敲' + beatNames[beat] + '" ' + (state.rhythm.length >= 4 ? 'disabled' : '') + '>' + beatNames[beat] + '<small>' + beat.toUpperCase() + '</small></button>'; }).join('') + '</div><p class="dialog-small">戏本提示：鼓 → 锣 → 铃 → 锣。四拍敲完后再确认。</p>';
    openDialog('送魂锣 / 声起有序，声落有归', '用四声，送他们上路。', body, [
      { id: 'check_rhythm', label: '让这一段锣鼓落定', hint: '答错理智 −1', disabled: state.rhythm.length !== 4, featured: true },
      { label: '看一次送魂四拍', hint: '示范，不计失误', onClick: showBeatDemo },
      { id: 'clear_rhythm', label: '清空这四拍，重新敲', disabled: !state.rhythm.length },
      { label: '收起鼓槌，稍后再来', onClick: closeDialog }
    ]);
    currentEntity = 'gong';
    $('dialog-body').querySelectorAll('[data-beat]').forEach(function (button) { button.onclick = function () { var result = doAction('beat_' + button.dataset.beat); if (result.ok) openGong(); }; });
  }

  function showBeatDemo() {
    stopDemo();
    var pattern = ['drum', 'gong', 'bell', 'gong'], index = 0;
    var slots = $('dialog-body').querySelectorAll('[data-beat-index]');
    $('dialog-actions').querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    function nextBeat() {
      slots.forEach(function (slot) { slot.classList.remove('flash'); });
      if (index >= 4) { stopDemo(); openGong(); return; }
      slots[index].textContent = beatNames[pattern[index]]; slots[index].classList.add('flash'); tone(pattern[index]); index++;
    }
    nextBeat(); demoTimer = setInterval(nextBeat, 650);
  }

  function openEntity(id) {
    var node = model.nodes.find(function (n) { return n.id === id; });
    if (!node || !state.started || state.lost || finished) return;
    currentEntity = id;
    if (id === 'ticket') {
      openDialog('守门纸人 / 不问来路，只问归处', state.flags.ticket ? '票在手里，别忘了规矩。' : '客官，借一出戏给你走。', '<p class="character-quote">「戏班今夜缺一个替班人。你替他们唱完《归客》，他们替你开一扇门。」</p><p>壹，空位有人，生人莫坐。贰，借来的脸，必须认回旧主。叁，四拍送魂，落幕不回头。</p><p class="dialog-small">西北角有旧戏本，东边有脸谱与铜锣。若神思恍惚，就去引魂灯旁缓一缓。</p>', [
        { id: 'ticket', label: state.flags.ticket ? '冥戏票已领，今夜有你一席' : '接过冥戏票', hint: '记下戏班规矩', disabled: state.flags.ticket, featured: !state.flags.ticket },
        { label: '提灯，继续入院', onClick: closeDialog }
      ]);
    } else if (id === 'script') {
      if (!state.learned) doAction('read_script');
      openBook();
    } else if (id === 'masks') { openMasks(); }
    else if (id === 'gong') { openGong(); }
    else if (id === 'seat') {
      openDialog('台下 / 一张空着的椅子', state.flags.seat ? '空位有客，轮不到你。' : '人都坐满了，偏留这一席。', '<p class="character-quote">「那位客人还在路上。你站着看一会儿，可好？」</p><p>椅子干干净净，椅脚旁放着一双旧布鞋。守门纸人的话又在耳边响起：空位有人，生人莫坐。</p>', [
        { id: 'respect_seat', label: state.flags.seat ? '已给亡客留座' : '退到一旁，把位置留给客人', hint: '守住第一条规矩', disabled: state.flags.seat, featured: !state.flags.seat },
        { id: 'sit_seat', label: '试着在空椅子上坐下', hint: '违背规矩 · 生命 −1', disabled: state.flags.seatWarning || state.flags.seat, danger: true },
        { label: '离开空座', onClick: closeDialog }
      ]);
    } else if (id === 'lantern') {
      openDialog('引魂灯 / 无论你从哪场梦里来', '看着灯，还记得自己是谁吗？', '<p>青色的火苗没有温度，却能照见你的影子。远处的戏声轻了下来，你终于听见自己的呼吸。</p><p>在灯下找回 1 点理智。若在谜题中迷了心神，也能循着这盏灯回来，保留已经完成的进度。</p>', [
        { id: 'relight', label: '定神，拨亮这盏灯', hint: '理智 +1', disabled: state.sanity >= state.maxSanity, featured: state.sanity < state.maxSanity },
        { label: '记住灯的位置，继续入戏', onClick: closeDialog }
      ]);
    } else if (id === 'stage') {
      if (state.performed) { showCurtain(); return; }
      var ready = state.flags.ticket && state.learned && state.maskSolved && state.gongSolved && state.flags.seat;
      openDialog('梨园旧台 / 最后一折', ready ? '台下已满，等你一句开场。' : '这出戏，还有未了的规矩。', '<p class="character-quote">「一生只唱一出戏，一出戏里是一生。客官，替我们把最后一句唱完。」</p><p>' + (ready ? '脸谱归真，四拍送魂，空座也等来了它的客人。现在，你可以站到灯下，唱出《归客》的最后一句。' : '登台之前，需要冥戏票、读过戏本、归还三张脸谱、敲对四拍送魂声，并为台下亡客留下空座。') + '</p>' + (!state.flags.seat ? '<p class="dialog-small">还没有给客人让座：看看院子中央那张空椅子。</p>' : ''), [
        { id: 'perform', label: ready ? '登台，唱完《归客》' : '尚有规矩未守，暂不能登台', hint: ready ? '开启落幕' : '查看入戏手札', disabled: !ready, featured: ready },
        { label: '回院中，再走一走', onClick: closeDialog }
      ]);
    } else if (id === 'exit') {
      if (state.performed) { showEnding(); return; }
      openDialog('幕后之门 / 门不认来人', '戏未唱完，门不会开。', '<p>你推了推那扇门。门后有风，却没有路。</p><p class="character-quote">「等《归客》唱完，我们才有各自的归处。」</p>', [{ label: '转身回到戏院', onClick: closeDialog }]);
    }
    if (['masks', 'gong', 'script'].indexOf(id) === -1) currentEntity = id;
  }

  function showCurtain() {
    tone('win');
    openDialog('第四折 / 戏终，人未散', '最后一句，唱给了谁听？', '<p class="character-quote">「归来吧，归来吧。生者循灯，逝者随风。」</p><p>你的声音落下，满院的观众同时起身。没有掌声，只有衣袂轻轻擦过椅背的声音。</p><p>北面的帷幕后，一扇门缓缓打开。有人在门边等你作最后一个选择。</p>', [
      { label: '走向幕后的门', hint: '自动前往', featured: true, onClick: function () { closeDialog(); navigateTo(model.nodes.find(function (n) { return n.id === 'exit'; }), 'exit'); } },
      { label: '再看一眼落幕的戏院', onClick: closeDialog }
    ]);
  }

  function showEnding() {
    if (!state.ending) {
      openDialog('幕后之门 / 还一张脸，留一段戏', '帷幕后，只剩你和班主。', '<p class="character-quote">「客官，好戏唱完了。你是还脸离场，还是替我们把这戏继续唱下去？」</p><p>你可以把脸谱交还旧主，送戏魂归去；也可以收下班主的黑面，带着戏班未尽的故事走进下一世界。</p>', [
        { label: '还脸辞戏，提灯送客', hint: '归客结局', featured: true, onClick: function () { if (doAction('ending_release').ok) showEnding(); } },
        { label: '收下黑面，接过班主的戏本', hint: '传灯结局 · 理智 −1', onClick: function () { if (doAction('ending_inherit').ok) showEnding(); } }
      ]); return;
    }
    var release = state.ending === 'release';
    openDialog('一折已终 / ' + (release ? 'THE RETURNING GUEST' : 'THE KEEPER OF THE PLAY'), release ? '戏散了，他们终于回家。' : '从今夜起，你也是戏中人。', '<p>' + (release ? '三张脸谱在台前轻轻一碰，化作纸灰。班主将出戏票递来，青灯照亮你的路。你没有回头，身后的锣声也没有再响。' : '黑面贴近掌心，戏本翻开新的一页，上面写着你的名字。灯火并未熄灭，只是从班主手中，传到了你的手中。') + '</p><div class="result-stats"><div><b>' + (release ? '归客' : '传灯') + '</b><span>此夜结局</span></div><div><b>' + (state.flags.mistakes || 0) + '</b><span>入戏失误</span></div><div><b>' + Math.floor(state.elapsed / 60) + ':' + String(Math.floor(state.elapsed % 60)).padStart(2, '0') + '</b><span>此折用时</span></div></div><p>你的道具、线索和面板会通过主办方接力协议，真实传入下一世界。</p>', [
      { label: '封存这一折，进入下一世界', hint: '接力交接 →', featured: true, onClick: finish },
      { label: '暂留片刻', onClick: closeDialog }
    ]); persist();
  }

  function finish() {
    if (finished || !state.performed || !state.ending) return;
    if (!state.flags.rewards) {
      if (state.ending === 'release') {
        WL.addItem(save, { id: 'farewell_ticket', name: '梨园出戏票', type: 'key' });
        WL.addItem(save, { id: 'soul_guiding_lantern', name: '不灭引魂灯', type: 'light' });
        WL.addItem(save, { id: 'returned_opera_mask', name: '戏魂谢礼铜面', type: 'token' });
      } else {
        WL.addItem(save, { id: 'master_black_mask', name: '班主的黑面', type: 'strange' });
        WL.addItem(save, { id: 'ghost_opera_script', name: '写着你名字的戏本', type: 'info' });
        WL.addItem(save, { id: 'opera_master_tally', name: '幽冥戏班腰牌', type: 'token' });
      }
      WL.addClue(save, '《归客》的送魂四拍是鼓、锣、铃、锣；不灭引魂灯能照出活人的影子。');
      WL.addClue(save, state.ending === 'release' ? '亡客离场时提醒：陌生世界的空座，也可能有人预留；落幕之后切莫回头。' : '班主的戏本会在下一世界续写；若黑面发热，附近有人正冒用另一个人的名字。');
      state.flags.rewards = true;
    }
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    var hook = '最后一声锣落下，帷幕后开出通往「' + CONFIG.nextWorld + '」的门。你握紧' + (state.ending === 'release' ? '引魂灯' : '班主的黑面') + '跨了过去；门的另一边，有人叫出了你的名字。';
    var result = WL.completeLevel(CONFIG, save, { exitHook: hook, nextUrl: CONFIG.nextUrl, passViaUrl: CONFIG.passViaUrl });
    if (result) { finished = true; stopDemo(); $('game-dialog').close(); path = []; keys = {}; try { localStorage.removeItem(sessionKey); } catch (e) { /* URL 已携带接力码。 */ } }
    else toast('出口接线尚未完整，请打开前尘回响查看提示。');
  }

  function showLost() {
    openDialog('失神 / 灯还没有灭', state.hp > 0 ? '你几乎，忘记了自己的名字。' : '这一折，先在这里歇一歇。', '<p>' + (state.hp > 0 ? '戏声钻进耳里，三张脸都像是你。还好，西边的引魂灯依旧亮着。你可以循灯醒来，保留已经完成的线索与谜题。' : '那张空椅子原本就不是给你准备的。守门纸人将你送回院门，下一次，记得让座。') + '</p>', [
      { label: '循灯醒来，找回一点清明', hint: '保留进度 · 理智恢复 1', disabled: state.hp === 0, featured: state.hp > 0, onClick: function () { if (doAction('relight').ok) { state.player.x = 110; state.player.y = 285; closeDialog(); renderUI(); persist(); } } },
      { label: '从入院时，重唱这一折', onClick: restart }
    ]);
  }

  function confirmRestart() { openDialog('重入此戏', '这一折，要从头再来吗？', '<p>本关的探索和谜题会重新开始。上家传来的面板、旧物与故事会按最初入口重新带入。</p>', [{ label: '重新入戏', featured: true, onClick: restart }, { label: '继续今夜的故事', onClick: closeDialog }]); }
  function restart() {
    finished = false; paused = false; path = []; target = null; pendingNode = null; keys = {};
    if ($('relay-dialog').open) $('relay-dialog').close(); closeDialog(); freshState();
    $('pause-badge').hidden = true; $('pause-button').textContent = 'Ⅱ';
    $('intro-note').hidden = false; $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\\n\\n' : '') + echo;
    $('echo-log').textContent = echo; WL.mountDebug(save); $('debug-reset').onclick = confirmRestart; renderUI(); persist();
  }

  function showGuide() {
    openDialog('戏班规矩 / 看戏容易，出戏难', '客官，有三句话要记牢。', '<p class="character-quote">「空位有人，脸谱有主，锣声有归。」</p><div class="help-controls"><p><kbd>W A S D</kbd> / 方向键移步 · <kbd>E</kbd> 靠近后查看</p><p><kbd>SHIFT</kbd> 疾行 · <kbd>ESC</kbd> 暂歇</p><p>点击人物、戏本或道具，可自动前往。</p></div><p>先找西南守门纸人领票，再读西北戏本；根据身份给三张脸谱归位，敲对东南角的四拍送魂锣，记得给中央空座让位。之后去北面的戏台唱完《归客》。</p><p>脸谱或锣鼓答错会扣 1 理智。理智耗尽时可循引魂灯恢复，保留进度；误坐空座会扣 1 生命。游戏没有倒计时追赶。</p><p class="dialog-small">纯氛围怪谈，无突发惊吓。声音默认关闭，右上角可开启；鼓点同时有文字示范，不依赖听觉。</p>', [{ label: '记住了，继续入戏', featured: true, onClick: closeDialog }]);
  }

  function showMission() {
    if (state.learned) { openBook(); return; }
    openDialog('入戏手札 / 先循灯，后循声', '要出戏，先把戏读懂。', '<p>西南的守门纸人会给你冥戏票，西北旧桌上的《归客》戏本藏着脸谱和锣鼓的线索。</p><p>不要坐院子中央的空椅子。若觉得神思恍惚，到西边引魂灯前歇一歇。</p>', [{ label: '前往西北旧戏本', hint: '自动寻路', featured: true, onClick: function () { closeDialog(); if (state.started) navigateTo(model.nodes.find(function (n) { return n.id === 'script'; }), 'script'); else toast('先点「持灯入戏」，再探这座戏院。'); } }, { label: '继续探索', onClick: closeDialog }]);
  }
  function showRelay() { stopDemo(); keys = {}; path = []; target = null; pendingNode = null; renderUI(); $('debug-code').value = WL.debug.code(save); if (!$('relay-dialog').open) $('relay-dialog').showModal(); }

  function blocked(x, y) {
    if (x < 24 || x > 936 || y < 90 || y > 558) return true;
    return model.solids.some(function (s) { return x > s.x - 9 + 0.01 && x < s.x + s.w + 9 - 0.01 && y > s.y - 9 + 0.01 && y < s.y + s.h + 9 - 0.01; });
  }

  // 小地图使用网格寻路；拒绝穿过摊位，也不让斜线切过障碍物的角。
  function findPath(destination) {
    var step = 12, cols = 80, rows = 50;
    var start = { x: Math.round(state.player.x / step), y: Math.round(state.player.y / step) };
    var end = { x: Math.round(destination.x / step), y: Math.round(destination.y / step) };
    function index(p) { return p.y * cols + p.x; }
    function free(x, y) { return x >= 0 && x < cols && y >= 0 && y < rows && !blocked(x * step, y * step); }
    function nearestFree(p) {
      if (free(p.x, p.y)) return p;
      for (var r = 1; r < 16; r++) {
        for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (free(p.x + dx, p.y + dy)) return { x: p.x + dx, y: p.y + dy };
        }
      }
      return null;
    }
    start = nearestFree(start); end = nearestFree(end);
    if (!start || !end) return [];
    var queue = [start], parents = new Int32Array(cols * rows).fill(-1), seen = new Uint8Array(cols * rows);
    seen[index(start)] = 1;
    var found = false;
    var directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (var head = 0; head < queue.length; head++) {
      var p = queue[head];
      if (p.x === end.x && p.y === end.y) { found = true; break; }
      directions.forEach(function (d) {
        var x = p.x + d[0], y = p.y + d[1], i = y * cols + x;
        if (!free(x, y) || seen[i]) return;
        if (d[0] && d[1] && (!free(p.x + d[0], p.y) || !free(p.x, p.y + d[1]))) return;
        seen[i] = 1; parents[i] = index(p); queue.push({ x: x, y: y });
      });
    }
    if (!found) return [];
    var points = [], cursor = index(end), origin = index(start);
    while (cursor !== origin && cursor >= 0) { points.push({ x: cursor % cols * step, y: Math.floor(cursor / cols) * step }); cursor = parents[cursor]; }
    points.reverse();
    return points;
  }

  function navigateTo(destination, nodeId) {
    path = findPath(destination); target = { x: destination.x, y: destination.y }; pendingNode = nodeId || null;
    if (!path.length) {
      target = null;
      if (nodeId && Math.hypot(state.player.x - destination.x, state.player.y - destination.y) < 55) openEntity(nodeId);
      else if (nodeId) toast('那边暂时走不过去，试试另一条路。');
      pendingNode = null;
    }
  }

  function updateMovement(dt) {
    var dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
    var dy = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
    var speed = (keys.shift ? 177 : 113) * (false ? 0.82 : 1);
    if (dx || dy) { path = []; target = null; pendingNode = null; }
    else if (path.length) {
      var next = path[0], distance = Math.hypot(next.x - state.player.x, next.y - state.player.y);
      if (distance <= speed * dt + 1) {
        state.player.x = next.x; state.player.y = next.y; path.shift();
        if (!path.length) {
          target = null;
          var id = pendingNode; pendingNode = null;
          if (id) { openEntity(id); return; }
        }
        return;
      }
      dx = next.x - state.player.x; dy = next.y - state.player.y;
    }
    var length = Math.hypot(dx, dy);
    state.player.moving = length > 0;
    if (!length) return;
    dx /= length; dy /= length;
    state.player.dir = Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up';
    var nx = state.player.x + dx * speed * dt, ny = state.player.y + dy * speed * dt;
    if (!blocked(nx, state.player.y)) state.player.x = nx;
    if (!blocked(state.player.x, ny)) state.player.y = ny;
    if (soundOn && performance.now() - lastFootstep > 350) { tone('step'); lastFootstep = performance.now(); }
  }



  function updateNear() {
    var best = null, distance = 55;
    model.nodes.forEach(function (node) { var d = Math.hypot(state.player.x - node.x, state.player.y - node.y); if (d < distance) { best = node; distance = d; } });
    near = best;
    $('interaction-prompt').hidden = !best || !state.started || state.lost || paused || finished || $('game-dialog').open || $('relay-dialog').open;
    if (best) $('interaction-prompt').innerHTML = '<kbd>E</kbd><span>' + ({ ticket: '交谈 · ', script: '翻阅 · ', masks: '查看 · ', seat: '观察 · ', gong: '敲响 · ', stage: '登上 · ', lantern: '靠近 · ', exit: '推开 · ' }[best.id] || '查看 · ') + esc(best.name) + '</span>';
  }
  function isActive() { return state.started && !state.lost && !paused && !finished && !$('game-dialog').open && !$('relay-dialog').open && !document.hidden; }
  function frame(now) {
    var dt = lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0; lastTime = now;
    if (isActive()) { updateMovement(dt); if (isActive()) { (model.tick(state, dt) || []).forEach(function (message) { addLog(message); toast(message); }); if (state.lost) showLost(); saveTimer += dt; if (saveTimer >= 2) { saveTimer = 0; renderUI(); persist(); } } }
    else state.player.moving = false;
    updateNear(); renderer.render(state, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : now, target, near ? near.id : null);
    requestAnimationFrame(frame);
  }
  function togglePause() { if (!state.started || state.lost || finished || $('game-dialog').open || $('relay-dialog').open) return; paused = !paused; keys = {}; $('pause-badge').hidden = !paused; $('pause-button').textContent = paused ? '▷' : 'Ⅱ'; $('pause-button').setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏'); persist(); }
  function tone(kind) {
    if (!soundOn) return;
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      var notes = kind === 'drum' ? [95] : kind === 'gong' ? [196, 293] : kind === 'bell' ? [784, 1174] : kind === 'win' ? [293, 392, 440, 587] : kind === 'wrong' ? [147, 139] : kind === 'step' ? [88] : [392, 587];
      notes.forEach(function (frequency, i) {
        var osc = audioContext.createOscillator(), gain = audioContext.createGain(), at = audioContext.currentTime + i * (kind === 'gong' || kind === 'bell' ? 0 : .11);
        osc.type = kind === 'step' || kind === 'drum' ? 'triangle' : 'sine'; osc.frequency.setValueAtTime(frequency, at);
        if (kind === 'drum') osc.frequency.exponentialRampToValueAtTime(40, at + .2);
        var duration = kind === 'gong' || kind === 'bell' ? .65 : .18;
        gain.gain.setValueAtTime(kind === 'step' ? .018 : .08, at); gain.gain.exponentialRampToValueAtTime(.001, at + duration);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(at); osc.stop(at + duration + .01);
      });
    } catch (e) { soundOn = false; }
  }

  $('start-button').onclick = function () { state.started = true; $('intro-note').hidden = true; persist(); canvas.focus({ preventScroll: true }); toast('先去西南找守门纸人。点击地图里的目标即可前往。'); };
  $('guide-button').onclick = showGuide; $('mission-button').onclick = showMission;
  $('world-button').onclick = showRelay; $('relay-button').onclick = showRelay;
  $('market-tab').onclick = function () { if ($('relay-dialog').open) $('relay-dialog').close(); if ($('game-dialog').open) closeDialog(); canvas.focus({ preventScroll: true }); };
  $('dialog-close').onclick = closeDialog; $('relay-close').onclick = function () { $('relay-dialog').close(); canvas.focus({ preventScroll: true }); };
  $('restart-button').onclick = confirmRestart; $('pause-button').onclick = togglePause; $('resume-button').onclick = togglePause;
  $('interaction-prompt').onclick = function () { if (near && isActive()) openEntity(near.id); };
  $('touch-interact').onclick = function () { if (near && isActive()) openEntity(near.id); else toast('靠近人物或旧物，再按查看。'); };
  $('map-button').onclick = function () { $('map-note').hidden = !$('map-note').hidden; $('map-button').setAttribute('aria-pressed', String(!$('map-note').hidden)); };
  $('sound-button').onclick = function () { soundOn = !soundOn; $('sound-button').querySelector('.sound-off').hidden = soundOn; $('sound-button').setAttribute('aria-label', soundOn ? '关闭声音' : '开启声音'); $('sound-button').title = soundOn ? '关闭声音' : '开启声音'; if (soundOn) tone('bell'); };
  canvas.addEventListener('pointerdown', function (event) {
    if (!isActive()) return; event.preventDefault(); canvas.focus({ preventScroll: true });
    var box = canvas.getBoundingClientRect(), point = { x: (event.clientX - box.left) / box.width * canvas.width, y: (event.clientY - box.top) / box.height * canvas.height };
    var nearest = model.nodes.map(function (node) { return { node: node, d: Math.min(Math.hypot(point.x - node.x, point.y - node.y), Math.hypot(point.x - node.x, point.y - (node.y - 25))) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    if (nearest && nearest.d < 39) navigateTo(nearest.node, nearest.node.id); else navigateTo(point, null);
  });
  document.addEventListener('keydown', function (event) {
    var key = event.key.toLowerCase(); if (/input|textarea/i.test(event.target.tagName) || $('game-dialog').open || $('relay-dialog').open) return;
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift', 'e', 'escape'].indexOf(key) !== -1) event.preventDefault();
    if (key === 'escape' && !event.repeat) { togglePause(); return; }
    if (key === 'e' && !event.repeat && isActive()) { if (near) openEntity(near.id); else toast('靠近目标，再按 E。'); return; }
    if (isActive()) keys[key] = true;
  });
  document.addEventListener('keyup', function (event) { keys[event.key.toLowerCase()] = false; });
  document.querySelectorAll('[data-dir]').forEach(function (button) {
    var key = { up: 'w', left: 'a', down: 's', right: 'd' }[button.dataset.dir];
    button.addEventListener('pointerdown', function (event) { event.preventDefault(); if (isActive()) { button.setPointerCapture(event.pointerId); keys[key] = true; } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) { button.addEventListener(type, function () { keys[key] = false; }); });
  });
  window.addEventListener('blur', function () { keys = {}; });
  document.addEventListener('visibilitychange', function () { keys = {}; lastTime = 0; if (document.hidden) persist(); });
  window.addEventListener('pagehide', persist);
  $('game-dialog').addEventListener('close', function () { stopDemo(); keys = {}; currentEntity = null; });
  $('relay-dialog').addEventListener('close', function () { keys = {}; });
  initialize(); requestAnimationFrame(frame);
})();
<\/script>
</body></html>
`},se=`主办方示例队`,ce=[[`example-wasteland`,`wasteland-market`,`废土集市`,`余烬之约`,`在锈风集市拾荒、以物易物、修好电台。你留下的净水，会成为别人的明天。`],[`example-opera`,`ghost-opera`,`幽冥戏班`,`子夜折子`,`循戏本、正脸谱、鸣送魂。唱完一折给亡者的戏，才有你自己的归途。`]].map(([e,t,n,r,i])=>({id:e,team:se,world:n,title:r,description:i,entry:t+`/index.html`,exitHook:n===`废土集市`?`青灯照出幽冥戏班，下一段故事正在等待。`:`携着遗物走回大陆，让旅程中的故事留在心中。`,status:`approved`,fileCount:6,hasRelay:!0})),w={id:`infinite-world`,title:`无限世界`,initial_save:ne(),stages:ce.map(e=>({...e,entry_path:e.entry}))};function T(e,t){let n=ce.find(t=>e.includes(t.id)||e.includes(t.entry));if(!n)return``;let r=t||{routeId:`preview`,slot:0,gameId:n.id,world:n.world,exitHook:n.exitHook,nextWorld:`试玩结束`,nextUrl:`#finished`,save:re(ne(),{stages:[{world:n.world,exitHook:n.exitHook}]},0),history:[]};return oe[n.id].replace(/<head\b[^>]*>/i,e=>e+`<script>window.__iw_staticContext=`+JSON.stringify(r).replaceAll(`<`,`\\u003c`)+`;<\/script>`)}async function le(e,t){if(e===`runs`&&t){let e=crypto.randomUUID(),t={runId:e,routeId:w.id,step:0,revision:0,save:re(w.initial_save,w,0),history:[],done:!1,enteredAt:Date.now()};return localStorage.setItem(`iw-static-run:`+e,JSON.stringify(t)),t}if(e.startsWith(`runs/`)){let n=`iw-static-run:`+e.slice(5),r=localStorage.getItem(n);if(!r)throw Error(`进度不存在，请全新开始。`);let i=JSON.parse(r),a=t?.action===`heal`?{...i,save:{...i.save,player:{...i.save.player,hp:i.save.player.max_hp,status:`normal`}},revision:i.revision+1}:t?ae(i,w,t):i;return localStorage.setItem(n,JSON.stringify(a)),a}if(e===`results`)return{ok:!0};if(e===`state`)return{games:ce,routes:[w],activeRoute:w.id,admin:!1,groups:[]};if(e===`routes/`+w.id)return w;let n=ce.find(t=>e===`demo/`+t.id);if(n)return{url:`./games/demo/`+n.id+`/`+n.entry};throw Error(`静态版仅提供作品浏览与游玩。`)}var E=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),D=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),ue=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),de=e=>{let t=ue(e);return t.charAt(0).toUpperCase()+t.slice(1)},fe={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},pe=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},O=i(),k=(0,O.createContext)({}),me=()=>(0,O.useContext)(k),he=(0,O.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=me()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,O.createElement)(`svg`,{ref:c,...fe,width:t??l??fe.width,height:t??l??fe.height,stroke:e??f,strokeWidth:m,className:E(`lucide`,p,i),...!a&&!pe(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,O.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),A=(e,t)=>{let n=(0,O.forwardRef)(({className:n,...r},i)=>(0,O.createElement)(he,{ref:i,iconNode:t,className:E(`lucide-${D(de(e))}`,`lucide-${e}`,n),...r}));return n.displayName=de(e),n},ge=A(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),_e=A(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),ve=A(`arrow-up-right`,[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]),ye=A(`book-open`,[[`path`,{d:`M12 5v16`,key:`1f6ucr`}],[`path`,{d:`M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,key:`1fyvmf`}]]),be=A(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),xe=A(`circle-alert`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]]),Se=A(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),Ce=A(`cloud`,[[`path`,{d:`M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z`,key:`p7xjir`}]]),we=A(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),Te=A(`earth`,[[`path`,{d:`M21.54 15H17a2 2 0 0 0-2 2v4.54`,key:`1djwo0`}],[`path`,{d:`M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17`,key:`1tzkfa`}],[`path`,{d:`M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05`,key:`14pb5j`}],[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}]]),Ee=A(`file-archive`,[[`path`,{d:`M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5`,key:`4pqfef`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M8 12v-1`,key:`1ej8lb`}],[`path`,{d:`M8 18v-2`,key:`qcmpov`}],[`path`,{d:`M8 7V6`,key:`1nbb54`}],[`circle`,{cx:`8`,cy:`20`,r:`2`,key:`ckkr5m`}]]),De=A(`flag`,[[`path`,{d:`M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528`,key:`1jaruq`}]]),Oe=A(`git-branch`,[[`path`,{d:`M15 6a9 9 0 0 0-9 9V3`,key:`1cii5b`}],[`circle`,{cx:`18`,cy:`6`,r:`3`,key:`1h7g24`}],[`circle`,{cx:`6`,cy:`18`,r:`3`,key:`fqmcym`}]]),j=A(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),ke=A(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),Ae=A(`layout-grid`,[[`rect`,{width:`7`,height:`7`,x:`3`,y:`3`,rx:`1`,key:`1g98yp`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`3`,rx:`1`,key:`6d4xhi`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`14`,rx:`1`,key:`nxv5o0`}],[`rect`,{width:`7`,height:`7`,x:`3`,y:`14`,rx:`1`,key:`1bb6yr`}]]),je=A(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),Me=A(`play`,[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]),Ne=A(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),Pe=A(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),Fe=A(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),Ie=A(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),Le=A(`shield`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]),Re=A(`skip-forward`,[[`path`,{d:`M21 4v16`,key:`7j8fe9`}],[`path`,{d:`M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z`,key:`zs4d6`}]]),ze=A(`upload`,[[`path`,{d:`M12 3v12`,key:`1x0j5s`}],[`path`,{d:`m17 8-5-5-5 5`,key:`7q97r8`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}]]),Be=A(`volume-2`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`path`,{d:`M16 9a5 5 0 0 1 0 6`,key:`1q6k2b`}],[`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`,key:`ijwkga`}]]),Ve=A(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]);function He({games:e,adminKey:t,onChanged:n}){let[r,i]=(0,O.useState)([]),[a,o]=(0,O.useState)([]),[s,c]=(0,O.useState)(``),[l,d]=(0,O.useState)({hp:3,max_hp:3,sanity:2,curses:``}),[f,p]=(0,O.useState)(``),[m,h]=(0,O.useState)(!1);(0,O.useEffect)(()=>{i(e.filter(e=>e.status===`approved`).map((e,t)=>({...e,slot:e.slot??t})))},[e]),(0,O.useEffect)(()=>{let e=!0;return fetch(`/api/routes/infinite-world`).then(e=>e.json()).then(t=>{let n=t.initial_save?.player;e&&n&&d({hp:n.hp,max_hp:n.max_hp,sanity:n.sanity,curses:(n.curses||[]).join(`
`)})}).catch(()=>{}),()=>{e=!1}},[]);async function g(){h(!0),p(``);try{let e=await fetch(`/api/admin/route-snapshots`,{headers:{"x-admin-key":t}}),n=await e.json();if(!e.ok)throw Error(n.error);o(n.routes),c(n.activeRoute||n.routes[0]?.id||``)}catch(e){p(e.message)}finally{h(!1)}}async function _(){if(s){h(!0),p(``);try{let e=await fetch(`/api/admin/activate-route`,{method:`POST`,headers:{"Content-Type":`application/json`,"x-admin-key":t},body:JSON.stringify({id:s})}),r=await e.json();if(!e.ok)throw Error(r.error);p(`已切换正式快照，已开始的旅程继续使用原快照。`),n()}catch(e){p(e.message)}finally{h(!1)}}}async function v(e){e.preventDefault(),h(!0),p(``);try{let e=await fetch(`/api/admin/configure`,{method:`POST`,headers:{"Content-Type":`application/json`,"x-admin-key":t},body:JSON.stringify({stages:r.map(e=>({id:e.id,slot:Number(e.slot),exitHook:e.exitHook})),initial_save:{player:{hp:l.hp,max_hp:l.max_hp,sanity:l.sanity,curses:l.curses.split(`
`).map(e=>e.trim()).filter(Boolean)}}})}),i=await e.json();if(!e.ok)throw Error(i.error);p(`世界线已更新，新旅程使用本次配置。`),n()}catch(e){p(e.message)}finally{h(!1)}}return(0,u.jsxs)(`form`,{onSubmit:v,className:`upload-form`,children:[(0,u.jsx)(`h2`,{children:`无限世界 · 出场配置`}),(0,u.jsx)(`p`,{children:`验收后自动接线。关序从小到大排列，尚未配置的新作品排在末尾。`}),(0,u.jsxs)(`div`,{className:`form-grid`,children:[(0,u.jsxs)(`label`,{children:[`初始生命`,(0,u.jsx)(`input`,{type:`number`,min:`0`,max:l.max_hp,value:l.hp,onChange:e=>d({...l,hp:Number(e.target.value)})})]}),(0,u.jsxs)(`label`,{children:[`生命上限`,(0,u.jsx)(`input`,{type:`number`,min:`1`,max:`10`,value:l.max_hp,onChange:e=>d({...l,max_hp:Number(e.target.value)})})]}),(0,u.jsxs)(`label`,{children:[`初始理智`,(0,u.jsx)(`input`,{type:`number`,min:`0`,max:`99`,value:l.sanity,onChange:e=>d({...l,sanity:Number(e.target.value)})})]}),(0,u.jsxs)(`label`,{children:[`初始诅咒（最多 8 项，每行一项）`,(0,u.jsx)(`textarea`,{rows:2,value:l.curses,onChange:e=>d({...l,curses:e.target.value})})]})]}),r.map((e,t)=>(0,u.jsxs)(`div`,{className:`form-grid`,children:[(0,u.jsxs)(`label`,{children:[e.world,` · 关序`,(0,u.jsx)(`input`,{required:!0,type:`number`,min:`0`,max:`10000`,value:e.slot,onChange:e=>i(r.map((n,r)=>r===t?{...n,slot:e.target.value}:n))})]}),(0,u.jsxs)(`label`,{children:[`平台出口钩子`,(0,u.jsx)(`textarea`,{required:!0,rows:2,maxLength:400,value:e.exitHook,onChange:e=>i(r.map((n,r)=>r===t?{...n,exitHook:e.target.value}:n))})]})]},e.id)),(0,u.jsx)(`button`,{type:`button`,className:`button outline`,disabled:m,onClick:g,children:`查看历史快照`}),a.length>0&&(0,u.jsxs)(`div`,{className:`form-grid`,children:[(0,u.jsxs)(`label`,{children:[`正式世界线快照`,(0,u.jsx)(`select`,{value:s,onChange:e=>c(e.target.value),children:a.map(e=>(0,u.jsxs)(`option`,{value:e.id,children:[e.title,` · `,e.created_at,` · `,e.id.slice(-8)]},e.id))})]}),(0,u.jsx)(`button`,{type:`button`,className:`button outline`,disabled:m||!s,onClick:_,children:`切换到此快照`})]}),(0,u.jsx)(`button`,{className:`button outline`,disabled:m||!r.length,children:m?`正在保存…`:`保存并更新世界线`}),(0,u.jsx)(`p`,{role:`status`,children:f})]})}function Ue({routes:e}){let t=e[0];return(0,u.jsxs)(`section`,{className:`journey-entries`,children:[(0,u.jsx)(`h2`,{children:`无限世界`}),(0,u.jsx)(`p`,{children:`通过验收的世界自动相连，带着道具与故事一路出发。`}),t?.stages.length?(0,u.jsx)(`div`,{children:(0,u.jsxs)(`a`,{href:`./index.html?run=`+t.id,children:[(0,u.jsx)(`span`,{children:`↗`}),(0,u.jsx)(`b`,{children:`进入无限世界`}),(0,u.jsxs)(`small`,{children:[t.stages.length,` 个世界 · 全新开始 / 继续游玩`]})]})}):(0,u.jsx)(`p`,{children:`等待第一份作品通过验收，即可启程。`})]})}var We=`停摆医院.永夜列车.迷雾小镇.深海囚笼.废土集市.幽冥戏班.像素王城.无重力空间站.极夜科考站.镜像图书馆.快递末世.糖果工厂.高考修罗场.剧本杀片场.上古遗迹.天台便利店.霓虹黑客都市.暴雪山庄.空中飞艇港.地下酒馆赌局.熔岩地心城.黑死病小镇.武侠客栈.未来法庭.午夜广播电台.巨型温室.环形监狱塔.沙漠商队绿洲.永昼小镇.深渊灯塔.折纸世界.巨人国边境`.split(`.`);function Ge({world:e}){if(!e)return null;let t=Math.max(0,We.indexOf(e));return(0,u.jsxs)(`div`,{className:`world-focus`,"aria-hidden":`true`,children:[(0,u.jsx)(`div`,{className:`focus-camera`,style:{backgroundPosition:t%8/7*100+`% `+Math.floor(t/8)/3*100+`%`}},e),(0,u.jsx)(`div`,{className:`focus-halo`}),(0,u.jsxs)(`div`,{className:`focus-world`,children:[(0,u.jsxs)(`small`,{children:[`WORLD `,String(t+1).padStart(2,`0`),` / 32`]}),(0,u.jsx)(`strong`,{children:e})]},`name-`+e)]})}var Ke=`停摆医院.永夜列车.迷雾小镇.深海囚笼.废土集市.幽冥戏班.像素王城.无重力空间站.极夜科考站.镜像图书馆.快递末世.糖果工厂.高考修罗场.剧本杀片场.上古遗迹.天台便利店.霓虹黑客都市.暴雪山庄.空中飞艇港.地下酒馆赌局.熔岩地心城.黑死病小镇.武侠客栈.未来法庭.午夜广播电台.巨型温室.环形监狱塔.沙漠商队绿洲.永昼小镇.深渊灯塔.折纸世界.巨人国边境`.split(`.`);function qe(){let e=(0,O.useRef)(null),t=(0,O.useRef)(0),[n,r]=(0,O.useState)(0);(0,O.useEffect)(()=>{let n=e.current?.closest(`section`);if(!n)return;let i=-1/0,a=-1/0,o=e=>Math.max(0,Math.min(32,e));function s(e){if(n.closest(`.menu-open`)||e.target.closest(`button,a,select,input`)||e.ctrlKey||Math.abs(e.deltaY)<Math.abs(e.deltaX)||!e.deltaY)return;e.preventDefault();let s=performance.now(),c=s-i;i=s,!(c<160||s-a<260)&&(a=s,t.current=o(t.current+Math.sign(e.deltaY)),r(t.current))}function c(e){if(n.closest(`.menu-open`)||/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName))return;let i=[`ArrowDown`,`PageDown`].includes(e.key)?1:[`ArrowUp`,`PageUp`].includes(e.key)?-1:0;i&&!e.repeat&&(e.preventDefault(),t.current=o(t.current+i),r(t.current))}return n.addEventListener(`wheel`,s,{passive:!1}),addEventListener(`keydown`,c),()=>{n.removeEventListener(`wheel`,s),removeEventListener(`keydown`,c)}},[]);let i=Math.max(0,Math.min(31,Math.floor(n-.15))),a=n>.15;(0,O.useEffect)(()=>{let t=e.current?.closest(`section`);t&&(t.style.setProperty(`--travel`,String(n)),t.classList.toggle(`is-travelling`,n>.15))},[n]);function o(e){t.current=Math.max(0,Math.min(32,e)),r(t.current)}return(0,u.jsxs)(`div`,{ref:e,className:`depth-worlds `+(a?`depth-entered`:``),children:[(0,u.jsx)(`div`,{className:`depth-horizon`,style:{transform:`scale(${1+n*.012}) translateY(${-n*1.5}px)`}}),Ke.map((e,t)=>{let r=t+1-n;return r===0?(0,u.jsx)(`div`,{className:`depth-scene`,style:{opacity:Math.max(0,1-Math.abs(r)*.8),transform:`scale(${1-r*.16}) translateY(${r*18}px)`,filter:`blur(${Math.abs(r)*1.8}px)`,zIndex:40-t},children:(0,u.jsx)(`div`,{className:`depth-painting`,style:{backgroundPosition:`${t%8/7*100}% ${Math.floor(t/8)/3*100}%`}})},e):null}),(0,u.jsx)(`div`,{className:`depth-fog depth-fog-back`,style:{transform:`translateX(${-n*6}px)`}}),(0,u.jsx)(`div`,{className:`depth-fog depth-fog-front`,style:{transform:`translateX(${n*14}px) scale(${1+n*.025})`}}),(0,u.jsx)(`div`,{className:`depth-shade`}),(0,u.jsxs)(`div`,{className:`depth-title`,"aria-live":`polite`,children:[(0,u.jsxs)(`small`,{children:[`WORLD `,String(i+1).padStart(2,`0`),` / 32`]}),(0,u.jsx)(`h2`,{children:Ke[i]}),(0,u.jsx)(`p`,{children:`滚动一次，发现下一个世界`})]}),(0,u.jsxs)(`div`,{className:`depth-navigation`,children:[(0,u.jsx)(`button`,{onClick:()=>o(0),"aria-label":`返回大陆全景`,children:`全景`}),(0,u.jsx)(`button`,{onClick:()=>o(Math.round(t.current)-1),disabled:n<.01,"aria-label":`向后移动景物`,children:`←`}),(0,u.jsxs)(`span`,{children:[a?String(i+1).padStart(2,`0`):`00`,` / 32`]}),(0,u.jsx)(`button`,{onClick:()=>o(Math.round(t.current)+1),disabled:n>31.99,"aria-label":`向前移动景物`,children:`→`})]})]})}function Je({onExplore:e}){return(0,u.jsxs)(`section`,{className:`terrain-nexus`,children:[(0,u.jsx)(qe,{}),(0,u.jsxs)(`div`,{className:`terrain-geography`,"aria-hidden":`true`,children:[(0,u.jsx)(`div`,{className:`terrain-vista`}),(0,u.jsxs)(`div`,{className:`terrain-landmark landmark-valley`,"aria-hidden":`true`,children:[(0,u.jsx)(`i`,{}),(0,u.jsxs)(`span`,{children:[`GHOST OPERA`,(0,u.jsx)(`b`,{children:`幽冥戏班`})]})]}),(0,u.jsxs)(`div`,{className:`terrain-landmark landmark-waste`,"aria-hidden":`true`,children:[(0,u.jsx)(`i`,{}),(0,u.jsxs)(`span`,{children:[`WASTELAND BAZAAR`,(0,u.jsx)(`b`,{children:`废土集市`})]})]}),(0,u.jsxs)(`div`,{className:`terrain-landmark landmark-hospital`,"aria-hidden":`true`,children:[(0,u.jsx)(`i`,{}),(0,u.jsxs)(`span`,{children:[`STILL HOSPITAL`,(0,u.jsx)(`b`,{children:`停摆医院`})]})]}),(0,u.jsxs)(`div`,{className:`terrain-landmark landmark-train`,"aria-hidden":`true`,children:[(0,u.jsx)(`i`,{}),(0,u.jsxs)(`span`,{children:[`EVERNIGHT EXPRESS`,(0,u.jsx)(`b`,{children:`永夜列车`})]})]}),(0,u.jsxs)(`div`,{className:`terrain-landmark landmark-town`,"aria-hidden":`true`,children:[(0,u.jsx)(`i`,{}),(0,u.jsxs)(`span`,{children:[`MISTBOUND TOWN`,(0,u.jsx)(`b`,{children:`迷雾小镇`})]})]})]}),(0,u.jsx)(`div`,{className:`land-mist mist-near`,"aria-hidden":`true`}),(0,u.jsx)(`div`,{className:`land-mist mist-far`,"aria-hidden":`true`}),(0,u.jsx)(`div`,{className:`land-motes`,"aria-hidden":`true`}),(0,u.jsxs)(`div`,{className:`terrain-coordinate`,children:[`BOUNDLESS LANDS / 万象大陆`,(0,u.jsx)(`span`,{children:`探索 · 相遇 · 接力`})]}),(0,u.jsxs)(`div`,{className:`terrain-copy`,children:[(0,u.jsx)(`span`,{children:`MANY WORLDS. ONE UNBROKEN HORIZON.`}),(0,u.jsxs)(`h1`,{children:[`一片大陆，`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`em`,{children:`无限的世界`})]}),(0,u.jsxs)(`p`,{children:[`繁荣、诡异与荒芜，在同一片大地交织。`,(0,u.jsx)(`br`,{}),`越过世界的边界，接过另一段未完的故事。`]}),(0,u.jsxs)(`button`,{onClick:e,className:`button primary terrain-explore`,children:[`探索世界 `,(0,u.jsx)(`b`,{children:`↗`})]}),(0,u.jsxs)(`div`,{className:`terrain-travel`,children:[(0,u.jsx)(`i`,{}),`你的旅程，即将展开 `,(0,u.jsx)(`span`,{children:`故事随你延续`})]})]}),(0,u.jsxs)(`div`,{className:`terrain-bottom`,children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`01`}),` 选择你的世界`]}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`02`}),` 带着故事出发`]}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`b`,{children:`03`}),` 在终点再次相遇`]}),(0,u.jsx)(`small`,{children:`一个结尾，千万个新的开场。`})]})]})}var Ye={games:[],routes:[],activeRoute:null,admin:!1},Xe=`停摆医院.永夜列车.迷雾小镇.深海囚笼.废土集市.幽冥戏班.像素王城.无重力空间站.极夜科考站.镜像图书馆.快递末世.糖果工厂.高考修罗场.剧本杀片场.上古遗迹.天台便利店.霓虹黑客都市.暴雪山庄.空中飞艇港.地下酒馆赌局.熔岩地心城.黑死病小镇.武侠客栈.未来法庭.午夜广播电台.巨型温室.环形监狱塔.沙漠商队绿洲.永昼小镇.深渊灯塔.折纸世界.巨人国边境`.split(`.`),Ze=[{id:`home`,label:`赛事总览`,icon:Ae},{id:`games`,label:`关卡作品`,icon:Te},{id:`upload`,label:`提交关卡`,icon:ze},{id:`admin`,label:`接线控制台`,icon:Oe}],Qe=e=>e===`approved`?`已验收`:e===`rejected`?`待修改`:`待验收`;function $e(){let[e,t]=(0,O.useState)(!1),[n,r]=(0,O.useState)(`home`),[i,a]=(0,O.useState)(Ye),[o,s]=(0,O.useState)(!1),[c,l]=(0,O.useState)(``),[d,f]=(0,O.useState)(``),[p,m]=(0,O.useState)(``),[h,g]=(0,O.useState)(!1),[_,v]=(0,O.useState)(``),[y,b]=(0,O.useState)(!1),[x,ee]=(0,O.useState)(``),[S,C]=(0,O.useState)([]),[te,ne]=(0,O.useState)({}),[re,ie]=(0,O.useState)(`无限世界 · 第一条世界线`),[ae,oe]=(0,O.useState)(null),[se,ce]=(0,O.useState)(!1),[w,T]=(0,O.useState)(``),[E,D]=(0,O.useState)(null),[ue,de]=(0,O.useState)(!1),[fe,pe]=(0,O.useState)(``),[k,me]=(0,O.useState)(!1),[he,A]=(0,O.useState)(null),[ge,De]=(0,O.useState)(`zip`),[j,Ae]=(0,O.useState)({team:``,world:`废土集市`,title:``,description:``,exitHook:``,entry:`index.html`,externalUrl:``}),Pe=(0,O.useRef)(null),Le=(0,O.useCallback)(le,[]),Re=(0,O.useCallback)(async(e=p)=>{try{let t=await Le(`state`,{},e);return a(t),s(!0),l(``),t}catch(e){l(e.message),s(!0)}},[Le,p]);(0,O.useEffect)(()=>{let e=sessionStorage.getItem(`iw-admin-key`)||``;e&&m(e),Re(e)},[]),(0,O.useEffect)(()=>{if(!d)return;let e=setTimeout(()=>f(``),4500);return()=>clearTimeout(e)},[d]);let Be=i.routes.find(e=>e.id===i.activeRoute),We=i.games.filter(e=>e.status===`approved`),Ke=i.games.filter(e=>e.status===`pending`);async function qe(e){e.preventDefault(),b(!0);try{await Le(`admin/check`,{method:`POST`},_),m(_),sessionStorage.setItem(`iw-admin-key`,_),await Re(_),g(!1),v(``),r(`admin`),f(`已进入主办方控制台。`)}catch(e){l(e.message)}finally{b(!1)}}async function $e(e){try{let t=i.admin?await Le(`admin/preview`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:e.id})}):await Le(`demo/`+e.id);oe({id:e.id,title:e.title,url:t.url,context:t.context})}catch(e){l(e.message)}}async function tt(e,t){b(!0);try{if(t===`approved`&&!e.hasRelay&&!confirm(`未自动检测到接力接口。确认已人工试玩验收，并强制通过？`)){b(!1);return}await Le(`admin/review`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:e.id,status:t,force:!e.hasRelay,note:t===`rejected`?`请检查接力接口、入口文件和通关流程后重新提交。`:e.hasRelay?``:`主办方人工试玩后强制验收。`})}),await Re(),f(t===`approved`?`关卡已验收，可以加入世界线。`:`已退回修改，作品文件仍保留。`)}catch(e){l(e.message)}finally{b(!1)}}function nt(e){if(e){if(e.size>50*1024*1024||!/\.zip$/i.test(e.name)){l(`请选择不超过 50 MB 的 ZIP 游戏包。`);return}D(e),A(null),l(``)}}async function rt(e){if(e.preventDefault(),ge===`zip`&&!E){l(`请先选择 ZIP 游戏包。`);return}me(!0),l(``);try{let e=new FormData;Object.entries(j).forEach(([t,n])=>e.set(t,n)),e.set(`mode`,ge),ge===`zip`&&E&&e.set(`file`,E),A(await Le(`upload`,{method:`POST`,headers:{"x-upload-code":fe},body:e})),await Re(),f(ge===`zip`?`游戏包已保存到云端，等待主办方验收。`:`外部作品地址已提交，等待主办方验收。`)}catch(e){l(e.message)}finally{me(!1)}}async function it(e){try{await navigator.clipboard.writeText(e),f(`已复制。`)}catch{f(`复制失败，请手动选中复制。`)}}let at=We.filter(e=>(e.title+e.world+e.team).includes(x));function ot(e){return(0,u.jsxs)(`article`,{className:`game-card`,children:[(0,u.jsxs)(`div`,{className:`game-poster `+(e.world.includes(`戏`)?`opera`:`market`),children:[(0,u.jsx)(`div`,{className:`poster-grid`}),(0,u.jsx)(`span`,{className:`poster-world`,children:e.world}),e.world.includes(`戏`)?(0,u.jsxs)(`div`,{className:`opera-art`,children:[(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{}),(0,u.jsx)(`b`,{children:`幽冥戏班`}),(0,u.jsx)(`em`,{}),(0,u.jsx)(`em`,{})]}):(0,u.jsxs)(`div`,{className:`market-art`,children:[(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{}),(0,u.jsx)(`b`,{}),(0,u.jsx)(`em`,{})]}),(0,u.jsxs)(`span`,{className:`poster-tag`,children:[(0,u.jsx)(`i`,{}),Qe(e.status)]}),(0,u.jsx)(`button`,{className:`poster-play`,onClick:()=>$e(e),"aria-label":`试玩`+e.title,children:(0,u.jsx)(Me,{size:17,fill:`currentColor`})})]}),(0,u.jsxs)(`div`,{className:`game-meta`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`world-type`,children:e.world}),(0,u.jsxs)(`span`,{className:`file-label`,children:[e.fileCount,` 个文件`]})]}),(0,u.jsx)(`h3`,{children:e.title}),(0,u.jsx)(`p`,{children:e.description}),(0,u.jsxs)(`footer`,{children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`i`,{className:`team-avatar`,children:e.team.slice(0,1)}),e.team]}),(0,u.jsxs)(`button`,{onClick:()=>$e(e),children:[`进入世界 `,(0,u.jsx)(ve,{size:14})]})]})]})]},e.id)}return(0,u.jsxs)(`div`,{className:`app-shell immersive-shell `+(n===`home`?`is-home`:`is-panel`)+(e?` menu-open`:``),children:[(0,u.jsx)(`button`,{className:`world-menu-trigger`,"aria-label":e?`收起功能菜单`:`打开功能菜单`,"aria-expanded":e,onClick:()=>t(!e),children:e?`×`:`☰`}),e&&(0,u.jsx)(`button`,{className:`world-menu-dismiss`,"aria-label":`关闭功能菜单`,onClick:()=>t(!1)}),(0,u.jsxs)(`aside`,{className:`sidebar`,children:[(0,u.jsxs)(`a`,{className:`logo`,href:`./index.html`,children:[(0,u.jsx)(`span`,{className:`logo-symbol`,children:`∞`}),(0,u.jsxs)(`span`,{children:[`无限世界`,(0,u.jsx)(`small`,{children:`INFINITE WORLDS`})]})]}),(0,u.jsxs)(`div`,{className:`event-label`,children:[(0,u.jsx)(`span`,{className:`event-dot`}),`赛事进行中`,(0,u.jsx)(`small`,{children:`TRAE ON CAMPUS`})]}),(0,u.jsx)(`nav`,{children:Ze.filter(e=>e.id===`home`||e.id===`games`).map(e=>(0,u.jsxs)(`button`,{className:n===e.id?`active`:``,onClick:()=>{r(e.id),l(``),t(!1)},children:[(0,u.jsx)(e.icon,{size:18}),e.label,e.id===`upload`&&(0,u.jsx)(Ne,{size:13,className:`nav-plus`}),e.id===`admin`&&i.admin&&Ke.length>0&&(0,u.jsx)(`b`,{children:Ke.length})]},e.id))}),(0,u.jsxs)(`div`,{className:`sidebar-note`,children:[(0,u.jsx)(`span`,{children:`一关一世界，一棒一段故事。`}),(0,u.jsxs)(`p`,{children:[`让你的结尾，`,(0,u.jsx)(`br`,{}),`成为下一位的开场。`]}),(0,u.jsx)(Oe,{size:24})]}),(0,u.jsxs)(`button`,{className:`sidebar-help`,onClick:()=>ce(!0),children:[(0,u.jsx)(ye,{size:17}),`接力指南`,(0,u.jsx)(ve,{size:13})]}),(0,u.jsxs)(`div`,{className:`sidebar-footer`,children:[(0,u.jsx)(`span`,{className:`avatar`,children:`∞`}),(0,u.jsxs)(`span`,{children:[i.admin?`主办方工作台`:`世界探索者`,(0,u.jsx)(`small`,{children:i.admin?`拥有审核与发布权限`:`从这里开启接力旅程`})]}),i.admin?(0,u.jsx)(`button`,{"aria-label":`退出管理`,onClick:()=>{sessionStorage.removeItem(`iw-admin-key`),m(``),a(Ye),Re(``),r(`home`)},children:(0,u.jsx)(je,{size:15})}):(0,u.jsx)(`button`,{hidden:!0,"aria-label":`主办方登录`,onClick:()=>g(!0),children:(0,u.jsx)(ke,{size:15})})]})]}),(0,u.jsxs)(`div`,{className:`main-shell`,children:[(0,u.jsxs)(`header`,{className:`topbar`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{children:`赛事大厅`}),(0,u.jsx)(`span`,{className:`breadcrumb`,children:`/`}),(0,u.jsx)(`b`,{children:Ze.find(e=>e.id===n)?.label})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsxs)(`span`,{className:`cloud-status`,children:[(0,u.jsx)(Ce,{size:14}),o&&!c?`静态游玩版`:`正在读取作品`]}),(0,u.jsxs)(`button`,{hidden:!0,className:`subtle-button`,onClick:()=>i.admin?r(`admin`):g(!0),children:[(0,u.jsx)(Ie,{size:15}),i.admin?`主办方`:`主办方入口`]})]})]}),(0,u.jsx)(Ge,{world:n===`upload`?j.world:null}),(0,u.jsxs)(`main`,{className:`content`,children:[n!==`home`&&(0,u.jsx)(`button`,{className:`world-panel-close`,onClick:()=>{r(`home`),l(``)},"aria-label":`关闭功能面板`,children:`× 返回大陆`}),n===`games`&&(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(Ue,{routes:i.routes})}),` `,c&&(0,u.jsxs)(`div`,{className:`alert error`,role:`alert`,children:[(0,u.jsx)(xe,{size:17}),(0,u.jsx)(`span`,{children:c}),(0,u.jsx)(`button`,{"aria-label":`关闭提示`,onClick:()=>l(``),children:(0,u.jsx)(Ve,{size:16})})]}),d&&(0,u.jsxs)(`div`,{className:`toast`,role:`status`,children:[(0,u.jsx)(Se,{size:17}),d]}),(n===`home`||n===`games`)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`section`,{className:`page-heading`,children:(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`eyebrow`,children:`TRAE ON CAMPUS · INFINITE WORLDS`}),(0,u.jsx)(`h1`,{children:n===`home`?`每一个结尾，都是新的开场。`:`每一关，都有一个独一无二的世界。`}),(0,u.jsx)(`p`,{children:n===`home`?`上传你的世界，接过别人的故事。一起完成这场无限流冒险。`:`来自不同队伍的想象，在这里相遇，等待你推开下一扇门。`})]})}),n===`home`&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(Je,{onExplore:()=>r(`games`)}),(0,u.jsx)(`div`,{id:`world-entries`}),!i.activeGroup&&(0,u.jsxs)(`section`,{className:`hero`,children:[(0,u.jsxs)(`div`,{className:`hero-copy`,children:[(0,u.jsxs)(`span`,{className:`hero-kicker`,children:[(0,u.jsx)(`i`,{}),`世界线已就绪 · 从这里出发`]}),(0,u.jsxs)(`h2`,{children:[`一个入口，`,(0,u.jsx)(`br`,{}),(0,u.jsx)(`em`,{children:`无限种可能。`})]}),(0,u.jsxs)(`p`,{children:[Be?Be.title+` · `+Be.stages.length+` 个世界等待探索`:`世界正在集结，验收后即可开启旅程。`,(0,u.jsx)(`br`,{}),`你的道具、线索与选择，将随旅程一路延续。`]}),(0,u.jsxs)(`div`,{className:`hero-actions`,children:[(0,u.jsxs)(`a`,{className:`button cream `+(Be?``:`disabled`),href:Be?`./index.html?run=`+Be.id:void 0,children:[(0,u.jsx)(Me,{size:14,fill:`currentColor`}),`开始完整旅程`,(0,u.jsx)(_e,{size:16})]}),(0,u.jsxs)(`button`,{onClick:()=>ce(!0),children:[`了解接力规则 `,(0,u.jsx)(ve,{size:14})]})]}),(0,u.jsxs)(`div`,{className:`hero-foot`,children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(be,{size:12}),`离线可玩`]}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(be,{size:12}),`跨关卡存档`]}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(be,{size:12}),`一键连续游玩`]})]})]}),(0,u.jsxs)(`div`,{className:`hero-map`,"aria-hidden":`true`,children:[(0,u.jsxs)(`svg`,{viewBox:`0 0 430 320`,children:[(0,u.jsx)(`path`,{d:`M65 235C65 80 320 300 340 75`,stroke:`#86a58b`,strokeWidth:`2`,strokeDasharray:`5 7`,fill:`none`}),(0,u.jsx)(`circle`,{cx:`90`,cy:`195`,r:`120`,fill:`none`,stroke:`#9eb59a22`}),(0,u.jsx)(`circle`,{cx:`300`,cy:`145`,r:`120`,fill:`none`,stroke:`#9eb59a22`}),(0,u.jsx)(`path`,{d:`m50 65 15 0m-7-7 0 15m310 190 15 0m-7-7 0 15`,stroke:`#acc3a4`,strokeWidth:`2`})]}),(0,u.jsxs)(`div`,{className:`world-ticket ticket-one`,children:[(0,u.jsx)(`span`,{children:`WORLD / 05`}),(0,u.jsx)(`b`,{children:`废土集市`}),(0,u.jsx)(`small`,{children:`这里什么都卖，除了明天。`}),(0,u.jsxs)(`div`,{className:`ticket-pixels`,children:[(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{}),(0,u.jsx)(`i`,{})]})]}),(0,u.jsxs)(`div`,{className:`world-ticket ticket-two`,children:[(0,u.jsx)(`span`,{children:`WORLD / 06`}),(0,u.jsx)(`b`,{children:`幽冥戏班`}),(0,u.jsx)(`small`,{children:`一出送魂戏，半卷未了缘。`}),(0,u.jsx)(`div`,{className:`ticket-mask`})]}),(0,u.jsx)(`span`,{className:`map-star`,children:`✦`}),(0,u.jsxs)(`span`,{className:`map-small`,children:[`THE NEXT WORLD`,(0,u.jsx)(`br`,{}),`IS WAITING FOR YOU.`]})]})]}),(0,u.jsxs)(`section`,{className:`stats-row`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`stat-icon`,children:(0,u.jsx)(Te,{size:21})}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{children:`已验收的世界`}),(0,u.jsxs)(`b`,{children:[String(We.length).padStart(2,`0`),(0,u.jsx)(`small`,{children:`个关卡`})]})]})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`stat-icon`,children:(0,u.jsx)(Oe,{size:21})}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{children:`已发布世界线`}),(0,u.jsxs)(`b`,{children:[String(i.routes.length).padStart(2,`0`),(0,u.jsx)(`small`,{children:`条旅程`})]})]})]}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{className:`stat-icon`,children:(0,u.jsx)(Ie,{size:21})}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{children:`作品先验收，再接力`}),(0,u.jsx)(`b`,{className:`stat-text`,children:`让每一棒，稳稳接住`})]})]})]})]}),(0,u.jsxs)(`section`,{className:`section-header`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h2`,{children:n===`home`?`已上线的世界`:`关卡作品库`}),(0,u.jsx)(`span`,{children:`各自精彩，连成完整故事。`})]}),n===`home`?(0,u.jsxs)(`button`,{onClick:()=>r(`games`),children:[`查看全部作品 `,(0,u.jsx)(_e,{size:14})]}):(0,u.jsxs)(`label`,{className:`search`,children:[(0,u.jsx)(Fe,{size:15}),(0,u.jsx)(`input`,{"aria-label":`搜索世界或队伍`,value:x,onChange:e=>ee(e.target.value),placeholder:`搜索世界、作品或队伍`})]})]}),(0,u.jsxs)(`div`,{className:`game-grid`,children:[(n===`home`?at.slice(0,3):at).map(ot),o?at.length?null:(0,u.jsxs)(`div`,{className:`empty-panel`,children:[(0,u.jsx)(Te,{size:30}),(0,u.jsx)(`h3`,{children:`下一个世界，等你来创造。`}),(0,u.jsx)(`p`,{children:`作品通过主办方验收后，会出现在这里。`}),(0,u.jsx)(`button`,{className:`button outline`,onClick:()=>r(`upload`),children:`提交第一份作品`})]}):(0,u.jsx)(`div`,{className:`empty-panel`,children:`正在读取云端作品…`}),!1]}),n===`home`&&(0,u.jsxs)(`section`,{className:`how-strip`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`span`,{children:`HOW IT WORKS`}),(0,u.jsx)(`h3`,{children:`从一份作品，到一场冒险。`})]}),(0,u.jsxs)(`p`,{children:[(0,u.jsx)(`b`,{children:`01`}),`选手上传 `,(0,u.jsx)(_e,{size:13}),(0,u.jsx)(`b`,{children:`02`}),`主办方验收 `,(0,u.jsx)(_e,{size:13}),(0,u.jsx)(`b`,{children:`03`}),`串联世界线 `,(0,u.jsx)(_e,{size:13}),(0,u.jsx)(`b`,{children:`04`}),`一起出发`]})]})]}),n===`upload`&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`section`,{className:`page-heading`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`eyebrow`,children:`CREATE THE NEXT CHAPTER`}),(0,u.jsx)(`h1`,{children:`把你的世界，交给下一位。`}),(0,u.jsx)(`p`,{children:`提交可在浏览器运行的游戏包，验收通过后自动加入无限世界。`})]}),(0,u.jsxs)(`span`,{className:`save-badge`,children:[(0,u.jsx)(Ce,{size:15}),`文件保存到云端`]})]}),(0,u.jsxs)(`div`,{className:`upload-layout`,children:[(0,u.jsxs)(`form`,{className:`upload-form`,onSubmit:rt,children:[(0,u.jsxs)(`div`,{className:`form-section-title`,children:[(0,u.jsx)(`span`,{children:`01`}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h2`,{children:`介绍一下你的世界`}),(0,u.jsx)(`p`,{children:`这些内容会显示在关卡作品库中。`})]})]}),(0,u.jsxs)(`div`,{className:`form-grid`,children:[(0,u.jsxs)(`label`,{children:[`队伍名称`,(0,u.jsx)(`input`,{required:!0,maxLength:40,value:j.team,onChange:e=>Ae({...j,team:e.target.value}),placeholder:`例如：不想加班队`})]}),(0,u.jsxs)(`label`,{children:[`世界签`,(0,u.jsx)(`select`,{value:j.world,onChange:e=>Ae({...j,world:e.target.value}),children:Xe.map(e=>(0,u.jsx)(`option`,{children:e},e))})]})]}),(0,u.jsxs)(`label`,{children:[`作品名称`,(0,u.jsx)(`input`,{required:!0,maxLength:60,value:j.title,onChange:e=>Ae({...j,title:e.target.value}),placeholder:`给这一段旅程起个名字`})]}),(0,u.jsxs)(`label`,{children:[`关卡简介`,(0,u.jsx)(`textarea`,{required:!0,maxLength:400,rows:3,value:j.description,onChange:e=>Ae({...j,description:e.target.value}),placeholder:`玩家将在你的世界中经历什么？`})]}),(0,u.jsxs)(`label`,{children:[`结尾钩子`,(0,u.jsx)(`textarea`,{required:!0,maxLength:400,rows:3,value:j.exitHook,onChange:e=>Ae({...j,exitHook:e.target.value}),placeholder:`留下一个结尾，让下一队能够接住。主办方接线时仍可调整。`})]}),(0,u.jsxs)(`div`,{className:`form-section-title second`,children:[(0,u.jsx)(`span`,{children:`02`}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h2`,{children:`选择作品提交方式`}),(0,u.jsx)(`p`,{children:`ZIP 由平台托管；外部 URL 适合 Unity、Godot 等已部署作品。`})]})]}),(0,u.jsxs)(`div`,{className:`form-grid`,children:[(0,u.jsxs)(`button`,{type:`button`,className:`button `+(ge===`zip`?`primary`:`outline`),onClick:()=>De(`zip`),children:[(0,u.jsx)(Ee,{size:15}),`A 轨 · 上传 ZIP`]}),(0,u.jsxs)(`button`,{type:`button`,className:`button `+(ge===`url`?`primary`:`outline`),onClick:()=>De(`url`),children:[(0,u.jsx)(Te,{size:15}),`B 轨 · 外部 URL`]})]}),ge===`url`&&(0,u.jsxs)(`label`,{children:[`外部作品地址`,(0,u.jsx)(`input`,{required:ge===`url`,type:`url`,value:j.externalUrl,onChange:e=>Ae({...j,externalUrl:e.target.value}),placeholder:`https://your-team.example/game/index.html`}),(0,u.jsx)(`small`,{children:`必须使用 HTTPS。请勿设置阻止 iframe 嵌入的响应头，例如 X-Frame-Options: DENY / SAMEORIGIN，或不允许大厅域名的 CSP frame-ancestors。作品需接入 IW_READY / IW_INIT_SAVE / IW_SAVE。`})]}),ge===`zip`&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`dropzone `+(ue?`drag`:``),onDragOver:e=>{e.preventDefault(),de(!0)},onDragLeave:()=>de(!1),onDrop:e=>{e.preventDefault(),de(!1),nt(e.dataTransfer.files[0])},children:[(0,u.jsx)(`input`,{ref:Pe,type:`file`,accept:`.zip,application/zip`,onChange:e=>nt(e.target.files?.[0]),"aria-label":`选择 ZIP 游戏包`}),E?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(Ee,{size:29}),(0,u.jsx)(`h3`,{children:E.name}),(0,u.jsxs)(`p`,{children:[(E.size/1024/1024).toFixed(2),` MB · 已选择`]}),(0,u.jsx)(`button`,{type:`button`,onClick:()=>Pe.current?.click(),children:`重新选择`})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(ze,{size:28}),(0,u.jsx)(`h3`,{children:`把 ZIP 游戏包拖到这里`}),(0,u.jsxs)(`p`,{children:[`或`,(0,u.jsx)(`button`,{type:`button`,onClick:()=>Pe.current?.click(),children:`点击选择文件`}),` · 最大 50 MB`]}),(0,u.jsx)(`small`,{children:`HTML / CSS / JavaScript 与常见游戏素材`})]})]}),(0,u.jsxs)(`label`,{children:[`入口 HTML 路径`,(0,u.jsx)(`input`,{required:!0,value:j.entry,maxLength:250,onChange:e=>Ae({...j,entry:e.target.value}),placeholder:`index.html 或 my-world/index.html`}),(0,u.jsx)(`small`,{children:`填写它在 ZIP 内的位置；只有一个 index.html 时可自动识别。`})]})]}),!i.admin&&(0,u.jsxs)(`label`,{children:[`选手上传邀请码`,(0,u.jsx)(`input`,{required:!0,type:`password`,value:fe,onChange:e=>pe(e.target.value),placeholder:`向主办方领取，不是管理员口令`,autoComplete:`off`})]}),(0,u.jsxs)(`div`,{className:`upload-bottom`,children:[(0,u.jsxs)(`p`,{children:[(0,u.jsx)(Ie,{size:15}),`上传后先验收，不会立即加入路线。`]}),(0,u.jsxs)(`button`,{className:`button primary`,disabled:k,children:[k?`正在上传并检查…`:`提交验收`,!k&&(0,u.jsx)(_e,{size:15})]})]}),he&&(0,u.jsxs)(`div`,{className:`upload-success`,role:`status`,children:[(0,u.jsx)(Se,{size:23}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h3`,{children:he.message}),(0,u.jsxs)(`p`,{children:[`投稿编号：`,he.id,(0,u.jsx)(`br`,{}),he.fileCount,` 个文件 · 入口 `,he.entry]})]})]})]}),(0,u.jsxs)(`aside`,{className:`upload-guide`,children:[(0,u.jsx)(`span`,{className:`eyebrow`,children:`SUBMISSION CHECKLIST`}),(0,u.jsx)(`h2`,{children:`让下一队接得住。`}),(0,u.jsxs)(`ul`,{children:[(0,u.jsxs)(`li`,{children:[(0,u.jsx)(be,{size:16}),`包含可运行的 HTML 入口。`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(be,{size:16}),`图片、脚本和样式一起打包。`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(be,{size:16}),`接入主办方 SAVE_STATE v3。`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(be,{size:16}),`能产出道具、线索和结尾钩子。`]}),(0,u.jsxs)(`li`,{children:[(0,u.jsx)(be,{size:16}),`50 MB ZIP / 解压后 120 MB / 单文件 35 MB。`]})]}),(0,u.jsxs)(`div`,{className:`guide-note`,children:[(0,u.jsx)(ye,{size:22}),(0,u.jsx)(`h3`,{children:`参赛者交付包 v2`}),(0,u.jsx)(`p`,{children:`包含本地模拟器、种子卡、HTML5 示例和 Unity、Godot、Phaser 适配器。`}),(0,u.jsx)(`a`,{className:`button outline`,href:`./participant-delivery-kit-v2.zip`,download:!0,children:`下载参赛者交付包 v2`}),(0,u.jsx)(`p`,{children:`用 WL.readSave 读取上家，用 WL.completeLevel 完成交接。网站会在路线中自动设置关序与下一关地址。`}),(0,u.jsxs)(`button`,{onClick:()=>ce(!0),children:[`查看接力指南 `,(0,u.jsx)(ve,{size:13})]})]}),(0,u.jsx)(`p`,{className:`muted small`,children:`本平台运行网页游戏，不运行 EXE、Python 或需要独立服务器的程序。`})]})]})]}),n===`admin`&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`section`,{className:`page-heading`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`div`,{className:`eyebrow`,children:`THE WORLDLINE CONTROL ROOM`}),(0,u.jsx)(`h1`,{children:`接住每一棒，排好每一程。`}),(0,u.jsx)(`p`,{children:`先试玩验收，再编排顺序。新路线不会打断正在进行的旅程。`})]}),i.admin&&(0,u.jsxs)(`button`,{className:`button outline`,onClick:async()=>{try{T((await Le(`admin/invitation`)).code)}catch(e){l(e.message)}},children:[(0,u.jsx)(ke,{size:15}),`查看上传邀请码`]})]}),i.admin?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(He,{games:i.games,adminKey:p,onChanged:()=>{Re()}}),(0,u.jsxs)(`section`,{className:`review-panel`,children:[(0,u.jsxs)(`div`,{className:`section-header`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`h2`,{children:`投稿验收`}),(0,u.jsxs)(`span`,{children:[Ke.length,` 份待验收 · `,We.length,` 份已通过`]})]}),(0,u.jsx)(`button`,{onClick:()=>Re(),children:`刷新列表 ↻`})]}),(0,u.jsxs)(`div`,{className:`review-table`,children:[(0,u.jsxs)(`div`,{className:`table-head`,children:[(0,u.jsx)(`span`,{children:`世界 / 作品`}),(0,u.jsx)(`span`,{children:`提交队伍`}),(0,u.jsx)(`span`,{children:`接力检查`}),(0,u.jsx)(`span`,{children:`状态`}),(0,u.jsx)(`span`,{children:`操作`})]}),i.games.map(e=>(0,u.jsxs)(`div`,{className:`table-row`,children:[(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:e.world}),(0,u.jsx)(`small`,{children:e.title})]}),(0,u.jsx)(`span`,{children:e.team}),(0,u.jsxs)(`span`,{className:e.hasRelay?`relay-ok`:`relay-no`,children:[e.hasRelay?(0,u.jsx)(be,{size:13}):(0,u.jsx)(xe,{size:13}),` `,e.hasRelay?`已检测接口`:`需补接口`]}),(0,u.jsx)(`span`,{children:(0,u.jsx)(`i`,{className:`status-badge `+e.status,children:Qe(e.status)})}),(0,u.jsxs)(`div`,{className:`table-actions`,children:[(0,u.jsxs)(`button`,{onClick:()=>$e(e),children:[`试玩`,(0,u.jsx)(ve,{size:12})]}),e.status!==`approved`&&(0,u.jsx)(`button`,{disabled:y,onClick:()=>tt(e,`approved`),children:e.hasRelay?`通过`:`人工强制通过`}),e.status!==`rejected`&&(0,u.jsx)(`button`,{disabled:y,className:`reject`,onClick:()=>tt(e,`rejected`),children:`退回`})]})]},e.id)),!i.games.length&&(0,u.jsx)(`div`,{className:`empty-panel`,children:`还没有投稿。把上传邀请码发给选手即可开始收集作品。`})]}),(0,u.jsx)(`p`,{className:`table-note`,children:`接口检查不能替代实际通关验收。确认各条分支都能交接后，再点击通过。`})]})]}):(0,u.jsxs)(`div`,{className:`admin-gate`,children:[(0,u.jsx)(Ie,{size:38}),(0,u.jsx)(`h2`,{children:`这里是主办方的接线台。`}),(0,u.jsx)(`p`,{children:`输入管理员口令，即可验收作品、调整顺序并发布世界线。`}),(0,u.jsxs)(`button`,{className:`button primary`,onClick:()=>g(!0),children:[`进入主办方控制台 `,(0,u.jsx)(_e,{size:15})]})]})]}),(0,u.jsxs)(`footer`,{className:`site-foot`,children:[(0,u.jsx)(`span`,{children:`无限世界 · TRAE ON CAMPUS`}),(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`span`,{className:`event-dot`}),`故事在这里接力，世界在这里相连。`]})]})]})]}),h&&(0,u.jsx)(`div`,{className:`modal-backdrop`,children:(0,u.jsxs)(`form`,{className:`modal login-modal`,onSubmit:qe,children:[(0,u.jsx)(`button`,{type:`button`,className:`modal-close`,"aria-label":`关闭登录`,onClick:()=>g(!1),children:(0,u.jsx)(Ve,{size:19})}),(0,u.jsx)(`span`,{className:`modal-symbol`,children:(0,u.jsx)(Ie,{size:26})}),(0,u.jsx)(`div`,{className:`eyebrow`,children:`FOR ORGANIZERS`}),(0,u.jsx)(`h2`,{children:`欢迎回到接线台。`}),(0,u.jsx)(`p`,{children:`输入主办方管理员口令。上传邀请码不能用于管理。`}),(0,u.jsxs)(`label`,{children:[`管理员口令`,(0,u.jsx)(`input`,{autoFocus:!0,required:!0,type:`password`,value:_,onChange:e=>v(e.target.value),autoComplete:`current-password`})]}),c&&(0,u.jsx)(`p`,{className:`inline-error`,role:`alert`,children:c}),(0,u.jsxs)(`button`,{className:`button primary`,disabled:y,children:[y?`正在验证…`:`进入控制台`,(0,u.jsx)(_e,{size:15})]})]})}),w&&(0,u.jsx)(`div`,{className:`modal-backdrop`,children:(0,u.jsxs)(`div`,{className:`modal`,children:[(0,u.jsx)(`button`,{className:`modal-close`,"aria-label":`关闭邀请码`,onClick:()=>T(``),children:(0,u.jsx)(Ve,{size:19})}),(0,u.jsx)(`div`,{className:`eyebrow`,children:`TEAM UPLOAD CODE`}),(0,u.jsx)(`h2`,{children:`把这一串，交给选手。`}),(0,u.jsx)(`p`,{children:`邀请码只允许上传，不授予审核或发布权限。`}),(0,u.jsx)(`code`,{className:`invite-code`,children:w}),(0,u.jsxs)(`button`,{className:`button primary`,onClick:()=>it(w),children:[(0,u.jsx)(we,{size:15}),`复制上传邀请码`]})]})}),se&&(0,u.jsx)(`div`,{className:`modal-backdrop`,children:(0,u.jsxs)(`div`,{className:`modal help-modal`,children:[(0,u.jsx)(`button`,{className:`modal-close`,"aria-label":`关闭指南`,onClick:()=>ce(!1),children:(0,u.jsx)(Ve,{size:19})}),(0,u.jsx)(`div`,{className:`eyebrow`,children:`INFINITE WORLDS / FIELD GUIDE`}),(0,u.jsx)(`h2`,{children:`每一关，都为下一关留一扇门。`}),(0,u.jsx)(`a`,{className:`button outline`,href:`./participant-delivery-kit-v2.zip`,download:!0,children:`下载参赛者交付包 v2`}),(0,u.jsx)(`p`,{children:`通用道具使用 effect 描述效果，入场效果只结算一次。作品可以用 WL.respawn 和 WL.assist 实现复活与难度调整。`}),(0,u.jsx)(`h3`,{children:`选手：把可运行的网页游戏打成 ZIP`}),(0,u.jsx)(`p`,{children:`保留 HTML、CSS、JS、图片等相对目录。推荐连同主办方 shared 目录打包。填写入口路径，领取上传邀请码后送审。`}),(0,u.jsx)(`h3`,{children:`接力：读上家，留出口`}),(0,u.jsx)(`pre`,{children:`var save = WL.readSave(CONFIG.level);
WL.addItem(save, {id:"lamp", name:"提灯", type:"light"});
WL.addClue(save, "门后传来三声锣响");
WL.completeLevel(CONFIG, save, {
  exitHook:"推开门，走进下一世界。",
  passViaUrl:true
});`}),(0,u.jsx)(`p`,{children:`正式路线自动注入关序、上下家世界和下一关地址。主办方可在接线台为每关填写合适的出口钩子。`}),(0,u.jsx)(`h3`,{children:`主办方：试玩验收`}),(0,u.jsx)(`p`,{children:`接口检查通过后仍须完整通关。通过验收的作品会按提交顺序自动接入无限世界，无需手动发布。`}),(0,u.jsx)(`h3`,{children:`玩家：点击开始，故事一路跟随`}),(0,u.jsx)(`p`,{children:`关卡间通过 SAVE_STATE v3 和 URL 传递面板、道具、线索与旅程。关内进度取决于作品支持；平台会为作品提供隔离的本机存储。`}),(0,u.jsxs)(`button`,{className:`button primary`,onClick:()=>ce(!1),children:[`知道了，去创造下一章 `,(0,u.jsx)(_e,{size:15})]})]})}),ae&&(0,u.jsx)(`div`,{className:`modal-backdrop preview-backdrop`,children:(0,u.jsxs)(`div`,{className:`preview-modal`,children:[(0,u.jsxs)(`header`,{children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(Me,{size:15}),`试玩 · `,ae.title]}),(0,u.jsx)(`button`,{onClick:()=>oe(null),"aria-label":`关闭试玩`,children:(0,u.jsx)(Ve,{size:21})})]}),(0,u.jsx)(et,{url:ae.url,namespace:`preview`,initialGameId:ae.id,context:ae.context}),(0,u.jsx)(`footer`,{children:`试玩不会自动加入正式世界线，请完整验收后再通过。`})]})})]})}function et({url:e,namespace:t,initialGameId:n,onMessage:r,command:i,context:a}){let o=(0,O.useRef)(null),[s,c]=(0,O.useState)(``),l=(0,O.useRef)(!1),[d,f]=(0,O.useState)({show:!0,loaded:!1,title:`正在连接世界`,hook:``}),[p,m]=(0,O.useState)(!1),[h,g]=(0,O.useState)(!1);return(0,O.useEffect)(()=>{if(!d.show)return;g(!1);let e=setTimeout(()=>g(!0),15e3);return()=>clearTimeout(e)},[d.show,d.title]),(0,O.useEffect)(()=>{if(!d.show||!d.loaded)return;let e=p||matchMedia(`(prefers-reduced-motion: reduce)`).matches?0:1100,t=setTimeout(()=>f(e=>({...e,show:!1})),e);return()=>clearTimeout(t)},[d.loaded,d.show,p]),(0,O.useEffect)(()=>{l.current=!1,c(new URL(e,location.href).href)},[e]),(0,O.useEffect)(()=>{function e(e){if(e.source!==o.current?.contentWindow||!e.data||typeof e.data!=`object`)return;let i=e.data;if(a&&(i.routeId!==void 0&&i.routeId!==a.routeId||i.slot!==void 0&&i.slot!==a.slot||i.gameId!==void 0&&i.gameId!==a.gameId))return;let s=a?{...i,routeId:a.routeId,slot:a.slot,gameId:a.gameId}:i;if([`IW_READY`,`iw-enter`].includes(s.type)){a&&!l.current&&(l.current=!0,o.current?.contentWindow?.postMessage({type:`IW_INIT_SAVE`,save:a.save,history:a.history,config:a,routeId:a.routeId,slot:a.slot},`*`));let e={};try{e=JSON.parse(localStorage.getItem(`iw-game:`+t+`:`+n)||`{}`)}catch{}o.current?.contentWindow?.postMessage({type:`IW_STORAGE_INIT`,values:e},`*`),f(e=>({...e,loaded:!0,title:a?.world||s.world||e.title}))}if(s.type===`iw-storage`&&s.gameId===n&&typeof s.key==`string`&&s.key.length<150&&(s.value===null||typeof s.value==`string`&&s.value.length<=65536)){try{let e=`iw-game:`+t+`:`+n,r=Object.assign(Object.create(null),JSON.parse(localStorage.getItem(e)||`{}`));s.value===null?delete r[s.key]:r[s.key]=s.value,localStorage.setItem(e,JSON.stringify(r))}catch{}return}r?.(s)}return addEventListener(`message`,e),()=>removeEventListener(`message`,e)},[a,t,n,r]),(0,O.useEffect)(()=>{!i||!s||(o.current?.focus(),o.current?.contentWindow?.postMessage({type:`IW_ADMIN_COMMAND`,command:i.type,action:i.type},`*`))},[i,s]),(0,u.jsxs)(`div`,{className:`portal-stage`,children:[s?(0,u.jsx)(`iframe`,{ref:o,srcDoc:T(e,a),title:`网页游戏隔离运行区`,sandbox:`allow-scripts allow-pointer-lock allow-orientation-lock`,allow:`autoplay; fullscreen; cross-origin-isolated; gamepad`,referrerPolicy:`no-referrer`,onLoad:()=>o.current?.focus()}):(0,u.jsx)(`div`,{className:`loading-game`,children:`正在推开世界的门…`}),d.show&&(0,u.jsxs)(`div`,{className:`portal-transition `+(p?`is-fast`:``),role:`status`,"aria-live":`polite`,children:[(0,u.jsx)(`div`,{className:`pixel-motes`}),(0,u.jsx)(`span`,{children:`WORLD TRANSFER / 世界跃迁`}),(0,u.jsx)(`h2`,{children:d.title}),(0,u.jsx)(`p`,{children:d.hook||`将故事装进行囊，下一段旅程即将开启。`}),(0,u.jsx)(`p`,{children:h?`加载时间较长，你可以返回查看游戏画面，或刷新页面重试。`:d.loaded?`世界已就绪，正在抵达…`:`正在等待世界就绪…`}),(0,u.jsx)(`button`,{onClick:()=>{m(!0),(d.loaded||h)&&f(e=>({...e,show:!1}))},children:h?`返回游戏画面`:d.loaded?`跳过转场`:`跳过动画，等待加载`})]})]})}function tt({worlds:e}){let[t,n]=(0,O.useState)(0),[r,i]=(0,O.useState)(!1);(0,O.useEffect)(()=>{if(r||e.length<2)return;let t=matchMedia(`(prefers-reduced-motion: reduce)`),i=setInterval(()=>{t.matches||n(t=>(t+1)%e.length)},5500);return()=>clearInterval(i)},[e.length,r]);let a=t%Math.max(1,e.length);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`div`,{className:`finale-landscape`+(r?` is-paused`:``),"aria-hidden":`true`,children:e.map((e,t)=>{let n=Ke.indexOf(e);return(0,u.jsx)(`div`,{className:`finale-scene`+(t===a?` is-visible`:``)+(n<0?` is-panorama`:``),style:n<0?void 0:{backgroundPosition:n%8/7*100+`% `+Math.floor(n/8)/3*100+`%`}},t)})}),(0,u.jsxs)(`div`,{className:`finale-scene-caption`,children:[(0,u.jsx)(`span`,{children:e[a]}),e.length>1&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>n((a+1)%e.length),children:`下一幕`}),(0,u.jsx)(`button`,{className:`finale-pause`,onClick:()=>i(!r),children:r?`继续回放`:`暂停回放`})]})]})]})}function nt({title:e,saved:t,onBegin:n}){let r=(0,O.useRef)(null),i=(0,O.useRef)(null),[a,o]=(0,O.useState)(!1),s=(0,O.useRef)(!0);(0,O.useEffect)(()=>()=>{i.current&&clearTimeout(i.current)},[]),(0,O.useEffect)(()=>{let e=r.current;if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=matchMedia(`(prefers-reduced-motion: reduce)`),i=0,o=0,s=0,c=0,l=0;function u(){c=innerWidth,l=innerHeight;let n=Math.min(devicePixelRatio||1,2);e.width=c*n,e.height=l*n,t.setTransform(n,0,0,n,0,0)}u(),addEventListener(`resize`,u);function d(e){let r=o?Math.min((e-o)/1e3,.05):0;o=e,n.matches||(s+=r*(a?2.8:.42)),t.fillStyle=`#04131c`,t.fillRect(0,0,c,l);let u=c*.5,f=l*.48,p=Math.hypot(c,l)*.7,m=t.createRadialGradient(u,f,0,u,f,p);m.addColorStop(0,`#153441`),m.addColorStop(.12,`#1b5c62`),m.addColorStop(.45,`#0a2837`),m.addColorStop(1,`#020d16`),t.fillStyle=m,t.fillRect(0,0,c,l);for(let e=0;e<42;e++){let n=(e/42+s*.14)%1,r=16+n**2.9*p,i=e*.16+s*.12;t.beginPath();for(let e=0;e<=120;e++){let n=e/120*Math.PI*2,a=r*(1+.06*Math.sin(n*3+i)),o=u+Math.cos(n+i)*a,s=f+Math.sin(n+i)*a*.68;e?t.lineTo(o,s):t.moveTo(o,s)}t.strokeStyle=`hsla(${165+e*1.8},65%,${55+n*15}%,${(.05+n*.23)*(a?1.4:1)})`,t.lineWidth=.7+n*1.8,t.stroke()}for(let e=0;e<100;e++){let n=e*2.39996+s*.08,r=(e*.173+s*.18)%1,i=r**2.8*p;t.beginPath(),t.moveTo(u+Math.cos(n)*i,f+Math.sin(n)*i*.7),t.lineTo(u+Math.cos(n)*(i+2+r*r*(a?100:25)),f+Math.sin(n)*(i+2+r*r*(a?100:25))*.7),t.strokeStyle=`rgba(182,227,210,${r*.45})`,t.lineWidth=.6,t.stroke()}n.matches||(i=requestAnimationFrame(d))}return i=requestAnimationFrame(d),()=>{cancelAnimationFrame(i),removeEventListener(`resize`,u)}},[a]);function c(e){a||(s.current=e,o(!0),i.current=setTimeout(()=>n(e),matchMedia(`(prefers-reduced-motion: reduce)`).matches?80:1700))}return(0,u.jsxs)(`section`,{className:`vortex-entry `+(a?`vortex-entering`:``),children:[(0,u.jsx)(`canvas`,{ref:r,"aria-hidden":`true`}),(0,u.jsx)(`div`,{className:`vortex-vignette`}),(0,u.jsxs)(`div`,{className:`vortex-copy`,children:[(0,u.jsx)(`span`,{className:`vortex-kicker`,children:`BEYOND THE EDGE OF TIME`}),(0,u.jsx)(`h1`,{children:e}),(0,u.jsx)(`p`,{children:a?`时空航道已开启，正在穿越世界边界…`:`跨越时间的涟漪，走进下一段命运。`}),(0,u.jsxs)(`div`,{className:`vortex-actions`,children:[(0,u.jsxs)(`button`,{disabled:a,onClick:()=>c(!0),children:[`全新开始 `,(0,u.jsx)(`span`,{children:`↗`})]}),(0,u.jsxs)(`button`,{disabled:a||!t,onClick:()=>c(!1),children:[`继续游玩 `,(0,u.jsx)(`span`,{children:`→`})]})]}),(0,u.jsx)(`small`,{children:t?`已发现你的旅程 · 全新开始将重置本次线路进度`:`你的第一段旅程，正等待开启`})]}),a&&(0,u.jsx)(`button`,{className:`vortex-skip`,onClick:()=>{i.current&&clearTimeout(i.current),n(s.current)},children:`跳过穿梭 →`}),(0,u.jsx)(`div`,{className:`vortex-coordinate`,"aria-hidden":`true`,children:`∞ / TIME STREAM ACTIVE`})]})}var rt=e=>`iw-progress:`+e;function it(e,t){try{let n=JSON.parse(e.getItem(rt(t))||`null`);return n&&typeof n.runId==`string`&&typeof n.search==`string`?n:null}catch{return null}}function at(e,t){let n=`iw-game:`+t+`:`,r=[];for(let t=0;t<e.length;t++){let i=e.key(t);i?.startsWith(n)&&r.push(i)}r.forEach(t=>e.removeItem(t)),e.removeItem(rt(t))}function ot(e,t,n){let r=it(e,t);return r&&r.runId!==n.runId?!1:(e.setItem(rt(t),JSON.stringify({...n,updatedAt:new Date().toISOString()})),!0)}var st=le;function ct({id:e}){let[t,n]=(0,O.useState)(null),[r,i]=(0,O.useState)(``),[a,o]=(0,O.useState)(0),[s,c]=(0,O.useState)(null),[l,d]=(0,O.useState)(null),[f,p]=(0,O.useState)(!1),[m,h]=(0,O.useState)(!1),[g,_]=(0,O.useState)(null),[v,y]=(0,O.useState)(``),[b,x]=(0,O.useState)(``),[ee,S]=(0,O.useState)(``),[C,te]=(0,O.useState)(!1),[ne,re]=(0,O.useState)(``),[ae,oe]=(0,O.useState)(180),[se,ce]=(0,O.useState)(),w=(0,O.useRef)(null),T=(0,O.useRef)(!1),le=(0,O.useRef)(null),E=(0,O.useRef)(null),D=(0,O.useRef)({count:0,at:0}),ue=(0,O.useCallback)((t,n,r=!1)=>{w.current=t,le.current=n,y(t.runId),o(t.step),h(!0);let i=new URLSearchParams({runId:t.runId,step:String(t.step)});if(t.done&&i.set(`done`,`1`),history.replaceState(null,``,`./index.html?run=`+e+`&`+i),ot(localStorage,e,{runId:t.runId,search:i.toString()}),t.done){d({save:t.save,history:t.history}),c(null),st(`results`,{routeId:e,runId:t.runId,save:t.save,history:t.history}).then(()=>S(`本次旅程已记录。`)).catch(()=>S(`汇总暂未成功，服务器进度已保留。`));return}d(null);let a=n.stages[t.step],s=new URL(a.external_url||`./games/route/`+t.step+`/`+a.entry_path,location.href);s.searchParams.set(`runId`,t.runId),r&&s.searchParams.set(`_reload`,String(Date.now())),c({url:s.href,gameId:a.id,context:{...ie(n,t.step,location.origin),save:t.save,history:t.history}})},[e]);(0,O.useEffect)(()=>{let t=!0;return st(`routes/`+e).then(r=>{if(!t)return;if(r.id!==e){location.replace(`/run/`+r.id);return}n(r),le.current=r;let i=new URLSearchParams(location.search),a=it(localStorage,e),o=i.get(`runId`);_(o?{runId:o,search:i.toString()}:i.has(`save`)?{runId:`legacy`,search:i.toString()}:a)}).catch(e=>i(e.message)),()=>{t=!1}},[e]);function de(){try{E.current||=new AudioContext,E.current.resume()}catch{}}async function fe(n){if(!T.current){T.current=!0;try{de(),i(``),re(``),n&&at(localStorage,e);let r;try{r=n||!g?.runId?await st(`runs`,{routeId:e}):await st(`runs/`+g.runId)}catch(t){let i=new URLSearchParams(g?.search||``),a=i.get(`save`);if(n||!a||a.length>2e4||Number(i.get(`step`))<=0)throw t;let o=JSON.parse(decodeURIComponent(escape(atob(a))));r=await st(`runs`,{routeId:e,legacy:{step:Number(i.get(`step`)),save:o}}),re(`旧版交接存档已迁移为短链接，旧关序以前的回放使用平台钩子恢复。`)}if(r.routeId!==e)throw Error(`存档与当前世界线不符，请全新开始。`);ue(r,t)}catch(e){i(e.message)}finally{T.current=!1}}}let pe=(0,O.useCallback)(async(t,n=!1,r=``)=>{let a=w.current;if(!(!a||a.done||T.current)){T.current=!0;try{ue(await st(`runs/`+a.runId,{routeId:e,step:a.step,revision:a.revision,save:t,failure:n,reason:r}),le.current)}catch(e){i(e.message),re(`交接未完成，进度已保留；请重试通关或刷新旅程。`)}finally{T.current=!1}}},[e,ue]),k=(0,O.useCallback)(t=>{let n=w.current;if(!(!n||n.done||!t||typeof t!=`object`||t.routeId!==e||t.slot!==n.step)){if(t.type===`IW_FAIL`){pe(t.fallenSave||n.save,!0,String(t.reason||`探索者生命耗尽`));return}[`IW_SAVE`,`iw-save`,`IW_COMPLETE`].includes(t.type)&&t.save&&typeof t.save==`object`&&pe(t.save,t.failure===!0,String(t.reason||``))}},[e,pe]);(0,O.useEffect)(()=>{if(!m||l)return;let e=w.current?.enteredAt||Date.now(),t=!1,n=setInterval(()=>{let n=Date.now()-e;oe(Math.max(0,Math.ceil((18e4-n)/1e3))),n>=18e4&&n<19e4&&re(`本关时间已到，将在 `+Math.ceil((19e4-n)/1e3)+` 秒后执行遗物交接。`),n>=19e4&&!t&&(t=!0,pe(w.current.save,!0,`时空裂隙坍缩（演示超时）`))},1e3);return()=>clearInterval(n)},[m,l,a,pe]),(0,O.useEffect)(()=>{function e(e){(e.key===`F8`||e.ctrlKey&&e.altKey&&e.key.toLowerCase()===`k`)&&(e.preventDefault(),te(e=>!e))}return addEventListener(`keydown`,e),()=>removeEventListener(`keydown`,e)},[]);function me(){w.current&&ue(w.current,le.current,!0)}async function he(){if(!(T.current||!w.current||w.current.done)){T.current=!0;try{let t=w.current;ue(await st(`runs/`+t.runId,{routeId:e,step:t.step,revision:t.revision,action:`heal`}),le.current,!0),re(`已恢复满血并重新载入当前关。`)}catch(e){i(e.message)}finally{T.current=!1}}}function A(){pe(w.current?.save,!0,`裁判强制跳关`),te(!1)}function ve(){de(),ce({type:`audio`,nonce:Date.now()}),re(`已发送音频解锁指令。`)}function ye(){let e=Date.now();D.current=e-D.current.at<1200?{count:D.current.count+1,at:e}:{count:1,at:e},D.current.count>=3&&(te(!0),D.current.count=0)}async function be(){try{await navigator.clipboard.writeText(location.href),p(!0),setTimeout(()=>p(!1),2500)}catch{i(`复制失败，请复制地址栏中的旅程链接。`)}}let xe=String(Math.floor(ae/60)).padStart(2,`0`)+`:`+String(ae%60).padStart(2,`0`);return(0,u.jsxs)(`div`,{className:`run-shell`,children:[(0,u.jsx)(`style`,{children:`.rescue-button{display:inline-flex;align-items:center;gap:6px}.watchdog{font-variant-numeric:tabular-nums;color:#d8c58f}.watchdog.urgent{color:#ff8d7a}.rescue-backdrop{position:fixed;inset:0;z-index:10000;background:rgba(3,8,15,.82);display:grid;place-items:center;padding:20px}.rescue-panel{width:min(560px,100%);background:#101b29;border:1px solid #486072;border-radius:14px;padding:22px;color:#edf5f7;box-shadow:0 24px 90px #000}.rescue-panel header{display:flex;justify-content:space-between;align-items:center}.rescue-panel h2{margin:0}.rescue-panel p{color:#b7c6ce;line-height:1.7}.rescue-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.rescue-actions button{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px}.rescue-notice{color:#9ff5c8;min-height:24px}`}),(0,u.jsxs)(`header`,{className:`run-top`,children:[(0,u.jsxs)(`a`,{href:`./index.html`,children:[(0,u.jsx)(ge,{size:16}),`返回赛事大厅`]}),(0,u.jsxs)(`span`,{onClick:ye,role:`button`,tabIndex:0,"aria-label":`无限世界，连续点击三次打开裁判救援`,children:[(0,u.jsx)(`b`,{children:`∞ 无限世界`}),(0,u.jsx)(`small`,{children:t?.title||`世界线加载中`})]}),(0,u.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,u.jsxs)(`button`,{className:`rescue-button`,onClick:()=>te(!0),children:[(0,u.jsx)(Le,{size:15}),`裁判救援`]}),(0,u.jsxs)(`button`,{onClick:be,children:[(0,u.jsx)(we,{size:15}),f?`已复制进度链接`:`复制进度链接`]})]})]}),r&&(0,u.jsx)(`div`,{className:`alert error`,children:r}),t&&!m&&(0,u.jsx)(nt,{title:t.title,saved:!!g,onBegin:fe}),t&&m&&(0,u.jsxs)(`div`,{className:`run-body`,children:[(0,u.jsxs)(`nav`,{className:`run-journey-strip`,"aria-label":`世界旅程`,children:[t.stages.map((e,t)=>(0,u.jsxs)(`span`,{className:l||t<a?`is-complete`:``,"aria-current":!l&&t===a?`step`:void 0,children:[l||t<a?(0,u.jsx)(Se,{size:13}):String(t+1).padStart(2,`0`),` `,e.world]},e.id)),(0,u.jsxs)(`span`,{"aria-current":l?`step`:void 0,children:[(0,u.jsx)(De,{size:13}),`终局`]})]}),(0,u.jsx)(`main`,{className:`run-game`,children:l?(0,u.jsxs)(`div`,{className:`journey-finished`,children:[(0,u.jsx)(tt,{worlds:t.stages.map(e=>e.world)}),(0,u.jsx)(`div`,{className:`eyebrow`,children:`THE WORLDS ARE CONNECTED`}),(0,u.jsxs)(`h1`,{children:[(0,u.jsx)(`span`,{children:`我已不再地坛`}),(0,u.jsx)(`span`,{children:`地坛在我`})]}),(0,u.jsx)(`p`,{children:l.history.length?`你走过了 `+l.history.length+` 段世界旅程。`:`世界线已抵达终局。`}),(0,u.jsx)(`div`,{className:`finish-items`,children:Array.isArray(l.save.items)&&l.save.items.map((e,t)=>(0,u.jsx)(`span`,{children:String(e.name||`遗物`)},t))}),(0,u.jsx)(`div`,{className:`finish-items`,children:(l.save.clues||[]).map((e,t)=>(0,u.jsx)(`span`,{children:String(e)},t))}),(0,u.jsx)(`p`,{children:ee}),b&&(0,u.jsx)(`a`,{className:`button primary`,href:`/finale/`+b,children:`进入共同终局与三线汇总`}),(0,u.jsx)(`div`,{className:`journey-history`,children:l.history.slice(-38).map((e,t)=>(0,u.jsxs)(`div`,{children:[(0,u.jsx)(`b`,{children:String(e.world||`未知世界`)}),(0,u.jsx)(`p`,{children:String(e.hook||``)})]},t))}),(0,u.jsxs)(`a`,{className:`finale-return`,href:`./index.html`,children:[`回到赛事大厅 `,(0,u.jsx)(_e,{size:15})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(`div`,{className:`run-game-title`,children:[(0,u.jsxs)(`span`,{children:[(0,u.jsx)(`i`,{}),`正在游玩`]}),(0,u.jsx)(`b`,{children:t.stages[a]?.world}),(0,u.jsxs)(`small`,{children:[`第 `,a+1,` / `,t.stages.length,` 关 · `,(0,u.jsxs)(`span`,{className:`watchdog `+(ae<=30?`urgent`:``),children:[`看门狗 `,xe]})]})]}),ne&&(0,u.jsx)(`div`,{className:`alert`,role:`status`,children:ne}),s&&(0,u.jsx)(et,{url:s.url,namespace:e+`:`+v,initialGameId:s.gameId,onMessage:k,command:se,context:s.context},s.url)]})})]}),C&&(0,u.jsx)(`div`,{className:`rescue-backdrop`,role:`dialog`,"aria-modal":`true`,"aria-label":`裁判救援控制台`,children:(0,u.jsxs)(`section`,{className:`rescue-panel`,children:[(0,u.jsxs)(`header`,{children:[(0,u.jsx)(`h2`,{children:`裁判救援控制台`}),(0,u.jsx)(`button`,{onClick:()=>te(!1),"aria-label":`关闭`,children:(0,u.jsx)(Ve,{size:18})})]}),(0,u.jsx)(`p`,{children:`用于现场卡死、静音或角色状态异常。强制跳关会生成本关墓碑，并将当前背包作为遗物交给下一位满血探索者。`}),(0,u.jsxs)(`div`,{className:`rescue-actions`,children:[(0,u.jsxs)(`button`,{onClick:he,children:[(0,u.jsx)(j,{size:17}),`满血复活`]}),(0,u.jsxs)(`button`,{onClick:A,children:[(0,u.jsx)(Re,{size:17}),`强制跳关`]}),(0,u.jsxs)(`button`,{onClick:ve,children:[(0,u.jsx)(Be,{size:17}),`音频解锁`]}),(0,u.jsxs)(`button`,{onClick:()=>{ce({type:`reload`,nonce:Date.now()}),me(),re(`已重载当前关，看门狗不会重置。`)},children:[(0,u.jsx)(Pe,{size:17}),`重载当前关`]})]}),(0,u.jsx)(`p`,{className:`rescue-notice`,children:ne}),(0,u.jsx)(`small`,{children:`快捷键：F8 或 Ctrl + Alt + K`})]})})]})}(0,c.createRoot)(document.getElementById(`root`)).render(new URLSearchParams(location.search).get(`run`)===w.id?(0,u.jsx)(ct,{id:w.id}):(0,u.jsx)($e,{}));