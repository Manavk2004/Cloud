from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import datetime




with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=50)
    page = browser.new_page()
    page.goto('https://www.delta.com/')
    try:
        page.get_by_role('button', name='I understand').click(timeout=3000)
        print("Clicked I understad cookie")
    except:
        pass
    if page.is_visible('div.ancillary-headband'):
        page.click('li#tab_flights')
    
    #Flight origin/destination info:
    page.click('a#fromAirportName')
    page.click('div.input-group.active')
    page.wait_for_selector('input#search_input', timeout=5000)
    page.click('input#search_input')
    page.type('input#search_input', 'ATL', delay=100)
    page.click('div.airport-lookup-container.search-dialog')
    page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')
    page.click("a#toAirportName")
    page.click('div.input-group.active')
    page.wait_for_selector('input#search_input', timeout=5000)
    page.click('input#search_input')
    page.type('input#search_input', 'MIA', delay=100)
    page.click('div.airport-lookup-container.search-dialog')
    page.click('button.search-flyout-close.float-right.d-none.d-lg-block.circle-outline.icon-moreoptionsclose')

    #Flight select fields:
    page.click('div.col-sm-12.select_dropdown.trip-type-container.trip-element.d-lg-block.offset-md-2.col-md-8.offset-lg-0.book-element.mb-3.mb-lg-0.select-container.select-container-down-md.ng-tns-c84-2.d-sm-none.col-lg-2.booking-element')
    print("clicked div")
    page.click("li:has-text('Round Trip')")
    page.click('div.calDispValueCont.icon-Calendar  ')

    date_dict = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    }
    month_dict = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    def depart_month(user_date, current_month_one, current_month_two):
        print("The userdate", user_date)
        print("The current month one", current_month_one)
        print("The current month two", current_month_two)
        date_list = user_date.split(" ")
        month = date_list[0]
        number = date_dict[month]
        month_one = date_dict[current_month_one]
        month_two = date_dict[current_month_two]
        if number > month_one and number > month_two:
            page.click('a.dl-datepicker-1')
            next_month = page.inner_text('span.dl-datepicker-month-0')
            next_next_month = page.inner_text('span.dl-datepicker-month-1')
            depart_month(user_date, next_month, next_next_month)  
        else:
            return month_one, month_two
        
    def depart_day(user_date):
        date_list = user_date.split(" ")
        month_num = date_dict[date_list[0]]
        return month_num, date_list[1], date_list[2]

    def click_day(last_month, last_day, last_year):
        date_obj = datetime.date(int(last_year), int(last_month), int(last_day))
        day_number = date_obj.weekday()
        day_name = date_obj.strftime("%A")
        page.locator(f"a.dl-state-default[aria-label='{last_day} {month_dict[last_month]} {last_year}, {day_name}']").click()


    month_one = page.inner_text("span.dl-datepicker-month-0")
    month_two = page.inner_text("span.dl-datepicker-month-1")
    depart_month("November 23 2025", month_one, month_two)
    last_month, last_day, last_year = depart_day("November 23 2025")
    click_day(last_month, last_day, last_year)
    month_one = page.inner_text("span.dl-datepicker-month-0")
    month_two = page.inner_text("span.dl-datepicker-month-1")
    print(month_one, month_two)
    depart_month("December 23 2025", month_one, month_two)
    last_month, last_day, last_year = depart_day("December 23 2025")
    click_day(last_month, last_day, last_year)
    page.pause()
