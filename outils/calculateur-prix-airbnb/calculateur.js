(function(){
var $=function(i){return document.getElementById(i)};
function num(id){var v=String($(id).value).replace(/[\s\u00a0€%]/g,'').replace(',','.');var x=parseFloat(v);return isNaN(x)?0:x}
function eur(x){return Math.round(x).toLocaleString('fr-BE').replace(/\u202f|\u00a0/g,' ')+' €'}
function calc(){
var fee=num('frais')/100,disc=num('remise')/100,k=(1-fee)*(1-disc);
var nn=num('dNuits');if(nn<=0)nn=7;
var tb=$('tbody'),warn=$('warn');
if(k<=0||fee<0||disc<0||fee>=1||disc>=1){['rNuit','rMenage','rSem','rNet','rTot'].forEach(function(i){$(i).textContent='—'});tb.innerHTML='';warn.textContent='Vérifiez les pourcentages saisis.';return}
var base=(num('net')+num('elec'))/7+num('dEur')*num('dLits')/nn;
var nuit=Math.round(base/k);
var sem=nuit*7*(1-disc);
$('rNuit').textContent=eur(nuit);
$('rMenage').textContent=eur(num('menage')/(1-fee));
$('rSem').textContent=eur(sem);
$('rNet').textContent=eur(sem*(1-fee));
$('rTot').textContent=eur(sem*(1-fee)+num('menage'));
var min=Math.max(1,Math.min(7,Math.round(num("minn"))||1)),lens=[],n;
for(n=min;n<=min+4&&n<7;n++)lens.push(n);
[7,8,10,14].forEach(function(d){if(lens.indexOf(d)<0)lens.push(d)});
function tot(n){return nuit*n*(n>=7?(1-disc):1)}
var rows='',bad=false;
lens.forEach(function(n){var t=tot(n),flag=false;
 lens.forEach(function(m){if(m>n&&tot(m)<t-0.5)flag=true});
 if(flag)bad=true;
 rows+='<tr'+(flag?' class="flag"':'')+'><td>'+n+' nuits</td><td>'+eur(t)+'</td><td>'+eur(t/n)+'</td><td>'+eur(t*(1-fee))+'</td></tr>'});
tb.innerHTML=rows;
warn.textContent=bad?'Avec cette réduction, certains séjours courts coûtent plus cher qu\'un séjour plus long. Envisagez de la réduire.':'';
}
Array.prototype.forEach.call(document.querySelectorAll('#seg button'),function(b){b.addEventListener('click',function(){
 $('frais').value=b.getAttribute('data-f');
 Array.prototype.forEach.call(document.querySelectorAll('#seg button'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});calc()})});
$('frais').addEventListener('input',function(){Array.prototype.forEach.call(document.querySelectorAll('#seg button'),function(x){x.setAttribute('aria-pressed',x.getAttribute('data-f')===$('frais').value?'true':'false')})});
Array.prototype.forEach.call(document.querySelectorAll('input'),function(i){i.addEventListener('input',calc)});
calc();
})();
