from django.utils.safestring import mark_safe
# Create your tests here.
class PageInfo(object):
    def __init__(self,current_page,all_count,page_item = 5):
        self.Current_Page = current_page
        self.All_Count = all_count
        self.Page_Item = page_item

    def start(self):
        return (self.Current_Page-1)*self.Page_Item

    def end(self):
        return self.Current_Page*self.Page_Item

    def all_page_current(self):
        tmp = divmod(self.All_Count,self.Page_Item)
        print(tmp)
        if tmp[1] == 0:
            all_page_count = tmp[0]
        else:
            all_page_count = tmp[0] + 1
        return all_page_count

def fenye(page,all_page_count):
    page_html = []
    first_html = "<a href='/web1/fenye/%d'>首页</a>" %(1)
    page_html.append(first_html)
    if page <= 1:
        prv_html = "<a href='/web1/fenye/%d'>上一页</a>" %(page)
    else:
        prv_html = "<a href='/web1/fenye/%d'>上一页</a>" %(page-1)
    page_html.append(prv_html)

    if all_page_count < 11:
        begin = 0;end = all_page_count
    else:
        if page < 6:
            begin = 0;end = 11
        else:
            if page + 5 >= all_page_count:
                begin = page - 5;end = all_page_count
            else:
                begin = page -5;end = page + 5
    for i in range(begin,end):
        if page == i+1:
            a_html = "<a style='color:red;' href='/web1/fenye/%d'>%d</a>" %(i+1,i+1)
        else:
            a_html = "<a href='/web1/fenye/%d'>%d</a>" %(i+1,i+1)
        page_html.append(a_html)
    next_html = "<a href='/web1/fenye/%d'>下一页</a>" %(page+1)
    page_html.append(next_html)
    end_html = "<a href='/web1/fenye/%d'>尾页</a>" %(all_page_count)
    page_html.append(end_html)
    page_htmls = mark_safe(' '.join(page_html))
    return page_htmls