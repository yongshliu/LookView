<div class="div_line"  data-info=({id:52725,ln:1}) id=l1><div class="dl_wrapper"><a name=line1 onclick='overload_click(this)' class="a_ln">1<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">/*
</div></div></div><div class="div_line"  data-info=({id:52726,ln:2}) id=l2><div class="dl_wrapper"><a name=line2 onclick='overload_click(this)' class="a_ln">2<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   $Id: e_vms.h 136 2002-03-08 22:35:19Z darren $
</div></div></div><div class="div_line"  data-info=({id:52727,ln:3}) id=l3><div class="dl_wrapper"><a name=line3 onclick='overload_click(this)' class="a_ln">3<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:52728,ln:4}) id=l4><div class="dl_wrapper"><a name=line4 onclick='overload_click(this)' class="a_ln">4<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Copyright (c) 2002, Darren Hiebert
</div></div></div><div class="div_line"  data-info=({id:52729,ln:5}) id=l5><div class="dl_wrapper"><a name=line5 onclick='overload_click(this)' class="a_ln">5<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:52730,ln:6}) id=l6><div class="dl_wrapper"><a name=line6 onclick='overload_click(this)' class="a_ln">6<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   This source code is released for free distribution under the terms of the
</div></div></div><div class="div_line"  data-info=({id:52731,ln:7}) id=l7><div class="dl_wrapper"><a name=line7 onclick='overload_click(this)' class="a_ln">7<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   GNU General Public License.
</div></div></div><div class="div_line"  data-info=({id:52732,ln:8}) id=l8><div class="dl_wrapper"><a name=line8 onclick='overload_click(this)' class="a_ln">8<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*
</div></div></div><div class="div_line"  data-info=({id:52733,ln:9}) id=l9><div class="dl_wrapper"><a name=line9 onclick='overload_click(this)' class="a_ln">9<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*   Configures ctags for VMS environment.
</div></div></div><div class="div_line"  data-info=({id:52734,ln:10}) id=l10><div class="dl_wrapper"><a name=line10 onclick='overload_click(this)' class="a_ln">10<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">*/
</div></div></div><div class="div_line"  data-info=({id:52735,ln:11}) id=l11><div class="dl_wrapper"><a name=line11 onclick='overload_click(this)' class="a_ln">11<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifndef <a href='ctags/e_vms.h#line12' class='a_code_tag ' data-info='({type:"glref",tagreg:1})'>E_VMS_H</a>
</div></div></div><div class="div_line"  data-info=({id:52736,ln:12}) id=l12><div class="dl_wrapper"><a name=line12 onclick='overload_click(this)' class="a_ln">12<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>E_VMS_H</span>
</div></div></div><div class="div_line"  data-info=({id:52737,ln:13}) id=l13><div class="dl_wrapper"><a name=line13 onclick='overload_click(this)' class="a_ln">13<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:52738,ln:14}) id=l14><div class="dl_wrapper"><a name=line14 onclick='overload_click(this)' class="a_ln">14<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>CASE_INSENSITIVE_FILENAMES</span> 1
</div></div></div><div class="div_line"  data-info=({id:52739,ln:15}) id=l15><div class="dl_wrapper"><a name=line15 onclick='overload_click(this)' class="a_ln">15<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_STDLIB_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52740,ln:16}) id=l16><div class="dl_wrapper"><a name=line16 onclick='overload_click(this)' class="a_ln">16<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_TIME_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52741,ln:17}) id=l17><div class="dl_wrapper"><a name=line17 onclick='overload_click(this)' class="a_ln">17<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#ifdef VAXC
</div></div></div><div class="div_line"  data-info=({id:52742,ln:18}) id=l18><div class="dl_wrapper"><a name=line18 onclick='overload_click(this)' class="a_ln">18<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_STAT_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52743,ln:19}) id=l19><div class="dl_wrapper"><a name=line19 onclick='overload_click(this)' class="a_ln">19<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_TYPES_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52744,ln:20}) id=l20><div class="dl_wrapper"><a name=line20 onclick='overload_click(this)' class="a_ln">20<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#else
</div></div></div><div class="div_line"  data-info=({id:52745,ln:21}) id=l21><div class="dl_wrapper"><a name=line21 onclick='overload_click(this)' class="a_ln">21<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_FCNTL_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52746,ln:22}) id=l22><div class="dl_wrapper"><a name=line22 onclick='overload_click(this)' class="a_ln">22<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_SYS_STAT_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52747,ln:23}) id=l23><div class="dl_wrapper"><a name=line23 onclick='overload_click(this)' class="a_ln">23<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents"># define <span class='ctd macdef'>HAVE_SYS_TYPES_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52748,ln:24}) id=l24><div class="dl_wrapper"><a name=line24 onclick='overload_click(this)' class="a_ln">24<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><div class="div_line"  data-info=({id:52749,ln:25}) id=l25><div class="dl_wrapper"><a name=line25 onclick='overload_click(this)' class="a_ln">25<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_CLOCK</span> 1
</div></div></div><div class="div_line"  data-info=({id:52750,ln:26}) id=l26><div class="dl_wrapper"><a name=line26 onclick='overload_click(this)' class="a_ln">26<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_FGETPOS</span> 1
</div></div></div><div class="div_line"  data-info=({id:52751,ln:27}) id=l27><div class="dl_wrapper"><a name=line27 onclick='overload_click(this)' class="a_ln">27<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_STRERROR</span> 1
</div></div></div><div class="div_line"  data-info=({id:52752,ln:28}) id=l28><div class="dl_wrapper"><a name=line28 onclick='overload_click(this)' class="a_ln">28<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_STRSTR</span> 1
</div></div></div><div class="div_line"  data-info=({id:52753,ln:29}) id=l29><div class="dl_wrapper"><a name=line29 onclick='overload_click(this)' class="a_ln">29<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#define <span class='ctd macdef'>HAVE_UNISTD_H</span> 1
</div></div></div><div class="div_line"  data-info=({id:52754,ln:30}) id=l30><div class="dl_wrapper"><a name=line30 onclick='overload_click(this)' class="a_ln">30<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">
</div></div></div><div class="div_line"  data-info=({id:52755,ln:31}) id=l31><div class="dl_wrapper"><a name=line31 onclick='overload_click(this)' class="a_ln">31<span class="glyphicon glyphicon-pencil"></span></a><div class="div_line_contents">#endif
</div></div></div><script>var local_symbol_set='([{name:"CASE_INSENSITIVE_FILENAMES",ln:14},{name:"E_VMS_H",ln:12},{name:"HAVE_CLOCK",ln:25},{name:"HAVE_FCNTL_H",ln:21},{name:"HAVE_FGETPOS",ln:26},{name:"HAVE_STAT_H",ln:18},{name:"HAVE_STDLIB_H",ln:15},{name:"HAVE_STRERROR",ln:27},{name:"HAVE_STRSTR",ln:28},{name:"HAVE_SYS_STAT_H",ln:22},{name:"HAVE_SYS_TYPES_H",ln:23},{name:"HAVE_TIME_H",ln:16},{name:"HAVE_TYPES_H",ln:19},{name:"HAVE_UNISTD_H",ln:29},])';
var file_info = '({folder:0,project:"ctags5_8", table:"comments", topdir:"ctags_5_8", path:"ctags/e_vms.h"})';
</script>