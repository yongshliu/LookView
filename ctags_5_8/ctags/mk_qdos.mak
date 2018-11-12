<div class="div_line"  data-info=({id:27141,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># $Id: mk_qdos.mak 264 2003-02-13 02:59:30Z darren $
</div></div></div><div class="div_line"  data-info=({id:27142,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#
</div></div></div><div class="div_line"  data-info=({id:27143,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Makefile for ctags on QDOS/SMS systems and C68 v4.24
</div></div></div><div class="div_line"  data-info=({id:27144,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Submitted by Thierry Godefroy &lt;godefroy@imaginet.fr&gt;
</div></div></div><div class="div_line"  data-info=({id:27145,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27146,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Directories:
</div></div></div><div class="div_line"  data-info=({id:27147,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27148,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">T = ram1_
</div></div></div><div class="div_line"  data-info=({id:27149,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">P = drv1_C68_
</div></div></div><div class="div_line"  data-info=({id:27150,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27151,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Programs name:
</div></div></div><div class="div_line"  data-info=({id:27152,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27153,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">CC  = $(P)cc
</div></div></div><div class="div_line"  data-info=({id:27154,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">AS  = $(P)as68
</div></div></div><div class="div_line"  data-info=({id:27155,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">ASM = $(P)qmac
</div></div></div><div class="div_line"  data-info=({id:27156,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">LD  = $(P)ld
</div></div></div><div class="div_line"  data-info=({id:27157,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27158,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Programs flags:
</div></div></div><div class="div_line"  data-info=({id:27159,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27160,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">CCFLAGS  = -tmp$(T) -v -Y$(P) -I$(P)include_ -O
</div></div></div><div class="div_line"  data-info=({id:27161,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">ASFLAGS  = -V
</div></div></div><div class="div_line"  data-info=({id:27162,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">ASMFLAGS = -nolist
</div></div></div><div class="div_line"  data-info=({id:27163,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">LDFLAGS  = -v -L$(P)lib_ -bufp150K\
</div></div></div><div class="div_line"  data-info=({id:27164,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27165,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Target name:
</div></div></div><div class="div_line"  data-info=({id:27166,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27167,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">EXEC = ctags
</div></div></div><div class="div_line"  data-info=({id:27168,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27169,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Additional libraries:
</div></div></div><div class="div_line"  data-info=({id:27170,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27171,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">LIBS =
</div></div></div><div class="div_line"  data-info=({id:27172,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27173,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Target dependencies:
</div></div></div><div class="div_line"  data-info=({id:27174,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27175,ln:35}) id=l35><div class="dl_wrapper"><a name=line35 onclick='overload_click(this)' class="a_ln">35<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">OBJEXT = o
</div></div></div><div class="div_line"  data-info=({id:27176,ln:36}) id=l36><div class="dl_wrapper"><a name=line36 onclick='overload_click(this)' class="a_ln">36<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27177,ln:37}) id=l37><div class="dl_wrapper"><a name=line37 onclick='overload_click(this)' class="a_ln">37<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">HEADERS = e_qdos.h \
</div></div></div><div class="div_line"  data-info=({id:27178,ln:38}) id=l38><div class="dl_wrapper"><a name=line38 onclick='overload_click(this)' class="a_ln">38<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;args.h ctags.h debug.h entry.h general.h get.h keyword.h \
</div></div></div><div class="div_line"  data-info=({id:27179,ln:39}) id=l39><div class="dl_wrapper"><a name=line39 onclick='overload_click(this)' class="a_ln">39<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;main.h options.h parse.h parsers.h read.h routines.h sort.h \
</div></div></div><div class="div_line"  data-info=({id:27180,ln:40}) id=l40><div class="dl_wrapper"><a name=line40 onclick='overload_click(this)' class="a_ln">40<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;strlist.h vstring.h
</div></div></div><div class="div_line"  data-info=({id:27181,ln:41}) id=l41><div class="dl_wrapper"><a name=line41 onclick='overload_click(this)' class="a_ln">41<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27182,ln:42}) id=l42><div class="dl_wrapper"><a name=line42 onclick='overload_click(this)' class="a_ln">42<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">OBJECTS = qdos.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27183,ln:43}) id=l43><div class="dl_wrapper"><a name=line43 onclick='overload_click(this)' class="a_ln">43<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;args.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27184,ln:44}) id=l44><div class="dl_wrapper"><a name=line44 onclick='overload_click(this)' class="a_ln">44<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;asm.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27185,ln:45}) id=l45><div class="dl_wrapper"><a name=line45 onclick='overload_click(this)' class="a_ln">45<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;asp.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27186,ln:46}) id=l46><div class="dl_wrapper"><a name=line46 onclick='overload_click(this)' class="a_ln">46<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;awk.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27187,ln:47}) id=l47><div class="dl_wrapper"><a name=line47 onclick='overload_click(this)' class="a_ln">47<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;beta.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27188,ln:48}) id=l48><div class="dl_wrapper"><a name=line48 onclick='overload_click(this)' class="a_ln">48<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;c.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27189,ln:49}) id=l49><div class="dl_wrapper"><a name=line49 onclick='overload_click(this)' class="a_ln">49<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;cobol.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27190,ln:50}) id=l50><div class="dl_wrapper"><a name=line50 onclick='overload_click(this)' class="a_ln">50<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;eiffel.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27191,ln:51}) id=l51><div class="dl_wrapper"><a name=line51 onclick='overload_click(this)' class="a_ln">51<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;entry.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27192,ln:52}) id=l52><div class="dl_wrapper"><a name=line52 onclick='overload_click(this)' class="a_ln">52<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;erlang.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27193,ln:53}) id=l53><div class="dl_wrapper"><a name=line53 onclick='overload_click(this)' class="a_ln">53<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;fortran.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27194,ln:54}) id=l54><div class="dl_wrapper"><a name=line54 onclick='overload_click(this)' class="a_ln">54<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;get.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27195,ln:55}) id=l55><div class="dl_wrapper"><a name=line55 onclick='overload_click(this)' class="a_ln">55<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;keyword.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27196,ln:56}) id=l56><div class="dl_wrapper"><a name=line56 onclick='overload_click(this)' class="a_ln">56<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;lisp.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27197,ln:57}) id=l57><div class="dl_wrapper"><a name=line57 onclick='overload_click(this)' class="a_ln">57<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;lregex.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27198,ln:58}) id=l58><div class="dl_wrapper"><a name=line58 onclick='overload_click(this)' class="a_ln">58<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;lua.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27199,ln:59}) id=l59><div class="dl_wrapper"><a name=line59 onclick='overload_click(this)' class="a_ln">59<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;main.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27200,ln:60}) id=l60><div class="dl_wrapper"><a name=line60 onclick='overload_click(this)' class="a_ln">60<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;make.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27201,ln:61}) id=l61><div class="dl_wrapper"><a name=line61 onclick='overload_click(this)' class="a_ln">61<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;options.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27202,ln:62}) id=l62><div class="dl_wrapper"><a name=line62 onclick='overload_click(this)' class="a_ln">62<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;parse.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27203,ln:63}) id=l63><div class="dl_wrapper"><a name=line63 onclick='overload_click(this)' class="a_ln">63<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;pascal.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27204,ln:64}) id=l64><div class="dl_wrapper"><a name=line64 onclick='overload_click(this)' class="a_ln">64<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;perl.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27205,ln:65}) id=l65><div class="dl_wrapper"><a name=line65 onclick='overload_click(this)' class="a_ln">65<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;php.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27206,ln:66}) id=l66><div class="dl_wrapper"><a name=line66 onclick='overload_click(this)' class="a_ln">66<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;python.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27207,ln:67}) id=l67><div class="dl_wrapper"><a name=line67 onclick='overload_click(this)' class="a_ln">67<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;read.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27208,ln:68}) id=l68><div class="dl_wrapper"><a name=line68 onclick='overload_click(this)' class="a_ln">68<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;rexx.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27209,ln:69}) id=l69><div class="dl_wrapper"><a name=line69 onclick='overload_click(this)' class="a_ln">69<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;routines.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27210,ln:70}) id=l70><div class="dl_wrapper"><a name=line70 onclick='overload_click(this)' class="a_ln">70<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;ruby.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27211,ln:71}) id=l71><div class="dl_wrapper"><a name=line71 onclick='overload_click(this)' class="a_ln">71<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;scheme.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27212,ln:72}) id=l72><div class="dl_wrapper"><a name=line72 onclick='overload_click(this)' class="a_ln">72<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;sh.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27213,ln:73}) id=l73><div class="dl_wrapper"><a name=line73 onclick='overload_click(this)' class="a_ln">73<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;slang.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27214,ln:74}) id=l74><div class="dl_wrapper"><a name=line74 onclick='overload_click(this)' class="a_ln">74<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;sort.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27215,ln:75}) id=l75><div class="dl_wrapper"><a name=line75 onclick='overload_click(this)' class="a_ln">75<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;sml.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27216,ln:76}) id=l76><div class="dl_wrapper"><a name=line76 onclick='overload_click(this)' class="a_ln">76<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;sql.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27217,ln:77}) id=l77><div class="dl_wrapper"><a name=line77 onclick='overload_click(this)' class="a_ln">77<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;strlist.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27218,ln:78}) id=l78><div class="dl_wrapper"><a name=line78 onclick='overload_click(this)' class="a_ln">78<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;tcl.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27219,ln:79}) id=l79><div class="dl_wrapper"><a name=line79 onclick='overload_click(this)' class="a_ln">79<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;verilog.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27220,ln:80}) id=l80><div class="dl_wrapper"><a name=line80 onclick='overload_click(this)' class="a_ln">80<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;vim.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27221,ln:81}) id=l81><div class="dl_wrapper"><a name=line81 onclick='overload_click(this)' class="a_ln">81<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;vstring.$(OBJEXT) \
</div></div></div><div class="div_line"  data-info=({id:27222,ln:82}) id=l82><div class="dl_wrapper"><a name=line82 onclick='overload_click(this)' class="a_ln">82<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;yacc.$(OBJEXT)
</div></div></div><div class="div_line"  data-info=({id:27223,ln:83}) id=l83><div class="dl_wrapper"><a name=line83 onclick='overload_click(this)' class="a_ln">83<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27224,ln:84}) id=l84><div class="dl_wrapper"><a name=line84 onclick='overload_click(this)' class="a_ln">84<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">$(EXEC) : $(OBJECTS)
</div></div></div><div class="div_line"  data-info=({id:27225,ln:85}) id=l85><div class="dl_wrapper"><a name=line85 onclick='overload_click(this)' class="a_ln">85<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">    $(LD) -o$(EXEC) $(LDFLAGS) $(OBJECTS) $(LIBS)
</div></div></div><div class="div_line"  data-info=({id:27226,ln:86}) id=l86><div class="dl_wrapper"><a name=line86 onclick='overload_click(this)' class="a_ln">86<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27227,ln:87}) id=l87><div class="dl_wrapper"><a name=line87 onclick='overload_click(this)' class="a_ln">87<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">$(OBJECTS): $(HEADERS)
</div></div></div><div class="div_line"  data-info=({id:27228,ln:88}) id=l88><div class="dl_wrapper"><a name=line88 onclick='overload_click(this)' class="a_ln">88<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27229,ln:89}) id=l89><div class="dl_wrapper"><a name=line89 onclick='overload_click(this)' class="a_ln">89<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># Construction rules:
</div></div></div><div class="div_line"  data-info=({id:27230,ln:90}) id=l90><div class="dl_wrapper"><a name=line90 onclick='overload_click(this)' class="a_ln">90<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27231,ln:91}) id=l91><div class="dl_wrapper"><a name=line91 onclick='overload_click(this)' class="a_ln">91<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">_c_o :
</div></div></div><div class="div_line"  data-info=({id:27232,ln:92}) id=l92><div class="dl_wrapper"><a name=line92 onclick='overload_click(this)' class="a_ln">92<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">    $(CC) -c $(CCFLAGS) $&lt;
</div></div></div><div class="div_line"  data-info=({id:27233,ln:93}) id=l93><div class="dl_wrapper"><a name=line93 onclick='overload_click(this)' class="a_ln">93<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27234,ln:94}) id=l94><div class="dl_wrapper"><a name=line94 onclick='overload_click(this)' class="a_ln">94<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">_s_o :
</div></div></div><div class="div_line"  data-info=({id:27235,ln:95}) id=l95><div class="dl_wrapper"><a name=line95 onclick='overload_click(this)' class="a_ln">95<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">    $(AS) $(ASFLAGS) $&lt; $@
</div></div></div><div class="div_line"  data-info=({id:27236,ln:96}) id=l96><div class="dl_wrapper"><a name=line96 onclick='overload_click(this)' class="a_ln">96<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27237,ln:97}) id=l97><div class="dl_wrapper"><a name=line97 onclick='overload_click(this)' class="a_ln">97<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">_asm_rel :
</div></div></div><div class="div_line"  data-info=({id:27238,ln:98}) id=l98><div class="dl_wrapper"><a name=line98 onclick='overload_click(this)' class="a_ln">98<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">    $(ASM) $&lt; $(ASMFLAGS)
</div></div></div><div class="div_line"  data-info=({id:27239,ln:99}) id=l99><div class="dl_wrapper"><a name=line99 onclick='overload_click(this)' class="a_ln">99<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27240,ln:100}) id=l100><div class="dl_wrapper"><a name=line100 onclick='overload_click(this)' class="a_ln">100<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#end
</div></div></div>
<script>
var local_symbol_set=0;
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/mk_qdos.mak",version:"5_8"})';
</script>