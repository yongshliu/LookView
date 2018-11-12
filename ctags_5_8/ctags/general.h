<div class="div_line"  data-info=({id:662,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:663,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: general.h 508 2007-05-03 03:20:59Z dhiebert $
</div></div></div><div class="div_line"  data-info=({id:664,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:665,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 1998-2003, Darren Hiebert
</div></div></div><div class="div_line"  data-info=({id:666,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:667,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:668,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:669,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:670,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Provides the general (non-ctags-specific) environment assumed by all.
</div></div></div><div class="div_line"  data-info=({id:671,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:672,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifndef <a href='ctags/general.h#line12' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>_GENERAL_H</a>
</div></div></div><div class="div_line"  data-info=({id:673,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>_GENERAL_H</span>
</div></div></div><div class="div_line"  data-info=({id:674,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:675,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:676,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   INCLUDE FILES
</div></div></div><div class="div_line"  data-info=({id:677,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:678,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if defined (HAVE_CONFIG_H)
</div></div></div><div class="div_line"  data-info=({id:679,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include &lt;<span class='ctd include'>config.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:680,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (AMIGA)
</div></div></div><div class="div_line"  data-info=({id:681,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_amiga.h</span>"
</div></div></div><div class="div_line"  data-info=({id:682,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (DJGPP)
</div></div></div><div class="div_line"  data-info=({id:683,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_djgpp.h</span>"
</div></div></div><div class="div_line"  data-info=({id:684,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (macintosh)
</div></div></div><div class="div_line"  data-info=({id:685,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_mac.h</span>"
</div></div></div><div class="div_line"  data-info=({id:686,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (MSDOS) || defined (WIN32)
</div></div></div><div class="div_line"  data-info=({id:687,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_msoft.h</span>"
</div></div></div><div class="div_line"  data-info=({id:688,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (OS2)
</div></div></div><div class="div_line"  data-info=({id:689,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_os2.h</span>"
</div></div></div><div class="div_line"  data-info=({id:690,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (QDOS)
</div></div></div><div class="div_line"  data-info=({id:691,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_qdos.h</span>"
</div></div></div><div class="div_line"  data-info=({id:692,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (RISCOS)
</div></div></div><div class="div_line"  data-info=({id:693,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_riscos.h</span>"
</div></div></div><div class="div_line"  data-info=({id:694,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#elif defined (__vms) || defined (<a href='ctags/general.h#line36' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>VMS</a>)
</div></div></div><div class="div_line"  data-info=({id:695,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># include "<span class='ctd include'>e_vms.h</span>"
</div></div></div><div class="div_line"  data-info=({id:696,ln:35}) id=l35><div class="dl_wrapper"><a name=line35 onclick='overload_click(this)' class="a_ln">35<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># ifndef <a href='ctags/general.h#line36' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>VMS</a>
</div></div></div><div class="div_line"  data-info=({id:697,ln:36}) id=l36><div class="dl_wrapper"><a name=line36 onclick='overload_click(this)' class="a_ln">36<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#  define <span class='ctd macdef'>VMS</span> 1
</div></div></div><div class="div_line"  data-info=({id:698,ln:37}) id=l37><div class="dl_wrapper"><a name=line37 onclick='overload_click(this)' class="a_ln">37<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># endif
</div></div></div><div class="div_line"  data-info=({id:699,ln:38}) id=l38><div class="dl_wrapper"><a name=line38 onclick='overload_click(this)' class="a_ln">38<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:700,ln:39}) id=l39><div class="dl_wrapper"><a name=line39 onclick='overload_click(this)' class="a_ln">39<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:701,ln:40}) id=l40><div class="dl_wrapper"><a name=line40 onclick='overload_click(this)' class="a_ln">40<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:702,ln:41}) id=l41><div class="dl_wrapper"><a name=line41 onclick='overload_click(this)' class="a_ln">41<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:703,ln:42}) id=l42><div class="dl_wrapper"><a name=line42 onclick='overload_click(this)' class="a_ln">42<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   MACROS
</div></div></div><div class="div_line"  data-info=({id:704,ln:43}) id=l43><div class="dl_wrapper"><a name=line43 onclick='overload_click(this)' class="a_ln">43<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:705,ln:44}) id=l44><div class="dl_wrapper"><a name=line44 onclick='overload_click(this)' class="a_ln">44<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:706,ln:45}) id=l45><div class="dl_wrapper"><a name=line45 onclick='overload_click(this)' class="a_ln">45<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* Define standard error destination
</div></div></div><div class="div_line"  data-info=({id:707,ln:46}) id=l46><div class="dl_wrapper"><a name=line46 onclick='overload_click(this)' class="a_ln">46<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"> */
</div></div></div><div class="div_line"  data-info=({id:708,ln:47}) id=l47><div class="dl_wrapper"><a name=line47 onclick='overload_click(this)' class="a_ln">47<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifndef <a href='ctags/e_msoft.h#line17' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:2})'>errout</a>
</div></div></div><div class="div_line"  data-info=({id:709,ln:48}) id=l48><div class="dl_wrapper"><a name=line48 onclick='overload_click(this)' class="a_ln">48<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>errout</span>&#160;&#160;&#160;&#160;stderr
</div></div></div><div class="div_line"  data-info=({id:710,ln:49}) id=l49><div class="dl_wrapper"><a name=line49 onclick='overload_click(this)' class="a_ln">49<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:711,ln:50}) id=l50><div class="dl_wrapper"><a name=line50 onclick='overload_click(this)' class="a_ln">50<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:712,ln:51}) id=l51><div class="dl_wrapper"><a name=line51 onclick='overload_click(this)' class="a_ln">51<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* Define regex if supported */
</div></div></div><div class="div_line"  data-info=({id:713,ln:52}) id=l52><div class="dl_wrapper"><a name=line52 onclick='overload_click(this)' class="a_ln">52<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if (defined (<a href='ctags/e_djgpp.h#line35' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:3})'>HAVE_REGCOMP</a>) && !defined (REGCOMP_BROKEN))
</div></div></div><div class="div_line"  data-info=({id:714,ln:53}) id=l53><div class="dl_wrapper"><a name=line53 onclick='overload_click(this)' class="a_ln">53<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_REGEX</span> 1
</div></div></div><div class="div_line"  data-info=({id:715,ln:54}) id=l54><div class="dl_wrapper"><a name=line54 onclick='overload_click(this)' class="a_ln">54<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:716,ln:55}) id=l55><div class="dl_wrapper"><a name=line55 onclick='overload_click(this)' class="a_ln">55<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:717,ln:56}) id=l56><div class="dl_wrapper"><a name=line56 onclick='overload_click(this)' class="a_ln">56<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*  This is a helpful internal feature of later versions (&gt; 2.7) of GCC
</div></div></div><div class="div_line"  data-info=({id:718,ln:57}) id=l57><div class="dl_wrapper"><a name=line57 onclick='overload_click(this)' class="a_ln">57<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"> *  to prevent warnings about unused variables.
</div></div></div><div class="div_line"  data-info=({id:719,ln:58}) id=l58><div class="dl_wrapper"><a name=line58 onclick='overload_click(this)' class="a_ln">58<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"> */
</div></div></div><div class="div_line"  data-info=({id:720,ln:59}) id=l59><div class="dl_wrapper"><a name=line59 onclick='overload_click(this)' class="a_ln">59<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if (__GNUC__ &gt; 2  ||  (__GNUC__ == 2  &&  __GNUC_MINOR__ &gt;= 7)) && !defined (<a href='ctags/gnu_regex/regex.h#line548' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>__GNUG__</a>)
</div></div></div><div class="div_line"  data-info=({id:721,ln:60}) id=l60><div class="dl_wrapper"><a name=line60 onclick='overload_click(this)' class="a_ln">60<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>__unused__</span>  __attribute__((unused))
</div></div></div><div class="div_line"  data-info=({id:722,ln:61}) id=l61><div class="dl_wrapper"><a name=line61 onclick='overload_click(this)' class="a_ln">61<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>__printf__</span>(s,f)  __attribute__((format (printf, s, f)))
</div></div></div><div class="div_line"  data-info=({id:723,ln:62}) id=l62><div class="dl_wrapper"><a name=line62 onclick='overload_click(this)' class="a_ln">62<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#else
</div></div></div><div class="div_line"  data-info=({id:724,ln:63}) id=l63><div class="dl_wrapper"><a name=line63 onclick='overload_click(this)' class="a_ln">63<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>__unused__</span>
</div></div></div><div class="div_line"  data-info=({id:725,ln:64}) id=l64><div class="dl_wrapper"><a name=line64 onclick='overload_click(this)' class="a_ln">64<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>__printf__</span>(s,f)
</div></div></div><div class="div_line"  data-info=({id:726,ln:65}) id=l65><div class="dl_wrapper"><a name=line65 onclick='overload_click(this)' class="a_ln">65<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:727,ln:66}) id=l66><div class="dl_wrapper"><a name=line66 onclick='overload_click(this)' class="a_ln">66<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:728,ln:67}) id=l67><div class="dl_wrapper"><a name=line67 onclick='overload_click(this)' class="a_ln">67<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:729,ln:68}) id=l68><div class="dl_wrapper"><a name=line68 onclick='overload_click(this)' class="a_ln">68<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"> *  Portability macros
</div></div></div><div class="div_line"  data-info=({id:730,ln:69}) id=l69><div class="dl_wrapper"><a name=line69 onclick='overload_click(this)' class="a_ln">69<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"> */
</div></div></div><div class="div_line"  data-info=({id:731,ln:70}) id=l70><div class="dl_wrapper"><a name=line70 onclick='overload_click(this)' class="a_ln">70<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if !defined(<a href='ctags/e_djgpp.h#line39' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>HAVE_STRCASECMP</a>) && !defined(<a href='ctags/general.h#line72' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:2})'>strcasecmp</a>)
</div></div></div><div class="div_line"  data-info=({id:732,ln:71}) id=l71><div class="dl_wrapper"><a name=line71 onclick='overload_click(this)' class="a_ln">71<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># ifdef <a href='ctags/e_amiga.h#line21' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:4})'>HAVE_STRICMP</a>
</div></div></div><div class="div_line"  data-info=({id:733,ln:72}) id=l72><div class="dl_wrapper"><a name=line72 onclick='overload_click(this)' class="a_ln">72<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#  define <span class='ctd macdef'>strcasecmp</span>(s1,s2) stricmp(s1,s2)
</div></div></div><div class="div_line"  data-info=({id:734,ln:73}) id=l73><div class="dl_wrapper"><a name=line73 onclick='overload_click(this)' class="a_ln">73<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># else
</div></div></div><div class="div_line"  data-info=({id:735,ln:74}) id=l74><div class="dl_wrapper"><a name=line74 onclick='overload_click(this)' class="a_ln">74<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#  define <span class='ctd macdef'>strcasecmp</span>(s1,s2) <a href='ctags/readtags.c#line105' class='a_code_tag multi_def' data-info='({type:"fncall",tagreg:2})'>struppercmp</a>(s1,s2)
</div></div></div><div class="div_line"  data-info=({id:736,ln:75}) id=l75><div class="dl_wrapper"><a name=line75 onclick='overload_click(this)' class="a_ln">75<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># endif
</div></div></div><div class="div_line"  data-info=({id:737,ln:76}) id=l76><div class="dl_wrapper"><a name=line76 onclick='overload_click(this)' class="a_ln">76<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:738,ln:77}) id=l77><div class="dl_wrapper"><a name=line77 onclick='overload_click(this)' class="a_ln">77<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:739,ln:78}) id=l78><div class="dl_wrapper"><a name=line78 onclick='overload_click(this)' class="a_ln">78<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if !defined(<a href='ctags/e_djgpp.h#line41' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>HAVE_STRNCASECMP</a>) && !defined(<a href='ctags/general.h#line80' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:2})'>strncasecmp</a>)
</div></div></div><div class="div_line"  data-info=({id:740,ln:79}) id=l79><div class="dl_wrapper"><a name=line79 onclick='overload_click(this)' class="a_ln">79<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># ifdef <a href='ctags/e_amiga.h#line22' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:4})'>HAVE_STRNICMP</a>
</div></div></div><div class="div_line"  data-info=({id:741,ln:80}) id=l80><div class="dl_wrapper"><a name=line80 onclick='overload_click(this)' class="a_ln">80<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#  define <span class='ctd macdef'>strncasecmp</span>(s1,s2,n) strnicmp(s1,s2,n)
</div></div></div><div class="div_line"  data-info=({id:742,ln:81}) id=l81><div class="dl_wrapper"><a name=line81 onclick='overload_click(this)' class="a_ln">81<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># else
</div></div></div><div class="div_line"  data-info=({id:743,ln:82}) id=l82><div class="dl_wrapper"><a name=line82 onclick='overload_click(this)' class="a_ln">82<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#  define <span class='ctd macdef'>strncasecmp</span>(s1,s2,n) <a href='ctags/readtags.c#line115' class='a_code_tag multi_def' data-info='({type:"fncall",tagreg:2})'>strnuppercmp</a>(s1,s2,n)
</div></div></div><div class="div_line"  data-info=({id:744,ln:83}) id=l83><div class="dl_wrapper"><a name=line83 onclick='overload_click(this)' class="a_ln">83<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># endif
</div></div></div><div class="div_line"  data-info=({id:745,ln:84}) id=l84><div class="dl_wrapper"><a name=line84 onclick='overload_click(this)' class="a_ln">84<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:746,ln:85}) id=l85><div class="dl_wrapper"><a name=line85 onclick='overload_click(this)' class="a_ln">85<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:747,ln:86}) id=l86><div class="dl_wrapper"><a name=line86 onclick='overload_click(this)' class="a_ln">86<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:748,ln:87}) id=l87><div class="dl_wrapper"><a name=line87 onclick='overload_click(this)' class="a_ln">87<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   DATA DECLARATIONS
</div></div></div><div class="div_line"  data-info=({id:749,ln:88}) id=l88><div class="dl_wrapper"><a name=line88 onclick='overload_click(this)' class="a_ln">88<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:750,ln:89}) id=l89><div class="dl_wrapper"><a name=line89 onclick='overload_click(this)' class="a_ln">89<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:751,ln:90}) id=l90><div class="dl_wrapper"><a name=line90 onclick='overload_click(this)' class="a_ln">90<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#undef <a href='ctags/general.h#line98' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>FALSE</a>
</div></div></div><div class="div_line"  data-info=({id:752,ln:91}) id=l91><div class="dl_wrapper"><a name=line91 onclick='overload_click(this)' class="a_ln">91<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#undef <a href='ctags/general.h#line99' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>TRUE</a>
</div></div></div><div class="div_line"  data-info=({id:753,ln:92}) id=l92><div class="dl_wrapper"><a name=line92 onclick='overload_click(this)' class="a_ln">92<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifdef VAXC
</div></div></div><div class="div_line"  data-info=({id:754,ln:93}) id=l93><div class="dl_wrapper"><a name=line93 onclick='overload_click(this)' class="a_ln">93<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">typedef enum { <span class='ctd member'>FALSE</span>, TRUE } booleanType;
</div></div></div><div class="div_line"  data-info=({id:755,ln:94}) id=l94><div class="dl_wrapper"><a name=line94 onclick='overload_click(this)' class="a_ln">94<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">typedef int <span class='ctd typedef'>boolean</span>;
</div></div></div><div class="div_line"  data-info=({id:756,ln:95}) id=l95><div class="dl_wrapper"><a name=line95 onclick='overload_click(this)' class="a_ln">95<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#else
</div></div></div><div class="div_line"  data-info=({id:757,ln:96}) id=l96><div class="dl_wrapper"><a name=line96 onclick='overload_click(this)' class="a_ln">96<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># ifdef __cplusplus
</div></div></div><div class="div_line"  data-info=({id:758,ln:97}) id=l97><div class="dl_wrapper"><a name=line97 onclick='overload_click(this)' class="a_ln">97<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">typedef bool <span class='ctd typedef'>boolean</span>;
</div></div></div><div class="div_line"  data-info=({id:759,ln:98}) id=l98><div class="dl_wrapper"><a name=line98 onclick='overload_click(this)' class="a_ln">98<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>FALSE</span> false
</div></div></div><div class="div_line"  data-info=({id:760,ln:99}) id=l99><div class="dl_wrapper"><a name=line99 onclick='overload_click(this)' class="a_ln">99<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>TRUE</span> true
</div></div></div><div class="div_line"  data-info=({id:761,ln:100}) id=l100><div class="dl_wrapper"><a name=line100 onclick='overload_click(this)' class="a_ln">100<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># else
</div></div></div><div class="div_line"  data-info=({id:762,ln:101}) id=l101><div class="dl_wrapper"><a name=line101 onclick='overload_click(this)' class="a_ln">101<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">typedef enum { <span class='ctd member'>FALSE</span>, TRUE } boolean;
</div></div></div><div class="div_line"  data-info=({id:763,ln:102}) id=l102><div class="dl_wrapper"><a name=line102 onclick='overload_click(this)' class="a_ln">102<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># endif
</div></div></div><div class="div_line"  data-info=({id:764,ln:103}) id=l103><div class="dl_wrapper"><a name=line103 onclick='overload_click(this)' class="a_ln">103<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:765,ln:104}) id=l104><div class="dl_wrapper"><a name=line104 onclick='overload_click(this)' class="a_ln">104<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:766,ln:105}) id=l105><div class="dl_wrapper"><a name=line105 onclick='overload_click(this)' class="a_ln">105<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if ! defined (<a href='ctags/e_amiga.h#line19' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:8})'>HAVE_FGETPOS</a>) && ! defined (<a href='ctags/general.h#line106' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>fpos_t</a>)
</div></div></div><div class="div_line"  data-info=({id:767,ln:106}) id=l106><div class="dl_wrapper"><a name=line106 onclick='overload_click(this)' class="a_ln">106<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>fpos_t</span> long
</div></div></div><div class="div_line"  data-info=({id:768,ln:107}) id=l107><div class="dl_wrapper"><a name=line107 onclick='overload_click(this)' class="a_ln">107<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:769,ln:108}) id=l108><div class="dl_wrapper"><a name=line108 onclick='overload_click(this)' class="a_ln">108<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:770,ln:109}) id=l109><div class="dl_wrapper"><a name=line109 onclick='overload_click(this)' class="a_ln">109<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:771,ln:110}) id=l110><div class="dl_wrapper"><a name=line110 onclick='overload_click(this)' class="a_ln">110<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   FUNCTION PROTOTYPES
</div></div></div><div class="div_line"  data-info=({id:772,ln:111}) id=l111><div class="dl_wrapper"><a name=line111 onclick='overload_click(this)' class="a_ln">111<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:773,ln:112}) id=l112><div class="dl_wrapper"><a name=line112 onclick='overload_click(this)' class="a_ln">112<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:774,ln:113}) id=l113><div class="dl_wrapper"><a name=line113 onclick='overload_click(this)' class="a_ln">113<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if defined (NEED_PROTO_REMOVE) && defined (<a href='ctags/e_djgpp.h#line36' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:5})'>HAVE_REMOVE</a>)
</div></div></div><div class="div_line"  data-info=({id:775,ln:114}) id=l114><div class="dl_wrapper"><a name=line114 onclick='overload_click(this)' class="a_ln">114<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern int remove (const char *);
</div></div></div><div class="div_line"  data-info=({id:776,ln:115}) id=l115><div class="dl_wrapper"><a name=line115 onclick='overload_click(this)' class="a_ln">115<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:777,ln:116}) id=l116><div class="dl_wrapper"><a name=line116 onclick='overload_click(this)' class="a_ln">116<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:778,ln:117}) id=l117><div class="dl_wrapper"><a name=line117 onclick='overload_click(this)' class="a_ln">117<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#if defined (NEED_PROTO_UNLINK) && ! defined (<a href='ctags/e_djgpp.h#line36' class='a_code_tag multi_def' data-info='({type:"glref",tagreg:5})'>HAVE_REMOVE</a>)
</div></div></div><div class="div_line"  data-info=({id:779,ln:118}) id=l118><div class="dl_wrapper"><a name=line118 onclick='overload_click(this)' class="a_ln">118<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void *unlink (const char *);
</div></div></div><div class="div_line"  data-info=({id:780,ln:119}) id=l119><div class="dl_wrapper"><a name=line119 onclick='overload_click(this)' class="a_ln">119<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:781,ln:120}) id=l120><div class="dl_wrapper"><a name=line120 onclick='overload_click(this)' class="a_ln">120<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:782,ln:121}) id=l121><div class="dl_wrapper"><a name=line121 onclick='overload_click(this)' class="a_ln">121<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifdef NEED_PROTO_GETENV
</div></div></div><div class="div_line"  data-info=({id:783,ln:122}) id=l122><div class="dl_wrapper"><a name=line122 onclick='overload_click(this)' class="a_ln">122<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern char *getenv (const char *);
</div></div></div><div class="div_line"  data-info=({id:784,ln:123}) id=l123><div class="dl_wrapper"><a name=line123 onclick='overload_click(this)' class="a_ln">123<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:785,ln:124}) id=l124><div class="dl_wrapper"><a name=line124 onclick='overload_click(this)' class="a_ln">124<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:786,ln:125}) id=l125><div class="dl_wrapper"><a name=line125 onclick='overload_click(this)' class="a_ln">125<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif  /* _GENERAL_H */
</div></div></div><div class="div_line"  data-info=({id:787,ln:126}) id=l126><div class="dl_wrapper"><a name=line126 onclick='overload_click(this)' class="a_ln">126<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:788,ln:127}) id=l127><div class="dl_wrapper"><a name=line127 onclick='overload_click(this)' class="a_ln">127<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* vi:set tabstop=4 shiftwidth=4: */
</div></div></div><script>var local_symbol_set='([{name:"FALSE",ln:101},{name:"FALSE",ln:90},{name:"FALSE",ln:93},{name:"FALSE",ln:98},{name:"HAVE_REGEX",ln:53},{name:"TRUE",ln:101},{name:"TRUE",ln:91},{name:"TRUE",ln:93},{name:"TRUE",ln:99},{name:"VMS",ln:36},{name:"_GENERAL_H",ln:12},{name:"__printf__",ln:61},{name:"__printf__",ln:64},{name:"__unused__",ln:60},{name:"__unused__",ln:63},{name:"boolean",ln:101},{name:"boolean",ln:94},{name:"boolean",ln:97},{name:"booleanType",ln:93},{name:"errout",ln:48},{name:"fpos_t",ln:106},{name:"strcasecmp",ln:72},{name:"strcasecmp",ln:74},{name:"strncasecmp",ln:80},{name:"strncasecmp",ln:82},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/general.h"})';
</script>