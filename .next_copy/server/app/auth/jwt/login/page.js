(()=>{var e={};e.id=818,e.ids=[818],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},28093:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),t(89336),t(53024),t(44654),t(11930),t(38529);var s=t(23191),i=t(88716),a=t(37922),n=t.n(a),o=t(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let d=["",{children:["auth",{children:["jwt",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,89336)),"D:\\TypeScriptProject\\nextDemo\\src\\app\\auth\\jwt\\login\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,53024)),"D:\\TypeScriptProject\\nextDemo\\src\\app\\auth\\jwt\\login\\layout.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,44654)),"D:\\TypeScriptProject\\nextDemo\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,11930)),"D:\\TypeScriptProject\\nextDemo\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,38529)),"D:\\TypeScriptProject\\nextDemo\\src\\app\\not-found.tsx"]}],c=["D:\\TypeScriptProject\\nextDemo\\src\\app\\auth\\jwt\\login\\page.tsx"],u="/auth/jwt/login/page",x={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/auth/jwt/login/page",pathname:"/auth/jwt/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},71707:(e,r,t)=>{Promise.resolve().then(t.bind(t,56780))},62558:(e,r,t)=>{Promise.resolve().then(t.bind(t,6722)),Promise.resolve().then(t.bind(t,53927))},56780:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(10326),i=t(25825),a=t(93839);function n({children:e}){return s.jsx(i.Ak,{children:s.jsx(a.Z,{children:e})})}},19680:(e,r,t)=>{"use strict";t.d(r,{a:()=>o,Z:()=>a});var s=t(10326),i=t(74723);function a({children:e,onSubmit:r,methods:t}){return s.jsx(i.RV,{...t,children:s.jsx("form",{onSubmit:r,children:e})})}var n=t(76776);function o({name:e,helperText:r,type:t,...a}){let{control:o}=(0,i.Gc)();return s.jsx(i.Qr,{name:e,control:o,render:({field:e,fieldState:{error:i}})=>s.jsx(n.Z,{...e,fullWidth:!0,type:t,value:"number"===t&&0===e.value?"":e.value,onChange:r=>{"number"===t?e.onChange(Number(r.target.value)):e.onChange(r.target.value)},error:!!i,helperText:i?i?.message:r,...a})})}},93839:(e,r,t)=>{"use strict";t.d(r,{Z:()=>x});var s=t(10326),i=t(71728),a=t(17082),n=t(25609),o=t(23743),l=t(22553),d=t(43988),c=t(32508),u=t(75741);function x({children:e,image:r,title:t}){let x=(0,o.Z)(),p=(0,d.F)("up","md"),m=s.jsx(u.Z,{sx:{zIndex:9,position:"absolute",m:{xs:2,md:5}}}),h=s.jsx(a.Z,{sx:{width:1,mx:"auto",maxWidth:480,px:{xs:2,md:8},pt:{xs:15,md:20},pb:{xs:15,md:0}},children:e}),g=(0,s.jsxs)(a.Z,{flexGrow:1,spacing:10,alignItems:"center",justifyContent:"center",sx:{...(0,c.v3)({color:(0,l.Fq)(x.palette.background.default,"light"===x.palette.mode?.88:.94),imgUrl:"/assets/background/overlay_2.jpg"})},children:[s.jsx(n.Z,{variant:"h3",sx:{maxWidth:480,textAlign:"center"},children:t||"Hi, Welcome back"}),s.jsx(i.Z,{component:"img",alt:"auth",src:r||"/assets/illustrations/illustration_dashboard.png",sx:{maxWidth:{xs:480,lg:560,xl:720}}})]});return(0,s.jsxs)(a.Z,{component:"main",direction:"row",sx:{minHeight:"100vh"},children:[m,p&&g,h]})}},6722:(e,r,t)=>{"use strict";t.d(r,{default:()=>Z});var s=t(10326),i=t(10123),a=t(17577),n=t(74723),o=t(1774),l=t(52188),d=t(51490),c=t(17082),u=t(43055),x=t(25609),p=t(12046),m=t(57329),h=t(25539),g=t(97730),j=t(33104),v=t(48157),y=t(69481),w=t(89193),b=t(52213),f=t(19680);function Z(){let{login:e}=(0,y.E)(),r=(0,j.tv)(),[t,Z]=(0,a.useState)(""),P=(0,j.lr)().get("returnTo"),q=(0,v.k)(),S=i.Ry().shape({email:i.Z_().required("Email is required").email("Email must be a valid email address"),password:i.Z_().required("Password is required")}),_=(0,n.cI)({resolver:(0,o.X)(S),defaultValues:{email:"demo@minimals.cc",password:"demo1234"}}),{reset:D,handleSubmit:T,formState:{isSubmitting:E}}=_,k=T(async t=>{try{await e?.(t.email,t.password),r.push(P||w.wd)}catch(e){console.error(e),D(),Z("string"==typeof e?e:e.message)}}),A=(0,s.jsxs)(c.Z,{spacing:2,sx:{mb:5},children:[s.jsx(x.Z,{variant:"h4",children:"Sign in to Minimal"}),(0,s.jsxs)(c.Z,{direction:"row",spacing:.5,children:[s.jsx(x.Z,{variant:"body2",children:"New user?"}),s.jsx(l.Z,{component:g.r,href:h.H.auth.jwt.register,variant:"subtitle2",children:"Create an account"})]})]}),C=(0,s.jsxs)(c.Z,{spacing:2.5,children:[s.jsx(f.a,{name:"email",label:"Email address"}),s.jsx(f.a,{name:"password",label:"Password",type:q.value?"text":"password",InputProps:{endAdornment:s.jsx(m.Z,{position:"end",children:s.jsx(u.Z,{onClick:q.onToggle,edge:"end",children:s.jsx(b.Z,{icon:q.value?"solar:eye-bold":"solar:eye-closed-bold"})})})}}),s.jsx(l.Z,{variant:"body2",color:"inherit",underline:"always",sx:{alignSelf:"flex-end"},children:"Forgot password?"}),s.jsx(p.Z,{fullWidth:!0,color:"inherit",size:"large",type:"submit",variant:"contained",loading:E,children:"Login"})]});return(0,s.jsxs)(s.Fragment,{children:[A,(0,s.jsxs)(d.Z,{severity:"info",sx:{mb:3},children:["Use email : ",s.jsx("strong",{children:"demo@minimals.cc"})," / password :",s.jsx("strong",{children:" demo1234"})]}),!!t&&s.jsx(d.Z,{severity:"error",sx:{mb:3},children:t}),s.jsx(f.Z,{methods:_,onSubmit:k,children:C})]})}},53927:(e,r,t)=>{"use strict";t.d(r,{default:()=>Z});var s=t(10326),i=t(10123),a=t(17577),n=t(74723),o=t(1774),l=t(52188),d=t(51490),c=t(17082),u=t(43055),x=t(25609),p=t(12046),m=t(57329),h=t(25539),g=t(97730),j=t(33104),v=t(48157),y=t(69481),w=t(89193),b=t(52213),f=t(19680);function Z(){let{register:e}=(0,y.E)(),r=(0,j.tv)(),[t,Z]=(0,a.useState)(""),P=(0,j.lr)().get("returnTo"),q=(0,v.k)(),S=i.Ry().shape({firstName:i.Z_().required("First name required"),lastName:i.Z_().required("Last name required"),email:i.Z_().required("Email is required").email("Email must be a valid email address"),password:i.Z_().required("Password is required")}),_=(0,n.cI)({resolver:(0,o.X)(S),defaultValues:{firstName:"",lastName:"",email:"",password:""}}),{reset:D,handleSubmit:T,formState:{isSubmitting:E}}=_,k=T(async t=>{try{await e?.(t.email,t.password,t.firstName,t.lastName),r.push(P||w.wd)}catch(e){console.error(e),D(),Z("string"==typeof e?e:e.message)}}),A=(0,s.jsxs)(c.Z,{spacing:2,sx:{mb:5,position:"relative"},children:[s.jsx(x.Z,{variant:"h4",children:"Get started absolutely free"}),(0,s.jsxs)(c.Z,{direction:"row",spacing:.5,children:[s.jsx(x.Z,{variant:"body2",children:" Already have an account? "}),s.jsx(l.Z,{href:h.H.auth.jwt.login,component:g.r,variant:"subtitle2",children:"Sign in"})]})]}),C=(0,s.jsxs)(x.Z,{component:"div",sx:{mt:2.5,textAlign:"center",typography:"caption",color:"text.secondary"},children:["By signing up, I agree to ",s.jsx(l.Z,{underline:"always",color:"text.primary",children:"Terms of Service"})," and ",s.jsx(l.Z,{underline:"always",color:"text.primary",children:"Privacy Policy"}),"."]}),N=(0,s.jsxs)(c.Z,{spacing:2.5,children:[(0,s.jsxs)(c.Z,{direction:{xs:"column",sm:"row"},spacing:2,children:[s.jsx(f.a,{name:"firstName",label:"First name"}),s.jsx(f.a,{name:"lastName",label:"Last name"})]}),s.jsx(f.a,{name:"email",label:"Email address"}),s.jsx(f.a,{name:"password",label:"Password",type:q.value?"text":"password",InputProps:{endAdornment:s.jsx(m.Z,{position:"end",children:s.jsx(u.Z,{onClick:q.onToggle,edge:"end",children:s.jsx(b.Z,{icon:q.value?"solar:eye-bold":"solar:eye-closed-bold"})})})}}),s.jsx(p.Z,{fullWidth:!0,color:"inherit",size:"large",type:"submit",variant:"contained",loading:E,children:"Create account"})]});return(0,s.jsxs)(s.Fragment,{children:[A,!!t&&s.jsx(d.Z,{severity:"error",sx:{m:3},children:t}),s.jsx(f.Z,{methods:_,onSubmit:k,children:N}),C]})}},53024:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(68570).createProxy)(String.raw`D:\TypeScriptProject\nextDemo\src\app\auth\jwt\login\layout.tsx#default`)},89336:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n,metadata:()=>a});var s=t(19510),i=t(79982);let a={title:"Jwt: Login"};function n(){return s.jsx(i.Q,{})}},79982:(e,r,t)=>{"use strict";t.d(r,{Q:()=>i,$:()=>a});var s=t(68570);let i=(0,s.createProxy)(String.raw`D:\TypeScriptProject\nextDemo\src\sections\auth\jwt\jwt-login-view.tsx#default`),a=(0,s.createProxy)(String.raw`D:\TypeScriptProject\nextDemo\src\sections\auth\jwt\jwt-register-view.tsx#default`)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[924,11,80,372,483],()=>t(28093));module.exports=s})();