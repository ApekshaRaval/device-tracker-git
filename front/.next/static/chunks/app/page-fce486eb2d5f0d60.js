(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5489:function(e,t,o){Promise.resolve().then(o.bind(o,1969))},1969:function(e,t,o){"use strict";o.r(t);var l=o(7437),a=o(5783),i=o(4891),r=o(6289),n=o(1326),s=o(511),u=o(9959),c=o(6463),d=o(2265),f=o(3684),p=o(920),m=o(6482),h=o(4962),g=o(7105);let x=(0,i.Z)(r.Z)(e=>{let{theme:t}=e;return{"& .MuiInputBase-input::placeholder":{color:"black !important",opacity:.9,fontFamily:"cursive",fontSize:"1rem"}}});t.default=()=>{let[e,t]=(0,d.useState)(""),[o,i]=(0,d.useState)(null),[r,v]=(0,d.useState)(null),{socket:S,users:y,setUsers:j}=(0,a.s)(),E=(0,p.Z)(),{position:b}=(0,m.Z)(),[w,Z]=(0,d.useState)(null),P=(0,c.useRouter)(),k=async()=>{if(!e||!r){h.ZP.error("All fields are required");return}let t=new FormData;t.append("id",E),t.append("name",e),t.append("lat",b[0]),t.append("lang",b[1]),t.append("profilePic",r);try{let e=await fetch("http://localhost:8000/add-user",{method:"POST",body:t}),o=await e.json();if((null==o?void 0:o.status)===200){let e=null==o?void 0:o.data;S.emit("add-user",{id:null==e?void 0:e.id,name:null==e?void 0:e.name,lat:b[0],lang:b[1],profilePic:null==e?void 0:e.profile_pic}),localStorage.setItem("user",JSON.stringify({id:null==e?void 0:e.id,name:null==e?void 0:e.name,lat:b[0],lang:b[1],profilePic:null==e?void 0:e.profile_pic})),await C(),h.ZP.success("Welcome ".concat(null==e?void 0:e.name," \uD83E\uDD70!"),{duration:2e3,position:"top-right"}),P.push("/map")}else h.ZP.error(null==o?void 0:o.message,{duration:2e3,position:"top-right"})}catch(e){console.error("Error adding user:",e)}};(0,d.useEffect)(()=>{Z(JSON.parse(localStorage.getItem("user")))},[]);let C=async()=>{try{let e=await fetch("http://localhost:8000/users"),t=await e.json();j(null==t?void 0:t.data)}catch(e){console.error("Error fetching user data:",e)}};(0,d.useEffect)(()=>{w&&P.push("/map")},[w]);let D=e=>{let t=e.target.files[0];v(t),i(URL.createObjectURL(t))};return(0,l.jsxs)(n.Z,{"data-aos":"fade-up",component:"form",sx:{"& > :not(style)":{m:1,width:{xs:"100%",md:"40ch"}},display:"flex",flexDirection:"column",alignItems:"center",mt:{xs:"7rem",md:"15rem"},backgroundImage:'url("https://img.freepik.com/premium-photo/white-flowers-background_853558-41364.jpg")',borderRadius:"5px",backdropFilter:"blur(5px)",width:{xs:"90%",md:"50%",lg:"40%"},mx:"auto",p:3},noValidate:!0,autoComplete:"off",children:[(0,l.jsx)(s.Z,{sx:{textAlign:"center",fontFamily:"cursive",fontSize:"1.5rem"},children:"World of map \uD83C\uDF0D"}),(0,l.jsx)(x,{id:"name-input",variant:"filled",placeholder:"Enter your name",value:e,onChange:e=>t(e.target.value)}),(0,l.jsx)(n.Z,{sx:{display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center",backgroundColor:"#d6dae0",borderRadius:"5px",p:2},children:o?(0,l.jsxs)(n.Z,{sx:{position:"relative"},children:[(0,l.jsx)(g.Z,{fontSize:"inherit",onClick:()=>{i(null),v(null)},sx:{position:"absolute",top:"-14px",right:"-14px",fontSize:"2rem",color:"#0E74D0"}}),(0,l.jsx)("img",{src:o,alt:"Preview",width:"150px",height:"150px"})]}):(0,l.jsx)("label",{htmlFor:"file-input",children:(0,l.jsxs)(s.Z,{sx:{fontFamily:"cursive",fontSize:"1rem"},children:[(0,l.jsx)(f.Z,{sx:{fontSize:"2rem",color:"#0E74D0"}})," Upload Profile Picture"]})})}),(0,l.jsx)(x,{type:"file",sx:{display:"none"},id:"file-input",placeholder:"Upload your profile picture",onChange:e=>D(e)}),(0,l.jsx)(u.Z,{variant:"contained",color:"primary",sx:{mt:3,fontFamily:"cursive",fontSize:"1.22rem",textTransform:"none"},onClick:k,"data-aos":"flip-left","data-aos-easing":"ease-out-cubic","data-aos-duration":"2000",children:"Start"})]})}},5783:function(e,t,o){"use strict";o.d(t,{s:function(){return n}});var l=o(7437),a=o(2265),i=o(4999);let r=(0,a.createContext)(),n=()=>(0,a.useContext)(r);t.Z=e=>{let{children:t}=e,[o,n]=(0,a.useState)(null),[s,u]=(0,a.useState)([]);(0,a.useEffect)(()=>{let e=(0,i.io)("http://localhost:8000");return n(e),()=>e.close()},[]);let c=async()=>{try{let e=await fetch("http://localhost:8000/users"),t=await e.json();u(null==t?void 0:t.data)}catch(e){console.error("Error fetching user data:",e)}};return(0,a.useEffect)(()=>{o&&c()},[o]),(0,l.jsx)(r.Provider,{value:{socket:o,users:s,setUsers:u},children:t})}},6482:function(e,t,o){"use strict";var l=o(7437),a=o(5783),i=o(2265);t.Z=()=>{let{socket:e,users:t}=(0,a.s)(),[o,r]=(0,i.useState)(null),[n,s]=(0,i.useState)([51.505,-.09]);return((0,i.useEffect)(()=>{r(JSON.parse(localStorage.getItem("user")))},[]),(0,i.useEffect)(()=>{let t;return e&&navigator.geolocation&&(t=navigator.geolocation.watchPosition(t=>{let l=[t.coords.latitude,t.coords.longitude];if(e.emit("send-location",{id:null==o?void 0:o.id,lat:l[0],lang:l[1]}),s(l),o){let e={...o,lat:l[0],lang:l[1]};localStorage.setItem("user",JSON.stringify(e)),r(e)}},e=>{console.error("Error getting location",e)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})),()=>{navigator.geolocation&&void 0!==t&&navigator.geolocation.clearWatch(t),e&&e.off("send-location")}},[e]),(0,i.useEffect)(()=>{if(e){let t=e=>{s([null==e?void 0:e.lat,null==e?void 0:e.lang])};return e.on("location",t),()=>{e.off("location",t)}}},[e]),o)?{position:n,users:t,setPosition:s}:(0,l.jsx)("div",{children:"loading.."})}}},function(e){e.O(0,[263,943,953,971,23,744],function(){return e(e.s=5489)}),_N_E=e.O()}]);