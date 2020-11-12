(this["webpackJsonpwavelength-frontend"]=this["webpackJsonpwavelength-frontend"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var c,r=n(0),i=n(1),o=n.n(i),l=n(50),a=n.n(l),s=(n(59),n(2)),u=n(3),j=n.p+"static/media/wavelength.f97aa54d.gif",d=function(){var e=Object(i.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(u.f)();return Object(r.jsxs)("div",{style:{backgroundImage:"url(".concat(j,")"),backgroundSize:"cover",backgroundPosition:"center",minHeight:"100vh"},children:[Object(r.jsx)("h1",{style:{marginTop:0,paddingTop:20,textAlign:"center",color:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"},children:"WAVELENGTH"}),Object(r.jsx)("div",{style:{display:"flex",flexDirection:"row",margin:"20px"},children:Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column",alignItems:"center"},children:[Object(r.jsx)("input",{placeholder:"Room Name",type:"text",name:"roomname",style:{textAlign:"center"},value:n,onChange:function(e){return c(e.target.value)}}),Object(r.jsx)("label",{htmlFor:"roomname",style:{margin:20,color:"white"},children:"Create or Join a Room"}),Object(r.jsx)("button",{onClick:function(){return o.push("/".concat(n))},children:" Start "})]})}),Object(r.jsx)("div",{style:{display:"flex",flex:"1 1 300px",alignItems:"center",justifyContent:"space-evenly",flexDirection:"column"}})]})},b=n(16),f=function(e){return Object(r.jsx)("div",{children:"Error! Something went wrong!"})},x=n(4);!function(e){e[e.NOT_STARTED=0]="NOT_STARTED",e[e.TEAM1_GUESS=1]="TEAM1_GUESS",e[e.TEAM1_STEAL=2]="TEAM1_STEAL",e[e.TEAM1_END=3]="TEAM1_END",e[e.TEAM2_GUESS=4]="TEAM2_GUESS",e[e.TEAM2_STEAL=5]="TEAM2_STEAL",e[e.TEAM2_END=6]="TEAM2_END",e[e.GAME_OVER=7]="GAME_OVER"}(c||(c={}));var h=c,m={width:"75%"},g=function(e){Object(u.f)(),e.roomName;var t=e.data,n=Object(i.useState)(10),c=Object(s.a)(n,2),o=c[0],l=c[1],a=function(e){return Object(r.jsx)("ul",{style:{listStyleType:"none",padding:0},children:e.map((function(e){return Object(r.jsx)("li",{style:{fontWeight:"bold",color:"white"},children:e})}))})};return Object(r.jsxs)("div",{style:{backgroundImage:"url(".concat(j,")"),backgroundSize:"cover",backgroundPosition:"center",minHeight:"100vh"},children:[Object(r.jsx)("h1",{style:{marginTop:0,paddingTop:20,textAlign:"center",color:"#000",display:"flex",flexDirection:"column",justifyContent:"center"},children:"WAVELENGTH"}),Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"row",margin:"20px"},children:[Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column",alignItems:"center"},children:[Object(r.jsx)("button",{disabled:"right"!==e.currTeam,style:Object(x.a)(Object(x.a)({},m),{},{backgroundColor:"#FFA97E"}),onClick:e.handleTeamChange,children:"Join"}),Object(r.jsx)("h2",{style:{color:"#FFA97E"},children:"Team 1"}),a(t.leftTeam)]}),Object(r.jsx)("div",{style:{display:"flex",placeItems:"center",justifyContent:"center",flex:"0 1 10%"},children:Object(r.jsx)("h1",{style:{textAlign:"center"},children:"VS"})}),Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column",alignItems:"center"},children:[Object(r.jsx)("button",{disabled:"left"!==e.currTeam,style:Object(x.a)(Object(x.a)({},m),{},{backgroundColor:"#7ED6FF"}),onClick:e.handleTeamChange,children:"Join"}),Object(r.jsx)("h2",{style:{color:"#7ED6FF"},children:"Team 2"}),a(t.rightTeam)]})]}),Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 300px",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[Object(r.jsx)("input",{name:"maxscore",type:"number",min:"1",max:"40",value:o,onChange:function(e){return l(e.target.valueAsNumber)},style:{margin:20,marginBottom:5}}),Object(r.jsxs)("label",{htmlFor:"name",style:{color:"white",marginBottom:"10px"},children:["First Team to ",Number.isNaN(o)?10:o>=40?40:o," ","wins"]}),Object(r.jsx)("button",{onClick:function(){return e.start(o)},style:{backgroundColor:"#7effa9"},children:"start"})]})]})},O=n.p+"static/media/target.619f13dd.svg",p=(n(67),function(e){return Object(r.jsxs)("div",{style:{overflow:"hidden",position:"relative",WebkitAppearance:"none",width:"calc(100% - 10px)",height:"152px",background:"#f5f6fa",borderRadius:"5px",marginTop:"20px",marginBottom:"20px",outline:"none"},children:[Object(r.jsx)("div",{style:{backgroundImage:"url(".concat(O,")"),opacity:e.bg,transition:"opacity 1s",height:"100%",backgroundSize:"100%",backgroundRepeat:"repeat-y",transform:"translateX(".concat(e.goal-50,"vw)"),border:"none"}}),Object(r.jsx)("input",{className:"slider",type:"range",min:"0",max:"100",step:1e-5,value:e.value,style:{position:"absolute",bottom:0,border:"1px solid black",margin:0,backgroundColor:"rgba(255,255,255,0)"}})]})});function y(e){return e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))}var v=function(e){var t={display:"flex",flexDirection:"column",flex:"1 1 50%",justifyContent:"center",alignItems:"center",fontFamily:"Catamaran"},n={textAlign:"center"};return Object(r.jsxs)("div",{style:{display:"flex",minWidth:"300px",minHeight:"200px",width:"60%",margin:"20px",borderRadius:"5px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",color:"#fff"},children:[Object(r.jsxs)("div",{style:Object(x.a)(Object(x.a)({},t),{},{backgroundColor:"#7ed6ff",borderRadius:"5px 0px 0px 5px"}),children:[Object(r.jsx)("h2",{style:n,children:y(e.leftWord)}),Object(r.jsx)("h3",{style:{fontSize:"3em",margin:0},children:"\u2190"})]}),Object(r.jsxs)("div",{style:Object(x.a)(Object(x.a)({},t),{},{backgroundColor:"#ffa97e",borderLeft:"1px solid black",borderRadius:"0px 5px 5px 0px"}),children:[Object(r.jsx)("h2",{style:n,children:y(e.rightWord)}),Object(r.jsx)("h3",{style:{fontSize:"3em",margin:0},children:"\u2192"})]})]})},S=n(52),T=n.n(S)()("http://localhost:4000",{transports:["websocket"]}),E=function(e){var t=e.goal,n=e.leftWord,c=e.rightWord,o=e.value,l=Object(i.useState)(0),a=Object(s.a)(l,2),u=a[0],j=a[1],d=Object(i.useState)(!1),b=Object(s.a)(d,2),f=b[0],x=b[1],h=Object(i.useState)(!0),m=Object(s.a)(h,2),g=m[0],O=m[1];Object(i.useEffect)((function(){T.on("showingtarget",(function(){j(1),x(!0),setTimeout((function(){O(!1)}),1200)}))}),[]);return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(r.jsxs)("h2",{style:{margin:0},children:[e.currPsychic," is up!"]}),Object(r.jsx)(v,{leftWord:n,rightWord:c}),Object(r.jsx)(p,{value:o,goal:t,bg:u}),f?Object(r.jsx)("button",{style:{backgroundColor:"#7effa9",color:"#000",width:"40%"},onClick:function(){return console.log("continue"),void T.emit("continue",e.roomName)},disabled:g,children:"Continue"}):Object(r.jsx)("button",{style:{backgroundColor:"#7effa9",color:"#000",width:"40%"},onClick:function(){T.emit("show",e.roomName)},children:"Show"}),f&&g&&Object(r.jsx)("div",{className:"lds-dual-ring"})]})},A=(n(49),function(e){return Object(r.jsxs)("div",{style:{overflow:"hidden",position:"relative",WebkitAppearance:"none",width:"calc(100% - 10px)",height:"154px",background:"#f5f6fa",borderRadius:"5px",marginTop:"20px",marginBottom:"20px",outline:"none"},children:[Object(r.jsx)("div",{style:{backgroundImage:"url(".concat(O,")"),height:"100%",backgroundSize:"100%",backgroundRepeat:"repeat-y",transform:"translateX(".concat(e.goal-50,"vw)"),border:"none"}}),Object(r.jsx)("input",{className:"slider",type:"range",min:"0",max:"100",step:1e-5,value:e.value,style:{zIndex:99999,position:"absolute",bottom:0,backgroundColor:"rgba(255,255,255,0)"}})]})}),C=function(e){var t=e.goal,n=e.leftWord,c=e.rightWord,i=e.value;return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(r.jsxs)("h2",{style:{margin:0},children:[e.currPsychic," is up!"]}),Object(r.jsx)(v,{leftWord:n,rightWord:c}),Object(r.jsxs)("p",{style:{margin:0},children:["You're the ",Object(r.jsx)("strong",{children:"PSYCHIC"})]}),Object(r.jsx)(A,{goal:t,value:i})]})},k=(n(98),n(53)),w=n.n(k),N=function(e){var t=function(t){t.preventDefault(),"stealer"===e.role||e.steal||("guesser"===e.role&&T.emit("changevalue",e.roomName,Number.parseFloat(t.target.value)),console.log("change"))},n=Object(i.useState)((function(){return w.a.debounce((function(e){return t(e)}),10)}));Object(s.a)(n,1)[0];return Object(r.jsx)("div",{style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",margin:"20px"},children:Object(r.jsx)("input",{className:"slider",type:"range",min:"0",max:"100",step:1e-5,value:e.value,onChange:function(e){return t(e)}})})},D=function(e){e.goal;var t=e.leftWord,n=e.rightWord,c=e.value;return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(r.jsxs)("h2",{style:{margin:0},children:[e.currPsychic," is up!"]}),Object(r.jsx)(v,{leftWord:t,rightWord:n}),Object(r.jsxs)("p",{style:{margin:0},children:["It's your team's turn to ",Object(r.jsx)("strong",{children:"GUESS"})]}),Object(r.jsx)(N,{roomName:e.roomName,role:"guesser",value:c,steal:e.steal}),Object(r.jsx)("button",{style:{backgroundColor:"#7effa9",color:"#000",width:"40%"},disabled:e.steal,onClick:function(){T.emit("guess",e.roomName,c)},children:"Guess"})]})},W=function(e){e.goal;var t=e.leftWord,n=e.rightWord,c=e.value,i=function(t){T.emit("steal",e.roomName,t,c)};return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(r.jsxs)("h2",{style:{margin:0},children:[e.currPsychic," is up!"]}),Object(r.jsx)(v,{leftWord:t,rightWord:n}),Object(r.jsxs)("p",{style:{margin:0},children:["It's your team's turn to ",Object(r.jsx)("strong",{children:"STEAL"})]}),Object(r.jsx)(N,{steal:e.steal,value:c,roomName:e.roomName,role:"stealer"}),Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-evenly"},children:[Object(r.jsx)("button",{style:{backgroundColor:"#7ED6FF",color:"#fff",width:"auto",marginRight:"5px"},disabled:!e.steal,onClick:function(){return i("left")},children:"Left"}),Object(r.jsx)("button",{style:{backgroundColor:"#FFA97E",color:"#fff",width:"auto",marginLeft:"5px"},disabled:!e.steal,onClick:function(){return i("right")},children:"Right"})]})]})},I={flex:"1 1 300px",textAlign:"center",color:"white"},F=function(e){Object(u.f)(),e.roomName;var t=e.leftScore,n=e.rightScore,c=function(e){return Object(r.jsx)("ul",{style:{listStyleType:"none",padding:0},children:e.map((function(e){return Object(r.jsx)("li",{style:{fontWeight:"bold"},children:e})}))})},i=e.leftTeam,o=e.rightTeam,l=e.currTeam===(e.leftTurn?"left":"right");return Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"column",minHeight:"100vh",backgroundSize:"cover"},children:[Object(r.jsx)("h1",{style:{textAlign:"center",color:"#000",display:"flex",flexDirection:"column",justifyContent:"center"},children:"WAVELENGTH"}),Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column"},children:[Object(r.jsx)("h2",{children:"Team 1"}),c(i)]}),Object(r.jsx)("div",{style:{display:"flex",placeItems:"center",justifyContent:"center",flex:"0 1 10%"},children:Object(r.jsx)("h1",{style:{textAlign:"center"},children:"VS"})}),Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column"},children:[Object(r.jsx)("h2",{children:"Team 2"}),c(o)]})]}),Object(r.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:Object(r.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around"},children:[Object(r.jsx)("h1",{style:Object(x.a)({backgroundColor:"#FFA97E"},I),children:t}),Object(r.jsx)("h1",{style:Object(x.a)({backgroundColor:"#7ED6FF"},I),children:n})]})}),e.end?Object(r.jsx)(E,Object(x.a)({},e)):e.isPsychic?Object(r.jsx)(C,Object(x.a)({},e)):l?Object(r.jsx)(D,Object(x.a)({},e)):Object(r.jsx)(W,Object(x.a)({},e))]})},_=function(e){return Object(r.jsxs)("div",{style:{backgroundImage:"url(".concat(j,")"),backgroundSize:"cover",backgroundPosition:"center",minHeight:"100vh"},children:[Object(r.jsx)("h1",{style:{marginTop:0,paddingTop:20,textAlign:"center",color:"#fff",display:"flex",flexDirection:"column",justifyContent:"center"},children:"WAVELENGTH"}),Object(r.jsx)("div",{style:{display:"flex",flexDirection:"row",margin:"20px"},children:Object(r.jsx)("div",{style:{display:"flex",flex:"1 1 40%",textAlign:"center",flexDirection:"column",alignItems:"center"}})}),Object(r.jsxs)("div",{style:{display:"flex",flex:"1 1 300px",alignItems:"center",justifyContent:"space-evenly",flexDirection:"column"},children:["tie"!==e.winner&&Object(r.jsxs)("h1",{style:{color:"white"},children:["left"===e.winner?"Orange":"Blue"," Wins!"]}),"tie"===e.winner&&Object(r.jsx)("h1",{style:{color:"white"},children:"It's a Tie!"}),Object(r.jsx)("button",{style:{backgroundColor:"#7effa9",marginTop:"20px"},onClick:function(){T.emit("restart",e.roomName)},children:"Play Again"})]})]})},M=function(e){var t,n=Object(i.useState)(h.TEAM1_END),c=Object(s.a)(n,2),o=c[0],l=c[1],a=(Object(u.f)(),Object(i.useState)("")),j=Object(s.a)(a,2),d=j[0],b=j[1],f=Object(i.useState)(""),m=Object(s.a)(f,2),O=m[0],p=m[1],y=Object(i.useState)([]),v=Object(s.a)(y,2),S=v[0],E=v[1],A=Object(i.useState)([]),C=Object(s.a)(A,2),k=C[0],w=C[1],N=Object(i.useState)(!1),D=Object(s.a)(N,2),W=D[0],I=D[1],M=Object(i.useState)(""),L=Object(s.a)(M,2),P=L[0],R=L[1],G=Object(i.useState)(!0),H=Object(s.a)(G,2),z=H[0],B=H[1],U=Object(i.useState)(""),V=Object(s.a)(U,2),J=V[0],Y=V[1],X=Object(i.useState)(0),q=Object(s.a)(X,2),K=q[0],Q=q[1],Z=Object(i.useState)(""),$=Object(s.a)(Z,2),ee=$[0],te=$[1],ne=Object(i.useState)(1),ce=Object(s.a)(ne,2),re=ce[0],ie=ce[1],oe=Object(i.useState)(!0),le=Object(s.a)(oe,2),ae=le[0],se=le[1],ue=Object(i.useState)([]),je=Object(s.a)(ue,2),de=je[0],be=je[1],fe=Object(i.useState)(0),xe=Object(s.a)(fe,2),he=xe[0],me=xe[1],ge=Object(i.useState)(0),Oe=Object(s.a)(ge,2),pe=Oe[0],ye=Oe[1],ve=Object(i.useState)(!1),Se=Object(s.a)(ve,2),Te=Se[0],Ee=Se[1],Ae=Object(i.useState)(!1),Ce=Object(s.a)(Ae,2),ke=Ce[0],we=Ce[1],Ne=Object(i.useState)(50),De=Object(s.a)(Ne,2),We=De[0],Ie=De[1],Fe=Object(i.useState)("neither"),_e=Object(s.a)(Fe,2),Me=_e[0],Le=_e[1],Pe=e.match.params.room.toLowerCase(),Re=function(e){if(e.preventDefault(),ee){ie(0),setTimeout((function(){return se(!1)}),300);T.emit("joinroom",Pe,ee,(function(e,t){!function(e){b(e.leftWord),p(e.rightWord),Q(e.goal),l(e.gameState),be(e.userList),E(e.leftTeam),R(e.currPsychic),console.log(e)}(e),Y(t)}))}};Object(i.useEffect)((function(){switch(o){case h.TEAM1_END:case h.TEAM2_END:we(!0),Ee(!1);break;case h.TEAM1_GUESS:case h.TEAM2_GUESS:we(!1),Ee(!1);break;case h.TEAM1_STEAL:case h.TEAM2_STEAL:we(!1),Ee(!0)}}),[o]),Object(i.useEffect)((function(){T.on("restarted",(function(e){!function(e){b(e.leftWord),p(e.rightWord),Q(e.goal),l(e.gameState),be(e.userList),E(e.leftTeam),R(e.currPsychic),console.log(e)}(e),Le("neither"),console.log(e)})),T.on("winner",(function(e){Le(e)})),T.on("valuechanged",(function(e){Ie(e)})),T.on("generated",(function(e){!function(e){b(e.leftWord),p(e.rightWord),Q(e.goal)}(e)})),T.on("updateuserlist",(function(e){be(e),console.log(e)})),T.on("updateteams",(function(e,t){E(e),w(t),console.log("left: "+e),console.log("right: "+t)})),T.on("setgamestate",(function(e){l(e)})),T.on("youarepsychic",(function(){I(!0)})),T.on("psychicchosen",(function(e,t){B(e),R(t)})),T.on("updatescore",(function(e,t){setTimeout((function(){me(e),ye(t)}),500)})),T.on("updatestate",(function(e){l(e)})),T.on("showingtarget",(function(){I(!1)}))}),[Pe,Q]);var Ge={goal:K,leftWord:d,rightWord:O,isPsychic:W,currPsychic:P,currTeam:J,userList:de,rightTeam:k,leftTeam:S,roomName:Pe,leftTurn:z,steal:Te,end:ke,value:We},He=Object(x.a)(Object(x.a)({},Ge),{},{gameState:o});if("neither"!==Me)return Object(r.jsx)(_,{winner:Me,roomName:Pe});switch(o){case h.NOT_STARTED:t=Object(r.jsx)(g,{roomName:Pe,data:He,currTeam:J,handleTeamChange:function(){T.emit("changetoteam",Pe,"left"===J?"right":"left",ee,(function(){Y("left"===J?"right":"left")}))},start:function(e){Number.isNaN(e)?e=10:e>=40&&(e=40),T.emit("startgame",Pe,e)}});break;default:t=Object(r.jsx)(F,Object(x.a)({leftScore:he,rightScore:pe},Ge))}return Object(r.jsx)("div",{children:ae?Object(r.jsx)("div",{className:"backdrop",style:{opacity:re},children:Object(r.jsxs)("form",{className:"form",children:[Object(r.jsxs)("h1",{style:{borderBottom:"1px solid #c4c4c4"},children:["What's Your Name?"," "]}),Object(r.jsx)("input",{style:{fontFamily:"Catamaran",margin:"20px"},placeholder:"Name",onSubmit:Re,value:ee,onChange:function(e){return te(e.target.value)}}),Object(r.jsx)("button",{style:{backgroundColor:"#7effa9"},onClick:Re,children:"Submit"})]})}):t})};var L=function(){return Object(r.jsx)(b.a,{children:Object(r.jsxs)(u.c,{children:[Object(r.jsx)(u.a,{exact:!0,path:"/",component:d}),Object(r.jsx)(u.a,{exact:!0,path:"/error",component:f}),Object(r.jsx)(u.a,{path:"/:room",component:M}),Object(r.jsx)(u.a,{component:d})]})})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,101)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),i(e),o(e)}))};a.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(L,{})}),document.getElementById("root")),P()},49:function(e,t,n){},59:function(e,t,n){},67:function(e,t,n){},98:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.f43c4631.chunk.js.map