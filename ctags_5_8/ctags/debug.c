<div class="div_line"  data-info=({id:32800,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32801,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: debug.c 558 2007-06-15 19:17:02Z elliotth $
</div></div></div><div class="div_line"  data-info=({id:32802,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32803,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 1996-2002, Darren Hiebert
</div></div></div><div class="div_line"  data-info=({id:32804,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32805,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:32806,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:32807,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32808,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This module contains debugging functions.
</div></div></div><div class="div_line"  data-info=({id:32809,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32810,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32811,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32812,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   INCLUDE FILES
</div></div></div><div class="div_line"  data-info=({id:32813,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32814,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>general.h</span>"  /* must always come first */
</div></div></div><div class="div_line"  data-info=({id:32815,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32816,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>ctype.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:32817,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>stdarg.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:32818,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32819,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>debug.h</span>"
</div></div></div><div class="div_line"  data-info=({id:32820,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>options.h</span>"
</div></div></div><div class="div_line"  data-info=({id:32821,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>read.h</span>"
</div></div></div><div class="div_line"  data-info=({id:32822,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32823,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32824,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   FUNCTION DEFINITIONS
</div></div></div><div class="div_line"  data-info=({id:32825,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32826,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32827,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifdef DEBUG
</div></div></div><div class="div_line"  data-info=({id:32828,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32829,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>lineBreak</span> (void) {}  /* provides a line-specified break point */
</div></div></div><div class="div_line"  data-info=({id:32830,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32831,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugPrintf</span> (
</div></div></div><div class="div_line"  data-info=({id:32832,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;const enum <a href='ctags/debug.h#line48' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>eDebugLevels</a> level, const char *const format, ... )
</div></div></div><div class="div_line"  data-info=({id:32833,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32834,ln:35}) id=l35><div class="dl_wrapper"><a name=line35 onclick='overload_click(this)' class="a_ln">35<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;va_list ap;
</div></div></div><div class="div_line"  data-info=({id:32835,ln:36}) id=l36><div class="dl_wrapper"><a name=line36 onclick='overload_click(this)' class="a_ln">36<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32836,ln:37}) id=l37><div class="dl_wrapper"><a name=line37 onclick='overload_click(this)' class="a_ln">37<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;va_start (ap, format);
</div></div></div><div class="div_line"  data-info=({id:32837,ln:38}) id=l38><div class="dl_wrapper"><a name=line38 onclick='overload_click(this)' class="a_ln">38<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if (debug (level))
</div></div></div><div class="div_line"  data-info=({id:32838,ln:39}) id=l39><div class="dl_wrapper"><a name=line39 onclick='overload_click(this)' class="a_ln">39<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;vprintf (format, ap);
</div></div></div><div class="div_line"  data-info=({id:32839,ln:40}) id=l40><div class="dl_wrapper"><a name=line40 onclick='overload_click(this)' class="a_ln">40<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;fflush (stdout);
</div></div></div><div class="div_line"  data-info=({id:32840,ln:41}) id=l41><div class="dl_wrapper"><a name=line41 onclick='overload_click(this)' class="a_ln">41<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;va_end (ap);
</div></div></div><div class="div_line"  data-info=({id:32841,ln:42}) id=l42><div class="dl_wrapper"><a name=line42 onclick='overload_click(this)' class="a_ln">42<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32842,ln:43}) id=l43><div class="dl_wrapper"><a name=line43 onclick='overload_click(this)' class="a_ln">43<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32843,ln:44}) id=l44><div class="dl_wrapper"><a name=line44 onclick='overload_click(this)' class="a_ln">44<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugPutc</span> (const int level, const int c)
</div></div></div><div class="div_line"  data-info=({id:32844,ln:45}) id=l45><div class="dl_wrapper"><a name=line45 onclick='overload_click(this)' class="a_ln">45<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32845,ln:46}) id=l46><div class="dl_wrapper"><a name=line46 onclick='overload_click(this)' class="a_ln">46<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if (debug (level)  &&  c != EOF)
</div></div></div><div class="div_line"  data-info=({id:32846,ln:47}) id=l47><div class="dl_wrapper"><a name=line47 onclick='overload_click(this)' class="a_ln">47<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;{
</div></div></div><div class="div_line"  data-info=({id:32847,ln:48}) id=l48><div class="dl_wrapper"><a name=line48 onclick='overload_click(this)' class="a_ln">48<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;     if (c == STRING_SYMBOL)  printf ("\"string\"");
</div></div></div><div class="div_line"  data-info=({id:32848,ln:49}) id=l49><div class="dl_wrapper"><a name=line49 onclick='overload_click(this)' class="a_ln">49<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;else if (c == CHAR_SYMBOL)    printf ("'c'");
</div></div></div><div class="div_line"  data-info=({id:32849,ln:50}) id=l50><div class="dl_wrapper"><a name=line50 onclick='overload_click(this)' class="a_ln">50<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;else                          putchar (c);
</div></div></div><div class="div_line"  data-info=({id:32850,ln:51}) id=l51><div class="dl_wrapper"><a name=line51 onclick='overload_click(this)' class="a_ln">51<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32851,ln:52}) id=l52><div class="dl_wrapper"><a name=line52 onclick='overload_click(this)' class="a_ln">52<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;fflush (stdout);
</div></div></div><div class="div_line"  data-info=({id:32852,ln:53}) id=l53><div class="dl_wrapper"><a name=line53 onclick='overload_click(this)' class="a_ln">53<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:32853,ln:54}) id=l54><div class="dl_wrapper"><a name=line54 onclick='overload_click(this)' class="a_ln">54<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32854,ln:55}) id=l55><div class="dl_wrapper"><a name=line55 onclick='overload_click(this)' class="a_ln">55<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32855,ln:56}) id=l56><div class="dl_wrapper"><a name=line56 onclick='overload_click(this)' class="a_ln">56<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugParseNest</span> (const boolean increase, const unsigned int level)
</div></div></div><div class="div_line"  data-info=({id:32856,ln:57}) id=l57><div class="dl_wrapper"><a name=line57 onclick='overload_click(this)' class="a_ln">57<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32857,ln:58}) id=l58><div class="dl_wrapper"><a name=line58 onclick='overload_click(this)' class="a_ln">58<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;<a href='ctags/debug.c#line32' class='a_code_tag multi_def' data-info='({type:"fncall",tagreg:2})'>debugPrintf</a> (DEBUG_PARSE, "&lt;*%snesting:%d*&gt;", increase ? "++" : "--", level);
</div></div></div><div class="div_line"  data-info=({id:32858,ln:59}) id=l59><div class="dl_wrapper"><a name=line59 onclick='overload_click(this)' class="a_ln">59<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32859,ln:60}) id=l60><div class="dl_wrapper"><a name=line60 onclick='overload_click(this)' class="a_ln">60<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32860,ln:61}) id=l61><div class="dl_wrapper"><a name=line61 onclick='overload_click(this)' class="a_ln">61<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugCppNest</span> (const boolean begin, const unsigned int level)
</div></div></div><div class="div_line"  data-info=({id:32861,ln:62}) id=l62><div class="dl_wrapper"><a name=line62 onclick='overload_click(this)' class="a_ln">62<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32862,ln:63}) id=l63><div class="dl_wrapper"><a name=line63 onclick='overload_click(this)' class="a_ln">63<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;<a href='ctags/debug.c#line32' class='a_code_tag multi_def' data-info='({type:"fncall",tagreg:2})'>debugPrintf</a> (DEBUG_CPP, "&lt;*cpp:%s level %d*&gt;", begin ? "begin":"end", level);
</div></div></div><div class="div_line"  data-info=({id:32863,ln:64}) id=l64><div class="dl_wrapper"><a name=line64 onclick='overload_click(this)' class="a_ln">64<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32864,ln:65}) id=l65><div class="dl_wrapper"><a name=line65 onclick='overload_click(this)' class="a_ln">65<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32865,ln:66}) id=l66><div class="dl_wrapper"><a name=line66 onclick='overload_click(this)' class="a_ln">66<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugCppIgnore</span> (const boolean ignore)
</div></div></div><div class="div_line"  data-info=({id:32866,ln:67}) id=l67><div class="dl_wrapper"><a name=line67 onclick='overload_click(this)' class="a_ln">67<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32867,ln:68}) id=l68><div class="dl_wrapper"><a name=line68 onclick='overload_click(this)' class="a_ln">68<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;<a href='ctags/debug.c#line32' class='a_code_tag multi_def' data-info='({type:"fncall",tagreg:2})'>debugPrintf</a> (DEBUG_CPP, "&lt;*cpp:%s ignore*&gt;", ignore ? "begin":"end");
</div></div></div><div class="div_line"  data-info=({id:32868,ln:69}) id=l69><div class="dl_wrapper"><a name=line69 onclick='overload_click(this)' class="a_ln">69<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32869,ln:70}) id=l70><div class="dl_wrapper"><a name=line70 onclick='overload_click(this)' class="a_ln">70<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32870,ln:71}) id=l71><div class="dl_wrapper"><a name=line71 onclick='overload_click(this)' class="a_ln">71<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void <span class='ctd fndef'>debugEntry</span> (const tagEntryInfo *const tag)
</div></div></div><div class="div_line"  data-info=({id:32871,ln:72}) id=l72><div class="dl_wrapper"><a name=line72 onclick='overload_click(this)' class="a_ln">72<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:32872,ln:73}) id=l73><div class="dl_wrapper"><a name=line73 onclick='overload_click(this)' class="a_ln">73<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;const char *const scope = tag-&gt;isFileScope ? "{fs}" : "";
</div></div></div><div class="div_line"  data-info=({id:32873,ln:74}) id=l74><div class="dl_wrapper"><a name=line74 onclick='overload_click(this)' class="a_ln">74<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32874,ln:75}) id=l75><div class="dl_wrapper"><a name=line75 onclick='overload_click(this)' class="a_ln">75<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if (debug (DEBUG_PARSE))
</div></div></div><div class="div_line"  data-info=({id:32875,ln:76}) id=l76><div class="dl_wrapper"><a name=line76 onclick='overload_click(this)' class="a_ln">76<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;{
</div></div></div><div class="div_line"  data-info=({id:32876,ln:77}) id=l77><div class="dl_wrapper"><a name=line77 onclick='overload_click(this)' class="a_ln">77<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf ("&lt;#%s%s:%s", scope, tag-&gt;kindName, tag-&gt;name);
</div></div></div><div class="div_line"  data-info=({id:32877,ln:78}) id=l78><div class="dl_wrapper"><a name=line78 onclick='overload_click(this)' class="a_ln">78<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32878,ln:79}) id=l79><div class="dl_wrapper"><a name=line79 onclick='overload_click(this)' class="a_ln">79<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.scope [0] != NULL  &&
</div></div></div><div class="div_line"  data-info=({id:32879,ln:80}) id=l80><div class="dl_wrapper"><a name=line80 onclick='overload_click(this)' class="a_ln">80<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.scope [1] != NULL)
</div></div></div><div class="div_line"  data-info=({id:32880,ln:81}) id=l81><div class="dl_wrapper"><a name=line81 onclick='overload_click(this)' class="a_ln">81<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [%s:%s]", tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.scope [0],
</div></div></div><div class="div_line"  data-info=({id:32881,ln:82}) id=l82><div class="dl_wrapper"><a name=line82 onclick='overload_click(this)' class="a_ln">82<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.scope [1]);
</div></div></div><div class="div_line"  data-info=({id:32882,ln:83}) id=l83><div class="dl_wrapper"><a name=line83 onclick='overload_click(this)' class="a_ln">83<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32883,ln:84}) id=l84><div class="dl_wrapper"><a name=line84 onclick='overload_click(this)' class="a_ln">84<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (<a href='ctags/options.c#line104' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>Option</a>.<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.inheritance  &&
</div></div></div><div class="div_line"  data-info=({id:32884,ln:85}) id=l85><div class="dl_wrapper"><a name=line85 onclick='overload_click(this)' class="a_ln">85<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.inheritance != NULL)
</div></div></div><div class="div_line"  data-info=({id:32885,ln:86}) id=l86><div class="dl_wrapper"><a name=line86 onclick='overload_click(this)' class="a_ln">86<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [inherits:%s]", tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.inheritance);
</div></div></div><div class="div_line"  data-info=({id:32886,ln:87}) id=l87><div class="dl_wrapper"><a name=line87 onclick='overload_click(this)' class="a_ln">87<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32887,ln:88}) id=l88><div class="dl_wrapper"><a name=line88 onclick='overload_click(this)' class="a_ln">88<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (<a href='ctags/options.c#line104' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>Option</a>.<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.fileScope &&
</div></div></div><div class="div_line"  data-info=({id:32888,ln:89}) id=l89><div class="dl_wrapper"><a name=line89 onclick='overload_click(this)' class="a_ln">89<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;isFileScope && ! isHeaderFile ())
</div></div></div><div class="div_line"  data-info=({id:32889,ln:90}) id=l90><div class="dl_wrapper"><a name=line90 onclick='overload_click(this)' class="a_ln">90<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [file:]");
</div></div></div><div class="div_line"  data-info=({id:32890,ln:91}) id=l91><div class="dl_wrapper"><a name=line91 onclick='overload_click(this)' class="a_ln">91<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32891,ln:92}) id=l92><div class="dl_wrapper"><a name=line92 onclick='overload_click(this)' class="a_ln">92<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (<a href='ctags/options.c#line104' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>Option</a>.<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.access  &&
</div></div></div><div class="div_line"  data-info=({id:32892,ln:93}) id=l93><div class="dl_wrapper"><a name=line93 onclick='overload_click(this)' class="a_ln">93<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.access != NULL)
</div></div></div><div class="div_line"  data-info=({id:32893,ln:94}) id=l94><div class="dl_wrapper"><a name=line94 onclick='overload_click(this)' class="a_ln">94<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [access:%s]", tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.access);
</div></div></div><div class="div_line"  data-info=({id:32894,ln:95}) id=l95><div class="dl_wrapper"><a name=line95 onclick='overload_click(this)' class="a_ln">95<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32895,ln:96}) id=l96><div class="dl_wrapper"><a name=line96 onclick='overload_click(this)' class="a_ln">96<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (<a href='ctags/options.c#line104' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>Option</a>.<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.implementation  &&
</div></div></div><div class="div_line"  data-info=({id:32896,ln:97}) id=l97><div class="dl_wrapper"><a name=line97 onclick='overload_click(this)' class="a_ln">97<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.implementation != NULL)
</div></div></div><div class="div_line"  data-info=({id:32897,ln:98}) id=l98><div class="dl_wrapper"><a name=line98 onclick='overload_click(this)' class="a_ln">98<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [imp:%s]", tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.implementation);
</div></div></div><div class="div_line"  data-info=({id:32898,ln:99}) id=l99><div class="dl_wrapper"><a name=line99 onclick='overload_click(this)' class="a_ln">99<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32899,ln:100}) id=l100><div class="dl_wrapper"><a name=line100 onclick='overload_click(this)' class="a_ln">100<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (<a href='ctags/options.c#line104' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>Option</a>.<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.typeRef  &&
</div></div></div><div class="div_line"  data-info=({id:32900,ln:101}) id=l101><div class="dl_wrapper"><a name=line101 onclick='overload_click(this)' class="a_ln">101<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.typeRef [0] != NULL  &&
</div></div></div><div class="div_line"  data-info=({id:32901,ln:102}) id=l102><div class="dl_wrapper"><a name=line102 onclick='overload_click(this)' class="a_ln">102<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.typeRef [1] != NULL)
</div></div></div><div class="div_line"  data-info=({id:32902,ln:103}) id=l103><div class="dl_wrapper"><a name=line103 onclick='overload_click(this)' class="a_ln">103<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf (" [%s:%s]", tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.typeRef [0],
</div></div></div><div class="div_line"  data-info=({id:32903,ln:104}) id=l104><div class="dl_wrapper"><a name=line104 onclick='overload_click(this)' class="a_ln">104<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;tag-&gt;<a href='ctags/readtags.c#line791' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>extensionFields</a>.typeRef [1]);
</div></div></div><div class="div_line"  data-info=({id:32904,ln:105}) id=l105><div class="dl_wrapper"><a name=line105 onclick='overload_click(this)' class="a_ln">105<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32905,ln:106}) id=l106><div class="dl_wrapper"><a name=line106 onclick='overload_click(this)' class="a_ln">106<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;printf ("#&gt;");
</div></div></div><div class="div_line"  data-info=({id:32906,ln:107}) id=l107><div class="dl_wrapper"><a name=line107 onclick='overload_click(this)' class="a_ln">107<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;fflush (stdout);
</div></div></div><div class="div_line"  data-info=({id:32907,ln:108}) id=l108><div class="dl_wrapper"><a name=line108 onclick='overload_click(this)' class="a_ln">108<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:32908,ln:109}) id=l109><div class="dl_wrapper"><a name=line109 onclick='overload_click(this)' class="a_ln">109<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:32909,ln:110}) id=l110><div class="dl_wrapper"><a name=line110 onclick='overload_click(this)' class="a_ln">110<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32910,ln:111}) id=l111><div class="dl_wrapper"><a name=line111 onclick='overload_click(this)' class="a_ln">111<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:32911,ln:112}) id=l112><div class="dl_wrapper"><a name=line112 onclick='overload_click(this)' class="a_ln">112<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32912,ln:113}) id=l113><div class="dl_wrapper"><a name=line113 onclick='overload_click(this)' class="a_ln">113<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* vi:set tabstop=4 shiftwidth=4: */
</div></div></div><script>var local_symbol_set='([{name:"debugCppIgnore",ln:66},{name:"debugCppNest",ln:61},{name:"debugEntry",ln:71},{name:"debugParseNest",ln:56},{name:"debugPrintf",ln:32},{name:"debugPutc",ln:44},{name:"lineBreak",ln:30},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/debug.c"})';
</script>