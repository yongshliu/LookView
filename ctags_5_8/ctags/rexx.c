<div class="div_line"  data-info=({id:51976,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:51977,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: rexx.c 443 2006-05-30 04:37:13Z darren $
</div></div></div><div class="div_line"  data-info=({id:51978,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:51979,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 2001-2003, Darren Hiebert
</div></div></div><div class="div_line"  data-info=({id:51980,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:51981,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:51982,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:51983,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:51984,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This module contains functions for generating tags for the REXX language
</div></div></div><div class="div_line"  data-info=({id:51985,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   (http://www.rexxla.org, http://www2.hursley.ibm.com/rexx).
</div></div></div><div class="div_line"  data-info=({id:51986,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:51987,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:51988,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:51989,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   INCLUDE FILES
</div></div></div><div class="div_line"  data-info=({id:51990,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:51991,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>general.h</span>"  /* always include first */
</div></div></div><div class="div_line"  data-info=({id:51992,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>parse.h</span>"    /* always include */
</div></div></div><div class="div_line"  data-info=({id:51993,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:51994,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:51995,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   FUNCTION DEFINITIONS
</div></div></div><div class="div_line"  data-info=({id:51996,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:51997,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:51998,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">static void <span class='ctd fndef'>installRexxRegex</span> (const langType language)
</div></div></div><div class="div_line"  data-info=({id:51999,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:52000,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;<a href='ctags/lregex.c#line540' class='a_code_tag ' data-info='({type:"fncall",tagreg:1})'>addTagRegex</a> (language, "^([A-Za-z0-9@#$\\.!?_]+)[ \t]*:",
</div></div></div><div class="div_line"  data-info=({id:52001,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;"\\1", "s,subroutine,subroutines", NULL);
</div></div></div><div class="div_line"  data-info=({id:52002,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:52003,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:52004,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern parserDefinition* <span class='ctd fndef'>RexxParser</span> (void)
</div></div></div><div class="div_line"  data-info=({id:52005,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">{
</div></div></div><div class="div_line"  data-info=({id:52006,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;static const char *const extensions [] = { "cmd", "rexx", "rx", NULL };
</div></div></div><div class="div_line"  data-info=({id:52007,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;parserDefinition* const def = <a href='ctags/parse.c#line60' class='a_code_tag ' data-info='({type:"fncall",tagreg:1})'>parserNew</a> ("REXX");
</div></div></div><div class="div_line"  data-info=({id:52008,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;def-&gt;extensions = extensions;
</div></div></div><div class="div_line"  data-info=({id:52009,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;def-&gt;initialize = installRexxRegex;
</div></div></div><div class="div_line"  data-info=({id:52010,ln:35}) id=l35><div class="dl_wrapper"><a name=line35 onclick='overload_click(this)' class="a_ln">35<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;def-&gt;regex      = <a href='ctags/general.h#line99' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>TRUE</a>;
</div></div></div><div class="div_line"  data-info=({id:52011,ln:36}) id=l36><div class="dl_wrapper"><a name=line36 onclick='overload_click(this)' class="a_ln">36<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">&#160;&#160;&#160;&#160;return def;
</div></div></div><div class="div_line"  data-info=({id:52012,ln:37}) id=l37><div class="dl_wrapper"><a name=line37 onclick='overload_click(this)' class="a_ln">37<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">}
</div></div></div><div class="div_line"  data-info=({id:52013,ln:38}) id=l38><div class="dl_wrapper"><a name=line38 onclick='overload_click(this)' class="a_ln">38<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:52014,ln:39}) id=l39><div class="dl_wrapper"><a name=line39 onclick='overload_click(this)' class="a_ln">39<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* vi:set tabstop=4 shiftwidth=4: */
</div></div></div><script>var local_symbol_set='([{name:"RexxParser",ln:29},{name:"installRexxRegex",ln:23},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/rexx.c"})';
</script>