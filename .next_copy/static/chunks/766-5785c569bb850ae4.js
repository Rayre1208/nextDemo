(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[766],{89861:function(t,e,r){"use strict";let n=(0,r(72296).Z)("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]);e.Z=n},70601:function(t,e,r){"use strict";let n=(0,r(72296).Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]);e.Z=n},68525:function(t,e,r){"use strict";r.d(e,{V:function(){return i}});var n=r(72296),o=r(70587);function i(t){return(0,o.Z)("MuiDivider",t)}let a=(0,n.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);e.Z=a},19506:function(t,e,r){"use strict";r.d(e,{K:function(){return i}});var n=r(72296),o=r(70587);function i(t){return(0,o.Z)("MuiMenuItem",t)}let a=(0,n.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);e.Z=a},88929:function(t,e,r){"use strict";r.d(e,{Z:function(){return C}});var n=r(23950),o=r(22988),i=r(2265),a=r(44839),c=r(644),u=r(76990),l=r(70587),s=r(47794),d=r(48762),p=r(40261),f=r(26350),g=r(11939),h=r(3351),F=r(57437);let m=["component","direction","spacing","divider","children","className","useFlexGap"],b=(0,f.Z)(),v=(0,s.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root});function k(t){return(0,d.Z)({props:t,name:"MuiStack",defaultTheme:b})}let x=t=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[t],y=({ownerState:t,theme:e})=>{let r=(0,o.Z)({display:"flex",flexDirection:"column"},(0,g.k9)({theme:e},(0,g.P$)({values:t.direction,breakpoints:e.breakpoints.values}),t=>({flexDirection:t})));if(t.spacing){let n=(0,h.hB)(e),o=Object.keys(e.breakpoints.values).reduce((e,r)=>(("object"==typeof t.spacing&&null!=t.spacing[r]||"object"==typeof t.direction&&null!=t.direction[r])&&(e[r]=!0),e),{}),i=(0,g.P$)({values:t.direction,base:o}),a=(0,g.P$)({values:t.spacing,base:o});"object"==typeof i&&Object.keys(i).forEach((t,e,r)=>{if(!i[t]){let n=e>0?i[r[e-1]]:"column";i[t]=n}}),r=(0,c.Z)(r,(0,g.k9)({theme:e},a,(e,r)=>t.useFlexGap?{gap:(0,h.NA)(n,e)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${x(r?i[r]:t.direction)}`]:(0,h.NA)(n,e)}}))}return(0,g.dt)(e.breakpoints,r)};var Z=r(48024),w=r(69281),C=function(t={}){let{createStyledComponent:e=v,useThemeProps:r=k,componentName:c="MuiStack"}=t,s=()=>(0,u.Z)({root:["root"]},t=>(0,l.Z)(c,t),{}),d=e(y);return i.forwardRef(function(t,e){let c=r(t),u=(0,p.Z)(c),{component:l="div",direction:f="column",spacing:g=0,divider:h,children:b,className:v,useFlexGap:k=!1}=u,x=(0,n.Z)(u,m),y=s();return(0,F.jsx)(d,(0,o.Z)({as:l,ownerState:{direction:f,spacing:g,useFlexGap:k},ref:e,className:(0,a.Z)(y.root,v)},x,{children:h?function(t,e){let r=i.Children.toArray(t).filter(Boolean);return r.reduce((t,n,o)=>(t.push(n),o<r.length-1&&t.push(i.cloneElement(e,{key:`separator-${o}`})),t),[])}(b,h):b}))})}({createStyledComponent:(0,Z.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:(t,e)=>e.root}),useThemeProps:t=>(0,w.Z)({props:t,name:"MuiStack"})})},48632:function(t,e,r){"use strict";var n=r(13815);e.Z=n.Z},47794:function(t,e,r){"use strict";let n=(0,r(3389).ZP)();e.Z=n},13815:function(t,e,r){"use strict";var n=r(2265);let o="undefined"!=typeof window?n.useLayoutEffect:n.useEffect;e.Z=o},16463:function(t,e,r){"use strict";var n=r(71169);r.o(n,"usePathname")&&r.d(e,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(e,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(e,{useSearchParams:function(){return n.useSearchParams}}),r.o(n,"useServerInsertedHTML")&&r.d(e,{useServerInsertedHTML:function(){return n.useServerInsertedHTML}})},20357:function(t,e,r){"use strict";var n,o;t.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(88081)},88081:function(t){!function(){var e={229:function(t){var e,r,n,o=t.exports={};function i(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function c(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(r){try{return e.call(null,t,0)}catch(r){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var u=[],l=!1,s=-1;function d(){l&&n&&(l=!1,n.length?u=n.concat(u):s=-1,u.length&&p())}function p(){if(!l){var t=c(d);l=!0;for(var e=u.length;e;){for(n=u,u=[];++s<e;)n&&n[s].run();s=-1,e=u.length}n=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function f(t,e){this.fun=t,this.array=e}function g(){}o.nextTick=function(t){var e=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new f(t,e)),1!==u.length||l||c(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(t){return[]},o.binding=function(t){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}},a=!0;try{e[t](i,i.exports,n),a=!1}finally{a&&delete r[t]}return i.exports}n.ab="//";var o=n(229);t.exports=o}()},3949:function(t,e,r){"use strict";r.d(e,{Z:function(){return p}});var n=r(57437),o=r(91326),i=r(88929),a=r(83719),c=r(22960),u=r(22305),l=r(85694),s=r(56887),d=r(41395);function p(t){let{children:e,image:r,title:p}=t,f=(0,c.Z)(),g=(0,l.F)("up","md"),h=(0,n.jsx)(d.Z,{sx:{zIndex:9,position:"absolute",m:{xs:2,md:5}}}),F=(0,n.jsx)(i.Z,{sx:{width:1,mx:"auto",maxWidth:480,px:{xs:2,md:8},pt:{xs:15,md:20},pb:{xs:15,md:0}},children:e}),m=(0,n.jsxs)(i.Z,{flexGrow:1,spacing:10,alignItems:"center",justifyContent:"center",sx:{...(0,s.v3)({color:(0,u.Fq)(f.palette.background.default,"light"===f.palette.mode?.88:.94),imgUrl:"/assets/background/overlay_2.jpg"})},children:[(0,n.jsx)(a.Z,{variant:"h3",sx:{maxWidth:480,textAlign:"center"},children:p||"Hi, Welcome back"}),(0,n.jsx)(o.Z,{component:"img",alt:"auth",src:r||"/assets/illustrations/illustration_dashboard.png",sx:{maxWidth:{xs:480,lg:560,xl:720}}})]});return(0,n.jsxs)(i.Z,{component:"main",direction:"row",sx:{minHeight:"100vh"},children:[h,g&&m,F]})}},56887:function(t,e,r){"use strict";r.d(e,{D9:function(){return l},Ls:function(){return s},O1:function(){return p},uS:function(){return u},v3:function(){return d}});var n=r(22305),o=r(68525),i=r(70601),a=r(19506),c=r(89861);let u=t=>{let{theme:e,bgcolor:r,dropdown:n}=t;return{...s({blur:20,opacity:.9,color:e.palette.background.paper,...!!r&&{color:r}}),backgroundImage:"url(/assets/cyan-blur.png), url(/assets/red-blur.png)",backgroundRepeat:"no-repeat, no-repeat",backgroundPosition:"top right, left bottom",backgroundSize:"50%, 50%",..."rtl"===e.direction&&{backgroundPosition:"top left, right bottom"},...n&&{padding:e.spacing(.5),boxShadow:e.customShadows.dropdown,borderRadius:1.25*e.shape.borderRadius}}},l=t=>({...t.typography.body2,padding:t.spacing(.75,1),borderRadius:.75*t.shape.borderRadius,"&:not(:last-of-type)":{marginBottom:4},["&.".concat(a.Z.selected)]:{fontWeight:t.typography.fontWeightSemiBold,backgroundColor:t.palette.action.selected,"&:hover":{backgroundColor:t.palette.action.hover}},["& .".concat(i.Z.root)]:{padding:t.spacing(.5),marginLeft:t.spacing(-.5),marginRight:t.spacing(.5)},["&.".concat(c.Z.option,'[aria-selected="true"]')]:{backgroundColor:t.palette.action.selected,"&:hover":{backgroundColor:t.palette.action.hover}},["&+.".concat(o.Z.root)]:{margin:t.spacing(.5,0)}});function s(t){let e=(null==t?void 0:t.color)||"#000000",r=(null==t?void 0:t.blur)||6,o=(null==t?void 0:t.opacity)||.8,i=null==t?void 0:t.imgUrl;return i?{position:"relative",backgroundImage:"url(".concat(i,")"),"&:before":{position:"absolute",top:0,left:0,zIndex:9,content:'""',width:"100%",height:"100%",backdropFilter:"blur(".concat(r,"px)"),WebkitBackdropFilter:"blur(".concat(r,"px)"),backgroundColor:(0,n.Fq)(e,o)}}:{backdropFilter:"blur(".concat(r,"px)"),WebkitBackdropFilter:"blur(".concat(r,"px)"),backgroundColor:(0,n.Fq)(e,o)}}function d(t){let e=(null==t?void 0:t.direction)||"to bottom",r=null==t?void 0:t.startColor,n=null==t?void 0:t.endColor,o=null==t?void 0:t.imgUrl,i=null==t?void 0:t.color;return o?{background:"linear-gradient(".concat(e,", ").concat(r||i,", ").concat(n||i,"), url(").concat(o,")"),backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}:{background:"linear-gradient(".concat(e,", ").concat(r,", ").concat(n,")")}}let p={x:{msOverflowStyle:"none",scrollbarWidth:"none",overflowX:"scroll","&::-webkit-scrollbar":{display:"none"}},y:{msOverflowStyle:"none",scrollbarWidth:"none",overflowY:"scroll","&::-webkit-scrollbar":{display:"none"}}}},29514:function(t,e,r){"use strict";r.d(e,{BA:function(){return o},BD:function(){return a},DG:function(){return g},Kp:function(){return l},T$:function(){return i},Vp:function(){return u},um:function(){return c},vU:function(){return s},y0:function(){return d}});var n=r(22305);let o={0:"#FFFFFF",100:"#F9FAFB",200:"#F4F6F8",300:"#DFE3E8",400:"#C4CDD5",500:"#919EAB",600:"#637381",700:"#454F5B",800:"#212B36",900:"#161C24"},i={lighter:"#C8FAD6",light:"#5BE49B",main:"#00A76F",dark:"#007867",darker:"#004B50",contrastText:"#FFFFFF"},a={lighter:"#EFD6FF",light:"#C684FF",main:"#8E33FF",dark:"#5119B7",darker:"#27097A",contrastText:"#FFFFFF"},c={lighter:"#CAFDF5",light:"#61F3F3",main:"#00B8D9",dark:"#006C9C",darker:"#003768",contrastText:"#FFFFFF"},u={lighter:"#D3FCD2",light:"#77ED8B",main:"#22C55E",dark:"#118D57",darker:"#065E49",contrastText:"#ffffff"},l={lighter:"#FFF5CC",light:"#FFD666",main:"#FFAB00",dark:"#B76E00",darker:"#7A4100",contrastText:o[800]},s={lighter:"#FFE9D5",light:"#FFAC82",main:"#FF5630",dark:"#B71D18",darker:"#7A0916",contrastText:"#FFFFFF"},d={black:"#000000",white:"#FFFFFF"},p={hover:(0,n.Fq)(o[500],.08),selected:(0,n.Fq)(o[500],.16),disabled:(0,n.Fq)(o[500],.8),disabledBackground:(0,n.Fq)(o[500],.24),focus:(0,n.Fq)(o[500],.24),hoverOpacity:.08,disabledOpacity:.48},f={primary:i,secondary:a,info:c,success:u,warning:l,error:s,grey:o,common:d,divider:(0,n.Fq)(o[500],.2),action:p};function g(t){let e={...f,mode:"light",text:{primary:o[800],secondary:o[600],disabled:o[500]},background:{paper:"#FFFFFF",default:"#FFFFFF",neutral:o[200]},action:{...f.action,active:o[600]}},r={...f,mode:"dark",text:{primary:"#FFFFFF",secondary:o[500],disabled:o[600]},background:{paper:o[800],default:o[900],neutral:(0,n.Fq)(o[500],.12)},action:{...f.action,active:o[500]}};return"light"===t?e:r}}}]);