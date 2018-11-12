<div class="div_line"  data-info=({id:32440,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32441,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: keyword.h 658 2008-04-20 23:21:35Z elliotth $
</div></div></div><div class="div_line"  data-info=({id:32442,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32443,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 1998-2002, Darren Hiebert
</div></div></div><div class="div_line"  data-info=({id:32444,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32445,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:32446,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:32447,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:32448,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   External interface to keyword.c
</div></div></div><div class="div_line"  data-info=({id:32449,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32450,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifndef <a href='ctags/keyword.h#line12' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>_KEYWORD_H</a>
</div></div></div><div class="div_line"  data-info=({id:32451,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>_KEYWORD_H</span>
</div></div></div><div class="div_line"  data-info=({id:32452,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32453,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32454,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   INCLUDE FILES
</div></div></div><div class="div_line"  data-info=({id:32455,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32456,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>general.h</span>"  /* must always come first */
</div></div></div><div class="div_line"  data-info=({id:32457,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32458,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#include "<span class='ctd include'>parse.h</span>"
</div></div></div><div class="div_line"  data-info=({id:32459,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32460,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:32461,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   FUNCTION PROTOTYPES
</div></div></div><div class="div_line"  data-info=({id:32462,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:32463,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void addKeyword (const char *const string, langType language, int value);
</div></div></div><div class="div_line"  data-info=({id:32464,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern int lookupKeyword (const char *const string, langType language);
</div></div></div><div class="div_line"  data-info=({id:32465,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void freeKeywordTable (void);
</div></div></div><div class="div_line"  data-info=({id:32466,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifdef DEBUG
</div></div></div><div class="div_line"  data-info=({id:32467,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern void printKeywordTable (void);
</div></div></div><div class="div_line"  data-info=({id:32468,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:32469,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">extern int analyzeToken (vString *const name, langType language);
</div></div></div><div class="div_line"  data-info=({id:32470,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32471,ln:32}) id=l32><div class="dl_wrapper"><a name=line32 onclick='overload_click(this)' class="a_ln">32<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif  /* _KEYWORD_H */
</div></div></div><div class="div_line"  data-info=({id:32472,ln:33}) id=l33><div class="dl_wrapper"><a name=line33 onclick='overload_click(this)' class="a_ln">33<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:32473,ln:34}) id=l34><div class="dl_wrapper"><a name=line34 onclick='overload_click(this)' class="a_ln">34<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/* vi:set tabstop=4 shiftwidth=4: */
</div></div></div><script>var local_symbol_set='([{name:"_KEYWORD_H",ln:12},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/keyword.h"})';
</script>