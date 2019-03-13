# 设计代码的结构


* 块级元素:div
* 行内元素:span

```
Div =  division
多div症 :divitus
```

6.微格式 microformat
    vCard 和iCalendar

7.不同的HTML和CSS版本
    CSS1 : 1996
    CSS2 : 1998
    CSS3 : 2009
    HTML 4.01 : 1999

1.1.2 文档类型, DOCTYPE 切换的浏览器械式
  DOCTYPE : 严格(strict)和过渡(transitional)

1.browser 模式:标准模式，混杂模式(quirks mode).

2.3.1 子选择器 和 相领同胞选择器
    子选择器:　main > li
    相领：

2.3.3 层叠和特殊性
  1.特殊性
    分为 4 个等级: a, b, c, d
    a: 行内样式 style=""
    b: ID选择 #id
    c: 类 .class
    d: 伪类:  div, p
    style=""                    1,0,0,0     1000
    #wrapper #content {}        0,2,0,0     200
    #content .datePosted{}      0,1,1,0     110
    div#content                 0,1,0,1     101
    #content()                  0,1,0,0     100
    p.comment .dateposted{}     0,0,2,1     21
    p.comment{}                 0,0,1,1     11
    div p{}                     0,0,0,2     2
    p{}                         0,0,0,1     1

2.3.4 继承
  @import url("/css/advanced.css");

```

