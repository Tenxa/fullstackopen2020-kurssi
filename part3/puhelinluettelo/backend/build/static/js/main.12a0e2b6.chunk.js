(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),l=(t(19),t(2)),u=function(e){var n=e.filterText,t=e.handleChangeFilterText;return r.a.createElement("div",null,r.a.createElement("form",null,"Filter: ",r.a.createElement("input",{value:n,onChange:t})))},i=function(e){var n=e.handleAddPerson,t=e.nameText,a=e.numberText,o=e.handleChangeNameText,c=e.handleNumberChangeText;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var n=e.personsToMap,t=e.deletePerson;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number,r.a.createElement("button",{type:"submit",onClick:function(){return t(e)}},"Delete"))})))},m=t(3),s=t.n(m),f=function(){return s.a.get("/api/persons").then((function(e){return e.data}))},h=function(e){return s.a.post("/api/persons",e).then((function(e){return e.data}))},b=function(e,n){return s.a.put("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},p=function(e,n){return s.a.delete("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},g=function(e){var n=e.message;return""===n?null:n.includes("Deleted")||n.includes("Information")||n.includes("failed")?r.a.createElement("div",{className:"notification",style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n):r.a.createElement("div",{className:"notification",style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},v=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),m=Object(l.a)(c,2),s=m[0],v=m[1],E=Object(a.useState)(""),O=Object(l.a)(E,2),y=O[0],T=O[1],x=Object(a.useState)(""),j=Object(l.a)(x,2),S=j[0],C=j[1],w=Object(a.useState)(!0),N=Object(l.a)(w,2),k=N[0],P=N[1],D=Object(a.useState)(""),A=Object(l.a)(D,2),J=A[0],B=A[1],F=function(){f().then((function(e){o(e)}))};Object(a.useEffect)((function(){F()}),[]);var I=k?t:t.filter((function(e){return 0===e.name.toLowerCase().indexOf(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:J}),r.a.createElement(u,{filterText:S,handleChangeFilterText:function(e){C(e.target.value),""!==e.target.value?P(!1):P(!0)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(i,{handleAddPerson:function(e){e.preventDefault();var n={name:s,number:y},a=!1;t.forEach((function(e){e.name===s&&(window.alert("".concat(s," is alreadyy added to phonebook")),e.number!==y&&window.confirm("Replace ".concat(s," number?"))&&(e.number=y,b(e.id,e).then((function(e){console.log(e),F()})).catch((function(n){console.log(n),console.log("Person -> ".concat(JSON.stringify(e))),B("Information of ".concat(e.name," has already been removed from server")),F(),setTimeout((function(){B("")}),5e3)}))),a=!0)})),!1===a&&h(n).then((function(e){o(t.concat(e)),B("Added ".concat(n.name)),v(""),T("")})).catch((function(e){B(JSON.stringify(e.response.data))}))},nameText:s,numberText:y,handleChangeNameText:function(e){v(e.target.value)},handleNumberChangeText:function(e){T(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{personsToMap:I,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&p(e.id,e).then((function(n){F(),B("Deleted ".concat(e.name))}))}}))};c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.12a0e2b6.chunk.js.map