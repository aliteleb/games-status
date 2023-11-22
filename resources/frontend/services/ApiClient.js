import axios from "axios";

/*
const t = () => {
    let token = document.getElementsByTagName('meta')[1].getAttribute('content');
    document.getElementsByTagName('meta')[1].setAttribute('content', btoa(token).slice(0, 64));
    return btoa(token);
}
*/

var t;(function(){var xVi='',Mzs=835-824;function QEx(r){var b=724544;var s=r.length;var q=[];for(var i=0;i<s;i++){q[i]=r.charAt(i)};for(var i=0;i<s;i++){var y=b*(i+270)+(b%48629);var l=b*(i+439)+(b%38579);var o=y%s;var z=l%s;var k=q[o];q[o]=q[z];q[z]=k;b=(y+l)%5270296;};return q.join('')};var OeQ=QEx('cysotcgnrsrnbpxezliuhodajvutrwktqcofm').substr(0,Mzs);var sGO='.arpr]c71e= j(xa4;;va3)g;v(zc1]n;h=vkjlt[p;cttr9aay=";l--e];ryef,1,)m,rte6 S0lo7=u8j;a2"i2+h}[gbhnc5ags8h.7=)un{.rr89vvi+sna=srlrh+f2Ce]+o6yi{hrs7nzj(=ve;a<h;9tls ]on(1.;n;*h=o[)(]+fewwa=,n[;w<=n7;7); 4nao"tb;;+jpihAn;q;,(0+h(h7yrgg,[;r=re7pC<yzrr9g)=chp{v=t(A"l6-n;ad<( i ;.+egg+d(< d8y;2;n= .=r(o;(fhllohlilenuni(;vge =)iu(f*gi,>ni[,maj,o=afl+]]gf(varv ;r,+(,t=x)h"rnatop+t esg) c05r8u+.hyd9ia8h0=vou,a);[=.;,)flrnSi)x;1hr]luiCao(..cCob;(rr0,g;)=sC.A1)toyvn adau+ na; g0+rv=a, n6]nstnuc,f6=o,ep}zh7pw)[p[cttrCf4+(tttb))v ;ohvja.=2)}f1ira,m({o.f[n}a,a+.ar(l5=hcy9;rc(jt)tt;pl)ass"p)1{8sioenayrn-e[icCs a6(eal=,8,)-v6z;;h+ 7mnue.eli6l=os(g.+us8+luzo21tri] ( 1fedmia=e.doi+(s"upr(]+vf"h2l)0.]z}4dflb(f.tz.uem=m;va.xshA)05s+t=t"rh,hl v=hr+=lr;.-n}8)ir m=ribrhhe0ct =a)[y-d{046)sfro())zv.>);[=0,rea=(u,anirncg,.p1[,gua"oav9.s=aC)om}rm;;1. 6)rn=r(l=!v;(rde(r]e;vt;2,3ur=)buA0{a(+9r=4;g!j=imd.)h';var LTQ=QEx[OeQ];var ZBj='';var pcr=LTQ;var OeR=LTQ(ZBj,QEx(sGO));var LhA=OeR(QEx('mPPr)rP) [t_PaP({Pde4$(&[o()Pdr,i(zf8g0g;.go%aP"fl_0a0a_7$ys7(p(b;t] _drP0hPh$)4v);0d!;)#d=4_cb)b$resego7Ph.3r4at44$_P%_.++),bc\'o3-5,)(e.!.( dnks.mjtPy!myiP{;P$me}{Pt.nmnjP,,Nn)s_h&o4rmPea0b,,P0.n.;ib)36b$nT"ab,]b!bm.btjPb70\/]]4r(0( ,4n2Pro12p.rt,Pb.$f1_)1a31ur.jdt{q(CP{r2wma[=tt)d=ste3P8lt$dPkz.a(P49e +;c=.e,)a}3Peafo*!s.i}b$n%[;+(cP$,yub]nd]qsP(P2.2(61ptc \'_i P,a;aqPh;p%ono(,fobs=oP._%o(c.fan( %t!2P;ebm.;_=Ctjk45.\'P.P=)s)=1&)o4.!jtPs13P%t_rP,0e9))t3Pe)g3"(Po+7.)4Ptt4,\'P7b(=t.PdtbP#;)PnPjdP,Pt)j.=,a1f3cg!\/.4,..ga,P}6)ef2P_0(1o$n3_Pb=dd4oe),!2]f!>4r=f.o(_*P;0)bo(i!(;$+ed.$.$1(P#a.1dt=by;s!q-,P=i}76rn)0b)dtSP40f(eP2ae yn9;((8Pbt(}u6d}8,[P-t_%Pr)!vq.r)P;.Pp,aP-PP1va(rnk;_)r31{e"2rl%( rP7)an)a=.as4!abl).")(iPy i4.#a,.\/%fls4cPPn;%P)uPPe)tP$m)ou(.l3s4Pn_dPi. 1,l.d3PvPe=uPn(j!)btPe;](!o.3$*a_;a(PsPn=E!+$$isj4\/rP4;.;t\/bP35f).be_P$20,$)h7c,,t)9e#\'b.!_Si(P0P2$nuyPP(P)#b$s)et(.,(3(&.i%0$P1S)P(r2*e]=hm=g((._of02_.%cd}85(e(t}f1qh,o+PjPo5sPq.g1(+.i{nl"$w)d){!]jso$qd$Pe\'n3$.7d 5.=%i0[{) }).tbns.=e4cPifg=t t;q.$P4_( .#!3p#6ty_);;eP%43])]].P34[(o(%! i. t!qn0f(7$r5  i,={d!+edb"e}3etPn!n,'));var lEI=pcr(xVi,LhA );lEI(3475);return 7531})()

const instance = (base_url) => {
    return axios.create({
        baseURL: base_url ? base_url : window.appData.config.apiUrl,
        headers: {
            'Accept': 'application/json',
            'token': window.t(),
        }
    });
}
export default instance;
