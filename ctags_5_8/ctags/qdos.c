<div class="div_line"  data-info=({id:27035,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:27036,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: qdos.c 443 2006-05-30 04:37:13Z darren $
</div></div></div><div class="div_line"  data-info=({id:27037,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:27038,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 1999, Thierry Godefroy &lt;godefroy@imaginet.fr&gt;
</div></div></div><div class="div_line"  data-info=({id:27039,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:27040,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:27041,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:27042,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:27043,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This module contains functions to handle wildcard expansion and file name
</div></div></div><div class="div_line"  data-info=({id:27044,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   conversion under QDOS.
</div></div></div><div class="div_line"  data-info=({id:27045,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:27046,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27047,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>stdio.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27048,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>stdlib.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27049,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>unistd.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27050,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>fcntl.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27051,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>qdos.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27052,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>string.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27053,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include &lt;<span class='ctd include'>errno.h</span>&gt;
</div></div></div><div class="div_line"  data-info=({id:27054,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>ctags.h</span>"
</div></div></div><div class="div_line"  data-info=({id:27055,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27056,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* Translate the filenames from UNIX to QDOS conventions on open calls */
</div></div></div><div class="div_line"  data-info=({id:27057,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">int (*_Open) (const char *, int, ...) = qopen;
</div></div></div><div class="div_line"  data-info=({id:27058,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27059,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">long _stack          = 24576;  /* Plenty of stack space */
</div></div></div><div class="div_line"  data-info=({id:27060,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">long _memincr        = 10240;  /* Big increments to cut fragmentation */
</div></div></div><div class="div_line"  data-info=({id:27061,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">char _prog_name []   = "ctags";
</div></div></div><div class="div_line"  data-info=({id:27062,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">char _version []     = <a href='ctags/ctags.h#line18' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>PROGRAM_VERSION</a>;
</div></div></div><div class="div_line"  data-info=({id:27063,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">char _copyright [32] = __DATE__;
</div></div></div><div class="div_line"  data-info=({id:27064,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">char *_endmsg        = "\nPress a key to exit.";
</div></div></div><div class="div_line"  data-info=({id:27065,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">int  <a href='ctags/qdos.c#line43' class='a_code_tag ' data-info='({type:"fncall",tagreg:1})'>custom_expand</a> (char * param, char ***argvptr, int *argcptr);
</div></div></div><div class="div_line"  data-info=({id:27066,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">int  (*_cmdwildcard) ()  = custom_expand;
</div></div></div><div class="div_line"  data-info=({id:27067,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27068,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27069,ln:35}) id=l35><div class="dl_wrapper"><a name=line35 onclick='overload_click(this)' class="a_ln">35<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">struct WINDOWDEF _condetails = { 208, 1, 0, 7, 512, 256, 0, 0};
</div></div></div><div class="div_line"  data-info=({id:27070,ln:36}) id=l36><div class="dl_wrapper"><a name=line36 onclick='overload_click(this)' class="a_ln">36<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">void (*<span class='ctd gvdef'>_consetup</span>) ()         = consetup_title;
</div></div></div><div class="div_line"  data-info=({id:27071,ln:37}) id=l37><div class="dl_wrapper"><a name=line37 onclick='overload_click(this)' class="a_ln">37<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27072,ln:38}) id=l38><div class="dl_wrapper"><a name=line38 onclick='overload_click(this)' class="a_ln">38<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* custom cmdexpand: also expands directory names */
</div></div></div><div class="div_line"  data-info=({id:27073,ln:39}) id=l39><div class="dl_wrapper"><a name=line39 onclick='overload_click(this)' class="a_ln">39<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27074,ln:40}) id=l40><div class="dl_wrapper"><a name=line40 onclick='overload_click(this)' class="a_ln">40<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>FILEBUF_INIT</span>    1024  /* Initial allocation size for buffer */
</div></div></div><div class="div_line"  data-info=({id:27075,ln:41}) id=l41><div class="dl_wrapper"><a name=line41 onclick='overload_click(this)' class="a_ln">41<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>FILEBUF_INCR</span>    1024  /* Increment size for buffer */
</div></div></div><div class="div_line"  data-info=({id:27076,ln:42}) id=l42><div class="dl_wrapper"><a name=line42 onclick='overload_click(this)' class="a_ln">42<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27077,ln:43}) id=l43><div class="dl_wrapper"><a name=line43 onclick='overload_click(this)' class="a_ln">43<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">int <span class='ctd fndef'>custom_expand</span> (char * param, char ***argvptr, int *argcptr)
</div></div></div><div class="div_line"  data-info=({id:27078,ln:44}) id=l44><div class="dl_wrapper"><a name=line44 onclick='overload_click(this)' class="a_ln">44<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:27079,ln:45}) id=l45><div class="dl_wrapper"><a name=line45 onclick='overload_click(this)' class="a_ln">45<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;int     count,sl;
</div></div></div><div class="div_line"  data-info=({id:27080,ln:46}) id=l46><div class="dl_wrapper"><a name=line46 onclick='overload_click(this)' class="a_ln">46<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;size_t  bufsize;
</div></div></div><div class="div_line"  data-info=({id:27081,ln:47}) id=l47><div class="dl_wrapper"><a name=line47 onclick='overload_click(this)' class="a_ln">47<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;char    *filenamebuf;
</div></div></div><div class="div_line"  data-info=({id:27082,ln:48}) id=l48><div class="dl_wrapper"><a name=line48 onclick='overload_click(this)' class="a_ln">48<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;char    *ptr,*safeptr;
</div></div></div><div class="div_line"  data-info=({id:27083,ln:49}) id=l49><div class="dl_wrapper"><a name=line49 onclick='overload_click(this)' class="a_ln">49<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27084,ln:50}) id=l50><div class="dl_wrapper"><a name=line50 onclick='overload_click(this)' class="a_ln">50<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;/*
</div></div></div><div class="div_line"  data-info=({id:27085,ln:51}) id=l51><div class="dl_wrapper"><a name=line51 onclick='overload_click(this)' class="a_ln">51<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  Check to see if we should do wild card expansion.
</div></div></div><div class="div_line"  data-info=({id:27086,ln:52}) id=l52><div class="dl_wrapper"><a name=line52 onclick='overload_click(this)' class="a_ln">52<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  We only perform wildcard expansion if the parameter
</div></div></div><div class="div_line"  data-info=({id:27087,ln:53}) id=l53><div class="dl_wrapper"><a name=line53 onclick='overload_click(this)' class="a_ln">53<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  was not a string and if it contains one of the
</div></div></div><div class="div_line"  data-info=({id:27088,ln:54}) id=l54><div class="dl_wrapper"><a name=line54 onclick='overload_click(this)' class="a_ln">54<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  wild card characters.
</div></div></div><div class="div_line"  data-info=({id:27089,ln:55}) id=l55><div class="dl_wrapper"><a name=line55 onclick='overload_click(this)' class="a_ln">55<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *
</div></div></div><div class="div_line"  data-info=({id:27090,ln:56}) id=l56><div class="dl_wrapper"><a name=line56 onclick='overload_click(this)' class="a_ln">56<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  We also do not expand any option that starts with '-'
</div></div></div><div class="div_line"  data-info=({id:27091,ln:57}) id=l57><div class="dl_wrapper"><a name=line57 onclick='overload_click(this)' class="a_ln">57<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  as we then assume that it is a unix stylew option.
</div></div></div><div class="div_line"  data-info=({id:27092,ln:58}) id=l58><div class="dl_wrapper"><a name=line58 onclick='overload_click(this)' class="a_ln">58<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; */
</div></div></div><div class="div_line"  data-info=({id:27093,ln:59}) id=l59><div class="dl_wrapper"><a name=line59 onclick='overload_click(this)' class="a_ln">59<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if ((*param == '-') ||  (strpbrk (param,"*?") == NULL) ) {
</div></div></div><div class="div_line"  data-info=({id:27094,ln:60}) id=l60><div class="dl_wrapper"><a name=line60 onclick='overload_click(this)' class="a_ln">60<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    return 0;
</div></div></div><div class="div_line"  data-info=({id:27095,ln:61}) id=l61><div class="dl_wrapper"><a name=line61 onclick='overload_click(this)' class="a_ln">61<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27096,ln:62}) id=l62><div class="dl_wrapper"><a name=line62 onclick='overload_click(this)' class="a_ln">62<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27097,ln:63}) id=l63><div class="dl_wrapper"><a name=line63 onclick='overload_click(this)' class="a_ln">63<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if ((filenamebuf = malloc (bufsize = <a href='ctags/qdos.c#line40' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>FILEBUF_INIT</a>)) == NULL) {
</div></div></div><div class="div_line"  data-info=({id:27098,ln:64}) id=l64><div class="dl_wrapper"><a name=line64 onclick='overload_click(this)' class="a_ln">64<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    return -1;
</div></div></div><div class="div_line"  data-info=({id:27099,ln:65}) id=l65><div class="dl_wrapper"><a name=line65 onclick='overload_click(this)' class="a_ln">65<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27100,ln:66}) id=l66><div class="dl_wrapper"><a name=line66 onclick='overload_click(this)' class="a_ln">66<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">TRYAGAIN:
</div></div></div><div class="div_line"  data-info=({id:27101,ln:67}) id=l67><div class="dl_wrapper"><a name=line67 onclick='overload_click(this)' class="a_ln">67<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;count = getfnl (param, filenamebuf, bufsize, QDR_ALL);
</div></div></div><div class="div_line"  data-info=({id:27102,ln:68}) id=l68><div class="dl_wrapper"><a name=line68 onclick='overload_click(this)' class="a_ln">68<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if (count == -1  && errno == ENOMEM) {
</div></div></div><div class="div_line"  data-info=({id:27103,ln:69}) id=l69><div class="dl_wrapper"><a name=line69 onclick='overload_click(this)' class="a_ln">69<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    /*
</div></div></div><div class="div_line"  data-info=({id:27104,ln:70}) id=l70><div class="dl_wrapper"><a name=line70 onclick='overload_click(this)' class="a_ln">70<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;     *  We have overflowed the buffer, so we try
</div></div></div><div class="div_line"  data-info=({id:27105,ln:71}) id=l71><div class="dl_wrapper"><a name=line71 onclick='overload_click(this)' class="a_ln">71<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;     *  to get a bigger buffer and try again.
</div></div></div><div class="div_line"  data-info=({id:27106,ln:72}) id=l72><div class="dl_wrapper"><a name=line72 onclick='overload_click(this)' class="a_ln">72<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;     */
</div></div></div><div class="div_line"  data-info=({id:27107,ln:73}) id=l73><div class="dl_wrapper"><a name=line73 onclick='overload_click(this)' class="a_ln">73<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    bufsize += <a href='ctags/qdos.c#line41' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>FILEBUF_INCR</a>;
</div></div></div><div class="div_line"  data-info=({id:27108,ln:74}) id=l74><div class="dl_wrapper"><a name=line74 onclick='overload_click(this)' class="a_ln">74<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    if ((filenamebuf = realloc (filenamebuf, bufsize)) == NULL) {
</div></div></div><div class="div_line"  data-info=({id:27109,ln:75}) id=l75><div class="dl_wrapper"><a name=line75 onclick='overload_click(this)' class="a_ln">75<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;        return -1;
</div></div></div><div class="div_line"  data-info=({id:27110,ln:76}) id=l76><div class="dl_wrapper"><a name=line76 onclick='overload_click(this)' class="a_ln">76<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    } else {
</div></div></div><div class="div_line"  data-info=({id:27111,ln:77}) id=l77><div class="dl_wrapper"><a name=line77 onclick='overload_click(this)' class="a_ln">77<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;        goto TRYAGAIN;
</div></div></div><div class="div_line"  data-info=({id:27112,ln:78}) id=l78><div class="dl_wrapper"><a name=line78 onclick='overload_click(this)' class="a_ln">78<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    }
</div></div></div><div class="div_line"  data-info=({id:27113,ln:79}) id=l79><div class="dl_wrapper"><a name=line79 onclick='overload_click(this)' class="a_ln">79<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27114,ln:80}) id=l80><div class="dl_wrapper"><a name=line80 onclick='overload_click(this)' class="a_ln">80<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;/*
</div></div></div><div class="div_line"  data-info=({id:27115,ln:81}) id=l81><div class="dl_wrapper"><a name=line81 onclick='overload_click(this)' class="a_ln">81<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  If no files were found, then return unexpanded.
</div></div></div><div class="div_line"  data-info=({id:27116,ln:82}) id=l82><div class="dl_wrapper"><a name=line82 onclick='overload_click(this)' class="a_ln">82<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; */
</div></div></div><div class="div_line"  data-info=({id:27117,ln:83}) id=l83><div class="dl_wrapper"><a name=line83 onclick='overload_click(this)' class="a_ln">83<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;if (count == 0) {
</div></div></div><div class="div_line"  data-info=({id:27118,ln:84}) id=l84><div class="dl_wrapper"><a name=line84 onclick='overload_click(this)' class="a_ln">84<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    free (filenamebuf);
</div></div></div><div class="div_line"  data-info=({id:27119,ln:85}) id=l85><div class="dl_wrapper"><a name=line85 onclick='overload_click(this)' class="a_ln">85<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;    return 0;
</div></div></div><div class="div_line"  data-info=({id:27120,ln:86}) id=l86><div class="dl_wrapper"><a name=line86 onclick='overload_click(this)' class="a_ln">86<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27121,ln:87}) id=l87><div class="dl_wrapper"><a name=line87 onclick='overload_click(this)' class="a_ln">87<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;/*
</div></div></div><div class="div_line"  data-info=({id:27122,ln:88}) id=l88><div class="dl_wrapper"><a name=line88 onclick='overload_click(this)' class="a_ln">88<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  Files were found, so add these to the list instead
</div></div></div><div class="div_line"  data-info=({id:27123,ln:89}) id=l89><div class="dl_wrapper"><a name=line89 onclick='overload_click(this)' class="a_ln">89<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; *  of the original parameter typed by the user.
</div></div></div><div class="div_line"  data-info=({id:27124,ln:90}) id=l90><div class="dl_wrapper"><a name=line90 onclick='overload_click(this)' class="a_ln">90<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160; */
</div></div></div><div class="div_line"  data-info=({id:27125,ln:91}) id=l91><div class="dl_wrapper"><a name=line91 onclick='overload_click(this)' class="a_ln">91<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;for ( ptr=filenamebuf ; count &gt; 0 ; count -- ) {
</div></div></div><div class="div_line"  data-info=({id:27126,ln:92}) id=l92><div class="dl_wrapper"><a name=line92 onclick='overload_click(this)' class="a_ln">92<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;*argvptr = (char **) realloc (*argvptr, (size_t) (((*argcptr) + 2) * sizeof (char *)));
</div></div></div><div class="div_line"  data-info=({id:27127,ln:93}) id=l93><div class="dl_wrapper"><a name=line93 onclick='overload_click(this)' class="a_ln">93<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;safeptr= (char *) malloc ((size_t) (sl=strlen (ptr) + 1));
</div></div></div><div class="div_line"  data-info=({id:27128,ln:94}) id=l94><div class="dl_wrapper"><a name=line94 onclick='overload_click(this)' class="a_ln">94<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;if (safeptr == NULL || *argvptr == NULL) {
</div></div></div><div class="div_line"  data-info=({id:27129,ln:95}) id=l95><div class="dl_wrapper"><a name=line95 onclick='overload_click(this)' class="a_ln">95<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;return -1;
</div></div></div><div class="div_line"  data-info=({id:27130,ln:96}) id=l96><div class="dl_wrapper"><a name=line96 onclick='overload_click(this)' class="a_ln">96<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27131,ln:97}) id=l97><div class="dl_wrapper"><a name=line97 onclick='overload_click(this)' class="a_ln">97<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(void) memcpy (safeptr,ptr, (size_t) sl);
</div></div></div><div class="div_line"  data-info=({id:27132,ln:98}) id=l98><div class="dl_wrapper"><a name=line98 onclick='overload_click(this)' class="a_ln">98<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;(*argvptr) [*argcptr] = safeptr;
</div></div></div><div class="div_line"  data-info=({id:27133,ln:99}) id=l99><div class="dl_wrapper"><a name=line99 onclick='overload_click(this)' class="a_ln">99<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;*argcptr += 1;
</div></div></div><div class="div_line"  data-info=({id:27134,ln:100}) id=l100><div class="dl_wrapper"><a name=line100 onclick='overload_click(this)' class="a_ln">100<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;ptr += sl;
</div></div></div><div class="div_line"  data-info=({id:27135,ln:101}) id=l101><div class="dl_wrapper"><a name=line101 onclick='overload_click(this)' class="a_ln">101<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;}
</div></div></div><div class="div_line"  data-info=({id:27136,ln:102}) id=l102><div class="dl_wrapper"><a name=line102 onclick='overload_click(this)' class="a_ln">102<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;free (filenamebuf);
</div></div></div><div class="div_line"  data-info=({id:27137,ln:103}) id=l103><div class="dl_wrapper"><a name=line103 onclick='overload_click(this)' class="a_ln">103<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;return *argcptr;
</div></div></div><div class="div_line"  data-info=({id:27138,ln:104}) id=l104><div class="dl_wrapper"><a name=line104 onclick='overload_click(this)' class="a_ln">104<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:27139,ln:105}) id=l105><div class="dl_wrapper"><a name=line105 onclick='overload_click(this)' class="a_ln">105<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:27140,ln:106}) id=l106><div class="dl_wrapper"><a name=line106 onclick='overload_click(this)' class="a_ln">106<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* vi:set tabstop=4 shiftwidth=4: */
</div></div></div><script>var local_symbol_set='([{name:"FILEBUF_INCR",ln:41},{name:"FILEBUF_INIT",ln:40},{name:"_Open",ln:23},{name:"_cmdwildcard",ln:32},{name:"_condetails",ln:35},{name:"_consetup",ln:36},{name:"_copyright",ln:29},{name:"_endmsg",ln:30},{name:"_memincr",ln:26},{name:"_prog_name",ln:27},{name:"_stack",ln:25},{name:"_version",ln:28},{name:"custom_expand",ln:43},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/qdos.c"})';
</script>